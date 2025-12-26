"use client";
import { useRef, useEffect, useContext } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { LoadingContext } from "@/components/layout";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const headingRef = useRef(null);
  const { isLoading, animationComplete } = useContext(LoadingContext);

  const isHeadingInView = useInView(headingRef, {
    once: false,
    amount: 0.3,
    margin: "0px 0px -100px 0px",
  });

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
          rotateX: "0deg",
          scale: 1,
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

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "bottom bottom-=300",
          end: "bottom top-=300",
          pin: true,
          pinSpacing: false,
        });

        gsap.to(sectionRef.current, {
          rotateX: "12deg",
          scale: 0.92,
          opacity: 0.8,
          transformOrigin: "center bottom",
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "bottom bottom-=300",
            end: "bottom bottom-=500",
            scrub: true,
          },
        });
      }, 100);
    }, sectionRef);

    return () => ctx.revert();
  };

  return (
    <footer
      ref={sectionRef}
      className="bg-black md:min-h-screen perspective-section relative z-20"
    >
      <div ref={contentRef} className="transform-container">
        <div className="w-[90%] max-w-[1440px] mx-auto pt-6 md:pt-8 pb-4 md:pb-12 flex flex-col justify-between md:min-h-screen">
          {/* Top Section - Quick Links and Networks */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-start gap-6 md:gap-0 text-white text-xs border-b border-white/20 pb-6 md:pb-8">
            {/* Left: Quick Links */}
            <div>
              <h4 className="mb-2 text-white text-xs md:text-sm">Quick Links</h4>
              <div className="text-xs text-white/60">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <span>, </span>
                <Link href="/" className="hover:text-white transition-colors">Gallery</Link>
                <span>, </span>
                <Link href="/" className="hover:text-white transition-colors">Work</Link>
                <span>, </span>
                <Link href="/" className="hover:text-white transition-colors">Contact</Link>
              </div>
            </div>

            {/* Right: Networks */}
            <div className="md:text-right">
              <h4 className="mb-2 text-white text-xs md:text-sm">Networks</h4>
              <div className="text-xs text-white/60">
                <a href="https://www.instagram.com/thenicolasclay/?hl=en" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
                <span>, </span>
                <a href="" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Whatsapp</a>
                <span>, </span>
                <a href="https://www.youtube.com/@NicolasClay" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Youtube</a>
                <span>, </span>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Twitter</a>
              </div>
            </div>
          </div>

          {/* Center Section - Large ©CLAY */}
          <div className="flex items-center justify-center py-2 md:flex-1 md:py-0" ref={headingRef}>
            <h2 className="text-white font-bold leading-none text-[6rem] sm:text-[8rem] md:text-[12rem] lg:text-[16rem] xl:text-[20rem] 2xl:text-[24rem] whitespace-nowrap">
              <motion.span
                initial="hidden"
                animate={isHeadingInView ? "visible" : "hidden"}
                className="flex"
              >
                {"©CLAY".split("").map((char, i) => (
                  <span key={`char-container-${i}`} className="inline-block overflow-hidden">
                    <motion.span
                      key={`char-${i}`}
                      className="inline-block"
                      variants={{
                        hidden: { y: "100%", opacity: 0 },
                        visible: {
                          y: 0,
                          opacity: 1,
                          transition: {
                            duration: 1.2,
                            delay: i * 0.15,
                            ease: [0.22, 1, 0.36, 1],
                          },
                        },
                      }}
                    >
                      {char}
                    </motion.span>
                  </span>
                ))}
              </motion.span>
            </h2>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
