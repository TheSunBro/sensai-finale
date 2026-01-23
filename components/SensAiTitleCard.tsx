"use client";

import { useRef, ReactNode } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import Lenis from "lenis";
import { cn } from "@/lib/utils";

// 10x DEV: Centralized Design Theme for Hero Component
// decoupling logic from aesthetics for easier iteration
const HERO_THEME = {
    // The "Vantablack Green" structure - Obsidian Base
    border: {
        base: "border-[#011510]/90", // Vantablack Green
        reflection: "border-emerald-950/40", // Deep Reflection
        fadeMask: "linear-gradient(to bottom, black 60%, transparent 100%)", // The "Falling" Fade
    },
    // The "Plant Life" aesthetics
    water: {
        gradient: "linear-gradient(180deg, transparent 0%, rgba(4, 120, 87, 0.09) 25%, transparent 50%, rgba(4, 120, 87, 0.09) 75%, transparent 100%)", // Emerald 700 (Calm Life)
        mask: "linear-gradient(to bottom, black 60%, transparent 100%)",
    },
    // The "Zen Breath" - Subconscious Foundation
    zenBreath: {
        gradient: "linear-gradient(180deg, transparent 0%, rgba(2, 44, 34, 0.08) 30%, rgba(2, 44, 34, 0.05) 50%, rgba(2, 44, 34, 0.08) 70%, transparent 100%)",
        animation: { opacity: [0.3, 0.6, 0.3] },
        transition: { duration: 8, ease: "easeInOut" as const, repeat: Infinity },
    },
    // The "SensAI Text Sync" - Pure White Light
    beams: {
        gradient: "conic-gradient(from 0deg, transparent 0deg, rgba(255, 255, 255, 0.9) 45deg, transparent 90deg, transparent 180deg, rgba(255, 255, 255, 0.9) 225deg, transparent 270deg)",
        mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        composite: "exclude",
    },
    // Lighting Details
    glow: {
        topSource: "via-emerald-950/20", // Obsidian Source
        shadow: "rgba(2,44,34,0.1)", // Subtle deep shadow
    }
};

interface SensAiTitleCardProps {
    className?: string;
    lenis?: Lenis | null;
}

export default function SensAiTitleCard({ className, lenis }: SensAiTitleCardProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    // Scroll Logic for internal animations if needed, 
    // but since this component might be placed inside a sticky container in Hero,
    // we should rely on the *global* scroll or passes props?
    // The original code used `useScroll({ target: containerRef })` where containerRef was the deep 500vh container.
    // If we place this card *inside* that container in Hero, we can use useScroll() without target to get global scroll,
    // OR the Hero passes the scroll progress.
    // However, for modularity, let's assume this card reacts to global scroll for its internal text effects.

    // NOTE: The original effects relied on scroll [0, 1] relative to the 500vh container.
    // If we are just a component inside, `useScroll()` (global) might behave differently (0-1 for whole page).
    // But since the Hero IS the page effectively at the top, global scroll matches well enough for the top section.
    // Let's use standard global scroll for now, but scoped to the hero section would be better if we could.
    // Actually, the original code had:
    /*
        const { scrollYProgress } = useScroll({
            target: containerRef,
            offset: ["start start", "end end"],
        });
    */
    // If we put this card inside the Hero which has the ref, we might lose that context.
    // But `useScroll` with generic window is fine for the intro sequence.

    const { scrollYProgress } = useScroll();

    // 4. Text Sequence Logic (Zen Pacing - No Overlap)
    // Compressed slightly to fit the new 0.50 cutoff for frames
    const opacityCrafting = useTransform(scrollYProgress, [0.1, 0.18, 0.22, 0.25], [0, 1, 1, 0]);
    const opacityMotion = useTransform(scrollYProgress, [0.3, 0.35, 0.4, 0.43], [0, 1, 1, 0]);
    const opacityFlow = useTransform(scrollYProgress, [0.42, 0.45, 0.48, 0.52], [0, 1, 1, 0]);

    // Subtle scaling for the text to make it feel alive
    const scaleText = useTransform(scrollYProgress, [0, 0.6], [0.9, 1.1]);

    // Special "Flow" Effect Logic
    // 1. Blur: Flows from "liquid" (blurry) to "solid" (sharp)
    const flowBlur = useTransform(scrollYProgress, [0.42, 0.45, 0.48, 0.52], ["8px", "0px", "0px", "8px"]);
    // 2. Spacing: The letters "drift" apart like water
    const flowSpacing = useTransform(scrollYProgress, [0.42, 0.52], ["0em", "0.3em"]);

    return (
        <div ref={containerRef} className={cn("relative flex items-center justify-center pointer-events-none z-30 pb-0", className)}>

            {/* HICK'S LAW HERO UI: Glassmorphic Card (Central Focus) */}
            {/* Physically separates UI from background wood texture */}
            <motion.div
                className="relative p-12 md:p-16 flex flex-col items-center justify-center text-center bg-black/20 backdrop-blur-xl border border-transparent rounded-3xl shadow-2xl pointer-events-auto"
                style={{
                    opacity: useTransform(scrollYProgress, [0, 0.08], [1, 0]),
                    y: useTransform(scrollYProgress, [0.08, 0.1], ["0%", "-200%"]) // Move it way up so it doesn't block clicks
                }}
            >
                {/* Zen Green Breath (Subconscious Foundation) */}
                <motion.div
                    className="absolute inset-0 z-0 pointer-events-none mix-blend-color-dodge will-change-opacity"
                    style={{ background: HERO_THEME.zenBreath.gradient }}
                    animate={HERO_THEME.zenBreath.animation}
                    transition={HERO_THEME.zenBreath.transition}
                />

                {/* Falling Water Effect (Subliminal Liquid Flow - "The Neuro Trigger") */}
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-3xl" style={{ maskImage: HERO_THEME.water.mask }}>
                    <motion.div
                        className="absolute inset-x-0 -top-[100%] h-[200%] w-full mix-blend-color-dodge will-change-transform"
                        style={{ background: HERO_THEME.water.gradient }}
                        animate={{ y: ["0%", "50%"] }}
                        transition={{ duration: 40, ease: "linear", repeat: Infinity }}
                    />
                </div>

                {/* Open Bottom / Arch Border (Infinite Premium Feel) */}
                {/* Layer 1: The Structure - Vantablack Green Arch (Obsidian Base) */}
                <div
                    className={cn("absolute inset-0 z-10 pointer-events-none rounded-3xl border-t border-x border-b-0", HERO_THEME.border.base)}
                    style={{ maskImage: HERO_THEME.border.fadeMask }}
                />

                {/* Dark Border Beams (Rich Traveling Light) */}
                <div
                    className="absolute inset-0 z-10 pointer-events-none rounded-3xl overflow-hidden"
                    style={{ maskImage: HERO_THEME.border.fadeMask }}
                >
                    <div
                        className="absolute inset-0 rounded-3xl"
                        style={{
                            padding: "1px", // Defines beam width
                            mask: HERO_THEME.beams.mask,
                            WebkitMask: HERO_THEME.beams.mask,
                            maskComposite: HERO_THEME.beams.composite,
                            WebkitMaskComposite: "xor",
                        }}
                    >
                        <motion.div
                            className="absolute -inset-[50%] will-change-transform"
                            style={{ background: HERO_THEME.beams.gradient }}
                            animate={{ rotate: 360 }}
                            transition={{ duration: 15, ease: "linear", repeat: Infinity }}
                        />
                    </div>
                </div>

                {/* Top Source Glow (Subtle Lip of Light - Deepest Obsidian Green) */}
                <div className={cn("absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent z-20", HERO_THEME.glow.topSource)} style={{ boxShadow: `0 1px 10px ${HERO_THEME.glow.shadow}` }} />

                {/* Refraction Caustics - Top-heavy internal glow (Masked to fade) */}
                <div
                    className="absolute inset-0 z-10 pointer-events-none rounded-3xl shadow-[inset_0_10px_20px_rgba(2,44,34,0.3)]"
                    style={{ maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)" }}
                />

                {/* Surface Reflection - Rising Light (Wrapped in Fade Mask) */}
                <div className="absolute inset-0 z-10 pointer-events-none" style={{ maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)" }}>
                    <motion.div
                        className="absolute inset-0 rounded-3xl border-t border-x border-b-0 border-emerald-950/40"
                        style={{
                            maskImage: "linear-gradient(110deg, transparent 30%, black 50%, transparent 70%)",
                            maskSize: "200% 200%",
                        }}
                        animate={{
                            maskPosition: ["0% 0%", "100% 0%", "0% 0%"]
                        }}
                        transition={{
                            duration: 20,
                            ease: "easeInOut",
                            repeat: Infinity
                        }}
                    />
                </div>

                {/* Brand Title */}
                {/* Brand Title - Glass Text Aesthetic */}
                <h1 className="relative z-10 text-6xl md:text-9xl font-bold tracking-tighter mb-4 bg-gradient-to-b from-white via-white/90 to-white/60 text-transparent bg-clip-text drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                    sensAI
                </h1>

                {/* Tagline - Refined Hierarchy */}
                {/* Tagline - Refined Hierarchy: KITT Scanner Effect (Hypnotic White Glow) */}
                <div className="relative mb-10 overflow-visible">
                    {/* Base Layer: Dim White (Visible foundation, prevents "floating" look) */}
                    <p className="text-sm md:text-lg text-white/30 font-light tracking-[0.4em] uppercase select-none drop-shadow-sm">
                        Kino im Kopf. KINO im Workflow.
                    </p>

                    {/* Scanner Layer: Pure White Light with Strong Glow (The Beam) */}
                    <motion.p
                        className="absolute inset-0 text-sm md:text-lg text-white font-light tracking-[0.4em] uppercase select-none drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                        style={{
                            // Gradient Mask: Transparent -> Solid -> Transparent
                            maskImage: "linear-gradient(90deg, transparent 0%, #000 50%, transparent 100%)",
                            WebkitMaskImage: "linear-gradient(90deg, transparent 0%, #000 50%, transparent 100%)",
                            maskSize: "50% 100%", // Wider Beam to ensure visibility on both sentences
                            WebkitMaskSize: "50% 100%",
                            maskRepeat: "no-repeat",
                            WebkitMaskRepeat: "no-repeat",
                        }}
                        animate={{
                            maskPosition: ["-100% 0px", "200% 0px"], // Sweep fully across and out
                        }}
                        transition={{
                            duration: 8, // "Hypnotic" deep breath pacing (4s in, 4s out)
                            ease: "easeInOut", // Smooth turn-around like KITT
                            repeat: Infinity,
                            repeatType: "reverse" // Back and forth
                        }}
                    >
                        Kino im Kopf. KINO im Workflow.
                    </motion.p>
                </div>

                {/* CTA Button - Consistent Premium Gold */}
                <motion.a
                    href="#contact"
                    onClick={(e) => {
                        e.preventDefault();
                        if (lenis) {
                            lenis.scrollTo('#contact', {
                                duration: 4,
                                easing: (t) => t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2
                            });
                        } else {
                            document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                        }
                    }}
                    className="relative px-8 py-4 bg-gradient-to-b from-white via-white/90 to-white/60 text-black text-xs md:text-sm font-bold tracking-widest uppercase rounded-full cursor-pointer z-50 overflow-hidden inline-block"
                    whileHover={{ scale: 1.05, backgroundColor: "#fbbf24" }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                        boxShadow: [
                            "0 0 0px rgba(245, 158, 11, 0.2)",
                            "0 0 25px rgba(245, 158, 11, 0.5)",
                            "0 0 0px rgba(245, 158, 11, 0.2)"
                        ]
                    }}
                    transition={{
                        boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                        default: { duration: 0.3 }
                    }}
                >
                    <span className="relative z-10">Begin Journey</span>

                    {/* Inner Shimmer/Border Highlighting */}
                    <div className="absolute inset-0 rounded-full border border-amber-500/50 opacity-50" />
                </motion.a>
            </motion.div>

            {/* SIDE LIGHTING: Dynamic God Rays that react to scroll */}
            {/* Left Warm Light (Active during CRAFTING) */}
            <motion.div
                className="absolute left-0 top-1/2 -translate-y-1/2 w-1/3 h-full bg-gradient-to-r from-amber-500/10 to-transparent blur-[100px] pointer-events-none mix-blend-screen"
                style={{ opacity: opacityCrafting }}
            />
            {/* Right Cool Light (Active during MOTION) */}
            <motion.div
                className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-full bg-gradient-to-l from-blue-500/10 to-transparent blur-[100px] pointer-events-none mix-blend-screen"
                style={{ opacity: opacityMotion }}
            />

            {/* SCROLL SEQUENCE: Cinematic Typography */}

            {/* CRAFTING: Staggered "Construction" Effect */}
            {/* Letters appear one by one, building the word */}


            {/* We need the CRAFTING/MOTION/FLOW words to be visible OUTSIDE the card too.
                The original structure had them as siblings to the card.
                In this component, we are including them. 
                So this component acts as the "Hero Overlay Layer".
            */}

            {/* CRAFTING (Re-doing structure to match original more closely) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="flex gap-[0.2em]">
                    {["C", "R", "A", "F", "T", "I", "N", "G"].map((char, i) => {
                        const start = 0.08 + (i * 0.01);
                        const end = start + 0.02;
                        return (
                            <motion.span
                                key={i}
                                className="text-6xl md:text-9xl font-thin text-amber-50/90 font-sans drop-shadow-[0_0_30px_rgba(251,191,36,0.2)] mix-blend-overlay"
                                style={{
                                    opacity: useTransform(scrollYProgress, [start, end, 0.28, 0.32], [0, 1, 1, 0]),
                                    y: useTransform(scrollYProgress, [start, end], [20, 0]),
                                    scale: scaleText
                                }}
                            >
                                {char}
                            </motion.span>
                        );
                    })}
                </div>
            </div>

            {/* MOTION: Kinetic Blur & Velocity */}
            <motion.h2
                className="absolute text-6xl md:text-9xl font-thin tracking-[0.2em] text-blue-50/90 font-sans text-center w-full drop-shadow-[0_0_30px_rgba(147,197,253,0.3)] mix-blend-overlay"
                style={{
                    opacity: opacityMotion,
                    scale: scaleText,
                    x: useTransform(scrollYProgress, [0.4, 0.5, 0.6, 0.7], ["-100px", "0px", "0px", "100px"]),
                    filter: useTransform(scrollYProgress, [0.4, 0.5, 0.6, 0.7], ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"]),
                }}
            >
                MOTION
            </motion.h2>

            {/* FLOW: Digital, Fluid, Entry to Virtual */}
            <motion.h2
                className="absolute text-6xl md:text-9xl font-thin tracking-[0.2em] text-cyan-50/90 font-sans text-center w-full drop-shadow-[0_0_40px_rgba(34,211,238,0.4)] mix-blend-screen"
                style={{
                    opacity: opacityFlow,
                    scale: scaleText,
                    filter: useTransform(flowBlur, (val) => `blur(${val})`),
                    letterSpacing: flowSpacing
                }}
            >
                FLOW
            </motion.h2>
        </div>
    );
}
