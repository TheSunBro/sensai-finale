"use client";

import { motion } from "framer-motion";
import NextImage from "next/image";
import DeepDive from "./DeepDive";
import Footer from "./Footer";
import Contact from "./Contact";

export default function Manifesto() {
    return (
        <div className="relative w-full z-40 bg-black">
            {/* Background Extension: Matches the "Wall" from Outro */}
            <div className="absolute inset-0 z-0">
                <NextImage
                    src="/images/Hero%20Background.webp"
                    alt="Background Wall"
                    fill
                    priority
                    quality={75}
                    sizes="100vw"
                    className="object-cover opacity-100" // Always visible
                />
                {/* Overlay for readability */}
                <div className="absolute inset-0 bg-black/60" />
            </div>

            {/* Content Container - Normal Scroll */}
            <div className="relative z-10 flex flex-col items-center">

                {/* 1. MANIFESTO / WHO WE ARE */}
                <section className="min-h-[80vh] flex flex-col items-center justify-center px-6 max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-amber-500 font-mono text-xs tracking-[0.3em] uppercase mb-6 block">
                            Manifesto
                        </span>
                        <h2 className="text-4xl md:text-6xl font-thin text-white leading-tight mb-8">
                            We don't just build websites.<br />
                            <span className="text-white/50">We engineer cognitive states.</span>
                        </h2>
                        <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed max-w-2xl mx-auto">
                            In an age of infinite noise, the only luxury is focus.
                            sensAI combines high-fidelity aesthetics with algorithmic SEO intelligence
                            to create digital spaces that command attention and induce Flow.
                        </p>
                    </motion.div>
                </section>

                {/* 2. WHAT WE DO (Deep Dive) */}
                <DeepDive />

                {/* 3. SELECTED WORKS (What We Did) */}
                <section className="w-full max-w-7xl mx-auto px-6 py-24">
                    <motion.header
                        className="mb-16 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white drop-shadow-2xl mb-4">
                            Selected Works
                        </h2>
                        <p className="text-white/60 max-w-2xl mx-auto font-mono text-sm">
                            [ CASE_STUDIES: DECLASSIFIED ]
                        </p>
                    </motion.header>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Work 1 */}
                        <motion.div
                            className="group relative aspect-video bg-white/5 rounded-2xl overflow-hidden border border-white/10"
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                                <span className="text-white/20 font-mono text-4xl">PROJECT_ALPHA</span>
                            </div>
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                                <h3 className="text-2xl font-bold text-white mb-2">Neon Genesis</h3>
                                <p className="text-amber-400 font-mono text-xs">Fintech / WebGL</p>
                            </div>
                        </motion.div>

                        {/* Work 2 */}
                        <motion.div
                            className="group relative aspect-video bg-white/5 rounded-2xl overflow-hidden border border-white/10"
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                                <span className="text-white/20 font-mono text-4xl">PROJECT_BETA</span>
                            </div>
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                                <h3 className="text-2xl font-bold text-white mb-2">Cyber Noir</h3>
                                <p className="text-blue-400 font-mono text-xs">Fashion / eCommerce</p>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* 4. CONTACT / CTA */}
                <Contact />

                {/* 5. FOOTER */}
                <Footer />
            </div>
        </div>
    );
}
