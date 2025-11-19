"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Search, ArrowLeft, Sparkles, Code2, Terminal } from "lucide-react"

export default function NotFound() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [glitchActive, setGlitchActive] = useState(false)

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY })
        }

        window.addEventListener("mousemove", handleMouseMove)

        // Random glitch effect
        const glitchInterval = setInterval(() => {
            setGlitchActive(true)
            setTimeout(() => setGlitchActive(false), 200)
        }, 3000)

        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
            clearInterval(glitchInterval)
        }
    }, [])

    const floatingElements = [
        { icon: Code2, delay: "0s", duration: "20s", startX: "10%", startY: "20%" },
        { icon: Terminal, delay: "2s", duration: "25s", startX: "80%", startY: "30%" },
        { icon: Sparkles, delay: "4s", duration: "22s", startX: "15%", startY: "70%" },
        { icon: Code2, delay: "1s", duration: "23s", startX: "85%", startY: "60%" },
        { icon: Terminal, delay: "3s", duration: "21s", startX: "50%", startY: "15%" },
    ]

    return (
        <div className="relative min-h-screen overflow-hidden bg-background flex items-center justify-center">
            {/* Animated Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.05)_2px,transparent_2px),linear-gradient(90deg,rgba(139,92,246,0.05)_2px,transparent_2px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)] animate-grid-flow"></div>

            {/* Gradient Orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse-slow"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: "1s" }}></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: "2s" }}></div>

            {/* Floating Code Icons */}
            {floatingElements.map((element, index) => {
                const Icon = element.icon
                return (
                    <div
                        key={index}
                        className="absolute opacity-20"
                        style={{
                            left: element.startX,
                            top: element.startY,
                            animation: `float-random ${element.duration} ease-in-out infinite`,
                            animationDelay: element.delay,
                        }}
                    >
                        <Icon className="h-8 w-8 text-primary" />
                    </div>
                )
            })}

            {/* Mouse Follower Glow */}
            <div
                className="pointer-events-none fixed w-96 h-96 rounded-full bg-primary/10 blur-[100px] transition-all duration-300 ease-out"
                style={{
                    left: mousePosition.x - 192,
                    top: mousePosition.y - 192,
                }}
            ></div>

            {/* Main Content */}
            <div className="relative z-10 container mx-auto px-4 text-center">
                {/* 404 Number with Glitch Effect */}
                <div className="mb-8 relative">
                    <h1
                        className={`text-[12rem] md:text-[20rem] font-black leading-none tracking-tighter ${glitchActive ? "animate-glitch" : ""
                            }`}
                    >
                        <span className="relative inline-block">
                            <span className="absolute inset-0 bg-gradient-to-r from-primary via-purple-500 to-secondary bg-clip-text text-transparent blur-2xl opacity-50">
                                404
                            </span>
                            <span className="relative bg-gradient-to-r from-primary via-purple-500 to-secondary bg-clip-text text-transparent animate-gradient-x bg-[length:200%_auto]">
                                404
                            </span>
                        </span>
                    </h1>

                    {/* Scanline Effect */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent animate-scanline pointer-events-none"></div>
                </div>

                {/* Error Message */}
                <div className="space-y-4 mb-12 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                    <h2 className="text-3xl md:text-5xl font-bold">
                        <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                            Oops! Page Not Found
                        </span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Looks like this page took a wrong turn in the matrix.
                        Don't worry, even the best developers get lost sometimes.
                    </p>
                </div>

                {/* Error Code Box */}
                <div className="mb-12 inline-block animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                        <div className="relative bg-card/50 backdrop-blur-xl border border-border/50 rounded-xl p-6 font-mono text-sm">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                </div>
                                <span className="text-muted-foreground ml-2">error.log</span>
                            </div>
                            <div className="text-left space-y-1">
                                <p className="text-red-400">
                                    <span className="text-muted-foreground">Error:</span> HTTP 404 - Resource not found
                                </p>
                                <p className="text-yellow-400">
                                    <span className="text-muted-foreground">Path:</span> {typeof window !== 'undefined' ? window.location.pathname : '/unknown'}
                                </p>
                                <p className="text-blue-400">
                                    <span className="text-muted-foreground">Suggestion:</span> Try navigating home
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
                    <Link href="/">
                        <Button
                            size="lg"
                            className="group h-14 min-w-[200px] text-lg font-bold bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-[0_0_30px_rgba(139,92,246,0.5)] hover:shadow-[0_0_50px_rgba(139,92,246,0.8)] transition-all duration-300 hover:scale-105"
                        >
                            <Home className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                            Back to Home
                        </Button>
                    </Link>
                    <Link href="/dashboard">
                        <Button
                            size="lg"
                            variant="outline"
                            className="h-14 min-w-[200px] text-lg border-2 border-primary/30 hover:border-primary hover:bg-primary/10 backdrop-blur-sm transition-all duration-300 hover:scale-105"
                        >
                            <Search className="mr-2 h-5 w-5" />
                            Browse Generators
                        </Button>
                    </Link>
                </div>

                {/* Fun Message */}
                <div className="mt-16 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
                    <p className="text-sm text-muted-foreground/70 font-mono">
                        💡 Pro tip: This page doesn't exist, but your next great project does. Get started now!
                    </p>
                </div>
            </div>

            {/* Particle System */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[
                    { left: "5%", top: "10%", delay: "0s", duration: "15s" },
                    { left: "15%", top: "60%", delay: "2s", duration: "18s" },
                    { left: "30%", top: "30%", delay: "4s", duration: "20s" },
                    { left: "50%", top: "70%", delay: "1s", duration: "17s" },
                    { left: "70%", top: "20%", delay: "3s", duration: "19s" },
                    { left: "85%", top: "50%", delay: "5s", duration: "16s" },
                    { left: "25%", top: "80%", delay: "2.5s", duration: "21s" },
                    { left: "60%", top: "40%", delay: "4.5s", duration: "14s" },
                ].map((particle, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 rounded-full bg-primary/30 animate-particle"
                        style={{
                            left: particle.left,
                            top: particle.top,
                            animationDelay: particle.delay,
                            animationDuration: particle.duration,
                        }}
                    ></div>
                ))}
            </div>
        </div>
    )
}
