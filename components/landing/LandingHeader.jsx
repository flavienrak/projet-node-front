'use client';

import React from 'react';

import { SquareKanban } from 'lucide-react';

export default function LandingHeader() {
  return (
    <div className="w-full h-14 flex justify-center bg-[var(--secondary-color)] border-b border-[var(--text-primary-color)]/10">
      <div className="w-full max-w-7xl flex items-center justify-between">
        <div className="flex items-center gap-1 text-[var(--primary-color)]">
          <SquareKanban />
          <h1 className="text-2xl font-semibold">Card</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex justify-center items-center py-2 px-3 text-sm text-[var(--primary-color)] border border-[var(--primary-color)] rounded-md cursor-pointer hover:bg-[var(--primary-color)]/10">
            Commencer
          </button>
          <button className="flex justify-center items-center py-2 px-3 text-sm text-white bg-[var(--primary-color)] border border-[var(--primary-color)]/25 rounded-md cursor-pointer hover:opacity-80">
            Rejoindre
          </button>
        </div>
      </div>
    </div>
  );
}
