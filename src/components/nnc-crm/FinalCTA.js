'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const GT = { background: 'linear-gradient(135deg,#0dccad 0%,#5ce8d8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }

const STATS = [
  { value: '500+', label: 'Active businesses' },
  { value: '4.9★', label: 'Average rating' },
  { value: '14 days', label: 'Free trial' },
  { value: '< 5 min', label: 'Setup time' },
]

const TRUST = [
  {
    label: 'No credit card required',
    Icon: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
  },
  {
    label: 'Set up in under 5 minutes',
    Icon: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  },
  {
    label: 'Free onboarding support',
    Icon: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 18v-6a9 9 0 0118 0v6"/><path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3z"/><path d="M3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"/></svg>,
  },
  {
    label: 'Built for Indian businesses',
    Icon: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  },
  {
    label: 'Cancel anytime — no contracts',
    Icon: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>,
  },
]

export default function FinalCTA() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.fcta-left', { opacity: 0, x: -30 })
      gsap.to('.fcta-left', { opacity: 1, x: 0, duration: 0.85, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%' } })
      gsap.set('.fcta-right', { opacity: 0, x: 30 })
      gsap.to('.fcta-right', { opacity: 1, x: 0, duration: 0.85, ease: 'power3.out', delay: 0.12,
        scrollTrigger: { trigger: ref.current, start: 'top 75%' } })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} id="cta" className="py-24 lg:py-32 relative overflow-hidden"
             style={{ background: '#071626' }}>

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
           style={{ background: 'linear-gradient(90deg,transparent 0%,rgba(13,204,173,0.5) 50%,transparent 100%)' }}/>

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none"
           style={{ backgroundImage: 'radial-gradient(ellipse 55% 60% at 25% 50%,rgba(13,204,173,0.05) 0%,transparent 70%)' }}/>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — headline & CTAs */}
          <div className="fcta-left">
            <p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: '#0dccad' }}>
              Start Growing Today
            </p>
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-black leading-[1.05] mb-6" style={{ letterSpacing: '-0.03em' }}>
              <span className="text-white">Stop Losing Leads.</span><br/>
              <span style={GT}>Start Closing Deals.</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-lg">
              Join 500+ small businesses in India that use NNC Digital CRM to capture every lead, automate follow-ups, and grow revenue — without the chaos.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <button className="px-8 py-4 text-sm font-black text-black transition-all duration-200 hover:scale-105 hover:brightness-110"
                      style={{ background: 'linear-gradient(135deg,#0dccad,#5ce8d8)', boxShadow: '0 0 32px rgba(13,204,173,0.3)' }}>
                Start Your Free 14-Day Trial
              </button>
              <button className="px-8 py-4 text-sm font-bold text-white transition-all duration-200 hover:bg-white/5"
                      style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                Book a Live Demo →
              </button>
            </div>

            <p className="text-xs" style={{ color: '#374151' }}>
              No credit card required &nbsp;·&nbsp; Cancel anytime &nbsp;·&nbsp; Free onboarding support
            </p>
          </div>

          {/* Right — stats + trust */}
          <div className="fcta-right space-y-3">

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              {STATS.map(s => (
                <div key={s.label} className="px-5 py-4"
                     style={{ background: 'rgba(13,204,173,0.04)', border: '1px solid rgba(13,204,173,0.12)', borderLeft: '3px solid #0dccad' }}>
                  <p className="text-2xl font-black text-white mb-0.5">{s.value}</p>
                  <p className="text-xs text-gray-500">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Trust items */}
            {TRUST.map(t => (
              <div key={t.label} className="flex items-center gap-3 px-4 py-3"
                   style={{ background: '#0d1b2e', border: '1px solid #1e3a5f', borderLeft: '3px solid rgba(13,204,173,0.35)' }}>
                <span style={{ color: '#0dccad' }}><t.Icon /></span>
                <span className="text-sm text-gray-400">{t.label}</span>
              </div>
            ))}

          </div>

        </div>
      </div>
    </section>
  )
}
