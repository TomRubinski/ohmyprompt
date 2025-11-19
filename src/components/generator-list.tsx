"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Copy, Star, Search, Filter, Zap } from "lucide-react"

const GENERATORS = [
    {
        id: "1",
        title: "Next.js SaaS Boilerplate",
        description: "Generates a complete SaaS structure with Auth, Stripe, and Prisma.",
        category: "Frontend",
        tags: ["Next.js", "React", "SaaS"],
        votes: 1240,
        author: "antigravity",
        complexity: "High",
        isPremium: true
    },
    {
        id: "2",
        title: "Python FastAPI Clean Arch",
        description: "Python API scaffold following Clean Architecture and TDD.",
        category: "Backend",
        tags: ["Python", "FastAPI", "Clean Arch"],
        votes: 850,
        author: "dev_master",
        complexity: "Medium",
        isPremium: false
    },
    {
        id: "3",
        title: "DevOps CI/CD Pipeline",
        description: "Complete GitHub Actions pipeline for AWS deployment.",
        category: "DevOps",
        tags: ["AWS", "GitHub Actions", "Docker"],
        votes: 620,
        author: "cloud_ninja",
        complexity: "High",
        isPremium: true
    },
    {
        id: "4",
        title: "React Component Generator",
        description: "Creates React components with tests and Storybook.",
        category: "Frontend",
        tags: ["React", "Testing", "Storybook"],
        votes: 430,
        author: "ui_wizard",
        complexity: "Low",
        isPremium: false
    },
    {
        id: "5",
        title: "SQL Query Optimizer",
        description: "Optimizes complex SQL queries and suggests indexes.",
        category: "Database",
        tags: ["SQL", "PostgreSQL", "Performance"],
        votes: 310,
        author: "db_admin",
        complexity: "Medium",
        isPremium: true
    },
    {
        id: "6",
        title: "Go Microservice Template",
        description: "Template for Go microservices with gRPC.",
        category: "Backend",
        tags: ["Go", "gRPC", "Microservices"],
        votes: 290,
        author: "gopher",
        complexity: "High",
        isPremium: true
    },
    {
        id: "7",
        title: "PRD Generator",
        description: "Create comprehensive Product Requirement Documents.",
        category: "Product",
        tags: ["Product", "Management", "Docs"],
        votes: 150,
        author: "pm_guru",
        complexity: "Low",
        isPremium: false
    },
    {
        id: "8",
        title: "User Story Creator",
        description: "Generate detailed user stories with acceptance criteria.",
        category: "Product",
        tags: ["Agile", "Scrum", "User Stories"],
        votes: 180,
        author: "agile_coach",
        complexity: "Low",
        isPremium: false
    }
]

const CATEGORIES = ["All", "Frontend", "Backend", "DevOps", "Database", "Product"]

export function GeneratorList() {
    const [search, setSearch] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("All")

    const filteredGenerators = GENERATORS.filter(gen => {
        const matchesSearch = gen.title.toLowerCase().includes(search.toLowerCase()) ||
            gen.description.toLowerCase().includes(search.toLowerCase()) ||
            gen.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))

        const matchesCategory = selectedCategory === "All" || gen.category === selectedCategory

        return matchesSearch && matchesCategory
    })

    return (
        <section className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search generators..."
                        className="pl-9 bg-background/50"
                        value={search}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                    />
                </div>

                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                    {CATEGORIES.map(cat => (
                        <Button
                            key={cat}
                            variant={selectedCategory === cat ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedCategory(cat)}
                            className="whitespace-nowrap"
                        >
                            {cat}
                        </Button>
                    ))}
                </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredGenerators.map((gen) => (
                    <Card key={gen.id} className="group relative overflow-hidden border-primary/10 bg-card/50 transition-all hover:border-primary/50 hover:shadow-[0_0_20px_rgba(139,92,246,0.1)]">
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary">
                                    {gen.category}
                                </Badge>
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                    <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                                    {gen.votes}
                                </div>
                            </div>
                            <CardTitle className="mt-4 text-xl group-hover:text-primary transition-colors flex items-center gap-2">
                                {gen.title}
                                {gen.isPremium && <Zap className="h-4 w-4 text-yellow-400 fill-yellow-400" />}
                            </CardTitle>
                            <CardDescription className="line-clamp-2">
                                {gen.description}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                {gen.tags.map((tag) => (
                                    <Badge key={tag} variant="secondary" className="bg-secondary/10 text-secondary hover:bg-secondary/20">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between border-t border-border/50 bg-background/50 p-4 backdrop-blur-sm">
                            <div className="flex items-center text-xs text-muted-foreground">
                                By <span className="ml-1 font-medium text-foreground">@{gen.author}</span>
                            </div>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-primary/10 hover:text-primary">
                                <Copy className="h-4 w-4" />
                                <span className="sr-only">Copy</span>
                            </Button>
                        </CardFooter>

                        {/* Hover Effect */}
                        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                    </Card>
                ))}
            </div>
        </section>
    )
}
