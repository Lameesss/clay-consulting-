'use client';
import React, { useState, useRef, useEffect, useContext } from 'react';
import MaskText from '@/components/common/MaskText';
import Image from 'next/image';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { LoadingContext } from '@/components/layout';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
    {
        question: 'What services do you offer for coaches and consultants?',
        answer:
            'We specialize in building scalable business systems, client acquisition workflows, automated delivery processes, and operational infrastructures. Our solutions help you attract, serve, and retain clients efficiently while freeing up your time.',
    },
    {
        question: 'How long does it take to implement a system?',
        answer:
            'Implementation timelines vary depending on complexity. A basic client acquisition system typically takes 2-3 weeks, full operational infrastructure 4-6 weeks, and advanced automation workflows 6-8 weeks. We provide a detailed plan during consultation.',
    },
    {
        question: 'Do you work with solo coaches or only larger teams?',
        answer:
            'We work with businesses of all sizes—from solo coaches to growing consulting teams. Our systems are designed to scale, so they grow with your business.',
    },
    {
        question: 'What is your implementation process like?',
        answer:
            'Our process includes discovery, bottleneck analysis, system design, automation setup, team training, and ongoing optimization. We collaborate with you at every step to ensure the infrastructure aligns perfectly with your business model and growth goals.',
    },
    {
        question: 'Can you help with ongoing system management?',
        answer:
            'Absolutely! We offer support and optimization packages to ensure your systems remain efficient, updated, and aligned with your evolving business needs.',
    },
    {
        question: 'How do you ensure the systems fit my budget?',
        answer:
            'We provide transparent pricing and a clear project scope upfront. Regular check-ins and milestone reviews ensure the project stays within budget while delivering scalable results.',
    },
];


interface FAQItemProps {
    faq: {
        question: string;
        answer: string;
    };
    index: number;
    isActive: boolean;
    onClick: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ faq, index, isActive, onClick }) => {
    return (
        <article className="py-3 md:py-5 relative border-b border-white/20">
            <div className={`${index === 0 ? 'border-t border-white/20 pt-3 md:pt-4 pb-3 md:pb-5' : 'pb-3 md:pb-5'}`}>
                <div className="grid grid-cols-12 md:grid-cols-9 gap-3 md:gap-6 items-start">
                    {/* Serial Number */}
                    <div className="col-span-2 md:col-span-1">
                        <p className="text-white/60 text-sm md:text-base font-semibold">
                            <MaskText phrases={[String(index + 1).padStart(2, '0')]} tag="span" />
                        </p>
                    </div>

                    {/* FAQ Question and Answer */}
                    <div className="col-span-10 md:col-span-8">
                        {/* Question - clickable */}
                        <div
                            className="cursor-pointer group mb-2"
                            onClick={onClick}
                        >
                            <div className="flex items-center justify-between gap-3">
                                <h3 className="text-white text-base md:text-lg font-semibold group-hover:text-white/80 transition-colors">
                                    <MaskText phrases={[faq.question]} tag="span" />
                                </h3>
                                <div className="flex-shrink-0">
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="text-white"
                                    >
                                        {isActive ? (
                                            <path
                                                d="M4 10H16"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                            />
                                        ) : (
                                            <path
                                                d="M10 4V16M4 10H16"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                            />
                                        )}
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Answer - expandable */}
                        <motion.div
                            className="overflow-hidden"
                            animate={{
                                height: isActive ? 'auto' : 0,
                                marginTop: isActive ? '0.75rem' : 0,
                            }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                            <p className="text-white/60 text-xs md:text-sm leading-[160%] font-semibold">
                                {faq.answer}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </article>
    );
};

const ImageCarousel: React.FC = () => {
    const images = [
        '/images/david.png',
        '/images/emily.png',
        '/images/linden.png',
        '/images/jessica.png',
        '/images/gen_manager.png',
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 1000);

        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="relative">
            {/* Background Image Card with Carousel */}
            <div className="absolute -top-38 left-0 w-32 h-50 rounded-lg overflow-hidden opacity-90">
                {images.map((src, index) => (
                    <motion.div
                        key={src}
                        className="absolute inset-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: index === currentIndex ? 1 : 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Image
                            src={src}
                            alt={`Person ${index + 1}`}
                            fill
                            className="object-cover"
                        />
                    </motion.div>
                ))}
            </div>

            {/* Text Overlay */}
            <h3 className="text-white text-2xl lg:text-3xl xl:text-4xl font-semibold leading-tight relative z-10">
                Clarifying Deliverable&apos;s Before They Begin with Real Process and Honest <br />アンサー.
            </h3>
        </div>
    );
};

const FAQSection: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const sectionRef = useRef<HTMLDivElement>(null);
    const { isLoading, animationComplete } = useContext(LoadingContext);

    useEffect(() => {
        if (!isLoading && animationComplete) {
            initializeGSAP();
        }
    }, [isLoading, animationComplete]);

    const initializeGSAP = () => {
        // No animations needed for FAQ section
        // Sticky positioning handles the layout
    };

    const handleClick = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section
            ref={sectionRef}
            className="bg-black min-h-screen relative z-20 border-t border-white/20"
        >
            <main>
                <header className="w-[90%] mx-auto max-w-[1440px] pt-[6rem] pb-[2rem]">
                    <div className="space-y-6">
                        <h2 className="text-[3rem] sm:text-[4rem] md:text-[5rem] lg:text-[6rem] font-semibold -tracking-[0.02345rem] leading-[130%] text-white">
                            <MaskText phrases={["FAQ&apos;S"]} tag="span" />
                        </h2>
                    </div>
                </header>

                <div className="w-[90%] mx-auto max-w-[1440px] py-[1rem] md:py-[2rem]">
                    <div className="grid grid-cols-12 gap-4 md:gap-8 items-start">
                        {/* Left side sticky text with image carousel - only on desktop */}
                        <div className="hidden md:block md:col-span-5">
                            <div className="sticky top-[40vh] pt-[12rem] pr-8">
                                <ImageCarousel />
                            </div>
                        </div>

                        {/* Right side FAQ items */}
                        <div className="col-span-12 md:col-span-7">
                            {faqs.map((faq, index) => (
                                <FAQItem
                                    key={index}
                                    faq={faq}
                                    index={index}
                                    isActive={activeIndex === index}
                                    onClick={() => handleClick(index)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </section>
    );
};

export default FAQSection;
