"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import CinematicHero from "@/components/CinematicHero";
import CinematicOutro from "@/components/CinematicOutro";
import Showcase3D from "@/components/Showcase3D";
import Footer from "@/components/Footer";

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

            {/* Cinematic Outro: The Reverse Tunnel Sequence */}
            <CinematicOutro>
                <Footer />
            </CinematicOutro>
        </main>
    );
}
