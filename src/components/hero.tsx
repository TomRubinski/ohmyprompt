"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Code2, Rocket, Terminal, Zap } from "lucide-react"
import { Logo } from "@/components/logo"

export function Hero() {
    const [typedText, setTypedText] = useState("")
    const [currentWordIndex, setCurrentWordIndex] = useState(0)
    const words = ["Frontend", "Backend", "DevOps", "Full-Stack", "AI Prompts"]

    const floatingSnippets = [
        { code: "npm create next-app", top: "10%", left: "5%", delay: "0s" },
        { code: "const api = await fetch()", top: "20%", right: "8%", delay: "0.5s" },
        { code: "docker compose up", top: "60%", left: "10%", delay: "1s" },
        { code: "git push origin main", top: "70%", right: "5%", delay: "1.5s" },
        { code: "prisma migrate dev", top: "40%", left: "3%", delay: "2s" },
        { code: "stripe checkout create", top: "50%", right: "12%", delay: "2.5s" },
    ]

    useEffect(() => {
        const currentWord = words[currentWordIndex]
        let currentIndex = 0

        const typingInterval = setInterval(() => {
            if (currentIndex <= currentWord.length) {
                setTypedText(currentWord.slice(0, currentIndex))
                currentIndex++
            } else {
                clearInterval(typingInterval)
                setTimeout(() => {
                    setCurrentWordIndex((prev) => (prev + 1) % words.length)
                }, 2000)
            }
        }, 100)

        return () => clearInterval(typingInterval)
    }, [currentWordIndex])

    return (
        <section className="relative overflow-hidden min-h-[90vh] flex items-center">
            {/* Animated Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5 animate-gradient-shift"></div>

            {/* Floating Code Snippets */}
            {floatingSnippets.map((snippet, index) => (
                <div
                    key={index}
                    className="absolute hidden md:block font-mono text-xs bg-card/40 backdrop-blur-md border border-primary/20 rounded-lg px-3 py-2 shadow-lg animate-float"
                    style={{
                        top: snippet.top,
                        left: snippet.left,
                        right: snippet.right,
                        animationDelay: snippet.delay,
                        animationDuration: "6s",
                    }}
                >
                    <span className="text-primary">$</span> {snippet.code}
                </div>
            ))}

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>

            <div className="container relative z-10 mx-auto px-4">
                <div className="max-w-5xl mx-auto text-center">
                    {/* Animated Badge */}
                    <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-primary backdrop-blur-sm animate-fade-in-up shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
                        </span>
                        <Sparkles className="h-4 w-4" />
                        <span className="font-semibold">50+ Production-Ready Generators</span>
                    </div>

                    {/* Main Title with Logo */}
                    <div className="mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                        <div className="flex items-center justify-center gap-4 mb-4">
                            <Logo className="h-20 w-20 md:h-28 md:w-28 animate-pulse-slow" />
                        </div>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight">
                            <span className="block text-foreground mb-2">Oh My Prompt</span>
                            <span className="block bg-gradient-to-r from-primary via-purple-500 to-secondary bg-clip-text text-transparent animate-gradient-x bg-[length:200%_auto]">
                                for {typedText}
                                <span className="animate-blink">|</span>
                            </span>
                        </h1>
                    </div>

                    {/* Subtitle */}
                    <p className="mx-auto mb-10 max-w-3xl text-xl md:text-2xl text-muted-foreground leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                        Stop wasting hours on boilerplate code.{" "}
                        <span className="text-foreground font-semibold">Copy expert-crafted prompts</span>,
                        paste into ChatGPT, and{" "}
                        <span className="text-primary font-semibold">ship production-ready code</span> in minutes.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                        <Link href="#pricing">
                            <Button
                                size="lg"
                                className="group h-14 min-w-[220px] text-lg font-bold bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-[0_0_30px_rgba(139,92,246,0.5)] hover:shadow-[0_0_50px_rgba(139,92,246,0.8)] transition-all duration-300 hover:scale-105"
                            >
                                Get Started Now
                                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                        <Link href="/sign-in">
                            <Button
                                variant="outline"
                                size="lg"
                                className="h-14 min-w-[220px] text-lg border-2 border-primary/30 hover:border-primary hover:bg-primary/10 backdrop-blur-sm transition-all duration-300 hover:scale-105"
                            >
                                Log In
                            </Button>
                        </Link>
                    </div>

                    {/* Feature Pills */}
                    <div className="flex flex-wrap items-center justify-center gap-3 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
                        {[
                            { icon: Zap, text: "Instant Results", color: "from-yellow-500 to-orange-500" },
                            { icon: Code2, text: "Production Ready", color: "from-blue-500 to-cyan-500" },
                            { icon: Rocket, text: "Ship 10x Faster", color: "from-purple-500 to-pink-500" },
                            { icon: Terminal, text: "Best Practices", color: "from-green-500 to-emerald-500" },
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105 group"
                            >
                                <div className={`p-1.5 rounded-full bg-gradient-to-r ${feature.color}`}>
                                    <feature.icon className="h-3.5 w-3.5 text-white" />
                                </div>
                                <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                                    {feature.text}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Enhanced Background Effects */}
            <div className="absolute top-1/2 left-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[120px] animate-pulse-slow"></div>
            <div className="absolute top-0 right-0 -z-10 h-[400px] w-[400px] bg-secondary/15 blur-[100px] animate-pulse-slow" style={{ animationDelay: "1s" }}></div>
            <div className="absolute bottom-0 left-0 -z-10 h-[350px] w-[350px] bg-purple-500/10 blur-[90px] animate-pulse-slow" style={{ animationDelay: "2s" }}></div>


            {/* Particle Effect */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                {[
                    { left: "10%", top: "20%", delay: "0s", duration: "8s" },
                    { left: "25%", top: "60%", delay: "1s", duration: "12s" },
                    { left: "40%", top: "15%", delay: "2s", duration: "10s" },
                    { left: "55%", top: "70%", delay: "0.5s", duration: "15s" },
                    { left: "70%", top: "30%", delay: "1.5s", duration: "9s" },
                    { left: "15%", top: "80%", delay: "2.5s", duration: "11s" },
                    { left: "85%", top: "50%", delay: "3s", duration: "13s" },
                    { left: "30%", top: "40%", delay: "0.8s", duration: "14s" },
                    { left: "60%", top: "10%", delay: "1.8s", duration: "7s" },
                    { left: "45%", top: "90%", delay: "2.2s", duration: "10s" },
                    { left: "20%", top: "55%", delay: "3.5s", duration: "12s" },
                    { left: "75%", top: "25%", delay: "1.2s", duration: "9s" },
                    { left: "35%", top: "75%", delay: "2.8s", duration: "11s" },
                    { left: "90%", top: "45%", delay: "0.3s", duration: "13s" },
                    { left: "50%", top: "35%", delay: "1.7s", duration: "8s" },
                    { left: "65%", top: "65%", delay: "2.3s", duration: "14s" },
                    { left: "5%", top: "50%", delay: "3.2s", duration: "10s" },
                    { left: "80%", top: "15%", delay: "0.7s", duration: "12s" },
                    { left: "22%", top: "85%", delay: "1.9s", duration: "9s" },
                    { left: "95%", top: "60%", delay: "2.6s", duration: "11s" },
                ].map((particle, i) => (
                    <div
                        key={i}
                        className="absolute h-1 w-1 rounded-full bg-primary/30 animate-particle"
                        style={{
                            left: particle.left,
                            top: particle.top,
                            animationDelay: particle.delay,
                            animationDuration: particle.duration,
                        }}
                    ></div>
                ))}
            </div>
        </section>
    )
}
