'use client';
import { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { ACCOMMODATIONS, MAP_SPOTS, type MapSpot, type Accommodation } from '@/lib/mock-data';
import { X } from 'lucide-react';

const CONDITION_COLOR: Record<string, string> = {
  Sunny: '#16a34a',
  'Partly Cloudy': '#0284c7',
  Cloudy: '#6b7280',
  Windy: '#7c3aed',
  Hot: '#dc2626',
};

interface Props {
  onBookClick?: (acc: Accommodation) => void;
  compact?: boolean;
}

export function CampMap({ onBookClick, compact = false }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<unknown>(null);
  const [selectedSpot, setSelectedSpot] = useState<{ spot: MapSpot; acc: Accommodation } | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;
    let isMounted = true;

    import('leaflet').then(L => {
      if (!isMounted || !mapRef.current) return;
      if (mapInstanceRef.current) return;

      const container = mapRef.current as HTMLElement & { _leaflet_id?: number };
      delete container._leaflet_id;

      delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      const map = L.map(container, {
        center: [34.5, 9.0],
        zoom: compact ? 6 : 7,
        zoomControl: !compact,
        scrollWheelZoom: !compact,
        dragging: !compact,
        tap: false, // prevents ghost-click on mobile Safari
        attributionControl: false,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18,
      }).addTo(map);

      MAP_SPOTS.forEach(spot => {
        const acc = ACCOMMODATIONS.find(a => a.id === spot.accommodationId);
        if (!acc) return;

        const color = CONDITION_COLOR[spot.weather.condition] ?? '#16a34a';

        const icon = L.divIcon({
          className: '',
          html: `<div style="
            background:${color};
            color:#fff;
            font-size:11px;
            font-weight:800;
            padding:4px 8px;
            border-radius:20px;
            white-space:nowrap;
            box-shadow:0 2px 8px rgba(0,0,0,0.30);
            border:2px solid #fff;
            cursor:pointer;
            line-height:1.4;
            user-select:none;
          ">${spot.weather.icon} ${acc.price}&nbsp;TND</div>`,
          iconAnchor: [40, 14],
        });

        const marker = L.marker([spot.lat, spot.lng], { icon }).addTo(map);
        marker.on('click', () => setSelectedSpot({ spot, acc }));
      });

      L.control.attribution({ prefix: false }).addTo(map);
      mapInstanceRef.current = map;
    });

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        (mapInstanceRef.current as { remove: () => void }).remove();
        mapInstanceRef.current = null;
      }
    };
  }, [compact]);

  const acc = selectedSpot?.acc;
  const weather = selectedSpot?.spot.weather;

  return (
    <div className="relative w-full h-full" style={{ isolation: 'isolate' }}>
      {/* Map tile */}
      <div ref={mapRef} className="w-full h-full" />

      {/* ── Spot popup — bottom-sheet on mobile, top-right panel on lg ── */}
      {selectedSpot && acc && weather && (
        <>
          {/* Mobile: fixed bottom sheet */}
          <div className="lg:hidden fixed inset-x-0 bottom-0 z-[2000] p-3">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
              <SpotCard
                acc={acc}
                weather={weather}
                onClose={() => setSelectedSpot(null)}
                onBook={() => { onBookClick?.(acc); setSelectedSpot(null); }}
              />
            </div>
          </div>

          {/* Desktop: absolute top-right panel */}
          <div className="hidden lg:block absolute top-4 right-4 z-[1000] w-72">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
              <SpotCard
                acc={acc}
                weather={weather}
                onClose={() => setSelectedSpot(null)}
                onBook={() => { onBookClick?.(acc); setSelectedSpot(null); }}
              />
            </div>
          </div>

          {/* Mobile backdrop */}
          <div
            className="lg:hidden fixed inset-0 bg-black/30 z-[1999]"
            onClick={() => setSelectedSpot(null)}
          />
        </>
      )}

      {/* Weather legend */}
      {!compact && (
        <div className="absolute bottom-4 left-4 z-[1000] bg-white/95 dark:bg-gray-900/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 px-3 py-2 hidden sm:block">
          <p className="text-[10px] font-bold text-gray-400 mb-1.5 uppercase tracking-widest">Legend</p>
          <div className="space-y-1">
            {[
              ['☀️', 'Sunny / Hot',    '#dc2626'],
              ['🌿', 'Warm & Clear',   '#16a34a'],
              ['⛅', 'Partly Cloudy', '#0284c7'],
            ].map(([icon, label, color]) => (
              <div key={label} className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                {icon} {label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function SpotCard({
  acc,
  weather,
  onClose,
  onBook,
}: {
  acc: Accommodation;
  weather: MapSpot['weather'];
  onClose: () => void;
  onBook: () => void;
}) {
  return (
    <>
      <div className="relative h-28 lg:h-32">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={acc.image} alt={acc.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <button
          onClick={onClose}
          className="absolute top-2 right-2 w-7 h-7 bg-black/40 rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
        <div className="absolute bottom-2 left-3">
          <span className="text-xs bg-white/20 backdrop-blur text-white px-2 py-0.5 rounded-full font-medium">{acc.category}</span>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-black text-gray-900 dark:text-white text-sm leading-snug">{acc.title}</h3>
          <p className="text-xs text-gray-400 mt-0.5">📍 {acc.location}</p>
        </div>

        <div className="bg-sky-50 dark:bg-sky-900/20 rounded-xl p-3 border border-sky-100 dark:border-sky-800/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{weather.icon}</span>
              <div>
                <p className="font-black text-gray-900 dark:text-white">{weather.temp}°C</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{weather.condition}</p>
              </div>
            </div>
            <div className="text-right text-xs text-gray-500 dark:text-gray-400 space-y-0.5">
              <p>💧 {weather.humidity}%</p>
              <p>💨 {weather.wind} km/h</p>
            </div>
          </div>
          <span className={`mt-2 inline-block text-xs px-2 py-0.5 rounded-full font-medium ${
            weather.temp < 25 ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
            weather.temp < 33 ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
            'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
          }`}>
            {weather.temp < 25 ? '✅ Ideal for camping' : weather.temp < 33 ? '⚠️ Warm — pack shade' : '🔥 Very hot'}
          </span>
        </div>

        <div className="flex items-center justify-between pt-1">
          <div>
            <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">{acc.price} TND</span>
            <span className="text-xs text-gray-400 ml-1">/night</span>
          </div>
          <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded-lg">
            <span className="text-amber-400">★</span>
            <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{acc.rating}</span>
            <span className="text-xs text-gray-400">({acc.reviewCount})</span>
          </div>
        </div>

        <button
          onClick={onBook}
          disabled={!acc.available}
          className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold text-sm rounded-xl transition-all active:scale-95"
        >
          {acc.available ? '⛺ Book This Stay' : 'Fully Booked'}
        </button>
      </div>
    </>
  );
}
