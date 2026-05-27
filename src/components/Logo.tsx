'use client';

import { useState } from 'react';

const LOGO_URL = '/logo.jpg';

interface LogoProps {
  size?: number;
  variant?: 'light' | 'dark';
  showWordmark?: boolean;
  className?: string;
}

/**
 * Brand mark for Rent & Ride Weligama.
 * Renders the uploaded logo image when present; otherwise falls back
 * to a wordmark with the silver R-monogram swatch.
 */
export default function Logo({ size = 44, variant = 'dark', showWordmark = true, className = '' }: LogoProps) {
  const [errored, setErrored] = useState(false);

  const wordmarkColor = variant === 'light' ? 'text-white' : 'text-dark';
  const sublineColor = variant === 'light' ? 'text-silver/70' : 'text-dark/50';

  const Mark = errored ? (
    <div
      className="rounded-full bg-dark border border-silver/30 flex items-center justify-center shadow-lg"
      style={{ width: size, height: size }}
      aria-hidden
    >
      <span className="font-script text-silver text-base leading-none">R&amp;R</span>
    </div>
  ) : (
    <img
      src={LOGO_URL}
      onError={() => setErrored(true)}
      alt="Rent & Ride Weligama logo"
      className="rounded-full object-cover shadow-lg ring-1 ring-silver/15"
      style={{ width: size, height: size }}
    />
  );

  if (!showWordmark) return <span className={className}>{Mark}</span>;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {Mark}
      <div className="leading-none">
        <div className={`text-base font-black uppercase tracking-tight ${wordmarkColor}`}>
          Rent <span className="text-primary">&amp;</span> Ride
        </div>
        <div className={`text-[10px] font-script tracking-wide mt-0.5 ${sublineColor}`}>Weligama</div>
      </div>
    </div>
  );
}
