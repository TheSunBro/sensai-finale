"use client";

import { motion } from "framer-motion";

export default function DeepDive() {
    return (
        <section
            id="deep-dive"
            className="w-full max-w-7xl mx-auto px-6 py-24 flex flex-col items-center justify-center relative z-20"
            aria-label="Core Capabilities and Services"
        >
            {/* Header: Semantic H2 for SEO */}
            <motion.header
                className="mb-16 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white drop-shadow-2xl mb-4">
                    The Cognitive Core
                </h2>
                <p className="text-white/60 max-w-2xl mx-auto font-mono text-sm leading-relaxed">
                    [ SYSTEM_ARCHITECTURE: 3-TIER INTELLIGENCE ]
                </p>
            </motion.header>

            {/* Content Grid: Hick's Law (3 Options max for easy scanning) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">

                {/* Article 1: Intelligence */}
                <motion.article
                    className="group relative p-8 rounded-3xl bg-black/20 backdrop-blur-md border border-white/10 hover:bg-white/5 transition-all duration-500 overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1, duration: 0.8 }}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-amber-500/0 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <h3 className="text-2xl font-bold text-white mb-4 tracking-wide group-hover:text-amber-400 transition-colors">
                        Intelligence
                    </h3>
                    <p className="text-white/60 leading-relaxed text-sm mb-6">
                        Advanced algorithmic strategies for high-fidelity video SEO. We decode search intent to position you as the authority.
                    </p>
                    <ul className="space-y-2 font-mono text-xs text-amber-500/80">
                        <li className="flex items-center gap-2">
                            <span className="w-1 h-1 bg-amber-500 rounded-full" /> Semantic Analysis
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-1 h-1 bg-amber-500 rounded-full" /> User Intent Mapping
                        </li>
                    </ul>
                </motion.article>

                {/* Article 2: Capabilities */}
                <motion.article
                    className="group relative p-8 rounded-3xl bg-black/20 backdrop-blur-md border border-white/10 hover:bg-white/5 transition-all duration-500 overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-500/0 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <h3 className="text-2xl font-bold text-white mb-4 tracking-wide group-hover:text-blue-400 transition-colors">
                        Capabilities
                    </h3>
                    <p className="text-white/60 leading-relaxed text-sm mb-6">
                        Full-stack Next.js architecture blended with WebGL immersion. We build digital spaces that feel alive.
                    </p>
                    <ul className="space-y-2 font-mono text-xs text-blue-500/80">
                        <li className="flex items-center gap-2">
                            <span className="w-1 h-1 bg-blue-500 rounded-full" /> React Three Fiber
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-1 h-1 bg-blue-500 rounded-full" /> Kinetic Typography
                        </li>
                    </ul>
                </motion.article>

                {/* Article 3: System */}
                <motion.article
                    className="group relative p-8 rounded-3xl bg-black/20 backdrop-blur-md border border-white/10 hover:bg-white/5 transition-all duration-500 overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/0 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <h3 className="text-2xl font-bold text-white mb-4 tracking-wide group-hover:text-cyan-400 transition-colors">
                        System
                    </h3>
                    <p className="text-white/60 leading-relaxed text-sm mb-6">
                        Performance-first engineering. 10x optimization for LCP, CLS, and FID metrics using edge computing.
                    </p>
                    <ul className="space-y-2 font-mono text-xs text-cyan-500/80">
                        <li className="flex items-center gap-2">
                            <span className="w-1 h-1 bg-cyan-500 rounded-full" /> Edge Deployment
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-1 h-1 bg-cyan-500 rounded-full" /> Global CDN
                        </li>
                    </ul>
                </motion.article>

            </div>
        </section>
    );
}
