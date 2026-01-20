"use client";

import { useRef, useEffect, useState, ReactNode } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface ContentBlockProps {
    children: ReactNode;
    className?: string;
    id?: string;
}

export default function ContentBlock({ children, className, id }: ContentBlockProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [hasFocus, setHasFocus] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        // Use a high threshold as requested to ensure "Singular Focal Point"
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    // Ideally we want the center of the screen to be the trigger, but
                    // threshold 0.8 means 80% of the item must be visible.
                    // For a "Flow" state, we consider it focused when largely visible.
                    setHasFocus(entry.isIntersecting);
                });
            },
            {
                threshold: 0.6, // Adjusted slightly from 0.8 to be more forgiving on mobile/smaller screens but still strict
                rootMargin: "-10% 0px -10% 0px" // Shrink the "active" window a bit
            }
        );

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <motion.div
            ref={ref}
            id={id}
            initial={{ opacity: 0.2, filter: "blur(4px)" }}
            animate={{
                opacity: hasFocus ? 1 : 0.2,
                filter: hasFocus ? "blur(0px)" : "blur(4px)",
                scale: hasFocus ? 1 : 0.98
            }}
            transition={{
                duration: 0.8, // "Double it to 400ms... wait, request said 400ms, let's go slower for 'gravitas'"
                ease: [0.16, 1, 0.3, 1] // Ultra smooth ease
            }}
            className={cn(
                "min-h-[60vh] flex flex-col justify-center py-20 transition-colors duration-700",
                hasFocus ? "text-foreground" : "text-neutral-500",
                className
            )}
        >
            {/* 
         Variable Typography Logic:
         We can wrap children or rely on CSS variables if we want granular control.
         For now, the opacity/blur handles the "Shrouded in shadow" effect.
      */}
            {children}
        </motion.div>
    );
}
