'use client'
import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const GT = { background: 'linear-gradient(135deg,#0dccad 0%,#5ce8d8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }

const CATEGORIES = [
  {
    id: 'email', label: 'Email & Communication', color: '#60A5FA',
    Icon: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
    tools: [
      { name: 'Gmail', Icon: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> },
      { name: 'Outlook / Microsoft 365', Icon: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="9" height="9" rx="1"/><rect x="13" y="3" width="9" height="9" rx="1"/><rect x="2" y="14" width="9" height="9" rx="1"/><rect x="13" y="14" width="9" height="9" rx="1"/></svg> },
      { name: 'Yahoo Mail', Icon: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4l8 9m0 0l8-9M12 13v7"/></svg> },
      { name: 'WhatsApp Business API', Icon: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg> },
      { name: 'Twilio (SMS)', Icon: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2"/><circle cx="12" cy="18" r="1" fill="currentColor" stroke="none"/></svg> },
      { name: 'Slack', Icon: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="8" x2="2" y2="8"/><line x1="22" y1="13" x2="2" y2="13"/><line x1="7" y1="3" x2="7" y2="18"/><line x1="12" y1="3" x2="12" y2="18"/></svg> },
      { name: 'Microsoft Teams', Icon: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg> },
    ],
  },
  {
    id: 'marketing', label: 'Marketing & Advertising', color: '#F59E0B',
    Icon: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
    tools: [
      { name: 'Facebook Lead Ads', Icon: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg> },
      { name: 'Instagram Lead Ads', Icon: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeLinecap="round"/></svg> },
      { name: 'Google Ads Lead Forms', Icon: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 18v-6a9 9 0 0118 0v6"/><path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3z"/><path d="M3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"/></svg> },
      { name: 'Mailchimp', Icon: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> },
      { name: 'Sendinblue', Icon: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2L11 13"/><path d="M22 2L15 22l-4-9-9-4 20-7z"/></svg> },
      { name: 'ActiveCampaign', Icon: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> },
      { name: 'Google Analytics', Icon: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg> },
    ],
  },
  {
    id: 'productivity', label: 'Productivity & Operations', color: '#10B981',
    Icon: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
    tools: [
      { name: 'Google Calendar', Icon: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
      { name: 'Outlook Calendar', Icon: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
      { name: 'Google Drive', Icon: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22.56 16.53l-4.78-8.28a1 1 0 00-.87-.5H7.09a1 1 0 00-.87.5L1.44 16.53A1 1 0 002.31 18h19.38a1 1 0 00.87-1.47z"/><line x1="8" y1="9.75" x2="16" y2="9.75"/></svg> },
      { name: 'Dropbox', Icon: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg> },
      { name: 'Microsoft OneDrive', Icon: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/></svg> },
      { name: 'Trello', Icon: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><rect x="7" y="7" width="3" height="9"/><rect x="14" y="7" width="3" height="5"/></svg> },
      { name: 'Asana', Icon: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="5" r="3"/><circle cx="5" cy="17" r="3"/><circle cx="19" cy="17" r="3"/></svg> },
      { name: 'Notion', Icon: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.5 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="12" y2="17"/></svg> },
    ],
  },
  {
    id: 'payments', label: 'Payments & Finance', color: '#0dccad',
    Icon: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
    tools: [
      { name: 'Razorpay', Icon: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> },
      { name: 'PayU', Icon: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/><circle cx="7" cy="15" r="1" fill="currentColor" stroke="none"/></svg> },
      { name: 'Instamojo', Icon: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg> },
      { name: 'Stripe', Icon: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 1l4 4-4 4M3 11V9a4 4 0 014-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 01-4 4H3"/></svg> },
      { name: 'PayPal', Icon: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
      { name: 'Tally', Icon: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg> },
      { name: 'QuickBooks', Icon: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="8" x2="16" y2="8"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="8" y1="16" x2="12" y2="16"/></svg> },
      { name: 'Zoho Books', Icon: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg> },
    ],
  },
  {
    id: 'website', label: 'Website & Lead Capture', color: '#8B5CF6',
    Icon: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>,
    tools: [
      { name: 'WordPress', Icon: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg> },
      { name: 'Wix', Icon: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 3v18"/></svg> },
      { name: 'Squarespace', Icon: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><rect x="7" y="7" width="10" height="10" rx="1"/></svg> },
      { name: 'Shopify', Icon: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg> },
      { name: 'WooCommerce', Icon: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg> },
      { name: 'JustDial', Icon: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.8a19.79 19.79 0 01-3.07-8.64A2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/></svg> },
      { name: 'IndiaMART', Icon: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
      { name: '99acres / MagicBricks', Icon: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><rect x="9" y="14" width="6" height="8"/></svg> },
    ],
  },
  {
    id: 'developer', label: 'Developer & Advanced', color: '#EF4444',
    Icon: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
    tools: [
      { name: 'REST API (full access)', Icon: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg> },
      { name: 'Zapier (connect 5,000+ apps)', Icon: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> },
      { name: 'Make (formerly Integromat)', Icon: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M13 6h3a2 2 0 012 2v7"/><line x1="6" y1="9" x2="6" y2="12"/></svg> },
      { name: 'Webhook support', Icon: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg> },
      { name: 'Custom API integrations (Pro plan)', Icon: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14"/><path d="M15.54 8.46a5 5 0 010 7.07M8.46 8.46a5 5 0 000 7.07"/></svg> },
    ],
  },
]

export default function IntegrationsSection() {
  const [active, setActive] = useState('email')
  const ref = useRef(null)
  const gridRef = useRef(null)

  const cat = CATEGORIES.find(c => c.id === active)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.int-head', { opacity: 0, y: 50 })
      gsap.to('.int-head', { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%' } })
      gsap.set('.cat-tab', { opacity: 0, y: 20 })
      gsap.to('.cat-tab', { opacity: 1, y: 0, stagger: 0.06, duration: 0.5, ease: 'power2.out',
        scrollTrigger: { trigger: '.cat-tabs', start: 'top 82%' } })
    }, ref)
    return () => ctx.revert()
  }, [])

  const switchCat = (id) => {
    setActive(id)
    if (gridRef.current) {
      gsap.fromTo(gridRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' })
    }
  }

  return (
    <section ref={ref} id="integrations" className="py-24 lg:py-32 relative overflow-hidden"
             style={{ background: '#0a1e36' }}>
      <div className="absolute inset-0 pointer-events-none"
           style={{ backgroundImage: 'radial-gradient(ellipse 70% 50% at 50% 100%,rgba(13,204,173,0.04) 0%,transparent 70%)' }}/>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="int-head mb-12">
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#0dccad' }}>Integrations</p>
          <h2 className="text-5xl lg:text-6xl font-black leading-[1.05] mb-5" style={{ letterSpacing: '-0.03em' }}>
            <span className="text-white">Works With the Tools </span>
            <span style={GT}>Your Business Already Uses</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
            NNC CRM connects seamlessly with 50+ popular business tools — so you never have to change the way you work.
          </p>
        </div>

        {/* Category tabs — single scrollable row */}
        <div className="cat-tabs mb-8" style={{ overflowX: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div className="flex gap-2" style={{ minWidth: 'max-content' }}>
            {CATEGORIES.map(c => (
              <button key={c.id} onClick={() => switchCat(c.id)}
                      className="cat-tab flex items-center gap-2 px-5 py-3 text-xs font-bold transition-all duration-200 shrink-0"
                      style={active === c.id
                        ? {
                            background: `rgba(${c.id === 'email' ? '96,165,250' : c.id === 'marketing' ? '245,158,11' : c.id === 'productivity' ? '16,185,129' : c.id === 'payments' ? '13,204,173' : c.id === 'website' ? '139,92,246' : '239,68,68'},0.12)`,
                            color: c.color,
                            border: `1px solid ${c.color}50`,
                            borderLeft: `3px solid ${c.color}`,
                            boxShadow: `0 0 18px ${c.color}25, 0 2px 8px ${c.color}15`,
                            transform: 'translateY(-1px)',
                          }
                        : { background: 'rgba(255,255,255,0.02)', color: '#6b7280', border: '1px solid rgba(255,255,255,0.06)' }}>
                <span style={{ color: active === c.id ? c.color : '#4b5563' }}><c.Icon /></span>
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tools grid for active category */}
        <div ref={gridRef} className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <span style={{ color: cat.color }}><cat.Icon /></span>
            <h3 className="text-lg font-bold text-white">{cat.label}</h3>
            <span className="text-xs font-bold px-2 py-0.5" style={{ background: `rgba(255,255,255,0.04)`, color: '#6b7280' }}>
              {cat.tools.length} tools
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {cat.tools.map((tool) => (
              <div key={tool.name} className="group text-left p-5 transition-all duration-200 hover:-translate-y-0.5 cursor-default"
                   style={{
                     background: '#071626',
                     border: `1px solid ${cat.color}20`,
                     borderLeft: `3px solid ${cat.color}`,
                   }}>
                <div className="flex items-center gap-2 mb-2" style={{ color: cat.color }}><tool.Icon /></div>
                <p className="text-sm font-bold text-white mb-1">{tool.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Full-width bottom card */}
        <div className="px-7 lg:px-10 py-6"
             style={{ borderLeft: '4px solid #0dccad', background: 'rgba(13,204,173,0.04)', border: '1px solid rgba(13,204,173,0.12)', borderLeftWidth: '4px' }}>
          <div className="flex items-start gap-4">
            <svg className="shrink-0 mt-1" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0dccad" strokeWidth="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
            <p className="text-sm text-gray-400 leading-relaxed">
              <strong className="text-white">Don't see your tool listed?</strong> Our REST API and Zapier integration means NNC CRM can connect to virtually any software your business uses.
              Our enterprise team also builds <strong className="text-white">custom integrations</strong> for Pro plan customers.{' '}
              <span style={{ color: '#0dccad' }} className="cursor-pointer hover:underline">Contact us to discuss your specific integration requirements →</span>
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
