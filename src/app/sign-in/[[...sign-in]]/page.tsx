import { SignIn } from "@clerk/nextjs"

export default function SignInPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">
                    Welcome back
                </h2>
                <p className="mt-2 text-center text-sm text-muted-foreground">
                    Sign in to access your generators
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-card px-4 py-8 shadow sm:rounded-lg sm:px-10 border border-border">
                    <SignIn
                        afterSignInUrl="/dashboard"
                        redirectUrl="/dashboard"
                        signUpUrl="/sign-up"
                    />
                </div>
            </div>
        </div>
    )
}
