"use client";
import Image from "next/image";
import { ScrambleText } from "@/components/common/scramble-text";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Features = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];

        cards.forEach((card, index) => {
            // Pin each card and animate it as next card comes in
            ScrollTrigger.create({
                trigger: card,
                start: "top top",
                end: () => `+=${window.innerHeight * 1.5}`, // Longer scroll distance
                pin: true,
                pinSpacing: false,
                scrub: 1,
                onUpdate: (self) => {
                    const progress = self.progress;
                    const scale = 1 - (progress * 0.5); // Scale down to 50% (more dramatic)
                    const opacity = 1 - (progress * 1); // Fade to 0% (completely disappear)
                    const yMove = -(progress * 300); // Move upward by 300px (much more)

                    gsap.to(card, {
                        scale: scale,
                        opacity: opacity,
                        y: yMove,
                        duration: 0.1,
                        ease: "power2.out"
                    });
                }
            });
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <div id="features" className="relative flex flex-col w-full bg-black border-t border-white/20">
            {/* Header Section */}
            <header className="w-[90%] mx-auto max-w-[1440px] py-[6rem] space-y-[6rem]">
                <div className="flex items-center justify-between">
                    <p className="font-gambetta text-2xl text-white/80">
                        {/* <TextReveal
                            splitType="lines"
                            direction="up"
                            duration={0.7}
                            stagger={0.08}
                        >
                            (Selected Work)
                        </TextReveal> */}
                    </p>
                    <p className="font-gambetta text-2xl text-white/80">
                        {/* <TextReveal
                            splitType="lines"
                            direction="up"
                            duration={0.7}
                            stagger={0.08}
                        >
                            (01)
                        </TextReveal> */}
                    </p>
                </div>

                <div>
                    <div className="text-[3rem] sm:text-[5rem] md:text-[6rem] lg:text-[7rem] xl:text-[8rem] font-anton-sc uppercase leading-[100%] text-white">
                        <ScrambleText delay={0.4}>
                            Case Studies
                        </ScrambleText>
                    </div>
                    <p className="text-xl md:text-2xl lg:text-3xl font-normal leading-[140%] tracking-[-0.125rem] text-white/60">
                        {[
                            "Explore our recent implementations",
                            "showcasing scalable systems, automation,",
                            "and impactful growth solutions.",
                        ].map((lines, i) => (
                            <ScrambleText
                                delay={0.6 + i * 0.2}
                                key={i}
                            >
                                {lines}
                            </ScrambleText>
                        ))}
                    </p>
                </div>
            </header>

            {/* Feature Cards - Overlapping Scroll */}
            <div ref={sectionRef} className="w-full">
                <div className="relative">

                    {/* Card 1 */}
                    <div
                        ref={(el) => { cardsRef.current[0] = el; }}
                        className="sticky top-0 w-full min-h-screen flex items-center justify-center bg-black py-12"
                    >
                        <div className="w-[90%] mx-auto max-w-[1440px] grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            {/* Large Main Image - Hidden on Mobile */}
                            <div className="hidden md:block relative w-full h-140 overflow-hidden rounded-3xl group">
                                <Image
                                    src="/images/thumb/card1.png"
                                    alt="Studio Banner"
                                    fill
                                    className="object-contain transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    priority
                                />
                                {/* White Bar Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none">
                                    <div className="relative w-full h-6 flex items-center justify-center">
                                        <div className="absolute inset-0 bg-white/95 backdrop-blur-sm transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out" />
                                        <span className="relative z-10 text-black text-lg font-semibold tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                                            Scalable Coaching
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side Content - Full width on mobile with border */}
                            <div className="flex flex-col justify-center items-center gap-6 md:gap-8 w-full md:w-auto">
                                {/* Mobile Card Container with Border */}
                                <div className="md:contents">
                                    <div className="flex flex-col items-center w-full px-6 pt-30 md:p-0 border border-white/20 md:border-0 rounded-3xl">
                                        {/* Sub Card with Overlaid Title */}
                                        <div className="relative w-full max-w-[240px] aspect-square mb-25 md:mb-0">
                                            <div className="relative w-full h-full overflow-hidden rounded-3xl">
                                                <Image
                                                    src="/images/thumb/card1.1.jpg"
                                                    alt="Sub Card"
                                                    fill
                                                    className="object-contain"
                                                    sizes="(max-width: 768px) 280px, 192px"
                                                />
                                            </div>

                                            {/* Title Overlaid on Sub Card */}
                                            <div className="absolute inset-0 flex items-center justify-center md:items-end md:justify-start p-4 bg-gradient-to-t md:from-black/80 md:to-transparent">
                                                <h3 className="text-2xl md:text-4xl font-semibold text-white text-center md:text-left">
                                                    Scalable Coaching
                                                </h3>
                                            </div>
                                        </div>

                                        {/* Date and Description */}
                                        <div className="flex flex-col gap-3 md:gap-4 text-center max-w-md w-full pb-6 md:pb-0">
                                            <p className="text-white/90 text-base font-semibold">System Philosophy</p>
                                            <p className="text-white/70 text-sm leading-relaxed line-clamp-3">
                                                Effective systems are not just about structure they are about flow, clarity, and impact. Every process must function and connect with purpose to create meaningful growth experiences.                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div
                        ref={(el) => { cardsRef.current[1] = el; }}
                        className="sticky top-0 w-full min-h-screen flex items-center justify-center bg-black py-12"
                    >
                        <div className="w-[90%] mx-auto max-w-[1440px] grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            {/* Large Main Image - Hidden on Mobile */}
                            <div className="hidden md:block relative w-full h-140 overflow-hidden rounded-3xl group">
                                <Image
                                    src="/images/thumb/card2.png"
                                    alt="Main Image"
                                    fill
                                    className="object-contain transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                {/* White Bar Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none">
                                    <div className="relative w-full h-6 flex items-center justify-center">
                                        <div className="absolute inset-0 bg-white/95 backdrop-blur-sm transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out" />
                                        <span className="relative z-10 text-black text-lg font-semibold tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                                            Automated Systems
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side Content - Full width on mobile with border */}
                            <div className="flex flex-col justify-center items-center gap-6 md:gap-8 w-full md:w-auto">
                                {/* Mobile Card Container with Border */}
                                <div className="md:contents">
                                    <div className="flex flex-col items-center w-full px-6 pt-30 md:p-0 border border-white/20 md:border-0 rounded-3xl">
                                        {/* Sub Card with Overlaid Title */}
                                        <div className="relative w-full max-w-[240px] aspect-square mb-25 md:mb-0">
                                            <div className="relative w-full h-full overflow-hidden rounded-3xl">
                                                <Image
                                                    src="/images/thumb/card2.2.png"
                                                    alt="Sub Card"
                                                    fill
                                                    className="object-contain"
                                                    sizes="(max-width: 768px) 280px, 192px"
                                                />
                                            </div>

                                            {/* Title Overlaid on Sub Card */}
                                            <div className="absolute inset-0 flex items-center justify-center md:items-end md:justify-start p-4 bg-gradient-to-t md:from-black/80 md:to-transparent">
                                                <h3 className="text-2xl md:text-4xl font-semibold text-white text-center md:text-left">
                                                    Automated Systems
                                                </h3>
                                            </div>
                                        </div>

                                        {/* Date and Description */}
                                        <div className="flex flex-col gap-3 md:gap-4 text-center max-w-md w-full pb-6 md:pb-0">
                                            <p className="text-white/90 text-base font-semibold">Process Evolution</p>
                                            <p className="text-white/70 text-sm leading-relaxed line-clamp-3">
                                                Processes today are no longer rigid. They adapt, scale, and evolve—blurring the lines between strategy and execution while creating dynamic workflows that guide growth.                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div
                        ref={(el) => { cardsRef.current[2] = el; }}
                        className="sticky top-0 w-full min-h-screen flex items-center justify-center bg-black py-12"
                    >
                        <div className="w-[90%] mx-auto max-w-[1440px] grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            {/* Large Main Image - Hidden on Mobile */}
                            <div className="hidden md:block relative w-full h-140 overflow-hidden rounded-2xl group">
                                <Image
                                    src="/images/thumb/card6.png"
                                    alt="Main Image"
                                    fill
                                    className="object-contain transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                {/* White Bar Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none">
                                    <div className="relative w-full h-6 flex items-center justify-center">
                                        <div className="absolute inset-0 bg-white/95 backdrop-blur-sm transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out" />
                                        <span className="relative z-10 text-black text-lg font-semibold tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                                            Client Funnels
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side Content - Full width on mobile with border */}
                            <div className="flex flex-col justify-center items-center gap-6 md:gap-8 w-full md:w-auto">
                                {/* Mobile Card Container with Border */}
                                <div className="md:contents">
                                    <div className="flex flex-col items-center w-full px-6 pt-30 md:p-0 border border-white/20 md:border-0 rounded-3xl">
                                        {/* Sub Card with Overlaid Title */}
                                        <div className="relative w-full max-w-[240px] aspect-square mb-25 md:mb-0">
                                            <div className="relative w-full h-full overflow-hidden rounded-3xl">
                                                <Image
                                                    src="/images/thumb/card3.png"
                                                    alt="Sub Card"
                                                    fill
                                                    className="object-contain"
                                                    sizes="(max-width: 768px) 280px, 192px"
                                                />
                                            </div>

                                            {/* Title Overlaid on Sub Card */}
                                            <div className="absolute inset-0 flex items-center justify-center md:items-end md:justify-start p-4 bg-gradient-to-t md:from-black/80 md:to-transparent">
                                                <h3 className="text-2xl md:text-4xl font-semibold text-white text-center md:text-left">
                                                    Client Funnels
                                                </h3>
                                            </div>
                                        </div>

                                        {/* Date and Description */}
                                        <div className="flex flex-col gap-3 md:gap-4 text-center max-w-md w-full pb-6 md:pb-0">
                                            <p className="text-white/90 text-base font-semibold">Workflow Dynamics</p>
                                            <p className="text-white/70 text-sm leading-relaxed line-clamp-3">
                                                Automation brings systems to life, creating seamless transitions that guide clients through processes. Smart workflows transform manual tasks into efficient, engaging journeys.                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 4 */}
                    <div
                        ref={(el) => { cardsRef.current[3] = el; }}
                        className="sticky top-0 w-full min-h-screen flex items-center justify-center bg-black py-12"
                    >
                        <div className="w-[90%] mx-auto max-w-[1440px] grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            {/* Large Main Image - Hidden on Mobile */}
                            <div className="hidden md:block relative w-full h-140 overflow-hidden rounded-2xl group">
                                <Image
                                    src="/images/thumb/card4.png"
                                    alt="Main Image"
                                    fill
                                    className="object-contain transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                {/* White Bar Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none">
                                    <div className="relative w-full h-6 flex items-center justify-center">
                                        <div className="absolute inset-0 bg-white/95 backdrop-blur-sm transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out" />
                                        <span className="relative z-10 text-black text-lg font-semibold tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                                            Acquisition
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side Content - Full width on mobile with border */}
                            <div className="flex flex-col justify-center items-center gap-6 md:gap-8 w-full md:w-auto">
                                {/* Mobile Card Container with Border */}
                                <div className="md:contents">
                                    <div className="flex flex-col items-center w-full px-6 pt-30 md:p-0 border border-white/20 md:border-0 rounded-3xl">
                                        {/* Sub Card with Overlaid Title */}
                                        <div className="relative w-full max-w-[240px] aspect-square mb-25 md:mb-0">
                                            <div className="relative w-full h-full overflow-hidden rounded-3xl">
                                                <Image
                                                    src="/images/thumb/card4.4.png"
                                                    alt="Sub Card"
                                                    fill
                                                    className="object-contain"
                                                    sizes="(max-width: 768px) 280px, 192px"
                                                />
                                            </div>

                                            {/* Title Overlaid on Sub Card */}
                                            <div className="absolute inset-0 flex items-center justify-center md:items-end md:justify-start p-4 bg-gradient-to-t md:from-black/80 md:to-transparent">
                                                <h3 className="text-2xl md:text-4xl font-semibold text-white text-center md:text-left">
                                                    Acquisition
                                                </h3>
                                            </div>
                                        </div>

                                        {/* Date and Description */}
                                        <div className="flex flex-col gap-3 md:gap-4 text-center max-w-md w-full pb-6 md:pb-0">
                                            <p className="text-white/90 text-base font-semibold">Operational Excellence</p>
                                            <p className="text-white/70 text-sm leading-relaxed line-clamp-3">
                                                Every project is an opportunity to optimize and scale business systems. We build infrastructures that resonate with clients and drive consistent growth.                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 5 */}
                    <div
                        ref={(el) => { cardsRef.current[4] = el; }}
                        className="sticky top-0 w-full min-h-screen flex items-center justify-center bg-black py-12"
                    >
                        <div className="w-[90%] mx-auto max-w-[1440px] grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            {/* Large Main Image - Hidden on Mobile */}
                            <div className="hidden md:block relative w-full h-140 overflow-hidden rounded-2xl group">
                                <Image
                                    src="/images/thumb/card5.png"
                                    alt="Main Image"
                                    fill
                                    className="object-contain transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                {/* White Bar Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none">
                                    <div className="relative w-full h-6 flex items-center justify-center">
                                        <div className="absolute inset-0 bg-white/95 backdrop-blur-sm transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out" />
                                        <span className="relative z-10 text-black text-lg font-semibold tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                                            Brand Identity
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side Content - Full width on mobile with border */}
                            <div className="flex flex-col justify-center items-center gap-6 md:gap-8 w-full md:w-auto">
                                {/* Mobile Card Container with Border */}
                                <div className="md:contents">
                                    <div className="flex flex-col items-center w-full px-6 pt-30 md:p-0 border border-white/20 md:border-0 rounded-3xl">
                                        {/* Sub Card with Overlaid Title */}
                                        <div className="relative w-full max-w-[240px] aspect-square mb-25 md:mb-0">
                                            <div className="relative w-full h-full overflow-hidden rounded-3xl">
                                                <Image
                                                    src="/images/thumb/card1.1.jpg"
                                                    alt="Sub Card"
                                                    fill
                                                    className="object-contain"
                                                    sizes="(max-width: 768px) 280px, 192px"
                                                />
                                            </div>

                                            {/* Title Overlaid on Sub Card */}
                                            <div className="absolute inset-0 flex items-center justify-center md:items-end md:justify-start p-4 bg-gradient-to-t md:from-black/80 md:to-transparent">
                                                <h3 className="text-2xl md:text-4xl font-semibold text-white text-center md:text-left">
                                                    Brand Identity
                                                </h3>
                                            </div>
                                        </div>

                                        {/* Date and Description */}
                                        <div className="flex flex-col gap-3 md:gap-4 text-center max-w-md w-full pb-6 md:pb-0">
                                            <p className="text-white/90 text-base font-semibold">Business Strategy</p>
                                            <p className="text-white/70 text-sm leading-relaxed line-clamp-3">
                                                Building scalable systems through strategic planning and efficient workflows. We create infrastructures that stand out in competitive markets and connect seamlessly with clients.                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Features
