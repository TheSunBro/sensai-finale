"use client";

import { useEffect, useState } from "react";

interface MatrixTextProps {
    text: string;
    speed?: number; // ms per char change
    scrambleDuration?: number; // total time to scramble
    className?: string;
}

export default function MatrixText({ text, speed = 50, scrambleDuration = 1000, className }: MatrixTextProps) {
    const [display, setDisplay] = useState(text);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&*";

    useEffect(() => {
        const steps = Math.floor(scrambleDuration / speed);
        let step = 0;

        // Start with a scrambled state or just start scrambling
        // For this specific effect, we usually want to scramble *to* the text.

        const interval = setInterval(() => {
            if (step >= steps) {
                setDisplay(text);
                clearInterval(interval);
                return;
            }

            setDisplay(
                text.split('').map((char, i) => {
                    if (char === ' ') return ' ';
                    // As we progress, reveal more characters from the start
                    if (step > (steps * (i / text.length))) return char;
                    return chars[Math.floor(Math.random() * chars.length)];
                }).join('')
            );

            step++;
        }, speed);

        return () => clearInterval(interval);
    }, [text, speed, scrambleDuration]);

    return <span className={className}>{display}</span>;
}
