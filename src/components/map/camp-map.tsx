'use client';
import { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { ACCOMMODATIONS, MAP_SPOTS, type MapSpot, type Accommodation } from '@/lib/mock-data';

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

    // isMounted lets the cleanup cancel an in-flight async init
    // (React StrictMode / Turbopack HMR fire the effect twice before the
    // first async import resolves, causing "already initialized")
    let isMounted = true;

    import('leaflet').then(L => {
      // Bail if cleanup already ran or another init already finished
      if (!isMounted || !mapRef.current) return;
      if (mapInstanceRef.current) return;

      // HMR can leave a stale _leaflet_id on the container without calling
      // remove() — wipe it so Leaflet accepts a fresh init
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
        attributionControl: false,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
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
            box-shadow:0 2px 8px rgba(0,0,0,0.25);
            border:2px solid #fff;
            cursor:pointer;
            line-height:1.2;
          ">${spot.weather.icon} ${acc.price} TND</div>`,
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
    <div className="relative w-full h-full rounded-2xl overflow-hidden" style={{ isolation: 'isolate' }}>
      <div ref={mapRef} className="w-full h-full" />

      {/* Popup panel */}
      {selectedSpot && acc && weather && (
        <div className="absolute top-4 right-4 z-[1000] w-72 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="relative h-32">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={acc.image} alt={acc.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <button
              onClick={() => setSelectedSpot(null)}
              className="absolute top-2 right-2 w-6 h-6 bg-black/40 rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors text-xs"
            >✕</button>
            <div className="absolute bottom-2 left-3">
              <span className="text-xs bg-white/20 backdrop-blur text-white px-2 py-0.5 rounded-full font-medium">{acc.category}</span>
            </div>
          </div>

          <div className="p-4 space-y-3">
            <div>
              <h3 className="font-black text-gray-900 dark:text-white text-sm leading-snug">{acc.title}</h3>
              <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                <span>📍</span> {acc.location}
              </p>
            </div>

            {/* Weather */}
            <div className="bg-gradient-to-r from-sky-50 to-blue-50 dark:from-sky-900/20 dark:to-blue-900/20 rounded-xl p-3 border border-sky-100 dark:border-sky-800/30">
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">Current Weather</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{weather.icon}</span>
                  <div>
                    <p className="font-black text-gray-900 dark:text-white text-lg">{weather.temp}°C</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{weather.condition}</p>
                  </div>
                </div>
                <div className="text-right text-xs text-gray-500 dark:text-gray-400 space-y-0.5">
                  <p>💧 {weather.humidity}% humidity</p>
                  <p>💨 {weather.wind} km/h wind</p>
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1">
                {weather.temp < 25 ? (
                  <span className="text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded-full font-medium">✅ Great for camping!</span>
                ) : weather.temp < 33 ? (
                  <span className="text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-2 py-0.5 rounded-full font-medium">⚠️ Warm — bring shade</span>
                ) : (
                  <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-2 py-0.5 rounded-full font-medium">🔥 Very hot — night stays recommended</span>
                )}
              </div>
            </div>

            {/* Price + rating */}
            <div className="flex items-center justify-between">
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
              onClick={() => { onBookClick?.(acc); setSelectedSpot(null); }}
              disabled={!acc.available}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-bold text-sm rounded-xl transition-all active:scale-95"
            >
              {acc.available ? '⛺ Book This Stay' : 'Fully Booked'}
            </button>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 z-[1000] bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 px-3 py-2">
        <p className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wide">Weather Legend</p>
        <div className="space-y-1">
          {[['🌞', 'Sunny / Hot', '#dc2626'], ['☀️', 'Warm & Sunny', '#16a34a'], ['⛅', 'Partly Cloudy', '#0284c7']].map(([icon, label, color]) => (
            <div key={label} className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
              <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
              {icon} {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
