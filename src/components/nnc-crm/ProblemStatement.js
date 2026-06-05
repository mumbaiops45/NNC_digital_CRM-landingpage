'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const GT = { background: 'linear-gradient(135deg,#0dccad 0%,#5ce8d8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }

const PAINS = [
  {
    num: '01', title: 'Not Knowing Where Your Leads Are',
    body: "Leads arrive from your website, WhatsApp, phone calls, social media, and referrals — but there's no single place where all of them live. So leads get forgotten, double-handled, or simply lost. Every lost lead is revenue you'll never get back.",
    Icon: () => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0dccad" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35M11 8v3l2 2"/></svg>
    ),
  },
  {
    num: '02', title: 'Forgetting to Follow Up',
    body: "Your rep was going to call that promising lead back on Tuesday. It's now Friday. The lead has gone cold — or worse, signed with a competitor. Manual follow-ups depend on human memory, and human memory is not a reliable business system.",
    Icon: () => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
    ),
  },
  {
    num: '03', title: 'No Visibility Into Sales Performance',
    body: "Is your team actually calling leads? How many deals are in the pipeline right now? What's your average time to close? What's your conversion rate this month vs last? If you can't answer these instantly, you're flying blind.",
    Icon: () => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
    ),
  },
  {
    num: '04', title: 'Customer History Lives in WhatsApp',
    body: "A customer calls with a question about their order. The salesperson who handled them is on leave. Nobody else has any context. Every interaction that happened over WhatsApp, email, and phone calls is scattered across devices — not accessible to the team.",
    Icon: () => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
    ),
  },
  {
    num: '05', title: 'Manual Reporting Wastes Hours',
    body: "Every Monday morning, someone spends 3 hours copying numbers from WhatsApp conversations, email threads, and spreadsheets into a report that's outdated by the time it's finished. This is time stolen from actual selling.",
    Icon: () => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
    ),
  },
  {
    num: '06', title: 'Losing Customers After the First Sale',
    body: "You worked hard to acquire that customer. But without a system to track renewals, follow-up schedules, complaints, and upsell opportunities — customers quietly drift away. Customer retention is where the real profit hides.",
    Icon: () => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>
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
