'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const TRUST = [
  { icon: '🔒', label: 'No credit card required' },
  { icon: '⚡', label: 'Set up in under 5 minutes' },
  { icon: '📞', label: 'Free onboarding support' },
  { icon: '🇮🇳', label: 'Built for Indian businesses' },
  { icon: '🔄', label: 'Cancel anytime — no contracts' },
]

export default function FinalCTA() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.fcta-trust', { opacity: 0, y: 20 })
      gsap.to('.fcta-trust', { opacity: 1, y: 0, stagger: 0.08, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' } })
      gsap.set('.fcta-main', { opacity: 0, scale: 0.97, y: 40 })
      gsap.to('.fcta-main', { opacity: 1, scale: 1, y: 0, duration: 0.9, ease: 'back.out(1.3)',
        scrollTrigger: { trigger: '.fcta-main', start: 'top 80%' } })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="py-24 lg:py-32 relative overflow-hidden" style={{ background: '#0a1e36' }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full opacity-10 blur-[120px]"
             style={{ background: 'radial-gradient(circle,#0dccad,transparent)' }}/>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Trust strip */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {TRUST.map(t => (
            <div key={t.label} className="fcta-trust flex items-center gap-2 rounded-full px-4 py-2"
                 style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(13,204,173,0.12)' }}>
              <span className="text-sm">{t.icon}</span>
              <span className="text-xs font-medium text-gray-400">{t.label}</span>
            </div>
          ))}
        </div>

        {/* Big CTA */}
        <div className="fcta-main text-center rounded-[40px] p-10 lg:p-16 relative overflow-hidden"
             style={{ background: 'linear-gradient(135deg,#071626 0%,#0d1b2e 100%)', border: '1.5px solid rgba(13,204,173,0.25)' }}>
          <div className="absolute inset-0 pointer-events-none"
               style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%,rgba(13,204,173,0.06) 0%,transparent 70%)' }}/>
          <div className="relative">
            <p className="text-xs font-black uppercase tracking-widest mb-5" style={{ color: '#0dccad' }}>Start Growing Today</p>
            <h2 className="text-4xl lg:text-6xl font-black text-white mb-4 leading-tight" style={{ letterSpacing: '-0.03em' }}>
              Stop Losing Leads.<br/>
              <span style={{ background: 'linear-gradient(135deg,#0dccad,#5ce8d8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Start Closing Deals.
              </span>
            </h2>
            <p className="text-gray-400 text-base lg:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Join 500+ small businesses in India that use NNC Digital CRM to capture every lead, automate follow-ups, and grow revenue — without the chaos.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="px-10 py-4 rounded-full text-sm font-black text-black transition-all duration-200 hover:scale-105 hover:shadow-xl"
                      style={{ background: 'linear-gradient(135deg,#0dccad,#5ce8d8)', boxShadow: '0 0 30px rgba(13,204,173,0.3)' }}>
                Start Your Free 14-Day Trial — No Card Needed
              </button>
              <button className="px-8 py-4 rounded-full text-sm font-bold text-white border border-white/15 hover:bg-white/5 transition-all duration-200">
                Book a Live Demo →
              </button>
            </div>

            <p className="mt-6 text-xs text-gray-600">
              Free trial. No credit card required. Cancel anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
