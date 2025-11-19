"use client"

import { useState, useEffect } from "react"
import { Copy, Check, Star, ExternalLink, Code2, Database, Cloud, Sparkles, Rocket, Droplet, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

// Icon mapping for database icon names
const iconMap: Record<string, any> = {
    Code2,
    Database,
    Cloud,
    Sparkles,
    Rocket,
}

interface Prompt {
    id: string
    title: string
    description: string
    content: string
    category: string
    tags: string[]
    icon: string
    color: string
    popular: boolean
    waterConsumption: number
    votes: number
}

interface GeneratorGridProps {
    category: string
    searchQuery: string
}

// Water consumption indicator component
function WaterConsumptionBadge({ ml }: { ml: number }) {
    const getWaterLevel = (ml: number) => {
        if (ml < 250) return { level: "low", color: "text-green-500", droplets: 1, label: "Low" }
        if (ml < 400) return { level: "medium", color: "text-blue-500", droplets: 2, label: "Medium" }
        return { level: "high", color: "text-orange-500", droplets: 3, label: "High" }
    }

    const waterLevel = getWaterLevel(ml)

    return (
        <div className="group/water relative">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-muted/30 border border-border/50 hover:border-blue-500/50 transition-all duration-300 cursor-help">
                <div className="flex items-center gap-0.5">
                    {[...Array(waterLevel.droplets)].map((_, i) => (
                        <Droplet
                            key={i}
                            className={`h-3 w-3 ${waterLevel.color} fill-current`}
                            style={{ animationDelay: `${i * 0.2}s` }}
                        />
                    ))}
                </div>
                <span className="text-xs font-medium text-muted-foreground">
                    ~{ml}ml
                </span>
            </div>

            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 rounded-lg bg-card border border-border shadow-xl opacity-0 invisible group-hover/water:opacity-100 group-hover/water:visible transition-all duration-200 z-20 pointer-events-none">
                <div className="text-xs space-y-2">
                    <p className="font-semibold text-foreground">💧 Water Impact</p>
                    <p className="text-muted-foreground leading-relaxed">
                        Running this AI prompt uses approximately <span className="text-blue-500 font-semibold">{ml}ml</span> of water for cooling data center servers.
                    </p>
                    <p className="text-muted-foreground/80 text-[10px] italic">
                        * Estimated based on prompt complexity and AI processing requirements
                    </p>
                </div>
                {/* Arrow */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
                    <div className="border-4 border-transparent border-t-border"></div>
                </div>
            </div>
        </div>
    )
}

export function GeneratorGrid({ category, searchQuery }: GeneratorGridProps) {
    const [prompts, setPrompts] = useState<Prompt[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [copiedId, setCopiedId] = useState<string | null>(null)
    const [favorites, setFavorites] = useState<string[]>([])

    useEffect(() => {
        fetchPrompts()
    }, [category, searchQuery])

    const fetchPrompts = async () => {
        try {
            setLoading(true)
            const params = new URLSearchParams()
            if (category !== "all") params.append("category", category)
            if (searchQuery) params.append("search", searchQuery)

            const response = await fetch(`/api/prompts?${params}`)

            if (!response.ok) {
                throw new Error("Failed to fetch prompts")
            }

            const data = await response.json()
            setPrompts(data.prompts)
        } catch (error) {
            console.error("Error fetching prompts:", error)
            setError("Failed to load prompts. Please try again.")
            toast.error("Failed to load prompts")
        } finally {
            setLoading(false)
        }
    }

    const handleCopy = (id: string, prompt: string) => {
        navigator.clipboard.writeText(prompt)
        setCopiedId(id)
        toast.success("Prompt copied to clipboard!")
        setTimeout(() => setCopiedId(null), 2000)
    }

    const toggleFavorite = (id: string) => {
        setFavorites((prev) =>
            prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
        )
    }

    if (loading) {
        return (
            <div className="text-center py-20">
                <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary mb-4" />
                <p className="text-muted-foreground">Loading generators...</p>
            </div>
        )
    }

    if (error || prompts.length === 0) {
        return (
            <div className="text-center py-20">
                <div className="inline-flex p-4 rounded-full bg-muted/50 mb-4">
                    <Code2 className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                    {error ? "Error loading prompts" : "No generators found"}
                </h3>
                <p className="text-muted-foreground mb-4">
                    {error || "Try adjusting your search or category filter"}
                </p>
                {error && (
                    <Button onClick={fetchPrompts}>
                        Try Again
                    </Button>
                )}
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {prompts.map((generator) => {
                const Icon = iconMap[generator.icon] || Code2
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

                            {/* Water Consumption Badge */}
                            <div className="mb-4">
                                <WaterConsumptionBadge ml={generator.waterConsumption} />
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2">
                                <Button
                                    onClick={() => handleCopy(generator.id, generator.content)}
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
