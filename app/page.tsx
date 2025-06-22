import React from 'react';
import LandingComponent from '@/components/landing/LandingComponent';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Landing',
  description: 'Landing Page',
};

export default function LandingPage() {
  return (
    <div className="w-full h-full min-h-screen text-[var(--text-primary-color)] [background-image:var(--bg-primary)]">
      <LandingComponent />
    </div>
  );
}
