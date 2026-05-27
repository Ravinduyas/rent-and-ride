'use client';

import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, User, Mail, Phone, MessageSquare } from 'lucide-react';

interface FormState {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const empty: FormState = { name: '', email: '', phone: '', message: '' };

export default function ContactForm() {
  const [state, setState] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (state.name.trim().length < 2) e.name = 'Please enter your name';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) e.email = 'Please enter a valid email';
    if (state.message.trim().length < 8) e.message = 'Message is a bit short — tell us a little more';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-neutral-100 p-8 lg:p-10">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-12 space-y-4"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 240, damping: 16, delay: 0.1 }}
              className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center mx-auto"
            >
              <CheckCircle2 size={42} />
            </motion.div>
            <h3 className="text-2xl font-black text-dark">Message sent!</h3>
            <p className="text-neutral-500 font-medium max-w-sm mx-auto">
              Thanks {state.name.split(' ')[0]} — we'll get back to you within 24 hours.
            </p>
            <button
              onClick={() => {
                setState(empty);
                setSubmitted(false);
              }}
              className="text-sm font-bold text-primary hover:underline"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-5"
            noValidate
          >
            <div>
              <h3 className="text-2xl font-black text-dark mb-1">Send us a message</h3>
              <p className="text-sm text-neutral-500 font-medium">We typically respond within 24 hours.</p>
            </div>

            <Field
              label="Full Name"
              icon={<User size={14} className="text-primary" />}
              error={errors.name}
              input={
                <input
                  type="text"
                  value={state.name}
                  onChange={(e) => setState({ ...state, name: e.target.value })}
                  placeholder="Your name"
                  className="w-full bg-neutral-100 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-primary/30 outline-none"
                />
              }
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field
                label="Email"
                icon={<Mail size={14} className="text-primary" />}
                error={errors.email}
                input={
                  <input
                    type="email"
                    value={state.email}
                    onChange={(e) => setState({ ...state, email: e.target.value })}
                    placeholder="you@example.com"
                    className="w-full bg-neutral-100 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-primary/30 outline-none"
                  />
                }
              />
              <Field
                label="Phone (optional)"
                icon={<Phone size={14} className="text-primary" />}
                error={errors.phone}
                input={
                  <input
                    type="tel"
                    value={state.phone}
                    onChange={(e) => setState({ ...state, phone: e.target.value })}
                    placeholder="+1 555 0100"
                    className="w-full bg-neutral-100 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-primary/30 outline-none"
                  />
                }
              />
            </div>

            <Field
              label="Message"
              icon={<MessageSquare size={14} className="text-primary" />}
              error={errors.message}
              input={
                <textarea
                  value={state.message}
                  onChange={(e) => setState({ ...state, message: e.target.value })}
                  rows={5}
                  placeholder="Tell us what you're thinking about…"
                  className="w-full bg-neutral-100 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-primary/30 outline-none resize-none"
                />
              }
            />

            <button
              type="submit"
              className="w-full inline-flex justify-center items-center gap-3 bg-primary text-white px-8 py-4 rounded-full font-black uppercase tracking-widest text-sm shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform"
            >
              <Send size={18} /> Send Message
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

interface FieldProps {
  label: string;
  icon: React.ReactNode;
  input: React.ReactNode;
  error?: string;
}

function Field({ label, icon, input, error }: FieldProps) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase tracking-widest text-dark/60 flex items-center gap-2">
        {icon} {label}
      </label>
      {input}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="text-xs font-bold text-red-500"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}