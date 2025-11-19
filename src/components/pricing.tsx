"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Loader2 } from "lucide-react"
import { toast } from "sonner"

interface Plan {
    id: string
    name: string
    priceId: string
    amount: number
    currency: string
    interval: string
    popular: boolean
}

const PLAN_FEATURES = {
    monthly: [
        "Access to all Standard Prompts",
        "Save up to 50 Favorites",
        "Community Support",
        "Basic Prompt Generator"
    ],
    annual: [
        "Everything in Monthly",
        "Access to God Mode Prompts",
        "Unlimited Favorites",
        "Priority Support",
        "Early Access to New Prompts"
    ]
}

const PLAN_DESCRIPTIONS = {
    monthly: "Perfect for hobbyists and learners.",
    annual: "Best value for power users."
}

export function Pricing() {
    const [plans, setPlans] = useState<Plan[]>([])
    const [loading, setLoading] = useState<string | null>(null)
    const [fetchingPlans, setFetchingPlans] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetchPlans()
    }, [])

    const fetchPlans = async () => {
        try {
            setFetchingPlans(true)
            const response = await fetch("/api/stripe/prices")

            if (!response.ok) {
                throw new Error("Failed to fetch plans")
            }

            const data = await response.json()
            setPlans(data.plans)
        } catch (error) {
            console.error("Error fetching plans:", error)
            setError("Unable to load pricing. Please try again later.")
            toast.error("Failed to load pricing information")
        } finally {
            setFetchingPlans(false)
        }
    }

    const onSubscribe = async (priceId: string) => {
        try {
            setLoading(priceId)
            const response = await fetch("/api/stripe/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ priceId }),
            })

            if (!response.ok) {
                throw new Error("Failed to create checkout session")
            }

            const data = await response.json()
            window.location.href = data.url
        } catch (error) {
            console.error("Something went wrong", error)
            toast.error("Failed to start checkout. Please try again.")
        } finally {
            setLoading(null)
        }
    }

    const formatPrice = (amount: number, currency: string) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
        }).format(amount)
    }

    if (fetchingPlans) {
        return (
            <section className="container mx-auto px-4 py-20">
                <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                    <p className="mt-4 text-muted-foreground">Loading pricing...</p>
                </div>
            </section>
        )
    }

    if (error || plans.length === 0) {
        return (
            <section className="container mx-auto px-4 py-20">
                <div className="text-center">
                    <p className="text-destructive">{error || "No plans available"}</p>
                    <Button onClick={fetchPlans} className="mt-4">
                        Try Again
                    </Button>
                </div>
            </section>
        )
    }

    return (
        <section className="container mx-auto px-4 py-20">
            <div className="mb-16 text-center">
                <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Simple Pricing</h2>
                <p className="text-xl text-muted-foreground">Unlock the full potential of prompt engineering.</p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:max-w-4xl lg:mx-auto">
                {plans.map((plan) => (
                    <Card
                        key={plan.id}
                        className={`relative flex flex-col border-primary/10 bg-card/50 ${plan.popular ? 'border-primary shadow-[0_0_30px_rgba(139,92,246,0.15)]' : ''}`}
                    >
                        {plan.popular && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-sm font-medium text-primary-foreground">
                                Most Popular
                            </div>
                        )}
                        <CardHeader>
                            <CardTitle className="text-2xl">{plan.name}</CardTitle>
                            <CardDescription>{PLAN_DESCRIPTIONS[plan.id as keyof typeof PLAN_DESCRIPTIONS]}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <div className="mb-6 flex items-baseline">
                                <span className="text-4xl font-bold">{formatPrice(plan.amount, plan.currency)}</span>
                                <span className="text-muted-foreground">/{plan.interval}</span>
                            </div>
                            <ul className="space-y-3">
                                {PLAN_FEATURES[plan.id as keyof typeof PLAN_FEATURES]?.map((feature) => (
                                    <li key={feature} className="flex items-center gap-2 text-sm">
                                        <Check className="h-4 w-4 text-primary" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button
                                className="w-full"
                                variant={plan.popular ? "default" : "outline"}
                                disabled={loading === plan.priceId}
                                onClick={() => onSubscribe(plan.priceId)}
                            >
                                {loading === plan.priceId && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Subscribe {plan.name}
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </section>
    )
}
