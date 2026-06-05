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
    tools: ['Gmail', 'Outlook / Microsoft 365', 'Yahoo Mail', 'WhatsApp Business API', 'Twilio (SMS)', 'Slack', 'Microsoft Teams'],
  },
  {
    id: 'marketing', label: 'Marketing & Advertising', color: '#F59E0B',
    Icon: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
    tools: ['Facebook Lead Ads', 'Instagram Lead Ads', 'Google Ads Lead Forms', 'Mailchimp', 'Sendinblue', 'ActiveCampaign', 'Google Analytics'],
  },
  {
    id: 'productivity', label: 'Productivity & Operations', color: '#10B981',
    Icon: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
    tools: ['Google Calendar', 'Outlook Calendar', 'Google Drive', 'Dropbox', 'Microsoft OneDrive', 'Trello', 'Asana', 'Notion'],
  },
  {
    id: 'payments', label: 'Payments & Finance', color: '#0dccad',
    Icon: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
    tools: ['Razorpay', 'PayU', 'Instamojo', 'Stripe', 'PayPal', 'Tally', 'QuickBooks', 'Zoho Books'],
  },
  {
    id: 'website', label: 'Website & Lead Capture', color: '#8B5CF6',
    Icon: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>,
    tools: ['WordPress', 'Wix', 'Squarespace', 'Shopify', 'WooCommerce', 'JustDial', 'IndiaMART', '99acres / MagicBricks'],
  },
  {
    id: 'developer', label: 'Developer & Advanced', color: '#EF4444',
    Icon: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
    tools: ['REST API (full access)', 'Zapier (connect 5,000+ apps)', 'Make (formerly Integromat)', 'Webhook support', 'Custom API integrations (Pro plan)'],
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

        {/* Category tabs */}
        <div className="cat-tabs flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map(c => (
            <button key={c.id} onClick={() => switchCat(c.id)}
                    className="cat-tab flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all duration-200"
                    style={active === c.id
                      ? { background: `rgba(${c.id === 'email' ? '96,165,250' : c.id === 'marketing' ? '245,158,11' : c.id === 'productivity' ? '16,185,129' : c.id === 'payments' ? '13,204,173' : c.id === 'website' ? '139,92,246' : '239,68,68'},0.15)`, color: c.color, borderLeft: `3px solid ${c.color}`, border: `1px solid rgba(255,255,255,0.05)`, borderLeftWidth: '3px' }
                      : { background: 'rgba(255,255,255,0.03)', color: '#6b7280', border: '1px solid #1e3a5f' }}>
              <span style={{ color: active === c.id ? c.color : '#374151' }}><c.Icon /></span>
              {c.label}
            </button>
          ))}
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {cat.tools.map((tool, i) => (
              <div key={tool} className="group flex items-center gap-3 px-4 py-3 cursor-default transition-all duration-200 hover:-translate-y-0.5"
                   style={{ background: 'linear-gradient(135deg,#071626,#0d1b2e)', border: `1px solid ${cat.color}20`, borderLeft: `3px solid ${cat.color}40` }}>
                <div className="w-2 h-2 shrink-0" style={{ background: cat.color }}/>
                <span className="text-sm text-gray-400 group-hover:text-gray-200 transition-colors leading-snug">{tool}</span>
              </div>
            ))}
          </div>
        </div>

        {/* All categories overview grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          {CATEGORIES.map(c => (
            <button key={c.id} onClick={() => switchCat(c.id)}
                    className={`text-left p-5 transition-all duration-200 group ${active === c.id ? '' : 'hover:-translate-y-0.5'}`}
                    style={{
                      background: active === c.id ? `rgba(${c.id === 'email' ? '96,165,250' : c.id === 'marketing' ? '245,158,11' : c.id === 'productivity' ? '16,185,129' : c.id === 'payments' ? '13,204,173' : c.id === 'website' ? '139,92,246' : '239,68,68'},0.08)` : '#071626',
                      border: `1px solid ${c.color}20`,
                      borderLeft: `3px solid ${c.color}`,
                    }}>
              <div className="flex items-center gap-2 mb-2" style={{ color: c.color }}><c.Icon /></div>
              <p className="text-sm font-bold text-white mb-1">{c.label}</p>
              <p className="text-xs text-gray-500">{c.tools.length} integrations</p>
            </button>
          ))}
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
