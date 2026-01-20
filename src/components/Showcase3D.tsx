"use client";

import { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import MatrixText from "@/components/ui/MatrixText";

const CHANNELS = {
    LOGO: {
        id: 'LOGO',
        sub: 'CHANNEL 3',
        title: 'sensAI',
        desc: 'DIGITAL REALITY ARCHITECT'
    },
    CODE: {
        id: 'CODE',
        sub: 'SYSTEM.ROOT',
        title: 'DEV.OPS',
        desc: 'FULL STACK ARCHITECTURE'
    },
    MEDIA: {
        id: 'MEDIA',
        sub: 'VISUAL.CORE',
        title: 'RENDER',
        desc: 'HIGH-FIDELITY MOTION'
    },
    CONSULTING: {
        id: 'CONSULTING',
        sub: 'NEURAL.NET',
        title: 'STRATEGY',
        desc: 'DATA-DRIVEN INSIGHTS'
    }
};

export default function Showcase3D() {
    const [activeChannel, setActiveChannel] = useState<keyof typeof CHANNELS>('LOGO');
    const [isStatic, setIsStatic] = useState(false);

    const handleChannelSwitch = (channel: keyof typeof CHANNELS) => {
        if (channel === activeChannel && channel !== 'LOGO') {
            // Toggle off if clicking active channel, unless it's LOGO
            setActiveChannel('LOGO');
        } else {
            setActiveChannel(channel);
        }

        // Trigger static effect
        setIsStatic(true);
        setTimeout(() => setIsStatic(false), 300);
    };

    // Motion values for mouse position
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Spring physics for smooth tilt
    // "Balanced Hypnotic": The Goldilocks zone. 
    // Responsive but with a smooth, premium weight.
    const mouseX = useSpring(x, { stiffness: 50, damping: 30 });
    const mouseY = useSpring(y, { stiffness: 50, damping: 30 });

    // Map mouse position to tilt angles
    // Moderate range (±7deg) allows depth without disorientation.
    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);

    // Parallax transforms for floating elements
    // Moderate separation for clear layering
    const floatX = useTransform(mouseX, [-0.5, 0.5], ["-15px", "15px"]);
    const floatY = useTransform(mouseY, [-0.5, 0.5], ["-15px", "15px"]);

    const bgX = useTransform(mouseX, [-0.5, 0.5], ["25px", "-25px"]);
    const bgY = useTransform(mouseY, [-0.5, 0.5], ["25px", "-25px"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseXVal = e.clientX - rect.left - width / 2;
        const mouseYVal = e.clientY - rect.top - height / 2;

        const xPct = mouseXVal / width;
        const yPct = mouseYVal / height;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <section
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-full h-full flex items-center justify-center relative perspective-1000 overflow-hidden"
            style={{ perspective: 1000 }}
        >
            {/* Background Image (Mid-Section) - "Hick's Law" Polish */}
            {/* abstracting the background to reduce cognitive load and hide pixelation */}
            <div className="absolute inset-0 z-0 overflow-hidden bg-[#111]">
                <img
                    src="/images/image%20mid1.webp"
                    alt=""
                    className="w-full h-full object-cover opacity-50 scale-110 filter blur-sm contrast-125 saturate-50 transition-all duration-1000"
                />
                {/* Cinematic Vignette: Focuses eye on the center (The TV) */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_90%)]" />
                <div className="absolute inset-0 bg-black/20" />
            </div>

            <motion.div
                className="relative w-[300px] md:w-[400px] aspect-square will-change-transform"
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
            >
                {/* 1. Floating Elements (Parallaxed) */}
                {/* 
                    Triangle Layout:
                    Top Center: CONSULTING
                    Bottom Left: CODE
                    Bottom Right: MEDIA
                */}

                {/* CONSULTING - Top Center */}
                <motion.div
                    style={{ x: bgX, y: bgY, z: 50 }}
                    // Added holographic data style: font-mono, dim, glowing
                    className="absolute -top-12 left-1/2 -translate-x-1/2 text-white/50 text-xs tracking-[0.3em] font-mono whitespace-nowrap drop-shadow-[0_0_5px_rgba(255,255,255,0.2)] pointer-events-none"
                >
                    {"[ CONSULTING_INIT ]".split("").map((char, i) => (
                        <span key={i} className="type-key">{char}</span>
                    ))}
                </motion.div>

                {/* CODE - Bottom Left */}
                <motion.div
                    style={{ x: floatX, y: floatY, z: 60 }}
                    className="absolute -bottom-8 -left-8 text-white/50 text-xs tracking-[0.3em] font-mono whitespace-nowrap drop-shadow-[0_0_5px_rgba(255,255,255,0.2)] pointer-events-none"
                >
                    {"[ CODE_SYS ]".split("").map((char, i) => (
                        <span key={i} className="type-key">{char}</span>
                    ))}
                </motion.div>

                {/* MEDIA - Bottom Right */}
                <motion.div
                    style={{ x: floatX, y: floatY, z: 60 }}
                    className="absolute -bottom-8 -right-8 text-white/50 text-xs tracking-[0.3em] font-mono whitespace-nowrap drop-shadow-[0_0_5px_rgba(255,255,255,0.2)] pointer-events-none"
                >
                    {"[ MEDIA_CORE ]".split("").map((char, i) => (
                        <span key={i} className="type-key">{char}</span>
                    ))}
                </motion.div>


                {/* 2. Main Card Body (Retro TV Chassis - Unibody) */}
                <div
                    className="absolute inset-0 bg-[#E3E1C9] rounded-[40px] shadow-2xl overflow-hidden flex flex-col pt-5 px-5 pb-6"
                    style={{
                        transform: "translateZ(0)",
                        // Deep matte plastic finish with noise
                        background: "linear-gradient(145deg, #E3E1C9 0%, #D1CFB8 100%)",
                        boxShadow: "0 30px 60px rgba(0,0,0,0.5), inset 0 2px 0 rgba(255,255,255,0.4), inset 0 0 0 2px rgba(0,0,0,0.1)"
                    }}
                >
                    {/* Screen Container - Clean OLED/Glass look */}
                    <div className="relative flex-1 bg-black rounded-[20px] overflow-hidden border-[6px] border-[#181818] shadow-[0_0_0_2px_#111,0_4px_10px_rgba(0,0,0,0.5)] z-10">

                        {/* 1. Deep Space Background (No Noise) */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1a2e29_0%,#000000_100%)] opacity-50" />

                        {/* 2. Glass Reflection (Static, Premium) */}
                        <div className="absolute inset-0 z-20 rounded-[14px] shadow-[inset_0_0_60px_rgba(255,255,255,0.05)] pointer-events-none" />

                        {/* 3. Hypnotic Glow Text Container */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <motion.div
                                style={{ z: 80 }}
                                animate={{
                                    opacity: [0.8, 1, 0.8],
                                    scale: [0.98, 1, 0.98]
                                }}
                                transition={{
                                    duration: 4,
                                    ease: "easeInOut",
                                    repeat: Infinity
                                }}
                                className="flex flex-col items-center"
                            >
                                {/* Digital Subtitle */}
                                <div className="text-cyan-200/50 text-lg font-mono tracking-[0.3em] mb-3 text-center font-light drop-shadow-[0_0_5px_rgba(165,243,252,0.3)]">
                                    <MatrixText
                                        text={CHANNELS[activeChannel].sub}
                                        speed={30}
                                        scrambleDuration={800}
                                    />
                                </div>

                                {/* Main Title - Ethereal Glow */}
                                <h2 className="text-7xl font-heading font-medium tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-cyan-200 drop-shadow-[0_0_25px_rgba(34,211,238,0.4)]">
                                    <MatrixText
                                        text={CHANNELS[activeChannel].title}
                                        speed={40}
                                        scrambleDuration={1200}
                                        className="inline-block"
                                    />
                                </h2>

                                {/* Description */}
                                {activeChannel !== 'LOGO' && (
                                    <motion.p
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5, duration: 1 }}
                                        className="text-xs font-mono text-cyan-100/40 mt-6 tracking-widest uppercase"
                                    >
                                        [{CHANNELS[activeChannel].desc}]
                                    </motion.p>
                                )}
                            </motion.div>
                        </div>
                    </div>

                    {/* Controls Area - Directly on the chassis face, no separate panel */}
                    <div className="h-20 relative flex items-center justify-between mt-4 px-1 z-50">

                        {/* Channel Buttons (Left) */}
                        <div className="flex gap-4 relative z-50" role="group" aria-label="TV Channel Selection">
                            {['CODE', 'MEDIA', 'CONSULTING'].map((label, i) => {
                                const isActive = activeChannel === label;
                                return (
                                    <button
                                        key={label}
                                        type="button"
                                        onClick={() => handleChannelSwitch(label as keyof typeof CHANNELS)}
                                        aria-label={`Select ${label} Channel`}
                                        aria-pressed={isActive}
                                        className="flex flex-col items-center gap-2 group cursor-pointer focus:outline-none pointer-events-auto"
                                    >
                                        {/* Physical Button - Matte Stealth Finish */}
                                        <div className={`w-14 h-10 relative bg-[#1a1a1a] rounded-sm 
                                                    border-t border-l border-[#333] border-b-4 border-r-2 border-[#111] 
                                                    shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_4px_8px_rgba(0,0,0,0.6)] 
                                                    ${isActive ? 'border-b-0 translate-y-1 shadow-none bg-[#111]' : 'group-active:border-b-0 group-active:translate-y-1 group-active:shadow-none'}
                                                    transition-all duration-200 flex items-center justify-center overflow-hidden`}>

                                            {/* LED Indicator - Bio-Digital */}
                                            <div className="relative w-8 h-1 rounded-full bg-[#0a0a0a] shadow-[inset_0_1px_2px_rgba(0,0,0,1)] overflow-hidden">
                                                {/* Inactive State (Dim Pulse) */}
                                                <div className={`absolute inset-0 bg-cyan-900/30 transition-opacity duration-500
                                                    ${isActive ? 'opacity-0' : 'opacity-100'}`} />

                                                {/* Active State (Cyan Energy) */}
                                                <div className={`absolute inset-0 bg-cyan-400 transition-all duration-500 shadow-[0_0_10px_rgba(34,211,238,0.8)]
                                                    ${isActive ? 'opacity-100' : 'opacity-0'}`} />
                                            </div>
                                        </div>

                                        {/* Etched Label - Clean Typography - Static Color */}
                                        <span className="text-[0.7rem] font-mono tracking-[0.2em] uppercase text-zinc-500 font-semibold hover:text-zinc-400 transition-colors">
                                            {label}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Knobs & Speaker (Right) */}
                        <div className="flex items-center gap-6">
                            {/* Speaker Grille - Engraved into chassis */}
                            <div className="flex gap-1.5 h-6">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="w-1 h-full bg-[#111] rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]" />
                                ))}
                            </div>

                            {/* Main Power Knob */}
                            <button
                                type="button"
                                onClick={() => handleChannelSwitch('LOGO')}
                                aria-label="Reset to Main Channel"
                                className="w-12 h-12 rounded-full bg-[#151515] border-2 border-[#333] shadow-[0_4px_10px_rgba(0,0,0,0.5),inset_0_2px_5px_rgba(255,255,255,0.05)] relative flex items-center justify-center cursor-pointer active:scale-95 transition-transform"
                            >
                                <div className="w-1 h-4 bg-[#666] rounded-full absolute -top-1" />
                                <div className={`w-full h-full rounded-full border border-dashed border-[#333] opacity-50 p-1 transition-transform duration-500 ${activeChannel === 'LOGO' ? 'rotate-0' : 'rotate-90'}`} />
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section >
    );
}
