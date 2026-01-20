"use client";

import { motion } from "framer-motion";

export default function Footer() {
    return (
        <footer className="relative w-full bg-transparent text-white/20 font-mono text-[10px] py-6 overflow-hidden border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">

                {/* Copyright */}
                <p>
                    © {new Date().getFullYear()} sensAI. SYSTEM_ONLINE.
                </p>

                {/* Minimal Links */}
                <div className="flex gap-6">
                    {["PRIVACY", "TERMS", "LINKEDIN"].map((item) => (
                        <a key={item} href="#" className="hover:text-amber-500 transition-colors duration-300">
                            {item}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
}
