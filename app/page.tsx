'use client';

import { useState } from 'react';
import GearMatchConfigurator from '@/components/GearMatchConfigurator';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-surfmore-light via-white to-surfmore-light">
      <div className="container mx-auto px-4 py-8">
        <GearMatchConfigurator />
      </div>
    </main>
  );
}
