'use client';

import { useScroll } from 'framer-motion';
import { useRef } from 'react';
import CanvasSequence from '@/components/CanvasSequence';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import CTA from '@/components/CTA';

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <main ref={containerRef} className="relative w-full">
      {/* Canvas Background */}
      <CanvasSequence />

      {/* Content Flow */}

      {/* Content Flow */}
      <div className="relative z-10">
        <Hero />
        <Features />
        <CTA />
      </div>

      {/* Extra spacer to ensure full scroll range if needed, 
            but Hero(1) + Features(3) + CTA(1) = 500vh should be enough.
        */}
    </main>
  );
}
