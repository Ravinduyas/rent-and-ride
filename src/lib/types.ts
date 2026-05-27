export type BikeType = 'Scooter' | 'Sport' | 'Cruiser' | 'Adventure' | 'Electric';
export type Transmission = 'Automatic' | 'Manual';

export interface Bike {
  id: string;
  slug: string;
  name: string;
  model: string;
  type: BikeType;
  transmission: Transmission;
  engineCC: number;
  rangeKm?: number;
  topSpeedKph: number;
  hourlyPriceUSD: number;
  dailyPriceUSD: number;
  weeklyPriceUSD: number;
  images: string[];
  features: string[];
  description: string;
  rating: number;
  reviewCount: number;
  available: boolean;
  popular?: boolean;
}

export interface PriceTier {
  id: 'hourly' | 'daily' | 'weekly' | 'monthly';
  name: string;
  priceUSD: number;
  unit: string;
  tagline: string;
  features: string[];
  popular?: boolean;
  cta: string;
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface TeamMember {
  name: string;
  role: string;
  photoUrl: string;
  bio?: string;
}

export type BookingStep = 'bike' | 'dates' | 'contact' | 'confirm';

export interface BookingState {
  bikeSlug: string | null;
  pickupDate: string;
  returnDate: string;
  pickupLocation: string;
  fullName: string;
  email: string;
  phone: string;
  notes: string;
}

export const emptyBookingState: BookingState = {
  bikeSlug: null,
  pickupDate: '',
  returnDate: '',
  pickupLocation: 'Downtown Hub',
  fullName: '',
  email: '',
  phone: '',
  notes: '',
};
