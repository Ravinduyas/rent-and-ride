import type { Vehicle } from "@/components/VehicleCard";

// Only Unsplash photo IDs verified to be live are used below.
// Some entries duplicate photos — replace with local /public/images/...
// when real photography is available.

const IMG = {
  redBike:
    "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=900&q=80",
  harley:
    "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=900&q=80",
  ktm:
    "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?auto=format&fit=crop&w=900&q=80",
  bicycle:
    "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=900&q=80",
};

export const BIKES: Vehicle[] = [
  {
    name: "Honda CB Trigger",
    type: "Motorbike",
    image: IMG.harley,
    pricePerDay: 18,
    seats: 2,
    transmission: "Manual",
    highlights: ["150cc", "Helmets x2"],
  },
  {
    name: "Yamaha FZ-S",
    type: "Motorbike",
    image: IMG.redBike,
    pricePerDay: 20,
    seats: 2,
    transmission: "Manual",
    highlights: ["153cc", "Disc Brake"],
  },
  {
    name: "Honda Dio",
    type: "Scooter",
    image: IMG.harley,
    pricePerDay: 14,
    seats: 2,
    transmission: "Automatic",
    highlights: ["110cc", "Storage Box"],
  },
  {
    name: "TVS Ntorq",
    type: "Scooter",
    image: IMG.redBike,
    pricePerDay: 15,
    seats: 2,
    transmission: "Automatic",
    highlights: ["125cc", "USB Port"],
  },
  {
    name: "Royal Enfield 350",
    type: "Cruiser",
    image: IMG.ktm,
    pricePerDay: 32,
    seats: 2,
    transmission: "Manual",
    highlights: ["Tourer", "Saddle Bags"],
  },
  {
    name: "Giant Escape 3",
    type: "Push Bike",
    image: IMG.bicycle,
    pricePerDay: 8,
    seats: 1,
    transmission: "21 Gear",
    highlights: ["Helmet", "Lock"],
  },
];

export const TUKTUKS: Vehicle[] = [
  {
    name: "Bajaj RE 4S",
    type: "Three Wheeler",
    image: IMG.redBike,
    pricePerDay: 28,
    seats: 3,
    transmission: "Manual",
    highlights: ["Petrol", "Roof"],
  },
  {
    name: "Bajaj Maxima Z",
    type: "Three Wheeler",
    image: IMG.harley,
    pricePerDay: 30,
    seats: 3,
    transmission: "Manual",
    highlights: ["Diesel", "Cargo Rack"],
  },
  {
    name: "Piaggio Ape City",
    type: "Three Wheeler",
    image: IMG.ktm,
    pricePerDay: 26,
    seats: 3,
    transmission: "Manual",
    highlights: ["CNG", "Curtains"],
  },
  {
    name: "TVS King Deluxe",
    type: "Three Wheeler",
    image: IMG.redBike,
    pricePerDay: 29,
    seats: 3,
    transmission: "Manual",
    highlights: ["Petrol", "Music"],
  },
  {
    name: "Mahindra Alfa",
    type: "Cargo Tuktuk",
    image: IMG.harley,
    pricePerDay: 34,
    seats: 2,
    transmission: "Manual",
    highlights: ["Cargo Bed", "500kg"],
  },
  {
    name: "Atul Gemini",
    type: "Three Wheeler",
    image: IMG.bicycle,
    pricePerDay: 27,
    seats: 3,
    transmission: "Manual",
    highlights: ["Petrol", "Tinted"],
  },
];
