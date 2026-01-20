"use client";

import { useEffect, useState } from "react";
import Lenis from "lenis";
import CinematicHero from "@/components/CinematicHero";
import CinematicOutro from "@/components/CinematicOutro";
import Manifesto from "@/components/Manifesto";
import Showcase3D from "@/components/Showcase3D";

export default function Home() {
    const [lenisRef, setLenisRef] = useState<Lenis | null>(null);

    useEffect(() => {
        // Initialize Lenis for "Weighted" scroll feel
        const lenis = new Lenis({
            lerp: 0.05,
            wheelMultiplier: 0.7,
            smoothWheel: true,
        });

        setLenisRef(lenis);

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
            setLenisRef(null);
        };
    }, []);

    return (
        <main className="min-h-screen bg-[#eaeaea] dark:bg-[#121212] text-foreground transition-colors duration-500">
            {/* 3D Showcase nested inside the Cinematic Hero transition */}
            <CinematicHero lenis={lenisRef}>
                <div className="w-full h-full flex items-center justify-center">
                    <Showcase3D />
                </div>
            </CinematicHero>

            {/* Cinematic Outro: The Reverse Tunnel Sequence */}
            {/* Acts as a transition to the static content */}
            <CinematicOutro />

            {/* Breathing Room: Normal Scroll Content */}
            <Manifesto />
        </main>
    );
}
