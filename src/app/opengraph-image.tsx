import { ImageResponse } from 'next/og';

export const runtime     = 'edge';
export const alt         = "CampyWin – Tunisia's Premier Outdoor Adventure Platform";
export const size        = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(145deg, #022c22 0%, #052e16 20%, #064e3b 50%, #065f46 75%, #047857 100%)',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* ── Stars layer ── */}
        {[
          [80, 60], [200, 35], [340, 80], [500, 25], [660, 55], [820, 30], [980, 70], [1120, 40],
          [140, 140], [420, 120], [700, 90], [940, 130], [1060, 160],
          [60, 200], [280, 180], [560, 210], [780, 170], [1080, 195],
        ].map(([x, y], i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: i % 3 === 0 ? 3 : 2,
              height: i % 3 === 0 ? 3 : 2,
              borderRadius: '50%',
              background: i % 4 === 0 ? '#6ee7b7' : '#ffffff',
              opacity: 0.6 + (i % 4) * 0.1,
            }}
          />
        ))}

        {/* ── Decorative ring top-right ── */}
        <div
          style={{
            position: 'absolute',
            top: -120,
            right: -120,
            width: 400,
            height: 400,
            borderRadius: '50%',
            border: '2px solid rgba(52, 211, 153, 0.15)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: -80,
            right: -80,
            width: 300,
            height: 300,
            borderRadius: '50%',
            border: '2px solid rgba(52, 211, 153, 0.10)',
          }}
        />

        {/* ── Mountain silhouette ── */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, display: 'flex', alignItems: 'flex-end' }}>
          {/* Far mountains */}
          <div style={{
            position: 'absolute', bottom: 0, left: -20,
            width: 0, height: 0,
            borderLeft: '280px solid transparent',
            borderRight: '280px solid transparent',
            borderBottom: '200px solid rgba(4, 120, 87, 0.25)',
          }} />
          <div style={{
            position: 'absolute', bottom: 0, left: 180,
            width: 0, height: 0,
            borderLeft: '220px solid transparent',
            borderRight: '220px solid transparent',
            borderBottom: '160px solid rgba(4, 120, 87, 0.20)',
          }} />
          <div style={{
            position: 'absolute', bottom: 0, right: 100,
            width: 0, height: 0,
            borderLeft: '300px solid transparent',
            borderRight: '300px solid transparent',
            borderBottom: '220px solid rgba(4, 120, 87, 0.22)',
          }} />
          {/* Near mountains */}
          <div style={{
            position: 'absolute', bottom: 0, left: 100,
            width: 0, height: 0,
            borderLeft: '200px solid transparent',
            borderRight: '200px solid transparent',
            borderBottom: '170px solid rgba(2, 44, 34, 0.70)',
          }} />
          <div style={{
            position: 'absolute', bottom: 0, left: 380,
            width: 0, height: 0,
            borderLeft: '250px solid transparent',
            borderRight: '250px solid transparent',
            borderBottom: '200px solid rgba(2, 44, 34, 0.75)',
          }} />
          <div style={{
            position: 'absolute', bottom: 0, right: -40,
            width: 0, height: 0,
            borderLeft: '260px solid transparent',
            borderRight: '260px solid transparent',
            borderBottom: '180px solid rgba(2, 44, 34, 0.65)',
          }} />
          {/* Ground strip */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: 60,
            background: 'rgba(2, 44, 34, 0.85)',
          }} />
        </div>

        {/* ── Main content ── */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          paddingBottom: 120,
          paddingTop: 40,
        }}>
          {/* Badge */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(52, 211, 153, 0.15)',
            border: '1px solid rgba(52, 211, 153, 0.35)',
            borderRadius: 100,
            padding: '6px 20px',
            marginBottom: 32,
          }}>
            <div style={{ fontSize: 14, color: '#6ee7b7', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Tunisia's Outdoor Adventure Platform
            </div>
          </div>

          {/* Logo tent */}
          <div style={{ fontSize: 72, marginBottom: 16, display: 'flex' }}>⛺</div>

          {/* Brand name */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 0,
            marginBottom: 20,
          }}>
            <span style={{ fontSize: 96, fontWeight: 900, color: '#ffffff', letterSpacing: '-3px', lineHeight: 1 }}>
              Campy
            </span>
            <span style={{ fontSize: 96, fontWeight: 900, color: '#34d399', letterSpacing: '-3px', lineHeight: 1 }}>
              Win
            </span>
          </div>

          {/* Tagline */}
          <div style={{
            fontSize: 28,
            fontWeight: 500,
            color: 'rgba(255,255,255,0.75)',
            letterSpacing: '0.02em',
            marginBottom: 48,
          }}>
            Explore the Wild, Find Your Win
          </div>

          {/* Feature pills */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
            {[
              ['🏕️', 'Glamping Stays'],
              ['📅', 'Events'],
              ['💼', 'Careers'],
              ['🗺️', 'Map'],
              ['🚗', 'Covoiturage'],
              ['🛒', 'Gear Shop'],
            ].map(([emoji, label]) => (
              <div
                key={label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 12,
                  padding: '10px 18px',
                  fontSize: 18,
                  color: 'rgba(255,255,255,0.90)',
                  fontWeight: 600,
                }}
              >
                <span style={{ fontSize: 20 }}>{emoji}</span>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div style={{
          position: 'absolute',
          bottom: 22,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingLeft: 60,
          paddingRight: 60,
          zIndex: 10,
        }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: '#34d399', letterSpacing: '0.05em' }}>
            campywin.tn
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {['🌍 Tunisie', '⭐ 4.9/5', '2000+ Aventuriers'].map(t => (
              <div key={t} style={{
                fontSize: 15,
                color: 'rgba(255,255,255,0.60)',
                fontWeight: 500,
                display: 'flex',
              }}>{t}</div>
            ))}
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
