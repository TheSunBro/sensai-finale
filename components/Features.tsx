'use client';

import { motion } from 'framer-motion';

const features = [
    {
        title: "Semantic Indexing",
        description: "Your content, structured for machine understanding.",
        align: "start"
    },
    {
        title: "Kinetic Metadata",
        description: "Dynamic tags that evolve with user intent.",
        align: "end"
    },
    {
        title: "Rank Mastery",
        description: "Dominance in the visual search results.",
        align: "center"
    }
];

export default function Features() {
    return (
        <div className="relative z-10">
            {features.map((feature, i) => (
                <section key={i} className="h-screen flex flex-coljustify-center px-12 md:px-24 pointer-events-none">
                    {/* Added flex-col and justify-center to actually center the content vertically */}
                    <div className={`flex flex-col h-full justify-center ${feature.align === 'end' ? 'items-end text-right' : feature.align === 'center' ? 'items-center text-center' : 'items-start text-left'}`}>
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            viewport={{ once: false, margin: "-20%" }}
                            className="max-w-2xl relative"
                        >
                            {/* Feature Backlight */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#FFD27D] opacity-10 blur-[100px] rounded-full pointer-events-none -z-10" />

                            <h2 className="text-4xl md:text-7xl font-light text-white mb-6 tracking-tight">
                                <span className="block text-sm font-mono tracking-widest text-warm-glow mb-4 uppercase opacity-80">
                                    0{i + 1} / Feature
                                </span>
                                {feature.title}
                            </h2>
                            <p className="text-lg md:text-2xl text-white/60 font-light leading-relaxed max-w-xl">
                                {feature.description}
                            </p>
                        </motion.div>
                    </div>
                </section>
            ))}
        </div>
    );
}
