import { Link } from 'react-router-dom'
import { TerminalSquare, Image, Swords, Activity, FileText, Users, Server, ExternalLink } from 'lucide-react'

const menuItems = [
  { to: '/commands', icon: <TerminalSquare size={16} />, label: 'Commands', desc: 'Browse all bot commands' },
  { to: '/avatars', icon: <Image size={16} />, label: 'Avatars', desc: 'View bot avatar gallery' },
  { to: '/quests', icon: <Swords size={16} />, label: 'Quests', desc: 'Daily & weekly challenges' },
  { to: '/status', icon: <Activity size={16} />, label: 'Status', desc: 'Live bot performance' },
  { to: '/terms', icon: <FileText size={16} />, label: 'Terms', desc: 'Terms of service' },
]

export default function Home() {
  return (
    <div className="page-enter" style={{
      maxWidth: 820,
      margin: '0 auto',
      padding: '40px 20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 32
    }}>
      {/* Two-column hero */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 16,
        width: '100%',
        maxWidth: 700
      }}
        className="hero-grid"
      >
        {/* Left: Navigation Card */}
        <div className="card" style={{ padding: 8, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <div style={{
            padding: '10px 14px',
            fontSize: 11,
            fontWeight: 700,
            color: 'rgba(255,255,255,0.25)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em'
          }}>
            Navigation
          </div>
          {menuItems.map(item => (
            <Link
              key={item.to}
              to={item.to}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '10px 14px',
                borderRadius: 10,
                textDecoration: 'none',
                color: 'rgba(255,255,255,0.75)',
                transition: 'background 0.12s ease, color 0.12s ease',
                fontSize: 13.5,
                fontWeight: 500,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                e.currentTarget.style.color = '#fff'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = 'rgba(255,255,255,0.75)'
              }}
            >
              <span style={{ color: '#9488f0', opacity: 0.9 }}>{item.icon}</span>
              <div>
                <div style={{ fontWeight: 600 }}>{item.label}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 1 }}>{item.desc}</div>
              </div>
            </Link>
          ))}
        </div>

        {/* Right: Bot Card */}
        <div className="card" style={{
          padding: 24,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16,
          textAlign: 'center'
        }}>
          {/* Avatar */}
          <div style={{ position: 'relative' }}>
            <div style={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #7c6ee0, #4a3fa0)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 36,
              border: '3px solid rgba(255,255,255,0.1)',
              boxShadow: '0 8px 32px rgba(124,110,224,0.3)'
            }}>
              👾
            </div>
            {/* Online indicator */}
            <div style={{
              position: 'absolute',
              bottom: 4,
              right: 4,
              width: 14,
              height: 14,
              background: '#4ade80',
              borderRadius: '50%',
              border: '2.5px solid #111213',
              boxShadow: '0 0 6px #4ade80'
            }} />
          </div>

          {/* Bot name */}
          <div>
            <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.3px' }}>
              フィアー
            </div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.42)', marginTop: 3, fontWeight: 500 }}>
              ディスコードボット
            </div>
          </div>

          {/* Stats */}
          <div style={{
            display: 'flex',
            gap: 16,
            background: 'rgba(255,255,255,0.04)',
            borderRadius: 10,
            padding: '10px 16px',
            border: '1px solid rgba(255,255,255,0.06)',
            width: '100%',
            justifyContent: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 600 }}>
              <Users size={13} style={{ color: '#9488f0' }} />
              <span style={{ color: '#fff' }}>10.8K</span>
              <span style={{ color: 'rgba(255,255,255,0.38)' }}>users</span>
            </div>
            <div style={{ width: 1, background: 'rgba(255,255,255,0.08)' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 600 }}>
              <Server size={13} style={{ color: '#9488f0' }} />
              <span style={{ color: '#fff' }}>77</span>
              <span style={{ color: 'rgba(255,255,255,0.38)' }}>servers</span>
            </div>
          </div>

          {/* Status badge */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 12,
            fontWeight: 600,
            color: '#4ade80',
            background: 'rgba(74,222,128,0.08)',
            padding: '5px 12px',
            borderRadius: 50,
            border: '1px solid rgba(74,222,128,0.15)'
          }}>
            <span className="status-dot" style={{ width: 6, height: 6 }} />
            オンライン
          </div>

          {/* Invite button */}
          <a
            href="https://discord.com/oauth2/authorize"
            className="invite-btn"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            <ExternalLink size={14} />
            Add to Discord
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 540px) {
          .hero-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
