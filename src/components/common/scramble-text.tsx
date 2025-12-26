"use client";
import React, { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";

interface ScrambleTextProps {
    children: string;
    className?: string;
    delay?: number;
}

export const ScrambleText: React.FC<ScrambleTextProps> = ({
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

    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
    const targetText = children;

    // Initialize with scrambled text
    const getScrambledText = () => {
        return targetText
            .split("")
            .map((char) => {
                if (char === " ") return " ";
                return characters[Math.floor(Math.random() * characters.length)];
            })
            .join("");
    };

    const [displayText, setDisplayText] = useState(getScrambledText());
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        if (!isInView) {
            setHasAnimated(false);
            setDisplayText(getScrambledText());
            return;
        }

        if (hasAnimated) return;

        let iteration = 0;
        let animationFrame: number;

        const animate = () => {
            setDisplayText(() =>
                targetText
                    .split("")
                    .map((char, index) => {
                        if (char === " ") return " ";

                        // Reveal character when iteration reaches its position
                        if (index < iteration) {
                            return targetText[index];
                        }

                        // Show random character
                        return characters[Math.floor(Math.random() * characters.length)];
                    })
                    .join("")
            );

            iteration += 1 / 2; // Slower iteration for better visibility

            if (iteration < targetText.length + 1) {
                animationFrame = requestAnimationFrame(animate);
            } else {
                setDisplayText(targetText);
                setHasAnimated(true);
            }
        };

        const timeout = setTimeout(() => {
            animate();
        }, delay * 1000);

        return () => {
            clearTimeout(timeout);
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isInView, children, delay, hasAnimated]);

    return (
        <div ref={ref} className={className}>
            {displayText}
        </div>
    );
};
