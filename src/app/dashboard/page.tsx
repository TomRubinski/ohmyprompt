"use client"

import { useState } from "react"
import { UserButton } from "@clerk/nextjs"
import { Logo } from "@/components/logo"
import { GeneratorGrid } from "@/components/generator-grid"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardStats } from "@/components/dashboard-stats"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [searchQuery, setSearchQuery] = useState("")
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className="min-h-screen bg-background">
            {/* Top Header */}
            <header className="border-b border-border/50 bg-card/50 backdrop-blur-xl sticky top-0 z-50">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="lg:hidden"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                        >
                            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </Button>
                        <Link href="/" className="flex items-center gap-2 group">
                            <Logo className="group-hover:scale-110 transition-transform" />
                            <span className="font-bold text-lg hidden sm:inline-block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                Oh My Prompt
                            </span>
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <UserButton afterSignOutUrl="/" />
                    </div>
                </div>
            </header>

            <div className="flex">
                {/* Sidebar */}
                <DashboardSidebar
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                    isOpen={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                />

                {/* Main Content */}
                <main className="flex-1 lg:ml-64">
                    <div className="container mx-auto px-4 py-8 max-w-7xl">
                        {/* Dashboard Header with Search */}
                        <DashboardHeader
                            searchQuery={searchQuery}
                            onSearchChange={setSearchQuery}
                        />

                        {/* Stats */}
                        <DashboardStats />

                        {/* Generators Grid */}
                        <GeneratorGrid
                            category={selectedCategory}
                            searchQuery={searchQuery}
                        />
                    </div>
                </main>
            </div>
        </div>
    )
}
