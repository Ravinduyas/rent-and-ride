import type { Metadata, Viewport } from 'next';
import { ReactNode } from 'react';
import './globals.css';
import ClientShell from '../components/layout/ClientShell';

export const metadata: Metadata = {
  title: 'Rent & Ride Weligama — Sri Lanka Bike & Scooter Rental',
  description:
    'Rent & Ride Weligama — premium scooter and motorbike rentals on Sri Lanka’s south coast. Full insurance, 24/7 support, transparent pricing.',
  icons: {
    icon: '/logo.jpg',
    apple: '/logo.jpg',
  },
};

export const viewport: Viewport = {
  themeColor: '#0B1428',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
