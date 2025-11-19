import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { clerkClient } from "@clerk/nextjs/server";
export async function POST(req: Request) {
    const WEBHOOK_SECRET = process.env.CLERK_SECRET_KEY;

    if (!WEBHOOK_SECRET) {
        throw new Error("Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local");
    }

    // Get the headers
    const headerPayload = await headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response("Error occured -- no svix headers", {
            status: 400,
        });
    }

    // Get the body
    const payload = await req.json();
    const body = JSON.stringify(payload);

    // Create a new Svix instance with your secret.
    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: WebhookEvent;

    // Verify the payload with the headers
    try {
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as WebhookEvent;
    } catch (err) {
        console.error("Error verifying webhook:", err);
        return new Response("Error occured", {
            status: 400,
        });
    }

    const eventType = evt.type;

    if (eventType === "user.created") {
        const { id, email_addresses, first_name, last_name, unsafe_metadata } = evt.data;
        const email = email_addresses[0]?.email_address;

        if (!email) {
            return new Response("No email found", { status: 400 });
        }

        let stripeCustomerId = null;
        let plan = "free";
        let subscriptionStatus = null;

        // Check if user signed up after payment (has stripeSessionId in metadata)
        const stripeSessionId = (unsafe_metadata as any)?.stripeSessionId;
        const metadataCustomerId = (unsafe_metadata as any)?.stripeCustomerId;

        if (stripeSessionId && metadataCustomerId) {
            // User came from paid checkout flow
            stripeCustomerId = metadataCustomerId;

            // Verify they have an active subscription
            const subscriptions = await stripe.subscriptions.list({
                customer: metadataCustomerId,
                status: 'active',
                limit: 1,
            });

            if (subscriptions.data.length > 0) {
                plan = "pro";
                subscriptionStatus = "active";

                // Grant access immediately
                const client = await clerkClient();
                await client.users.updateUserMetadata(id, {
                    publicMetadata: {
                        hasAccess: true,
                    },
                });

                console.log(`[CLERK_WEBHOOK] Granted access to user ${id} with Stripe customer ${stripeCustomerId}`);
            }
        } else {
            // Check if this user already paid via Stripe (Guest Checkout - legacy flow)
            const customers = await stripe.customers.list({
                email: email,
                limit: 1,
            });

            if (customers.data.length > 0) {
                const customer = customers.data[0];
                stripeCustomerId = customer.id;

                // Check for active subscriptions
                const subscriptions = await stripe.subscriptions.list({
                    customer: customer.id,
                    status: 'active',
                    limit: 1,
                });

                if (subscriptions.data.length > 0) {
                    plan = "pro";
                    subscriptionStatus = "active";

                    // Update Clerk Metadata to allow access
                    const client = await clerkClient();
                    await client.users.updateUserMetadata(id, {
                        publicMetadata: {
                            hasAccess: true,
                        },
                    });

                    console.log(`[CLERK_WEBHOOK] Linked existing Stripe customer ${stripeCustomerId} to user ${id}`);
                }
            }
        }

        // Create user in Prisma
        await prisma.user.create({
            data: {
                id: id, // Use Clerk ID as Prisma ID for easy mapping
                email: email,
                name: `${first_name || ""} ${last_name || ""}`.trim(),
                stripeCustomerId: stripeCustomerId,
                plan: plan,
                subscriptionStatus: subscriptionStatus,
            },
        });

        console.log(`[CLERK_WEBHOOK] Created user ${id} with plan ${plan}`);
    }


    return new Response("", { status: 200 });
}
