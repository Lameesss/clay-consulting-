import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";
import { wrap } from "@motionone/utils";

// Video sources from public/images/awards/
export const CART_ONE = [
  "/images/awards/card1.mp4",
  "/images/awards/card2.mp4",
  "/images/awards/card3.mp4",
];
export const CART_TWO = [
  "/images/awards/card4.mp4",
  "/images/awards/card5.mp4",
  "/images/awards/card6.mp4",
];
export const CART_THREE = [
  "/images/awards/card7.mp4",
  "/images/awards/card8.mp4",
  "/images/awards/card9.mp4",
];

interface ParallaxProps {
  children: React.ReactNode;
  baseVelocity: number;
}

function ParallaxText({ children, baseVelocity = 100 }: ParallaxProps) {
  const baseY = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const y = useTransform(baseY, (v) => `${wrap(-25, -50, v)}%`);
  const directionFactor = useRef<number>(1);

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseY.set(baseY.get() + moveBy);
  });

  return (
    <div className="parallax-vertical">
      <motion.div className="scroller-vertical" style={{ y }}>
        <span>{children}</span>
        <span>{children}</span>
        <span>{children}</span>
        <span>{children}</span>
      </motion.div>
    </div>
  );
}

export default function ParallaxMarquee() {
  return (
    <section className="flex w-full h-screen">
      <ParallaxText baseVelocity={2}>
        {CART_ONE.map((item, index) => (
          <video
            key={index}
            src={item}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-auto object-cover"
          />
        ))}
      </ParallaxText>
      <ParallaxText baseVelocity={-2}>
        {CART_TWO.map((item, index) => (
          <video
            key={index}
            src={item}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-auto object-cover"
          />
        ))}
      </ParallaxText>
      <ParallaxText baseVelocity={2}>
        {CART_THREE.map((item, index) => (
          <video
            key={index}
            src={item}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-auto object-cover"
          />
        ))}
      </ParallaxText>
    </section>
  );
}
