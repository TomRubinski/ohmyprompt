"use client"

import { Copy, Star, TrendingUp, Zap } from "lucide-react"

export function DashboardStats() {
    const stats = [
        {
            label: "Prompts Copied",
            value: "127",
            icon: Copy,
            change: "+12 this week",
            color: "from-blue-500 to-cyan-500",
        },
        {
            label: "Favorites",
            value: "12",
            icon: Star,
            change: "3 new",
            color: "from-yellow-500 to-orange-500",
        },
        {
            label: "Time Saved",
            value: "24h",
            icon: Zap,
            change: "This month",
            color: "from-purple-500 to-pink-500",
        },
        {
            label: "Streak",
            value: "7 days",
            icon: TrendingUp,
            change: "Keep it up!",
            color: "from-green-500 to-emerald-500",
        },
    ]

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                    <div
                        key={index}
                        className="group relative overflow-hidden rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm p-6 hover:border-primary/50 transition-all duration-300 hover:scale-105"
                    >
                        {/* Gradient Background */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

                        <div className="relative">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-2.5 rounded-lg bg-gradient-to-br ${stat.color}`}>
                                    <Icon className="h-5 w-5 text-white" />
                                </div>
                                <span className="text-xs text-muted-foreground">
                                    {stat.change}
                                </span>
                            </div>
                            <div className="space-y-1">
                                <p className="text-3xl font-bold">{stat.value}</p>
                                <p className="text-sm text-muted-foreground">{stat.label}</p>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
