'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const GT = { background: 'linear-gradient(135deg,#0dccad 0%,#5ce8d8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }

const PAINS = [
  {
    num: '01', title: 'Leads Slipping Through the Cracks',
    body: 'A potential customer enquired last week. Nobody followed up. They bought from your competitor. This happens more than you think.',
    Icon: () => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0dccad" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35M11 8v3l2 2"/></svg>
    ),
  },
  {
    num: '02', title: 'Your Customer Data is Everywhere',
    body: 'Contact details in WhatsApp, emails in Gmail, notes in a physical diary, follow-ups in your head. There\'s no single source of truth.',
    Icon: () => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>
    ),
  },
  {
    num: '03', title: 'You Have No Idea Where Deals Stand',
    body: 'Is that proposal still being considered? Did someone call the client back? Your team has no visibility — and neither do you.',
    Icon: () => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
    ),
  },
  {
    num: '04', title: 'Manual Follow-Ups Are Killing Productivity',
    body: 'Your sales team spends 3+ hours every day on manual reminders, status updates, and copy-pasting data between tools.',
    Icon: () => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
    ),
  },
  {
    num: '05', title: 'Reporting Takes Hours, Not Minutes',
    body: 'Every Monday you ask for a sales report. It takes half a day to compile data from spreadsheets, email threads, and WhatsApp chats.',
    Icon: () => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
    ),
  },
  {
    num: '06', title: 'Scaling Feels Impossible Without Systems',
    body: 'You want to hire more salespeople, but your current chaos means new hires would just amplify the disorganisation, not fix it.',
    Icon: () => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
    ),
  },
]

export default function ProblemStatement() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.pain-head', { opacity: 0, y: 50 })
      gsap.to('.pain-head', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%' } })
      gsap.set('.pain-card', { opacity: 0, y: 60 })
      gsap.to('.pain-card', { opacity: 1, y: 0, stagger: 0.1, duration: 0.65, ease: 'power3.out',
        scrollTrigger: { trigger: '.pain-grid', start: 'top 80%' } })
      gsap.set('.pain-bridge', { opacity: 0, x: -40 })
      gsap.to('.pain-bridge', { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.pain-bridge', start: 'top 88%' } })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="py-24 lg:py-32" style={{ background: '#080c14' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="pain-head mb-14">
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#0dccad' }}>The Problem</p>
          <h2 className="text-5xl lg:text-6xl font-black mb-5 leading-[1.05]" style={{ letterSpacing: '-0.03em' }}>
            <span className="text-white">Sound </span>
            <span style={GT}>familiar?</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
            Most small business owners are losing deals every single day — not because of bad products, but because of broken processes.
          </p>
        </div>

        <div className="pain-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: '#1e3a5f' }}>
          {PAINS.map(p => (
            <div key={p.num} className="pain-card group relative overflow-hidden cursor-default"
                 style={{ background: '#080c14' }}>
              {/* Left border — grows on hover */}
              <div className="absolute left-0 top-0 bottom-0 w-1 origin-top transition-transform duration-500 ease-out scale-y-0 group-hover:scale-y-100"
                   style={{ background: 'linear-gradient(180deg,#0dccad,#5ce8d8)', transformOrigin: 'top' }}/>
              {/* Gradient bg on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                   style={{ background: 'linear-gradient(135deg,rgba(13,204,173,0.05),rgba(92,232,216,0.01))' }}/>
              <div className="relative p-7">
                <div className="flex items-center justify-between mb-5">
                  <p.Icon />
                  <span className="text-xs font-black tabular-nums" style={{ color: '#1e3a5f' }}>{p.num}</span>
                </div>
                <h3 className="text-base font-bold text-white mb-3 leading-snug">{p.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{p.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bridge — full width, always left border primary */}
        <div className="pain-bridge mt-0 p-7 lg:p-8"
             style={{ background: 'linear-gradient(135deg,rgba(13,204,173,0.06),rgba(10,30,54,0.8))', borderLeft: '4px solid #0dccad', borderBottom: '1px solid #1e3a5f', borderRight: '1px solid #1e3a5f' }}>
          <p className="text-2xl lg:text-3xl font-black text-white mb-3">There's a better way.</p>
          <p className="text-gray-400 leading-relaxed max-w-3xl">
            NNC Digital CRM was built from the ground up to solve every one of these problems — without the complexity of enterprise software, without the steep learning curve, and without the enterprise price tag. It's the CRM designed for how small businesses in India actually work.
          </p>
        </div>

      </div>
    </section>
  )
}
