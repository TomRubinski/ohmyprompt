"use client"

import { Search, SlidersHorizontal } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface DashboardHeaderProps {
    searchQuery: string
    onSearchChange: (query: string) => void
}

export function DashboardHeader({ searchQuery, onSearchChange }: DashboardHeaderProps) {
    return (
        <div className="mb-8 space-y-4">
            {/* Title */}
            <div>
                <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                    Your Generators
                </h1>
                <p className="text-muted-foreground mt-2">
                    Browse, search, and copy production-ready prompts instantly.
                </p>
            </div>

            {/* Search Bar */}
            <div className="flex gap-3">
                <div className="relative flex-1 max-w-2xl">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Search generators... (e.g., 'Next.js authentication', 'Docker setup')"
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="pl-10 h-12 bg-card/50 border-border/50 focus:border-primary/50 transition-colors"
                    />
                </div>
                <Button
                    variant="outline"
                    size="icon"
                    className="h-12 w-12 border-border/50 hover:border-primary/50 transition-colors"
                >
                    <SlidersHorizontal className="h-5 w-5" />
                </Button>
            </div>
        </div>
    )
}
