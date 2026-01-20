"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import NextImage from "next/image";
import { cn } from "../lib/utils";

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

interface CinematicOutroProps {
    children?: ReactNode;
    className?: string;
}

export default function CinematicOutro({ children, className }: CinematicOutroProps) {
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
        offset: ["start end", "end end"], // Standard start logic
    });

    // 1. Frame Scrubbing: Reverse (End -> Start)
    const frameIndex = useTransform(scrollYProgress, [0, 0.8], [FRAMES.length - 1, 0]);

    // 2. Zoom Effect (Curtain Closing): Scales DOWN to "wall"
    // Starts "Inside" (Scale 3) -> Ends "Outside" (Scale 1)
    const curtainScale = useTransform(scrollYProgress, [0, 0.8], [3, 1]);

    // 3. Opacity: Fades IN to cover the previous section
    const curtainOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

    // 4. Blur: Starts clear (inside), gets blurry (transition), then sharp (wall)
    const curtainBlur = useTransform(scrollYProgress, [0, 0.4, 0.8], ["0px", "8px", "0px"]);

    // Render Loop
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !isLoaded) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";

        const render = () => {
            const rawIndex = frameIndex.get();
            const idx = Math.floor(rawIndex);
            const nextIdx = Math.min(idx + 1, FRAMES.length - 1);
            const progress = rawIndex - idx;

            const img1 = images[idx];
            const img2 = images[nextIdx];

            if (!img1) return;

            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            const scale = Math.max(canvas.width / img1.width, canvas.height / img1.height);
            const x = (canvas.width / 2) - (img1.width / 2) * scale;
            const y = (canvas.height / 2) - (img1.height / 2) * scale;
            const w = img1.width * scale;
            const h = img1.height * scale;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.globalAlpha = 1;
            ctx.drawImage(img1, x, y, w, h);

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
            className={cn("relative h-[300vh] -mt-[100vh] bg-transparent will-change-transform z-40 pointer-events-none", className)}
            role="img"
            aria-label="Cinematic closing curtain"
            style={{
                // Soft gradient mask to prevent "hard edge" when it slides in
                maskImage: "linear-gradient(to bottom, transparent, black 20%)",
                WebkitMaskImage: "linear-gradient(to bottom, transparent, black 20%)"
            }}
        >
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center pointer-events-auto">

                {/* Layer 1: The Canvas (Curtain) */}
                <motion.div
                    style={{
                        scale: curtainScale,
                        opacity: curtainOpacity,
                        filter: curtainBlur
                    }}
                    className="absolute inset-0 z-10 origin-center pointer-events-none"
                >
                    <canvas
                        ref={canvasRef}
                        className="w-full h-full object-cover"
                    />
                </motion.div>

                {/* Layer 1.5: High-Res Static Overlay (The "Wall" - Landing) */}
                {/* Visual Consistency: Fades in at the end to match Hero quality */}
                <motion.div
                    className="absolute inset-0 z-15 pointer-events-none"
                    style={{ opacity: useTransform(scrollYProgress, [0.8, 1.0], [0, 1]) }}
                >
                    <NextImage
                        src="/images/Hero%20Background.webp"
                        alt="Background Wall"
                        fill
                        priority
                        quality={90}
                        sizes="100vw"
                        className="object-cover"
                    />
                </motion.div>

                {/* Layer 2: Content Overlay (Footer/End Message) */}
                <motion.div
                    className="relative z-20 w-full h-full flex flex-col items-center justify-center"
                    style={{ opacity: useTransform(scrollYProgress, [0.85, 1.0], [0, 1]) }}
                >
                    {children}
                </motion.div>

                {/* Loading State */}
                {!isLoaded && (
                    <div className="absolute inset-0 z-0 flex items-center justify-center bg-transparent">
                        {/* Silent Load */}
                    </div>
                )}
            </div>
        </div>
    );
}
