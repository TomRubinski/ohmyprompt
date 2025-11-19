"use client"

import { useState } from "react"
import { Copy, Check, Star, ExternalLink, Code2, Database, Cloud, Sparkles, Rocket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

// Mock data - replace with real data later
const generators = [
    {
        id: 1,
        title: "Next.js 14 SaaS Starter",
        description: "Complete SaaS boilerplate with authentication, payments, and dashboard",
        category: "fullstack",
        tags: ["Next.js", "Stripe", "Clerk", "Prisma"],
        icon: Rocket,
        color: "from-purple-500 to-pink-500",
        prompt: "Create a Next.js 14 SaaS starter with Clerk authentication, Stripe payments, Prisma ORM, and a modern dashboard. Include TypeScript, Tailwind CSS, and best practices.",
        popular: true,
    },
    {
        id: 2,
        title: "React Component Library",
        description: "Build a reusable component library with Storybook and TypeScript",
        category: "frontend",
        tags: ["React", "TypeScript", "Storybook"],
        icon: Code2,
        color: "from-blue-500 to-cyan-500",
        prompt: "Create a React component library with TypeScript, Storybook for documentation, and best practices for reusable components.",
        popular: false,
    },
    {
        id: 3,
        title: "Express REST API",
        description: "Production-ready REST API with authentication and database",
        category: "backend",
        tags: ["Node.js", "Express", "MongoDB"],
        icon: Database,
        color: "from-green-500 to-emerald-500",
        prompt: "Build a production-ready Express.js REST API with JWT authentication, MongoDB integration, error handling, and API documentation.",
        popular: true,
    },
    {
        id: 4,
        title: "Docker Multi-Container Setup",
        description: "Docker Compose configuration for full-stack applications",
        category: "devops",
        tags: ["Docker", "Docker Compose", "Nginx"],
        icon: Cloud,
        color: "from-orange-500 to-red-500",
        prompt: "Create a Docker Compose setup for a full-stack application with frontend, backend, database, and Nginx reverse proxy.",
        popular: false,
    },
    {
        id: 5,
        title: "AI Chatbot Integration",
        description: "Integrate OpenAI GPT into your application with streaming",
        category: "ai",
        tags: ["OpenAI", "Streaming", "React"],
        icon: Sparkles,
        color: "from-yellow-500 to-orange-500",
        prompt: "Integrate OpenAI GPT API into a React application with streaming responses, conversation history, and error handling.",
        popular: true,
    },
    // Add more generators...
]

interface GeneratorGridProps {
    category: string
    searchQuery: string
}

export function GeneratorGrid({ category, searchQuery }: GeneratorGridProps) {
    const [copiedId, setCopiedId] = useState<number | null>(null)
    const [favorites, setFavorites] = useState<number[]>([1, 3, 5])

    const filteredGenerators = generators.filter((gen) => {
        const matchesCategory = category === "all" || gen.category === category
        const matchesSearch =
            searchQuery === "" ||
            gen.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            gen.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            gen.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        return matchesCategory && matchesSearch
    })

    const handleCopy = (id: number, prompt: string) => {
        navigator.clipboard.writeText(prompt)
        setCopiedId(id)
        toast.success("Prompt copied to clipboard!")
        setTimeout(() => setCopiedId(null), 2000)
    }

    const toggleFavorite = (id: number) => {
        setFavorites((prev) =>
            prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
        )
    }

    if (filteredGenerators.length === 0) {
        return (
            <div className="text-center py-20">
                <div className="inline-flex p-4 rounded-full bg-muted/50 mb-4">
                    <Code2 className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No generators found</h3>
                <p className="text-muted-foreground">
                    Try adjusting your search or category filter
                </p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredGenerators.map((generator) => {
                const Icon = generator.icon
                const isFavorite = favorites.includes(generator.id)
                const isCopied = copiedId === generator.id

                return (
                    <div
                        key={generator.id}
                        className="group relative overflow-hidden rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/10"
                    >
                        {/* Gradient Background */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${generator.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>

                        {/* Popular Badge */}
                        {generator.popular && (
                            <div className="absolute top-3 right-3 z-10">
                                <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-primary/20 border border-primary/30 backdrop-blur-sm">
                                    <Star className="h-3 w-3 text-primary fill-primary" />
                                    <span className="text-xs font-medium text-primary">Popular</span>
                                </div>
                            </div>
                        )}

                        <div className="relative p-6">
                            {/* Icon */}
                            <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${generator.color} mb-4`}>
                                <Icon className="h-6 w-6 text-white" />
                            </div>

                            {/* Title & Description */}
                            <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                                {generator.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                                {generator.description}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {generator.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="text-xs px-2 py-1 rounded-md bg-muted/50 text-muted-foreground border border-border/50"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2">
                                <Button
                                    onClick={() => handleCopy(generator.id, generator.prompt)}
                                    className="flex-1 gap-2"
                                    variant={isCopied ? "default" : "outline"}
                                >
                                    {isCopied ? (
                                        <>
                                            <Check className="h-4 w-4" />
                                            Copied!
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="h-4 w-4" />
                                            Copy Prompt
                                        </>
                                    )}
                                </Button>
                                <Button
                                    onClick={() => toggleFavorite(generator.id)}
                                    variant="outline"
                                    size="icon"
                                    className={isFavorite ? "text-yellow-500 border-yellow-500/50" : ""}
                                >
                                    <Star
                                        className={`h-4 w-4 ${isFavorite ? "fill-yellow-500" : ""}`}
                                    />
                                </Button>
                                <Button variant="outline" size="icon">
                                    <ExternalLink className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
