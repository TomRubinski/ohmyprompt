import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const category = searchParams.get("category") || "all"
        const search = searchParams.get("search") || ""

        // Build where clause
        const where: any = {}

        // Filter by category
        if (category !== "all") {
            where.category = category
        }

        // Filter by search (title, description, or tags)
        if (search) {
            where.OR = [
                { title: { contains: search, mode: "insensitive" } },
                { description: { contains: search, mode: "insensitive" } },
                { tags: { has: search } },
            ]
        }

        // Fetch prompts from database
        const prompts = await prisma.prompt.findMany({
            where,
            orderBy: [
                { popular: "desc" }, // Popular first
                { votes: "desc" },   // Then by votes
                { createdAt: "desc" }, // Then newest
            ],
            select: {
                id: true,
                title: true,
                description: true,
                content: true,
                category: true,
                tags: true,
                icon: true,
                color: true,
                popular: true,
                waterConsumption: true,
                votes: true,
            },
        })

        return NextResponse.json({ prompts })
    } catch (error) {
        console.error("[PROMPTS_GET]", error)
        return NextResponse.json(
            { error: "Failed to fetch prompts" },
            { status: 500 }
        )
    }
}
