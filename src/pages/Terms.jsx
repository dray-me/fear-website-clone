export default function Terms() {
  const sections = [
    {
      title: 'Acceptance & Eligibility',
      content: 'By adding フィアー to your Discord server, you agree to these Terms of Service. You must meet the minimum age requirements set by Discord (13+) and comply with all applicable laws in your jurisdiction.'
    },
    {
      title: 'Permitted Use',
      content: 'You may only use フィアー for lawful purposes. The following are strictly prohibited: harassment of any kind, spam distribution, exploiting bot systems or Discord infrastructure, violating Discord\'s Terms of Service or Community Guidelines, and impersonating other users or bots.'
    },
    {
      title: 'Data Collection & Handling',
      content: 'フィアー stores limited configuration data necessary for its operation, including server settings, user preferences, economy balances, XP records, and moderation logs. We do not sell your data to third parties. You may request deletion of your data by opening a ticket in our support server.'
    },
    {
      title: 'Service Availability',
      content: 'フィアー is provided on an "as-is" basis without any guarantees of uptime or availability. The service may be modified, restricted, or discontinued at any time without prior notice. We are not liable for any losses resulting from service interruptions.'
    },
    {
      title: 'Enforcement',
      content: 'We reserve the right to blacklist any user or server found to be in violation of these terms, abusing bot features, or causing harm to other users or the bot\'s infrastructure. Blacklists may be issued without prior warning in severe cases.'
    },
    {
      title: 'Intellectual Property',
      content: 'フィアー, its codebase, commands, branding, and all associated materials are the intellectual property of the fear cult development team. You may not copy, distribute, reverse-engineer, or create derivative works without explicit written permission.'
    },
    {
      title: 'Changes to Terms',
      content: 'These Terms of Service may be updated at any time. Continued use of the bot after changes are made implies acceptance of the updated terms. We recommend checking this page periodically for updates.'
    },
    {
      title: 'Support & Contact',
      content: 'For questions, concerns, or data removal requests, please visit our support server and open a ticket. Our team will respond as soon as possible.'
    },
  ]

  return (
    <div className="page-enter" style={{ maxWidth: 680, margin: '0 auto', padding: '20px 20px 40px' }}>
      {/* Header */}
      <div style={{ marginBottom: 36 }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.5px', marginBottom: 8 }}>
          terms of service
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: 13, fontWeight: 500 }}>
          Last updated: May 2026 · Effective immediately upon use
        </p>
      </div>

      {/* Intro */}
      <div style={{
        background: 'rgba(124,110,224,0.07)',
        border: '1px solid rgba(124,110,224,0.18)',
        borderRadius: 12,
        padding: '16px 20px',
        marginBottom: 28,
        fontSize: 13.5,
        color: 'rgba(255,255,255,0.65)',
        lineHeight: 1.65
      }}>
        Please read these Terms of Service carefully before using フィアー. By inviting the bot to your server or using its features, you acknowledge that you have read, understood, and agree to be bound by these terms.
      </div>

      {/* Sections */}
      <div className="card" style={{ padding: '0 24px' }}>
        {sections.map((section, i) => (
          <div key={section.title} style={{
            padding: '22px 0',
            borderBottom: i < sections.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none'
          }}>
            <h2 style={{
              fontSize: 14.5, fontWeight: 700, color: '#fff',
              marginBottom: 8, letterSpacing: '-0.1px'
            }}>
              <span style={{ color: '#7c6ee0', marginRight: 8, fontWeight: 700 }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              {section.title}
            </h2>
            <p style={{
              fontSize: 13.5, color: 'rgba(255,255,255,0.52)',
              lineHeight: 1.7, fontWeight: 400
            }}>
              {section.content}
            </p>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <div style={{
        marginTop: 24, padding: '14px 18px',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 10,
        fontSize: 12, color: 'rgba(255,255,255,0.28)',
        textAlign: 'center', lineHeight: 1.6
      }}>
        フィアー is not affiliated with Discord Inc. All Discord trademarks belong to their respective owners.
      </div>
    </div>
  )
}
