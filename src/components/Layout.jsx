import { Outlet, NavLink, useLocation } from 'react-router-dom'
import {
  TerminalSquare, Image, Swords, Activity, FileText, Home
} from 'lucide-react'

const navLinks = [
  { to: '/commands', label: 'Commands', icon: <TerminalSquare size={15} /> },
  { to: '/avatars', label: 'Avatars', icon: <Image size={15} /> },
  { to: '/quests', label: 'Quests', icon: <Swords size={15} /> },
  { to: '/status', label: 'Status', icon: <Activity size={15} /> },
  { to: '/terms', label: 'Terms', icon: <FileText size={15} /> },
]

export default function Layout() {
  const location = useLocation()

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Nav */}
      <div className="top-nav-wrapper" style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', justifyContent: 'center', padding: '16px'
      }}>
        <nav className="nav-pill" style={{
          display: 'flex', alignItems: 'center', gap: '2px', padding: '5px 8px'
        }}>
          <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <span style={{ fontSize: 13 }}>🏠</span>
            フィアー
          </NavLink>
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              {link.icon}
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Page Content */}
      <main style={{ flex: 1, paddingTop: 80, paddingBottom: 80 }}>
        <Outlet />
      </main>

      {/* Footer */}
      <footer style={{
        padding: '20px 24px',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        fontSize: 12,
        color: 'rgba(255,255,255,0.28)',
        marginBottom: 60
      }}>
        <span>© 2026 fear</span>
        <span style={{ color: 'rgba(255,255,255,0.12)' }}>·</span>
        <span>Not affiliated with Discord Inc.</span>
        <span style={{ color: 'rgba(255,255,255,0.12)' }}>·</span>
        <span>Owned and operated by fear cult</span>
      </footer>

      {/* Bottom Nav (mobile) */}
      <nav className="bottom-nav" style={{
        justifyContent: 'space-around', alignItems: 'center'
      }}>
        <NavLink to="/" style={{ textDecoration: 'none' }}>
          {({ isActive }) => (
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
              color: isActive ? '#9488f0' : 'rgba(255,255,255,0.4)',
              fontSize: 10, fontWeight: 600, padding: '4px 8px'
            }}>
              <Home size={18} />
              Home
            </div>
          )}
        </NavLink>
        {navLinks.map(link => (
          <NavLink key={link.to} to={link.to} style={{ textDecoration: 'none' }}>
            {({ isActive }) => (
              <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
                color: isActive ? '#9488f0' : 'rgba(255,255,255,0.4)',
                fontSize: 10, fontWeight: 600, padding: '4px 8px'
              }}>
                {link.icon}
                {link.label}
              </div>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
