"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";

interface Brand {
  id: string;
  name: string;
  badge: React.ReactNode;
  model: string;
  category: string;
}

export default function LandingPage() {
  const [activeBrand, setActiveBrand] = useState("porsche");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const brands: Brand[] = [







  ];

  const handleNextBrand = () => {
    const currentIndex = brands.findIndex((b) => b.id === activeBrand);
    const nextIndex = (currentIndex + 1) % brands.length;
    setActiveBrand(brands[nextIndex].id);
  };

  return (
    <div className="w-full bg-[#fdfdfd] text-zinc-900 selection:bg-black selection:text-white">
      {/* =========================================================================
          GLOBAL STICKY NAVIGATION BAR (VISIBLE ACROSS ALL SECTIONS ON SCROLL)
         ========================================================================= */}
      <header
        className={`fixed top-0 left-0 w-full z-50 px-6 sm:px-12 lg:px-16 transition-all duration-300 flex items-center justify-between ${isScrolled
          ? "py-3 sm:py-3.5 bg-white/85 backdrop-blur-xl border-b border-zinc-200/70 shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
          : "py-5 sm:py-6 lg:py-7 bg-transparent"
          }`}
      >
        {/* Brand Logo: Unique */}
        <a
          href="#"
          className="group flex items-center gap-3 focus:outline-none"
          aria-label="Unique Homepage"
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black flex items-center justify-center transition-transform group-hover:scale-105">
            <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-[2.5px] border-white border-r-transparent rotate-[-45deg]" />
          </div>
          <span className="text-xl sm:text-2xl font-black tracking-tight text-black font-sans">
            Zenith
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10 text-[14px] lg:text-[15px] font-medium text-zinc-700">
          <a
            href="#about"
            className="hover:text-black transition-colors duration-150"
          >
            About Us
          </a>
          <a
            href="#cars"
            className="text-black font-semibold transition-colors duration-150"
          >
            Cars
          </a>
          <a
            href="#app"
            className="hover:text-black transition-colors duration-150"
          >
            Futures
          </a>
          <a
            href="#help"
            className="hover:text-black transition-colors duration-150"
          >
            Help
          </a>
        </nav>

        {/* Right CTA Button: Download App */}
        <div className="hidden sm:flex items-center">
          <a
            href="#app"
            className="group flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-black text-white text-[13.5px] font-semibold hover:bg-zinc-800 transition-all duration-200 shadow-sm hover:shadow active:scale-95"
          >
            <svg
              viewBox="0 0 170 170"
              className="w-3.5 h-3.5 fill-current transition-transform group-hover:scale-110"
            >
              <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.67-7.81-11.94-14.3-6.74-10.32-12.01-22.18-15.82-35.58-3.81-13.4-5.72-25.96-5.72-37.68 0-14.02 3.87-25.86 11.6-35.52 7.74-9.66 17.43-14.61 29.08-14.85 4.57 0 9.78 1.25 15.63 3.75 5.85 2.5 9.77 3.75 11.75 3.75 1.52 0 5.66-1.33 12.42-3.99 6.76-2.66 12.29-3.79 16.59-3.39 12.39.99 22.09 5.56 29.1 13.72-10.88 6.53-16.2 15.53-15.96 27 0 9.78 3.81 17.88 11.43 24.3 7.62 6.42 16.71 10.05 27.27 10.89-2.29 6.96-5.11 14.15-8.47 21.57zM119.22 31.84c0-7.39 2.72-14.35 8.16-20.88 5.44-6.53 12.18-10.51 20.22-11.96.22 1.19.33 2.28.33 3.27 0 7.39-2.83 14.46-8.49 21.2-5.66 6.74-12.63 10.66-20.9 11.77-.22-1.08-.32-2.21-.32-3.4z" />
            </svg>
            <span>Download App</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-zinc-800 hover:text-black focus:outline-none"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed top-[68px] left-0 w-full bg-white/95 backdrop-blur-xl border-b border-zinc-200 z-50 px-6 py-6  flex flex-col gap-4 text-center"
          >
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-lg font-medium text-zinc-800 hover:text-black"
            >
              About Us
            </a>
            <a
              href="#cars"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-lg font-semibold text-black"
            >
              Cars
            </a>
            <a
              href="#app"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-lg font-medium text-zinc-800 hover:text-black"
            >
              Futures
            </a>
            <a
              href="#help"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-lg font-medium text-zinc-800 hover:text-black"
            >
              Help
            </a>
            <div className="pt-2">
              <a
                href="#app"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center justify-center gap-2.5 w-full py-3 rounded-full bg-black text-white text-base font-semibold"
              >
                <span>Download App</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          PAGE 1: HERO SECTION
         ========================================================================= */}
      <main className="relative min-h-screen lg:h-screen lg:max-h-screen w-full flex flex-col justify-between overflow-x-hidden lg:overflow-hidden pt-20 sm:pt-24 lg:pt-16">
        {/* HERO MAIN CONTENT AREA */}
        <section className="relative w-full max-w-[1580px] mx-auto px-6 sm:px-12 lg:px-16 flex-1 flex flex-col justify-center my-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center min-h-[420px] lg:min-h-[460px]">
            {/* LEFT COLUMN: HERO HEADLINE & SUBTITLE */}
            <div className="lg:col-span-5 z-20 flex flex-col justify-center pb-6 lg:pb-0">
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <h1 className="text-[46px] sm:text-[58px] md:text-[68px] lg:text-[64px] xl:text-[78px] font-extrabold tracking-[-0.035em] leading-[1.03] text-black">
                  Premium <br />
                  Car Rental <br />
                  in New York
                </h1>

                <p className="mt-6 sm:mt-7 text-zinc-600 text-[15px] sm:text-[16px] lg:text-[15.5px] xl:text-[17px] leading-[1.55] max-w-[390px] font-normal">
                  Don&apos;t deny yourself the pleasure of driving the best premium
                  cars from around the world here and now
                </p>
              </motion.div>
            </div>

            {/* RIGHT COLUMN: CAR & ABSTRACT MAP ROUTE NETWORK */}
            <div className="lg:col-span-7 relative w-full h-[320px] sm:h-[420px] lg:h-[480px] xl:h-[520px] flex items-end justify-end">
              {/* Map Background Image */}
              <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden flex items-center justify-center">
                <div className="relative w-full h-full max-w-[850px] max-h-[550px] opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_85%)]">
                  <Image
                    src="/map.png"
                    alt="Map Navigation"
                    fill
                    sizes="(max-width: 1200px) 700px, 900px"
                    className="object-contain object-center scale-105"
                  />
                </div>
              </div>

              {/* Hero Car Container positioned right to screen edge */}
              <div className="relative z-10 w-full max-w-[760px] lg:max-w-[880px] xl:max-w-[1000px] -mr-4 sm:-mr-8 lg:-mr-12 xl:-mr-16">
                <motion.div
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="relative flex flex-col items-end"
                >
                  <div className="relative w-full aspect-[16/9.2] sm:aspect-[16/8.8]">
                    <Image
                      src="/car.png"
                      alt="Porsche 718 Boxster Luxury Sports Car Rental"
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 1000px"
                      className="object-contain object-right-bottom scale-[1.05] sm:scale-100"
                    />
                  </div>
                  <div className="w-[85%] h-5 sm:h-7 -mt-3 sm:-mt-5 mr-[5%] car-shadow pointer-events-none" />
                  <div className="w-[75%] h-3 sm:h-4 -mt-3 mr-[10%] car-contact-shadow pointer-events-none" />
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* BOTTOM LUXURY BRAND CAROUSEL / SELECTOR */}
        <footer className="relative z-30 w-full px-4 sm:px-12 lg:px-16 pb-6 lg:pb-8 pt-2">
          <div className="max-w-[1240px] mx-auto flex items-center justify-between gap-3 sm:gap-6 md:gap-8">
            <div className="flex-1 flex items-center justify-between sm:justify-center gap-3 sm:gap-8 md:gap-12 lg:gap-16 overflow-x-auto no-scrollbar py-2 px-1">
              {brands.map((brand) => {
                const isActive = activeBrand === brand.id;

                return (
                  <button
                    key={brand.id}
                    onClick={() => setActiveBrand(brand.id)}
                    className={`group relative flex items-center justify-center p-2.5 sm:p-3 transition-all duration-300 focus:outline-none ${isActive
                      ? "text-zinc-950"
                      : "text-zinc-400 hover:text-zinc-600 hover:scale-105"
                      }`}
                    title={`${brand.name} - ${brand.model}`}
                    aria-label={`Select ${brand.name}`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeBrandPill"
                        className="absolute -inset-x-2 -inset-y-1.5 sm:-inset-x-3 sm:-inset-y-2 bg-white rounded-2xl border border-zinc-200/90 shadow-[0_6px_25px_rgba(0,0,0,0.06)] z-0"
                        transition={{ type: "spring", stiffness: 450, damping: 32 }}
                      />
                    )}
                    <div className="relative z-10 flex items-center justify-center">
                      {brand.badge}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex-shrink-0 pl-1 sm:pl-2">
              <button
                onClick={handleNextBrand}
                className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-500 hover:text-black shadow-xs hover:shadow-sm transition-all duration-150 active:scale-95 focus:outline-none"
                aria-label="Next car brand"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </footer>
      </main>

      {/* =========================================================================
          PAGE 2: MODERN APP SHOWCASE SECTION
         ========================================================================= */}
      <section
        id="app"
        className="relative min-h-screen lg:h-screen w-full flex items-center justify-center px-6 sm:px-12 lg:px-16 py-16 lg:py-0 overflow-hidden bg-[#fdfdfd]"
      >
        <div className="relative w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-8">
          {/* LEFT COLUMN: DUAL 3D PHONES SHOWCASE */}
          <div className="lg:col-span-6 xl:col-span-7 relative w-full flex items-center justify-center lg:justify-start min-h-[460px] sm:min-h-[580px] lg:min-h-[640px]">
            {/* Ambient Background Glow */}
            <div className="absolute w-[360px] sm:w-[500px] h-[360px] sm:h-[500px] bg-gradient-to-tr from-zinc-200/40 via-zinc-100/30 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

            <div className="relative w-full max-w-[500px] sm:max-w-[580px] lg:max-w-[620px] h-[480px] sm:h-[580px] lg:h-[620px] flex items-center justify-center">
              {/* BACK PHONE: phone2.png (Tilted Left) */}
              <motion.div
                initial={{ opacity: 0, x: -40, rotate: -4 }}
                whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                className="absolute left-[2%] sm:left-[5%] lg:left-[2%] top-[10%] sm:top-[8%] w-[210px] sm:w-[270px] lg:w-[300px] z-10"
              >
                <div className="relative w-full aspect-[1/2.05] drop-shadow-[-20px_25px_35px_rgba(0,0,0,0.18)]">
                  <Image
                    src="/phone2.png"
                    alt="Unique App Route Navigation & Car Booking Screen"
                    fill
                    sizes="(max-width: 768px) 250px, 320px"
                    className="object-contain"
                  />
                </div>
              </motion.div>

              {/* FRONT PHONE: phone1.png (Upright & Overlapping) */}
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="absolute right-[2%] sm:right-[8%] lg:right-[29%] top-[0%] sm:top-[2%] w-[220px] sm:w-[280px] lg:w-[315px] z-25"
              >
                <div className="relative w-full aspect-[1/1.5] drop-shadow-[25px_30px_45px_rgba(0,0,0,0.22)]">
                  <Image
                    src="/phone1.png"
                    alt="Unique App Fleet Selection & Profile Screen"
                    fill
                    sizes="(max-width: 768px) 270px, 340px"
                    className="object-contain"
                  />
                </div>
              </motion.div>
            </div>
          </div>

          {/* RIGHT COLUMN: MODERN APP CONTENT & CTA */}
          <div className="lg:col-span-6 xl:col-span-5 z-20 flex flex-col justify-center text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Eyebrow Label */}
              <span className="text-[11.5px] sm:text-[12.5px] font-bold tracking-[0.22em] text-zinc-400 uppercase font-sans">
                Convenient Interaction
              </span>

              {/* Headline */}
              <h2 className="text-[42px] sm:text-[54px] lg:text-[60px] xl:text-[68px] font-black tracking-[-0.035em] text-zinc-950 mt-2 sm:mt-3 leading-[1.08]">
                Modern App
              </h2>

              {/* Body Description */}
              <p className="mt-5 sm:mt-6 text-[15px] sm:text-[16.5px] lg:text-[17px] leading-[1.65] text-zinc-600 font-normal max-w-[460px]">
                We developed a simple and functional app. It is built in such a way as to simplify the problem of the car selection and rental process. View the location, statement, and other information about each of the vehicles in one click.
              </p>

              {/* Download App Button */}
              <div className="mt-8 sm:mt-10 flex items-center">
                <a
                  href="#download-app"
                  className="group inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-black text-white text-[14px] font-semibold hover:bg-zinc-800 transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
                >
                  {/* Apple Logo */}
                  <svg
                    viewBox="0 0 170 170"
                    className="w-4 h-4 fill-current transition-transform group-hover:scale-110"
                  >
                    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.67-7.81-11.94-14.3-6.74-10.32-12.01-22.18-15.82-35.58-3.81-13.4-5.72-25.96-5.72-37.68 0-14.02 3.87-25.86 11.6-35.52 7.74-9.66 17.43-14.61 29.08-14.85 4.57 0 9.78 1.25 15.63 3.75 5.85 2.5 9.77 3.75 11.75 3.75 1.52 0 5.66-1.33 12.42-3.99 6.76-2.66 12.29-3.79 16.59-3.39 12.39.99 22.09 5.56 29.1 13.72-10.88 6.53-16.2 15.53-15.96 27 0 9.78 3.81 17.88 11.43 24.3 7.62 6.42 16.71 10.05 27.27 10.89-2.29 6.96-5.11 14.15-8.47 21.57zM119.22 31.84c0-7.39 2.72-14.35 8.16-20.88 5.44-6.53 12.18-10.51 20.22-11.96.22 1.19.33 2.28.33 3.27 0 7.39-2.83 14.46-8.49 21.2-5.66 6.74-12.63 10.66-20.9 11.77-.22-1.08-.32-2.21-.32-3.4z" />
                  </svg>
                  <span>Download App</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          PAGE 3: OUR VEHICLE FLEET SECTION
         ========================================================================= */}
      <section
        id="cars"
        className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 sm:px-12 lg:px-16 py-20 lg:py-28 bg-[#fdfdfd]"
      >
        <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center">
          {/* SECTION HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center max-w-2xl"
          >
            {/* Eyebrow */}
            <span className="text-[11px] sm:text-[12px] font-bold tracking-[0.24em] text-zinc-400 uppercase font-sans mb-3">
              Only the Best Cars
            </span>

            {/* Title */}
            <h2 className="text-[40px] sm:text-[54px] lg:text-[62px] font-black tracking-[-0.035em] text-zinc-950 leading-[1.08]">
              Our Vehicle Fleet
            </h2>

            {/* Subtitle Description (2 lines matching reference) */}
            <p className="mt-4 sm:mt-5 text-[15px] sm:text-[16.5px] lg:text-[17px] leading-[1.65] text-zinc-600 font-normal">
              We provide our customers with the most incredible driving emotions.
              <br className="hidden sm:inline" />
              That&apos;s why we have only world-class cars in our fleet.
            </p>
          </motion.div>

          {/* CATEGORY FILTER TABS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mt-8 sm:mt-10"
          >
            {[
              { id: "premium", label: "Premium" },
              { id: "coupe", label: "Coupe" },
              { id: "hypercars", label: "Hypercars" },
              { id: "sportcar", label: "Sportcar" },
              { id: "cabriolet", label: "Cabriolet" },
              { id: "limousines", label: "Limousines" },
            ].map((tab) => {
              const isSelected = activeBrand === tab.id || tab.id === "hypercars";

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveBrand(tab.id)}
                  className={`px-5 sm:px-6 py-2 rounded-xl sm:rounded-2xl text-[13px] sm:text-[14px] font-semibold transition-all duration-200 focus:outline-none ${isSelected
                    ? "bg-black text-white shadow-sm"
                    : "bg-[#f4f4f6] text-zinc-700 hover:bg-zinc-200/80 hover:text-black"
                    }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </motion.div>

          {/* FLEET IMAGE BOXES GRID */}
          <div className="w-full flex flex-col gap-5 sm:gap-6 mt-10 sm:mt-12">
            {/* TOP ROW: 3 Large Image Boxes */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 w-full"
            >
              {/* Box 1 (Top Left) */}
              <div className="group relative w-full aspect-[16/10.5] rounded-3xl bg-[#f4f4f6] border border-zinc-200/80 overflow-hidden transition-all duration-300 hover:border-zinc-300 hover:shadow-sm flex flex-col items-center justify-center p-6 text-center">
                {/* Place your image here */}
                <div className="w-12 h-12 rounded-2xl bg-white/90 border border-zinc-200 flex items-center justify-center text-zinc-400 group-hover:text-zinc-700 group-hover:scale-105 transition-all shadow-xs">
                  <span className="text-xl font-light">+</span>
                </div>
                <span className="text-[13px] font-medium text-zinc-400 mt-2.5 group-hover:text-zinc-600 transition-colors">
                  Add Image
                </span>
              </div>

              {/* Box 2 (Top Center) */}
              <div className="group relative w-full aspect-[16/10.5] rounded-3xl bg-[#f4f4f6] border border-zinc-200/80 overflow-hidden transition-all duration-300 hover:border-zinc-300 hover:shadow-sm flex flex-col items-center justify-center p-6 text-center">
                {/* Place your image here */}
                <div className="w-12 h-12 rounded-2xl bg-white/90 border border-zinc-200 flex items-center justify-center text-zinc-400 group-hover:text-zinc-700 group-hover:scale-105 transition-all shadow-xs">
                  <span className="text-xl font-light">+</span>
                </div>
                <span className="text-[13px] font-medium text-zinc-400 mt-2.5 group-hover:text-zinc-600 transition-colors">
                  Add Image
                </span>
              </div>

              {/* Box 3 (Top Right) */}
              <div className="group relative w-full aspect-[16/10.5] rounded-3xl bg-[#f4f4f6] border border-zinc-200/80 overflow-hidden transition-all duration-300 hover:border-zinc-300 hover:shadow-sm flex flex-col items-center justify-center p-6 text-center">
                {/* Place your image here */}
                <div className="w-12 h-12 rounded-2xl bg-white/90 border border-zinc-200 flex items-center justify-center text-zinc-400 group-hover:text-zinc-700 group-hover:scale-105 transition-all shadow-xs">
                  <span className="text-xl font-light">+</span>
                </div>
                <span className="text-[13px] font-medium text-zinc-400 mt-2.5 group-hover:text-zinc-600 transition-colors">
                  Add Image
                </span>
              </div>
            </motion.div>

            {/* BOTTOM ROW: 4 Smaller Image Boxes */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.85, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full"
            >
              {/* Box 4 (Bottom 1) */}
              <div className="group relative w-full aspect-[16/10.5] rounded-2xl bg-[#f4f4f6] border border-zinc-200/80 overflow-hidden transition-all duration-300 hover:border-zinc-300 hover:shadow-sm flex flex-col items-center justify-center p-4 text-center">
                {/* Place your image here */}
                <div className="w-10 h-10 rounded-xl bg-white/90 border border-zinc-200 flex items-center justify-center text-zinc-400 group-hover:text-zinc-700 group-hover:scale-105 transition-all shadow-xs">
                  <span className="text-lg font-light">+</span>
                </div>
                <span className="text-[12px] font-medium text-zinc-400 mt-2 group-hover:text-zinc-600 transition-colors">
                  Add Image
                </span>
              </div>

              {/* Box 5 (Bottom 2) */}
              <div className="group relative w-full aspect-[16/10.5] rounded-2xl bg-[#f4f4f6] border border-zinc-200/80 overflow-hidden transition-all duration-300 hover:border-zinc-300 hover:shadow-sm flex flex-col items-center justify-center p-4 text-center">
                {/* Place your image here */}
                <div className="w-10 h-10 rounded-xl bg-white/90 border border-zinc-200 flex items-center justify-center text-zinc-400 group-hover:text-zinc-700 group-hover:scale-105 transition-all shadow-xs">
                  <span className="text-lg font-light">+</span>
                </div>
                <span className="text-[12px] font-medium text-zinc-400 mt-2 group-hover:text-zinc-600 transition-colors">
                  Add Image
                </span>
              </div>

              {/* Box 6 (Bottom 3) */}
              <div className="group relative w-full aspect-[16/10.5] rounded-2xl bg-[#f4f4f6] border border-zinc-200/80 overflow-hidden transition-all duration-300 hover:border-zinc-300 hover:shadow-sm flex flex-col items-center justify-center p-4 text-center">
                {/* Place your image here */}
                <div className="w-10 h-10 rounded-xl bg-white/90 border border-zinc-200 flex items-center justify-center text-zinc-400 group-hover:text-zinc-700 group-hover:scale-105 transition-all shadow-xs">
                  <span className="text-lg font-light">+</span>
                </div>
                <span className="text-[12px] font-medium text-zinc-400 mt-2 group-hover:text-zinc-600 transition-colors">
                  Add Image
                </span>
              </div>

              {/* Box 7 (Bottom 4) */}
              <div className="group relative w-full aspect-[16/10.5] rounded-2xl bg-[#f4f4f6] border border-zinc-200/80 overflow-hidden transition-all duration-300 hover:border-zinc-300 hover:shadow-sm flex flex-col items-center justify-center p-4 text-center">
                {/* Place your image here */}
                <div className="w-10 h-10 rounded-xl bg-white/90 border border-zinc-200 flex items-center justify-center text-zinc-400 group-hover:text-zinc-700 group-hover:scale-105 transition-all shadow-xs">
                  <span className="text-lg font-light">+</span>
                </div>
                <span className="text-[12px] font-medium text-zinc-400 mt-2 group-hover:text-zinc-600 transition-colors">
                  Add Image
                </span>
              </div>
            </motion.div>
          </div>

          {/* BOTTOM CTA: SHOW ALL MODELS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 sm:mt-16 flex items-center justify-center"
          >
            <a
              href="#all-models"
              className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-white border border-zinc-200/90 text-zinc-900 text-[14px] font-semibold hover:border-zinc-300 hover:bg-zinc-50 transition-all duration-200 shadow-xs hover:shadow active:scale-95"
            >
              <span>Show All (83 models)</span>
              <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-black group-hover:translate-x-0.5 transition-all" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* =========================================================================
          PAGE 4: KEY FEATURES SECTION
         ========================================================================= */}
      <section
        id="features"
        className="relative min-h-screen w-full flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-20 lg:py-28 bg-[#fdfdfd]"
      >
        <div className="w-full max-w-[1400px] mx-auto flex flex-col items-start">
          {/* SECTION HEADER (LEFT-ALIGNED MATCHING REFERENCE) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start text-left max-w-2xl"
          >
            {/* Eyebrow */}
            <span className="text-[11px] sm:text-[12px] font-bold tracking-[0.24em] text-zinc-400 uppercase font-sans mb-3">
              Taking Care of Every Client
            </span>

            {/* Title */}
            <h2 className="text-[40px] sm:text-[54px] lg:text-[62px] font-black tracking-[-0.035em] text-zinc-950 leading-[1.08]">
              Key Features
            </h2>

            {/* Subtitle Description (Left aligned 2 lines) */}
            <p className="mt-4 sm:mt-5 text-[15px] sm:text-[16.5px] lg:text-[17px] leading-[1.65] text-zinc-600 font-normal">
              We are all about our client&apos;s comfort and safety. That&apos;s
              <br className="hidden sm:inline" />
              why we provide the best service you can imagine.
            </p>
          </motion.div>

          {/* 4 LUXURY FEATURE CARDS (SQUARE & COMPACT) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 w-full max-w-[1080px] mt-10 sm:mt-14">
            {/* CARD 1: 24-hour car delivery */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative bg-white rounded-3xl border border-zinc-200/80 p-5 sm:p-6 flex flex-col justify-between aspect-square shadow-[0_4px_25px_rgba(0,0,0,0.02)] hover:shadow-[0_16px_35px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300"
            >
              {/* Icon Circle (Mint / Green Accent) */}
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#eef8f4] flex items-center justify-center text-emerald-700 transition-transform group-hover:scale-105">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5 sm:w-5.5 sm:h-5.5"
                >
                  <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.3" />
                  <text
                    x="12"
                    y="13"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="7"
                    fontWeight="bold"
                    fill="currentColor"
                    stroke="none"
                  >
                    24h
                  </text>
                </svg>
              </div>

              {/* Card Title */}
              <h3 className="text-[14.5px] sm:text-[15.5px] font-bold text-zinc-950 leading-snug tracking-tight">
                24-hour car <br />
                delivery
              </h3>
            </motion.div>

            {/* CARD 2: 24/7 technical support */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="group relative bg-white rounded-3xl border border-zinc-200/80 p-5 sm:p-6 flex flex-col justify-between aspect-square shadow-[0_4px_25px_rgba(0,0,0,0.02)] hover:shadow-[0_16px_35px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300"
            >
              {/* Icon Circle (Rose / Pink Accent) */}
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#fbf0f2] flex items-center justify-center text-rose-600 transition-transform group-hover:scale-105">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5 sm:w-5.5 sm:h-5.5"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="10" r="1" fill="currentColor" stroke="none" />
                  <circle cx="8" cy="10" r="1" fill="currentColor" stroke="none" />
                  <circle cx="16" cy="10" r="1" fill="currentColor" stroke="none" />
                </svg>
              </div>

              {/* Card Title */}
              <h3 className="text-[14.5px] sm:text-[15.5px] font-bold text-zinc-950 leading-snug tracking-tight">
                24/7 technical <br />
                support
              </h3>
            </motion.div>

            {/* CARD 3: All models have a premium package */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="group relative bg-white rounded-3xl border border-zinc-200/80 p-5 sm:p-6 flex flex-col justify-between aspect-square shadow-[0_4px_25px_rgba(0,0,0,0.02)] hover:shadow-[0_16px_35px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300"
            >
              {/* Icon Circle (Indigo / Lavender Accent) */}
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#eef2fc] flex items-center justify-center text-indigo-600 transition-transform group-hover:scale-105">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5 sm:w-5.5 sm:h-5.5"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>

              {/* Card Title */}
              <h3 className="text-[14.5px] sm:text-[15.5px] font-bold text-zinc-950 leading-snug tracking-tight">
                All models have a <br />
                premium package
              </h3>
            </motion.div>

            {/* CARD 4: Absolute confidentiality */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="group relative bg-white rounded-3xl border border-zinc-200/80 p-5 sm:p-6 flex flex-col justify-between aspect-square shadow-[0_4px_25px_rgba(0,0,0,0.02)] hover:shadow-[0_16px_35px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300"
            >
              {/* Icon Circle (Amber / Cream Accent) */}
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#faf4ed] flex items-center justify-center text-amber-700 transition-transform group-hover:scale-105">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5 sm:w-5.5 sm:h-5.5"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </div>

              {/* Card Title */}
              <h3 className="text-[14.5px] sm:text-[15.5px] font-bold text-zinc-950 leading-snug tracking-tight">
                Absolute <br />
                confidentiality
              </h3>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          PAGE 5: DRIVE WITH UNIQUE TODAY & SITE FOOTER
         ========================================================================= */}
      <section
        id="cta"
        className="relative w-full flex flex-col items-center justify-between px-6 sm:px-12 lg:px-16 pt-12 pb-14 bg-[#fdfdfd]"
      >
        <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center">
          {/* LUXURY BLUE GRADIENT CTA BANNER CARD */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full rounded-[36px] sm:rounded-[44px] bg-gradient-to-br from-[#0c2340] via-[#091b33] to-[#040e1d] p-10 sm:p-16 lg:p-20 text-center overflow-hidden shadow-[0_25px_60px_rgba(4,14,29,0.25)] border border-blue-900/30"
          >
            {/* Subtle Blue Glow Effects & Orbital Vector Rings */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

            {/* Orbital Rings SVG Background */}
            <div className="absolute inset-0 pointer-events-none opacity-40 select-none">
              <svg
                viewBox="0 0 1000 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full object-cover"
              >
                <circle
                  cx="850"
                  cy="200"
                  r="240"
                  stroke="rgba(255, 255, 255, 0.12)"
                  strokeWidth="1.2"
                />
                <circle
                  cx="850"
                  cy="200"
                  r="340"
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeWidth="1"
                />
                <circle
                  cx="700"
                  cy="140"
                  r="5"
                  fill="rgba(255, 255, 255, 0.3)"
                />
                <circle
                  cx="940"
                  cy="290"
                  r="4"
                  fill="rgba(255, 255, 255, 0.25)"
                />
              </svg>
            </div>

            {/* Banner Content */}
            <div className="relative z-10 flex flex-col items-center max-w-2xl mx-auto">
              <h2 className="text-[34px] sm:text-[46px] lg:text-[52px] font-extrabold tracking-[-0.03em] text-white leading-[1.12]">
                Drive with Unique Today
              </h2>

              <p className="mt-4 sm:mt-5 text-[15px] sm:text-[16.5px] lg:text-[17px] text-blue-100/75 leading-relaxed max-w-lg">
                Get the app to explore the world of premium <br className="hidden sm:inline" />
                cars — that&apos;s exciting
              </p>

              {/* White Download App Button */}
              <div className="mt-8 sm:mt-10">
                <a
                  href="#download-app"
                  className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-white text-black text-[14px] font-semibold hover:bg-zinc-100 hover:shadow-lg transition-all duration-200 shadow-md active:scale-95"
                >
                  {/* Apple Icon */}
                  <svg
                    viewBox="0 0 170 170"
                    className="w-4 h-4 fill-current transition-transform group-hover:scale-110"
                  >
                    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.67-7.81-11.94-14.3-6.74-10.32-12.01-22.18-15.82-35.58-3.81-13.4-5.72-25.96-5.72-37.68 0-14.02 3.87-25.86 11.6-35.52 7.74-9.66 17.43-14.61 29.08-14.85 4.57 0 9.78 1.25 15.63 3.75 5.85 2.5 9.77 3.75 11.75 3.75 1.52 0 5.66-1.33 12.42-3.99 6.76-2.66 12.29-3.79 16.59-3.39 12.39.99 22.09 5.56 29.1 13.72-10.88 6.53-16.2 15.53-15.96 27 0 9.78 3.81 17.88 11.43 24.3 7.62 6.42 16.71 10.05 27.27 10.89-2.29 6.96-5.11 14.15-8.47 21.57zM119.22 31.84c0-7.39 2.72-14.35 8.16-20.88 5.44-6.53 12.18-10.51 20.22-11.96.22 1.19.33 2.28.33 3.27 0 7.39-2.83 14.46-8.49 21.2-5.66 6.74-12.63 10.66-20.9 11.77-.22-1.08-.32-2.21-.32-3.4z" />
                  </svg>
                  <span>Download App</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* SITE FOOTER */}
          <footer className="w-full pt-16 sm:pt-20 pb-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12 items-start justify-between">
              {/* Left Column: Legal Links */}
              <div className="flex items-center gap-6 text-[14px] text-zinc-500 font-medium md:mt-auto">
                <a href="#terms" className="hover:text-black transition-colors">
                  Terms
                </a>
                <a href="#privacy" className="hover:text-black transition-colors">
                  Privacy
                </a>
              </div>

              {/* Center Column: Navigation Links */}
              <div className="flex flex-col gap-3 text-[14.5px] font-medium text-zinc-800 md:items-center">
                <a href="#about" className="hover:text-black transition-colors">
                  About Us
                </a>
                <a href="#cars" className="hover:text-black transition-colors">
                  Cars
                </a>
                <a href="#app" className="hover:text-black transition-colors">
                  Futures
                </a>
                <a href="#help" className="hover:text-black transition-colors">
                  Help
                </a>
              </div>

              {/* Right Column: Subscribe to News & Brand Logo */}
              <div className="flex flex-col md:items-end gap-5">
                <div className="w-full max-w-[280px]">
                  <h4 className="text-[15px] font-bold text-zinc-950 mb-3 text-left md:text-left">
                    Subscribe to News
                  </h4>
                  {/* Email Input Field with Right Arrow */}
                  <form
                    onSubmit={(e) => e.preventDefault()}
                    className="relative flex items-center w-full"
                  >
                    <input
                      type="email"
                      placeholder="Your e-mail"
                      className="w-full px-4 py-3 rounded-2xl bg-[#f4f4f6] text-zinc-900 placeholder:text-zinc-400 text-[13.5px] focus:outline-none focus:ring-2 focus:ring-zinc-900/10 pr-10 transition-all"
                    />
                    <button
                      type="submit"
                      className="absolute right-2 p-1.5 text-zinc-500 hover:text-black transition-colors focus:outline-none"
                      aria-label="Subscribe"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                </div>

                {/* Unique Circular Logo Mark */}
                <div className="pt-2">
                  <div className="w-7 h-7 rounded-full bg-black flex items-center justify-center">
                    <div className="w-3.5 h-3.5 rounded-full border-[2.5px] border-white border-r-transparent rotate-[-45deg]" />
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </section>
    </div>
  );
}
