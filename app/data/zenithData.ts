export interface FleetVehicle {
  id: string;
  name: string;
  category: "cabs" | "self-drive" | "both";
  type: string;
  seats: string;
  transmission: string;
  fuel: string;
  cabRate?: string;
  selfDriveRate?: string;
  image: string;
  popularFor: string;
  tag?: string;
  luggage: string;
  specs: {
    ac: string;
    engine: string;
    securityDeposit?: string;
    speedLimit?: string;
    doorstepDelivery: boolean;
  };
}

export interface DamanRoute {
  id: string;
  from: string;
  to: string;
  distanceKm: number;
  approxTime: string;
  cabEstimate: string;
  selfDriveNote: string;
  highlight: string;
}

export interface SocialLink {
  id: string;
  name: string;
  url: string;
  iconName: "linkedin" | "instagram" | "twitter" | "facebook" | "youtube";
}

export const ZENITH_COMPANY_INFO = {
  name: "Zenith",
  legalName: "ZENITH FLEETS PVT. LTD.",
  tagline: "Mobility Infrastructure Since 2006",
  phone: "+91 99791 11678",
  phoneRaw: "+919979111678",
  altPhone: "+91 98982 63678",
  email: "zenithfleets@gmail.com",
  altEmail: "info@zenithfleets.in",
  gstin: "26AACCZ8331J1Z0",
  address: "24 / 25 - Royal Millenium, Vapi-Daman Main Road, Gujarat - 396 215",
  operationalAreas: ["Daman", "Vapi", "Silvassa", "Valsad", "Umargam"],
  yearsExperience: "19+",
  foundedYear: "2006",
  careersUrl: "https://exactable.in/careers",
  exactableUrl: "https://exactable.in",
  whatsappUrl: "https://wa.me/919979111678?text=Hi%20Zenith%20Fleets%2C%20I%20would%20like%20to%20inquire%20about%20cab%20and%20self-drive%20services%20in%20Daman.",
  driverWhatsappUrl: "https://wa.me/919979111678?text=Hello%20Zenith%20Fleets%2C%20I%20am%20interested%20in%20learning%20more%20about%20the%20Driver%20Fleet%20Partner%20Program%20in%20Daman.",
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: "linkedin",
    name: "LinkedIn",
    url: "https://linkedin.com/company/zenithfleets",
    iconName: "linkedin",
  },
  {
    id: "instagram",
    name: "Instagram",
    url: "https://instagram.com/zenithfleets",
    iconName: "instagram",
  },
  {
    id: "twitter",
    name: "X (Twitter)",
    url: "https://x.com/zenithfleets",
    iconName: "twitter",
  },
  {
    id: "facebook",
    name: "Facebook",
    url: "https://facebook.com/zenithfleets",
    iconName: "facebook",
  },
  {
    id: "youtube",
    name: "YouTube",
    url: "https://youtube.com/@zenithfleets",
    iconName: "youtube",
  },
];

export const DAMAN_ROUTES: DamanRoute[] = [
  {
    id: "vapi-to-jampore",
    from: "Vapi Railway Station",
    to: "Jampore Beach, Daman",
    distanceKm: 14,
    approxTime: "25 mins",
    cabEstimate: "₹350 – ₹450",
    selfDriveNote: "Doorstep delivery to station platform exit",
    highlight: "Direct station pickup with zero luggage negotiations",
  },
  {
    id: "devka-to-moti-daman",
    from: "Devka Beach Promenade",
    to: "Moti Daman Lighthouse & Fort",
    distanceKm: 7.5,
    approxTime: "15 mins",
    cabEstimate: "₹180 – ₹240",
    selfDriveNote: "Scenic coastal stretch along the Arabian Sea",
    highlight: "Historic Portuguese heritage trail and sunset promenade",
  },
  {
    id: "daman-to-silvassa",
    from: "Daman Coastal Belt",
    to: "Silvassa / Dudhani Lake",
    distanceKm: 38,
    approxTime: "50 mins",
    cabEstimate: "₹850 – ₹1,100",
    selfDriveNote: "Cross-UT border compliant with all permits cleared",
    highlight: "Smooth twin-UT corridor connection for business & tourism",
  },
  {
    id: "daman-to-surat",
    from: "Daman Resorts",
    to: "Surat City / Airport",
    distanceKm: 115,
    approxTime: "2 hrs 10 mins",
    cabEstimate: "₹2,200 – ₹2,800",
    selfDriveNote: "Unlimited KM weekend packages available",
    highlight: "Door-to-door intercity one-way & roundtrip transfers",
  },
];

export const FAQ_ITEMS = [
  {
    question: "What is Zenith, and what mobility services are available in Daman?",
    answer:
      "Zenith is a unified mobility application operating across Daman, Vapi, Silvassa, and coastal Gujarat. In one single app, we offer: (1) On-demand Cab Hailing with verified local chauffeurs for city commutes and Vapi Station pickups, and (2) Self-Drive Car Rentals for travelers who want complete freedom by the day or weekend.",
  },
  {
    question: "How do I book a cab from Vapi Railway Station to Daman?",
    answer:
      "You can book instantly through the Zenith app or call our 24/7 Operations Desk at +91 99791 11678. Our driver meets you directly at the station exit with fixed upfront fares (₹350 – ₹450) and zero baggage surcharges.",
  },
  {
    question: "What documents are required for Self-Drive Car Rentals?",
    answer:
      "For self-drive rentals in Daman, you require a valid original Indian Driving License and government ID (Aadhaar or Passport). Minimum age is 21 years. Verification is completed digitally in 2 minutes with zero paper forms.",
  },
  {
    question: "Can I drive the rental car outside Daman into Gujarat or Maharashtra?",
    answer:
      "Yes! All Zenith fleet assets are commercial vehicles equipped with legitimate inter-state tourist permits and FastTag, allowing unrestricted travel across Daman, Gujarat, and Maharashtra without border delays.",
  },
];

export const FLEET_VEHICLES_DATA: FleetVehicle[] = [
  {
    id: "swift",
    name: "Maruti Suzuki Swift",
    category: "both",
    type: "Smart Hatchback",
    seats: "4 Seats",
    transmission: "Manual",
    fuel: "Petrol &bull; Chilled AC",
    cabRate: "₹14/km",
    selfDriveRate: "₹1,199/day",
    image: "/cars/swift.jpg",
    popularFor: "Quick hops across Daman markets & beach hopping",
    tag: "Most Popular",
    luggage: "2 Medium Bags",
    specs: {
      ac: "Climate Controlled AC",
      engine: "1.2L DualJet Petrol",
      securityDeposit: "₹2,500 (Refundable)",
      speedLimit: "80 km/h (Govt RTO Standard)",
      doorstepDelivery: true,
    },
  },
  {
    id: "dzire",
    name: "Maruti Suzuki Dzire",
    category: "both",
    type: "Comfort Sedan",
    seats: "4 Seats",
    transmission: "Automatic",
    fuel: "Petrol &bull; FastTag",
    cabRate: "₹16/km",
    selfDriveRate: "₹1,499/day",
    image: "/cars/dzire.jpg",
    popularFor: "Vapi Railway Station direct pickups & business trips",
    tag: "Best Value",
    luggage: "3 Large Suitcases",
    specs: {
      ac: "Dual Rear AC Vents",
      engine: "1.2L Smart Hybrid",
      securityDeposit: "₹3,000 (Refundable)",
      speedLimit: "80 km/h (Govt RTO Standard)",
      doorstepDelivery: true,
    },
  },
  {
    id: "thar",
    name: "Mahindra Thar 4x4",
    category: "self-drive",
    type: "Coastal Cruiser",
    seats: "4 Seats",
    transmission: "Automatic 4x4",
    fuel: "Diesel &bull; Convertible",
    selfDriveRate: "₹3,499/day",
    image: "/cars/thar.jpg",
    popularFor: "Scenic beach drives along Jampore & Devka promenades",
    tag: "Daman Beach Icon",
    luggage: "2 Duffle Bags + Beach Gear",
    specs: {
      ac: "High-Capacity Chilled AC",
      engine: "2.2L mHawk Turbo Diesel",
      securityDeposit: "₹5,000 (Refundable)",
      speedLimit: "80 km/h (Govt RTO Standard)",
      doorstepDelivery: true,
    },
  },
  {
    id: "ertiga",
    name: "Maruti Suzuki Ertiga",
    category: "cabs",
    type: "7-Seater MPV",
    seats: "7 True Seats",
    transmission: "Manual",
    fuel: "CNG / Petrol &bull; Rear AC",
    cabRate: "₹20/km",
    selfDriveRate: "₹2,199/day",
    image: "/cars/ertiga.jpg",
    popularFor: "Family trips, weekend getaways & group transfers",
    tag: "Family Choice",
    luggage: "4 Large Suitcases",
    specs: {
      ac: "Roof Mounted 3-Row AC",
      engine: "1.5L K15C Smart Hybrid",
      securityDeposit: "₹3,500 (Refundable)",
      speedLimit: "80 km/h (Govt RTO Standard)",
      doorstepDelivery: true,
    },
  },
  {
    id: "innova",
    name: "Toyota Innova Crysta",
    category: "both",
    type: "Executive MPV",
    seats: "7 Captain Seats",
    transmission: "Automatic",
    fuel: "Diesel &bull; Highway Luxury",
    cabRate: "₹24/km",
    selfDriveRate: "₹3,199/day",
    image: "/cars/innova.jpg",
    popularFor: "Official state protocol, corporate VIPs & Surat transfers",
    tag: "Executive Class",
    luggage: "5 Large Bags",
    specs: {
      ac: "Automatic Climate Dual AC",
      engine: "2.4L Diesel Intercooled",
      securityDeposit: "₹5,000 (Refundable)",
      speedLimit: "80 km/h (Govt RTO Standard)",
      doorstepDelivery: true,
    },
  },
];
