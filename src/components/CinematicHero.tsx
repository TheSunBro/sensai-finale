"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import NextImage from "next/image";
import Lenis from "lenis";
import { cn } from "../lib/utils";

// ... [existing imports]

// ... [inside component]

{/* CTA Button - Clear Action */ }
<button
    onClick={() => window.scrollTo({ top: window.innerHeight * 0.2, behavior: 'smooth' })}
    className="px-8 py-4 bg-white text-black text-xs md:text-sm font-bold tracking-widest uppercase hover:bg-cyan-400 hover:scale-105 transition-all duration-300 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] cursor-pointer"
>
    Begin Journey
</button>

const FRAMES = [
    "/images/wqweb/images (1).webp",
    "/images/wqweb/images (2).webp",
    "/images/wqweb/images (3).webp",
    "/images/wqweb/images (4).webp",
    "/images/wqweb/images (5).webp",
    "/images/wqweb/images (6).webp",
    "/images/wqweb/images (8).webp",
    "/images/wqweb/images (9).webp",
    "/images/wqweb/images (10).webp",
    "/images/wqweb/images (11).webp",
    "/images/wqweb/images (14).webp",
    "/images/wqweb/images (15).webp",
    "/images/wqweb/images (16).webp",
];

interface CinematicHeroProps {
    children?: ReactNode;
    className?: string;
    lenis?: Lenis | null;
}

export default function CinematicHero({ children, className, lenis }: CinematicHeroProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Preload images
    useEffect(() => {
        let loadedCount = 0;
        const imgs: HTMLImageElement[] = [];

        FRAMES.forEach((src) => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                loadedCount++;
                if (loadedCount === FRAMES.length) {
                    setIsLoaded(true);
                }
            };
            imgs.push(img);
        });
        setImages(imgs);
    }, []);

    // Scroll Logic
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // 1. Frame Scrubbing: Happens over the first 50% of scroll (was 75%)
    const frameIndex = useTransform(scrollYProgress, [0, 0.5], [0, FRAMES.length - 1]);

    // 2. Zoom Effect (Curtain): Scales up massively to "pass through"
    // Finishes early (0.55) so there is a massive "Moment of Silence" for the TV
    const curtainScale = useTransform(scrollYProgress, [0.45, 0.55], [1, 4]);
    const curtainOpacity = useTransform(scrollYProgress, [0.5, 0.6], [1, 0]);
    const curtainBlur = useTransform(scrollYProgress, [0.45, 0.55], ["0px", "12px"]);

    // 3. Child Reveal (TV): Scales in and finishes early
    // "Time to Shine": Fully visible from 0.55 to 1.0 (The Plateau)
    const childScale = useTransform(scrollYProgress, [0, 0.55], [0.8, 1]);
    const childOpacity = useTransform(scrollYProgress, [0.4, 0.55], [0, 1]);
    const childY = useTransform(scrollYProgress, [0, 0.55], ["10%", "0%"]);

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

    // Render Loop
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !isLoaded) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Use high-quality image smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";

        const render = () => {
            // 1. Get raw float index (e.g. 4.65)
            const rawIndex = frameIndex.get();

            // 2. Determine blending
            const idx = Math.floor(rawIndex); // 4
            const nextIdx = Math.min(idx + 1, FRAMES.length - 1); // 5
            const progress = rawIndex - idx; // 0.65 (Opacity of next frame)

            // 3. Get images
            const img1 = images[idx];
            const img2 = images[nextIdx];

            if (!img1) return;

            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            // 4. Calculate Cover Logic (Assume both images same aspect mostly)
            const scale = Math.max(canvas.width / img1.width, canvas.height / img1.height);
            const x = (canvas.width / 2) - (img1.width / 2) * scale;
            const y = (canvas.height / 2) - (img1.height / 2) * scale;
            const w = img1.width * scale;
            const h = img1.height * scale;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // 5. Draw Frame 1 (100% opacity base)
            ctx.globalAlpha = 1;
            ctx.drawImage(img1, x, y, w, h);

            // 6. Draw Frame 2 (Blended on top)
            if (img2 && idx !== nextIdx) {
                ctx.globalAlpha = progress;
                ctx.drawImage(img2, x, y, w, h);
            }
        };

        const unsubscribe = frameIndex.on("change", render);
        render();
        window.addEventListener("resize", render);

        return () => {
            unsubscribe();
            window.removeEventListener("resize", render);
        };
    }, [isLoaded, images, frameIndex]);

    return (
        <div
            ref={containerRef}
            className={cn("relative h-[500vh] bg-black will-change-transform", className)}
            role="img"
            aria-label="Cinematic opening curtain revealing the sensAI portfolio"
        >
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

                {/* Layer 1: The Content (TV) - Behind the curtain */}
                <motion.div
                    style={{ scale: childScale, opacity: childOpacity, y: childY }}
                    className="absolute inset-0 z-0 flex items-center justify-center"
                >
                    {children}
                </motion.div>

                {/* Layer 2: The Curtain (Canvas) - Scale/Fade wrapper */}
                <motion.div
                    style={{
                        scale: curtainScale,
                        opacity: curtainOpacity,
                        filter: curtainBlur // Applying the dynamic blur
                    }}
                    className="absolute inset-0 z-10 origin-center pointer-events-none"
                >
                    <canvas
                        ref={canvasRef}
                        className="w-full h-full object-cover"
                    />
                </motion.div>

                {/* Layer 2.5: High-Res Static Hero Overlay (Fixes initial blur) */}
                {/* Visual Trick: Shows the sharp 4K image at start, fades to movie sequence on scroll */}
                <motion.div
                    className="absolute inset-0 z-20 pointer-events-none"
                    style={{ opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0]) }}
                >
                    <NextImage
                        src="/images/Hero%20Background.webp"
                        alt="Hero Background"
                        fill
                        priority
                        quality={75}
                        sizes="100vw"
                        className="object-cover"
                    />
                </motion.div>

                {/* Layer 3: Text Sequence & Interface */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-30 pb-0">

                    {/* HICK'S LAW HERO UI: Glassmorphic Card (Central Focus) */}
                    {/* Physically separates UI from background wood texture */}
                    <motion.div
                        className="relative p-12 md:p-16 flex flex-col items-center justify-center text-center bg-black/20 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl pointer-events-auto"
                        style={{
                            opacity: useTransform(scrollYProgress, [0, 0.08], [1, 0]),
                            y: useTransform(scrollYProgress, [0.08, 0.1], ["0%", "-200%"]) // Move it way up so it doesn't block clicks
                        }}
                    >
                        {/* Gooey Lava Lamp Effect (Unpredictable Green) */}
                        <div className="absolute inset-0 z-0 pointer-events-none mix-blend-color-dodge overflow-hidden rounded-3xl">
                            {/* Blob 1: Large slow mover */}
                            <motion.div
                                className="absolute w-[150%] h-[150%] -top-[25%] -left-[25%]"
                                style={{
                                    background: "radial-gradient(circle at center, rgba(34, 197, 94, 0.15) 0%, transparent 60%)",
                                }}
                                animate={{
                                    x: ["-10%", "10%", "-5%", "-10%"],
                                    y: ["-10%", "5%", "10%", "-10%"],
                                    scale: [1, 1.1, 0.9, 1]
                                }}
                                transition={{
                                    duration: 25,
                                    ease: "easeInOut",
                                    repeat: Infinity,
                                    times: [0, 0.3, 0.6, 1]
                                }}
                            />
                            {/* Blob 2: The vertical flow */}
                            <motion.div
                                className="absolute w-[100%] h-[100%] top-0 left-0"
                                style={{
                                    background: "radial-gradient(circle at center, rgba(20, 83, 45, 0.2) 0%, transparent 50%)",
                                }}
                                animate={{
                                    y: ["100%", "-100%"],
                                    x: ["0%", "20%", "-20%", "0%"],
                                    scale: [0.8, 1.2, 0.8]
                                }}
                                transition={{
                                    duration: 18,
                                    ease: "linear",
                                    repeat: Infinity
                                }}
                            />
                            {/* Blob 3: The wandering interference */}
                            <motion.div
                                className="absolute w-[80%] h-[80%]"
                                style={{
                                    background: "radial-gradient(ellipse at center, rgba(22, 163, 74, 0.1) 0%, transparent 70%)",
                                }}
                                animate={{
                                    x: ["0%", "100%", "50%", "0%"],
                                    y: ["0%", "50%", "100%", "0%"],
                                }}
                                transition={{
                                    duration: 30,
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
                        <p className="text-sm md:text-lg text-zinc-400 font-light tracking-[0.4em] uppercase mb-10 drop-shadow-lg">
                            Kino im Kopf. KI im Workflow.
                        </p>

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
                    <div className="absolute w-full text-center flex justify-center gap-[0.2em]">
                        {["C", "R", "A", "F", "T", "I", "N", "G"].map((char, i) => {
                            // Stagger logic: 8 letters, start earlier to clear screen faster
                            const start = 0.08 + (i * 0.01);
                            const end = start + 0.02;
                            return (
                                <motion.span
                                    key={i}
                                    className="text-6xl md:text-9xl font-thin text-amber-50/90 font-sans drop-shadow-[0_0_30px_rgba(251,191,36,0.2)] mix-blend-overlay"
                                    style={{
                                        // Fade out just as MOTION (starts 0.3) begins to appear - seamless handoff
                                        opacity: useTransform(scrollYProgress, [start, end, 0.28, 0.32], [0, 1, 1, 0]),
                                        y: useTransform(scrollYProgress, [start, end], [20, 0]), // Slight subtle rise
                                        scale: scaleText
                                    }}
                                >
                                    {char}
                                </motion.span>
                            );
                        })}
                    </div>

                    {/* MOTION: Kinetic Blur & Velocity */}
                    {/* Slides in with speed (blur) and slides out */}
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

                {/* Loading */}
                {!isLoaded && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black text-white/20 font-mono text-xs">
                        [ LOADING_SEQUENCE ]
                    </div>
                )}
            </div>
        </div>
    );
}
