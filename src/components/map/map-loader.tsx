'use client';
import dynamic from 'next/dynamic';
import type { Accommodation } from '@/lib/mock-data';

const CampMapInner = dynamic(
  () => import('./camp-map').then(m => ({ default: m.CampMap })),
  { ssr: false, loading: () => <MapSkeleton /> }
);

function MapSkeleton() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl flex items-center justify-center">
      <div className="text-center text-gray-400">
        <div className="text-4xl mb-3 animate-bounce">🗺️</div>
        <p className="text-sm font-medium">Loading map…</p>
      </div>
    </div>
  );
}

export function MapLoader({ onBookClick, compact }: { onBookClick?: (acc: Accommodation) => void; compact?: boolean }) {
  return <CampMapInner onBookClick={onBookClick} compact={compact} />;
}
