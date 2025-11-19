import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Copy, Star, Zap } from "lucide-react"

const MOCK_PROMPTS = [
    {
        id: "1",
        title: "Next.js SaaS Boilerplate",
        description: "Generates a complete SaaS structure with Auth, Stripe, and Prisma.",
        category: "Frontend",
        tags: ["Next.js", "React", "SaaS"],
        votes: 1240,
        author: "antigravity",
        complexity: "High"
    },
    {
        id: "2",
        title: "Python FastAPI Clean Arch",
        description: "Python API scaffold following Clean Architecture and TDD.",
        category: "Backend",
        tags: ["Python", "FastAPI", "Clean Arch"],
        votes: 850,
        author: "dev_master",
        complexity: "Medium"
    },
    {
        id: "3",
        title: "DevOps CI/CD Pipeline",
        description: "Complete GitHub Actions pipeline for AWS deployment.",
        category: "DevOps",
        tags: ["AWS", "GitHub Actions", "Docker"],
        votes: 620,
        author: "cloud_ninja",
        complexity: "High"
    },
    {
        id: "4",
        title: "React Component Generator",
        description: "Creates React components with tests and Storybook.",
        category: "Frontend",
        tags: ["React", "Testing", "Storybook"],
        votes: 430,
        author: "ui_wizard",
        complexity: "Low"
    },
    {
        id: "5",
        title: "SQL Query Optimizer",
        description: "Optimizes complex SQL queries and suggests indexes.",
        category: "Database",
        tags: ["SQL", "PostgreSQL", "Performance"],
        votes: 310,
        author: "db_admin",
        complexity: "Medium"
    },
    {
        id: "6",
        title: "Go Microservice Template",
        description: "Template for Go microservices with gRPC.",
        category: "Backend",
        tags: ["Go", "gRPC", "Microservices"],
        votes: 290,
        author: "gopher",
        complexity: "High"
    }
]

export function PromptGrid() {
    return (
        <section id="prompts" className="container mx-auto px-4 py-16">
            <div className="mb-10 flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Featured Prompts</h2>
                <Button variant="ghost" className="text-primary hover:text-primary/80">
                    View all
                </Button>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {MOCK_PROMPTS.map((prompt) => (
                    <Card key={prompt.id} className="group relative overflow-hidden border-primary/10 bg-card/50 transition-all hover:border-primary/50 hover:shadow-[0_0_20px_rgba(139,92,246,0.1)]">
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary">
                                    {prompt.category}
                                </Badge>
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                    <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                                    {prompt.votes}
                                </div>
                            </div>
                            <CardTitle className="mt-4 text-xl group-hover:text-primary transition-colors">
                                {prompt.title}
                            </CardTitle>
                            <CardDescription className="line-clamp-2">
                                {prompt.description}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                {prompt.tags.map((tag) => (
                                    <Badge key={tag} variant="secondary" className="bg-secondary/10 text-secondary hover:bg-secondary/20">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between border-t border-border/50 bg-background/50 p-4 backdrop-blur-sm">
                            <div className="flex items-center text-xs text-muted-foreground">
                                By <span className="ml-1 font-medium text-foreground">@{prompt.author}</span>
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
