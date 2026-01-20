"use client";

import { motion } from "framer-motion";

export default function Footer() {
    return (
        <footer className="relative w-full bg-transparent text-white/40 font-mono text-xs py-24 overflow-hidden border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-20">

                    {/* Brand Column - Minimalist */}
                    <div className="md:col-span-4 flex flex-col gap-6">
                        <h2 className="text-4xl text-white font-bold tracking-tighter mix-blend-difference">
                            sensAI
                        </h2>
                        <p className="max-w-xs leading-relaxed text-white/50">
                            Cognitive Luxury & High-Fidelity Video SEO Intelligence.
                            We engineer digital presence.
                        </p>
                    </div>

                    {/* Navigation - Hick's Law: Only essentials */}
                    <div className="md:col-span-2 md:col-start-7 flex flex-col gap-4">
                        <h3 className="text-white font-semibold tracking-widest uppercase mb-2">Platform</h3>
                        {["Intelligence", "Capabilities", "Showcase"].map((item) => (
                            <a key={item} href="#" className="hover:text-cyan-400 transition-colors duration-300 w-fit">
                                {item}
                            </a>
                        ))}
                    </div>

                    {/* Connect - Clean */}
                    <div className="md:col-span-2 flex flex-col gap-4">
                        <h3 className="text-white font-semibold tracking-widest uppercase mb-2">Connect</h3>
                        {["LinkedIn", "Twitter", "Email"].map((item) => (
                            <a key={item} href="#" className="hover:text-cyan-400 transition-colors duration-300 w-fit">
                                {item}
                            </a>
                        ))}
                    </div>

                    {/* Legal - Subtle */}
                    <div className="md:col-span-2 flex flex-col gap-4">
                        <h3 className="text-white font-semibold tracking-widest uppercase mb-2">Legal</h3>
                        {["Privacy Policy", "Terms of Service"].map((item) => (
                            <a key={item} href="#" className="hover:text-cyan-400 transition-colors duration-300 w-fit">
                                {item}
                            </a>
                        ))}
                    </div>
                </div>

                {/* SEO Keyword Cluster (Hick's Law: Low contrast, structural, non-intrusive) */}
                <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <p className="">
                        © {new Date().getFullYear()} sensAI. All rights reserved.
                    </p>

                    {/* Semantic SEO Tagging without visual clutter */}
                    <nav aria-label="SEO Keywords" className="flex flex-wrap gap-4 md:gap-8 opacity-40 hover:opacity-100 transition-opacity duration-500">
                        <span>Video SEO Agency</span>
                        <span>Next.js Architecture</span>
                        <span>Performance Optimization</span>
                        <span>Interactive 3D Web</span>
                    </nav>
                </div>
            </div>

            {/* Ambient Background Glow - Subtle finish */}
            <div className="absolute bottom-0 left-0 w-full h-[500px] bg-gradient-to-t from-cyan-900/10 to-transparent pointer-events-none" />
        </footer>
    );
}
