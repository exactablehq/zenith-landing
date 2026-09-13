"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Menu,
  X,
  Car,
  Key,
  MapPin,
  Compass,
  Users,
  CheckCircle2,
  ShieldCheck,
  Phone,
  ExternalLink,
  ChevronRight,
  Clock,
  Sparkles,
  ArrowUp,
  MessageCircle,
  Briefcase,
  ChevronDown,
} from "lucide-react";
import {
  ZENITH_COMPANY_INFO,
  SOCIAL_LINKS,
  DAMAN_ROUTES,
  FAQ_ITEMS,
  FLEET_VEHICLES_DATA,
  FleetVehicle,
} from "./data/zenithData";

interface HeroServiceConfig {
  id: string;
  tabLabel: string;
  headline: string;
  subtitle: string;
  tag: string;
  priceBadge: string;
  imageSrc: string;
  imageAlt: string;
  ctaText: string;
  ctaAction: string;
  icon: React.ComponentType<{ className?: string }>;
}

export default function LandingPage() {
  const [activeHeroTab, setActiveHeroTab] = useState<string>("cabs");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeFleetTab, setActiveFleetTab] = useState<string>("all");
  const [activeServiceMode, setActiveServiceMode] = useState<"cabs" | "self-drive" | "station">("cabs");
  const [selectedVehicle, setSelectedVehicle] = useState<FleetVehicle | null>(null);
  const [selectedRouteId, setSelectedRouteId] = useState<string>(DAMAN_ROUTES[0].id);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(0);
  const [legalModal, setLegalModal] = useState<"terms" | "privacy" | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      setIsScrolled(scrollPos > 20);
      setShowScrollTop(scrollPos > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedVehicle(null);
        setLegalModal(null);
      }
    };
    if (selectedVehicle || legalModal) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedVehicle, legalModal]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const heroServices: HeroServiceConfig[] = [
    {
      id: "cabs",
      tabLabel: "Cab Hailing",
      headline: "Cab Hailing &\nOn-Demand Rides\nin Daman",
      subtitle:
        "Instant point-to-point cabs across Daman town and beach resorts. Average 3-minute pickup with verified local chauffeurs and zero tourist surges.",
      tag: "Rapid 3-Min Dispatch",
      priceBadge: "From ₹14 / km",
      imageSrc: "/car.png",
      imageAlt: "Zenith On-Demand Cab Hailing Fleet in Daman",
      ctaText: "Book a Cab on Call",
      ctaAction: `tel:${ZENITH_COMPANY_INFO.phoneRaw}`,
      icon: Car,
    },
    {
      id: "self-drive",
      tabLabel: "Self-Drive Rental",
      headline: "Self-Drive Freedom\nAcross Daman's\nCoastline",
      subtitle:
        "Drive on your own schedule. Keyless digital unlock, unlimited kilometers, and doorstep delivery directly to your hotel or beach resort.",
      tag: "Doorstep Delivery",
      priceBadge: "From ₹1,199 / day",
      imageSrc: "/cars/thar.jpg",
      imageAlt: "Zenith Self-Drive Mahindra Thar 4x4 in Daman",
      ctaText: "Rent Self-Drive Car",
      ctaAction: `tel:${ZENITH_COMPANY_INFO.phoneRaw}`,
      icon: Key,
    },
    {
      id: "station",
      tabLabel: "Vapi Station Drop",
      headline: "Vapi Railway Station\nPlatform Pickups\nto Daman Beaches",
      subtitle:
        "Seamless transfers from Vapi Junction platform exit to Jampore and Devka beach resorts. Fixed upfront fares with zero luggage negotiations.",
      tag: "Platform to Hotel",
      priceBadge: "Fixed ₹350 – ₹450",
      imageSrc: "/cars/dzire.jpg",
      imageAlt: "Zenith Vapi Railway Station to Daman Beach Transfer",
      ctaText: "Reserve Station Pickup",
      ctaAction: `tel:${ZENITH_COMPANY_INFO.phoneRaw}`,
      icon: MapPin,
    },
    {
      id: "beach-cruisers",
      tabLabel: "Thar 4x4 Beach",
      headline: "Iconic Mahindra Thar\nCoastal Cruising\nin Daman",
      subtitle:
        "Experience the Arabian Sea breeze in style. Rugged 4x4 convertible Thar rentals crafted for scenic sunset drives along Jampore and Devka Beach.",
      tag: "Beach Lifestyle Icon",
      priceBadge: "From ₹3,499 / day",
      imageSrc: "/cars/thar.jpg",
      imageAlt: "Mahindra Thar 4x4 Coastal Beach Rental Daman",
      ctaText: "Reserve Thar 4x4",
      ctaAction: `tel:${ZENITH_COMPANY_INFO.phoneRaw}`,
      icon: Compass,
    },
    {
      id: "partner",
      tabLabel: "Driver Partner",
      headline: "Drive with Zenith\nOwn a Fleet Vehicle\nin Daman",
      subtitle:
        "Micro-entrepreneurship for 100 qualified drivers across Daman, Vapi, and Silvassa. Brand-new commercial car provided with ₹50,000–₹1,00,000/mo earning.",
      tag: "100 Fleet Operators",
      priceBadge: "₹50k – ₹1L / mo",
      imageSrc: "/cars/ertiga.jpg",
      imageAlt: "Zenith Fleet Partner Micro Entrepreneurship Program",
      ctaText: "Apply via WhatsApp",
      ctaAction: ZENITH_COMPANY_INFO.driverWhatsappUrl,
      icon: Users,
    },
  ];

  const currentHero = heroServices.find((s) => s.id === activeHeroTab) || heroServices[0];

  const handleNextHeroTab = () => {
    const currentIndex = heroServices.findIndex((s) => s.id === activeHeroTab);
    const nextIndex = (currentIndex + 1) % heroServices.length;
    setActiveHeroTab(heroServices[nextIndex].id);
  };

  const filteredFleet = FLEET_VEHICLES_DATA.filter((car) => {
    if (activeFleetTab === "all") return true;
    if (activeFleetTab === "cabs") return car.category === "cabs" || car.category === "both";
    if (activeFleetTab === "self-drive") return car.category === "self-drive" || car.category === "both";
    if (activeFleetTab === "suv") return car.type.includes("Cruiser") || car.type.includes("MPV");
    if (activeFleetTab === "sedan") return car.type.includes("Sedan");
    return true;
  });

  const activeRoute = DAMAN_ROUTES.find((r) => r.id === selectedRouteId) || DAMAN_ROUTES[0];

  // Social Icon Helper
  const renderSocialIcon = (iconName: string) => {
    switch (iconName) {
      case "linkedin":
        return (
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.66 1.66 0 1 0 0 3.32 1.66 1.66 0 0 0 0-3.32Z" />
          </svg>
        );
      case "instagram":
        return (
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069Zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324Zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z" />
          </svg>
        );
      case "twitter":
        return (
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        );
      case "facebook":
        return (
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        );
      case "youtube":
        return (
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full bg-[#fdfdfd] text-zinc-900 selection:bg-black selection:text-white">
      {/* =========================================================================
          STICKY HEADER WITH CAREERS ("WE'RE HIRING") & CALL ACTION
         ========================================================================= */}
      <header
        className={`fixed top-0 left-0 w-full z-50 px-6 sm:px-12 lg:px-16 transition-all duration-300 flex items-center justify-between ${
          isScrolled
            ? "py-3 sm:py-3.5 bg-white/90 backdrop-blur-xl border-b border-zinc-200/70 shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
            : "py-5 sm:py-6 lg:py-7 bg-transparent"
        }`}
      >
        {/* Brand Logo: Zenith */}
        <a
          href="#"
          className="group flex items-center gap-3 focus:outline-none"
          aria-label="Zenith Homepage"
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black flex items-center justify-center transition-transform group-hover:scale-105">
            <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-[2.5px] border-white border-r-transparent rotate-[-45deg]" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-black tracking-tight text-black font-sans leading-none">
              Zenith
            </span>
            <span className="text-[10px] tracking-widest text-zinc-400 font-semibold uppercase mt-0.5">
              Daman &bull; Est. 2006
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links (with Careers badge) */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-9 text-[14px] lg:text-[15px] font-medium text-zinc-700">
          <a href="#services" className="hover:text-black transition-colors duration-150">
            Services
          </a>
          <a href="#cars" className="hover:text-black transition-colors duration-150">
            Cars
          </a>
          <a href="#app" className="hover:text-black transition-colors duration-150">
            App
          </a>
          <a href="#features" className="hover:text-black transition-colors duration-150">
            Features
          </a>
          <a
            href={ZENITH_COMPANY_INFO.careersUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 text-zinc-900 hover:text-[#1758A5] transition-colors duration-150"
          >
            <span>Careers</span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 text-[11px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Hiring</span>
            </span>
            <ExternalLink className="w-3 h-3 text-zinc-400 group-hover:text-[#1758A5] transition-colors" />
          </a>
        </nav>

        {/* Right CTA Button & Phone */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            href={`tel:${ZENITH_COMPANY_INFO.phoneRaw}`}
            className="flex items-center gap-2 text-[13.5px] font-semibold text-zinc-700 hover:text-black px-3 py-2 rounded-full hover:bg-zinc-100 transition-all"
            title="Call 24/7 Helpline"
          >
            <Phone className="w-3.5 h-3.5 text-[#1758A5]" />
            <span>{ZENITH_COMPANY_INFO.phone}</span>
          </a>

          <a
            href="#app"
            className="group flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-black text-white text-[13.5px] font-semibold hover:bg-zinc-800 transition-all duration-200 shadow-sm hover:shadow active:scale-95"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#1758A5] group-hover:scale-125 transition-transform" />
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
            className="md:hidden fixed top-[68px] left-0 w-full bg-white/95 backdrop-blur-xl border-b border-zinc-200 z-50 px-6 py-6 flex flex-col gap-4 text-center shadow-xl"
          >
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-lg font-medium text-zinc-800 hover:text-black"
            >
              Services (Cabs & Self-Drive)
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
              App
            </a>
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-lg font-medium text-zinc-800 hover:text-black"
            >
              Features
            </a>
            <a
              href={ZENITH_COMPANY_INFO.careersUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 text-lg font-semibold text-emerald-700 hover:text-emerald-800 flex items-center justify-center gap-2"
            >
              <span>Careers (We&apos;re Hiring)</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <div className="pt-2 flex flex-col gap-2">
              <a
                href={`tel:${ZENITH_COMPANY_INFO.phoneRaw}`}
                className="py-2.5 rounded-full border border-zinc-200 text-zinc-900 text-sm font-semibold flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#1758A5]" />
                <span>Call {ZENITH_COMPANY_INFO.phone}</span>
              </a>
              <a
                href={ZENITH_COMPANY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 rounded-full bg-emerald-600 text-white text-sm font-semibold flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Operations Desk</span>
              </a>
              <a
                href="#app"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center justify-center gap-2.5 w-full py-3 rounded-full bg-black text-white text-base font-semibold"
              >
                <span>Download Zenith App</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          PAGE 1: HERO SECTION (WITH DYNAMIC INTERACTIVE SERVICE TABS)
         ========================================================================= */}
      <main className="relative min-h-screen lg:h-screen lg:max-h-screen w-full flex flex-col justify-between overflow-x-hidden lg:overflow-hidden pt-20 sm:pt-24 lg:pt-16">
        {/* HERO MAIN CONTENT AREA */}
        <section className="relative w-full max-w-[1580px] mx-auto px-6 sm:px-12 lg:px-16 flex-1 flex flex-col justify-center my-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center min-h-[420px] lg:min-h-[460px]">
            {/* LEFT COLUMN: DYNAMIC HEADLINE, SUBTITLE & ACTION */}
            <div className="lg:col-span-5 z-20 flex flex-col justify-center pb-6 lg:pb-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentHero.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Floating Highlight Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 text-zinc-800 text-[12px] font-semibold border border-zinc-200/80 mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1758A5] animate-pulse" />
                    <span>{currentHero.tag}</span>
                    <span className="text-zinc-400">&bull;</span>
                    <span className="text-[#1758A5] font-bold">{currentHero.priceBadge}</span>
                  </div>

                  <h1 className="text-[44px] sm:text-[54px] md:text-[64px] lg:text-[58px] xl:text-[72px] font-extrabold tracking-[-0.035em] leading-[1.03] text-black whitespace-pre-line">
                    {currentHero.headline}
                  </h1>

                  <p className="mt-5 sm:mt-6 text-zinc-600 text-[15px] sm:text-[16px] lg:text-[15.5px] xl:text-[17px] leading-[1.58] max-w-[420px] font-normal">
                    {currentHero.subtitle}
                  </p>

                  <div className="mt-7 flex items-center gap-4">
                    <a
                      href={currentHero.ctaAction}
                      target={currentHero.ctaAction.startsWith("http") ? "_blank" : undefined}
                      rel={currentHero.ctaAction.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="group inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-black text-white text-[14px] font-semibold hover:bg-zinc-800 transition-all duration-200 shadow-sm hover:shadow active:scale-95"
                    >
                      <span>{currentHero.ctaText}</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* RIGHT COLUMN: DYNAMIC CAR & MAP ROUTE NETWORK */}
            <div className="lg:col-span-7 relative w-full h-[320px] sm:h-[420px] lg:h-[480px] xl:h-[520px] flex items-end justify-end">
              {/* Map Background Image */}
              <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden flex items-center justify-center">
                <div className="relative w-full h-full max-w-[850px] max-h-[550px] opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_85%)]">
                  <Image
                    src="/map.png"
                    alt="Map Navigation Daman"
                    fill
                    priority
                    sizes="(max-width: 1200px) 700px, 900px"
                    className="object-contain object-center scale-105"
                  />
                </div>
              </div>

              {/* Dynamic Vehicle Cutout with Smooth Physics */}
              <div className="relative z-10 w-full max-w-[760px] lg:max-w-[880px] xl:max-w-[1000px] -mr-4 sm:-mr-8 lg:-mr-12 xl:-mr-16">
                {/* Floating Live Telemetry Badge (Ambient Physics) */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                  className="hidden sm:flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-white/95 backdrop-blur-md border border-zinc-200/90 shadow-[0_8px_25px_rgba(0,0,0,0.06)] absolute top-2 sm:top-4 left-0 sm:left-6 z-20"
                >
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <div className="flex flex-col text-left">
                    <span className="text-[9.5px] font-bold uppercase tracking-wider text-zinc-400">Live Fleet Radar</span>
                    <span className="text-[12px] font-bold text-zinc-900">Active in Daman &bull; 3m ETA</span>
                  </div>
                </motion.div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentHero.id}
                    initial={{ opacity: 0, x: 40, scale: 0.98 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -40, scale: 0.98 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="relative flex flex-col items-end"
                  >
                    <div className="relative w-full aspect-[16/9.2] sm:aspect-[16/8.8]">
                      <Image
                        src={currentHero.imageSrc}
                        alt={currentHero.imageAlt}
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 1000px"
                        className="object-contain object-right-bottom scale-[1.05] sm:scale-100 drop-shadow-lg"
                      />
                    </div>
                    <div className="w-[85%] h-5 sm:h-7 -mt-3 sm:-mt-5 mr-[5%] car-shadow pointer-events-none" />
                    <div className="w-[75%] h-3 sm:h-4 -mt-3 mr-[10%] car-contact-shadow pointer-events-none" />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* BOTTOM LUXURY SERVICE CAROUSEL / SELECTOR */}
        <footer className="relative z-30 w-full px-4 sm:px-12 lg:px-16 pb-6 lg:pb-8 pt-2">
          <div className="max-w-[1240px] mx-auto flex items-center justify-between gap-3 sm:gap-6 md:gap-8">
            <div className="flex-1 flex items-center justify-between sm:justify-center gap-2 sm:gap-4 md:gap-8 lg:gap-12 overflow-x-auto no-scrollbar py-2 px-1">
              {heroServices.map((service) => {
                const isActive = activeHeroTab === service.id;
                const IconComponent = service.icon;

                return (
                  <button
                    key={service.id}
                    onClick={() => setActiveHeroTab(service.id)}
                    className={`group relative flex items-center justify-center p-2.5 sm:p-3 transition-all duration-300 focus:outline-none ${
                      isActive ? "text-zinc-950 font-bold" : "text-zinc-400 hover:text-zinc-700 hover:scale-105 font-medium"
                    }`}
                    title={service.headline.replace("\n", " ")}
                    aria-label={`Select ${service.tabLabel}`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeBrandPill"
                        className="absolute -inset-x-2 -inset-y-1.5 sm:-inset-x-3 sm:-inset-y-2 bg-white rounded-2xl border border-zinc-200/90 shadow-[0_6px_25px_rgba(0,0,0,0.06)] z-0"
                        transition={{ type: "spring", stiffness: 480, damping: 34 }}
                      />
                    )}
                    <div className="relative z-10 flex items-center gap-2 text-xs sm:text-sm whitespace-nowrap px-1">
                      <IconComponent className={`w-3.5 h-3.5 ${isActive ? "text-[#1758A5]" : "text-zinc-400 group-hover:text-zinc-700"}`} />
                      <span>{service.tabLabel}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex-shrink-0 pl-1 sm:pl-2">
              <button
                onClick={handleNextHeroTab}
                className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-500 hover:text-black shadow-xs hover:shadow-sm transition-all duration-150 active:scale-95 focus:outline-none"
                aria-label="Next service"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </footer>
      </main>

      {/* =========================================================================
          INSTITUTIONAL CREDENTIALS & TRUST RIBBON (KHELO INDIA & G20)
         ========================================================================= */}
      <section className="w-full border-y border-zinc-200/70 bg-zinc-50/60 py-4.5 px-6 sm:px-12 lg:px-16">
        <div className="max-w-[1400px] mx-auto flex flex-wrap items-center justify-between gap-4 sm:gap-6 text-[12px] sm:text-[13px] text-zinc-600 font-medium">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#1758A5]" />
            <span className="font-bold text-zinc-950">Est. 2006</span>
            <span className="text-zinc-400">&bull;</span>
            <span>19+ Years In Daman &amp; Diu UT</span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-600" />
            <span className="font-bold text-zinc-950">250+ Commercial Assets</span>
            <span className="text-zinc-400">&bull;</span>
            <span>Company-Owned Infrastructure</span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#1758A5]" />
            <span className="font-bold text-zinc-950">Khelo India Beach Games Diu</span>
            <span className="text-zinc-400">&bull;</span>
            <span>Official Fleet Partner (2024 &amp; 2025)</span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-zinc-900" />
            <span className="font-bold text-zinc-950">G20 Summit Meetings</span>
            <span className="text-zinc-400">&bull;</span>
            <span>Official Fleet Operations</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: DUAL MOBILITY MODES (INTERACTIVE SWITCHER & DETAILS)
         ========================================================================= */}
      <section
        id="services"
        className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 sm:px-12 lg:px-16 py-20 lg:py-28 bg-white border-t border-zinc-100 scroll-mt-20"
      >
        <div id="about" className="scroll-mt-24" />
        <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center">
          {/* Header */}
          <div className="flex flex-col items-center text-center max-w-2xl mb-12">
            <span className="text-[11px] sm:text-[12px] font-bold tracking-[0.24em] text-zinc-400 uppercase font-sans mb-3">
              One Unified Platform
            </span>
            <h2 className="text-[40px] sm:text-[54px] lg:text-[62px] font-black tracking-[-0.035em] text-zinc-950 leading-[1.08]">
              How Zenith Works
            </h2>
            <p className="mt-4 text-[15px] sm:text-[16.5px] lg:text-[17px] leading-[1.65] text-zinc-600 font-normal">
              Toggle between services below to see transparent rates, verified routes, and pickup details across Daman and Vapi.
            </p>
          </div>

          {/* Service Mode Tabs (Cabs / Self-Drive / Station) */}
          <div className="flex items-center gap-2 sm:gap-3 p-1.5 rounded-2xl bg-zinc-100 border border-zinc-200/80 mb-12">
            {[
              { id: "cabs" as const, label: "Cab Hailing", icon: Car },
              { id: "self-drive" as const, label: "Self-Drive Rental", icon: Key },
              { id: "station" as const, label: "Station & Outstation", icon: MapPin },
            ].map((tab) => {
              const isSelected = activeServiceMode === tab.id;
              const IconComp = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveServiceMode(tab.id)}
                  className={`relative flex items-center gap-2 py-2.5 px-5 sm:px-7 rounded-xl text-[13.5px] sm:text-[14.5px] font-semibold transition-colors duration-200 focus:outline-none ${
                    isSelected ? "text-zinc-950" : "text-zinc-500 hover:text-zinc-800"
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="serviceModePill"
                      className="absolute inset-0 bg-white rounded-xl shadow-xs border border-zinc-200/80 z-0"
                      transition={{ type: "spring", stiffness: 480, damping: 34 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <IconComp className={`w-4 h-4 ${isSelected ? "text-[#1758A5]" : "text-zinc-400"}`} />
                    <span>{tab.label}</span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Dynamic Service Presentation Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeServiceMode}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-[1240px] rounded-3xl bg-[#f8f8fa] border border-zinc-200/80 p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center shadow-xs"
            >
              {activeServiceMode === "cabs" && (
                <>
                  <div className="lg:col-span-6 flex flex-col justify-center">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#1758A5] mb-2">
                      Point-to-Point Mobility
                    </span>
                    <h3 className="text-3xl sm:text-4xl font-black text-zinc-950 tracking-tight mb-4">
                      Instant On-Demand Cabs in Daman
                    </h3>
                    <p className="text-[15.5px] text-zinc-600 leading-relaxed mb-6">
                      Never deal with meter-less street auto haggling again. Tap to request a clean, air-conditioned cab anywhere in Daman, Nani Daman, or Moti Daman. An assigned driver arrives in minutes at transparent, metered rates.
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm text-zinc-700 mb-8">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span>Average 3-min ETA</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span>Starting at ₹14/km</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span>100% Chilled AC Fleet</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span>Zero Tourist Surcharges</span>
                      </div>
                    </div>
                    <div>
                      <a
                        href={`tel:${ZENITH_COMPANY_INFO.phoneRaw}`}
                        className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-black text-white text-sm font-semibold hover:bg-zinc-800 transition-colors shadow-xs"
                      >
                        <Phone className="w-4 h-4 text-[#1758A5]" />
                        <span>Book Instant Cab ({ZENITH_COMPANY_INFO.phone})</span>
                      </a>
                    </div>
                  </div>
                  <div className="lg:col-span-6 relative aspect-[16/10] rounded-2xl overflow-hidden bg-white border border-zinc-200/80 shadow-sm flex items-center justify-center p-4">
                    <Image
                      src="/cars/swift.jpg"
                      alt="Zenith Maruti Swift Cab Hailing in Daman"
                      fill
                      className="object-contain p-4"
                    />
                  </div>
                </>
              )}

              {activeServiceMode === "self-drive" && (
                <>
                  <div className="lg:col-span-6 flex flex-col justify-center">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#1758A5] mb-2">
                      Total Driving Independence
                    </span>
                    <h3 className="text-3xl sm:text-4xl font-black text-zinc-950 tracking-tight mb-4">
                      Self-Drive Car Rentals in Daman
                    </h3>
                    <p className="text-[15.5px] text-zinc-600 leading-relaxed mb-6">
                      Freedom to cruise the coast at your own pace. Choose from rugged Mahindra Thar 4x4 convertibles, compact SUVs, and sedans with doorstep delivery to your beach resort or hotel. Digital keyless unlock and zero paperwork hassle.
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm text-zinc-700 mb-8">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span>Doorstep Resort Delivery</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span>Starting at ₹1,199/day</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span>Permits Cleared for Gujarat</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span>Unlimited KM Packages</span>
                      </div>
                    </div>
                    <div>
                      <a
                        href={`tel:${ZENITH_COMPANY_INFO.phoneRaw}`}
                        className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-black text-white text-sm font-semibold hover:bg-zinc-800 transition-colors shadow-xs"
                      >
                        <Key className="w-4 h-4 text-[#1758A5]" />
                        <span>Rent Self-Drive Car</span>
                      </a>
                    </div>
                  </div>
                  <div className="lg:col-span-6 relative aspect-[16/10] rounded-2xl overflow-hidden bg-white border border-zinc-200/80 shadow-sm flex items-center justify-center p-4">
                    <Image
                      src="/cars/thar.jpg"
                      alt="Mahindra Thar 4x4 Self Drive Rental Daman"
                      fill
                      className="object-contain p-4"
                    />
                  </div>
                </>
              )}

              {activeServiceMode === "station" && (
                <>
                  <div className="lg:col-span-6 flex flex-col justify-center">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#1758A5] mb-2">
                      Reliable Transit Gateway
                    </span>
                    <h3 className="text-3xl sm:text-4xl font-black text-zinc-950 tracking-tight mb-4">
                      Vapi Railway Station to Daman
                    </h3>
                    <p className="text-[15.5px] text-zinc-600 leading-relaxed mb-6">
                      Arriving at Vapi Junction on Vande Bharat or Mumbai Shatabdi? Your assigned Zenith chauffeur waits right at the station exit to take you directly to Jampore Beach or Devka resorts at pre-fixed, guaranteed rates.
                    </p>
                    {/* Interactive Daman Route Chips */}
                    <div className="space-y-2.5 mb-5">
                      <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
                        Select Verified Route Corridor
                      </span>
                      {DAMAN_ROUTES.map((route) => {
                        const isSelected = selectedRouteId === route.id;
                        return (
                          <button
                            key={route.id}
                            type="button"
                            onClick={() => setSelectedRouteId(route.id)}
                            className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all duration-150 ${
                              isSelected
                                ? "bg-blue-50/60 border-[#1758A5] text-zinc-950 shadow-xs"
                                : "bg-white border-zinc-200/80 text-zinc-700 hover:border-zinc-300"
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <span className={`w-2 h-2 rounded-full ${isSelected ? "bg-[#1758A5]" : "bg-zinc-300"}`} />
                              <span className="font-semibold">{route.from} &rarr; {route.to}</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                              <span className="text-zinc-400 text-xs hidden sm:inline">{route.approxTime}</span>
                              <span className="text-[#1758A5] font-bold">{route.cabEstimate}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Active Route Highlight Info Box */}
                    <div className="p-3.5 rounded-xl bg-white border border-zinc-200/80 mb-7 flex items-center justify-between text-xs text-zinc-600">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-[#1758A5] flex-shrink-0" />
                        <span>{activeRoute.highlight}</span>
                      </div>
                      <span className="font-semibold text-zinc-800 ml-2 whitespace-nowrap">
                        {activeRoute.distanceKm} km &bull; {activeRoute.approxTime}
                      </span>
                    </div>

                    <div>
                      <a
                        href={`tel:${ZENITH_COMPANY_INFO.phoneRaw}`}
                        className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-black text-white text-sm font-semibold hover:bg-zinc-800 transition-colors shadow-xs"
                      >
                        <MapPin className="w-4 h-4 text-[#1758A5]" />
                        <span>Reserve Station Transfer</span>
                      </a>
                    </div>
                  </div>
                  <div className="lg:col-span-6 relative aspect-[16/10] rounded-2xl overflow-hidden bg-white border border-zinc-200/80 shadow-sm flex items-center justify-center p-4">
                    <Image
                      src="/cars/dzire.jpg"
                      alt="Zenith Dzire Station Pickup Vapi to Daman"
                      fill
                      className="object-contain p-4"
                    />
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>

          {/* THE ZENITH STANDARD VS. STREET CABS COMPARISON */}
          <div className="w-full max-w-[1240px] mt-12 sm:mt-14 rounded-3xl bg-[#f8f8fa] border border-zinc-200/80 p-6 sm:p-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-zinc-200/80">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#1758A5]">
                  The Zenith Standard
                </span>
                <h4 className="text-xl sm:text-2xl font-black text-zinc-950 tracking-tight mt-0.5">
                  Why Travelers Choose Zenith Over Street Cabs
                </h4>
              </div>
              <div className="text-xs text-zinc-500 font-medium">
                Official Commercial Transport &bull; Daman UT
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 text-sm">
              <div className="flex flex-col">
                <div className="flex items-center gap-2 font-bold text-zinc-950 mb-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Fixed, Upfront Metered Fares</span>
                </div>
                <p className="text-zinc-500 text-xs sm:text-[13px] leading-relaxed">
                  Zenith fares are fixed before you board. Zero unmetered auto haggling, zero unexpected night surcharges, and zero luggage fees.
                </p>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-2 font-bold text-zinc-950 mb-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>100% Chilled AC &amp; Sanitized Fleet</span>
                </div>
                <p className="text-zinc-500 text-xs sm:text-[13px] leading-relaxed">
                  Escape coastal humidity. Every company-owned vehicle features high-performance AC, fresh interiors, and GPS route safety.
                </p>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-2 font-bold text-zinc-950 mb-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>24/7 Regional Operations Desk</span>
                </div>
                <p className="text-zinc-500 text-xs sm:text-[13px] leading-relaxed">
                  Backed by Zenith Fleets Pvt. Ltd.&apos;s central regional desk with verified chauffeurs, live telemetry, and instant dispatch.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          PAGE 3: OUR VEHICLE FLEET SECTION (DYNAMIC FILTERING WITH REAL IMAGES)
         ========================================================================= */}
      <section
        id="cars"
        className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 sm:px-12 lg:px-16 py-20 lg:py-28 bg-[#fdfdfd] scroll-mt-24"
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

            {/* Subtitle Description */}
            <p className="mt-4 sm:mt-5 text-[15px] sm:text-[16.5px] lg:text-[17px] leading-[1.65] text-zinc-600 font-normal">
              Every vehicle in our fleet is company-owned, 100% sanitized, and GPS-monitored.
              <br className="hidden sm:inline" />
              Tap any vehicle to view full specifications and instant reservation details.
            </p>
          </motion.div>

          {/* CATEGORY FILTER TABS */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mt-8 sm:mt-10">
            {[
              { id: "all", label: "All Vehicles" },
              { id: "cabs", label: "Cab Hailing" },
              { id: "self-drive", label: "Self-Drive" },
              { id: "suv", label: "SUVs & MPVs" },
              { id: "sedan", label: "Sedans" },
            ].map((tab) => {
              const isSelected = activeFleetTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFleetTab(tab.id)}
                  className={`px-5 sm:px-6 py-2 rounded-xl sm:rounded-2xl text-[13px] sm:text-[14px] font-semibold transition-all duration-200 focus:outline-none ${
                    isSelected
                      ? "bg-black text-white shadow-sm"
                      : "bg-[#f4f4f6] text-zinc-700 hover:bg-zinc-200/80 hover:text-black"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* DYNAMIC FLEET GRID WITH STUDIO-GRADE VEHICLE PHOTOGRAPHY */}
          <motion.div
            layout
            className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-12"
          >
            <AnimatePresence>
              {filteredFleet.map((vehicle) => (
                <motion.div
                  key={vehicle.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                  onClick={() => setSelectedVehicle(vehicle)}
                  className="group relative rounded-3xl bg-white border border-zinc-200/80 p-6 flex flex-col justify-between hover:border-zinc-300 hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer"
                >
                  <div>
                    {/* Top Metadata */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">
                        {vehicle.type}
                      </span>
                      {vehicle.tag && (
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-900 border border-zinc-200">
                          {vehicle.tag}
                        </span>
                      )}
                    </div>

                    {/* Vehicle Name */}
                    <h3 className="text-xl sm:text-2xl font-black text-zinc-950 tracking-tight">
                      {vehicle.name}
                    </h3>
                    <p className="text-[13px] text-zinc-500 mt-1 mb-4 font-normal">
                      {vehicle.popularFor}
                    </p>

                    {/* Real Generated Studio Photography */}
                    <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-[#f7f7f9] border border-zinc-100 mb-5">
                      <Image
                        src={vehicle.image}
                        alt={vehicle.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        className="object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Spec Chips */}
                    <div className="flex items-center justify-between text-[12.5px] text-zinc-600 bg-[#f9f9fb] px-3.5 py-2.5 rounded-xl border border-zinc-100 mb-6">
                      <span>{vehicle.seats}</span>
                      <span className="text-zinc-300">&bull;</span>
                      <span>{vehicle.transmission}</span>
                      <span className="text-zinc-300">&bull;</span>
                      <span>{vehicle.fuel}</span>
                    </div>
                  </div>

                  {/* Rates & Quick Details Action */}
                  <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
                    <div>
                      {vehicle.selfDriveRate && (
                        <span className="text-base sm:text-lg font-bold text-zinc-950 block">
                          {vehicle.selfDriveRate}
                        </span>
                      )}
                      {vehicle.cabRate && (
                        <span className="text-xs text-zinc-500 font-medium block">
                          Cab: {vehicle.cabRate}
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedVehicle(vehicle);
                      }}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-black text-white text-[13px] font-semibold hover:bg-zinc-800 transition-colors shadow-xs active:scale-95"
                    >
                      <span>View Specs</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* BOTTOM CTA: CALL FLEET DESK */}
          <div className="mt-14 sm:mt-16 flex items-center justify-center">
            <a
              href={`tel:${ZENITH_COMPANY_INFO.phoneRaw}`}
              className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-white border border-zinc-200/90 text-zinc-900 text-[14px] font-semibold hover:border-zinc-300 hover:bg-zinc-50 transition-all duration-200 shadow-xs hover:shadow active:scale-95"
            >
              <span>Call Fleet Desk: {ZENITH_COMPANY_INFO.phone}</span>
              <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-black group-hover:translate-x-0.5 transition-all" />
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          PAGE 4: MODERN APP SHOWCASE SECTION
         ========================================================================= */}
      <section
        id="app"
        className="relative min-h-screen lg:h-screen w-full flex items-center justify-center px-6 sm:px-12 lg:px-16 py-16 lg:py-0 overflow-hidden bg-[#fdfdfd] scroll-mt-24"
      >
        <div className="relative w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-8">
          {/* LEFT COLUMN: DUAL 3D PHONES SHOWCASE */}
          <div className="lg:col-span-6 xl:col-span-7 relative w-full flex items-center justify-center lg:justify-start min-h-[460px] sm:min-h-[580px] lg:min-h-[640px]">
            {/* Ambient Background Glow */}
            <div className="absolute w-[360px] sm:w-[500px] h-[360px] sm:h-[500px] bg-gradient-to-tr from-[#1758A5]/10 via-zinc-100/40 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

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
                    alt="Zenith App Route Navigation Screen"
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
                    alt="Zenith App Fleet Booking Screen"
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
              <span className="text-[11.5px] sm:text-[12.5px] font-bold tracking-[0.22em] text-zinc-400 uppercase font-sans">
                Convenient Interaction
              </span>

              <h2 className="text-[42px] sm:text-[54px] lg:text-[60px] xl:text-[68px] font-black tracking-[-0.035em] text-zinc-950 mt-2 sm:mt-3 leading-[1.08]">
                Modern App
              </h2>

              <p className="mt-5 sm:mt-6 text-[15px] sm:text-[16.5px] lg:text-[17px] leading-[1.65] text-zinc-600 font-normal max-w-[460px]">
                We developed a simple and functional app to streamline cab hailing and self-drive car rentals across Daman. View the live vehicle telemetry, driver ETA, and transparent fares in one single click.
              </p>

              <div className="mt-8 sm:mt-10 flex items-center">
                <a
                  href="#app"
                  className="group inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-black text-white text-[14px] font-semibold hover:bg-zinc-800 transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
                >
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
          PAGE 5: KEY FEATURES SECTION
         ========================================================================= */}
      <section
        id="features"
        className="relative min-h-screen w-full flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-20 lg:py-28 bg-[#fdfdfd] scroll-mt-24"
      >
        <div className="w-full max-w-[1400px] mx-auto flex flex-col items-start">
          {/* SECTION HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start text-left max-w-2xl"
          >
            <span className="text-[11px] sm:text-[12px] font-bold tracking-[0.24em] text-zinc-400 uppercase font-sans mb-3">
              Taking Care of Every Client
            </span>

            <h2 className="text-[40px] sm:text-[54px] lg:text-[62px] font-black tracking-[-0.035em] text-zinc-950 leading-[1.08]">
              Key Features
            </h2>

            <p className="mt-4 sm:mt-5 text-[15px] sm:text-[16.5px] lg:text-[17px] leading-[1.65] text-zinc-600 font-normal">
              We are all about our client&apos;s comfort and safety. That&apos;s
              <br className="hidden sm:inline" />
              why we provide the best service you can imagine.
            </p>
          </motion.div>

          {/* 4 LUXURY FEATURE CARDS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 w-full max-w-[1080px] mt-10 sm:mt-14">
            {/* CARD 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative bg-white rounded-3xl border border-zinc-200/80 p-5 sm:p-6 flex flex-col justify-between aspect-square shadow-[0_4px_25px_rgba(0,0,0,0.02)] hover:shadow-[0_16px_35px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#eef8f4] flex items-center justify-center text-emerald-700 transition-transform group-hover:scale-105">
                <Clock className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
              </div>
              <h3 className="text-[14.5px] sm:text-[15.5px] font-bold text-zinc-950 leading-snug tracking-tight">
                24-hour car <br />
                delivery & cabs
              </h3>
            </motion.div>

            {/* CARD 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="group relative bg-white rounded-3xl border border-zinc-200/80 p-5 sm:p-6 flex flex-col justify-between aspect-square shadow-[0_4px_25px_rgba(0,0,0,0.02)] hover:shadow-[0_16px_35px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#fbf0f2] flex items-center justify-center text-rose-600 transition-transform group-hover:scale-105">
                <Phone className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
              </div>
              <h3 className="text-[14.5px] sm:text-[15.5px] font-bold text-zinc-950 leading-snug tracking-tight">
                24/7 dedicated <br />
                support
              </h3>
            </motion.div>

            {/* CARD 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="group relative bg-white rounded-3xl border border-zinc-200/80 p-5 sm:p-6 flex flex-col justify-between aspect-square shadow-[0_4px_25px_rgba(0,0,0,0.02)] hover:shadow-[0_16px_35px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#eef2fc] flex items-center justify-center text-indigo-600 transition-transform group-hover:scale-105">
                <Sparkles className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
              </div>
              <h3 className="text-[14.5px] sm:text-[15.5px] font-bold text-zinc-950 leading-snug tracking-tight">
                100% chilled AC & <br />
                sanitized fleet
              </h3>
            </motion.div>

            {/* CARD 4 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="group relative bg-white rounded-3xl border border-zinc-200/80 p-5 sm:p-6 flex flex-col justify-between aspect-square shadow-[0_4px_25px_rgba(0,0,0,0.02)] hover:shadow-[0_16px_35px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#0C284A]/10 flex items-center justify-center text-[#1758A5] transition-transform group-hover:scale-105">
                <ShieldCheck className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
              </div>
              <h3 className="text-[14.5px] sm:text-[15.5px] font-bold text-zinc-950 leading-snug tracking-tight">
                Surge-free <br />
                transparent rates
              </h3>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          PAGE 6: FREQUENTLY ASKED QUESTIONS (FAQ ACCORDION)
         ========================================================================= */}
      <section className="relative w-full py-16 sm:py-20 px-6 sm:px-12 lg:px-16 bg-[#fdfdfd] border-t border-zinc-100">
        <div className="max-w-[920px] mx-auto">
          <div className="text-center mb-10">
            <span className="text-[11px] font-bold tracking-[0.24em] text-zinc-400 uppercase font-sans mb-2 block">
              Clear & Transparent
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-zinc-950 tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((faq, index) => {
              const isOpen = expandedFaqIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-zinc-200/80 bg-white overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFaqIndex(isOpen ? null : index)}
                    className="w-full px-6 py-4.5 flex items-center justify-between text-left focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="text-[15px] font-bold text-zinc-900 pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-zinc-400 transition-transform duration-200 flex-shrink-0 ${
                        isOpen ? "rotate-180 text-zinc-900" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="px-6 pb-5 pt-1 text-[14px] text-zinc-600 leading-relaxed border-t border-zinc-100">
                          {faq.answer}
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
          PAGE 7: DRIVE WITH ZENITH TODAY (CTA BANNER)
         ========================================================================= */}
      <section
        id="cta"
        className="relative w-full flex flex-col items-center justify-between px-6 sm:px-12 lg:px-16 pt-6 pb-14 bg-[#fdfdfd] scroll-mt-24"
      >
        <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center">
          {/* SIGNBOARD GRADIENT LUXURY CTA BANNER CARD */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full rounded-[36px] sm:rounded-[44px] bg-gradient-to-br from-[#0c284a] via-[#103866] to-[#1758a5] p-10 sm:p-16 lg:p-20 text-center overflow-hidden shadow-[0_25px_60px_rgba(12,40,74,0.22)] border border-[#1758a5]/30"
          >
            {/* Subtle Lighting Rings */}
            <div className="absolute inset-0 pointer-events-none opacity-35 select-none">
              <svg
                viewBox="0 0 1000 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full object-cover"
              >
                <circle cx="850" cy="200" r="240" stroke="rgba(255, 255, 255, 0.14)" strokeWidth="1.2" />
                <circle cx="850" cy="200" r="340" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" />
                <circle cx="700" cy="140" r="5" fill="rgba(255, 255, 255, 0.35)" />
                <circle cx="940" cy="290" r="4" fill="rgba(255, 255, 255, 0.3)" />
              </svg>
            </div>

            <div className="relative z-10 flex flex-col items-center max-w-2xl mx-auto">
              <h2 className="text-[34px] sm:text-[46px] lg:text-[52px] font-extrabold tracking-[-0.03em] text-white leading-[1.12]">
                Drive with Zenith Today
              </h2>

              <p className="mt-4 sm:mt-5 text-[15px] sm:text-[16.5px] lg:text-[17px] text-blue-100/80 leading-relaxed max-w-lg">
                Get the app to explore the world of premium <br className="hidden sm:inline" />
                mobility in Daman — that&apos;s exciting
              </p>

              <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4">
                <a
                  href="#app"
                  className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-white text-black text-[14px] font-semibold hover:bg-zinc-100 hover:shadow-lg transition-all duration-200 shadow-md active:scale-95"
                >
                  <svg
                    viewBox="0 0 170 170"
                    className="w-4 h-4 fill-current transition-transform group-hover:scale-110"
                  >
                    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.67-7.81-11.94-14.3-6.74-10.32-12.01-22.18-15.82-35.58-3.81-13.4-5.72-25.96-5.72-37.68 0-14.02 3.87-25.86 11.6-35.52 7.74-9.66 17.43-14.61 29.08-14.85 4.57 0 9.78 1.25 15.63 3.75 5.85 2.5 9.77 3.75 11.75 3.75 1.52 0 5.66-1.33 12.42-3.99 6.76-2.66 12.29-3.79 16.59-3.39 12.39.99 22.09 5.56 29.1 13.72-10.88 6.53-16.2 15.53-15.96 27 0 9.78 3.81 17.88 11.43 24.3 7.62 6.42 16.71 10.05 27.27 10.89-2.29 6.96-5.11 14.15-8.47 21.57zM119.22 31.84c0-7.39 2.72-14.35 8.16-20.88 5.44-6.53 12.18-10.51 20.22-11.96.22 1.19.33 2.28.33 3.27 0 7.39-2.83 14.46-8.49 21.2-5.66 6.74-12.63 10.66-20.9 11.77-.22-1.08-.32-2.21-.32-3.4z" />
                  </svg>
                  <span>Download App</span>
                </a>

                <a
                  href={`tel:${ZENITH_COMPANY_INFO.phoneRaw}`}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white/10 backdrop-blur-md text-white text-[14px] font-semibold border border-white/20 hover:bg-white/20 transition-all duration-200"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call {ZENITH_COMPANY_INFO.phone}</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================================
          WORLD-CLASS 4-COLUMN ENTERPRISE FOOTER
         ========================================================================= */}
      <footer className="w-full bg-[#09090b] text-white pt-16 sm:pt-20 pb-10 border-t border-zinc-800">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-14 border-b border-zinc-800">
            {/* Column 1: Entity Credentials & Signboard Details */}
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                  <div className="w-3.5 h-3.5 rounded-full border-[2.5px] border-black border-r-transparent rotate-[-45deg]" />
                </div>
                <span className="text-2xl font-black tracking-tight text-white font-sans">
                  Zenith
                </span>
              </div>

              <p className="text-[13.5px] leading-relaxed text-zinc-400 mb-4">
                {ZENITH_COMPANY_INFO.legalName} &bull; Operating mobility infrastructure across Dadra & Nagar Haveli and Daman & Diu since 2006.
              </p>

              <div className="text-[12px] text-zinc-400 space-y-1.5 font-mono">
                <p>GSTIN: <span className="text-zinc-200 font-bold">{ZENITH_COMPANY_INFO.gstin}</span></p>
                <p className="font-sans text-zinc-400 leading-normal">{ZENITH_COMPANY_INFO.address}</p>
              </div>
            </div>

            {/* Column 2: Mobility Services */}
            <div>
              <h4 className="text-[13px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-4">
                Mobility Services
              </h4>
              <ul className="space-y-2.5 text-[14px] text-zinc-400">
                <li><a href="#services" className="hover:text-white transition-colors">Cab Hailing (Daman & Vapi)</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Self-Drive Car Rental</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Vapi Railway Station Drops</a></li>
                <li><a href="#cars" className="hover:text-white transition-colors">Mahindra Thar 4x4 Beach Cruiser</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Intercity Transfers (Surat & Mumbai)</a></li>
              </ul>
            </div>

            {/* Column 3: Company & Ecosystem (with Careers redirect) */}
            <div>
              <h4 className="text-[13px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-4">
                Company & Ecosystem
              </h4>
              <ul className="space-y-2.5 text-[14px] text-zinc-400">
                <li><a href="#about" className="hover:text-white transition-colors">About Zenith Fleets</a></li>
                <li>
                  <a
                    href={ZENITH_COMPANY_INFO.careersUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-zinc-300 hover:text-white transition-colors"
                  >
                    <span>Careers</span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10.5px] font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>We&apos;re Hiring</span>
                    </span>
                    <ExternalLink className="w-3 h-3 text-zinc-500 group-hover:text-white" />
                  </a>
                </li>
                <li>
                  <a
                    href={ZENITH_COMPANY_INFO.driverWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors text-zinc-300"
                  >
                    Driver Partner Program (100 Operators)
                  </a>
                </li>
                <li><span className="text-zinc-500">Khelo India Diu Official Partner</span></li>
                <li><span className="text-zinc-500">G20 Summit Fleet Operations</span></li>
              </ul>
            </div>

            {/* Column 4: 24/7 Operations Desk & Social Links */}
            <div>
              <h4 className="text-[13px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-4">
                24/7 Operations Desk
              </h4>
              <div className="space-y-3 text-[14px] text-zinc-400 mb-6">
                <div>
                  <span className="block text-[11px] text-zinc-500 uppercase font-semibold">Direct Helpline</span>
                  <a href={`tel:${ZENITH_COMPANY_INFO.phoneRaw}`} className="text-white font-bold hover:text-[#1758A5] transition-colors text-base">
                    {ZENITH_COMPANY_INFO.phone}
                  </a>
                </div>
                <div>
                  <span className="block text-[11px] text-zinc-500 uppercase font-semibold">Email Desk</span>
                  <a href={`mailto:${ZENITH_COMPANY_INFO.email}`} className="text-zinc-300 hover:text-white transition-colors">
                    {ZENITH_COMPANY_INFO.email}
                  </a>
                </div>
              </div>

              {/* Social Media Monochrome Icons */}
              <div className="pt-2">
                <span className="block text-[11px] text-zinc-500 uppercase font-semibold mb-3">Connect With Us</span>
                <div className="flex items-center gap-2.5">
                  {SOCIAL_LINKS.map((social) => (
                    <a
                      key={social.id}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-600 hover:-translate-y-0.5 transition-all duration-200"
                      aria-label={`Visit Zenith on ${social.name}`}
                      title={social.name}
                    >
                      {renderSocialIcon(social.iconName)}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sub-Footer Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
              <p>&copy; {new Date().getFullYear()} {ZENITH_COMPANY_INFO.legalName}. All Rights Reserved.</p>
              <span className="hidden sm:inline text-zinc-700">&bull;</span>
              <p className="text-zinc-400">Serving Daman, Vapi, Silvassa, Valsad &amp; Umargam</p>
            </div>

            <div className="flex items-center gap-6">
              <button
                type="button"
                onClick={() => setLegalModal("terms")}
                className="hover:text-zinc-300 transition-colors focus:outline-none"
              >
                Terms of Service
              </button>
              <button
                type="button"
                onClick={() => setLegalModal("privacy")}
                className="hover:text-zinc-300 transition-colors focus:outline-none"
              >
                Privacy Policy
              </button>
              <a
                href={ZENITH_COMPANY_INFO.exactableUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-zinc-300 text-zinc-500 font-medium inline-flex items-center gap-1 transition-colors"
              >
                <span>Crafted by Exactable</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* =========================================================================
          INTERACTIVE VEHICLE QUICK-VIEW MODAL / DRAWER
         ========================================================================= */}
      <AnimatePresence>
        {selectedVehicle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedVehicle(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full max-w-[640px] max-h-[90vh] overflow-y-auto rounded-3xl bg-white border border-zinc-200/90 shadow-2xl p-6 sm:p-8 text-left"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedVehicle(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 hover:text-black transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#1758A5]">
                  {selectedVehicle.type}
                </span>
                {selectedVehicle.tag && (
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-900 border border-zinc-200">
                    {selectedVehicle.tag}
                  </span>
                )}
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight">
                {selectedVehicle.name}
              </h3>
              <p className="text-sm text-zinc-500 mt-1 mb-5">
                {selectedVehicle.popularFor}
              </p>

              {/* Modal Image */}
              <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-[#f7f7f9] border border-zinc-100 mb-5">
                <Image
                  src={selectedVehicle.image}
                  alt={selectedVehicle.name}
                  fill
                  className="object-contain p-4"
                />
              </div>

              {/* Detailed 6-Item Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs text-zinc-700 mb-4">
                <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-100">
                  <span className="text-[10px] text-zinc-400 uppercase font-bold block mb-0.5">Seating</span>
                  <span className="font-semibold text-zinc-900">{selectedVehicle.seats}</span>
                </div>
                <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-100">
                  <span className="text-[10px] text-zinc-400 uppercase font-bold block mb-0.5">Transmission</span>
                  <span className="font-semibold text-zinc-900">{selectedVehicle.transmission}</span>
                </div>
                <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-100">
                  <span className="text-[10px] text-zinc-400 uppercase font-bold block mb-0.5">Air Conditioning</span>
                  <span className="font-semibold text-zinc-900">{selectedVehicle.specs.ac}</span>
                </div>
                <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-100">
                  <span className="text-[10px] text-zinc-400 uppercase font-bold block mb-0.5">Luggage</span>
                  <span className="font-semibold text-zinc-900">{selectedVehicle.luggage}</span>
                </div>
                <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-100">
                  <span className="text-[10px] text-zinc-400 uppercase font-bold block mb-0.5">Engine Spec</span>
                  <span className="font-semibold text-zinc-900">{selectedVehicle.specs.engine}</span>
                </div>
                <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-100">
                  <span className="text-[10px] text-zinc-400 uppercase font-bold block mb-0.5">Deposit</span>
                  <span className="font-semibold text-zinc-900">{selectedVehicle.specs.securityDeposit || "Nil (Cabs)"}</span>
                </div>
              </div>

              {/* Document Requirement & Safety Note */}
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-zinc-50 border border-zinc-100 text-[11.5px] text-zinc-600 mb-6">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>
                  {selectedVehicle.category === "cabs"
                    ? "100% Chilled AC &bull; GPS Tracked &bull; Zero Baggage Fees"
                    : "Self-Drive: Original Indian Driving License + Aadhaar &bull; Min 21 Yrs"}
                </span>
              </div>

              {/* Pricing & Booking Actions */}
              <div className="pt-4 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  {selectedVehicle.selfDriveRate && (
                    <span className="text-xl font-black text-zinc-950 block">
                      {selectedVehicle.selfDriveRate} <span className="text-xs font-normal text-zinc-500">(Self-Drive)</span>
                    </span>
                  )}
                  {selectedVehicle.cabRate && (
                    <span className="text-sm font-semibold text-[#1758A5] block">
                      Cab: {selectedVehicle.cabRate}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <a
                    href={`tel:${ZENITH_COMPANY_INFO.phoneRaw}`}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-black text-white text-sm font-semibold hover:bg-zinc-800 transition-colors shadow-xs"
                  >
                    <Phone className="w-4 h-4 text-[#1758A5]" />
                    <span>Call to Book</span>
                  </a>
                  <a
                    href={ZENITH_COMPANY_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition-colors shadow-xs"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          LEGAL TERMS & PRIVACY MODAL
         ========================================================================= */}
      <AnimatePresence>
        {legalModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLegalModal(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full max-w-[620px] max-h-[85vh] overflow-y-auto rounded-3xl bg-white border border-zinc-200/90 shadow-2xl p-6 sm:p-8 text-left"
            >
              <button
                onClick={() => setLegalModal(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 hover:text-black transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <span className="text-xs font-bold uppercase tracking-widest text-[#1758A5] block mb-1">
                Zenith Fleets Pvt. Ltd. Legal
              </span>
              <h3 className="text-2xl font-black text-zinc-950 tracking-tight mb-4">
                {legalModal === "terms" ? "Terms of Service" : "Privacy Policy"}
              </h3>

              <div className="space-y-4 text-xs sm:text-[13px] text-zinc-600 leading-relaxed">
                {legalModal === "terms" ? (
                  <>
                    <p>
                      <strong>1. Operational Jurisdiction:</strong> Zenith operates commercial mobility assets registered under GSTIN 26AACCZ8331J1Z0 across the Union Territory of Dadra &amp; Nagar Haveli and Daman &amp; Diu, and contiguous Gujarat corridors.
                    </p>
                    <p>
                      <strong>2. Cab Hailing Services:</strong> Fares are metered or fixed upfront based on approved RTO commercial tariff guidelines. Airport and railway station transfers include station platform pickup and zero luggage charges.
                    </p>
                    <p>
                      <strong>3. Self-Drive Rental Eligibility:</strong> Renters must be at least 21 years of age with a valid Indian driving license and government ID (Aadhaar or Passport). Commercial tourist permits permit interstate travel across Gujarat and Maharashtra.
                    </p>
                    <p>
                      <strong>4. Security Deposits:</strong> Self-drive security deposits are fully refundable within 24 hours of vehicle return inspection subject to speed governor compliance (80 km/h RTO standard).
                    </p>
                    <p>
                      <strong>5. 24/7 Helpline:</strong> All dispatch and grievance escalations are monitored through our central operations room at +91 99791 11678.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      <strong>1. Information Collection:</strong> Zenith collects basic trip coordinates, telephone numbers, and digital identification strictly for vehicle dispatch, driver verification, and RTO regulatory compliance.
                    </p>
                    <p>
                      <strong>2. Location &amp; Telemetry Data:</strong> Real-time GPS data is monitored solely during active trips for passenger safety and emergency roadside assistance.
                    </p>
                    <p>
                      <strong>3. Third-Party Sharing:</strong> We do not sell or monetize personal customer records. Data is transmitted securely for FastTag tolls, digital invoicing, and lawful law enforcement requests.
                    </p>
                    <p>
                      <strong>4. Contact &amp; Inquiries:</strong> Direct data inquiries may be submitted to zenithfleets@gmail.com or by visiting 24/25 Royal Millenium, Vapi-Daman Main Road.
                    </p>
                  </>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-100 flex justify-end">
                <button
                  type="button"
                  onClick={() => setLegalModal(null)}
                  className="px-6 py-2.5 rounded-full bg-black text-white text-xs font-semibold hover:bg-zinc-800 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          FLOATING BACK-TO-TOP & WHATSAPP QUICK CHAT
         ========================================================================= */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3">
        {/* Floating WhatsApp Quick Connect */}
        <a
          href={ZENITH_COMPANY_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg hover:bg-emerald-700 hover:scale-110 active:scale-95 transition-all duration-200"
          title="Chat with Zenith Operations on WhatsApp"
          aria-label="WhatsApp Operations Desk"
        >
          <MessageCircle className="w-6 h-6" />
        </a>

        {/* Back to Top */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full bg-white border border-zinc-200 text-zinc-700 hover:text-black hover:bg-zinc-50 flex items-center justify-center shadow-md active:scale-95 transition-all"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
