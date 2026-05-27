import { useState, useEffect } from 'react'
import { Activity, Server, Users, TerminalSquare, Clock, Cpu, Zap } from 'lucide-react'

const SHARDS = [
  { id: 0, ping: 42, status: 'online' },
  { id: 1, ping: 38, status: 'online' },
  { id: 2, ping: 51, status: 'online' },
  { id: 3, ping: 44, status: 'online' },
]

function formatUptime(seconds) {
  const d = Math.floor(seconds / 86400)
  const h = Math.floor((seconds % 86400) / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  if (d > 0) return `${d}d ${h}h ${m}m`
  if (h > 0) return `${h}h ${m}m ${s}s`
  return `${m}m ${s}s`
}

function latencyColor(ms) {
  if (ms < 100) return '#4ade80'
  if (ms < 250) return '#fbbf24'
  return '#f87171'
}

function latencyPercent(ms) {
  return Math.min((ms / 500) * 100, 100)
}

export default function Status() {
  const [uptime, setUptime] = useState(482340)
  const [latency, setLatency] = useState(43)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setUptime(u => u + 8)
      setLatency(38 + Math.floor(Math.random() * 20))
      setTick(t => t + 1)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  const stats = [
    { label: 'Latency', value: `${latency}ms`, icon: <Zap size={16} />, color: latencyColor(latency), showBar: true, barPct: latencyPercent(latency) },
    { label: 'Servers', value: '77', icon: <Server size={16} />, color: '#9488f0' },
    { label: 'Users', value: '10,832', icon: <Users size={16} />, color: '#9488f0' },
    { label: 'Commands', value: '52', icon: <TerminalSquare size={16} />, color: '#9488f0' },
    { label: 'Uptime', value: formatUptime(uptime), icon: <Clock size={16} />, color: '#4ade80' },
    { label: 'Shards', value: `${SHARDS.length}`, icon: <Cpu size={16} />, color: '#9488f0' },
  ]

  return (
    <div className="page-enter" style={{ maxWidth: 780, margin: '0 auto', padding: '20px 20px 40px' }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
          <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.5px' }}>status</h1>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.2)',
            padding: '4px 10px', borderRadius: 50
          }}>
            <span className="status-dot" style={{ width: 6, height: 6 }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: '#4ade80', letterSpacing: '0.05em' }}>OPERATIONAL</span>
          </div>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.42)', fontSize: 13.5, fontWeight: 500 }}>
          Real-time performance metrics · updates every 8s
        </p>
      </div>

      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 12,
        marginBottom: 24
      }} className="stats-grid">
        {stats.map(stat => (
          <div key={stat.label} className="stat-card">
            <div style={{
              display: 'flex', alignItems: 'center', gap: 7,
              color: 'rgba(255,255,255,0.35)', marginBottom: 10, fontSize: 12, fontWeight: 600,
              textTransform: 'uppercase', letterSpacing: '0.08em'
            }}>
              <span style={{ color: stat.color }}>{stat.icon}</span>
              {stat.label}
            </div>
            <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.5px', color: stat.color }}>
              {stat.value}
            </div>
            {stat.showBar && (
              <div className="latency-bar">
                <div style={{
                  height: '100%', borderRadius: 2,
                  width: `${stat.barPct}%`,
                  background: stat.color,
                  transition: 'width 0.5s ease'
                }} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Shards */}
      <div className="card" style={{ padding: '0 20px' }}>
        <div style={{
          padding: '16px 0 12px',
          fontSize: 12, fontWeight: 700,
          color: 'rgba(255,255,255,0.3)',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          borderBottom: '1px solid rgba(255,255,255,0.06)'
        }}>
          Shard Information
        </div>
        {SHARDS.map(shard => {
          const col = latencyColor(shard.ping)
          return (
            <div key={shard.id} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '14px 0',
              borderBottom: shard.id < SHARDS.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 7, height: 7, borderRadius: '50%',
                  background: col, boxShadow: `0 0 6px ${col}`
                }} />
                <span style={{ fontSize: 13.5, fontWeight: 600 }}>Shard #{shard.id}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 80 }}>
                  <div className="latency-bar" style={{ marginTop: 0 }}>
                    <div style={{
                      height: '100%', borderRadius: 2,
                      width: `${latencyPercent(shard.ping + (tick % 3) * 3)}%`,
                      background: col,
                      transition: 'width 0.5s ease'
                    }} />
                  </div>
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: col, minWidth: 50, textAlign: 'right' }}>
                  {shard.ping + (tick % 3) * 3}ms
                </span>
              </div>
            </div>
          )
        })}
      </div>

      <style>{`
        @media (max-width: 600px) { .stats-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 380px) { .stats-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  )
}
