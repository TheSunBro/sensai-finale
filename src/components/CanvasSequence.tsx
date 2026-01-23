"use client";

import { useRef, useEffect, useCallback } from 'react';
import { useScroll, useTransform, useMotionValueEvent, motion } from 'framer-motion';
import { useCanvasImages } from '@/lib/hooks/useCanvasImages';

const FRAME_COUNT = 214; // Total frames based on your file list

interface CanvasSequenceProps {
    scrollYProgress?: any; // MotionValue<number>
}

export default function CanvasSequence({ scrollYProgress: externalScrollYProgress }: CanvasSequenceProps = {}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { scrollYProgress: defaultScrollYProgress } = useScroll();
    const scrollYProgress = externalScrollYProgress || defaultScrollYProgress;

    // Transform scroll (0-1) to frame index (0-191)
    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

    // Core shrinking logic for CTA section
    const canvasScale = useTransform(scrollYProgress, [0.85, 0.95], [1, 0.15]);
    const canvasOpacity = useTransform(scrollYProgress, [0.95, 1], [1, 0]);
    const canvasFilter = useTransform(scrollYProgress, [0.85, 1], ['blur(0px)', 'blur(10px)']);

    const { images, loaded } = useCanvasImages(FRAME_COUNT);

    const renderFrame = useCallback((index: number) => {
        const canvas = canvasRef.current;
        if (!canvas || !loaded || images.length === 0) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const img = images[Math.min(Math.round(index), images.length - 1)];
        if (!img || !img.complete || img.naturalHeight === 0) return;

        // DPR logic: Canvas width/height are already scaled by DPR in handleResize
        // But drawing coords need logical pixels if we used ctx.scale(dpr, dpr)
        const dpr = window.devicePixelRatio || 1;
        const width = canvas.width / dpr;
        const height = canvas.height / dpr;

        // Maintain aspect ratio cover
        const scale = Math.max(width / img.width, height / img.height);
        const x = (width / 2) - (img.width / 2) * scale;
        const y = (height / 2) - (img.height / 2) * scale;

        // Clear using logical dimensions (since we scaled the context)
        ctx.clearRect(0, 0, width, height);

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    }, [canvasRef, loaded, images]);

    useMotionValueEvent(frameIndex, 'change', (latest) => {
        requestAnimationFrame(() => renderFrame(latest));
    });

    // Handle Resize with DPR
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                const dpr = window.devicePixelRatio || 1;
                canvasRef.current.width = window.innerWidth * dpr;
                canvasRef.current.height = window.innerHeight * dpr;
                // Scale context to match
                const ctx = canvasRef.current.getContext('2d');
                if (ctx) ctx.scale(dpr, dpr);

                renderFrame(frameIndex.get());
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial size

        return () => window.removeEventListener('resize', handleResize);
    }, [loaded, frameIndex, renderFrame]);

    // Initial render when loaded
    useEffect(() => {
        if (loaded) {
            renderFrame(0);
        }
    }, [loaded, renderFrame]);

    return (
        <div className="fixed inset-0 z-0 bg-[#0a0a0a] pointer-events-none">
            <motion.canvas
                ref={canvasRef}
                style={{ scale: canvasScale, opacity: canvasOpacity, filter: canvasFilter }}
                className="block w-full h-full object-cover origin-center will-change-transform"
            />
            {/* Walnut Slats with Side Mask */}
            <div
                className="absolute inset-0 bg-slats opacity-30 mix-blend-overlay"
                style={{
                    maskImage: 'linear-gradient(to right, black 0%, transparent 25%, transparent 75%, black 100%)',
                    WebkitMaskImage: 'linear-gradient(to right, black 0%, transparent 25%, transparent 75%, black 100%)'
                }}
            />
            {/* Vignette for extra depth */}
            <div className="absolute inset-0 bg-radial-gradient(circle, transparent 60%, black 100%) opacity-60" />
        </div>
    );
}
