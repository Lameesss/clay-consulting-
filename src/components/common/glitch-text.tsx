"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface GlitchTextProps {
    children: string;
    className?: string;
    delay?: number;
}

export const GlitchText: React.FC<GlitchTextProps> = ({
    children,
    className = "",
    delay = 0,
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, {
        once: false,
        amount: 0.3,
        margin: "0px 0px -100px 0px",
    });

    const chars = children.split("");

    return (
        <div ref={ref} className={`relative inline-block ${className}`}>
            <div className="relative flex">
                {chars.map((char, index) => (
                    <GlitchChar
                        key={index}
                        char={char}
                        index={index}
                        isInView={isInView}
                        delay={delay}
                    />
                ))}
            </div>
        </div>
    );
};

interface GlitchCharProps {
    char: string;
    index: number;
    isInView: boolean;
    delay: number;
}

const GlitchChar: React.FC<GlitchCharProps> = ({
    char,
    index,
    isInView,
    delay,
}) => {
    // Random offset for each character's glitch timing
    const randomDelay = Math.random() * 0.5;
    const glitchDelay = delay + 0.8 + randomDelay;

    return (
        <span className="relative inline-block">
            {/* Main character */}
            <motion.span
                className="relative z-10 inline-block"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{
                    duration: 0.6,
                    delay: delay + index * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                }}
            >
                {char === " " ? "\u00A0" : char}
            </motion.span>

            {/* Red glitch layer */}
            <motion.span
                className="absolute top-0 left-0 z-0 text-red-500 opacity-70 inline-block"
                aria-hidden="true"
                initial={{ opacity: 0, x: 0, y: 0 }}
                animate={
                    isInView
                        ? {
                            opacity: [0, 0.7, 0, 0.7, 0],
                            x: [-2, 2, -2, 2, 0],
                            y: [0, -1, 1, -1, 0],
                        }
                        : { opacity: 0, x: 0, y: 0 }
                }
                transition={{
                    duration: 0.4,
                    delay: glitchDelay,
                    times: [0, 0.25, 0.5, 0.75, 1],
                    repeat: Infinity,
                    repeatDelay: 3 + Math.random() * 2,
                }}
            >
                {char === " " ? "\u00A0" : char}
            </motion.span>

            {/* Blue glitch layer */}
            <motion.span
                className="absolute top-0 left-0 z-0 text-blue-500 opacity-70 inline-block"
                aria-hidden="true"
                initial={{ opacity: 0, x: 0, y: 0 }}
                animate={
                    isInView
                        ? {
                            opacity: [0, 0.7, 0, 0.7, 0],
                            x: [2, -2, 2, -2, 0],
                            y: [0, 1, -1, 1, 0],
                        }
                        : { opacity: 0, x: 0, y: 0 }
                }
                transition={{
                    duration: 0.4,
                    delay: glitchDelay + 0.05,
                    times: [0, 0.25, 0.5, 0.75, 1],
                    repeat: Infinity,
                    repeatDelay: 3 + Math.random() * 2,
                }}
            >
                {char === " " ? "\u00A0" : char}
            </motion.span>

            {/* Green glitch layer */}
            <motion.span
                className="absolute top-0 left-0 z-0 text-green-500 opacity-50 inline-block"
                aria-hidden="true"
                initial={{ opacity: 0, x: 0, y: 0 }}
                animate={
                    isInView
                        ? {
                            opacity: [0, 0.5, 0, 0.5, 0],
                            x: [0, -3, 3, -3, 0],
                            y: [1, -1, 0, 1, 0],
                        }
                        : { opacity: 0, x: 0, y: 0 }
                }
                transition={{
                    duration: 0.4,
                    delay: glitchDelay + 0.1,
                    times: [0, 0.25, 0.5, 0.75, 1],
                    repeat: Infinity,
                    repeatDelay: 3 + Math.random() * 2,
                }}
            >
                {char === " " ? "\u00A0" : char}
            </motion.span>
        </span>
    );
};
