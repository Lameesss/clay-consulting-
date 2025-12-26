"use client";
import { useRef, FC, useContext, useEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { SERVICES } from "@/constants/projects";
import Image from "next/image";
import { TextReveal } from "@/components/common/text-reveal";
import { LoadingContext } from "@/components/layout";

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const { isLoading, animationComplete } = useContext(LoadingContext);

  useEffect(() => {
    if (!isLoading && animationComplete) {
      initializeGSAP();
    }
  }, [isLoading, animationComplete]);

  const initializeGSAP = () => {
    const ctx = gsap.context(() => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      ScrollTrigger.refresh();

      // Simple fade-in animation on scroll
      setTimeout(() => {
        gsap.to(contentRef.current, {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "top center",
            scrub: true,
          },
        });
      }, 100);
    }, sectionRef);

    return () => ctx.revert();
  };

  return (
    <section
      ref={sectionRef}
      className="bg-black min-h-screen relative z-10 border-t border-white/20"
    >
      <main ref={contentRef} className="transform-container">
        <header className="w-[90%] mx-auto max-w-[1440px] pt-[0rem] pb-[6rem] space-y-[6rem]">
          <div className="flex items-center justify-between">
            <p className="font-gambetta text-2xl text-white/60">
              {/* <TextReveal
                splitType="lines"
                direction="up"
                duration={0.7}
                stagger={0.08}
              >
                (What we do)
              </TextReveal> */}
            </p>
            <p className="font-gambetta text-2xl text-white/60">
              {/* <TextReveal
                splitType="lines"
                direction="up"
                duration={0.7}
                stagger={0.08}
                delay={0.2}
              >
                (02)
              </TextReveal> */}
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-2 md:gap-4">
              <h2 className="text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] xl:text-[12rem] font-semibold -tracking-[0.02345rem] leading-[130%] text-white">
                <TextReveal
                  splitType="chars"
                  direction="up"
                  duration={0.7}
                  stagger={0.08}
                  delay={0.4}
                >
                  Services
                </TextReveal>
              </h2>
              <p className="font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white pt-2 md:pt-4">
                <TextReveal
                  splitType="chars"
                  direction="up"
                  duration={0.7}
                  stagger={0.08}
                  delay={0.6}
                >
                  (6)
                </TextReveal>
              </p>
            </div>
          </div>
        </header>

        {/* White bar line - full viewport width with padding */}
        <div className="relative w-full h-6 -mt-[3rem] sm:-mt-[5rem] md:-mt-[7rem] lg:-mt-[9rem] px-4 md:px-8">
          <div className="absolute inset-0 mx-4 md:mx-8 bg-white/95 backdrop-blur-sm" />

          {/* Mobile: Scrolling words */}
          <div className="md:hidden relative z-10 h-full overflow-hidden">
            <div className="flex items-center h-full animate-scroll-infinite whitespace-nowrap">
              {/* Repeat words multiple times for seamless loop */}
              {[...Array(3)].map((_, setIndex) => (
                <div key={setIndex} className="flex items-center">
                  <span className="text-black text-xs font-semibold px-6">Precise</span>
                  <span className="text-black text-xs font-semibold px-6">Structured</span>
                  <span className="text-black text-xs font-semibold px-6">Focused</span>
                  <span className="text-black text-xs font-semibold px-6">Visual Language</span>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop: Static words */}
          <div className="relative z-10 h-full hidden md:flex items-center justify-between px-12">
            <span className="text-black text-xs lg:text-sm font-semibold">Precise</span>
            <span className="text-black text-xs lg:text-sm font-semibold">Structured</span>
            <span className="text-black text-xs lg:text-sm font-semibold">Focused</span>
            <span className="text-black text-xs lg:text-sm font-semibold">Visual Language</span>
          </div>
        </div>

        <style jsx>{`
          @keyframes scroll-infinite {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-33.333%);
            }
          }
          
          .animate-scroll-infinite {
            animation: scroll-infinite 2s linear infinite;
          }
        `}</style>

        <div className="w-[90%] mx-auto max-w-[1440px] py-[3rem] md:py-[6rem]">
          {SERVICES.map((s, i) => (
            <ServiceCard
              key={i}
              {...s}
              index={i}
            />
          ))}
        </div>
      </main>
    </section>
  );
};

export default Services;

const ServiceCard: FC<
  IServices & {
    index: number;
  }
> = ({ description, title, index, image }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePosition({ x, y });
  };

  // Calculate 3D transforms based on mouse position
  const getTransform = () => {
    if (!isHovered) return {};

    const moveX = (mousePosition.x - 0.5) * 30; // Move horizontally
    const moveY = (mousePosition.y - 0.5) * 20; // Move vertically
    const rotateX = (mousePosition.y - 0.5) * -10; // Tilt on X axis
    const rotateY = (mousePosition.x - 0.5) * 10; // Tilt on Y axis

    return {
      transform: `
        translate(${moveX}px, ${moveY}px) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg)
        scale(1.02)
      `,
    };
  };

  return (
    <article
      className="py-4 md:py-8 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <div className="grid grid-cols-12 gap-4 md:gap-8 items-start">
        {/* Empty space on left - hidden on mobile */}
        <div className="hidden md:block md:col-span-5 relative"></div>

        {/* Content area with border - full width on mobile, 60% on desktop */}
        <div className={`col-span-12 md:col-span-7 border-b border-white/20 pb-4 md:pb-8 ${index === 0 ? 'border-t pt-4 md:pt-6' : ''}`}>
          <div className="grid grid-cols-12 md:grid-cols-9 gap-4 md:gap-8 items-start">
            {/* Serial Number */}
            <div className="col-span-2 md:col-span-1">
              <p className="text-white/60 text-base md:text-lg font-semibold">
                <TextReveal
                  splitType="chars"
                  direction="up"
                  duration={0.7}
                  stagger={0.08}
                  delay={index * 0.1}
                >
                  {String(index + 1).padStart(2, '0')}
                </TextReveal>
              </p>
            </div>

            {/* Service Title */}
            <div className="col-span-10 md:col-span-3">
              <h3 className="text-white text-xl md:text-2xl font-semibold">
                <TextReveal
                  splitType="chars"
                  direction="up"
                  duration={0.7}
                  stagger={0.08}
                  delay={index * 0.1 + 0.2}
                >
                  {title.join(' ')}
                </TextReveal>
              </h3>
            </div>

            {/* Description */}
            <div className="col-span-12 md:col-span-5 md:col-start-auto">
              <p className="text-white/60 text-sm md:text-base leading-[160%]">
                <TextReveal
                  splitType="lines"
                  direction="up"
                  duration={0.7}
                  stagger={0.08}
                  delay={index * 0.1 + 0.4}
                >
                  {description}
                </TextReveal>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Hover Image Card - Overlapping with 3D effects - hidden on mobile */}
      <div
        className={`hidden md:block absolute left-[35%] top-1/2 -translate-y-1/2 z-10 transition-all duration-300 ease-out ${isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        style={{
          perspective: '1000px',
          transformStyle: 'preserve-3d',
        }}
      >
        <div
          className="w-38 h-64 rounded-lg overflow-hidden shadow-2xl transition-transform duration-200 ease-out"
          style={getTransform()}
        >
          <Image
            src={image}
            alt={title.join(' ')}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </article>
  );
};
