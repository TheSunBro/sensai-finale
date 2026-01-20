"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const MENU_ITEMS = [
    { label: "Anthology", href: "#" },
    { label: "Manifesto", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Systems", href: "#" },
];

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const hoverTimer = useRef<NodeJS.Timeout | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseEnter = () => {
        // "Deliberate, slowed-down gesture"
        // We require the user to hold the hover for 800ms before revealing.
        hoverTimer.current = setTimeout(() => {
            setIsOpen(true);
        }, 800);
    };

    const handleMouseLeave = () => {
        if (hoverTimer.current) {
            clearTimeout(hoverTimer.current);
        }
        // Add a slight delay before closing to be forgiving
        setTimeout(() => setIsOpen(false), 300);
    };

    return (
        <div
            className="fixed top-0 right-0 p-8 z-50 mix-blend-difference text-[#eaeaea]"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            ref={containerRef}
        >
            <div className="flex flex-col items-end cursor-pointer">
                <motion.div
                    animate={{ opacity: isOpen ? 0.5 : 1 }}
                    className="text-sm font-mono tracking-[0.2em] font-bold uppercase transition-colors hover:text-white"
                >
                    Menu
                </motion.div>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10, filter: "blur(10px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, y: -10, filter: "blur(10px)" }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className="mt-6 flex flex-col items-end gap-3"
                        >
                            {MENU_ITEMS.map((item, i) => (
                                <motion.a
                                    key={item.label}
                                    href={item.href}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1, duration: 0.5 }}
                                    className="text-2xl font-light tracking-tight hover:italic transition-all duration-300 hover:text-[#FFD27D]"
                                >
                                    {item.label}
                                </motion.a>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
