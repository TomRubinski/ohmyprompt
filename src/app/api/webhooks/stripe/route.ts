import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

export async function POST(req: Request) {
    const body = await req.text();
    const headerPayload = await headers();
    const signature = headerPayload.get("Stripe-Signature") as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (error: any) {
        console.error("[STRIPE_WEBHOOK] Error constructing event:", error.message);
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
    }

    const session = event.data.object as Stripe.Checkout.Session;

    if (event.type === "checkout.session.completed") {
        console.log("[STRIPE_WEBHOOK] Checkout session completed:", session.id);

        // Retrieve the subscription details from Stripe.
        const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
        );

        // If there is a userId in metadata (Authenticated Checkout), update the user directly
        if (session.metadata?.userId) {
            await prisma.user.update({
                where: {
                    id: session.metadata.userId,
                },
                data: {
                    stripeCustomerId: subscription.customer as string,
                    subscriptionStatus: "active",
                    plan: "pro",
                },
            });

            console.log("[STRIPE_WEBHOOK] Updated user:", session.metadata.userId);
        } else {
            // Guest Checkout: User will be linked when they sign up via Clerk webhook
            console.log(
                "[STRIPE_WEBHOOK] Guest checkout completed for:",
                session.customer_details?.email,
                "- Customer ID:",
                session.customer
            );
        }
    }

    return new NextResponse(null, { status: 200 });
}
