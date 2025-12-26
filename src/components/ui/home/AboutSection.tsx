'use client';
import ParallaxText from '@/components/common/ScrollVelocity';
import placeholder_1 from '@/images/placeholder_1.png';
import placeholder_2 from '@/images/placeholder_2.png';
import placeholder_3 from '@/images/placeholder_3.png';
import placeholder_4 from '@/images/placeholder_4.png';
import placeholder_5 from '@/images/placeholder_5.png';
import placeholder_6 from '@/images/placeholder_6.png';
import placeholder_7 from '@/images/placeholder_7.png';
import placeholder_8 from '@/images/placeholder_8.png';
import Image from 'next/image';
import MaskText from '@/components/common/MaskText';
import { useRef, useEffect, useContext } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { LoadingContext } from '@/components/layout';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
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
        gsap.to(contentRef.current, {
          rotateX: '0deg',
          scale: 1,
          opacity: 1,
          y: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'top center',
            scrub: true,
          },
        });

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'bottom bottom-=300',
          end: 'bottom top-=300',
          pin: true,
          pinSpacing: false,
        });

        gsap.to(sectionRef.current, {
          rotateX: '12deg',
          scale: 0.92,
          opacity: 0.8,
          transformOrigin: 'center bottom',
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'bottom bottom-=300',
            end: 'bottom bottom-=500',
            scrub: true,
          },
        });
      }, 100);
    }, sectionRef);

    return () => ctx.revert();
  };

  const rowOne = [placeholder_5, placeholder_1, placeholder_2, placeholder_6];
  const rowTwo = [placeholder_3, placeholder_4, placeholder_7, placeholder_8];

  const mainText = ['Where', 'Creativity', 'Meets', 'Innovation'];
  const paragraphText = [
    'Step into our creative studio – where',
    'ambition ignites and creativity flourishes. With top-',
    'notch design solutions and a vibrant approach, we fuel',
    'your brand and feed your imagination. Welcome to',
    'the space where your vision takes flight',
  ];

  return (
    <section
      ref={sectionRef}
      className="bg-inverse-1 min-h-screen perspective-section relative z-20"
    >
      <main ref={contentRef} className="transform-container">
        <div className="py-[4.5rem] md:py-[6.25rem] space-y-[6.25rem] md:space-y-[10rem]">
          <div className="flex flex-col md:flex-row items-start justify-between max-w-screen-xl mx-auto w-[90%] gap-8 md:gap-12">
            <div className="max-w-[43.25rem] text-white font-medium text-[3rem] md:text-[5rem] lg:text-[8rem] leading-[4rem] lg:leading-[8.875rem] tracking-[-0.16rem]">
              <MaskText phrases={mainText} tag="h1" />
            </div>

            <div className="max-w-[22.75rem] text-white/60 leading-[1.375rem] flex flex-col text-sm md:text-base">
              <MaskText phrases={paragraphText} tag="p" />
            </div>
          </div>

          <div className="space-y-4 overflow-hidden">
            <ParallaxText baseVelocity={1}>
              <div className="inline-flex gap-2 lg:gap-4 flex-shrink-0">
                {rowOne.map((image, i) => (
                  <div
                    key={i}
                    className="w-[20rem] sm:w-[20rem] md:w-[24rem] lg:w-[26rem]"
                  >
                    <Image
                      src={image}
                      alt="placeholder"
                      className="object-contain w-full h-auto"
                      quality={100}
                    />
                  </div>
                ))}
              </div>
            </ParallaxText>
            <ParallaxText baseVelocity={-1}>
              <div className="inline-flex gap-4 flex-shrink-0">
                {rowTwo.map((image, i) => (
                  <div
                    key={i}
                    className="w-[20rem] sm:w-[20rem] md:w-[24rem] lg:w-[26rem]"
                  >
                    <Image
                      src={image}
                      alt="placeholder"
                      className="object-contain w-full h-auto"
                      quality={100}
                    />
                  </div>
                ))}
              </div>
            </ParallaxText>
          </div>
        </div>
      </main>
    </section>
  );
};

export default AboutSection;
