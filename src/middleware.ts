import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);
const isSignUpRoute = createRouteMatcher(["/sign-up(.*)"]);

export default clerkMiddleware(async (auth, req) => {
    // Protect sign-up route - require payment verification
    if (isSignUpRoute(req)) {
        const url = new URL(req.url);
        const hasSessionId = url.searchParams.has("session_id");
        const hasPaymentVerified = url.searchParams.get("payment_verified") === "true";

        // Allow access only with valid payment parameters
        if (!hasSessionId || !hasPaymentVerified) {
            const homeUrl = new URL("/", req.url);
            homeUrl.searchParams.set("error", "payment_required");
            return NextResponse.redirect(homeUrl);
        }
    }

    // Protect dashboard routes
    if (isProtectedRoute(req)) {
        await auth.protect();

        const { sessionClaims } = await auth();

        // Check if user has access (set via Clerk Webhook)
        const hasAccess = (sessionClaims?.public_metadata as any)?.hasAccess;

        // if (!hasAccess) {
        //     const homeUrl = new URL("/", req.url);
        //     homeUrl.searchParams.set("error", "subscription_required");
        //     return NextResponse.redirect(homeUrl);
        // }
    }
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};

