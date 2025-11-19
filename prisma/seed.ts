import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const samplePrompts = [
    {
        title: "Next.js 14 SaaS Starter",
        description: "Complete SaaS boilerplate with authentication, payments, and dashboard",
        content: "Create a Next.js 14 SaaS starter with Clerk authentication, Stripe payments, Prisma ORM, and a modern dashboard. Include TypeScript, Tailwind CSS, and best practices for folder structure, API routes, and component organization.",
        category: "fullstack",
        tags: ["Next.js", "Stripe", "Clerk", "Prisma", "TypeScript", "Tailwind"],
        icon: "Rocket",
        color: "from-purple-500 to-pink-500",
        popular: true,
        waterConsumption: 500,
    },
    {
        title: "React Component Library",
        description: "Build a reusable component library with Storybook and TypeScript",
        content: "Create a React component library with TypeScript, Storybook for documentation, and best practices for reusable components. Include setup for testing with Jest and React Testing Library.",
        category: "frontend",
        tags: ["React", "TypeScript", "Storybook", "Jest"],
        icon: "Code2",
        color: "from-blue-500 to-cyan-500",
        popular: false,
        waterConsumption: 250,
    },
    {
        title: "Express REST API",
        description: "Production-ready REST API with authentication and database",
        content: "Build a production-ready Express.js REST API with JWT authentication, MongoDB integration, error handling, and API documentation using Swagger. Include rate limiting and security best practices.",
        category: "backend",
        tags: ["Node.js", "Express", "MongoDB", "JWT"],
        icon: "Database",
        color: "from-green-500 to-emerald-500",
        popular: true,
        waterConsumption: 350,
    },
    {
        title: "Docker Multi-Container Setup",
        description: "Docker Compose configuration for full-stack applications",
        content: "Create a Docker Compose setup for a full-stack application with frontend, backend, database, and Nginx reverse proxy. Include development and production configurations.",
        category: "devops",
        tags: ["Docker", "Docker Compose", "Nginx"],
        icon: "Cloud",
        color: "from-orange-500 to-red-500",
        popular: false,
        waterConsumption: 200,
    },
    {
        title: "AI Chatbot Integration",
        description: "Integrate OpenAI GPT into your application with streaming",
        content: "Integrate OpenAI GPT API into a React application with streaming responses, conversation history, and error handling. Include token counting and cost optimization strategies.",
        category: "ai",
        tags: ["OpenAI", "Streaming", "React", "AI"],
        icon: "Sparkles",
        color: "from-yellow-500 to-orange-500",
        popular: true,
        waterConsumption: 400,
    },
]

async function main() {
    console.log("🌱 Starting seed...")

    // Create a system user for prompts
    const systemUser = await prisma.user.upsert({
        where: { email: "system@ohmyprompt.com" },
        update: {},
        create: {
            email: "system@ohmyprompt.com",
            name: "System",
            plan: "pro",
        },
    })

    console.log(`✅ System user created: ${systemUser.id}`)

    // Create sample prompts
    for (const promptData of samplePrompts) {
        const prompt = await prisma.prompt.create({
            data: {
                ...promptData,
                authorId: systemUser.id,
            },
        })
        console.log(`✅ Created prompt: ${prompt.title}`)
    }

    console.log("🎉 Seed completed!")
}

main()
    .catch((e) => {
        console.error("❌ Seed failed:", e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
