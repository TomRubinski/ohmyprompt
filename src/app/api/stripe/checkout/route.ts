import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function POST(req: Request) {
    try {
        // Allow guest checkout - removed auth check
        // const { userId } = await auth();
        // const user = await currentUser();

        const body = await req.json();
        const { priceId } = body;

        if (!priceId) {
            return new NextResponse("Price ID is required", { status: 400 });
        }

        // Get app URL with fallback for development
        const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

        if (!process.env.NEXT_PUBLIC_APP_URL) {
            console.warn('[STRIPE_CHECKOUT] NEXT_PUBLIC_APP_URL not set, using fallback:', appUrl);
        }

        const session = await stripe.checkout.sessions.create({
            success_url: `${appUrl}/sign-up?payment_verified=true&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${appUrl}?canceled=true`,
            payment_method_types: ["card"],
            mode: "subscription",
            billing_address_collection: "required",
            customer_email: undefined, // Let Stripe collect email
            allow_promotion_codes: true,
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            metadata: {
                source: "guest_checkout",
                timestamp: new Date().toISOString(),
            },
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error("[STRIPE_CHECKOUT]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
