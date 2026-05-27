'use client';

import { ReactNode } from 'react';
import { LayoutGroup } from 'motion/react';
import Header from '../Header';
import Footer from '../Footer';
import ScrollToTop from './ScrollToTop';
import PageTransition from './PageTransition';
import RouteProgressBar from './RouteProgressBar';

export default function ClientShell({ children }: { children: ReactNode }) {
  return (
    <LayoutGroup>
      <div className="min-h-screen flex flex-col">
        <RouteProgressBar />
        <Header />
        <ScrollToTop />
        <main className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </div>
    </LayoutGroup>
  );
}
