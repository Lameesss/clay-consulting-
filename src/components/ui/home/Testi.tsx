"use client";
import avatar1 from "@/assets/avatar-1.png";
import avatar2 from "@/assets/avatar-2.png";
import avatar3 from "@/assets/avatar-3.png";
import avatar4 from "@/assets/avatar-4.png";
import avatar5 from "@/assets/avatar-5.png";
import avatar6 from "@/assets/avatar-6.png";
import avatar7 from "@/assets/avatar-7.png";
import avatar8 from "@/assets/avatar-8.png";
import avatar9 from "@/assets/avatar-9.png";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import Container from "@/global/container";

const testimonials = [
  {
    text: "Nicolas frameworks helped me reposition my consulting services and start attracting premium clients within weeks.",
    imageSrc: avatar1.src,
    name: "Jamie Rivera",
    username: "@jamietechguru00",
  },
  {
    text: "Our entire team now operates with more focus and clarity—growth action plans made our results visible and sustainable.",
    imageSrc: avatar2.src,
    name: "Josh Smith",
    username: "@jjsmith",
  },
  {
    text: "My business revenue doubled after implementing Nicolas strategies for outreach and brand positioning.",
    imageSrc: avatar3.src,
    name: "Morgan Lee",
    username: "@morganleewhiz",
  },
  {
    text: "Integrating Nicolas tools into my workflow was seamless—the support was incredible and results came fast.",
    imageSrc: avatar4.src,
    name: "Casey Jordan",
    username: "@caseyj",
  },
  {
    text: "Client discovery worksheets and live workshops transformed how I build relationships and close deals.",
    imageSrc: avatar5.src,
    name: "Taylor Kim",
    username: "@taylorkimm",
  },
  {
    text: "The brand positioning playbook gave my consulting business a distinct edge and clarity in a crowded market.",
    imageSrc: avatar6.src,
    name: "Riley Smith",
    username: "@rileysmith1",
  },
  {
    text: "Joining the mastermind group brought accountability and new insights—the shared success stories are inspiring.",
    imageSrc: avatar7.src,
    name: "Jordan Patels",
    username: "@jpatelsdesign",
  },
  {
    text: "The performance dashboard provides real-time feedback on my growth, helping me stay ahead and keep scaling.",
    imageSrc: avatar8.src,
    name: "Sam Dawson",
    username: "@dawsontechtips",
  },
  {
    text: "Nicolas tools are intuitive and actionable—exactly what consultants need to thrive without burnout.",
    imageSrc: avatar9.src,
    name: "Casey Harper",
    username: "@casey09",
  },
];


const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const TestimonialsColumn = (props: {
  className?: string;
  testimonials: typeof testimonials;
  duration?: number;
}) => {
  const duplicatedTestimonials = [...props.testimonials, ...props.testimonials];

  return (
    <div className={`overflow-hidden ${props.className || ""}`}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6"
      >
        {duplicatedTestimonials.map(({ text, imageSrc, name, username }, index) => (
          <motion.div
            key={`${username}-${index}`}
            className="rounded-xl bg-black border border-white/10 transition-all shadow-lg shadow-black/20 p-6 md:p-8 flex-shrink-0 cursor-pointer flex flex-col justify-between min-h-[280px]"
            style={{ transformStyle: 'preserve-3d' }}
            whileHover={{
              scale: 1.02,
              rotateX: 2,
              rotateY: 2,
              backgroundColor: 'rgba(20, 20, 20, 1)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(255, 255, 255, 0.1)',
            }}
            transition={{
              duration: 0.3,
              ease: 'easeOut',
            }}
          >
            {/* Quote Text */}
            <div className="text-base md:text-lg text-white leading-relaxed mb-6">
              &quot;{text}&quot;
            </div>

            {/* Profile Section */}
            <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/10">
              {/* Left: Avatar + Name + Title */}
              <div className="flex items-center gap-3">
                <Image
                  width={48}
                  height={48}
                  src={imageSrc}
                  alt={name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-white text-sm md:text-base">{name}</span>
                    {/* Verified Badge */}
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="text-blue-400"
                    >
                      <path
                        d="M8 0L9.79611 2.33688L12.7023 2.47023L12.4702 5.37389L14.6569 7.5L12.4702 9.62611L12.7023 12.5298L9.79611 12.6631L8 15L6.20389 12.6631L3.29772 12.5298L3.52978 9.62611L1.34315 7.5L3.52978 5.37389L3.29772 2.47023L6.20389 2.33688L8 0Z"
                        fill="currentColor"
                      />
                      <path
                        d="M6.5 8L7.5 9L9.5 7"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="text-white/60 text-xs md:text-sm">{username}</span>
                </div>
              </div>

              {/* Right: Company Logo/Text */}
              <div className="text-white font-bold text-xl md:text-2xl italic">
                clay
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export const Testi = () => {
  return (
    <section className="relative flex flex-col items-center justify-center w-full border-t border-white/20 mt-20 pt-32 pb-32">
      <div className="w-full overflow-hidden mb-8">
        <div className="flex items-center animate-scroll-heading whitespace-nowrap">
          {/* Repeat the heading multiple times for seamless loop */}
          {[...Array(4)].map((_, index) => (
            <h2
              key={index}
              className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-semibold -tracking-[0.02345rem] leading-[100%] text-white px-8"
            >
              Testimonial© - Reviews
            </h2>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-heading {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-25%);
          }
        }
        
        .animate-scroll-heading {
          animation: scroll-heading 5s linear infinite;
        }
      `}</style>

      <Container>
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          <button className="px-8 py-3 rounded-full border-2 border-white text-white text-sm font-semibold hover:bg-white hover:text-black transition-all duration-300">
            GET IN TOUCH
          </button>
        </div>
      </Container>

      <div className="flex justify-center gap-6 mt-10 w-full [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]">
        <div className="max-h-[600px] md:max-h-[740px] overflow-hidden w-full max-w-[320px]">
          <TestimonialsColumn testimonials={firstColumn} duration={7} />
        </div>
        <div className="hidden md:block max-h-[600px] md:max-h-[740px] overflow-hidden w-full max-w-[320px]">
          <TestimonialsColumn testimonials={secondColumn} duration={10} />
        </div>
        <div className="hidden lg:block max-h-[600px] md:max-h-[740px] overflow-hidden w-full max-w-[320px]">
          <TestimonialsColumn testimonials={thirdColumn} duration={7} />
        </div>
      </div>
    </section>
  );
};
