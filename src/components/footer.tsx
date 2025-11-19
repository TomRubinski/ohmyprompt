"use client"

import Link from "next/link"
import { Logo } from "@/components/logo"
import { Github, Twitter, Linkedin, Mail, Heart, ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    return (
        <footer className="relative overflow-hidden border-t border-border/50 bg-gradient-to-b from-background to-muted/20">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] animate-pulse-slow"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: "2s" }}></div>

            <div className="container relative z-10 mx-auto px-4 py-16 md:py-20">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
                            <Logo className="h-12 w-12 group-hover:scale-110 transition-transform" />
                            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                Oh My Prompt
                            </span>
                        </Link>
                        <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
                            Expert-crafted AI prompts for developers who want to ship faster.
                            Stop writing boilerplate, start building features.
                        </p>
                        <div className="flex gap-3">
                            {[
                                { icon: Twitter, href: "#", label: "Twitter" },
                                { icon: Github, href: "#", label: "GitHub" },
                                { icon: Linkedin, href: "#", label: "LinkedIn" },
                                { icon: Mail, href: "mailto:hello@ohmyprompt.com", label: "Email" },
                            ].map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    aria-label={social.label}
                                    className="group relative p-3 rounded-xl bg-card/50 border border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-110"
                                >
                                    <social.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Product Column */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Product</h3>
                        <ul className="space-y-3">
                            {[
                                { label: "Generators", href: "/dashboard" },
                                { label: "Pricing", href: "#pricing" },
                                { label: "Documentation", href: "#" },
                                { label: "Changelog", href: "#" },
                            ].map((link, index) => (
                                <li key={index}>
                                    <Link
                                        href={link.href}
                                        className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2 group"
                                    >
                                        <span className="h-1 w-1 rounded-full bg-primary/50 group-hover:bg-primary transition-colors"></span>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Company</h3>
                        <ul className="space-y-3">
                            {[
                                { label: "About", href: "#" },
                                { label: "Blog", href: "#" },
                                { label: "Careers", href: "#" },
                                { label: "Contact", href: "#" },
                            ].map((link, index) => (
                                <li key={index}>
                                    <Link
                                        href={link.href}
                                        className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2 group"
                                    >
                                        <span className="h-1 w-1 rounded-full bg-primary/50 group-hover:bg-primary transition-colors"></span>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="relative mb-8">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-border/50"></div>
                    </div>
                    <div className="relative flex justify-center">
                        <button
                            onClick={scrollToTop}
                            className="group bg-card/80 backdrop-blur-sm border border-border/50 hover:border-primary/50 rounded-full p-3 transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                            aria-label="Scroll to top"
                        >
                            <ArrowUp className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </button>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <span>© {new Date().getFullYear()} Oh My Prompt.</span>
                        <span className="hidden md:inline">Made with</span>
                        <Heart className="h-4 w-4 text-red-500 fill-red-500 animate-pulse" />
                        <span className="hidden md:inline">for developers</span>
                    </div>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-primary transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="#" className="hover:text-primary transition-colors">
                            Terms of Service
                        </Link>
                        <Link href="#" className="hover:text-primary transition-colors">
                            Cookie Policy
                        </Link>
                    </div>
                </div>

                {/* Decorative Text */}
                <div className="mt-12 text-center">
                    <p className="text-xs text-muted-foreground/50 font-mono">
                        // Ship faster. Code better. Build amazing things. 🚀
                    </p>
                </div>
            </div>

            {/* Floating Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[
                    { left: "15%", delay: "0s", duration: "12s" },
                    { left: "35%", delay: "1.5s", duration: "15s" },
                    { left: "55%", delay: "3s", duration: "18s" },
                    { left: "75%", delay: "0.8s", duration: "14s" },
                    { left: "25%", delay: "2.2s", duration: "16s" },
                    { left: "65%", delay: "1.2s", duration: "13s" },
                    { left: "45%", delay: "2.8s", duration: "17s" },
                    { left: "85%", delay: "0.5s", duration: "19s" },
                    { left: "10%", delay: "3.5s", duration: "11s" },
                    { left: "90%", delay: "1.8s", duration: "20s" },
                ].map((particle, i) => (
                    <div
                        key={i}
                        className="absolute h-1 w-1 rounded-full bg-primary/20 animate-particle"
                        style={{
                            left: particle.left,
                            bottom: "0%",
                            animationDelay: particle.delay,
                            animationDuration: particle.duration,
                        }}
                    ></div>
                ))}
            </div>
        </footer>
    )
}
