export interface FleetVehicle {
  id: string;
  name: string;
  category: "cab" | "self-drive" | "both";
  type: string;
  seats: number;
  transmission: "Manual" | "Automatic";
  fuel: "Petrol" | "Diesel" | "CNG" | "EV";
  cabRate: string;
  selfDriveRate: string;
  popularFor: string;
  features: string[];
  tag?: string;
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

export interface TrustMetric {
  value: string;
  label: string;
  detail: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: "general" | "cabs" | "self-drive";
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
  whatsappUrl: "https://wa.me/919979111678?text=Hi%20Zenith%20Fleets%2C%20I%20would%20like%20to%20learn%20more%20about%20your%20services.",
  driverWhatsappUrl: "https://wa.me/919979111678?text=Hello%20Zenith%20Fleets%2C%20I%20am%20interested%20in%20learning%20more%20about%20the%20Driver%20Fleet%20Partner%20Program%20in%20Daman.",
};

export const TRUST_METRICS: TrustMetric[] = [
  {
    value: "19+",
    label: "Years in Operation",
    detail: "Operating reliable mobility at scale since 2006",
  },
  {
    value: "250+",
    label: "Active Fleet Assets",
    detail: "Company-managed, GPS-tracked, and sanitized vehicles",
  },
  {
    value: "300+",
    label: "Mobility Professionals",
    detail: "Verified chauffeurs, fleet managers, and round-the-clock dispatch",
  },
  {
    value: "100%",
    label: "State Event Record",
    detail: "Official Fleet Partner for Khelo India Beach Games Diu & G20",
  },
];

export const FLEET_VEHICLES: FleetVehicle[] = [
  {
    id: "maruti-swift",
    name: "Maruti Suzuki Swift",
    category: "both",
    type: "Smart Hatchback",
    seats: 4,
    transmission: "Manual",
    fuel: "Petrol",
    cabRate: "₹14/km",
    selfDriveRate: "₹1,199/day",
    popularFor: "Quick hops across Daman town, markets & beach hopping",
    features: ["Chilled AC", "Compact Parking", "High Mileage", "Bluetooth Audio"],
    tag: "Most Popular",
  },
  {
    id: "maruti-dzire",
    name: "Maruti Suzuki Dzire",
    category: "both",
    type: "Comfort Sedan",
    seats: 4,
    transmission: "Automatic",
    fuel: "Petrol",
    cabRate: "₹16/km",
    selfDriveRate: "₹1,499/day",
    popularFor: "Station transfers from Vapi & smooth business commutes",
    features: ["Generous Boot Space", "Smooth Automatic", "Comfort Legroom", "FastTag Enabled"],
    tag: "Best Value",
  },
  {
    id: "maruti-ertiga",
    name: "Maruti Suzuki Ertiga",
    category: "both",
    type: "7-Seater MPV",
    seats: 7,
    transmission: "Manual",
    fuel: "CNG",
    cabRate: "₹20/km",
    selfDriveRate: "₹2,199/day",
    popularFor: "Family trips, weekend getaways & group sightseeing",
    features: ["7 True Seats", "Rear AC Vents", "Flexible Luggage", "Fuel Efficient"],
    tag: "Family Favorite",
  },
  {
    id: "mahindra-thar",
    name: "Mahindra Thar 4x4",
    category: "self-drive",
    type: "Coastal Cruiser",
    seats: 4,
    transmission: "Automatic",
    fuel: "Diesel",
    cabRate: "On Request",
    selfDriveRate: "₹3,499/day",
    popularFor: "Unmatched beach drives, coastal sunset vibes & weekend thrills",
    features: ["4x4 Drive", "Open Air Vibe", "Iconic Presence", "High Ground Clearance"],
    tag: "Daman Beach Icon",
  },
  {
    id: "toyota-innova-crysta",
    name: "Toyota Innova Crysta",
    category: "both",
    type: "Premium MPV",
    seats: 7,
    transmission: "Automatic",
    fuel: "Diesel",
    cabRate: "₹24/km",
    selfDriveRate: "₹3,199/day",
    popularFor: "Executive travel, long coastal road trips & corporate delegates",
    features: ["Captain Seats", "Plush Suspension", "Massive Trunk", "State Protocol Choice"],
    tag: "Executive Class",
  },
  {
    id: "hyundai-creta",
    name: "Hyundai Creta SX",
    category: "self-drive",
    type: "Compact SUV",
    seats: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    cabRate: "₹19/km",
    selfDriveRate: "₹2,499/day",
    popularFor: "Weekend getaways from Mumbai or Surat to Daman",
    features: ["Panoramic Sunroof", "Ventilated Seats", "Cruise Control", "Bose Audio"],
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

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "What is Zenith, and what services do you offer in Daman?",
    answer:
      "Zenith is a unified mobility application operating across Daman, Vapi, Silvassa, and surrounding regions. We provide two core services in one single app: (1) On-demand Cab Hailing with verified professional chauffeurs for point-to-point and station trips, and (2) Self-Drive Car Rentals for travelers who want complete driving freedom by the hour, day, or weekend.",
    category: "general",
  },
  {
    question: "How do I book a cab in Daman with Zenith?",
    answer:
      "Booking a cab is instant through the Zenith app or via our 24/7 helpline (+91 99791 11678). Simply set your pickup and drop location in Daman or Vapi, choose your vehicle category (Hatchback, Sedan, or SUV), and an assigned driver will arrive in minutes. All fares are transparent and upfront with zero meter-tampering or tourist surge gouging.",
    category: "cabs",
  },
  {
    question: "How does Self-Drive Car Rental work in Daman?",
    answer:
      "Browse our fleet of verified self-drive vehicles, select your rental duration, and choose between doorstep delivery at your Daman resort or instant pickup from Vapi Station. A valid original Indian Driving License and government ID are required for digital verification.",
    category: "self-drive",
  },
  {
    question: "Can I drive the rental car outside Daman (e.g. to Gujarat or Maharashtra)?",
    answer:
      "Yes! All Zenith fleet assets are commercial vehicles equipped with legitimate inter-state tourist permits and FastTag, allowing smooth movement between Daman, Gujarat, and Maharashtra without border delays.",
    category: "self-drive",
  },
  {
    question: "Who owns and operates Zenith?",
    answer:
      "Zenith is owned and operated by Zenith Fleets Pvt. Ltd., headquartered at Royal Millenium on the Vapi-Daman Main Road (GSTIN: 26AACCZ8331J1Z0). We have been running large-scale mobility infrastructure across Dadra & Nagar Haveli and Daman & Diu since 2006, including serving as the official fleet partner for national events like the Khelo India Beach Games Diu and G20 Summit meetings.",
    category: "general",
  },
  {
    question: "How can local drivers join the Zenith Fleet Partner program?",
    answer:
      "Zenith provides brand-new, fully compliant commercial vehicles to qualified local drivers under our micro-entrepreneurship initiative. Drivers can earn between ₹50,000 to ₹1,00,000 per month operating on the Zenith platform with zero earning caps and full fleet maintenance support. Tap 'Learn More' to connect directly with our operations desk on WhatsApp.",
    category: "general",
  },
];
