"use client"

import { Heart, Lightbulb, Target, Users } from "lucide-react"

export function AboutSection() {
    return (
        <section className="relative py-20 md:py-32 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-background to-muted/20"></div>

            {/* Decorative Elements */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-[100px] animate-pulse-slow"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: "2s" }}></div>

            <div className="container relative z-10 mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16 animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-primary backdrop-blur-sm mb-6">
                        <Heart className="h-4 w-4" />
                        Our Story
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                        Built by Developers,{" "}
                        <span className="bg-gradient-to-r from-primary via-purple-500 to-secondary bg-clip-text text-transparent">
                            for Developers
                        </span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        We were tired of spending hours crafting the perfect prompt, only to get mediocre results.
                        So we built a library of battle-tested prompts that actually work.
                    </p>
                </div>

                {/* Story Cards */}
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
                    {[
                        {
                            icon: Lightbulb,
                            title: "The Problem",
                            description: "Developers waste 5-10 hours per week writing boilerplate code. AI can help, but only with the right prompts.",
                            gradient: "from-yellow-500/20 to-orange-500/20",
                            iconColor: "text-yellow-500",
                        },
                        {
                            icon: Target,
                            title: "The Solution",
                            description: "Expert-crafted prompts that generate production-ready code. No more trial and error. Just copy, paste, and ship.",
                            gradient: "from-primary/20 to-purple-500/20",
                            iconColor: "text-primary",
                        },
                        {
                            icon: Users,
                            title: "The Mission",
                            description: "Democratize access to high-quality AI prompts. Help developers ship faster and focus on what matters.",
                            gradient: "from-secondary/20 to-emerald-500/20",
                            iconColor: "text-secondary",
                        },
                    ].map((card, index) => (
                        <div
                            key={index}
                            className="group relative animate-fade-in-up"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                            <div className="relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 hover:transform hover:scale-105">
                                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${card.gradient} mb-6`}>
                                    <card.icon className={`h-8 w-8 ${card.iconColor}`} />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{card.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">{card.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Stats Banner */}
                <div className="relative animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-purple-500/20 to-secondary/20 rounded-3xl blur-2xl"></div>
                    <div className="relative bg-card/30 backdrop-blur-xl border border-primary/20 rounded-3xl p-8 md:p-12">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {[
                                { value: "10,000+", label: "Hours Saved" },
                                { value: "50+", label: "Generators" },
                                { value: "100%", label: "Production Ready" },
                                { value: "∞", label: "Possibilities" },
                            ].map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-muted-foreground font-medium">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Quote */}
                <div className="mt-20 text-center animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
                    <blockquote className="text-2xl md:text-3xl font-medium text-foreground/90 max-w-4xl mx-auto italic">
                        "Stop reinventing the wheel. Start shipping features."
                    </blockquote>
                    <p className="mt-4 text-muted-foreground">— The Oh My Prompt Team</p>
                </div>
            </div>
        </section>
    )
}
