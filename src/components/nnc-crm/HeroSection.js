'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

// Replace with your actual product demo embed URL
const DEMO_VIDEO_URL = 'https://www.youtube.com/embed/sQD7kaZ5h0s?si=jvWbDcUB7yxj_qp2'

const GT = { background: 'linear-gradient(135deg,#0dccad 0%,#5ce8d8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }

function DashboardMockup() {
  const stages = [
    { name: 'New Lead', color: '#0dccad', count: 12 },
    { name: 'Contacted', color: '#60A5FA', count: 8 },
    { name: 'Proposal', color: '#F59E0B', count: 5 },
    { name: 'Closed Won', color: '#10B981', count: 4 },
  ]
  const stats = [
    { label: 'Total Leads', value: '284', delta: '+12%' },
    { label: 'Deals Closed', value: '47', delta: '+8%' },
    { label: 'Revenue', value: '₹12.4L', delta: '+23%' },
    { label: 'Due Today', value: '8', delta: '3 urgent' },
  ]
  return (
    <div className="rounded-2xl overflow-hidden border shadow-2xl" style={{ background: '#0d1b2e', borderColor: '#1e3a5f', boxShadow: '0 0 60px rgba(13,204,173,0.12)' }}>
      <div className="flex items-center justify-between px-4 py-2.5" style={{ background: '#071626', borderBottom: '1px solid #1e3a5f' }}>
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/70"/><div className="w-3 h-3 rounded-full bg-yellow-500/70"/><div className="w-3 h-3 rounded-full bg-green-500/70"/>
        </div>
        <span className="text-xs text-gray-500 font-medium">NNC CRM — Dashboard</span>
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#0dccad' }}/>
          <span className="text-[10px] text-gray-500">Live</span>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2 p-3">
        {stats.map(s => (
          <div key={s.label} className="rounded-lg p-2.5" style={{ background: '#071626', border: '1px solid #1e3a5f' }}>
            <div className="text-[10px] text-gray-500 mb-1">{s.label}</div>
            <div className="text-sm font-bold text-white">{s.value}</div>
            <div className="text-[10px] font-medium" style={{ color: '#0dccad' }}>{s.delta}</div>
          </div>
        ))}
      </div>
      <div className="px-3 pb-2">
        <div className="text-[10px] text-gray-500 mb-2 font-semibold uppercase tracking-wider">Sales Pipeline</div>
        <div className="flex gap-1.5">
          {stages.map(s => (
            <div key={s.name} className="flex-1 rounded-xl p-2" style={{ background: `${s.color}10`, border: `1px solid ${s.color}30` }}>
              <div className="text-[9px] font-bold mb-1.5 truncate" style={{ color: s.color }}>{s.name}</div>
              {[...Array(Math.min(s.count, 3))].map((_, i) => (
                <div key={i} className="h-4 rounded-sm mb-1 overflow-hidden" style={{ background: `${s.color}15`, border: `1px solid ${s.color}25`, width: `${80-i*12}%` }}>
                  <div className="h-full rounded-sm" style={{ background: `${s.color}50`, width: `${35+i*15}%` }}/>
                </div>
              ))}
              <div className="text-[9px] text-gray-600 mt-1">{s.count} deals</div>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-3 mb-3 mt-1 rounded-xl p-2.5 flex items-center gap-2.5" style={{ background: '#071626', border: '1px solid #1e3a5f' }}>
        <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs" style={{ background: '#0dccad20', border: '1px solid #0dccad40', color: '#0dccad' }}>✓</div>
        <div className="flex-1 min-w-0">
          <div className="text-[11px] text-white truncate">Auto follow-up sent to Ravi Sharma</div>
          <div className="text-[10px] text-gray-500">2 min ago · Email opened ✓</div>
        </div>
        <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shrink-0"/>
      </div>
    </div>
  )
}

const TRUST = [
  'Trusted by 500+ businesses across India',
  '14-day free trial — no credit card needed',
  'Setup in under 5 minutes',
  'Cancel anytime, no lock-in contracts',
  'GDPR & data privacy compliant',
]

export default function HeroSection() {
  const ref = useRef(null)
  const [videoOpen, setVideoOpen] = useState(false)

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setVideoOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.hero-item', { opacity: 0, y: 40 })
      gsap.to('.hero-item', { opacity: 1, y: 0, stagger: 0.12, duration: 0.85, ease: 'power3.out', delay: 0.3 })
      gsap.set('.hero-mockup', { opacity: 0, x: 60, scale: 0.96 })
      gsap.to('.hero-mockup', { opacity: 1, x: 0, scale: 1, duration: 1.1, ease: 'power3.out', delay: 0.5 })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <>
    {/* Video modal */}
    {videoOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
           style={{ background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(8px)' }}
           onClick={() => setVideoOpen(false)}>
        <div className="relative w-full max-w-4xl" onClick={e => e.stopPropagation()}>
          <button onClick={() => setVideoOpen(false)}
                  className="absolute -top-10 right-0 flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            Close
          </button>
          <div className="relative overflow-hidden" style={{ paddingBottom: '56.25%', background: '#000', border: '1px solid rgba(13,204,173,0.25)', boxShadow: '0 0 60px rgba(13,204,173,0.15)' }}>
            <iframe
              className="absolute inset-0 w-full h-full"
              src={DEMO_VIDEO_URL}
              title="NNC CRM — 2-Minute Product Demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    )}

    <section id="hero" ref={ref} className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% -10%, #0a1e36 0%, #080c14 70%)' }}>
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ background: '#0dccad' }}/>
        <div className="absolute top-1/2 right-1/4 w-64 h-64 rounded-full opacity-5 blur-3xl" style={{ background: '#60A5FA' }}/>
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)', backgroundSize: '40px 40px' }}/>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left */}
          <div>
            {/* <div className="hero-item inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold text-white mb-6 border"
                 style={{ background: '#0dccad15', borderColor: '#0dccad40', color: '#5ce8d8' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse"/>
              Customer Relationship Management Software
            </div> */}

            <h1 className="hero-item text-5xl lg:text-6xl font-black leading-tight mb-6" style={{ letterSpacing: '-0.03em' }}>
              <span className="text-white">Stop Losing</span>
              <br/>
              <span style={GT}>Leads.</span>
              <br/>
              <span className="text-white">Start Closing</span>
              <br/>
              <span style={GT}>Deals.</span>
            </h1>

            <p className="hero-item text-base lg:text-lg text-gray-400 leading-relaxed mb-8 max-w-lg">
              NNC Digital CRM is the all-in-one CRM platform built for small and growing businesses. Capture leads automatically, nurture with smart follow-ups, manage your pipeline visually, and close deals faster — without the complexity of enterprise software.
            </p>

            <div className="hero-item flex flex-col sm:flex-row gap-3 mb-8 items-start">
              <div className="flex flex-col items-start">
                <a href="#pricing" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 hover:shadow-lg"
                   style={{ background: 'linear-gradient(135deg,#0dccad,#08a88c)', boxShadow: '0 4px 20px rgba(13,204,173,0.3)' }}>
                  Start Your Free 14-Day Trial
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
                <p className="text-xs mt-2 ml-1" style={{ color: '#4b5563' }}>
                  No credit card required. Setup in under 5 minutes.
                </p>
              </div>
              <button onClick={() => setVideoOpen(true)}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white border border-gray-600 hover:border-gray-400 transition-all hover:bg-white/5">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                Watch 2-Minute Demo
              </button>
            </div>

            <div className="hero-item flex flex-wrap gap-y-2 gap-x-4">
              {TRUST.map(t => (
                <div key={t} className="flex items-center gap-1.5 text-xs text-gray-400">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0dccad" strokeWidth={2.5}><path d="M20 6L9 17l-5-5"/></svg>
                  {t}
                </div>
              ))}
            </div>
          </div>

          {/* Right — Dashboard */}
          <div className="hero-mockup animate-float">
            <DashboardMockup />
          </div>
        </div>

        {/* Stats row */}
        <div className="hero-item mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4 pt-12 border-t border-white/10">
          {[['500+','Businesses Using NNC CRM'],['60%','Avg. Increase in Lead Conversion'],['3x','Faster Sales Cycle Closure'],['2 hrs','Saved Daily on Admin Work']].map(([val, label]) => (
            <div key={val} className="text-center">
              <div className="text-3xl lg:text-4xl font-black mb-1" style={GT}>{val}</div>
              <div className="text-xs text-gray-500 leading-snug">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  )
}
