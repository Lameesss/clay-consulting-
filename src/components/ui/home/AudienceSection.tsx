'use client';
import MaskText from '@/components/common/MaskText';
import React, { useEffect, useRef, useContext } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import freelancer from '@/svgs/freelancer.svg';
import monitor from '@/svgs/monitor.svg';
import book from '@/svgs/book.svg';
import corporate from '@/svgs/corporate.svg';
import Image from 'next/image';
import { LoadingContext } from '@/components/layout';

gsap.registerPlugin(ScrollTrigger);

const AudienceSection = () => {
  const mainText = ['Open doors,', 'diverse minds:', 'welcomes all'];
  const pillsRef = useRef<(HTMLDivElement | null)[]>([]);
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

      setTimeout(() => {
        // Set initial state - content is visible but pills are hidden
        gsap.set(contentRef.current, { opacity: 1 });
        gsap.set(pillsRef.current.filter(Boolean), {
          y: 100,
          opacity: 0,
          scale: 0.9,
        });

        // Main timeline - pins section immediately when it reaches top
        const mainTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top', // Pin immediately when section reaches top
            end: '+=2800', // Scroll duration
            scrub: 1,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
          },
        });

        // Animate pills in - starts immediately after pin
        mainTimeline.to(
          pillsRef.current.filter(Boolean),
          {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.15,
            duration: 0.8,
            ease: 'power3.out',
          },
          0.2 // Small delay after pin
        );

        // Add floating animation for each pill
        pillsRef.current.filter(Boolean).forEach((pill, index) => {
          mainTimeline.to(
            pill,
            {
              y: index % 2 === 0 ? -12 : 12,
              duration: 0.8,
              ease: 'sine.inOut',
            },
            '-=0.5'
          );
        });

        // Add continuous bounce effect during the pinned section
        pillsRef.current.filter(Boolean).forEach((pill, index) => {
          gsap.to(pill, {
            y: '+=6',
            duration: 0.5,
            ease: 'power1.inOut',
            yoyo: true,
            repeat: -1,
            delay: index * 0.08,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: '+=2800',
              toggleActions: 'play pause resume pause',
            },
          });
        });

        // Add subtle scale pulse
        mainTimeline.to(
          pillsRef.current.filter(Boolean),
          {
            scale: 1.04,
            duration: 0.5,
            stagger: 0.06,
            ease: 'power2.inOut',
            yoyo: true,
            repeat: 1,
          },
          '-=0.2'
        );

        // Hold at the end before unpinning
        mainTimeline.to({}, { duration: 0.4 });

        // Exit animation - 3D transform as section scrolls away
        gsap.to(sectionRef.current, {
          rotateX: '12deg',
          scale: 0.92,
          opacity: 0.8,
          transformOrigin: 'center bottom',
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'bottom bottom',
            end: 'bottom top',
            scrub: 2,
          },
        });
      }, 100);
    }, sectionRef);

    return () => ctx.revert();
  };

  const handlePillRef = (index: number) => (el: HTMLDivElement | null) => {
    pillsRef.current[index] = el;
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-black perspective-section relative z-20"
    >
      <main
        ref={contentRef}
        className="transform-container h-screen grid place-items-center relative"
      >
        <div className="text-[3.5rem] md:text-[7.5rem] font-medium leading-[4rem] md:leading-[7.625rem] tracking-[-0.15rem] text-center text-white">
          <MaskText phrases={mainText} tag="h1" />
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full space-y-[12rem] md:space-y-[19rem]">
          <div className="w-[90%] md:w-[50%] mx-auto flex items-center justify-between">
            <div
              ref={handlePillRef(0)}
              className="flex items-center bg-white text-black gap-2 p-2 md:p-3 rounded-lg shadow-lg hover:scale-105 transition-transform"
            >
              <Image src={freelancer} alt="Freelancer logo" className="w-3.5 md:w-6" />
              <span className="text-sm md:text-xl leading-[-0.025rem] font-semibold">Freelancers</span>
            </div>
            <div
              ref={handlePillRef(1)}
              className="flex items-center bg-white text-black gap-2 p-2 md:p-3 rounded-lg shadow-lg hover:scale-105 transition-transform"
            >
              <Image src={book} alt="Book logo" className="w-3.5 md:w-6" />
              <span className="text-sm md:text-xl leading-[-0.025rem] font-semibold">Students</span>
            </div>
          </div>
          <div className="w-[90%] md:w-[70%] mx-auto flex items-center justify-between">
            <div
              ref={handlePillRef(2)}
              className="flex items-center bg-white text-black gap-2 p-2 md:p-3 rounded-lg shadow-lg hover:scale-105 transition-transform"
            >
              <Image src={monitor} alt="Remote worker logo" className="w-3.5 md:w-6" />
              <span className="text-sm md:text-xl leading-[-0.025rem] font-semibold">Remote workers</span>
            </div>
            <div
              ref={handlePillRef(3)}
              className="flex items-center bg-white text-black gap-2 p-2 md:p-3 rounded-lg shadow-lg hover:scale-105 transition-transform"
            >
              <Image src={corporate} alt="Corporate logo" className="w-3.5 md:w-6" />
              <span className="text-sm md:text-xl leading-[-0.025rem] font-semibold">
                Corporate employees
              </span>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default AudienceSection;
