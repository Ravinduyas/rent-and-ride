'use client';

import { motion } from 'motion/react';
import { Check, Minus } from 'lucide-react';
import type { PriceTier } from '../../lib/types';

interface Props {
  tiers: PriceTier[];
}

interface Row {
  label: string;
  values: (string | boolean)[];
}

export default function PricingComparison({ tiers }: Props) {
  const rows: Row[] = [
    { label: 'Helmet & Lock', values: [true, true, true, true] },
    { label: 'Insurance Coverage', values: ['Basic', 'Basic', 'Comprehensive', 'Premium'] },
    { label: 'Free Cancellation', values: ['1 h prior', '12 h prior', '12 h prior', '12 h prior'] },
    { label: 'Phone Holder', values: [false, false, true, true] },
    { label: 'Top-box Storage', values: [false, false, false, true] },
    { label: 'Bike Swap', values: [false, false, '1 / week', 'Unlimited'] },
    { label: 'Add-on Discount', values: [false, false, '15%', '25%'] },
    { label: 'Priority 24/7 Support', values: [false, false, false, true] },
  ];

  const renderCell = (v: string | boolean) => {
    if (v === true) return <Check size={20} className="text-primary mx-auto" />;
    if (v === false) return <Minus size={20} className="text-neutral-300 mx-auto" />;
    return <span className="text-xs font-bold text-dark">{v}</span>;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className="overflow-x-auto bg-white rounded-3xl border border-neutral-100 shadow-sm"
    >
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-neutral-100">
            <th className="text-left p-6 font-black uppercase tracking-widest text-xs text-dark/60">Feature</th>
            {tiers.map((t) => (
              <th
                key={t.id}
                className={`p-6 font-black uppercase tracking-widest text-xs ${
                  t.popular ? 'text-primary' : 'text-dark/60'
                }`}
              >
                {t.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr
              key={row.label}
              className={`border-b border-neutral-50 ${ri % 2 === 0 ? 'bg-neutral-50/50' : ''}`}
            >
              <td className="p-5 font-bold text-dark/80">{row.label}</td>
              {row.values.map((v, vi) => (
                <td key={vi} className="p-5 text-center">{renderCell(v)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}