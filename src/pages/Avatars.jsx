import { useState } from 'react'
import { Download, X } from 'lucide-react'

const AVATAR_COLORS = [
  ['#7c6ee0', '#4a3fa0'],
  ['#f87171', '#b91c1c'],
  ['#4ade80', '#16a34a'],
  ['#fbbf24', '#d97706'],
  ['#60a5fa', '#2563eb'],
  ['#e879f9', '#a21caf'],
  ['#34d399', '#059669'],
  ['#fb923c', '#c2410c'],
  ['#a78bfa', '#7c3aed'],
  ['#22d3ee', '#0891b2'],
  ['#f472b6', '#db2777'],
  ['#94a3b8', '#475569'],
]

const AVATAR_EMOJIS = ['👾', '🤖', '🦊', '🐉', '🌙', '⚡', '🔮', '🎭', '💎', '🌸', '🦋', '🎪']

const AVATARS = AVATAR_COLORS.map((colors, i) => ({
  id: i + 1,
  name: `フィアー Avatar #${i + 1}`,
  gradient: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`,
  emoji: AVATAR_EMOJIS[i],
  colors,
}))

function AvatarPlaceholder({ gradient, emoji, size = 200 }) {
  return (
    <div style={{
      width: size, height: size,
      background: gradient,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.35,
    }}>
      {emoji}
    </div>
  )
}

export default function Avatars() {
  const [selected, setSelected] = useState(null)

  return (
    <div className="page-enter" style={{ maxWidth: 960, margin: '0 auto', padding: '20px 20px 40px' }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.5px' }}>avatars</h1>
        <p style={{ color: 'rgba(255,255,255,0.42)', fontSize: 13.5, marginTop: 6, fontWeight: 500 }}>
          {AVATARS.length} avatars in the gallery
        </p>
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 12,
      }} className="avatar-grid">
        {AVATARS.map(avatar => (
          <div
            key={avatar.id}
            className="avatar-card"
            onClick={() => setSelected(avatar)}
          >
            <div style={{ overflow: 'hidden' }}>
              <AvatarPlaceholder gradient={avatar.gradient} emoji={avatar.emoji} size="100%" />
            </div>
            <div style={{ padding: '10px 12px' }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.7)', letterSpacing: '-0.1px' }}>
                {avatar.name}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 200, padding: 20,
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: '#111213',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 20,
              overflow: 'hidden',
              maxWidth: 440, width: '100%',
            }}
          >
            {/* Close */}
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '16px 20px',
              borderBottom: '1px solid rgba(255,255,255,0.07)'
            }}>
              <span style={{ fontWeight: 700, fontSize: 14 }}>{selected.name}</span>
              <button
                onClick={() => setSelected(null)}
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  border: 'none', borderRadius: '50%', width: 28, height: 28,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(255,255,255,0.6)', cursor: 'pointer'
                }}
              >
                <X size={14} />
              </button>
            </div>

            {/* Image */}
            <div style={{
              background: selected.gradient,
              width: '100%', aspectRatio: '1',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 120,
            }}>
              {selected.emoji}
            </div>

            {/* Actions */}
            <div style={{ padding: '16px 20px', display: 'flex', gap: 8 }}>
              <button className="invite-btn" style={{ flex: 1, justifyContent: 'center', fontSize: 13 }}>
                <Download size={14} />
                Download Avatar
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 720px) { .avatar-grid { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (max-width: 480px) { .avatar-grid { grid-template-columns: repeat(2, 1fr) !important; } }
      `}</style>
    </div>
  )
}
