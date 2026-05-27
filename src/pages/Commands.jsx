import { useState, useMemo } from 'react'
import { Search } from 'lucide-react'

const COMMANDS_DATA = [
  // voicemaster
  { name: 'voicemaster setup', desc: 'Set up the voicemaster system in your server', category: 'voicemaster' },
  { name: 'voicemaster lock', desc: 'Lock your voice channel', category: 'voicemaster' },
  { name: 'voicemaster unlock', desc: 'Unlock your voice channel', category: 'voicemaster' },
  { name: 'voicemaster limit', desc: 'Set a user limit for your voice channel', category: 'voicemaster' },
  { name: 'voicemaster rename', desc: 'Rename your voice channel', category: 'voicemaster' },
  { name: 'voicemaster permit', desc: 'Permit a user to join your locked channel', category: 'voicemaster' },
  { name: 'voicemaster reject', desc: 'Reject a user from your voice channel', category: 'voicemaster' },
  { name: 'voicemaster claim', desc: 'Claim ownership of an abandoned voice channel', category: 'voicemaster' },
  // boost
  { name: 'boost message', desc: 'Set a custom boost thank-you message', category: 'boost' },
  { name: 'boost test', desc: 'Test the boost message configuration', category: 'boost' },
  { name: 'boost reset', desc: 'Reset the boost message to default', category: 'boost' },
  // ticket
  { name: 'ticket setup', desc: 'Configure the ticket panel for support', category: 'ticket' },
  { name: 'ticket add', desc: 'Add a user to an active ticket', category: 'ticket' },
  { name: 'ticket remove', desc: 'Remove a user from an active ticket', category: 'ticket' },
  { name: 'ticket close', desc: 'Close the current ticket', category: 'ticket' },
  { name: 'ticket rename', desc: 'Rename the current ticket channel', category: 'ticket' },
  // autoreact
  { name: 'autoreact add', desc: 'Add an automatic reaction to a trigger word', category: 'autoreact' },
  { name: 'autoreact remove', desc: 'Remove an autoreact trigger', category: 'autoreact' },
  { name: 'autoreact list', desc: 'List all configured autoreact triggers', category: 'autoreact' },
  // autoresponder
  { name: 'autoresponder add', desc: 'Add an automatic response to a trigger', category: 'autoresponder' },
  { name: 'autoresponder remove', desc: 'Remove an autoresponder entry', category: 'autoresponder' },
  { name: 'autoresponder list', desc: 'List all autoresponder entries', category: 'autoresponder' },
  // joindm
  { name: 'joindm setup', desc: 'Configure a DM message sent to new members', category: 'joindm' },
  { name: 'joindm disable', desc: 'Disable the join DM feature', category: 'joindm' },
  // welcome
  { name: 'welcome channel', desc: 'Set the channel for welcome messages', category: 'welcome' },
  { name: 'welcome message', desc: 'Set a custom welcome message template', category: 'welcome' },
  { name: 'welcome test', desc: 'Preview the current welcome message', category: 'welcome' },
  { name: 'welcome disable', desc: 'Disable welcome messages', category: 'welcome' },
  // autopost
  { name: 'autopost add', desc: 'Schedule automatic posts in a channel', category: 'autopost' },
  { name: 'autopost remove', desc: 'Remove a scheduled autopost', category: 'autopost' },
  { name: 'autopost list', desc: 'View all scheduled autoposts', category: 'autopost' },
  // role
  { name: 'role add', desc: 'Add a role to a user', category: 'role' },
  { name: 'role remove', desc: 'Remove a role from a user', category: 'role' },
  { name: 'role info', desc: 'View information about a role', category: 'role' },
  { name: 'role all', desc: 'Add a role to all server members', category: 'role' },
  { name: 'role restore', desc: 'Restore a member\'s previous roles', category: 'role' },
  // autorole
  { name: 'autorole add', desc: 'Add a role to be given to new members', category: 'autorole' },
  { name: 'autorole remove', desc: 'Remove a role from the autorole list', category: 'autorole' },
  { name: 'autorole list', desc: 'View all configured autoroles', category: 'autorole' },
  // lastfm
  { name: 'lastfm set', desc: 'Link your Last.fm account', category: 'lastfm' },
  { name: 'lastfm nowplaying', desc: 'Show your currently playing track', category: 'lastfm' },
  { name: 'lastfm topartists', desc: 'View your top artists', category: 'lastfm' },
  { name: 'lastfm toptracks', desc: 'View your most played tracks', category: 'lastfm' },
  { name: 'lastfm topalbums', desc: 'View your top albums', category: 'lastfm' },
  { name: 'lastfm recent', desc: 'Show your recently played tracks', category: 'lastfm' },
  // reactionrole
  { name: 'reactionrole add', desc: 'Add a reaction role to a message', category: 'reactionrole' },
  { name: 'reactionrole remove', desc: 'Remove a reaction role', category: 'reactionrole' },
  { name: 'reactionrole list', desc: 'List all reaction roles', category: 'reactionrole' },
  // goodbye
  { name: 'goodbye channel', desc: 'Set the channel for goodbye messages', category: 'goodbye' },
  { name: 'goodbye message', desc: 'Set a custom goodbye message', category: 'goodbye' },
  { name: 'goodbye test', desc: 'Preview the goodbye message', category: 'goodbye' },
  { name: 'goodbye disable', desc: 'Disable goodbye messages', category: 'goodbye' },
]

const CATEGORIES = ['all', 'voicemaster', 'boost', 'ticket', 'autoreact', 'autoresponder', 'joindm', 'welcome', 'autopost', 'role', 'autorole', 'lastfm', 'reactionrole', 'goodbye']

const TAG_COLORS = {
  voicemaster: { bg: 'rgba(124,110,224,0.14)', color: '#9488f0' },
  boost: { bg: 'rgba(251,191,36,0.12)', color: '#fbbf24' },
  ticket: { bg: 'rgba(74,222,128,0.12)', color: '#4ade80' },
  autoreact: { bg: 'rgba(248,113,113,0.12)', color: '#f87171' },
  autoresponder: { bg: 'rgba(96,165,250,0.12)', color: '#60a5fa' },
  joindm: { bg: 'rgba(167,139,250,0.12)', color: '#a78bfa' },
  welcome: { bg: 'rgba(52,211,153,0.12)', color: '#34d399' },
  autopost: { bg: 'rgba(251,146,60,0.12)', color: '#fb923c' },
  role: { bg: 'rgba(232,121,249,0.12)', color: '#e879f9' },
  autorole: { bg: 'rgba(192,132,252,0.12)', color: '#c084fc' },
  lastfm: { bg: 'rgba(248,113,113,0.14)', color: '#ef4444' },
  reactionrole: { bg: 'rgba(34,211,238,0.12)', color: '#22d3ee' },
  goodbye: { bg: 'rgba(148,163,184,0.12)', color: '#94a3b8' },
}

function CategoryCount({ cat }) {
  const count = cat === 'all' ? COMMANDS_DATA.length : COMMANDS_DATA.filter(c => c.category === cat).length
  return (
    <span style={{
      fontSize: 10, fontWeight: 700,
      background: 'rgba(255,255,255,0.08)',
      color: 'rgba(255,255,255,0.45)',
      padding: '1px 6px',
      borderRadius: 50
    }}>{count}</span>
  )
}

export default function Commands() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  const filtered = useMemo(() => {
    return COMMANDS_DATA.filter(cmd => {
      const matchCat = activeCategory === 'all' || cmd.category === activeCategory
      const matchQuery = !query || cmd.name.includes(query.toLowerCase()) || cmd.desc.toLowerCase().includes(query.toLowerCase())
      return matchCat && matchQuery
    })
  }, [query, activeCategory])

  return (
    <div className="page-enter" style={{ maxWidth: 960, margin: '0 auto', padding: '20px 20px 40px' }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.5px' }}>commands</h1>
        <p style={{ color: 'rgba(255,255,255,0.42)', fontSize: 13.5, marginTop: 6, fontWeight: 500 }}>
          {COMMANDS_DATA.length} commands across {CATEGORIES.length - 1} categories
        </p>
      </div>

      {/* Search */}
      <div style={{ position: 'relative', marginBottom: 16 }}>
        <Search size={15} style={{
          position: 'absolute', left: 14, top: '50%',
          transform: 'translateY(-50%)',
          color: 'rgba(255,255,255,0.3)', pointerEvents: 'none'
        }} />
        <input
          className="search-input"
          type="text"
          placeholder="Search commands..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </div>

      {/* Category Tabs */}
      <div style={{
        display: 'flex', gap: 4, overflowX: 'auto', paddingBottom: 4, marginBottom: 20,
        scrollbarWidth: 'none'
      }}>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`category-tab ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
            <CategoryCount cat={cat} />
          </button>
        ))}
      </div>

      {/* Commands Grid */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'rgba(255,255,255,0.28)', fontSize: 14 }}>
          No commands found
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 10,
        }}
          className="commands-grid"
        >
          {filtered.map(cmd => {
            const colors = TAG_COLORS[cmd.category] || TAG_COLORS.voicemaster
            return (
              <div key={cmd.name} className="command-card">
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 6 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 700, color: '#fff', letterSpacing: '-0.1px' }}>
                    /{cmd.name}
                  </div>
                  <span style={{
                    fontSize: 10, fontWeight: 600, padding: '2px 7px', borderRadius: 50, whiteSpace: 'nowrap',
                    background: colors.bg, color: colors.color, letterSpacing: '0.02em', flexShrink: 0
                  }}>
                    {cmd.category}
                  </span>
                </div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.42)', lineHeight: 1.5 }}>
                  {cmd.desc}
                </div>
              </div>
            )
          })}
        </div>
      )}

      <style>{`
        @media (max-width: 920px) { .commands-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 560px) { .commands-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  )
}
