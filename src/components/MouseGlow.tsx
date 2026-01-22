"use client";

import { useEffect } from 'react';
import { motion, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';

export default function MouseGlow() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Heavier, smoother physics for a "premium" feel (less jittery)
    const springConfig = { damping: 40, stiffness: 200, mass: 0.8 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    // Subtle 3000K Warm Glow (Champagne/Pale Gold) with reduced spread and opacity
    // rgba(235, 220, 190, 0.08) -> Sophisticated warm white
    const background = useMotionTemplate`radial-gradient(400px circle at ${springX}px ${springY}px, rgba(235, 220, 190, 0.08), transparent 80%)`;

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <motion.div
            className="pointer-events-none fixed inset-0 z-[100] mix-blend-screen"
            style={{ background }}
        />
    );
}
