import { useState } from 'react'
import { Trophy, Zap, Star, Clock, CheckCircle2, Lock } from 'lucide-react'

const DAILY_QUESTS = [
  {
    id: 1,
    title: 'Chat Active',
    desc: 'Send 50 messages in any server channel',
    xp: 150,
    progress: 32,
    total: 50,
    icon: '💬',
    difficulty: 'Easy',
    diffColor: '#4ade80',
  },
  {
    id: 2,
    title: 'Voice Time',
    desc: 'Spend 30 minutes in a voice channel',
    xp: 200,
    progress: 12,
    total: 30,
    icon: '🎙️',
    difficulty: 'Easy',
    diffColor: '#4ade80',
  },
  {
    id: 3,
    title: 'Reaction Collector',
    desc: 'React to 20 different messages',
    xp: 120,
    progress: 20,
    total: 20,
    icon: '😄',
    difficulty: 'Easy',
    diffColor: '#4ade80',
    completed: true,
  },
  {
    id: 4,
    title: 'Social Butterfly',
    desc: 'Mention 10 different users in messages',
    xp: 250,
    progress: 4,
    total: 10,
    icon: '🦋',
    difficulty: 'Medium',
    diffColor: '#fbbf24',
  },
]

const WEEKLY_QUESTS = [
  {
    id: 5,
    title: 'Loyal Member',
    desc: 'Be active for 7 consecutive days',
    xp: 1000,
    progress: 3,
    total: 7,
    icon: '🏆',
    difficulty: 'Hard',
    diffColor: '#f87171',
  },
  {
    id: 6,
    title: 'Last.fm Listener',
    desc: 'Scrobble 100 tracks this week',
    xp: 750,
    progress: 63,
    total: 100,
    icon: '🎵',
    difficulty: 'Medium',
    diffColor: '#fbbf24',
  },
  {
    id: 7,
    title: 'Server Booster',
    desc: 'Boost the server this week',
    xp: 2000,
    progress: 0,
    total: 1,
    icon: '⚡',
    difficulty: 'Hard',
    diffColor: '#f87171',
    locked: true,
  },
  {
    id: 8,
    title: 'Command Explorer',
    desc: 'Use 25 different bot commands',
    xp: 500,
    progress: 18,
    total: 25,
    icon: '🤖',
    difficulty: 'Medium',
    diffColor: '#fbbf24',
  },
]

function QuestCard({ quest }) {
  const pct = Math.min((quest.progress / quest.total) * 100, 100)
  const done = quest.completed || quest.progress >= quest.total

  return (
    <div style={{
      background: '#111213',
      border: `1px solid ${done ? 'rgba(74,222,128,0.2)' : quest.locked ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.07)'}`,
      borderRadius: 14,
      padding: '18px 20px',
      opacity: quest.locked ? 0.55 : 1,
      transition: 'border-color 0.15s ease',
    }}>
      {/* Top row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 14 }}>
        {/* Emoji icon */}
        <div style={{
          width: 42, height: 42, borderRadius: 12,
          background: done ? 'rgba(74,222,128,0.1)' : 'rgba(255,255,255,0.05)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 20, flexShrink: 0,
          border: done ? '1px solid rgba(74,222,128,0.2)' : '1px solid rgba(255,255,255,0.06)'
        }}>
          {quest.locked ? <Lock size={18} style={{ color: 'rgba(255,255,255,0.3)' }} /> : quest.icon}
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: done ? '#4ade80' : '#fff' }}>
              {quest.title}
            </span>
            {done && <CheckCircle2 size={14} style={{ color: '#4ade80' }} />}
          </div>
          <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.42)', lineHeight: 1.5, margin: 0 }}>
            {quest.desc}
          </p>
        </div>

        {/* Badges */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 5, flexShrink: 0 }}>
          <span style={{
            fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 50,
            background: `${quest.diffColor}18`, color: quest.diffColor
          }}>
            {quest.difficulty}
          </span>
          <span style={{
            fontSize: 11, fontWeight: 700, color: '#fbbf24',
            display: 'flex', alignItems: 'center', gap: 3
          }}>
            <Star size={11} />
            {quest.xp.toLocaleString()} XP
          </span>
        </div>
      </div>

      {/* Progress */}
      {!quest.locked && (
        <div>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            fontSize: 11, fontWeight: 600,
            color: 'rgba(255,255,255,0.35)',
            marginBottom: 6
          }}>
            <span>Progress</span>
            <span style={{ color: done ? '#4ade80' : 'rgba(255,255,255,0.55)' }}>
              {quest.progress}/{quest.total}
            </span>
          </div>
          <div style={{
            height: 5, borderRadius: 3,
            background: 'rgba(255,255,255,0.07)', overflow: 'hidden'
          }}>
            <div style={{
              height: '100%', borderRadius: 3,
              width: `${pct}%`,
              background: done ? '#4ade80' : 'linear-gradient(90deg, #7c6ee0, #9488f0)',
              transition: 'width 0.4s ease'
            }} />
          </div>
        </div>
      )}
    </div>
  )
}

export default function Quests() {
  const [tab, setTab] = useState('daily')

  const quests = tab === 'daily' ? DAILY_QUESTS : WEEKLY_QUESTS
  const completedCount = quests.filter(q => q.completed || q.progress >= q.total).length

  return (
    <div className="page-enter" style={{ maxWidth: 780, margin: '0 auto', padding: '20px 20px 40px' }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.5px' }}>quests</h1>
        <p style={{ color: 'rgba(255,255,255,0.42)', fontSize: 13.5, marginTop: 6, fontWeight: 500 }}>
          Complete quests to earn XP and level up
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 24 }}>
        {['daily', 'weekly'].map(t => (
          <button
            key={t}
            className={`category-tab ${tab === t ? 'active' : ''}`}
            onClick={() => setTab(t)}
            style={{ fontSize: 13.5, padding: '8px 18px' }}
          >
            {t === 'daily' ? <Zap size={13} /> : <Clock size={13} />}
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Stats bar */}
      <div style={{
        background: '#111213',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 12,
        padding: '12px 18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
        flexWrap: 'wrap',
        gap: 8
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Trophy size={16} style={{ color: '#fbbf24' }} />
          <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>
            {completedCount}/{quests.length} completed
          </span>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          fontSize: 12, color: 'rgba(255,255,255,0.35)', fontWeight: 500
        }}>
          <Clock size={12} />
          Resets {tab === 'daily' ? 'daily at midnight UTC' : 'every Monday 00:00 UTC'}
        </div>
      </div>

      {/* Quest Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {quests.map(quest => <QuestCard key={quest.id} quest={quest} />)}
      </div>
    </div>
  )
}
