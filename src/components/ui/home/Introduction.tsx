"use client";

import {
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import { SERVICES_IMAGES } from "@/constants/images";

const text = `Crafting scalable business systems. Blending strategy and automation with operational clarity and execution precision. Delivering reliable infrastructures with structure, flow, and sustainable growth.`;
const characters = text.split("");

export default function Introduction() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  const [currentChar, setCurrentChar] = useState(0);

  const charIndex = useTransform(scrollYProgress, [0, 1], [0, characters.length]);

  // 3D Parallax scroll effects for cards
  const card1Y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const card1RotateX = useTransform(scrollYProgress, [0, 1], [0, 5]);

  const card2Y = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const card2RotateX = useTransform(scrollYProgress, [0, 1], [0, -5]);

  const card3Y = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const card3RotateY = useTransform(scrollYProgress, [0, 1], [0, 8]);

  useEffect(() => {
    charIndex.on("change", (latest) => {
      setCurrentChar(latest);
    });
  }, [charIndex]);

  return (
    <section ref={sectionRef} className="pt-30 md:pt-62 lg:pt-84 pb-28 lg:pb-120 bg-black min-h-screen flex items-center relative overflow-hidden">
      <div className="container relative z-10">
        {/* Background Image Cards */}
        <div className="absolute inset-0 pointer-events-none" style={{ perspective: '1000px' }}>
          {/* Top-left card - positioned to overlap with text */}
          <motion.div
            style={{
              y: card1Y,
              rotateX: card1RotateX,
              transformStyle: 'preserve-3d'
            }}
            className="absolute -top-0 md:-top-24 lg:-top-58 left-[5%] md:left-[10%] lg:left-[15%] w-24 h-32 md:w-64 md:h-80 lg:w-80 lg:h-[28rem] rounded-md md:rounded-lg overflow-hidden opacity-90 z-0"
          >
            <Image
              src={SERVICES_IMAGES[0]}
              alt="Brand Strategy"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Bottom-left card - positioned to overlap with text */}
          <motion.div
            style={{
              y: card2Y,
              rotateX: card2RotateX,
              transformStyle: 'preserve-3d'
            }}
            className="absolute bottom-20 md:-bottom-20 lg:-bottom-94 left-[5%] md:left-[10%] lg:left-[15%] w-20 h-28 md:w-64 md:h-80 lg:w-80 lg:h-[28rem] rounded-md md:rounded-lg overflow-hidden opacity-90 z-0"
          >
            <Image
              src={SERVICES_IMAGES[1]}
              alt="Website Design"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Right card - positioned to overlap with text */}
          <motion.div
            style={{
              y: card3Y,
              rotateY: card3RotateY,
              transformStyle: 'preserve-3d'
            }}
            className="absolute top-1/2 -translate-y-1/2 right-[0%] md:right-[2%] lg:right-[4%] w-28 h-40 md:w-80 md:h-[28rem] lg:w-[28rem] lg:h-[36rem] rounded-md md:rounded-lg overflow-hidden opacity-90 z-0"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/images/intro2.mp4" type="video/mp4" />
            </video>
          </motion.div>
        </div>

        {/* Text Content */}
        <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-left md:text-center font-medium max-w-md sm:max-w-lg md:max-w-4xl mx-auto relative z-20 px-6 md:px-0 min-h-[100vh] md:min-h-0 flex items-center leading-tight">
          <span className="text-white/15">
            {characters.map((char, charIndex) => (
              <span
                key={charIndex}
                className={twMerge(
                  "transition duration-100 text-white/15",
                  charIndex < currentChar && "text-white"
                )}
              >{char === " " ? "\u00A0" : char}</span>
            ))}
          </span>
        </div>
      </div>
    </section>
  );
}
