import { NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"

export async function GET() {
    try {
        // Buscar os Price IDs das variáveis de ambiente
        const monthlyPriceId = process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID
        const annualPriceId = process.env.NEXT_PUBLIC_STRIPE_ANNUAL_PRICE_ID

        if (!monthlyPriceId || !annualPriceId) {
            return NextResponse.json(
                { error: "Price IDs not configured" },
                { status: 500 }
            )
        }

        // Buscar detalhes dos preços do Stripe
        const [monthlyPrice, annualPrice] = await Promise.all([
            stripe.prices.retrieve(monthlyPriceId, { expand: ["product"] }),
            stripe.prices.retrieve(annualPriceId, { expand: ["product"] }),
        ])

        // Formatar os dados
        const plans = [
            {
                id: "monthly",
                name: "Monthly",
                priceId: monthlyPriceId,
                amount: monthlyPrice.unit_amount! / 100, // Converter centavos para reais
                currency: monthlyPrice.currency.toUpperCase(),
                interval: monthlyPrice.recurring?.interval || "month",
                popular: false,
            },
            {
                id: "annual",
                name: "Annual",
                priceId: annualPriceId,
                amount: annualPrice.unit_amount! / 100,
                currency: annualPrice.currency.toUpperCase(),
                interval: annualPrice.recurring?.interval || "year",
                popular: true,
            },
        ]

        return NextResponse.json({ plans })
    } catch (error) {
        console.error("[STRIPE_PRICES]", error)
        return NextResponse.json(
            { error: "Failed to fetch prices" },
            { status: 500 }
        )
    }
}
