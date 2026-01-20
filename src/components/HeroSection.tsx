"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <div ref={containerRef} className="relative h-screen w-full overflow-hidden">
            <motion.div
                style={{ y, opacity }}
                className="absolute inset-0 z-0"
            >
                {/* Actual Hero Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: "url('/images/Hero%20Background.webp')",
                        // Slight scale to allow for parallax movement without edges showing
                        transform: "scale(1.1)"
                    }}
                />
                {/* Gradient Overlay for text readability - darker at top for Nav */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#eaeaea] dark:to-[#121212]" />
            </motion.div>

            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                    className="text-5xl md:text-8xl font-light tracking-tighter text-white mb-6 drop-shadow-2xl mix-blend-overlay"
                >
                    sensAI
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 1 }}
                    className="text-sm md:text-base font-mono tracking-[0.5em] text-white/80 uppercase drop-shadow-lg"
                >
                    Cognitive Luxury
                </motion.p>
            </div>
        </div>
    );
}
