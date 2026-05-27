import { Bike as BikeIcon, Calendar, MapPin, User } from 'lucide-react';
import type { Bike, BookingState } from '../../lib/types';

interface Props {
  bike: Bike | null;
  state: BookingState;
  days: number;
  total: number;
  insurance: number;
  subtotal: number;
}

export default function BookingSummary({ bike, state, days, total, insurance, subtotal }: Props) {
  return (
    <aside className="lg:sticky lg:top-28 bg-white rounded-3xl shadow-xl border border-neutral-100 p-6 lg:p-8 space-y-6">
      <h3 className="text-sm font-black uppercase tracking-widest text-dark/60">Booking Summary</h3>

      {bike ? (
        <div className="flex items-center gap-4">
          <img src={bike.images[0]} alt={bike.name} className="w-20 h-20 rounded-2xl object-cover shrink-0" />
          <div className="min-w-0">
            <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">{bike.type}</div>
            <div className="font-black text-dark text-base truncate">{bike.name}</div>
            <div className="text-xs font-bold text-primary">${bike.dailyPriceUSD} / day</div>
          </div>
        </div>
      ) : (
        <div className="bg-neutral-50 rounded-2xl p-4 text-sm text-neutral-500 font-medium flex items-center gap-3">
          <BikeIcon size={18} className="text-neutral-300" />
          No bike selected yet
        </div>
      )}

      <div className="space-y-3 text-sm">
        <Row icon={<MapPin size={14} className="text-primary" />} label="Location" value={state.pickupLocation || '—'} />
        <Row icon={<Calendar size={14} className="text-primary" />} label="Pickup" value={state.pickupDate || '—'} />
        <Row icon={<Calendar size={14} className="text-secondary" />} label="Return" value={state.returnDate || '—'} />
        {state.fullName && <Row icon={<User size={14} className="text-primary" />} label="Name" value={state.fullName} />}
      </div>

      {bike && days > 0 && (
        <div className="space-y-2 pt-4 border-t border-neutral-100">
          <div className="flex justify-between text-sm">
            <span className="text-neutral-500 font-medium">
              ${bike.dailyPriceUSD} × {days} {days === 1 ? 'day' : 'days'}
            </span>
            <span className="font-bold text-dark">${subtotal}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-neutral-500 font-medium">Insurance</span>
            <span className="font-bold text-dark">${insurance}</span>
          </div>
          <div className="flex justify-between pt-3 border-t border-neutral-100">
            <span className="font-black text-dark uppercase text-xs tracking-widest">Total</span>
            <span className="font-black text-2xl text-primary">${total}</span>
          </div>
        </div>
      )}
    </aside>
  );
}

interface RowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function Row({ icon, label, value }: RowProps) {
  return (
    <div className="flex items-start gap-2 justify-between">
      <span className="flex items-center gap-2 text-neutral-500 font-medium">
        {icon}
        {label}
      </span>
      <span className="text-dark font-bold text-right">{value}</span>
    </div>
  );
}
