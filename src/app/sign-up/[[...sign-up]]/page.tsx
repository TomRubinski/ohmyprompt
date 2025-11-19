import { SignUp } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { validateStripeSession } from "@/lib/stripe-session";

export default async function SignUpPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const sessionId = typeof searchParams.session_id === 'string'
        ? searchParams.session_id
        : undefined;
    const paymentVerified = searchParams.payment_verified === 'true';

    // Require valid session_id for sign-up
    if (!sessionId || !paymentVerified) {
        redirect("/?error=payment_required");
    }

    // Validate the Stripe session
    const sessionDetails = await validateStripeSession(sessionId);

    if (!sessionDetails) {
        redirect("/?error=invalid_session");
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">
                    Complete your registration
                </h2>
                <p className="mt-2 text-center text-sm text-muted-foreground">
                    Payment successful! Please create your account to access the dashboard.
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-card px-4 py-8 shadow sm:rounded-lg sm:px-10 border border-border">
                    <SignUp
                        afterSignUpUrl="/dashboard"
                        redirectUrl="/dashboard"
                        unsafeMetadata={{
                            stripeSessionId: sessionId,
                            stripeCustomerId: sessionDetails.customerId,
                        }}
                        appearance={{
                            elements: {
                                formFieldInput: {
                                    // Pre-fill email from Stripe
                                },
                            },
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
