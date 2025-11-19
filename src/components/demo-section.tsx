"use client"

import { useState, useEffect } from "react"
import { Copy, Check, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DemoSection() {
    const [copied, setCopied] = useState(false)
    const [currentStep, setCurrentStep] = useState(0)

    const steps = [
        { title: "Browse Generators", description: "Choose from 50+ production-ready templates" },
        { title: "Copy Prompt", description: "One click to copy the perfect prompt" },
        { title: "Generate Code", description: "Paste into ChatGPT or Claude and get instant results" },
        { title: "Ship Faster", description: "Deploy production-ready code in minutes" }
    ]

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStep((prev) => (prev + 1) % steps.length)
        }, 3000)
        return () => clearInterval(interval)
    }, [])

    const examplePrompt = `Create a Next.js 14 authentication system with:
- Clerk integration
- Protected routes with middleware
- User dashboard with profile management
- TypeScript and Tailwind CSS
- Full type safety`

    const handleCopy = () => {
        navigator.clipboard.writeText(examplePrompt)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <section className="py-20 md:py-32 bg-gradient-to-b from-background to-muted/20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-primary backdrop-blur-sm mb-4">
                        <Sparkles className="h-4 w-4" />
                        How It Works
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        From Idea to Code in{" "}
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            Seconds
                        </span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Stop wasting hours on boilerplate. Our expert-crafted prompts generate production-ready code instantly.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                    {/* Demo Animation */}
                    <div className="order-2 md:order-1">
                        <div className="relative">
                            {/* Prompt Card with Animation */}
                            <div className="bg-card border border-border rounded-xl p-6 shadow-2xl hover:shadow-[0_0_40px_rgba(139,92,246,0.3)] transition-all duration-300">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <div className="h-3 w-3 rounded-full bg-red-500"></div>
                                        <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                                    </div>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={handleCopy}
                                        className="gap-2"
                                    >
                                        {copied ? (
                                            <>
                                                <Check className="h-4 w-4 text-green-500" />
                                                <span className="text-green-500">Copied!</span>
                                            </>
                                        ) : (
                                            <>
                                                <Copy className="h-4 w-4" />
                                                Copy
                                            </>
                                        )}
                                    </Button>
                                </div>
                                <div className="bg-muted/50 rounded-lg p-4 font-mono text-sm">
                                    <pre className="whitespace-pre-wrap text-foreground/90">
                                        {examplePrompt}
                                    </pre>
                                </div>
                                <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                                    <Sparkles className="h-3 w-3 text-primary" />
                                    <span>Next.js SaaS Starter Generator</span>
                                </div>
                            </div>

                            {/* Floating Animation Elements */}
                            <div className="absolute -top-4 -right-4 bg-primary/20 rounded-full p-3 animate-bounce">
                                <Sparkles className="h-6 w-6 text-primary" />
                            </div>
                        </div>
                    </div>

                    {/* Steps */}
                    <div className="order-1 md:order-2 space-y-6">
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                className={`flex gap-4 p-4 rounded-xl transition-all duration-500 ${currentStep === index
                                        ? "bg-primary/10 border border-primary/30 scale-105"
                                        : "bg-card/50 border border-border/50"
                                    }`}
                            >
                                <div
                                    className={`flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full font-bold transition-all duration-500 ${currentStep === index
                                            ? "bg-primary text-primary-foreground scale-110"
                                            : "bg-muted text-muted-foreground"
                                        }`}
                                >
                                    {index + 1}
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1">{step.title}</h3>
                                    <p className="text-sm text-muted-foreground">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Stats */}
                <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                    <div className="text-center">
                        <div className="text-4xl font-bold text-primary mb-2">50+</div>
                        <div className="text-sm text-muted-foreground">Generators</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-primary mb-2">10x</div>
                        <div className="text-sm text-muted-foreground">Faster Development</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-primary mb-2">100%</div>
                        <div className="text-sm text-muted-foreground">Production Ready</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                        <div className="text-sm text-muted-foreground">Access</div>
                    </div>
                </div>
            </div>
        </section>
    )
}
