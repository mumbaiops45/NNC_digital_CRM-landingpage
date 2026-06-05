'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const GT = { background: 'linear-gradient(135deg,#0dccad 0%,#5ce8d8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }

const ROWS = [
  { label: 'Lead Follow-Up',            before: 'Manual, inconsistent, often forgotten',                         after: 'Automated, instant, never missed' },
  { label: 'Customer Data',             before: 'Scattered across WhatsApp, Excel, email, sticky notes',          after: 'All in one place, searchable in seconds' },
  { label: 'Sales Pipeline Visibility', before: 'Nobody knows where any deal stands',                             after: 'Full team visibility in real time' },
  { label: 'Follow-Up Time',            before: '3+ hours/day on manual reminders',                              after: '15 minutes — CRM handles the rest' },
  { label: 'Reporting',                 before: 'Half a day compiling data from multiple sources',                after: 'Live dashboard, one click, always accurate' },
  { label: 'New Hire Onboarding',       before: 'Weeks to understand the chaos',                                  after: 'Day 1 productive with full customer context' },
  { label: 'Lead Conversion Rate',      before: 'Industry average: 10–15%',                                      after: 'NNC CRM average: 25–35%' },
  { label: 'Customer Retention',        before: 'Reactive — only engage when customers complain',                 after: 'Proactive — automated check-ins keep customers happy' },
]

const STATS = [
  { val: 60,  unit: '%',    label: 'Average increase in lead-to-customer conversion rate among NNC CRM users within 90 days' },
  { val: 2,   unit: ' hrs', label: 'Average time saved per sales rep per day through workflow automation' },
  { val: 3,   unit: 'x',   label: "Faster sales cycle closure when teams use NNC CRM's automated follow-up sequences" },
  { val: 40,  unit: '%',   label: "Reduction in customer churn for businesses using NNC CRM's proactive check-in automations" },
  { val: 0,   unit: '',    label: 'Setup fee. Zero implementation cost. No consultant required.', prefix: '₹' },
  { val: 5,   unit: ' min',label: 'Average time for a new user to set up their first pipeline and automation' },
]

function Counter({ target, unit, prefix = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obj = { v: 0 }
    const st = ScrollTrigger.create({
      trigger: el, start: 'top 88%', once: true,
      onEnter() {
        gsap.to(obj, {
          v: target, duration: 2, ease: 'power2.out',
          onUpdate() { el.textContent = prefix + Math.round(obj.v) + unit },
        })
      },
    })
    return () => st.kill()
  }, [target, unit, prefix])
  return <span ref={ref}>{prefix + 0 + unit}</span>
}

export default function BenefitsSection() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.ben-head', { opacity: 0, y: 50 })
      gsap.to('.ben-head', { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%' } })
      gsap.set('.table-row-item', { opacity: 0, x: -25 })
      gsap.to('.table-row-item', { opacity: 1, x: 0, stagger: 0.07, duration: 0.55, ease: 'power2.out',
        scrollTrigger: { trigger: '.ben-table', start: 'top 78%' } })
      gsap.set('.stat-card', { opacity: 0, scale: 0.88, y: 30 })
      gsap.to('.stat-card', { opacity: 1, scale: 1, y: 0, stagger: 0.1, duration: 0.7, ease: 'back.out(1.5)',
        scrollTrigger: { trigger: '.stats-grid', start: 'top 80%' } })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="py-24 lg:py-32" style={{ background: '#080c14' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="ben-head mb-14">
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#0dccad' }}>Benefits</p>
          <h2 className="text-5xl lg:text-6xl font-black leading-[1.05] mb-5" style={{ letterSpacing: '-0.03em' }}>
            <span className="text-white">What Changes When You </span>
            <span style={GT}>Use NNC CRM</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
            Real, measurable outcomes for your business — not just software features.
          </p>
        </div>

        {/* Before / After table */}
        <div className="ben-table overflow-hidden mb-16" style={{ border: '1px solid #1e3a5f' }}>
          {/* Header row */}
          <div className="grid grid-cols-3">
            <div className="px-5 py-3 text-xs font-bold uppercase tracking-wider text-gray-500"
                 style={{ background: '#071626' }}>Situation</div>
            <div className="px-5 py-3 text-xs font-bold uppercase tracking-wider text-red-400"
                 style={{ background: 'rgba(239,68,68,0.08)', borderLeft: '1px solid #1e3a5f' }}>Before NNC CRM</div>
            <div className="px-5 py-3 text-xs font-bold uppercase tracking-wider"
                 style={{ background: 'rgba(16,185,129,0.08)', borderLeft: '1px solid #1e3a5f', color: '#0dccad' }}>After NNC CRM</div>
          </div>

          {ROWS.map((r, i) => (
            <div key={r.label} className="table-row-item grid grid-cols-3" style={{ borderTop: '1px solid #1e3a5f' }}>
              <div className="px-5 py-4 text-sm font-semibold text-white leading-snug"
                   style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)' }}>
                {r.label}
              </div>
              <div className="px-5 py-4 text-sm leading-snug"
                   style={{ background: i % 2 === 0 ? 'rgba(239,68,68,0.04)' : 'rgba(239,68,68,0.07)', borderLeft: '1px solid rgba(239,68,68,0.15)', color: 'rgba(252,165,165,0.85)' }}>
                {r.before}
              </div>
              <div className="px-5 py-4 text-sm leading-snug"
                   style={{ background: i % 2 === 0 ? 'rgba(16,185,129,0.04)' : 'rgba(16,185,129,0.07)', borderLeft: '1px solid rgba(16,185,129,0.15)', color: '#5ce8d8' }}>
                {r.after}
              </div>
            </div>
          ))}
        </div>

        {/* ROI Stats */}
        <p className="text-xs font-bold uppercase tracking-widest mb-8 text-gray-600">ROI & Outcome Statistics</p>
        <div className="stats-grid grid grid-cols-2 lg:grid-cols-3 gap-4">
          {STATS.map(s => (
            <div key={s.label} className="stat-card group relative overflow-hidden cursor-default transition-all duration-300 hover:-translate-y-2"
                 style={{ background: 'linear-gradient(160deg,#0d1b2e,#071626)', border: '1px solid #1e3a5f', borderLeft: '3px solid #0dccad' }}>
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                   style={{ background: 'radial-gradient(ellipse at top left,rgba(13,204,173,0.08),transparent 70%)' }}/>
              <div className="relative p-6">
                <div className="text-4xl lg:text-5xl font-black mb-3" style={GT}>
                  <Counter target={s.val} unit={s.unit} prefix={s.prefix} />
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
