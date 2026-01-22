"use client";

import { motion } from "framer-motion";

export default function Contact() {
    return (
        <section
            id="contact"
            className="w-full min-h-screen max-w-4xl mx-auto px-6 flex flex-col items-center justify-center relative z-20"
            aria-label="Contact and Collaboration"
        >
            {/* Header */}
            <motion.header
                className="mb-12 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white drop-shadow-2xl mb-4">
                    Initiate Sequence
                </h2>
                <p className="text-white/60 max-w-xl mx-auto font-mono text-sm">
                    [ STATUS: READY_FOR_INPUT ]
                </p>
            </motion.header>

            {/* Glassmorphic Form Container */}
            <motion.div
                className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
            >
                <form className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Name Input */}
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-xs font-mono text-amber-500 uppercase tracking-widest pl-1">
                                Call Sign / Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Enter identity"
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all font-light"
                            />
                        </div>

                        {/* Email Input */}
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-xs font-mono text-amber-500 uppercase tracking-widest pl-1">
                                Frequency / Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="secure@channel.com"
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all font-light"
                            />
                        </div>
                    </div>

                    {/* Message Input */}
                    <div className="space-y-2">
                        <label htmlFor="message" className="text-xs font-mono text-amber-500 uppercase tracking-widest pl-1">
                            Mission Parameters
                        </label>
                        <textarea
                            id="message"
                            rows={4}
                            placeholder="Describe your objective..."
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all font-light resize-none"
                        />
                    </div>

                    {/* CTA Button */}
                    <div className="flex justify-center pt-4">
                        <motion.button
                            type="submit"
                            className="relative px-12 py-5 bg-gradient-to-r from-[#eacda3] to-[#d6ae7b] text-black text-xs font-semibold tracking-[0.3em] uppercase rounded-full cursor-pointer overflow-hidden group shadow-[0_0_15px_rgba(214,174,123,0.3)] hover:shadow-[0_0_30px_rgba(214,174,123,0.6)] transition-shadow duration-500"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <span className="relative z-10 transition-colors duration-300 drop-shadow-sm">Transmit Signal</span>

                            {/* Shine Effect */}
                            <div className="absolute inset-0 z-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out skew-x-12" />

                            {/* Inner Border/Glow */}
                            <div className="absolute inset-0 rounded-full border border-white/40 opacity-50 group-hover:opacity-100 transition-opacity" />
                        </motion.button>
                    </div>
                </form>
            </motion.div>
        </section>
    );
}
