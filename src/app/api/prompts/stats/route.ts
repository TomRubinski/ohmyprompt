import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET() {
    try {
        // Get category counts
        const categories = await prisma.prompt.groupBy({
            by: ["category"],
            _count: {
                id: true,
            },
        })

        // Get total count
        const total = await prisma.prompt.count()

        // Format response
        const stats = {
            all: total,
            ...Object.fromEntries(
                categories.map((cat) => [cat.category, cat._count.id])
            ),
        }

        return NextResponse.json({ stats })
    } catch (error) {
        console.error("[PROMPTS_STATS]", error)
        return NextResponse.json(
            { error: "Failed to fetch stats" },
            { status: 500 }
        )
    }
}
