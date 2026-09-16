"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
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
  ChevronDown,
  Award,
  Trophy,
  Landmark,
  Building2,
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

/* ─────────────────────────────────────────────────────────────────────────────
   SCROLL-LINKED FEATURE CARD (Awwwards-style parallax exit)
   As user scrolls past the card, it translates upward out of frame & fades.
   On scroll back up, it smoothly reverses back into place.
   Each card is staggered by index so they enter/exit one by one.
   ───────────────────────────────────────────────────────────────────────────── */
function ScrollFeatureCard({
  children,
  index,
  className,
}: {
  children: React.ReactNode;
  index: number;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Track the card's scroll progress through the viewport
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // Stagger offset per card — each card's keyframes shift slightly later
  const stagger = index * 0.06;

  const entryStart = Math.min(0 + stagger, 0.25);
  const entryEnd = Math.min(0.2 + stagger, 0.35);

  const exitStart = Math.min(0.6 + stagger, 0.78);
  const exitEnd = Math.min(0.88 + stagger, 0.98);

  const y = useTransform(
    scrollYProgress,
    [entryStart, entryEnd, exitStart, exitEnd],
    [110, 0, 0, -120]
  );
  const opacity = useTransform(
    scrollYProgress,
    [entryStart, entryEnd, exitStart, exitEnd],
    [0, 1, 1, 0]
  );
  const scale = useTransform(
    scrollYProgress,
    [entryStart, entryEnd, exitStart, exitEnd],
    [0.90, 1, 1, 0.90]
  );

  return (
    <motion.div
      ref={cardRef}
      style={{ y, opacity, scale }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   E-COMMERCE FLEET IMAGE BOX (Scroll-Linked Rising from Below & Fade)
   The box container where the image resides fades in and rises from below
   along with the car photography, zooming cleanly on hover.
   ───────────────────────────────────────────────────────────────────────────── */
function ScrollFleetVehicleImage({ src, alt }: { src: string; alt: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Scroll progress: enters from bottom (0), full view (0.28-0.72), exits top (1.0)
  const scrollY = useTransform(scrollYProgress, [0, 0.28, 0.72, 1], [65, 0, 0, -55]);
  const scrollScale = useTransform(scrollYProgress, [0, 0.28, 0.72, 1], [0.88, 1, 1, 0.88]);
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.22, 0.78, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={containerRef}
      style={{ y: scrollY, scale: scrollScale, opacity: scrollOpacity }}
      className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-5 bg-gradient-to-b from-zinc-50 to-zinc-100/70 border border-zinc-200/70 p-2 shadow-xs group-hover:shadow-md transition-shadow pointer-events-auto"
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 400px"
        className="object-contain p-2.5 transition-transform duration-500 ease-out group-hover:scale-110"
      />
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   APP PHONES SHOWCASE (One-by-One Slide from Bottom Reveal on Every Entry)
   Every time the user slides/scrolls to Section 4, the phone mockups ascend
   from below one by one with physics ease ([0.16, 1, 0.3, 1]) and remain
   rock-solid in place at rest with zero continuous bobbing.
   ───────────────────────────────────────────────────────────────────────────── */
function AppPhonesShowcase() {
  return (
    <div className="relative w-full flex items-center justify-center lg:justify-start min-h-[460px] sm:min-h-[580px] lg:min-h-[640px]">
      {/* Ambient Radial Lighting Glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.45, scale: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        className="absolute w-[360px] sm:w-[500px] h-[360px] sm:h-[500px] bg-gradient-to-tr from-[#1758A5]/15 via-blue-100/30 to-transparent rounded-full blur-3xl pointer-events-none -z-10"
      />

      <div className="relative w-full max-w-[500px] sm:max-w-[580px] lg:max-w-[620px] h-[480px] sm:h-[580px] lg:h-[620px] flex items-center justify-center">
        {/* BACK PHONE (Phone 1 of 2): phone2.png (Navigation Screen) — slides up first */}
        <motion.div
          initial={{ opacity: 0, y: 160, scale: 0.92 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          style={{ transform: "rotate(-7deg)" }}
          className="absolute left-[0%] sm:left-[3%] lg:left-[0%] top-[10%] sm:top-[8%] w-[230px] sm:w-[290px] lg:w-[330px] z-10"
        >
          <div className="relative w-full aspect-[1/2.05] drop-shadow-[-20px_25px_35px_rgba(0,0,0,0.18)]">
            <Image
              src="/phone2.png"
              alt="Zenith App Route Navigation Screen"
              fill
              sizes="(max-width: 768px) 280px, 350px"
              className="object-contain"
              priority
            />
          </div>
        </motion.div>

        {/* FRONT PHONE (Phone 2 of 2): phone1.png (Booking Screen) — slides up second (one by one) */}
        <motion.div
          initial={{ opacity: 0, y: 220, scale: 0.90 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.9, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
          style={{ transform: "rotate(7deg)" }}
          className="absolute right-[0%] sm:right-[5%] lg:right-[26%] top-[0%] sm:top-[2%] w-[240px] sm:w-[300px] lg:w-[340px] z-25"
        >
          <div className="relative w-full aspect-[1/1.5] drop-shadow-[25px_30px_45px_rgba(0,0,0,0.22)]">
            <Image
              src="/phone1.png"
              alt="Zenith App Fleet Booking Screen"
              fill
              sizes="(max-width: 768px) 290px, 360px"
              className="object-contain"
              priority
            />
          </div>
        </motion.div>

        {/* Floating Glassmorphic Badge: Live GPS Telemetry */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.85 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute -top-3 sm:top-2 -right-2 sm:right-4 z-30 px-3.5 py-2 rounded-2xl bg-white/95 backdrop-blur-xl border border-zinc-200/80 shadow-lg flex items-center gap-2 text-xs font-bold text-zinc-900 pointer-events-none"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="hidden sm:inline">Active &bull; Live GPS Telemetry</span>
          <span className="sm:hidden">GPS Active</span>
        </motion.div>

        {/* Floating Glassmorphic Badge: 3-Min Pickup */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.85 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="absolute -bottom-4 sm:bottom-4 -left-2 sm:left-4 z-30 px-3.5 py-2 rounded-2xl bg-white/95 backdrop-blur-xl border border-zinc-200/80 shadow-lg flex items-center gap-2 text-xs font-bold text-zinc-900 pointer-events-none"
        >
          <div className="w-5 h-5 rounded-full bg-blue-50 text-[#1758A5] flex items-center justify-center text-[10px] font-bold">
            ⚡
          </div>
          <span>3-Min Pickup in Daman</span>
        </motion.div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   SCROLL-LINKED HERO SECTION (Starts at opacity 1, fades out as user scrolls past)
   ───────────────────────────────────────────────────────────────────────────── */
function ScrollHeroSection({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.65, 0.98], [1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.65, 0.98], [0, 0, -60]);
  const scale = useTransform(scrollYProgress, [0, 0.65, 0.98], [1, 1, 0.96]);

  return (
    <motion.main
      ref={heroRef}
      style={{ opacity, y, scale }}
      className={className}
    >
      {children}
    </motion.main>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   SCROLL-LINKED SECTION (Fades in on entry, solid in view, fades out on exit)
   ───────────────────────────────────────────────────────────────────────────── */
function ScrollSection({
  children,
  className,
  id,
  noTransform = false,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  noTransform?: boolean;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Fade in on entry (0 -> 0.16), full opacity (0.16 -> 0.84), fade out on exit (0.84 -> 1.0)
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.16, 0.84, 1.0],
    [0, 1, 1, 0]
  );
  const y = useTransform(
    scrollYProgress,
    [0, 0.16, 0.84, 1.0],
    noTransform ? [0, 0, 0, 0] : [45, 0, 0, -45]
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.16, 0.84, 1.0],
    noTransform ? [1, 1, 1, 1] : [0.97, 1, 1, 0.97]
  );

  return (
    <motion.section
      ref={sectionRef}
      id={id}
      style={{ opacity, y, scale }}
      className={className}
    >
      {children}
    </motion.section>
  );
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
    if (typeof window !== "undefined" && (window as any).lenisInstance) {
      (window as any).lenisInstance.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
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
      imageSrc: "/cars/hero-thar.png",
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
      imageSrc: "/cars/hero-dzire.png",
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
      imageSrc: "/cars/hero-thar-red.png",
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
      imageSrc: "/cars/hero-ertiga.png",
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
        className={`fixed top-0 left-0 w-full z-50 px-6 sm:px-12 lg:px-16 transition-all duration-300 flex items-center justify-between ${isScrolled
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
            className="group flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-[#1758A5] text-white text-[13.5px] font-semibold hover:bg-[#103866] transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white group-hover:scale-125 transition-transform" />
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
                className="inline-flex items-center justify-center gap-2.5 w-full py-3 rounded-full bg-[#1758A5] text-white text-base font-semibold hover:bg-[#103866] transition-colors shadow-md"
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
      <ScrollHeroSection className="relative min-h-screen lg:h-screen lg:max-h-screen w-full flex flex-col justify-between overflow-x-hidden lg:overflow-hidden pt-20 sm:pt-24 lg:pt-16">
        {/* HERO MAIN CONTENT AREA */}
        <section className="relative w-full max-w-[1580px] mx-auto px-6 sm:px-12 lg:px-16 flex-1 flex flex-col justify-center my-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center min-h-[420px] lg:min-h-[460px]">
            {/* LEFT COLUMN: DYNAMIC HEADLINE, SUBTITLE & ACTION (TEXT LOADS FIRST) */}
            <div className="lg:col-span-5 z-20 flex flex-col justify-center pb-6 lg:pb-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentHero.id}
                  className="flex flex-col"
                >
                  {/* Floating Highlight Badge - Step 1 */}
                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 text-zinc-800 text-[12px] font-semibold border border-zinc-200/80 mb-4 w-fit shadow-2xs"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1758A5] animate-pulse" />
                    <span>{currentHero.tag}</span>
                    <span className="text-zinc-400">&bull;</span>
                    <span className="text-[#1758A5] font-bold">{currentHero.priceBadge}</span>
                  </motion.div>

                  {/* Main Headline - Step 2 (Masked Blur Reveal) */}
                  <motion.h1
                    initial={{ opacity: 0, y: 35, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -25, filter: "blur(6px)" }}
                    transition={{ duration: 0.72, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
                    className="text-[44px] sm:text-[54px] md:text-[64px] lg:text-[58px] xl:text-[72px] font-extrabold tracking-[-0.035em] leading-[1.03] text-black whitespace-pre-line"
                  >
                    {currentHero.headline}
                  </motion.h1>

                  {/* Subtitle Paragraph - Step 3 */}
                  <motion.p
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.6, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-5 sm:mt-6 text-zinc-600 text-[15px] sm:text-[16px] lg:text-[15.5px] xl:text-[17px] leading-[1.58] max-w-[420px] font-normal"
                  >
                    {currentHero.subtitle}
                  </motion.p>

                  {/* CTA Action Button - Step 4 */}
                  <motion.div
                    initial={{ opacity: 0, y: 16, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.55, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-7 flex items-center gap-4"
                  >
                    <a
                      href={currentHero.ctaAction}
                      target={currentHero.ctaAction.startsWith("http") ? "_blank" : undefined}
                      rel={currentHero.ctaAction.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="group inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-[#1758A5] text-white text-[14px] font-semibold hover:bg-[#103866] transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
                    >
                      <span>{currentHero.ctaText}</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* RIGHT COLUMN: DYNAMIC CAR & MAP ROUTE NETWORK (SLIDES IN FROM RIGHT AFTER TEXT) */}
            <div className="lg:col-span-7 relative w-full h-[340px] sm:h-[440px] lg:h-[520px] xl:h-[580px] flex items-end justify-end overflow-visible">
              {/* Map Background Image */}
              <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 0.32, scale: 1.1 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full h-full max-w-[900px] max-h-[580px] [mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_85%)]"
                >
                  <Image
                    src="/map.png"
                    alt="Map Navigation Daman"
                    fill
                    priority
                    sizes="(max-width: 1200px) 750px, 1000px"
                    className="object-contain object-center scale-110"
                  />
                </motion.div>
              </div>

              {/* Dynamic Vehicle Cutout - Stuck to Right Edge & Scaled Up */}
              <div className="relative z-10 w-full max-w-[620px] sm:max-w-[780px] lg:max-w-[960px] xl:max-w-[1140px] 2xl:max-w-[1280px] mr-0 sm:-mr-12 lg:-mr-20 xl:-mr-28 2xl:-mr-36 flex flex-col items-end">
                {/* Floating Live Telemetry Badge (Slides & Pops in after car entrance) */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`telemetry-${currentHero.id}`}
                    initial={{ opacity: 0, y: 15, scale: 0.92 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.92 }}
                    transition={{ delay: 0.85, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    className="hidden sm:flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-white/95 backdrop-blur-md border border-zinc-200/90 shadow-[0_8px_25px_rgba(0,0,0,0.06)] absolute top-2 sm:top-4 left-2 sm:left-8 z-20"
                  >
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <div className="flex flex-col text-left">
                      <span className="text-[9.5px] font-bold uppercase tracking-wider text-zinc-400">Live Fleet Radar</span>
                      <span className="text-[12px] font-bold text-zinc-900">Active in Daman &bull; 3m ETA</span>
                    </div>
                  </motion.div>
                </AnimatePresence>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentHero.id}
                    className="relative flex flex-col items-end w-full"
                  >
                    {/* Cinematic Entrance: Car slides in smoothly from the right AFTER text */}
                    <motion.div
                      initial={{ opacity: 0, x: 260, scale: 0.94 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -160, scale: 0.94 }}
                      transition={{ duration: 0.85, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
                      className="relative w-full flex flex-col items-end origin-right-bottom"
                    >
                      <div className="relative w-full aspect-[16/9] sm:aspect-[16/8.5] lg:aspect-[16/8]">
                        <Image
                          src={currentHero.imageSrc}
                          alt={currentHero.imageAlt}
                          fill
                          priority
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1300px"
                          className="object-contain object-right-bottom scale-[1.08] sm:scale-[1.16] lg:scale-[1.22] xl:scale-[1.26] origin-right-bottom drop-shadow-xl"
                        />
                      </div>

                      {/* Synchronized Solid Ground Shadow & Tire Contact */}
                      <motion.div
                        initial={{ opacity: 0, scaleX: 0.6, x: 90 }}
                        animate={{ opacity: 1, scaleX: 1, x: 0 }}
                        exit={{ opacity: 0, scaleX: 0.6, x: -60 }}
                        transition={{ duration: 0.85, delay: 0.52, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full flex flex-col items-end pointer-events-none"
                      >
                        <div className="w-[90%] h-6 sm:h-8 lg:h-9 -mt-4 sm:-mt-6 lg:-mt-7 mr-[2%] car-shadow" />
                        <div className="w-[80%] h-4 sm:h-5 lg:h-6 -mt-4 sm:-mt-5 mr-[6%] car-contact-shadow" />
                      </motion.div>
                    </motion.div>
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
              {heroServices.map((service, index) => {
                const isActive = activeHeroTab === service.id;
                const IconComponent = service.icon;

                return (
                  <motion.button
                    key={service.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.05 + 0.15,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    onClick={() => setActiveHeroTab(service.id)}
                    className={`group relative flex items-center justify-center p-2.5 sm:p-3 transition-colors duration-300 focus:outline-none ${isActive ? "text-zinc-950 font-bold" : "text-zinc-400 hover:text-zinc-700 hover:scale-105 font-medium"
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
                  </motion.button>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: heroServices.length * 0.05 + 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex-shrink-0 pl-1 sm:pl-2"
            >
              <button
                onClick={handleNextHeroTab}
                className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#1758A5] text-white hover:bg-[#103866] shadow-xs hover:shadow-sm transition-all duration-150 active:scale-95 focus:outline-none"
                aria-label="Next service"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        </footer>
      </ScrollHeroSection>

      {/* =========================================================================
          INSTITUTIONAL CREDENTIALS & TRUST BAR (LUXURY AUTHORITY CARDS)
         ========================================================================= */}
      <ScrollSection className="w-full border-y border-zinc-200/80 bg-zinc-50/50 py-6 sm:py-8 px-6 sm:px-12 lg:px-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 lg:gap-5">
            {[
              {
                id: "heritage",
                icon: Award,
                iconBg: "bg-blue-50 border-blue-100 text-[#1758A5]",
                title: "19+ Years",
                badge: "Est. 2006",
                badgeStyle: "text-blue-700 bg-blue-50 border-blue-200/60",
                subtitle: "Daman & Diu Union Territory",
              },
              {
                id: "assets",
                icon: Building2,
                iconBg: "bg-emerald-50 border-emerald-100 text-emerald-600",
                title: "250+ Fleet Assets",
                badge: null,
                badgeStyle: "",
                subtitle: "100% Company-Owned Cars",
              },
              {
                id: "khelo-india",
                icon: Trophy,
                iconBg: "bg-amber-50 border-amber-100 text-amber-600",
                title: "Khelo India Games",
                badge: null,
                badgeStyle: "",
                subtitle: "Official Fleet Partner '24 & '25",
              },
              {
                id: "g20",
                icon: Landmark,
                iconBg: "bg-zinc-100 border-zinc-200 text-zinc-900",
                title: "G20 Summit",
                badge: "Official",
                badgeStyle: "text-zinc-700 bg-zinc-100 border-zinc-200/60",
                subtitle: "Government Protocol Mobility",
              },
            ].map((item, index) => {
              const IconComp = item.icon;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, amount: 0.2 }}
                  whileHover={{ y: -6, scale: 1.015, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.09,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group relative flex items-center gap-4 p-4 sm:p-4.5 rounded-2xl bg-white border border-zinc-200/80 luxury-card-glow hover:border-zinc-300 transition-all duration-300 cursor-default"
                >
                  <div className={`w-11 h-11 rounded-xl border flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 ${item.iconBg}`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[14.5px] sm:text-[15.5px] font-extrabold text-zinc-950 tracking-tight truncate">{item.title}</span>
                      {item.badge && (
                        <span className={`text-[11px] font-semibold px-1.5 py-0.5 rounded-md border ${item.badgeStyle}`}>
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-[12px] text-zinc-500 font-medium truncate mt-0.5">{item.subtitle}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </ScrollSection>

      {/* =========================================================================
          SECTION 2: DUAL MOBILITY MODES (INTERACTIVE SWITCHER & DETAILS)
         ========================================================================= */}
      <ScrollSection
        id="services"
        className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 sm:px-12 lg:px-16 py-20 lg:py-28 bg-white border-t border-zinc-100 scroll-mt-20 overflow-hidden"
      >
        <div id="about" className="scroll-mt-24" />
        <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center">
          {/* Header with Smooth Scroll Reveal */}
          <motion.div
            initial={{ opacity: 0, y: 55, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center max-w-2xl mb-12"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 text-zinc-700 text-[11px] sm:text-[12px] font-bold tracking-[0.2em] uppercase font-sans mb-3 border border-zinc-200/80"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#1758A5] animate-pulse" />
              <span>One Unified Platform</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30, filter: "blur(5px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="text-[40px] sm:text-[54px] lg:text-[62px] font-black tracking-[-0.035em] text-zinc-950 leading-[1.08]"
            >
              How Zenith Works
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 text-[15px] sm:text-[16.5px] lg:text-[17px] leading-[1.65] text-zinc-600 font-normal"
            >
              Toggle between services below to see transparent rates, verified routes, and pickup details across Daman and Vapi.
            </motion.p>
          </motion.div>

          {/* Service Mode Tabs (Cabs / Self-Drive / Station) */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2 sm:gap-3 p-1.5 rounded-2xl bg-zinc-100 border border-zinc-200/80 mb-12"
          >
            {[
              { id: "cabs" as const, label: "Cab Hailing", icon: Car },
              { id: "self-drive" as const, label: "Self-Drive Rental", icon: Key },
              { id: "station" as const, label: "Station & Outstation", icon: MapPin },
            ].map((tab) => {
              const isSelected = activeServiceMode === tab.id;
              const IconComp = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveServiceMode(tab.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative flex items-center gap-2 py-2.5 px-5 sm:px-7 rounded-xl text-[13.5px] sm:text-[14.5px] font-semibold transition-colors duration-200 focus:outline-none ${isSelected ? "text-zinc-950" : "text-zinc-500 hover:text-zinc-800"
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
                </motion.button>
              );
            })}
          </motion.div>

          {/* Dynamic Service Presentation Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeServiceMode}
              initial={{ opacity: 0, y: 50, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.97 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-[1240px] rounded-3xl bg-[#f8f8fa] border border-zinc-200/80 p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center luxury-card-glow"
            >
              {activeServiceMode === "cabs" && (
                <>
                  <div className="lg:col-span-6 flex flex-col justify-center">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#1758A5] mb-2 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1758A5] animate-pulse" />
                      Point-to-Point Mobility
                    </span>
                    <h3 className="text-3xl sm:text-4xl font-black text-zinc-950 tracking-tight mb-4">
                      Instant On-Demand Cabs in Daman
                    </h3>
                    <p className="text-[15.5px] text-zinc-600 leading-relaxed mb-6">
                      Never deal with meter-less street auto haggling again. Tap to request a clean, air-conditioned cab anywhere in Daman, Nani Daman, or Moti Daman. An assigned driver arrives in minutes at transparent, metered rates.
                    </p>
                    <div className="grid grid-cols-2 gap-3.5 text-sm text-zinc-700 mb-8">
                      {[
                        "Average 3-min ETA",
                        "Starting at ₹14/km",
                        "100% Chilled AC Fleet",
                        "Zero Tourist Surcharges",
                      ].map((item, idx) => (
                        <motion.div
                          key={idx}
                          whileHover={{ scale: 1.02, x: 3 }}
                          transition={{ duration: 0.2 }}
                          className="flex items-center gap-2 p-2 rounded-xl bg-white/80 border border-zinc-200/70 shadow-2xs hover:border-[#1758A5]/30 transition-all"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                          <span className="font-medium text-zinc-800 text-xs sm:text-sm">{item}</span>
                        </motion.div>
                      ))}
                    </div>
                    <div>
                      <motion.a
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        href={`tel:${ZENITH_COMPANY_INFO.phoneRaw}`}
                        className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#1758A5] text-white text-sm font-semibold hover:bg-[#103866] transition-all shadow-xs hover:shadow-md"
                      >
                        <Phone className="w-4 h-4 text-white" />
                        <span>Book Instant Cab ({ZENITH_COMPANY_INFO.phone})</span>
                      </motion.a>
                    </div>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.92, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="lg:col-span-6 relative aspect-[16/10] rounded-3xl overflow-hidden bg-gradient-to-b from-white to-zinc-50 border border-zinc-200/80 shadow-sm flex items-center justify-center p-4 group"
                  >
                    {/* Ambient Glow */}
                    <motion.div
                      animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.65, 0.35] }}
                      transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                      className="absolute w-56 h-56 rounded-full bg-[#1758A5]/12 blur-2xl pointer-events-none"
                    />
                    {/* Floating Car Image */}
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                      className="relative w-full h-full"
                    >
                      <Image
                        src="/cars/swift.jpg"
                        alt="Zenith Maruti Swift Cab Hailing in Daman"
                        fill
                        className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                      />
                    </motion.div>
                    {/* Floating Service Badge */}
                    <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-zinc-200/80 shadow-xs flex items-center gap-1.5 text-[11px] font-bold text-zinc-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Avg 3-Min Dispatch</span>
                    </div>
                  </motion.div>
                </>
              )}

              {activeServiceMode === "self-drive" && (
                <>
                  <div className="lg:col-span-6 flex flex-col justify-center">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#1758A5] mb-2 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1758A5] animate-pulse" />
                      Total Driving Independence
                    </span>
                    <h3 className="text-3xl sm:text-4xl font-black text-zinc-950 tracking-tight mb-4">
                      Self-Drive Car Rentals in Daman
                    </h3>
                    <p className="text-[15.5px] text-zinc-600 leading-relaxed mb-6">
                      Freedom to cruise the coast at your own pace. Choose from rugged Mahindra Thar 4x4 convertibles, compact SUVs, and sedans with doorstep delivery to your beach resort or hotel. Digital keyless unlock and zero paperwork hassle.
                    </p>
                    <div className="grid grid-cols-2 gap-3.5 text-sm text-zinc-700 mb-8">
                      {[
                        "Doorstep Resort Delivery",
                        "Starting at ₹1,199/day",
                        "Permits Cleared for Gujarat",
                        "Unlimited KM Packages",
                      ].map((item, idx) => (
                        <motion.div
                          key={idx}
                          whileHover={{ scale: 1.02, x: 3 }}
                          transition={{ duration: 0.2 }}
                          className="flex items-center gap-2 p-2 rounded-xl bg-white/80 border border-zinc-200/70 shadow-2xs hover:border-[#1758A5]/30 transition-all"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                          <span className="font-medium text-zinc-800 text-xs sm:text-sm">{item}</span>
                        </motion.div>
                      ))}
                    </div>
                    <div>
                      <motion.a
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        href={`tel:${ZENITH_COMPANY_INFO.phoneRaw}`}
                        className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#1758A5] text-white text-sm font-semibold hover:bg-[#103866] transition-all shadow-xs hover:shadow-md"
                      >
                        <Key className="w-4 h-4 text-white" />
                        <span>Rent Self-Drive Car</span>
                      </motion.a>
                    </div>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.92, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="lg:col-span-6 relative aspect-[16/10] rounded-3xl overflow-hidden bg-gradient-to-b from-white to-zinc-50 border border-zinc-200/80 shadow-sm flex items-center justify-center p-4 group"
                  >
                    {/* Ambient Glow */}
                    <motion.div
                      animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.65, 0.35] }}
                      transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                      className="absolute w-56 h-56 rounded-full bg-amber-500/12 blur-2xl pointer-events-none"
                    />
                    {/* Floating Car Image */}
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                      className="relative w-full h-full"
                    >
                      <Image
                        src="/cars/thar.jpg"
                        alt="Mahindra Thar 4x4 Self Drive Rental Daman"
                        fill
                        className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                      />
                    </motion.div>
                    {/* Floating Service Badge */}
                    <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-zinc-200/80 shadow-xs flex items-center gap-1.5 text-[11px] font-bold text-zinc-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                      <span>Doorstep Hotel Drop</span>
                    </div>
                  </motion.div>
                </>
              )}

              {activeServiceMode === "station" && (
                <>
                  <div className="lg:col-span-6 flex flex-col justify-center">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#1758A5] mb-2 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1758A5] animate-pulse" />
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
                          <motion.button
                            key={route.id}
                            type="button"
                            whileHover={{ scale: 1.015, x: 4 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => setSelectedRouteId(route.id)}
                            className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all duration-200 ${isSelected
                              ? "bg-blue-50/70 border-[#1758A5] text-zinc-950 shadow-xs"
                              : "bg-white border-zinc-200/80 text-zinc-700 hover:border-zinc-300"
                              }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <span className={`w-2 h-2 rounded-full ${isSelected ? "bg-[#1758A5] animate-pulse" : "bg-zinc-300"}`} />
                              <span className="font-semibold">{route.from} &rarr; {route.to}</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                              <span className="text-zinc-400 text-xs hidden sm:inline">{route.approxTime}</span>
                              <span className="text-[#1758A5] font-bold">{route.cabEstimate}</span>
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>

                    {/* Active Route Highlight Info Box */}
                    <motion.div
                      layout
                      className="p-3.5 rounded-xl bg-white border border-zinc-200/80 mb-7 flex items-center justify-between text-xs text-zinc-600 shadow-2xs"
                    >
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-[#1758A5] flex-shrink-0" />
                        <span>{activeRoute.highlight}</span>
                      </div>
                      <span className="font-semibold text-zinc-800 ml-2 whitespace-nowrap">
                        {activeRoute.distanceKm} km &bull; {activeRoute.approxTime}
                      </span>
                    </motion.div>

                    <div>
                      <motion.a
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        href={`tel:${ZENITH_COMPANY_INFO.phoneRaw}`}
                        className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#1758A5] text-white text-sm font-semibold hover:bg-[#103866] transition-all shadow-xs hover:shadow-md"
                      >
                        <MapPin className="w-4 h-4 text-white" />
                        <span>Reserve Station Transfer</span>
                      </motion.a>
                    </div>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.92, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="lg:col-span-6 relative aspect-[16/10] rounded-3xl overflow-hidden bg-gradient-to-b from-white to-zinc-50 border border-zinc-200/80 shadow-sm flex items-center justify-center p-4 group"
                  >
                    {/* Ambient Glow */}
                    <motion.div
                      animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.65, 0.35] }}
                      transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                      className="absolute w-56 h-56 rounded-full bg-[#1758A5]/12 blur-2xl pointer-events-none"
                    />
                    {/* Floating Car Image */}
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                      className="relative w-full h-full"
                    >
                      <Image
                        src="/cars/dzire.jpg"
                        alt="Zenith Dzire Station Pickup Vapi to Daman"
                        fill
                        className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                      />
                    </motion.div>
                    {/* Floating Service Badge */}
                    <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-zinc-200/80 shadow-xs flex items-center gap-1.5 text-[11px] font-bold text-zinc-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                      <span>Platform Chauffeur Meet</span>
                    </div>
                  </motion.div>
                </>
              )}
            </motion.div>
          </AnimatePresence>

          {/* THE ZENITH STANDARD VS. STREET CABS COMPARISON */}
          <motion.div
            initial={{ opacity: 0, y: 55, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-[1240px] mt-12 sm:mt-14 rounded-3xl bg-[#f8f8fa] border border-zinc-200/80 p-6 sm:p-10 luxury-card-glow"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-zinc-200/80">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#1758A5] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1758A5] animate-pulse" />
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
              {[
                {
                  title: "Fixed, Upfront Metered Fares",
                  description:
                    "Zenith fares are fixed before you board. Zero unmetered auto haggling, zero unexpected night surcharges, and zero luggage fees.",
                },
                {
                  title: "100% Chilled AC & Sanitized Fleet",
                  description:
                    "Escape coastal humidity. Every company-owned vehicle features high-performance AC, fresh interiors, and GPS route safety.",
                },
                {
                  title: "24/7 Regional Operations Desk",
                  description:
                    "Backed by Zenith Fleets Pvt. Ltd.'s central regional desk with verified chauffeurs, live telemetry, and instant dispatch.",
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.65, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -6, scale: 1.015, transition: { duration: 0.25 } }}
                  className="group flex flex-col p-5 rounded-2xl bg-white border border-zinc-200/70 shadow-2xs hover:shadow-md hover:border-[#1758A5]/30 transition-all duration-300 cursor-default"
                >
                  <div className="flex items-center gap-2 font-bold text-zinc-950 mb-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <span>{item.title}</span>
                  </div>
                  <p className="text-zinc-500 text-xs sm:text-[13px] leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </ScrollSection>

      {/* =========================================================================
          PAGE 3: OUR VEHICLE FLEET SECTION (DYNAMIC FILTERING WITH REAL IMAGES)
         ========================================================================= */}
      <ScrollSection
        id="cars"
        className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 sm:px-12 lg:px-16 py-20 lg:py-28 bg-[#fdfdfd] scroll-mt-24"
      >
        <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center">
          {/* SECTION HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 55, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center max-w-2xl"
          >
            {/* Eyebrow */}
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="text-[11px] sm:text-[12px] font-bold tracking-[0.24em] text-zinc-400 uppercase font-sans mb-3"
            >
              Only the Best Cars
            </motion.span>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 30, filter: "blur(5px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="text-[40px] sm:text-[54px] lg:text-[62px] font-black tracking-[-0.035em] text-zinc-950 leading-[1.08]"
            >
              Our Vehicle Fleet
            </motion.h2>

            {/* Subtitle Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 sm:mt-5 text-[15px] sm:text-[16.5px] lg:text-[17px] leading-[1.65] text-zinc-600 font-normal"
            >
              Every vehicle in our fleet is company-owned, 100% sanitized, and GPS-monitored.
              <br className="hidden sm:inline" />
              Tap any vehicle to view full specifications and instant reservation details.
            </motion.p>
          </motion.div>

          {/* CATEGORY FILTER TABS WITH ANIMATED SLIDING PILL */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mt-8 sm:mt-10"
          >
            {[
              { id: "all", label: "All Vehicles" },
              { id: "cabs", label: "Cab Hailing" },
              { id: "self-drive", label: "Self-Drive" },
              { id: "suv", label: "SUVs & MPVs" },
              { id: "sedan", label: "Sedans" },
            ].map((tab) => {
              const isSelected = activeFleetTab === tab.id;

              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveFleetTab(tab.id)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`relative px-5 sm:px-6 py-2 rounded-xl sm:rounded-2xl text-[13px] sm:text-[14px] font-semibold transition-colors duration-200 focus:outline-none ${isSelected
                    ? "text-white"
                    : "bg-[#f4f4f6] text-zinc-700 hover:bg-zinc-200/80 hover:text-black"
                    }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="fleetTabActivePill"
                      className="absolute inset-0 bg-[#1758A5] rounded-xl sm:rounded-2xl shadow-sm z-0"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </motion.button>
              );
            })}
          </motion.div>

          {/* DYNAMIC FLEET GRID WITH STUDIO-GRADE VEHICLE PHOTOGRAPHY */}
          <motion.div
            layout
            className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-12"
          >
            <AnimatePresence>
              {filteredFleet.map((vehicle, index) => (
                <motion.div
                  key={vehicle.id}
                  layout
                  initial={{ opacity: 0, y: 55, scale: 0.96, filter: "blur(4px)" }}
                  whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                  viewport={{ once: true, amount: 0.1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  whileHover={{ y: -10, scale: 1.015, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
                  transition={{ duration: 0.65, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setSelectedVehicle(vehicle)}
                  className="group relative rounded-3xl bg-white border border-zinc-200/80 p-6 flex flex-col justify-between hover:border-zinc-300 luxury-card-glow transition-all duration-300 overflow-hidden cursor-pointer"
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

                    {/* E-Commerce Product Zoom: Scroll-Linked Entry Zoom & Hover Zoom inside Overflow Container */}
                    <ScrollFleetVehicleImage src={vehicle.image} alt={vehicle.name} />

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

                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedVehicle(vehicle);
                      }}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#1758A5] text-white text-[13px] font-semibold hover:bg-[#103866] transition-colors shadow-xs hover:shadow-md"
                    >
                      <span>View Specs</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* BOTTOM CTA: CALL FLEET DESK */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mt-14 sm:mt-16 flex items-center justify-center"
          >
            <motion.a
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              href={`tel:${ZENITH_COMPANY_INFO.phoneRaw}`}
              className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#1758A5] text-white text-[14px] font-semibold hover:bg-[#103866] transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <span>Call Fleet Desk: {ZENITH_COMPANY_INFO.phone}</span>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-all" />
            </motion.a>
          </motion.div>
        </div>
      </ScrollSection>

      {/* =========================================================================
          PAGE 4: MODERN APP SHOWCASE SECTION
         ========================================================================= */}
      <ScrollSection
        id="app"
        noTransform
        className="relative min-h-screen lg:h-screen w-full flex items-center justify-center px-6 sm:px-12 lg:px-16 py-16 lg:py-0 overflow-hidden bg-[#fdfdfd] scroll-mt-24"
      >
        <div className="relative w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-8">
          {/* LEFT COLUMN: DUAL 3D PHONES SHOWCASE */}
          <div className="lg:col-span-6 xl:col-span-7 relative w-full flex items-center justify-center lg:justify-start">
            <AppPhonesShowcase />
          </div>

          {/* RIGHT COLUMN: MODERN APP CONTENT & CTA */}
          <div className="lg:col-span-6 xl:col-span-5 z-20 flex flex-col justify-center text-left">
            <div className="flex flex-col">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 text-zinc-700 text-[11px] sm:text-[12px] font-bold tracking-[0.22em] uppercase font-sans mb-3 border border-zinc-200/80 w-fit"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#1758A5] animate-pulse" />
                <span>Convenient Interaction</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 30, filter: "blur(5px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="text-[42px] sm:text-[54px] lg:text-[60px] xl:text-[68px] font-black tracking-[-0.035em] text-zinc-950 mt-1 leading-[1.08]"
              >
                Modern App
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="mt-5 sm:mt-6 text-[15px] sm:text-[16.5px] lg:text-[17px] leading-[1.65] text-zinc-600 font-normal max-w-[460px]"
              >
                We developed a simple and functional app to streamline cab hailing and self-drive car rentals across Daman. View the live vehicle telemetry, driver ETA, and transparent fares in one single click.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.55, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8 sm:mt-10 flex items-center"
              >
                <motion.a
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  href="#app"
                  className="group inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-[#1758A5] text-white text-[14px] font-semibold hover:bg-[#103866] transition-all duration-200 shadow-md hover:shadow-xl"
                >
                  <img src="/apple-logo-white.svg" width={20} height={20} alt="" className="group-hover:scale-110 transition-transform" />
                  <span>Download App</span>
                </motion.a>
              </motion.div>
            </div>
          </div>
        </div>
      </ScrollSection>

      {/* =========================================================================
          PAGE 5: KEY FEATURES SECTION
         ========================================================================= */}
      <ScrollSection
        id="features"
        className="relative min-h-screen w-full flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-20 lg:py-28 bg-[#fdfdfd] scroll-mt-24"
      >
        <div className="w-full max-w-[1400px] mx-auto flex flex-col items-start">
          {/* SECTION HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 55, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start text-left max-w-2xl"
          >
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="text-[11px] sm:text-[12px] font-bold tracking-[0.24em] text-zinc-400 uppercase font-sans mb-3"
            >
              Taking Care of Every Client
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 30, filter: "blur(5px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="text-[40px] sm:text-[54px] lg:text-[62px] font-black tracking-[-0.035em] text-zinc-950 leading-[1.08]"
            >
              Key Features
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 sm:mt-5 text-[15px] sm:text-[16.5px] lg:text-[17px] leading-[1.65] text-zinc-600 font-normal"
            >
              We are all about our client&apos;s comfort and safety. That&apos;s
              <br className="hidden sm:inline" />
              why we provide the best service you can imagine.
            </motion.p>
          </motion.div>

          {/* FULL WIDTH LUXURY KEY FEATURE CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 lg:gap-8 w-full mt-12 sm:mt-16">
            {[
              {
                id: "delivery",
                icon: Clock,
                iconBg: "bg-[#eef8f4] text-emerald-700 border-emerald-100",
                badge: "Instant Dispatch",
                title: "24-Hour Car Delivery & Cabs",
                description:
                  "Instant dispatch across Daman town, beach resorts, and stations with 3-minute average pickup time.",
              },
              {
                id: "support",
                icon: Phone,
                iconBg: "bg-[#fbf0f2] text-rose-600 border-rose-100",
                badge: "Operations Desk",
                title: "24/7 Dedicated Support",
                description:
                  "Live WhatsApp operations desk & round-the-clock emergency road assistance across UT Daman.",
              },
              {
                id: "sanitized",
                icon: Sparkles,
                iconBg: "bg-[#eef2fc] text-indigo-600 border-indigo-100",
                badge: "Certified Clean",
                title: "100% Chilled AC & Sanitized",
                description:
                  "Hygienic climate-controlled cabins, daily detailing, and verified 30-point mechanical safety checks.",
              },
              {
                id: "pricing",
                icon: ShieldCheck,
                iconBg: "bg-[#0C284A]/10 text-[#1758A5] border-blue-100",
                badge: "Zero Surges",
                title: "Surge-Free Transparent Rates",
                description:
                  "Fixed upfront platform-to-beach fares with no tourist markups, surge multipliers, or hidden fees.",
              },
            ].map((feature, index) => {
              const IconComponent = feature.icon;

              return (
                <ScrollFeatureCard
                  key={feature.id}
                  index={index}
                  className="group relative bg-white rounded-3xl sm:rounded-[32px] border border-zinc-200/80 p-7 sm:p-8 lg:p-8 flex flex-col justify-between min-h-[280px] sm:min-h-[300px] lg:min-h-[320px] luxury-card-glow hover:border-zinc-300 transition-all duration-300 cursor-default"
                >
                  <div className="flex items-start justify-between">
                    <div
                      className={`w-13 h-13 sm:w-14 sm:h-14 rounded-2xl border flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-3 duration-200 ${feature.iconBg}`}
                    >
                      <IconComponent className="w-6 h-6 sm:w-7 sm:h-7" />
                    </div>
                    <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider bg-zinc-50 border border-zinc-200/60 px-2.5 py-1 rounded-full group-hover:border-zinc-300 transition-colors">
                      {feature.badge}
                    </span>
                  </div>

                  <div className="mt-6 flex flex-col">
                    <h3 className="text-[18px] sm:text-[20px] font-extrabold text-zinc-950 tracking-tight leading-[1.2]">
                      {feature.title}
                    </h3>
                    <p className="mt-2.5 text-[13.5px] sm:text-[14px] text-zinc-500 font-normal leading-[1.55]">
                      {feature.description}
                    </p>
                  </div>
                </ScrollFeatureCard>
              );
            })}
          </div>
        </div>
      </ScrollSection>

      {/* =========================================================================
          PAGE 6: FREQUENTLY ASKED QUESTIONS (FAQ ACCORDION)
         ========================================================================= */}
      <ScrollSection className="relative w-full py-16 sm:py-20 px-6 sm:px-12 lg:px-16 bg-[#fdfdfd] border-t border-zinc-100">
        <div className="max-w-[920px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 45, filter: "blur(5px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-10"
          >
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="text-[11px] font-bold tracking-[0.24em] text-zinc-400 uppercase font-sans mb-2 block"
            >
              Clear & Transparent
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 25, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl sm:text-4xl font-black text-zinc-950 tracking-tight"
            >
              Frequently Asked Questions
            </motion.h2>
          </motion.div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((faq, index) => {
              const isOpen = expandedFaqIndex === index;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ scale: 1.008, transition: { duration: 0.2 } }}
                  className={`rounded-2xl border transition-all duration-300 bg-white overflow-hidden ${isOpen ? "border-[#1758A5]/50 shadow-sm" : "border-zinc-200/80 hover:border-zinc-300 shadow-2xs"
                    }`}
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
                      className={`w-4 h-4 text-zinc-400 transition-transform duration-300 flex-shrink-0 ${isOpen ? "rotate-180 text-[#1758A5]" : ""
                        }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="px-6 pb-5 pt-1 text-[14px] text-zinc-600 leading-relaxed border-t border-zinc-100">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </ScrollSection>

      {/* =========================================================================
          PAGE 7: DRIVE WITH ZENITH TODAY (CTA BANNER)
         ========================================================================= */}
      <ScrollSection
        id="cta"
        className="relative w-full flex flex-col items-center justify-between px-6 sm:px-12 lg:px-16 pt-6 pb-14 bg-[#fdfdfd] scroll-mt-24"
      >
        <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center">
          {/* SIGNBOARD GRADIENT LUXURY CTA BANNER CARD */}
          <motion.div
            initial={{ opacity: 0, y: 65, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full rounded-[36px] sm:rounded-[44px] bg-gradient-to-br from-[#0c284a] via-[#103866] to-[#1758a5] p-10 sm:p-16 lg:p-20 text-center overflow-hidden shadow-[0_25px_60px_rgba(12,40,74,0.22)] border border-[#1758a5]/30 group"
          >
            {/* Subtle Lighting Rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
              className="absolute inset-0 pointer-events-none opacity-35 select-none"
            >
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
            </motion.div>

            <div className="relative z-10 flex flex-col items-center max-w-2xl mx-auto">
              <motion.span
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 text-blue-200 border border-white/20 text-xs font-semibold uppercase tracking-wider mb-4"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Join Daman&apos;s Fastest Growing Mobility Fleet</span>
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 25, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="text-[34px] sm:text-[46px] lg:text-[52px] font-extrabold tracking-[-0.03em] text-white leading-[1.12]"
              >
                Drive with Zenith Today
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="mt-4 sm:mt-5 text-[15px] sm:text-[16.5px] lg:text-[17px] text-blue-100/80 leading-relaxed max-w-lg"
              >
                Get the app to explore the world of premium <br className="hidden sm:inline" />
                mobility in Daman — that&apos;s exciting
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4"
              >
                <motion.a
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href="#app"
                  className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#1758A5] text-white text-[14px] font-semibold hover:bg-[#103866] border border-white/30 hover:shadow-xl transition-all duration-200 shadow-md"
                >
                  <img src="/apple-logo-white.svg" width={20} height={20} alt="" className="group-hover:scale-110 transition-transform" />
                  <span>Download App</span>
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href={`tel:${ZENITH_COMPANY_INFO.phoneRaw}`}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#103866] backdrop-blur-md text-white text-[14px] font-semibold border border-white/20 hover:bg-[#0C284A] transition-all duration-200"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call {ZENITH_COMPANY_INFO.phone}</span>
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </ScrollSection>

      {/* =========================================================================
          WORLD-CLASS 4-COLUMN ENTERPRISE FOOTER
         ========================================================================= */}
      <footer className="w-full bg-[#09090b] text-white pt-16 sm:pt-20 pb-10 border-t border-zinc-800">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-14 border-b border-zinc-800">
            {/* Column 1: Entity Credentials & Signboard Details */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col"
            >
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
            </motion.div>

            {/* Column 2: Mobility Services */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
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
            </motion.div>

            {/* Column 3: Company & Ecosystem (with Careers redirect) */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
            >
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
            </motion.div>

            {/* Column 4: 24/7 Operations Desk & Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
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
            </motion.div>
          </div>

          {/* Sub-Footer Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500"
          >
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
          </motion.div>
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
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-5"
              >
                <Image
                  src={selectedVehicle.image}
                  alt={selectedVehicle.name}
                  fill
                  className="object-contain p-4"
                />
              </motion.div>

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
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#1758A5] text-white text-sm font-semibold hover:bg-[#103866] transition-colors shadow-xs"
                  >
                    <Phone className="w-4 h-4 text-white" />
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
                  className="px-6 py-2.5 rounded-full bg-[#1758A5] text-white text-xs font-semibold hover:bg-[#103866] transition-colors"
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
              className="w-10 h-10 rounded-full bg-[#1758A5] text-white hover:bg-[#103866] flex items-center justify-center shadow-lg active:scale-95 transition-all"
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
