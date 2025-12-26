"use client";
import Image from "next/image";
import logo from "@/svgs/logo.svg";
import { FlipLink } from "./flip-link";
import { useTransitionRouter } from "next-view-transitions";
import Link from "next/link";
import { pageAnimation } from "@/helpers/animation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navigation = ({ isHomePage = false }) => {
  const router = useTransitionRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Disable body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const navItems = [
    { label: "Projects", href: "/" },
    { label: "Services", href: "/" },
    { label: "Pricing", href: "/" },
    { label: "Features", href: "/" },
  ];

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    router.push(href, {
      onTransitionReady: pageAnimation,
    });
  };

  const NavItem = ({ item }: { item: { label: string; href: string } }) => (
    <li className="leading-[100%] font-semibold font-base">
      <FlipLink
        href={item.href}
        onClick={(e) => {
          e.preventDefault();
          router.push(item.href, {
            onTransitionReady: pageAnimation,
          });
        }}
      >
        {item.label}
      </FlipLink>
    </li>
  );

  const MobileNavItem = ({ item, index }: { item: { label: string; href: string }, index: number }) => (
    <motion.li
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 + index * 0.1, duration: 0.5 }}
      className="leading-[100%]"
    >
      <button
        onClick={() => handleNavClick(item.href)}
        className="text-5xl md:text-6xl font-anton-sc uppercase hover:text-white/70 transition-colors"
      >
        {item.label}
      </button>
    </motion.li>
  );

  if (isHomePage) {
    return (
      <>
        {/* Desktop Navigation */}
        <nav className="pt-12 px-6 md:px-[4.5rem] flex items-center justify-between">
          {/* Desktop Menu - Hidden on mobile */}
          <ul className="hidden md:flex items-center gap-6">
            {navItems.map((item, index) => (
              <NavItem key={index} item={item} />
            ))}
          </ul>

          {/* Hamburger Menu Button - Visible only on mobile */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden flex flex-col gap-1.5 z-50 ${isMenuOpen ? 'fixed' : 'relative'}`}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="w-7 h-0.5 bg-white block transition-all"
            />
            <motion.span
              animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-7 h-0.5 bg-white block transition-all"
            />
            <motion.span
              animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="w-7 h-0.5 bg-white block transition-all"
            />
          </button>

          {/* Desktop Contact - Hidden on mobile */}
          <li className="hidden md:block leading-[100%] font-semibold font-base list-none">
            <FlipLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                router.push("#", {
                  onTransitionReady: pageAnimation,
                });
              }}
            >
              Contact
            </FlipLink>
          </li>
        </nav>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black z-40 md:hidden w-full h-full overflow-hidden"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-start justify-start h-full w-full px-8 pt-32 overflow-y-auto"
              >
                <ul className="space-y-8 w-full">
                  {navItems.map((item, index) => (
                    <MobileNavItem key={index} item={item} index={index} />
                  ))}
                  <motion.li
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + navItems.length * 0.1, duration: 0.5 }}
                    className="leading-[100%]"
                  >
                    <button
                      onClick={() => handleNavClick("#")}
                      className="text-5xl md:text-6xl font-anton-sc uppercase hover:text-white/70 transition-colors"
                    >
                      Contact
                    </button>
                  </motion.li>
                </ul>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  return (
    <nav className="py-12">
      <div className="w-[90%] max-w-[1440px] mx-auto flex items-center justify-between">
        <Link
          href="/"
          onClick={(e) => {
            e.preventDefault();
            router.push("/", {
              onTransitionReady: pageAnimation,
            });
          }}
        >
          <Image src={logo} alt="kajo logo" />
        </Link>

        <ul className="flex items-center gap-6">
          {navItems.map((item, index) => (
            <NavItem key={index} item={item} />
          ))}
        </ul>

        <li className="leading-[100%] font-semibold font-base list-none">
          <FlipLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              router.push("#", {
                onTransitionReady: pageAnimation,
              });
            }}
          >
            Contact
          </FlipLink>
        </li>
      </div>
    </nav>
  );
};

export default Navigation;
