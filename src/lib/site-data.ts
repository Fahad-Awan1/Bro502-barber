import barber1 from "@/assets/barber-1.jpg";
import barber2 from "@/assets/barber-2.jpg";
import barber3 from "@/assets/barber-3.jpg";
import barber4 from "@/assets/barber-4.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";

export const BUSINESS = {
  name: "Bro 502 Barber",
  tagline: "The Art of the Modern Gentleman",
  email: "josemoralessim3198@gmail.com",
  phone: "(409) 932-6544",
  phoneHref: "tel:+14099326544",
  socials: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Facebook", href: "https://facebook.com" },
    { label: "TikTok", href: "https://tiktok.com" },
  ],
};

export type LocationData = {
  id: "rainier" | "georgetown";
  name: string;
  shortName: string;
  address: string;
  street: string;
  city: string;
  hours: { day: string; hours: string }[];
  mapEmbed: string;
  mapLink: string;
};

export const LOCATIONS: LocationData[] = [
  {
    id: "rainier",
    name: "Rainier (Seattle)",
    shortName: "Rainier",
    address: "3867 Rainier Ave S, Seattle, WA 98118",
    street: "3867 Rainier Ave S",
    city: "Seattle, WA 98118",
    hours: [
      { day: "Monday", hours: "9:00 AM – 9:00 PM" },
      { day: "Tuesday", hours: "9:00 AM – 9:00 PM" },
      { day: "Wednesday", hours: "9:00 AM – 9:00 PM" },
      { day: "Thursday", hours: "9:00 AM – 9:00 PM" },
      { day: "Friday", hours: "9:00 AM – 9:00 PM" },
      { day: "Saturday", hours: "9:00 AM – 9:00 PM" },
      { day: "Sunday", hours: "9:00 AM – 9:00 PM" },
    ],
    mapEmbed:
      "https://maps.google.com/maps?q=3867%20Rainier%20Ave%20S,%20Seattle,%20WA%2098118&t=&z=15&ie=UTF8&iwloc=&output=embed",
    mapLink: "https://www.google.com/maps/search/?api=1&query=3867+Rainier+Ave+S+Seattle+WA+98118",
  },
  {
    id: "georgetown",
    name: "Georgetown (Seattle)",
    shortName: "Georgetown",
    address: "1215 S Bailey St, Seattle, WA 98108, United States",
    street: "1215 S Bailey St",
    city: "Seattle, WA 98108",
    hours: [
      { day: "Monday", hours: "9:00 AM – 8:00 PM" },
      { day: "Tuesday", hours: "9:00 AM – 8:00 PM" },
      { day: "Wednesday", hours: "9:00 AM – 8:00 PM" },
      { day: "Thursday", hours: "9:00 AM – 8:00 PM" },
      { day: "Friday", hours: "9:00 AM – 8:00 PM" },
      { day: "Saturday", hours: "9:00 AM – 8:00 PM" },
      { day: "Sunday", hours: "9:00 AM – 6:00 PM" },
    ],
    mapEmbed:
      "https://maps.google.com/maps?q=1215%20S%20Bailey%20St,%20Seattle,%20WA%2098108&t=&z=15&ie=UTF8&iwloc=&output=embed",
    mapLink: "https://www.google.com/maps/search/?api=1&query=1215+S+Bailey+St+Seattle+WA+98108",
  },
];

export const HOURS = LOCATIONS[0].hours;

export type Service = {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  tag?: string;
  locations?: string[];
};

export const SERVICES: Service[] = [
  {
    id: "signature-cut",
    name: "Signature Haircut",
    description:
      "Consultation, precision scissor and clipper work, hot towel finish and a styled blow-out.",
    price: 55,
    duration: 45,
    tag: "Most booked",
  },
  {
    id: "beard-trim",
    name: "Beard Sculpt & Trim",
    description: "Line-up, shape and condition with warm oils, finished with a light beard balm.",
    price: 35,
    duration: 30,
  },
  {
    id: "hot-towel-shave",
    name: "Hot Towel Straight Shave",
    description:
      "A traditional multi-towel ritual, hand-lathered cream and a single-blade finish. (Georgetown Only)",
    price: 60,
    duration: 45,
    locations: ["georgetown"],
  },
  {
    id: "kids-cut",
    name: "Young Gentleman's Cut",
    description: "A patient, unhurried cut for guests 12 and under.",
    price: 32,
    duration: 30,
  },
  {
    id: "combo",
    name: "The Bro502 Combo",
    description: "Signature haircut paired with a full beard sculpt and hot towel finish.",
    price: 80,
    duration: 75,
    tag: "Best value",
  },
  {
    id: "executive",
    name: "Executive Ritual",
    description:
      "Haircut, straight shave, scalp massage and a finishing skincare treatment. (Georgetown Only)",
    price: 110,
    duration: 90,
    locations: ["georgetown"],
  },
];

export type Barber = {
  id: string;
  name: string;
  role: string;
  specialty: string;
  bio: string;
  image: string;
  socials: { label: string; href: string }[];
};

export const BARBERS: Barber[] = [
  {
    id: "jose",
    name: "Jose Gilberto Morales Simeon",
    role: "CEO & Founder / Master Barber",
    specialty: "Classic tapers, modern fades & precision cuts",
    bio: "Over fifteen years of dedicated craftsmanship, establishing Bro 502 Barber as a premier Seattle grooming destination.",
    image: barber1,
    socials: [
      { label: "Instagram", href: "https://instagram.com" },
      { label: "TikTok", href: "https://tiktok.com" },
    ],
  },
  {
    id: "devin",
    name: "Devin Sato",
    role: "Senior Barber",
    specialty: "Textured crops & scissor work",
    bio: "Devin brings a quiet, architectural precision to every silhouette, specializing in modern textured crops.",
    image: barber2,
    socials: [{ label: "Instagram", href: "https://instagram.com" }],
  },
  {
    id: "leilani",
    name: "Leilani Cruz",
    role: "Barber & Colour Specialist",
    specialty: "Grey blending & styling",
    bio: "A colourist's eye and a barber's hand — Leilani's finishes photograph beautifully.",
    image: barber3,
    socials: [
      { label: "Instagram", href: "https://instagram.com" },
      { label: "Facebook", href: "https://facebook.com" },
    ],
  },
  {
    id: "makoa",
    name: "Makoa Reyes",
    role: "Master Barber",
    specialty: "Straight razor shaves",
    bio: "Thirty years of straight-razor craft. Ask him about the hot towel ritual — he'll take his time.",
    image: barber4,
    socials: [{ label: "Instagram", href: "https://instagram.com" }],
  },
];

export const ANY_BARBER = {
  id: "any",
  name: "Any available barber",
  specialty: "We'll match you with the first open chair",
};

export const GALLERY = [
  { src: gallery1, alt: "Precision skin fade haircut in profile", span: "tall" },
  { src: gallery2, alt: "Hot towel shave ritual in progress", span: "wide" },
  { src: gallery3, alt: "Sculpted beard trim detail", span: "tall" },
  { src: gallery4, alt: "Young gentleman's haircut at Bro502", span: "wide" },
  { src: gallery5, alt: "Textured pompadour styling finish", span: "tall" },
  { src: gallery6, alt: "Gold-trimmed barber station and marble counter", span: "wide" },
] as const;

export const TESTIMONIALS = [
  {
    name: "Marcus H.",
    rating: 5,
    quote:
      "The most consistent fade I've had in Seattle. They remember exactly how I like it, every single visit.",
    initials: "MH",
  },
  {
    name: "Jared K.",
    rating: 5,
    quote:
      "The hot towel shave is worth the trip alone. Forty-five unhurried minutes that feel like a reset.",
    initials: "JK",
  },
  {
    name: "Tony P.",
    rating: 5,
    quote:
      "Booked the Executive Ritual before my wedding. Photographer said it was the sharpest he'd seen.",
    initials: "TP",
  },
  {
    name: "Sam L.",
    rating: 5,
    quote:
      "Brought my son for his first real haircut. They were patient, kind, and he left grinning.",
    initials: "SL",
  },
  {
    name: "Dee R.",
    rating: 5,
    quote:
      "Beautiful room, no attitude, exceptional work. It feels like a lounge, not a waiting room.",
    initials: "DR",
  },
];

export const FAQS = [
  {
    q: "Where should I park?",
    a: "Free street parking is available near both of our locations, with dedicated spaces in Georgetown and street parking along Rainier Ave in Rainier.",
  },
  {
    q: "Do you take walk-ins?",
    a: "We welcome walk-ins whenever a chair is open, but appointments always take priority. Weekends fill early — booking ahead is strongly recommended.",
  },
  {
    q: "What is your cancellation policy?",
    a: "Please give us at least 12 hours' notice. Cancellations inside 12 hours, or no-shows, may be charged 50% of the service price.",
  },
  {
    q: "How early should I arrive?",
    a: "Five minutes early is perfect. That gives us time for a proper consultation and a coffee before we begin.",
  },
  {
    q: "Do you sell the products you use?",
    a: "Yes. Every pomade, oil and balm we use in the chair is available at the front counter, along with staff recommendations for your hair type.",
  },
];

export const TIME_SLOTS = [
  "9:00 AM",
  "9:45 AM",
  "10:30 AM",
  "11:15 AM",
  "12:00 PM",
  "1:00 PM",
  "1:45 PM",
  "2:30 PM",
  "3:15 PM",
  "4:00 PM",
  "4:45 PM",
  "5:30 PM",
  "6:15 PM",
  "7:00 PM",
  "7:45 PM",
  "8:30 PM",
];
