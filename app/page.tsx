'use client';

import { useState } from 'react';
import GearMatchConfigurator from '@/components/GearMatchConfigurator';

export default function Home() {
  return (
    <main className="h-screen w-full bg-white overflow-hidden">
      <div className="h-full w-full overflow-y-auto">
        <GearMatchConfigurator />
      </div>
    </main>
  );
}
