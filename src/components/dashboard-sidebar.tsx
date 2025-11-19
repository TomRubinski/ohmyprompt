"use client"

import { useEffect, useState } from "react"
import { Code2, Database, Cloud, Sparkles, Layers, Rocket, Star, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

const categoryConfig = [
    { id: "all", label: "All Generators", icon: Layers },
    { id: "frontend", label: "Frontend", icon: Code2 },
    { id: "backend", label: "Backend", icon: Database },
    { id: "devops", label: "DevOps", icon: Cloud },
    { id: "ai", label: "AI & ML", icon: Sparkles },
    { id: "fullstack", label: "Full-Stack", icon: Rocket },
]

interface DashboardSidebarProps {
    selectedCategory: string
    onCategoryChange: (category: string) => void
    isOpen: boolean
    onClose: () => void
}

export function DashboardSidebar({
    selectedCategory,
    onCategoryChange,
    isOpen,
    onClose,
}: DashboardSidebarProps) {
    const [stats, setStats] = useState<Record<string, number>>({})

    useEffect(() => {
        fetchStats()
    }, [])

    const fetchStats = async () => {
        try {
            const response = await fetch("/api/prompts/stats")
            if (response.ok) {
                const data = await response.json()
                setStats(data.stats)
            }
        } catch (error) {
            console.error("Error fetching stats:", error)
        }
    }

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] w-64 border-r border-border/50 bg-card/30 backdrop-blur-xl transition-transform duration-300 lg:translate-x-0",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="flex flex-col h-full p-4">
                    {/* Categories */}
                    <div className="space-y-2 flex-1">
                        <div className="px-3 py-2">
                            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                Categories
                            </h2>
                        </div>
                        {categoryConfig.map((category) => {
                            const Icon = category.icon
                            const isSelected = selectedCategory === category.id
                            const count = stats[category.id] || 0

                            return (
                                <button
                                    key={category.id}
                                    onClick={() => {
                                        onCategoryChange(category.id)
                                        onClose()
                                    }}
                                    className={cn(
                                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                                        isSelected
                                            ? "bg-primary/10 text-primary border border-primary/20"
                                            : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    <Icon
                                        className={cn(
                                            "h-5 w-5 transition-transform group-hover:scale-110",
                                            isSelected && "text-primary"
                                        )}
                                    />
                                    <span className="flex-1 text-left font-medium text-sm">
                                        {category.label}
                                    </span>
                                    <span
                                        className={cn(
                                            "text-xs px-2 py-0.5 rounded-full",
                                            isSelected
                                                ? "bg-primary/20 text-primary"
                                                : "bg-muted text-muted-foreground"
                                        )}
                                    >
                                        {count}
                                    </span>
                                </button>
                            )
                        })}
                    </div>

                    {/* Quick Links */}
                    <div className="border-t border-border/50 pt-4 space-y-2">
                        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground group">
                            <Star className="h-5 w-5 group-hover:scale-110 transition-transform" />
                            <span className="text-sm font-medium">Favorites</span>
                            <span className="ml-auto text-xs bg-muted px-2 py-0.5 rounded-full">
                                0
                            </span>
                        </button>
                        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground group">
                            <TrendingUp className="h-5 w-5 group-hover:scale-110 transition-transform" />
                            <span className="text-sm font-medium">Popular</span>
                        </button>
                    </div>
                </div>
            </aside>
        </>
    )
}
