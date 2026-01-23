'use client';

import { motion } from 'framer-motion';

export default function CTA() {
    return (
        <section className="h-screen flex flex-col items-center justify-end pb-32 relative z-10 pointer-events-none">

            {/* Background Shift trigger could be handled here or globally, 
          but for visual simplicity we just use a dark gradient overlay at the bottom 
          or rely on the parent to change bg. 
          User asked: "Background shifts to a subtle Dark Grey Felt texture." 
      */}

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 z-0 bg-felt opacity-0"
            />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="pointer-events-auto relative z-10 text-center"
            >
                <button className="px-12 py-5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-full backdrop-blur-xl transition-all duration-500 transform hover:scale-105 group text-xl font-light tracking-widest uppercase">
                    <span className="group-hover:text-warm-glow transition-colors duration-300">Start Your Evolution</span>
                </button>
            </motion.div>
        </section>
    );
}
