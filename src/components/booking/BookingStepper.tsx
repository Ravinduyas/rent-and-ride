'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import type { Bike, BookingState, BookingStep } from '../../lib/types';
import { emptyBookingState } from '../../lib/types';
import { bikes, findBikeBySlug } from '../../lib/bikes';
import BookingSummary from './BookingSummary';
import BookingConfirmation from './BookingConfirmation';

const stepOrder: BookingStep[] = ['bike', 'dates', 'contact', 'confirm'];
const stepLabels: Record<BookingStep, string> = {
  bike: 'Choose a Bike',
  dates: 'Pick Dates',
  contact: 'Your Details',
  confirm: 'Review',
};

function daysBetween(a: string, b: string): number {
  if (!a || !b) return 0;
  const start = new Date(a).getTime();
  const end = new Date(b).getTime();
  if (isNaN(start) || isNaN(end) || end <= start) return 0;
  return Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
}

export default function BookingStepper() {
  const params = useSearchParams();
  const initialBike = params?.get('bike') ?? null;
  const initialPickup = params?.get('pickup') ?? '';
  const initialDropoff = params?.get('dropoff') ?? '';

  const [stepIndex, setStepIndex] = useState(initialBike ? 1 : 0);
  const [direction, setDirection] = useState(1);
  const [state, setState] = useState<BookingState>({
    ...emptyBookingState,
    bikeSlug: initialBike,
    pickupDate: initialPickup,
    returnDate: initialDropoff,
  });
  const [submitted, setSubmitted] = useState(false);
  const [reference] = useState(() =>
    `RR-${Math.random().toString(36).slice(2, 6).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
  );

  const bike: Bike | null = useMemo(() => findBikeBySlug(state.bikeSlug ?? undefined) ?? null, [state.bikeSlug]);
  const days = daysBetween(state.pickupDate, state.returnDate);
  const subtotal = bike ? bike.dailyPriceUSD * Math.max(days, 1) : 0;
  const insurance = Math.round(subtotal * 0.12);
  const total = subtotal + insurance;

  const step = stepOrder[stepIndex];
  const progress = ((stepIndex + (submitted ? 1 : 0)) / stepOrder.length) * 100;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [stepIndex, submitted]);

  const next = () => {
    setDirection(1);
    if (step === 'confirm') {
      setSubmitted(true);
      return;
    }
    setStepIndex((i) => Math.min(i + 1, stepOrder.length - 1));
  };
  const prev = () => {
    setDirection(-1);
    setStepIndex((i) => Math.max(i - 1, 0));
  };

  const canAdvance = (() => {
    if (step === 'bike') return !!bike;
    if (step === 'dates') return !!state.pickupDate && !!state.returnDate && days > 0;
    if (step === 'contact')
      return state.fullName.trim().length > 1 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email);
    return true;
  })();

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto">
        <BookingConfirmation bike={bike} state={state} total={total} reference={reference} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
      <div className="space-y-8">
        {/* Stepper indicator */}
        <div className="bg-white rounded-3xl shadow-sm border border-neutral-100 p-6 lg:p-8">
          <div className="flex items-center justify-between mb-4">
            {stepOrder.map((s, i) => {
              const done = i < stepIndex;
              const current = i === stepIndex;
              return (
                <div key={s} className="flex items-center gap-2 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-black shrink-0 transition-colors ${
                      current
                        ? 'bg-primary text-white shadow-lg shadow-primary/20'
                        : done
                          ? 'bg-primary/15 text-primary'
                          : 'bg-neutral-100 text-neutral-400'
                    }`}
                  >
                    {done ? <CheckCircle2 size={16} /> : i + 1}
                  </div>
                  <span
                    className={`hidden md:block text-xs font-bold uppercase tracking-widest truncate ${
                      current ? 'text-dark' : done ? 'text-dark/60' : 'text-neutral-400'
                    }`}
                  >
                    {stepLabels[s]}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-secondary"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </div>

        {/* Step content */}
        <div className="bg-white rounded-3xl shadow-xl border border-neutral-100 p-6 lg:p-10 min-h-[420px] relative overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 40 : -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -40 : 40 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            >
              {step === 'bike' && <StepBike state={state} setState={setState} />}
              {step === 'dates' && <StepDates state={state} setState={setState} bike={bike} days={days} />}
              {step === 'contact' && <StepContact state={state} setState={setState} />}
              {step === 'confirm' && <StepConfirm bike={bike} state={state} total={total} days={days} />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Nav */}
        <div className="flex items-center justify-between">
          <button
            onClick={prev}
            disabled={stepIndex === 0}
            className="inline-flex items-center gap-2 text-sm font-bold text-dark/70 hover:text-primary transition-colors disabled:opacity-30 disabled:pointer-events-none"
          >
            <ChevronLeft size={18} /> Back
          </button>
          <button
            onClick={next}
            disabled={!canAdvance}
            className={`inline-flex items-center gap-2 px-8 py-4 rounded-full font-black uppercase tracking-widest text-xs shadow-xl transition-all ${
              canAdvance
                ? 'bg-primary text-white shadow-primary/20 hover:scale-105'
                : 'bg-neutral-200 text-neutral-400 pointer-events-none'
            }`}
          >
            {step === 'confirm' ? 'Confirm Booking' : 'Continue'}
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <BookingSummary
        bike={bike}
        state={state}
        days={days}
        total={total}
        insurance={insurance}
        subtotal={subtotal}
      />
    </div>
  );
}

// ======= Steps =======

interface StepProps {
  state: BookingState;
  setState: (s: BookingState) => void;
}

function StepBike({ state, setState }: StepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-black text-dark mb-2">Choose your ride</h2>
        <p className="text-sm text-neutral-500 font-medium">Pick from our most popular available bikes.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {bikes
          .filter((b) => b.available)
          .map((b) => {
            const selected = state.bikeSlug === b.slug;
            return (
              <button
                key={b.id}
                onClick={() => setState({ ...state, bikeSlug: b.slug })}
                className={`text-left bg-white rounded-2xl border-2 p-4 flex items-center gap-4 transition-all ${
                  selected
                    ? 'border-primary shadow-lg shadow-primary/10'
                    : 'border-neutral-100 hover:border-primary/30 hover:shadow-md'
                }`}
              >
                <img src={b.images[0]} alt={b.name} className="w-20 h-20 rounded-xl object-cover shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">{b.type}</div>
                  <div className="font-black text-dark truncate">{b.name}</div>
                  <div className="text-xs font-bold text-primary mt-1">${b.dailyPriceUSD} / day</div>
                </div>
                {selected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-primary shrink-0"
                  >
                    <CheckCircle2 size={22} />
                  </motion.div>
                )}
              </button>
            );
          })}
      </div>
    </div>
  );
}

interface StepDatesProps extends StepProps {
  bike: Bike | null;
  days: number;
}

function StepDates({ state, setState, bike, days }: StepDatesProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-black text-dark mb-2">When are you riding?</h2>
        <p className="text-sm text-neutral-500 font-medium">
          {bike ? `${bike.name} — $${bike.dailyPriceUSD} / day` : 'Pick a pickup window.'}
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-dark/60">Pickup Location</label>
          <select
            value={state.pickupLocation}
            onChange={(e) => setState({ ...state, pickupLocation: e.target.value })}
            className="w-full bg-neutral-50 rounded-xl px-4 py-3 text-sm font-bold text-dark focus:ring-2 focus:ring-primary/30 outline-none"
          >
            <option>Downtown Hub</option>
            <option>Airport Terminal</option>
            <option>Coastal Boardwalk</option>
            <option>Old Town Plaza</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-dark/60">Pickup Date</label>
            <input
              type="date"
              value={state.pickupDate}
              onChange={(e) => setState({ ...state, pickupDate: e.target.value })}
              className="w-full bg-neutral-50 rounded-xl px-4 py-3 text-sm font-bold text-dark focus:ring-2 focus:ring-primary/30 outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-dark/60">Return Date</label>
            <input
              type="date"
              value={state.returnDate}
              onChange={(e) => setState({ ...state, returnDate: e.target.value })}
              className="w-full bg-neutral-50 rounded-xl px-4 py-3 text-sm font-bold text-dark focus:ring-2 focus:ring-primary/30 outline-none"
            />
          </div>
        </div>

        {days > 0 && bike && (
          <div className="bg-primary/5 rounded-2xl px-5 py-4 text-sm font-bold text-primary">
            {days} {days === 1 ? 'day' : 'days'} × ${bike.dailyPriceUSD} = ${bike.dailyPriceUSD * days}
            <span className="text-dark/40 font-medium"> (insurance added at next step)</span>
          </div>
        )}
      </div>
    </div>
  );
}

function StepContact({ state, setState }: StepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-black text-dark mb-2">Tell us about you</h2>
        <p className="text-sm text-neutral-500 font-medium">We'll send the booking confirmation to this email.</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-dark/60">Full Name</label>
          <input
            type="text"
            value={state.fullName}
            onChange={(e) => setState({ ...state, fullName: e.target.value })}
            placeholder="Your full name"
            className="w-full bg-neutral-50 rounded-xl px-4 py-3 text-sm font-bold text-dark focus:ring-2 focus:ring-primary/30 outline-none"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-dark/60">Email</label>
            <input
              type="email"
              value={state.email}
              onChange={(e) => setState({ ...state, email: e.target.value })}
              placeholder="you@example.com"
              className="w-full bg-neutral-50 rounded-xl px-4 py-3 text-sm font-bold text-dark focus:ring-2 focus:ring-primary/30 outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-dark/60">Phone (optional)</label>
            <input
              type="tel"
              value={state.phone}
              onChange={(e) => setState({ ...state, phone: e.target.value })}
              placeholder="+1 555 0100"
              className="w-full bg-neutral-50 rounded-xl px-4 py-3 text-sm font-bold text-dark focus:ring-2 focus:ring-primary/30 outline-none"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-dark/60">
            Notes for the team (optional)
          </label>
          <textarea
            value={state.notes}
            onChange={(e) => setState({ ...state, notes: e.target.value })}
            rows={4}
            placeholder="Helmet size, special requests…"
            className="w-full bg-neutral-50 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-primary/30 outline-none resize-none"
          />
        </div>
      </div>
    </div>
  );
}

interface StepConfirmProps {
  bike: Bike | null;
  state: BookingState;
  total: number;
  days: number;
}

function StepConfirm({ bike, state, total, days }: StepConfirmProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-black text-dark mb-2">Almost there — review &amp; confirm</h2>
        <p className="text-sm text-neutral-500 font-medium">Look good? Lock it in.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ReviewCell label="Bike" value={bike?.name ?? '—'} />
        <ReviewCell label="Type" value={bike?.type ?? '—'} />
        <ReviewCell label="Pickup" value={`${state.pickupLocation} · ${state.pickupDate || '—'}`} />
        <ReviewCell label="Return" value={state.returnDate || '—'} />
        <ReviewCell label="Duration" value={`${days} ${days === 1 ? 'day' : 'days'}`} />
        <ReviewCell label="Total" value={`$${total}`} highlight />
        <ReviewCell label="Name" value={state.fullName || '—'} />
        <ReviewCell label="Email" value={state.email || '—'} />
      </div>

      <div className="bg-primary/5 rounded-2xl p-5 text-xs font-medium text-dark/70 leading-relaxed">
        By confirming, you agree to our rental terms and free-cancellation policy (up to 12 hours before pickup).
      </div>
    </div>
  );
}

function ReviewCell({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`rounded-2xl px-4 py-3 ${highlight ? 'bg-primary text-white' : 'bg-neutral-50 text-dark'}`}>
      <div className={`text-[10px] font-black uppercase tracking-widest mb-1 ${highlight ? 'text-white/70' : 'text-neutral-400'}`}>
        {label}
      </div>
      <div className={`font-bold ${highlight ? 'text-2xl' : 'text-sm'} truncate`}>{value}</div>
    </div>
  );
}
