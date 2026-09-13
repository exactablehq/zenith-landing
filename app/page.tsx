"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Menu,
  X,
  Phone,
  Car,
  Key,
  ShieldCheck,
  MapPin,
  Clock,
  Sparkles,
  ChevronDown,
  Navigation,
  Compass,
  CheckCircle2,
  Users,
  Award,
  ExternalLink,
} from "lucide-react";
import {
  ZENITH_COMPANY_INFO,
  TRUST_METRICS,
  FLEET_VEHICLES,
  DAMAN_ROUTES,
  FAQ_ITEMS,
  FleetVehicle,
} from "./data/zenithData";

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [heroServiceTab, setHeroServiceTab] = useState<"cabs" | "self-drive">("cabs");
  const [activeFleetCategory, setActiveFleetCategory] = useState<string>("all");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [activeRouteId, setActiveRouteId] = useState<string>(DAMAN_ROUTES[0].id);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredFleet = FLEET_VEHICLES.filter((car) => {
    if (activeFleetCategory === "all") return true;
    if (activeFleetCategory === "cabs") return car.category === "cab" || car.category === "both";
    if (activeFleetCategory === "self-drive") return car.category === "self-drive" || car.category === "both";
    if (activeFleetCategory === "suv") return car.type.toLowerCase().includes("suv") || car.type.toLowerCase().includes("mpv") || car.type.toLowerCase().includes("cruiser");
    if (activeFleetCategory === "sedan") return car.type.toLowerCase().includes("sedan");
    return true;
  });

  const activeRoute = DAMAN_ROUTES.find((r) => r.id === activeRouteId) || DAMAN_ROUTES[0];

  return (
    <div className="w-full bg-[#fdfdfd] text-zinc-900 selection:bg-zinc-950 selection:text-white">
      {/* =========================================================================
          GLOBAL STICKY NAVIGATION BAR
         ========================================================================= */}
      <header
        className={`fixed top-0 left-0 w-full z-50 px-6 sm:px-10 lg:px-16 transition-all duration-300 flex items-center justify-between ${
          isScrolled
            ? "py-3 sm:py-3.5 bg-white/90 backdrop-blur-xl border-b border-zinc-200/80 shadow-[0_4px_25px_rgba(0,0,0,0.03)]"
            : "py-5 sm:py-6 bg-transparent"
        }`}
      >
        {/* Brand Logo: Zenith */}
        <a
          href="#"
          className="group flex items-center gap-3 focus:outline-none"
          aria-label="Zenith Homepage"
        >
          {/* Signboard Inspired Minimalist Emblem */}
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-zinc-950 text-white flex items-center justify-center transition-transform group-hover:scale-105 shadow-xs relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#1758A5] to-[#0C284A] opacity-90" />
            <span className="relative z-10 text-sm font-black tracking-wider text-white">Z</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-black tracking-tight text-zinc-950 font-sans leading-none">
              Zenith
            </span>
            <span className="text-[10px] font-semibold tracking-widest text-zinc-400 uppercase mt-0.5">
              Daman &bull; Since 2006
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 xl:gap-9 text-[14px] font-medium text-zinc-600">
          <a href="#services" className="hover:text-zinc-950 transition-colors">
            Services
          </a>
          <a href="#fleet" className="hover:text-zinc-950 transition-colors">
            Fleet
          </a>
          <a href="#routes" className="hover:text-zinc-950 transition-colors">
            Routes & Fares
          </a>
          <a href="#why-zenith" className="hover:text-zinc-950 transition-colors">
            Why Zenith
          </a>
          <a href="#driver-partner" className="hover:text-zinc-950 transition-colors">
            Driver Partner
          </a>
          <a href="#faq" className="hover:text-zinc-950 transition-colors">
            FAQ
          </a>
        </nav>

        {/* Right Actions: Helpline & Download App */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            href={`tel:${ZENITH_COMPANY_INFO.phoneRaw}`}
            className="flex items-center gap-2 text-[13.5px] font-semibold text-zinc-700 hover:text-zinc-950 px-3 py-2 rounded-full hover:bg-zinc-100 transition-all"
            title="Call 24/7 Helpline"
          >
            <Phone className="w-3.5 h-3.5 text-[#1758A5]" />
            <span>{ZENITH_COMPANY_INFO.phone}</span>
          </a>

          <a
            href="#app"
            className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-950 text-white text-[13.5px] font-semibold hover:bg-zinc-800 transition-all duration-200 shadow-xs hover:shadow active:scale-95"
          >
            {/* Minimalist Apple/Android icon */}
            <span className="w-1.5 h-1.5 rounded-full bg-[#1758A5] group-hover:scale-125 transition-transform" />
            <span>Download App</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-zinc-800 hover:text-zinc-950 focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden fixed top-[68px] left-0 w-full bg-white/95 backdrop-blur-2xl border-b border-zinc-200/90 z-50 px-6 py-6 flex flex-col gap-4 text-center shadow-xl"
          >
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-base font-medium text-zinc-800 hover:text-zinc-950"
            >
              Services (Cabs & Self-Drive)
            </a>
            <a
              href="#fleet"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-base font-medium text-zinc-800 hover:text-zinc-950"
            >
              Vehicle Fleet
            </a>
            <a
              href="#routes"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-base font-medium text-zinc-800 hover:text-zinc-950"
            >
              Popular Routes & Rates
            </a>
            <a
              href="#why-zenith"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-base font-medium text-zinc-800 hover:text-zinc-950"
            >
              Why Zenith
            </a>
            <a
              href="#driver-partner"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-base font-medium text-zinc-800 hover:text-zinc-950"
            >
              Driver Partner Program
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-base font-medium text-zinc-800 hover:text-zinc-950"
            >
              Frequently Asked Questions
            </a>
            <div className="pt-2 flex flex-col gap-2">
              <a
                href={`tel:${ZENITH_COMPANY_INFO.phoneRaw}`}
                className="flex items-center justify-center gap-2 py-3 rounded-full border border-zinc-200 text-zinc-800 text-sm font-semibold"
              >
                <Phone className="w-4 h-4 text-[#1758A5]" />
                <span>Call {ZENITH_COMPANY_INFO.phone}</span>
              </a>
              <a
                href="#app"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-full bg-zinc-950 text-white text-base font-semibold"
              >
                <span>Download Zenith App</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          HERO SECTION: CLEAN, MINIMAL, MODERN WITH DUAL SERVICE CONTROLLER
         ========================================================================= */}
      <main className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden pt-24 sm:pt-28 lg:pt-24 pb-8">
        <section className="relative w-full max-w-[1580px] mx-auto px-6 sm:px-10 lg:px-16 flex-1 flex flex-col justify-center my-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-6 min-h-[460px] lg:min-h-[520px]">
            {/* LEFT COLUMN: HERO HEADLINE & DUAL SERVICE SELECTOR */}
            <div className="lg:col-span-5 z-20 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Clean Eyebrow Pill */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100/90 border border-zinc-200/70 mb-5">
                  <span className="w-2 h-2 rounded-full bg-[#1758A5] animate-waypoint" />
                  <span className="text-[12px] font-semibold text-zinc-700 tracking-wide">
                    Daman &bull; Vapi &bull; Silvassa
                  </span>
                </div>

                {/* Hero Headline */}
                <h1 className="text-[44px] sm:text-[56px] md:text-[64px] lg:text-[60px] xl:text-[74px] font-extrabold tracking-[-0.035em] leading-[1.03] text-zinc-950">
                  Cab Hailing & <br />
                  Self-Drive <br />
                  in Daman
                </h1>

                {/* Hero Subtitle */}
                <p className="mt-5 sm:mt-6 text-zinc-600 text-[15.5px] sm:text-[16.5px] xl:text-[17.5px] leading-[1.58] max-w-[440px] font-normal">
                  Your ride in Daman, on your own terms. Instant on-demand cabs and self-drive car rentals in one unified app, backed by 19+ years of trusted fleet operations.
                </p>

                {/* DUAL SERVICE SELECTOR (Uncluttered, Minimal Segmented Pill) */}
                <div className="mt-8 sm:mt-9 max-w-[440px]">
                  <div className="p-1 rounded-2xl bg-zinc-100 border border-zinc-200/80 flex items-center relative">
                    <button
                      onClick={() => setHeroServiceTab("cabs")}
                      className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-[13.5px] font-semibold transition-colors duration-200 ${
                        heroServiceTab === "cabs" ? "text-zinc-950" : "text-zinc-500 hover:text-zinc-800"
                      }`}
                    >
                      {heroServiceTab === "cabs" && (
                        <motion.div
                          layoutId="heroTabBg"
                          className="absolute inset-0 bg-white rounded-xl shadow-xs border border-zinc-200/70 z-[-1]"
                          transition={{ type: "spring", stiffness: 450, damping: 35 }}
                        />
                      )}
                      <Car className="w-4 h-4 text-[#1758A5]" />
                      <span>Cab Hailing</span>
                    </button>

                    <button
                      onClick={() => setHeroServiceTab("self-drive")}
                      className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-[13.5px] font-semibold transition-colors duration-200 ${
                        heroServiceTab === "self-drive" ? "text-zinc-950" : "text-zinc-500 hover:text-zinc-800"
                      }`}
                    >
                      {heroServiceTab === "self-drive" && (
                        <motion.div
                          layoutId="heroTabBg"
                          className="absolute inset-0 bg-white rounded-xl shadow-xs border border-zinc-200/70 z-[-1]"
                          transition={{ type: "spring", stiffness: 450, damping: 35 }}
                        />
                      )}
                      <Key className="w-4 h-4 text-[#1758A5]" />
                      <span>Self-Drive Rental</span>
                    </button>
                  </div>

                  {/* Dynamic Micro-Action Strip under Selector */}
                  <AnimatePresence mode="wait">
                    {heroServiceTab === "cabs" ? (
                      <motion.div
                        key="cabs-preview"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2 }}
                        className="mt-3 flex items-center justify-between text-[13px] px-2"
                      >
                        <span className="text-zinc-500 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          Average 3-min pickup &bull; From ₹14/km
                        </span>
                        <a
                          href="#routes"
                          className="text-zinc-900 font-semibold hover:text-[#1758A5] transition-colors flex items-center gap-1"
                        >
                          View Fares <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="self-drive-preview"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2 }}
                        className="mt-3 flex items-center justify-between text-[13px] px-2"
                      >
                        <span className="text-zinc-500 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          Doorstep delivery &bull; From ₹1,199/day
                        </span>
                        <a
                          href="#fleet"
                          className="text-zinc-900 font-semibold hover:text-[#1758A5] transition-colors flex items-center gap-1"
                        >
                          Browse Cars <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>

            {/* RIGHT COLUMN: HERO CAR, MAP NETWORK & ACCREDITATION BADGES */}
            <div className="lg:col-span-7 relative w-full h-[340px] sm:h-[420px] lg:h-[500px] xl:h-[540px] flex items-end justify-end">
              {/* Map Route Network Background */}
              <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden flex items-center justify-center">
                <div className="relative w-full h-full max-w-[850px] max-h-[550px] opacity-25 [mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_85%)]">
                  <Image
                    src="/map.png"
                    alt="Zenith Fleet Daman Route Map"
                    fill
                    priority
                    sizes="(max-width: 1200px) 700px, 900px"
                    className="object-contain object-center scale-105"
                  />
                </div>
              </div>

              {/* Floating Credential Chip (Khelo India Official Partner) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="hidden sm:flex absolute top-6 left-6 lg:left-8 z-30 items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/95 backdrop-blur-md border border-zinc-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#1758A5] to-[#0C284A] flex items-center justify-center text-white">
                  <Award className="w-4 h-4" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[12px] font-bold text-zinc-900 leading-tight">
                    Khelo India Beach Games
                  </span>
                  <span className="text-[11px] text-zinc-500">Official Fleet Partner &bull; Diu</span>
                </div>
              </motion.div>

              {/* Hero Car Cutout with Natural Contact Shadows */}
              <div className="relative z-10 w-full max-w-[760px] lg:max-w-[880px] xl:max-w-[1000px] -mr-4 sm:-mr-8 lg:-mr-12 xl:-mr-16">
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                  className="relative flex flex-col items-end"
                >
                  <div className="relative w-full aspect-[16/9.2] sm:aspect-[16/8.8]">
                    <Image
                      src="/car.png"
                      alt="Zenith Premium Fleet in Daman"
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

        {/* BOTTOM INSTITUTIONAL AUTHORITY TICKER */}
        <section className="relative z-20 w-full px-6 sm:px-10 lg:px-16 pt-8 pb-4">
          <div className="max-w-[1400px] mx-auto border-t border-zinc-200/70 pt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              {TRUST_METRICS.map((metric, idx) => (
                <div key={idx} className="flex flex-col">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight">
                      {metric.value}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1758A5]" />
                  </div>
                  <span className="text-[13px] font-bold text-zinc-900 mt-0.5">
                    {metric.label}
                  </span>
                  <span className="text-[12px] text-zinc-500 leading-snug mt-0.5">
                    {metric.detail}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* =========================================================================
          SECTION 2: TWO WAYS TO MOVE ACROSS DAMAN (DUAL CAPABILITY SHOWCASE)
         ========================================================================= */}
      <section
        id="services"
        className="relative w-full py-20 lg:py-28 px-6 sm:px-10 lg:px-16 border-t border-zinc-200/60 bg-white"
      >
        <div className="max-w-[1400px] mx-auto flex flex-col items-center">
          {/* Header */}
          <div className="flex flex-col items-center text-center max-w-2xl mb-14">
            <span className="text-[11.5px] font-bold tracking-[0.24em] text-zinc-400 uppercase font-sans mb-2.5">
              One Unified Zenith App
            </span>
            <h2 className="text-[36px] sm:text-[48px] lg:text-[54px] font-black tracking-[-0.03em] text-zinc-950 leading-[1.08]">
              Two Ways to Move in Daman
            </h2>
            <p className="mt-4 text-[15.5px] sm:text-[17px] text-zinc-600 leading-relaxed">
              No need to switch between cab hailing apps and rental services. Zenith brings both on-demand chauffeurs and self-drive keys into a single, seamless platform.
            </p>
          </div>

          {/* Dual Feature Split Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 w-full">
            {/* Card 1: Zenith Cabs */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="group relative rounded-3xl bg-[#fbfbfb] border border-zinc-200/80 p-8 sm:p-10 flex flex-col justify-between hover:border-zinc-300 hover:shadow-lg transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-950 text-white flex items-center justify-center">
                    <Car className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-[12px] font-bold tracking-wider uppercase px-3 py-1 rounded-full bg-zinc-200/60 text-zinc-800">
                    On-Demand Rides
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight mb-3">
                  Zenith Cabs
                </h3>
                <p className="text-[15px] text-zinc-600 leading-relaxed mb-6">
                  Fast, comfortable point-to-point rides across Daman town, beach resorts, and direct transfers to Vapi Railway Station. Always driven by certified local chauffeurs.
                </p>

                <ul className="space-y-3 text-[14.5px] text-zinc-700 mb-8">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#1758A5] flex-shrink-0" />
                    <span><strong>3-Minute Pickup:</strong> Rapid dispatch across Daman & Vapi.</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#1758A5] flex-shrink-0" />
                    <span><strong>Surge-Free Guarantee:</strong> Upfront fixed rates without tourist inflation.</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#1758A5] flex-shrink-0" />
                    <span><strong>Station & Airport Transfers:</strong> Dedicated pickups from Vapi Junction.</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#1758A5] flex-shrink-0" />
                    <span><strong>Air-Conditioned Cleanliness:</strong> 100% sanitized sedans and hatchbacks.</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 border-t border-zinc-200/70 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-zinc-400 uppercase block">Starting Fare</span>
                  <span className="text-xl font-bold text-zinc-950">₹14 / km</span>
                </div>
                <a
                  href="#routes"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-950 text-white text-[13.5px] font-semibold hover:bg-zinc-800 transition-colors"
                >
                  <span>Check Routes</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>

            {/* Card 2: Zenith Self-Drive */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="group relative rounded-3xl bg-[#fbfbfb] border border-zinc-200/80 p-8 sm:p-10 flex flex-col justify-between hover:border-zinc-300 hover:shadow-lg transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1758A5] to-[#0C284A] text-white flex items-center justify-center">
                    <Key className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-[12px] font-bold tracking-wider uppercase px-3 py-1 rounded-full bg-[#1758A5]/10 text-[#1758A5]">
                    Self-Drive Rental
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight mb-3">
                  Zenith Self-Drive
                </h3>
                <p className="text-[15px] text-zinc-600 leading-relaxed mb-6">
                  Uncompromised driving freedom. Take a Mahindra Thar 4x4 or compact SUV along Daman's coastal roads, explore Portuguese forts, and cruise Jampore Beach at your own pace.
                </p>

                <ul className="space-y-3 text-[14.5px] text-zinc-700 mb-8">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#1758A5] flex-shrink-0" />
                    <span><strong>Doorstep Hotel Delivery:</strong> Delivered to your Daman resort or station.</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#1758A5] flex-shrink-0" />
                    <span><strong>Zero Paperwork Friction:</strong> Fast digital license verification in app.</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#1758A5] flex-shrink-0" />
                    <span><strong>Inter-State Permit Cleared:</strong> Drive across Daman, Gujarat & Maharashtra.</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#1758A5] flex-shrink-0" />
                    <span><strong>Flexible Durations:</strong> Hourly, daily, and weekend road trip packages.</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 border-t border-zinc-200/70 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-zinc-400 uppercase block">Daily Rental</span>
                  <span className="text-xl font-bold text-zinc-950">₹1,199 / day</span>
                </div>
                <a
                  href="#fleet"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-950 text-white text-[13.5px] font-semibold hover:bg-zinc-800 transition-colors"
                >
                  <span>Explore Fleet</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: CURATED VEHICLE FLEET SHOWCASE
         ========================================================================= */}
      <section
        id="fleet"
        className="relative w-full py-20 lg:py-28 px-6 sm:px-10 lg:px-16 bg-[#fdfdfd]"
      >
        <div className="max-w-[1400px] mx-auto flex flex-col items-center">
          {/* Header */}
          <div className="flex flex-col items-center text-center max-w-2xl">
            <span className="text-[11.5px] font-bold tracking-[0.24em] text-zinc-400 uppercase font-sans mb-2.5">
              Inspected & Verified
            </span>
            <h2 className="text-[36px] sm:text-[48px] lg:text-[54px] font-black tracking-[-0.03em] text-zinc-950 leading-[1.08]">
              Our Vehicle Fleet
            </h2>
            <p className="mt-4 text-[15.5px] sm:text-[17px] text-zinc-600 leading-relaxed">
              Every vehicle in the Zenith fleet is company-managed, GPS-tracked, and meticulously maintained for safety and reliability.
            </p>
          </div>

          {/* Filter Categories */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-10">
            {[
              { id: "all", label: "All Vehicles" },
              { id: "cabs", label: "Cab Hailing" },
              { id: "self-drive", label: "Self-Drive" },
              { id: "suv", label: "SUVs & 7-Seaters" },
              { id: "sedan", label: "Sedans" },
            ].map((tab) => {
              const isSelected = activeFleetCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFleetCategory(tab.id)}
                  className={`px-5 py-2 rounded-full text-[13.5px] font-semibold transition-all duration-200 focus:outline-none ${
                    isSelected
                      ? "bg-zinc-950 text-white shadow-xs"
                      : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200/80 hover:text-zinc-950"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Fleet Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full mt-12">
            {filteredFleet.map((vehicle) => (
              <motion.div
                key={vehicle.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                className="group relative rounded-3xl bg-white border border-zinc-200/80 p-6 flex flex-col justify-between hover:border-zinc-300 hover:shadow-md transition-all duration-200"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[12px] font-semibold text-zinc-500 uppercase tracking-wider">
                      {vehicle.type}
                    </span>
                    {vehicle.tag && (
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-800 border border-zinc-200">
                        {vehicle.tag}
                      </span>
                    )}
                  </div>

                  {/* Vehicle Name */}
                  <h3 className="text-xl font-bold text-zinc-950 tracking-tight mb-2">
                    {vehicle.name}
                  </h3>
                  <p className="text-[13.5px] text-zinc-500 mb-6 leading-normal">
                    {vehicle.popularFor}
                  </p>

                  {/* Spec Chips */}
                  <div className="grid grid-cols-2 gap-2 text-[12.5px] text-zinc-600 mb-6 bg-zinc-50 p-3 rounded-2xl border border-zinc-100">
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-zinc-400" />
                      <span>{vehicle.seats} Seats</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Navigation className="w-3.5 h-3.5 text-zinc-400" />
                      <span>{vehicle.transmission}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
                      <span>{vehicle.fuel}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>AC &bull; Insured</span>
                    </div>
                  </div>
                </div>

                {/* Rates & Action */}
                <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
                  <div>
                    {vehicle.category === "self-drive" ? (
                      <div>
                        <span className="text-[11px] font-medium text-zinc-400 uppercase block">Self-Drive</span>
                        <span className="text-lg font-bold text-zinc-950">{vehicle.selfDriveRate}</span>
                      </div>
                    ) : (
                      <div>
                        <span className="text-[11px] font-medium text-zinc-400 uppercase block">Cab Rate</span>
                        <span className="text-lg font-bold text-zinc-950">{vehicle.cabRate}</span>
                      </div>
                    )}
                  </div>

                  <a
                    href={`tel:${ZENITH_COMPANY_INFO.phoneRaw}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-zinc-100 text-zinc-900 text-[13px] font-semibold hover:bg-zinc-950 hover:text-white transition-colors"
                  >
                    <span>Reserve</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: POPULAR DAMAN ROUTES & TRANSPARENT FARES
         ========================================================================= */}
      <section
        id="routes"
        className="relative w-full py-20 lg:py-28 px-6 sm:px-10 lg:px-16 bg-white border-t border-zinc-200/60"
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Description */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <span className="text-[11.5px] font-bold tracking-[0.24em] text-zinc-400 uppercase font-sans mb-2.5">
                Upfront Pricing
              </span>
              <h2 className="text-[36px] sm:text-[46px] font-black tracking-[-0.03em] text-zinc-950 leading-[1.1]">
                Popular Daman Routes & Transparent Fares
              </h2>
              <p className="mt-4 text-[15.5px] text-zinc-600 leading-relaxed">
                Tired of unpredictable meter-less street auto haggling? With Zenith, see your exact route distance, estimated travel time, and transparent price before you book.
              </p>

              <div className="mt-8 space-y-3">
                {DAMAN_ROUTES.map((route) => {
                  const isSelected = route.id === activeRouteId;
                  return (
                    <button
                      key={route.id}
                      onClick={() => setActiveRouteId(route.id)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between ${
                        isSelected
                          ? "bg-zinc-950 text-white border-zinc-950 shadow-sm"
                          : "bg-zinc-50 hover:bg-zinc-100 text-zinc-800 border-zinc-200/80"
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="text-sm font-bold">{route.from} &rarr; {route.to}</span>
                        <span className={`text-[12px] mt-0.5 ${isSelected ? "text-zinc-400" : "text-zinc-500"}`}>
                          {route.distanceKm} km &bull; {route.approxTime}
                        </span>
                      </div>
                      <span className={`text-sm font-bold ${isSelected ? "text-white" : "text-zinc-900"}`}>
                        {route.cabEstimate}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Interactive Route Details Card */}
            <div className="lg:col-span-7">
              <motion.div
                key={activeRoute.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="rounded-3xl bg-[#fbfbfb] border border-zinc-200/80 p-8 sm:p-10 shadow-sm relative overflow-hidden"
              >
                {/* Subtle Brand Blue Accent Pill */}
                <div className="flex items-center justify-between mb-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1758A5]/10 text-[#1758A5] text-[12px] font-bold">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Verified Route Corridor</span>
                  </div>
                  <span className="text-[12px] text-zinc-500 font-medium">
                    100% Toll & Permit Clear
                  </span>
                </div>

                <div className="space-y-6">
                  <div>
                    <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">
                      Route Trajectory
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight">
                      {activeRoute.from} to {activeRoute.to}
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-4 border-y border-zinc-200/70">
                    <div>
                      <span className="text-[11px] text-zinc-400 uppercase block">Distance</span>
                      <span className="text-xl font-bold text-zinc-950">{activeRoute.distanceKm} km</span>
                    </div>
                    <div>
                      <span className="text-[11px] text-zinc-400 uppercase block">Typical Time</span>
                      <span className="text-xl font-bold text-zinc-950">{activeRoute.approxTime}</span>
                    </div>
                    <div>
                      <span className="text-[11px] text-zinc-400 uppercase block">Estimated Cab Fare</span>
                      <span className="text-xl font-bold text-[#1758A5]">{activeRoute.cabEstimate}</span>
                    </div>
                  </div>

                  <div className="space-y-3 text-[14px] text-zinc-600">
                    <p className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Key Advantage:</strong> {activeRoute.highlight}</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <Key className="w-4 h-4 text-[#1758A5] mt-0.5 flex-shrink-0" />
                      <span><strong>Self-Drive Option:</strong> {activeRoute.selfDriveNote}</span>
                    </p>
                  </div>

                  <div className="pt-4 flex items-center gap-4">
                    <a
                      href={`tel:${ZENITH_COMPANY_INFO.phoneRaw}`}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-950 text-white text-sm font-semibold hover:bg-zinc-800 transition-colors shadow-xs"
                    >
                      <Phone className="w-4 h-4 text-[#1758A5]" />
                      <span>Book on Call: {ZENITH_COMPANY_INFO.phone}</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: THE MODERN ZENITH APP (3D DUAL-PHONE SHOWCASE)
         ========================================================================= */}
      <section
        id="app"
        className="relative w-full py-20 lg:py-28 px-6 sm:px-10 lg:px-16 overflow-hidden bg-[#fdfdfd]"
      >
        <div className="relative w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-8">
          {/* LEFT: DUAL 3D PHONES SHOWCASE */}
          <div className="lg:col-span-6 xl:col-span-7 relative w-full flex items-center justify-center lg:justify-start min-h-[460px] sm:min-h-[580px] lg:min-h-[640px]">
            {/* Ambient Background Glow */}
            <div className="absolute w-[360px] sm:w-[500px] h-[360px] sm:h-[500px] bg-gradient-to-tr from-[#1758A5]/10 via-zinc-100 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

            <div className="relative w-full max-w-[500px] sm:max-w-[580px] lg:max-w-[620px] h-[480px] sm:h-[580px] lg:h-[620px] flex items-center justify-center">
              {/* BACK PHONE (Tilted Left) */}
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
                    alt="Zenith App Live GPS Route Tracking"
                    fill
                    sizes="(max-width: 768px) 250px, 320px"
                    className="object-contain"
                  />
                </div>
              </motion.div>

              {/* FRONT PHONE (Upright & Overlapping) */}
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="absolute right-[2%] sm:right-[8%] lg:right-[29%] top-[0%] sm:top-[2%] w-[220px] sm:w-[280px] lg:w-[315px] z-20"
              >
                <div className="relative w-full aspect-[1/1.5] drop-shadow-[25px_30px_45px_rgba(0,0,0,0.22)]">
                  <Image
                    src="/phone1.png"
                    alt="Zenith App Fleet Booking Screen"
                    fill
                    sizes="(max-width: 768px) 270px, 340px"
                    className="object-contain"
                  />
                </div>
              </motion.div>
            </div>
          </div>

          {/* RIGHT: APP FEATURES & DOWNLOAD CTA */}
          <div className="lg:col-span-6 xl:col-span-5 z-20 flex flex-col justify-center text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-[11.5px] font-bold tracking-[0.24em] text-zinc-400 uppercase font-sans">
                Next-Generation Mobility
              </span>

              <h2 className="text-[40px] sm:text-[52px] lg:text-[58px] font-black tracking-[-0.035em] text-zinc-950 mt-2 sm:mt-3 leading-[1.08]">
                Zenith App
              </h2>

              <p className="mt-5 text-[15.5px] sm:text-[16.5px] leading-[1.65] text-zinc-600 font-normal max-w-[460px]">
                Book a cab in seconds or unlock a self-drive vehicle with zero paperwork delays. View live vehicle telemetry, track your driver in real-time, and manage all your regional Daman trips seamlessly.
              </p>

              {/* Feature Points */}
              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-900 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-zinc-900">Instant 60-Second Dispatch</h4>
                    <p className="text-xs text-zinc-500">Live GPS tracking connects you to the nearest verified chauffeur.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-900 mt-0.5">
                    <Key className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-zinc-900">Digital Keyless Self-Drive Unlock</h4>
                    <p className="text-xs text-zinc-500">Complete vehicle inspection and unlock directly through your smartphone.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-900 mt-0.5">
                    <ShieldCheck className="w-4 h-4 text-[#1758A5]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-zinc-900">24/7 Regional Safety SOS</h4>
                    <p className="text-xs text-zinc-500">Dedicated round-the-clock emergency response connected to our Daman HQ.</p>
                  </div>
                </div>
              </div>

              {/* App Store Buttons (Clean empty redirects with 'Coming Soon' tooltip) */}
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <a
                  href="#"
                  className="group relative inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-zinc-950 text-white text-[13.5px] font-semibold hover:bg-zinc-800 transition-all shadow-xs active:scale-95"
                >
                  <svg viewBox="0 0 170 170" className="w-4 h-4 fill-current">
                    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.67-7.81-11.94-14.3-6.74-10.32-12.01-22.18-15.82-35.58-3.81-13.4-5.72-25.96-5.72-37.68 0-14.02 3.87-25.86 11.6-35.52 7.74-9.66 17.43-14.61 29.08-14.85 4.57 0 9.78 1.25 15.63 3.75 5.85 2.5 9.77 3.75 11.75 3.75 1.52 0 5.66-1.33 12.42-3.99 6.76-2.66 12.29-3.79 16.59-3.39 12.39.99 22.09 5.56 29.1 13.72-10.88 6.53-16.2 15.53-15.96 27 0 9.78 3.81 17.88 11.43 24.3 7.62 6.42 16.71 10.05 27.27 10.89-2.29 6.96-5.11 14.15-8.47 21.57zM119.22 31.84c0-7.39 2.72-14.35 8.16-20.88 5.44-6.53 12.18-10.51 20.22-11.96.22 1.19.33 2.28.33 3.27 0 7.39-2.83 14.46-8.49 21.2-5.66 6.74-12.63 10.66-20.9 11.77-.22-1.08-.32-2.21-.32-3.4z" />
                  </svg>
                  <span>App Store</span>
                  <span className="text-[10px] text-zinc-400 font-normal ml-1">(Coming Soon)</span>
                </a>

                <a
                  href="#"
                  className="group relative inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white border border-zinc-200 text-zinc-900 text-[13.5px] font-semibold hover:bg-zinc-50 transition-all shadow-xs active:scale-95"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-[#1758A5]">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a1.996 1.996 0 0 1-.61-.958V2.772c.112-.37.33-.702.61-.958zm11.597 11.6L17.8 14.77l-12.8 7.39 10.206-8.746zm0-2.828L5 1.84l12.8 7.39-2.594 1.356zm1.414 1.414l3.18-1.658c.8-.42.8-1.1 0-1.52l-3.18-1.66-1.414 1.414 1.414 1.424z" />
                  </svg>
                  <span>Google Play</span>
                  <span className="text-[10px] text-zinc-500 font-normal ml-1">(Coming Soon)</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: WHY ZENITH OVER STREET TAXIS IN DAMAN
         ========================================================================= */}
      <section
        id="why-zenith"
        className="relative w-full py-20 lg:py-28 px-6 sm:px-10 lg:px-16 bg-white border-t border-zinc-200/60"
      >
        <div className="max-w-[1400px] mx-auto">
          {/* Header */}
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
            <span className="text-[11.5px] font-bold tracking-[0.24em] text-zinc-400 uppercase font-sans mb-2.5">
              The Zenith Advantage
            </span>
            <h2 className="text-[36px] sm:text-[48px] font-black tracking-[-0.03em] text-zinc-950 leading-[1.1]">
              Why Zenith in Daman?
            </h2>
            <p className="mt-4 text-[15.5px] sm:text-[17px] text-zinc-600 leading-relaxed">
              Daman is one of India&apos;s finest coastal escapes, but getting around shouldn&apos;t be a negotiation. Here is why Zenith is transforming regional travel.
            </p>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-7 rounded-3xl bg-[#fbfbfb] border border-zinc-200/80 flex flex-col justify-between">
              <div className="w-11 h-11 rounded-2xl bg-zinc-100 flex items-center justify-center text-zinc-900 mb-6">
                <ShieldCheck className="w-5 h-5 text-[#1758A5]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-zinc-950 mb-2">Zero Tourist Surges</h3>
                <p className="text-[13.5px] text-zinc-600 leading-relaxed">
                  Transparent fares based on real distance, not whether you arrived from Mumbai on a holiday weekend.
                </p>
              </div>
            </div>

            <div className="p-7 rounded-3xl bg-[#fbfbfb] border border-zinc-200/80 flex flex-col justify-between">
              <div className="w-11 h-11 rounded-2xl bg-zinc-100 flex items-center justify-center text-zinc-900 mb-6">
                <Sparkles className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-zinc-950 mb-2">100% Chilled AC Fleet</h3>
                <p className="text-[13.5px] text-zinc-600 leading-relaxed">
                  Every car is fully air-conditioned and cleaned between trips. Beat the coastal heat in absolute comfort.
                </p>
              </div>
            </div>

            <div className="p-7 rounded-3xl bg-[#fbfbfb] border border-zinc-200/80 flex flex-col justify-between">
              <div className="w-11 h-11 rounded-2xl bg-zinc-100 flex items-center justify-center text-zinc-900 mb-6">
                <Award className="w-5 h-5 text-[#1758A5]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-zinc-950 mb-2">19+ Years Legacy</h3>
                <p className="text-[13.5px] text-zinc-600 leading-relaxed">
                  The official fleet partner for Khelo India Diu and G20 protocol transport. We operate at institutional standards.
                </p>
              </div>
            </div>

            <div className="p-7 rounded-3xl bg-[#fbfbfb] border border-zinc-200/80 flex flex-col justify-between">
              <div className="w-11 h-11 rounded-2xl bg-zinc-100 flex items-center justify-center text-zinc-900 mb-6">
                <Phone className="w-5 h-5 text-zinc-900" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-zinc-950 mb-2">24/7 Human Helpline</h3>
                <p className="text-[13.5px] text-zinc-600 leading-relaxed">
                  Need a late-night ride from Vapi or early morning airport drop? Our team is live on +91 99791 11678.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: DRIVER MICRO-ENTREPRENEURSHIP PROGRAM (ZENITH FLEET PARTNER)
         ========================================================================= */}
      <section
        id="driver-partner"
        className="relative w-full py-20 lg:py-28 px-6 sm:px-10 lg:px-16 bg-[#09090b] text-white overflow-hidden"
      >
        {/* Subtle Signboard Blue Gradient Glow */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-gradient-to-br from-[#1758A5]/30 to-[#0C284A]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <span className="text-[11.5px] font-bold tracking-[0.24em] text-[#1758A5] uppercase font-sans mb-3">
                Micro-Entrepreneurship Initiative
              </span>

              <h2 className="text-[36px] sm:text-[50px] font-black tracking-[-0.035em] text-white leading-[1.08]">
                Drive with Zenith. <br />
                Own Your Future.
              </h2>

              <p className="mt-5 text-[15.5px] sm:text-[17px] text-zinc-400 leading-relaxed max-w-xl">
                Zenith is opening a transformative micro-entrepreneurship opportunity for 100 qualified drivers across Daman, Vapi, Valsad, and Silvassa. Transform from a driver into a respected fleet business operator.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800">
                  <span className="text-xs text-zinc-500 uppercase block font-semibold">Monthly Potential</span>
                  <span className="text-2xl font-black text-white mt-1 block">₹50,000 – ₹1,00,000</span>
                  <span className="text-[12px] text-zinc-400 mt-1 block">No earning cap &bull; Performance driven</span>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800">
                  <span className="text-xs text-zinc-500 uppercase block font-semibold">Fleet Assets</span>
                  <span className="text-2xl font-black text-white mt-1 block">Brand New Vehicle</span>
                  <span className="text-12px text-zinc-400 mt-1 block">Sourced & fully compliant through Zenith</span>
                </div>
              </div>

              <div className="mt-10 flex items-center gap-4">
                <a
                  href={ZENITH_COMPANY_INFO.driverWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-zinc-950 text-sm font-semibold hover:bg-zinc-100 transition-all shadow-md active:scale-95"
                >
                  <span>Learn More via WhatsApp</span>
                  <ExternalLink className="w-4 h-4 text-zinc-600" />
                </a>
              </div>
            </div>

            {/* Right Card with Program Highlights */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl bg-zinc-900/90 border border-zinc-800 p-8 sm:p-10 shadow-2xl relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1758A5] to-[#0C284A] flex items-center justify-center text-white mb-6">
                  <Car className="w-5 h-5 text-white" />
                </div>

                <h3 className="text-xl font-bold text-white mb-4">
                  Fleet Partner Program Highlights
                </h3>

                <ul className="space-y-4 text-sm text-zinc-300">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span><strong>100 Qualified Drivers Only:</strong> Exclusive cohort for Daman, Vapi, Valsad, and Silvassa residents.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Zenith-Provided Vehicle:</strong> Brand-new commercial vehicle with complete FastTag & permits.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Direct Dispatch:</strong> Operate continuously with high-volume cab trips and intercity bookings.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Maintenance Backing:</strong> Servicing, insurance, and round-the-clock roadside assistance covered.</span>
                  </li>
                </ul>

                <div className="mt-8 pt-6 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-500">
                  <span>Official Head Office: Vapi-Daman Main Road</span>
                  <span>Direct Hotline: {ZENITH_COMPANY_INFO.phone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: DAMAN COASTAL EXPLORATION GUIDE
         ========================================================================= */}
      <section
        id="explore-daman"
        className="relative w-full py-20 lg:py-28 px-6 sm:px-10 lg:px-16 bg-[#fdfdfd]"
      >
        <div className="max-w-[1400px] mx-auto">
          {/* Header */}
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
            <span className="text-[11.5px] font-bold tracking-[0.24em] text-zinc-400 uppercase font-sans mb-2.5">
              Explore Daman
            </span>
            <h2 className="text-[36px] sm:text-[48px] font-black tracking-[-0.03em] text-zinc-950 leading-[1.1]">
              Daman Awaits Your Arrival
            </h2>
            <p className="mt-4 text-[15.5px] sm:text-[17px] text-zinc-600 leading-relaxed">
              From the tranquil black sands of Jampore to the historic 16th-century ramparts of Moti Daman Fort, experience Daman with absolute mobility convenience.
            </p>
          </div>

          {/* Destinations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="p-6 rounded-3xl bg-white border border-zinc-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-[12px] font-bold text-[#1758A5] uppercase tracking-wider block mb-2">
                  Beaches & Water Sports
                </span>
                <h3 className="text-xl font-bold text-zinc-950 mb-2">Jampore Beach</h3>
                <p className="text-[14px] text-zinc-600 leading-relaxed">
                  Famous for its calm, shallow waters, casuarina trees, and vibrant beach sports. Perfect destination for self-drive Thar 4x4 coastal cruises and sunset dining.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500 font-medium">
                <span>14 km from Vapi Junction</span>
                <span className="text-zinc-900 font-bold">~25 mins by cab</span>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-zinc-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-[12px] font-bold text-[#1758A5] uppercase tracking-wider block mb-2">
                  Heritage & Architecture
                </span>
                <h3 className="text-xl font-bold text-zinc-950 mb-2">Moti Daman Portuguese Fort</h3>
                <p className="text-[14px] text-zinc-600 leading-relaxed">
                  Steeped in 400 years of Portuguese maritime history, featuring ancient ramparts, the Bom Jesus Church, and panoramic views of the Daman Ganga rivermouth.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500 font-medium">
                <span>Heart of Nani/Moti Daman</span>
                <span className="text-zinc-900 font-bold">Quick 10-min hop</span>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-zinc-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-[12px] font-bold text-[#1758A5] uppercase tracking-wider block mb-2">
                  Seafront & Nightlife
                </span>
                <h3 className="text-xl font-bold text-zinc-950 mb-2">Devka Beach & Promenade</h3>
                <p className="text-[14px] text-zinc-600 leading-relaxed">
                  A lively seaside walkway lined with musical fountains, amusement parks, and seafood eateries. The favorite evening hotspot for weekenders from Surat and Mumbai.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500 font-medium">
                <span>North Daman Coast</span>
                <span className="text-zinc-900 font-bold">Cab ETA: 3 mins</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 9: FREQUENTLY ASKED QUESTIONS (FAQ ACCORDION)
         ========================================================================= */}
      <section
        id="faq"
        className="relative w-full py-20 lg:py-28 px-6 sm:px-10 lg:px-16 bg-white border-t border-zinc-200/60"
      >
        <div className="max-w-[1000px] mx-auto">
          {/* Header */}
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-14">
            <span className="text-[11.5px] font-bold tracking-[0.24em] text-zinc-400 uppercase font-sans mb-2.5">
              Have Questions?
            </span>
            <h2 className="text-[36px] sm:text-[46px] font-black tracking-[-0.03em] text-zinc-950 leading-[1.1]">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-[15.5px] text-zinc-600 leading-relaxed">
              Everything you need to know about Zenith cabs, self-drive rentals, and inter-state travel.
            </p>
          </div>

          {/* Accordion List */}
          <div className="space-y-4">
            {FAQ_ITEMS.map((item, index) => {
              const isExpanded = expandedFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-zinc-200/80 bg-white overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setExpandedFaq(isExpanded ? null : index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                    aria-expanded={isExpanded}
                  >
                    <span className="text-[15.5px] sm:text-[16.5px] font-bold text-zinc-950 pr-4">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-zinc-400 transition-transform duration-200 flex-shrink-0 ${
                        isExpanded ? "rotate-180 text-zinc-950" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-1 text-[14.5px] leading-relaxed text-zinc-600 border-t border-zinc-100">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 10: LUXURY BLUE CALL TO ACTION BANNER
         ========================================================================= */}
      <section
        id="cta"
        className="relative w-full py-16 sm:py-20 px-6 sm:px-10 lg:px-16 bg-[#fdfdfd]"
      >
        <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center">
          {/* Signboard Inspired Gradient CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full rounded-[36px] sm:rounded-[44px] bg-gradient-to-br from-[#1758A5] via-[#0F386E] to-[#0C284A] p-10 sm:p-16 lg:p-20 text-center overflow-hidden shadow-[0_25px_60px_rgba(12,40,74,0.25)] border border-[#1758A5]/40"
          >
            {/* Subtle Lighting Rings */}
            <div className="absolute inset-0 pointer-events-none opacity-30 select-none">
              <svg viewBox="0 0 1000 400" fill="none" className="w-full h-full object-cover">
                <circle cx="850" cy="200" r="240" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1.2" />
                <circle cx="850" cy="200" r="340" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" />
                <circle cx="700" cy="140" r="5" fill="rgba(255, 255, 255, 0.4)" />
                <circle cx="940" cy="290" r="4" fill="rgba(255, 255, 255, 0.3)" />
              </svg>
            </div>

            <div className="relative z-10 flex flex-col items-center max-w-2xl mx-auto">
              <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white mb-6">
                <span className="text-xl font-black">Z</span>
              </div>

              <h2 className="text-[34px] sm:text-[46px] lg:text-[54px] font-extrabold tracking-[-0.03em] text-white leading-[1.12]">
                Experience Daman on Your Own Terms
              </h2>

              <p className="mt-4 sm:mt-5 text-[15px] sm:text-[17px] text-blue-100/80 leading-relaxed max-w-lg">
                Whether you need a reliable cab from Vapi station or a self-drive SUV for a coastal road trip, Zenith is ready.
              </p>

              <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4">
                <a
                  href={`tel:${ZENITH_COMPANY_INFO.phoneRaw}`}
                  className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-white text-zinc-950 text-[14px] font-semibold hover:bg-zinc-100 hover:shadow-lg transition-all duration-200 shadow-md active:scale-95"
                >
                  <Phone className="w-4 h-4 text-[#1758A5]" />
                  <span>Call {ZENITH_COMPANY_INFO.phone}</span>
                </a>

                <a
                  href="#app"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white/10 backdrop-blur-md text-white text-[14px] font-semibold border border-white/20 hover:bg-white/20 transition-all duration-200"
                >
                  <span>Download Zenith App</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================================
          SITE FOOTER (WITH REAL SIGNBOARD CREDENTIALS)
         ========================================================================= */}
      <footer className="w-full bg-[#09090b] text-white pt-16 sm:pt-20 pb-12 border-t border-zinc-900">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-14 border-b border-zinc-800/80">
            {/* Column 1: Brand & Credentials */}
            <div className="lg:col-span-2 flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#1758A5] to-[#0C284A] flex items-center justify-center text-white font-black text-sm">
                  Z
                </div>
                <span className="text-2xl font-black tracking-tight text-white font-sans">
                  Zenith
                </span>
              </div>

              <p className="text-[13.5px] leading-relaxed text-zinc-400 max-w-sm mb-4">
                {ZENITH_COMPANY_INFO.legalName} &bull; Operating mobility infrastructure across Dadra & Nagar Haveli and Daman & Diu Union Territory since 2006.
              </p>

              <div className="text-[12px] text-zinc-500 space-y-1">
                <p>GSTIN: <span className="text-zinc-300 font-mono font-medium">{ZENITH_COMPANY_INFO.gstin}</span></p>
                <p>Head Office: {ZENITH_COMPANY_INFO.address}</p>
              </div>
            </div>

            {/* Column 2: Services */}
            <div>
              <h4 className="text-[13px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-4">
                Mobility Services
              </h4>
              <ul className="space-y-2.5 text-[14px] text-zinc-400">
                <li><a href="#services" className="hover:text-white transition-colors">Cab Hailing (Daman & Vapi)</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Self-Drive Car Rental</a></li>
                <li><a href="#routes" className="hover:text-white transition-colors">Vapi Station Pickups</a></li>
                <li><a href="#routes" className="hover:text-white transition-colors">Daman to Surat / Mumbai</a></li>
                <li><a href="#fleet" className="hover:text-white transition-colors">Mahindra Thar 4x4 Beach Rentals</a></li>
              </ul>
            </div>

            {/* Column 3: Partner & Network */}
            <div>
              <h4 className="text-[13px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-4">
                Network & Hubs
              </h4>
              <ul className="space-y-2.5 text-[14px] text-zinc-400">
                <li><span className="text-zinc-200">Daman (Coastal Headquarters)</span></li>
                <li><span className="text-zinc-400">Vapi (Railway Hub & Industrial)</span></li>
                <li><span className="text-zinc-400">Silvassa (Dadra & Nagar Haveli)</span></li>
                <li><span className="text-zinc-400">Valsad & Umargam</span></li>
                <li><a href="#driver-partner" className="hover:text-[#1758A5] text-zinc-300 font-medium transition-colors">Driver Micro-Entrepreneurship</a></li>
              </ul>
            </div>

            {/* Column 4: Contact & Helpline */}
            <div>
              <h4 className="text-[13px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-4">
                24/7 Operations Desk
              </h4>
              <div className="space-y-3 text-[14px] text-zinc-400">
                <div>
                  <span className="block text-[11px] text-zinc-500 uppercase">Helpline</span>
                  <a href={`tel:${ZENITH_COMPANY_INFO.phoneRaw}`} className="text-white font-bold hover:text-[#1758A5] transition-colors">
                    {ZENITH_COMPANY_INFO.phone}
                  </a>
                </div>
                <div>
                  <span className="block text-[11px] text-zinc-500 uppercase">Email</span>
                  <a href={`mailto:${ZENITH_COMPANY_INFO.email}`} className="text-zinc-300 hover:text-white transition-colors">
                    {ZENITH_COMPANY_INFO.email}
                  </a>
                </div>
                <div>
                  <span className="block text-[11px] text-zinc-500 uppercase">WhatsApp Desk</span>
                  <a
                    href={ZENITH_COMPANY_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors inline-flex items-center gap-1"
                  >
                    <span>Chat on WhatsApp</span> &rarr;
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Copyright & Legal */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
            <p>&copy; {new Date().getFullYear()} {ZENITH_COMPANY_INFO.legalName}. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#privacy" className="hover:text-zinc-400 transition-colors">Privacy Policy</a>
              <a href="#terms" className="hover:text-zinc-400 transition-colors">Terms of Service</a>
              <a href="#driver-partner" className="hover:text-zinc-400 transition-colors">Driver Agreement</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
