'use client';

import { useRef, useEffect, useCallback } from 'react';
import { useScroll, useTransform, useMotionValueEvent, motion } from 'framer-motion';
import { useCanvasImages } from '@/lib/hooks/useCanvasImages';

const FRAME_COUNT = 214; // Updated for sequence-v2

export default function CanvasSequence() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { scrollYProgress } = useScroll();

    // Transform scroll (0-1) to frame index
    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

    // Core shrinking logic for CTA section
    const canvasScale = useTransform(scrollYProgress, [0.85, 0.95], [1, 0.15]);
    const canvasOpacity = useTransform(scrollYProgress, [0.95, 1], [1, 0]);
    const canvasFilter = useTransform(scrollYProgress, [0.85, 1], ['blur(0px)', 'blur(10px)']);

    const { getFrame } = useCanvasImages({
        frameCount: FRAME_COUNT,
        basePath: '/sequence-v2'
    });

    const renderFrame = useCallback((index: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Use getFrame to find the best available image
        const img = getFrame(index);

        // If NO images are loaded yet, we can't draw anything (or could draw a placeholder)
        if (!img) return;

        // Handle High DPI
        const dpr = window.devicePixelRatio || 1;

        // Ensure canvas dimensions match logical size * DPR
        // We check if we need to resize to avoid clearing every frame if not needed,
        // but for a full-screen resizable canvas, explicit checks are good.
        // For simplicity and correctness on resize, we can just set it here or relying on the resize listener below.
        // Ideally, we only set width/height on resize event to avoid layout thrashing, 
        // but we need to ensure the context scale is correct.

        // Actually, the best pattern is to set the physical pixels in the resize handler,
        // and here we just draw.

        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        // Clear
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        // Calculate 'cover' fit
        // Note: img.width/height are natural dimensions.
        const outputWidth = canvasWidth;
        const outputHeight = canvasHeight;

        const imgRatio = img.width / img.height;
        const canvasRatio = outputWidth / outputHeight;

        let renderWidth, renderHeight;

        if (canvasRatio > imgRatio) {
            renderWidth = outputWidth;
            renderHeight = outputWidth / imgRatio;
        } else {
            renderHeight = outputHeight;
            renderWidth = outputHeight * imgRatio;
        }

        const renderX = (outputWidth - renderWidth) / 2;
        const renderY = (outputHeight - renderHeight) / 2;

        ctx.drawImage(img, renderX, renderY, renderWidth, renderHeight);

    }, [getFrame]);

    useMotionValueEvent(frameIndex, 'change', (latest) => {
        requestAnimationFrame(() => renderFrame(latest));
    });

    // Handle Resize & Initial Setup
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                const dpr = window.devicePixelRatio || 1;
                canvasRef.current.width = window.innerWidth * dpr;
                canvasRef.current.height = window.innerHeight * dpr;

                // Scale context to normalize coordinates if we were drawing shapes, but for drawImage 
                // we usually just want to map to the full pixel buffer so we don't necessarily need ctx.scale(dpr, dpr)
                // UNLESS we want to use logical coords for drawing. 
                // For an image cover, just using the full width/height in pixels (as done in renderFrame) is easier/sharper.

                // Force a re-render
                renderFrame(frameIndex.get());
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial size

        return () => window.removeEventListener('resize', handleResize);
    }, [renderFrame, frameIndex]);

    // Initial Render Loop (to ensure first frame appears once loaded)
    // We can just poll or rely on the hook triggering a re-render if we were returning state.
    // Since getFrame is a function reference, it might not trigger re-render when internals change unless we use the 'progress' or 'isLoading' state.
    // The previous hook returned 'loaded' simple boolean. 
    // The new hook returns 'isLoading' or 'progress'.
    // We should probably subscribe to image loading if we want the FIRST frame to appear automatically without scroll.

    // Let's cheat slightly: The hook triggers a re-render of this component when `loadedCount` updates because it updates local state.
    // So `getFrame` reference *might* change or we just rely on component re-render.
    // Actually, `getFrame` depends on `images` loading.
    // I should add an effect to render when the component re-renders (which happens as images load).

    // Actually, `useCanvasImages` updates state -> triggers re-render of `CanvasSequence`.
    // So we can just call renderFrame(frameIndex.get()) in a useEffect that runs on render.

    useEffect(() => {
        renderFrame(frameIndex.get());
    }, [renderFrame, frameIndex]); // simple enough, runs on every commit if renderFrame changes? 
    // Wait, renderFrame depends on [getFrame], getFrame depends on nothing (it's a closure over Ref usually?)
    // In my hook implementation: `getFrame` is a function created in the render body (recreated every render) or strict?
    // In `useCanvasImages` I did NOT wrap `getFrame` in useCallback. So it changes every render.
    // So `CanvasSequence` re-renders -> `getFrame` changes -> `renderFrame` changes -> this Effect runs -> draws.
    // Perfect.

    return (
        <div className="fixed inset-0 z-0 bg-charcoal pointer-events-none">
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
            <div className="absolute inset-0 bg-radial-vignette opacity-60" />
        </div>
    );
}
