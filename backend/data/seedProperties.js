/**
 * Curated Luxury Demo Properties across Indian Metro and Tier-1 hubs:
 * Lucknow, Noida, Delhi, Greater Noida, Kanpur, Gurgaon.
 */

const seedProperties = [
  {
    _id: "66f101010101010101010001",
    title: "The Magnolia Sky Residences",
    description: "An ultra-luxury 4 BHK architectural marvel positioned high above Lucknow's prime skyline. Features private elevator access, double-height ceilings, floor-to-ceiling soundproof acoustic glass, bespoke Italian modular kitchen, and an expansive 600 sq ft wrap-around terrace garden with panoramic views of Gomti Riverfront.",
    price: 18500000, // ₹1.85 Cr
    location: "Vipin Khand, Gomti Nagar",
    city: "Lucknow",
    propertyType: "Apartment",
    bedrooms: 4,
    bathrooms: 4,
    area: 3250,
    featured: true,
    amenities: [
      "Private Terrace Garden",
      "24/7 Concierge & Security",
      "Infinity Swimming Pool",
      "Clubhouse & Banquet",
      "Covered EV Car Parking",
      "Smart Home Automation",
      "Gymnasium & Spa",
      "Italian Marble Flooring"
    ],
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
    ],
    seller: {
      name: "Aarav Singhania",
      email: "aarav.estates@homora.com",
      phone: "+91 98765 43210"
    },
    createdAt: new Date("2026-01-15T10:00:00Z")
  },
  {
    _id: "66f101010101010101010002",
    title: "Verdant Greens Sovereign Villa",
    description: "A private contemporary estate located in prestigious Sector 128, Noida. Designed by award-winning architects, this lavish 5 BHK villa features manicured private lawns, a heated lap pool, personal gymnasium, imported quartz countertops, and dedicated staff quarters.",
    price: 47500000, // ₹4.75 Cr
    location: "Sector 128, Wish Town",
    city: "Noida",
    propertyType: "Villa",
    bedrooms: 5,
    bathrooms: 6,
    area: 5800,
    featured: true,
    amenities: [
      "Private Heated Pool",
      "Manicured Lawn & Gazebo",
      "Solar Power Backup",
      "Home Theater Room",
      "Three Covered Car Garages",
      "Gated Security Post",
      "Gourmet Chef Kitchen",
      "Walk-in Closets"
    ],
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80"
    ],
    seller: {
      name: "Meera Oberoi",
      email: "meera.o@homora.com",
      phone: "+91 99110 88224"
    },
    createdAt: new Date("2026-01-20T11:30:00Z")
  },
  {
    _id: "66f101010101010101010003",
    title: "The Camellias Signature Penthouse",
    description: "An iconic duplex penthouse overlooking the lush DLF Golf Course. Soaring 14-foot ceiling heights, double insulated low-e glass walls, private rooftop plunge pool, biometric access, and bespoke master suites with timber flooring and onyx bathrooms.",
    price: 82000000, // ₹8.20 Cr
    location: "Golf Course Road, DLF Phase 5",
    city: "Gurgaon",
    propertyType: "Penthouse",
    bedrooms: 4,
    bathrooms: 5,
    area: 6400,
    featured: true,
    amenities: [
      "Golf Course Panoramic View",
      "Private Rooftop Plunge Pool",
      "Personal Butler Quarters",
      "Direct High-Speed Elevator",
      "Wine Cellar",
      "Underfloor Heating",
      "Triple Tier Security",
      "Clubhouse Access"
    ],
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80"
    ],
    seller: {
      name: "Rohit Malhotra",
      email: "rohit.m@homora.com",
      phone: "+91 98101 23456"
    },
    createdAt: new Date("2026-02-01T09:15:00Z")
  },
  {
    _id: "66f101010101010101010004",
    title: "Heritage Colonial Bungalow",
    description: "A rare restored jewel set on a serene tree-lined avenue in Civil Lines, Kanpur. Blending classic colonial archways and teakwood rafters with modern state-of-the-art climate control, imported sanitary fittings, and courtyard fountains.",
    price: 24500000, // ₹2.45 Cr
    location: "Civil Lines, Near Green Park",
    city: "Kanpur",
    propertyType: "Independent House",
    bedrooms: 4,
    bathrooms: 4,
    area: 4200,
    featured: false,
    amenities: [
      "Traditional Central Courtyard",
      "Teakwood Finishes",
      "Fruit Orchard & Lawn",
      "Solar Water Heating",
      "Independent Servant Block",
      "24/7 Water Supply",
      "3-Car Portico"
    ],
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80"
    ],
    seller: {
      name: "Devendra Verma",
      email: "devendra.v@homora.com",
      phone: "+91 94150 99887"
    },
    createdAt: new Date("2026-02-05T14:20:00Z")
  },
  {
    _id: "66f101010101010101010005",
    title: "The Diplomat Enclave Mansion",
    description: "Nestled in one of the capital's most exclusive neighborhoods, this stately 6 BHK residence offers unmatched prestige, bullet-resistant security glass, Finnish cedarwood sauna, commercial-grade back-up genset, and expansive terrace banquet space.",
    price: 95000000, // ₹9.50 Cr
    location: "Vasant Vihar, South West",
    city: "Delhi",
    propertyType: "Villa",
    bedrooms: 6,
    bathrooms: 7,
    area: 7200,
    featured: true,
    amenities: [
      "Embassy Grade Security",
      "Finnish Cedarwood Sauna",
      "Sub-Zero & Wolf Kitchen",
      "Private Otis Elevator",
      "Basement Recreational Lounge",
      "Landscaped Rooftop Deck",
      "4 Covered Parking Bays"
    ],
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=80"
    ],
    seller: {
      name: "Karan Johar Sethi",
      email: "karan.sethi@homora.com",
      phone: "+91 98991 77221"
    },
    createdAt: new Date("2026-02-10T16:45:00Z")
  },
  {
    _id: "66f101010101010101010006",
    title: "Zenith Podium Heights",
    description: "Sleek and minimalist 3 BHK apartment in Greater Noida West near the upcoming metro line. Features open-plan layout, sunlit balconies facing landscaped central parks, quartz counter bar, and IGBC Gold rated green building certification.",
    price: 9200000, // ₹92 Lakhs
    location: "Sector 1, Greater Noida West",
    city: "Greater Noida",
    propertyType: "Apartment",
    bedrooms: 3,
    bathrooms: 3,
    area: 1850,
    featured: false,
    amenities: [
      "Olympic Length Pool",
      "Tennis & Badminton Courts",
      "EV Charging Stations",
      "Clubhouse & Creche",
      "Rooftop Solar",
      "Jogging Track",
      "High Speed Elevators"
    ],
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=80"
    ],
    seller: {
      name: "Pooja Sharma",
      email: "pooja.sharma@homora.com",
      phone: "+91 97180 55443"
    },
    createdAt: new Date("2026-02-14T08:10:00Z")
  },
  {
    _id: "66f101010101010101010007",
    title: "Aura Botanica Garden Loft",
    description: "Chic 2 BHK designer studio loft in Cyber City vicinity. Thoughtfully crafted for modern tech founders and executives, featuring industrial exposed brick accents, high ceilings, automated smart blinds, and acoustic acoustic workspace alcove.",
    price: 13500000, // ₹1.35 Cr
    location: "Sector 24, Near Cyber City",
    city: "Gurgaon",
    propertyType: "Studio",
    bedrooms: 2,
    bathrooms: 2,
    area: 1420,
    featured: false,
    amenities: [
      "Acoustic Work Studio Pod",
      "Automated Smart Lighting",
      "Co-working Lounge & Cafe",
      "Pet Park",
      "Biometric Door Lock",
      "Reserved Stilt Parking"
    ],
    images: [
      "https://images.unsplash.com/photo-1502005229762-ee1b2da97a06?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=80"
    ],
    seller: {
      name: "Rohit Malhotra",
      email: "rohit.m@homora.com",
      phone: "+91 98101 23456"
    },
    createdAt: new Date("2026-02-18T12:00:00Z")
  },
  {
    _id: "66f101010101010101010008",
    title: "Oudh Regal Manor",
    description: "Regal 4 BHK custom-built residence situated on a quiet cul-de-sac in Sushant Golf City. Adorned with delicate sandstone jaali screens, soaring chandelier foyer, solar-heated jacuzzi, and private herb garden.",
    price: 21500000, // ₹2.15 Cr
    location: "Sushant Golf City, Amar Shaheed Path",
    city: "Lucknow",
    propertyType: "Independent House",
    bedrooms: 4,
    bathrooms: 5,
    area: 3600,
    featured: true,
    amenities: [
      "Sandstone Jaali Screens",
      "Solar-Heated Jacuzzi",
      "Landscaped Herb Garden",
      "Golf Academy Access",
      "Modular Poggenpohl Kitchen",
      "CCTV Surveillance"
    ],
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1600&q=80"
    ],
    seller: {
      name: "Aarav Singhania",
      email: "aarav.estates@homora.com",
      phone: "+91 98765 43210"
    },
    createdAt: new Date("2026-02-22T15:30:00Z")
  },
  {
    _id: "66f101010101010101010009",
    title: "Skyline Vista Duplex",
    description: "Modern 3 BHK duplex apartment offering uninterrupted vistas of Noida-Greater Noida Expressway. Clean lines, quartz kitchen island, concealed LED lighting, and private storage room.",
    price: 16500000, // ₹1.65 Cr
    location: "Sector 137, Expressway",
    city: "Noida",
    propertyType: "Apartment",
    bedrooms: 3,
    bathrooms: 3,
    area: 2100,
    featured: false,
    amenities: [
      "Expressway Connectivity",
      "Double Height Balcony",
      "Clubhouse & Squash Court",
      "Multi-tier Security",
      "2 Covered Car Parks",
      "100% Power Backup"
    ],
    images: [
      "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?auto=format&fit=crop&w=1600&q=80"
    ],
    seller: {
      name: "Meera Oberoi",
      email: "meera.o@homora.com",
      phone: "+91 99110 88224"
    },
    createdAt: new Date("2026-02-25T11:00:00Z")
  }
];

const seedUsers = [
  {
    _id: "66f101010101010101010010",
    name: "Aarav Singhania",
    email: "aarav@homora.com",
    phone: "+91 98765 43210",
    // default password: Password123
    passwordHash: "$2a$10$WpP64zszjR2bY5r7u.zYjOqO.e7wA7vK1bMv8sP4/1M.QvP5fLz1m"
  },
  {
    _id: "66f101010101010101010020",
    name: "Demo Buyer",
    email: "demo@homora.com",
    phone: "+91 91234 56789",
    // default password: Password123
    passwordHash: "$2a$10$WpP64zszjR2bY5r7u.zYjOqO.e7wA7vK1bMv8sP4/1M.QvP5fLz1m"
  }
];

module.exports = {
  seedProperties,
  seedUsers,
};
