import type { PriceTier } from './types';

export const priceTiers: PriceTier[] = [
  {
    id: 'hourly',
    name: 'Hourly',
    priceUSD: 2,
    unit: '/ hour',
    tagline: 'For a quick run into town',
    features: [
      'Pay only for the time you ride',
      'Free helmet, lock & phone holder',
      'Pickup at any of our 3 hubs',
      'Unlimited city kilometres',
    ],
    cta: 'Start Hourly',
  },
  {
    id: 'daily',
    name: 'Daily',
    priceUSD: 8,
    unit: '/ day',
    tagline: 'Great for first-time visitors',
    features: [
      '24-hour rental window',
      'Free helmet, lock & phone holder',
      'Insurance & roadside assistance',
      'Free cancellation up to 12 h before pickup',
    ],
    cta: 'Start Daily',
  },
  {
    id: 'weekly',
    name: 'Weekly',
    priceUSD: 45,
    unit: '/ week',
    tagline: 'Made for surf trips & holidays',
    features: [
      '7-day rental window',
      'Free helmet, lock & phone holder',
      'Comprehensive insurance',
      '15% off add-ons (top-box, GoPro mount, etc.)',
      'One free bike swap per week',
    ],
    cta: 'Start Weekly',
  },
  {
    id: 'monthly',
    name: 'Monthly',
    priceUSD: 160,
    unit: '/ month',
    tagline: 'Best value for long stays & expats',
    features: [
      '30-day rental window — unlimited km',
      'Free helmet, lock, phone holder & top-box',
      'Premium insurance & 24/7 priority support',
      '25% off add-ons',
      'Free bike swap any time',
      'Monthly tune-up at no extra cost',
    ],
    popular: true,
    cta: 'Go Monthly',
  },
];
