'use client';
import Image from 'next/image';
import React, { useRef, useEffect, useContext } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { LoadingContext } from '@/components/layout';

gsap.registerPlugin(ScrollTrigger);

const team = [
  {
    image: '/images/team/card1.jpg',
    name: 'Henry Arthur',
    role: 'General Manager',
  },
  {
    image: '/images/team/card2.png',
    name: 'Louise Marvin',
    role: 'CEO',
  },
  {
    image: '/images/team/card3.jpg',
    name: 'Bode Akinwunmi',
    role: 'Social Media manager',
  },
  {
    image: '/images/team/card4.png',
    name: 'Nguyen Shane',
    role: 'Photographer',
  },
  {
    image: '/images/team/card5.jpg',
    name: 'Ashraf Rahman',
    role: 'General Secretary',
  },
  {
    image: '/images/team/card6.png',
    name: 'Sarah Johnson',
    role: 'Creative Director',
  },
  {
    image: '/images/team/card7.jpg',
    name: 'Mike Chen',
    role: 'Lead Designer',
  },
  {
    image: '/images/team/card8.png',
    name: 'Emma Davis',
    role: 'Art Director',
  },
];

// Card sizes configuration - easily adjust width (w) and height (h) for each card
const cardSizes = [
  { w: '11rem', h: '7rem', mobileW: '8rem', mobileH: '5rem' },  // Card 1
  { w: '10rem', h: '11rem', mobileW: '7rem', mobileH: '8rem' },  // Card 2
  { w: '7rem', h: '10rem', mobileW: '5rem', mobileH: '7rem' },  // Card 3
  { w: '8rem', h: '5rem', mobileW: '6rem', mobileH: '4rem' },  // Card 4
  { w: '7rem', h: '10rem', mobileW: '5rem', mobileH: '7rem' },  // Card 5
  { w: '8rem', h: '12rem', mobileW: '6rem', mobileH: '9rem' },  // Card 6
  { w: '8rem', h: '4rem', mobileW: '6rem', mobileH: '3rem' },  // Card 7
  { w: '7rem', h: '9rem', mobileW: '5rem', mobileH: '6rem' },  // Card 8
];

const TeamSection = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const { isLoading, animationComplete } = useContext(LoadingContext);

  useEffect(() => {
    if (!isLoading && animationComplete) {
      initializeGSAP();
    }
  }, [isLoading, animationComplete]);

  const initializeGSAP = () => {
    // No scroll-triggered animations needed
    // Only the ParallaxText component handles the automatic scrolling loop
  };

  return (
    <section
      ref={sectionRef}
      className="md:min-h-screen bg-black perspective-section relative z-20"
    >
      <main ref={contentRef} className="transform-container">
        {/* Header with section label - ABOVE border */}
        <div className="w-[90%] mx-auto max-w-[1440px] pt-4 md:pt-8 pb-2 md:pb-4">
          <div className="flex items-center justify-between text-white/60 text-[10px] md:text-xs">
            <span className="hidden sm:inline">© FINAL SECTION ワーク</span>
            <span className="sm:hidden">© FINAL</span>
            <span>(WORK — (2)</span>
            <span>STUDIO WRAP</span>
          </div>
        </div>

        {/* Border line */}
        <div className="border-t border-white/20"></div>

        {/* Image Gallery with varied sizes */}
        <div className="pt-8 md:pt-16 pb-12 md:pb-22 overflow-hidden">
          <div className="inline-flex gap-2 md:gap-3 flex-shrink-0 items-start animate-scroll-cards">
            {/* Repeat team members multiple times for seamless loop */}
            {[...Array(4)].map((_, setIndex) => (
              <React.Fragment key={setIndex}>
                {team.map((t, i) => (
                  <article
                    className="group"
                    key={`${setIndex}-${i}`}
                  >
                    <div
                      className="overflow-hidden rounded-xl md:rounded-2xl"
                      style={{
                        width: window.innerWidth < 768 ? cardSizes[i].mobileW : cardSizes[i].w,
                        height: window.innerWidth < 768 ? cardSizes[i].mobileH : cardSizes[i].h
                      }}
                    >
                      <Image
                        src={t.image}
                        alt={t.name}
                        width={500}
                        height={500}
                        quality={100}
                        className="w-full h-full object-cover rounded-2xl"
                      />
                    </div>
                  </article>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>

        <style jsx>{`
          @keyframes scroll-cards {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-25%);
            }
          }
          
          .animate-scroll-cards {
            animation: scroll-cards 20s linear infinite;
          }
        `}</style>

        {/* White bar with labels - similar to services.tsx */}
        <div className="relative w-full h-5 md:h-6 px-4 md:px-8 mb-4 md:mb-16">
          <div className="absolute inset-0 mx-4 md:mx-8 bg-white/95 backdrop-blur-sm" />

          {/* Mobile: Scrolling words */}
          <div className="md:hidden relative z-10 h-full overflow-hidden">
            <div className="flex items-center h-full animate-scroll-bar whitespace-nowrap">
              {/* Repeat words multiple times for seamless loop */}
              {[...Array(3)].map((_, setIndex) => (
                <div key={setIndex} className="flex items-center">
                  <span className="text-black text-[10px] font-semibold px-6">Independent</span>
                  <span className="text-black text-[10px] font-semibold px-6">Overview</span>
                  <span className="text-black text-[10px] font-semibold px-6">Multidisciplinary</span>
                  <span className="text-black text-[10px] font-semibold px-6">Focused</span>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop: Static words */}
          <div className="relative z-10 h-full hidden md:flex items-center justify-between px-4 md:px-12">
            <span className="text-black text-xs lg:text-sm font-semibold">Independent</span>
            <span className="text-black text-xs lg:text-sm font-semibold">Overview</span>
            <span className="text-black text-xs lg:text-sm font-semibold">Multidisciplinary</span>
            <span className="text-black text-xs lg:text-sm font-semibold">Focused</span>
          </div>
        </div>

        <style jsx>{`
          @keyframes scroll-bar {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-33.333%);
            }
          }
          
          .animate-scroll-bar {
            animation: scroll-bar 8s linear infinite;
          }
        `}</style>

        {/* Description text */}
        <div className="w-[90%] mx-auto max-w-3xl text-center mb-4 md:mb-12">
          <p className="text-white text-[10px] md:text-xs lg:text-sm leading-relaxed">
            I build scalable, results-driven systems by blending strategy and automation to help coaches and consultants grow efficiently and stand out with impact.          </p>
        </div>

        {/* Back to Top Button */}
        <div className="flex justify-center pb-20 md:pb-16">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-6 md:px-8 py-2 md:py-3 rounded-full border-2 border-white text-white text-xs md:text-sm font-semibold hover:bg-white hover:text-black transition-all duration-300"
          >
            BACK TO TOP
          </button>
        </div>
      </main>
    </section>
  );
};

export default TeamSection;
