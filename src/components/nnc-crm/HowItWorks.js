'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const GT = { background: 'linear-gradient(135deg,#0dccad 0%,#5ce8d8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }

const STEPS = [
  {
    num: '01', color: '#0dccad', bgRgb: '13,204,173',
    title: 'Sign Up & Import Your Data',
    body: 'Create your NNC CRM account in 60 seconds. Import your existing contacts and leads from a spreadsheet, your old CRM, or Gmail contacts with one click. Our smart import wizard detects duplicates and maps your data automatically.',
    bullets: [
      '60-second account creation — just your name and email',
      'One-click import from Excel, Google Sheets, or Gmail',
      'Smart duplicate detection and automatic data mapping',
      'Free onboarding call with your dedicated setup specialist',
      'Pre-built pipeline templates for retail, services, and healthcare',
    ],
    Icon: () => (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    ),
  },
  {
    num: '02', color: '#60A5FA', bgRgb: '96,165,250',
    title: 'Set Up Your Pipeline & Automations',
    body: 'Customise your sales pipeline stages to match how your business actually sells. Then set up your first automation — for most businesses, this is an automatic follow-up email 24 hours after a new lead arrives.',
    bullets: [
      'Customise pipeline stages in under 5 minutes — no technical help needed',
      'Choose from 20+ pre-built workflow automation templates',
      'Connect your Gmail, Outlook, or WhatsApp Business in one click',
      'Invite your team members and assign roles and permissions',
      'Configure your dashboard to show the metrics that matter most to you',
    ],
    Icon: () => (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14"/>
        <path d="M15.54 8.46a5 5 0 010 7.07M8.46 8.46a5 5 0 000 7.07"/>
      </svg>
    ),
  },
  {
    num: '03', color: '#10B981', bgRgb: '16,185,129',
    title: 'Capture Leads, Nurture, and Close',
    body: 'From this point, NNC CRM works for you around the clock. Leads flow in automatically. Follow-ups go out on schedule. Your pipeline updates in real time. Your team gets clear task lists every morning.',
    bullets: [
      'Leads automatically captured from all connected sources',
      'Automated nurture sequences keep every prospect warm and engaged',
      'Real-time pipeline visibility for your entire team, on any device',
      'Daily task lists ensure no follow-up is ever missed again',
      'Monthly performance reports delivered straight to your inbox',
    ],
    Icon: () => (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    ),
  },
]

export default function HowItWorks() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.hiw-head', { opacity: 0, y: 50 })
      gsap.to('.hiw-head', { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%' } })
      gsap.set('.step-card', { opacity: 0, y: 60, scale: 0.96 })
      gsap.to('.step-card', { opacity: 1, y: 0, scale: 1, stagger: 0.18, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.steps-wrap', start: 'top 78%' } })
      gsap.set('.hiw-bridge', { opacity: 0, x: -40 })
      gsap.to('.hiw-bridge', { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.hiw-bridge', start: 'top 90%' } })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} id="how-it-works" className="py-24 lg:py-32 relative overflow-hidden"
             style={{ background: '#0a1e36' }}>
      <div className="absolute inset-0 pointer-events-none"
           style={{ backgroundImage: 'radial-gradient(ellipse 70% 50% at 50% 0%,rgba(13,204,173,0.05) 0%,transparent 70%)' }}/>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="hiw-head mb-16">
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#0dccad' }}>How It Works</p>
          <h2 className="text-5xl lg:text-6xl font-black leading-[1.05] mb-5" style={{ letterSpacing: '-0.03em' }}>
            <span className="text-white">Up and Running in </span>
            <span style={GT}>3 Simple Steps</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
            No technical knowledge required. No implementation consultant needed. No weeks of training. Just sign up and start growing.
          </p>
        </div>

        <div className="steps-wrap grid lg:grid-cols-3 gap-6">
          {STEPS.map((s, i) => (
            <div key={s.num} className="step-card group relative flex flex-col overflow-hidden cursor-default transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                 style={{ background: 'linear-gradient(160deg,#071626,#0d1b2e)', border: `1px solid rgba(${s.bgRgb},0.2)`, borderLeft: `4px solid ${s.color}` }}>
              {/* Hover bg */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                   style={{ background: `rgba(${s.bgRgb},0.04)` }}/>

              {/* Step number badge */}
              <div className="relative flex items-center gap-4 px-7 pt-7 pb-5"
                   style={{ borderBottom: `1px solid rgba(${s.bgRgb},0.15)` }}>
                <div className="w-14 h-14 shrink-0 flex items-center justify-center"
                     style={{ background: `rgba(${s.bgRgb},0.12)`, color: s.color }}>
                  <s.Icon />
                </div>
                <div>
                  <span className="text-[11px] font-black uppercase tracking-widest block" style={{ color: s.color }}>Step {s.num}</span>
                  <h3 className="text-lg font-bold text-white leading-snug">{s.title}</h3>
                </div>
              </div>

              <div className="relative px-7 py-6 flex-1 flex flex-col">
                <p className="text-sm text-gray-400 leading-relaxed mb-5">{s.body}</p>
                <ul className="space-y-2.5 mt-auto">
                  {s.bullets.map(b => (
                    <li key={b} className="flex items-start gap-2.5 text-xs text-gray-500">
                      <svg className="shrink-0 mt-0.5" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={s.color} strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Connecting arrow (desktop) */}
              {i < STEPS.length - 1 && (
                <div className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 items-center justify-center"
                     style={{ background: '#0a1e36' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1e3a5f" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Reassurance — full width, always left border primary */}
        <div className="hiw-bridge mt-8 px-7 lg:px-10 py-7"
             style={{ borderLeft: '4px solid #0dccad', background: 'linear-gradient(135deg,rgba(13,204,173,0.05),rgba(10,30,54,0.6))', border: '1px solid rgba(13,204,173,0.15)', borderLeftWidth: '4px' }}>
          <p className="text-gray-300 leading-relaxed">
            Most NNC CRM customers are fully set up and running their first automation{' '}
            <strong className="text-white">within the same day they sign up</strong>. Our dedicated onboarding team
            is available via live chat, phone, and video call to help you at every step. And if you ever get stuck,
            our library of video tutorials, help articles, and live webinars means answers are always just a click away.
          </p>
        </div>

      </div>
    </section>
  )
}
