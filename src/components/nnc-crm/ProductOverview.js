'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const GT = { background: 'linear-gradient(135deg,#0dccad 0%,#5ce8d8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }

const PILLARS = [
  {
    num: '01', word: 'Capture', color: '#0dccad', bgRgb: '13,204,173',
    Icon: () => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
    ),
    desc: 'Every lead from your website, social media, WhatsApp, and phone calls flows automatically into NNC CRM. Zero manual entry. Zero missed leads.',
  },
  {
    num: '02', word: 'Organise', color: '#60A5FA', bgRgb: '96,165,250',
    Icon: () => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
    ),
    desc: "All contacts, deals, communication history, notes, and documents are stored in one clean, searchable profile. Your team always knows exactly what's happening.",
  },
  {
    num: '03', word: 'Automate', color: '#F59E0B', bgRgb: '245,158,11',
    Icon: () => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22v-4M12 2v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
    ),
    desc: 'Follow-up emails, SMS reminders, task assignments, and pipeline updates happen automatically based on rules you define. Your CRM works for you — 24 hours a day.',
  },
  {
    num: '04', word: 'Close', color: '#10B981', bgRgb: '16,185,129',
    Icon: () => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
    ),
    desc: 'Visual pipeline boards, deal scoring, and intelligent alerts help your team focus on the hottest opportunities and close more deals in less time.',
  },
]

export default function ProductOverview() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.po-head', { opacity: 0, y: 50 })
      gsap.to('.po-head', { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 70%' } })
      gsap.set('.pillar-item', { opacity: 0, y: 50, scale: 0.95 })
      gsap.to('.pillar-item', { opacity: 1, y: 0, scale: 1, stagger: 0.15, duration: 0.8, ease: 'back.out(1.4)',
        scrollTrigger: { trigger: '.pillars-row', start: 'top 80%' } })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="py-24 lg:py-32 relative overflow-hidden" style={{ background: '#0a1e36' }}>
      <div className="absolute inset-0 pointer-events-none"
           style={{ backgroundImage: 'radial-gradient(ellipse 50% 80% at 50% 100%,rgba(13,204,173,0.05) 0%,transparent 70%)' }}/>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="po-head mb-16">
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#0dccad' }}>Product Overview</p>
          <h2 className="text-5xl lg:text-6xl font-black text-white leading-[1.05] mb-5" style={{ letterSpacing: '-0.03em' }}>
            Meet NNC Digital CRM —<br/>
            <span style={GT}>The Command Centre</span>
            <span className="text-white"> for Your Business</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
            One platform. Every customer. Every deal. Every conversation. Fully organised, fully automated, fully yours.
          </p>
        </div>

        <div className="po-intro max-w-3xl mb-16">
          <p className="text-gray-400 leading-relaxed text-sm mb-3">
            NNC Digital CRM is a cloud-based Customer Relationship Management platform purpose-built for small and growing businesses in India. Unlike complex enterprise CRMs that take months to implement and require dedicated IT teams, NNC CRM is up and running in under 5 minutes — and your team will love using it from day one.
          </p>
          <p className="text-gray-400 leading-relaxed text-sm">
            At its core, NNC CRM gives you a single, organised home for every lead, every customer, every deal, and every conversation your business has ever had. It's an intelligent growth platform that automates repetitive tasks, sends follow-ups on your behalf, and gives you the reporting insights you need to make smarter decisions every day.
          </p>
        </div>

        <div className="pillars-row grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PILLARS.map(p => (
            <div key={p.word} className="pillar-item group relative overflow-hidden cursor-default transition-all duration-400"
                 style={{ background: '#071626', border: `1px solid rgba(${p.bgRgb},0.2)` }}>
              {/* Hover bg fill */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                   style={{ background: `rgba(${p.bgRgb},0.08)` }}/>
              {/* Always-present left border */}
              <div className="absolute left-0 top-0 bottom-0 w-1"
                   style={{ background: `linear-gradient(180deg,${p.color},${p.color}40)` }}/>
              <div className="relative p-7 group-hover:-translate-y-0.5 transition-transform duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div style={{ color: p.color }}><p.Icon /></div>
                  <span className="text-sm font-black" style={{ color: `rgba(${p.bgRgb},0.25)` }}>{p.num}</span>
                </div>
                <div className="text-3xl font-black mb-3 transition-all duration-300" style={{ color: p.color }}>{p.word}</div>
                <p className="text-sm text-gray-500 leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
