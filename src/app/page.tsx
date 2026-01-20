"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import CinematicHero from "@/components/CinematicHero";
import Showcase3D from "@/components/Showcase3D";

export default function Home() {

    useEffect(() => {
        // Initialize Lenis for "Weighted" scroll feel
        const lenis = new Lenis({
            lerp: 0.05,
            wheelMultiplier: 0.7,
            smoothWheel: true,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return (
        <main className="min-h-screen bg-[#eaeaea] dark:bg-[#121212] text-foreground transition-colors duration-500">
            {/* 3D Showcase nested inside the Cinematic Hero transition */}
            <CinematicHero>
                <div className="w-full h-full flex items-center justify-center">
                    <Showcase3D />
                </div>
            </CinematicHero>

            {/* Placeholder for future content */}
            <section className="min-h-screen flex items-center justify-center">
                <p className="font-mono text-sm opacity-50">[ CONTENT FLOW ]</p>
            </section>
        </main>
    );
}
