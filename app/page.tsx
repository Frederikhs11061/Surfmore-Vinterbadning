'use client';

import { useState } from 'react';
import GearMatchConfigurator from '@/components/GearMatchConfigurator';

export default function Home() {
  return (
    <main className="h-full w-full bg-white">
      <GearMatchConfigurator />
    </main>
  );
}
