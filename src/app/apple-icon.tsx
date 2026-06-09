import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
          borderRadius: 40,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
          }}
        >
          {/* Tent silhouette */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              marginBottom: 6,
            }}
          >
            {/* Left slope */}
            <div
              style={{
                width: 0,
                height: 0,
                borderStyle: 'solid',
                borderWidth: '0 38px 54px 0',
                borderColor: 'transparent rgba(255,255,255,0.95) transparent transparent',
              }}
            />
            {/* Right slope */}
            <div
              style={{
                width: 0,
                height: 0,
                borderStyle: 'solid',
                borderWidth: '0 0 54px 38px',
                borderColor: 'transparent transparent rgba(255,255,255,0.95) transparent',
              }}
            />
          </div>
          {/* Wordmark */}
          <span
            style={{
              fontSize: 36,
              fontWeight: 900,
              color: 'white',
              letterSpacing: '-1px',
              lineHeight: 1,
            }}
          >
            CampyWin
          </span>
        </div>
      </div>
    ),
    { ...size },
  )
}
