"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { cn } from "@/lib/utils";

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
}

export default function CinematicHero({ children, className }: CinematicHeroProps) {
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

    // 1. Frame Scrubbing: Happens over the first 80% of scroll
    const frameIndex = useTransform(scrollYProgress, [0, 0.8], [0, FRAMES.length - 1]);

    // 2. Zoom Effect (Curtain): Scales up massively at the end to "pass through"
    // The "10x Dev" fix for pixelation: Blur it as you zoom.
    // This turns "low-res blocks" into "cinematic speed/depth blur".
    const curtainScale = useTransform(scrollYProgress, [0.75, 1], [1, 4]);
    const curtainOpacity = useTransform(scrollYProgress, [0.85, 1], [1, 0]);
    const curtainBlur = useTransform(scrollYProgress, [0.75, 1], ["0px", "12px"]);

    // 3. Child Reveal (TV): Scales in slightly and stays fully visible
    // We keep it visible but maybe dimmed or smaller initially?
    const childScale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
    const childOpacity = useTransform(scrollYProgress, [0.6, 1], [0, 1]);
    const childY = useTransform(scrollYProgress, [0, 1], ["10%", "0%"]);

    // 4. Text Sequence Logic
    // Ranges designed to not overlap "sensAI" (0-0.2) and finish before full reveal
    const opacityCrafting = useTransform(scrollYProgress, [0.15, 0.25, 0.35, 0.45], [0, 1, 1, 0]);
    const opacityMotion = useTransform(scrollYProgress, [0.4, 0.5, 0.6, 0.7], [0, 1, 1, 0]);
    const opacityFlow = useTransform(scrollYProgress, [0.65, 0.75, 0.85, 0.95], [0, 1, 1, 0]);

    // Subtle scaling for the text to make it feel alive
    const scaleText = useTransform(scrollYProgress, [0, 1], [0.9, 1.1]);

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
                <motion.img
                    src="/images/Hero%20Background.webp"
                    alt="Hero Background"
                    className="absolute inset-0 w-full h-full object-cover z-20 pointer-events-none"
                    style={{ opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0]) }}
                />

                {/* Layer 3: Text Sequence */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30 mix-blend-overlay">
                    {/* ANTHOLOGY (Title) */}
                    <motion.h1
                        className="absolute text-6xl md:text-9xl font-bold tracking-tighter text-white"
                        style={{ opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0]) }}
                    >
                        sensAI
                    </motion.h1>

                    {/* CRAFTING */}
                    <motion.h2
                        className="absolute text-5xl md:text-8xl font-light tracking-[0.2em] text-white font-mono"
                        style={{ opacity: opacityCrafting, scale: scaleText }}
                    >
                        CRAFTING
                    </motion.h2>

                    {/* MOTION */}
                    <motion.h2
                        className="absolute text-5xl md:text-8xl font-light tracking-[0.2em] text-white font-mono"
                        style={{ opacity: opacityMotion, scale: scaleText }}
                    >
                        MOTION
                    </motion.h2>

                    {/* FLOW */}
                    <motion.h2
                        className="absolute text-5xl md:text-8xl font-light tracking-[0.2em] text-white font-mono"
                        style={{ opacity: opacityFlow, scale: scaleText }}
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
