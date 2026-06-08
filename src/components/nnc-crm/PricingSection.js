'use client'
import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const GT = { background: 'linear-gradient(135deg,#0dccad 0%,#5ce8d8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }

const PLANS = [
  {
    name: 'Starter', price: '2,999', color: '#60A5FA', bgRgb: '96,165,250',
    tagline: 'Perfect for solopreneurs and very small teams.',
    unit: 'per user/month',
    highlight: false, badge: null,
    features: [
      'Up to 3 users',
      'Up to 1,000 contacts',
      'Sales pipeline (1)',
      'Lead capture forms',
      'Email integration',
      'Basic automation (5 workflows)',
      'Mobile app',
      'Email support',
      'Standard reports',
    ],
  },
  {
    name: 'Growth', price: '6,999', color: '#0dccad', bgRgb: '13,204,173',
    tagline: 'Our most popular plan — ideal for growing SMBs with an active sales team.',
    unit: 'per user/month',
    highlight: true, badge: 'Most Popular',
    features: [
      'Up to 10 users',
      'Up to 10,000 contacts',
      'Multiple pipelines (5)',
      'All lead capture channels',
      'Email + WhatsApp integration',
      'Unlimited automation workflows',
      'Invoicing & quotations',
      'Phone + email support',
      'Custom reports & dashboards',
      'API access',
    ],
  },
  {
    name: 'Pro', price: '14,999', color: '#8B5CF6', bgRgb: '139,92,246',
    tagline: 'Full power for established businesses with large teams and complex processes.',
    unit: 'per user/month',
    highlight: false, badge: null,
    features: [
      'Unlimited users',
      'Unlimited contacts',
      'Unlimited pipelines',
      'All integrations included',
      'AI-powered lead scoring',
      'Full invoicing & payment tracking',
      'Dedicated account manager',
      '24/7 priority support',
      'Advanced analytics & forecasting',
      'Custom onboarding & training',
    ],
  },
]

const PRICING_FAQS = [
  { q: 'Is there really no credit card required for the trial?', a: 'Absolutely none. Sign up with just your name and email address. We will not ask for payment details until you choose to upgrade at the end of your 14-day trial.' },
  { q: 'What happens to my data if I decide not to continue?', a: 'You can export all your data in CSV or Excel format at any time, including during and after your trial. Your data belongs to you — always.' },
  { q: 'Can I change my plan after signing up?', a: 'Yes. You can upgrade or downgrade your plan at any time. Upgrades take effect immediately. Downgrades take effect at the start of your next billing cycle.' },
  { q: 'Do you offer discounts for annual billing?', a: 'Yes. Annual plans are priced at 10 months for the price of 12, effectively giving you 2 months free. Contact our sales team for annual billing options.' },
  { q: 'Can I add more users as my team grows?', a: 'Yes. You can add or remove users at any time. Additional user seats are charged on a pro-rata basis within your current plan.' },
]

function CheckIcon({ color }) {
  return (
    <svg className="shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5">
      <path d="M20 6L9 17l-5-5"/>
    </svg>
  )
}

function PricingFaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  const bodyRef = useRef(null)

  const toggle = () => {
    setOpen(prev => {
      const next = !prev
      if (bodyRef.current) {
        if (next) gsap.fromTo(bodyRef.current, { height: 0, opacity: 0 }, { height: 'auto', opacity: 1, duration: 0.28, ease: 'power2.out' })
        else gsap.to(bodyRef.current, { height: 0, opacity: 0, duration: 0.2, ease: 'power2.in' })
      }
      return next
    })
  }

  return (
    <div style={{ borderBottom: '1px solid #1e3a5f' }}>
      <button className="w-full text-left flex items-start gap-3 py-4 cursor-pointer" onClick={toggle}>
        <svg className="shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0dccad" strokeWidth="2"
             style={{ transform: open ? 'rotate(45deg)' : 'rotate(0)', transition: 'transform 0.25s' }}>
          <path d="M12 5v14M5 12h14"/>
        </svg>
        <span className="text-sm font-semibold text-white">{q}</span>
      </button>
      <div ref={bodyRef} style={{ overflow: 'hidden', height: 0, opacity: 0 }}>
        <p className="pb-4 pl-7 text-sm text-gray-400 leading-relaxed">{a}</p>
      </div>
    </div>
  )
}

export default function PricingSection() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.price-head', { opacity: 0, y: 50 })
      gsap.to('.price-head', { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%' } })
      gsap.set('.price-card', { opacity: 0, y: 60, scale: 0.95 })
      gsap.to('.price-card', { opacity: 1, y: 0, scale: 1, stagger: 0.15, duration: 0.8, ease: 'back.out(1.3)',
        scrollTrigger: { trigger: '.price-row', start: 'top 80%' } })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} id="pricing" className="py-24 lg:py-32 relative overflow-hidden" style={{ background: '#080c14' }}>
      <div className="absolute inset-0 pointer-events-none"
           style={{ backgroundImage: 'radial-gradient(ellipse 60% 50% at 50% 0%,rgba(13,204,173,0.04) 0%,transparent 70%)' }}/>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="price-head mb-14">
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#0dccad' }}>Transparent Pricing</p>
          <h2 className="text-5xl lg:text-6xl font-black leading-[1.05] mb-5" style={{ letterSpacing: '-0.03em' }}>
            <span style={GT}>Simple, Honest Pricing.</span><br/>
            <span className="text-white">No Surprises.</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl">Start free for 14 days. No credit card required. Upgrade, downgrade, or cancel anytime — no questions asked.</p>
        </div>

        <div className="price-row grid md:grid-cols-3 gap-5 lg:gap-6 items-end mb-8">
          {PLANS.map(p => (
            <div key={p.name} className={`price-card relative flex flex-col transition-all duration-300 hover:-translate-y-1 ${p.highlight ? 'md:-translate-y-4' : ''}`}
                 style={{
                   background: p.highlight ? 'linear-gradient(160deg,#0d2235,#071626)' : 'linear-gradient(160deg,#071626,#040e1e)',
                   border: p.highlight ? `2px solid ${p.color}` : `1px solid rgba(${p.bgRgb},0.2)`,
                   borderLeft: `4px solid ${p.color}`,
                   boxShadow: p.highlight ? `0 0 60px rgba(${p.bgRgb},0.15)` : 'none',
                 }}>
              {p.badge && (
                <div className="absolute -top-3.5 left-6 text-xs font-black px-4 py-1.5 text-black"
                     style={{ background: `linear-gradient(135deg,${p.color},#5ce8d8)` }}>
                  ★ {p.badge}
                </div>
              )}
              <div className="p-7 pb-5">
                <p className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: p.color }}>{p.name}</p>
                <div className="flex items-end gap-1 mb-1">
                  <span className="text-sm text-gray-500 mb-1.5">Rs.</span>
                  <span className="text-4xl font-black text-white">{p.price}</span>
                </div>
                <p className="text-xs text-gray-500 mb-4">{p.unit}</p>
                <p className="text-xs text-gray-400 leading-snug mb-5">{p.tagline}</p>
                <button className={`w-full py-3 text-sm font-bold transition-all duration-200 ${p.highlight ? 'text-black hover:opacity-90' : 'border text-white hover:bg-white/5'}`}
                        style={p.highlight
                          ? { background: `linear-gradient(135deg,${p.color},#5ce8d8)` }
                          : { borderColor: `rgba(${p.bgRgb},0.3)`, color: p.color }}>
                  {p.highlight ? 'Start Free Trial →' : 'Get Started →'}
                </button>
              </div>
              <div className="px-7 pb-7">
                <div className="space-y-2.5" style={{ borderTop: '1px solid #1e3a5f', paddingTop: '1.25rem' }}>
                  {p.features.map(f => (
                    <div key={f} className="flex items-start gap-2.5">
                      <CheckIcon color={p.color} />
                      <span className="text-xs text-gray-400 leading-snug">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Full-width note card */}
        <div className="mb-14 px-7 lg:px-10 py-6"
             style={{ borderLeft: '4px solid #0dccad', background: 'rgba(13,204,173,0.04)', border: '1px solid rgba(13,204,173,0.12)', borderLeftWidth: '4px' }}>
          <div className="grid md:grid-cols-3 gap-5">
            <p className="text-sm text-gray-400 leading-relaxed">
              <span className="text-white font-semibold">All plans include a 14-day free trial</span> — no credit card required •{' '}
              Annual billing available with <span className="text-white font-semibold">2 months free</span> (save up to 17%) •{' '}
              Upgrade or downgrade at any time — no penalty, no hassle
            </p>
            <p className="text-sm text-gray-400 leading-relaxed flex items-start gap-2">
              <svg className="shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0dccad" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <span><span className="text-white font-semibold">All data is yours</span> — export anytime in CSV or Excel format</span>
            </p>
            <p className="text-sm text-gray-400 leading-relaxed flex items-start gap-2">
              <svg className="shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0dccad" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M4.93 4.93l14.14 14.14"/></svg>
              <span>We <span className="text-white font-semibold">never sell your data</span> or use it for advertising</span>
            </p>
          </div>
        </div>

        {/* Pricing FAQs */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: '#0dccad' }}>Pricing FAQs</p>
          <div className="px-6 lg:px-8 py-2"
               style={{ borderLeft: '4px solid #0dccad', background: 'rgba(13,204,173,0.02)', border: '1px solid #1e3a5f', borderLeftWidth: '4px' }}>
            {PRICING_FAQS.map((f, i) => <PricingFaqItem key={i} q={f.q} a={f.a} />)}
          </div>
        </div>

      </div>
    </section>
  )
}
