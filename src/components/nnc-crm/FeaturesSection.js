'use client'
import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const GT = { background: 'linear-gradient(135deg,#0dccad 0%,#5ce8d8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }

const FEATURES = [
  {
    num: '01', title: 'Lead Management & Capture',
    Icon: () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0dccad" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    desc: "Automatically capture leads from every source — your website contact forms, Facebook and Instagram lead ads, WhatsApp messages, Google Ads, incoming calls, and manual entries. Every lead is instantly logged with source tracking, assigned to the right team member, and queued for follow-up. Never start a morning wondering 'Did we follow up with that enquiry?'",
    bullets: ['Automatic lead capture from website, social media, and WhatsApp', 'Lead source tracking — know exactly where your best leads come from', 'Instant lead assignment rules based on location, product, or team', 'Duplicate detection — no more messy contact databases', 'Lead scoring to prioritise your hottest prospects'],
  },
  {
    num: '02', title: 'Visual Sales Pipeline',
    Icon: () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="2"><rect x="3" y="3" width="5" height="18"/><rect x="10" y="8" width="5" height="13"/><rect x="17" y="5" width="5" height="16"/></svg>,
    desc: 'See your entire sales operation at a glance with a beautifully designed Kanban-style pipeline board. Drag and drop deals through custom stages that match your exact sales process — from initial enquiry all the way to closed won. Know instantly which deals need attention, which are going cold, and where your revenue is coming from.',
    bullets: ['Fully customisable pipeline stages to match your sales process', 'Drag-and-drop deal management — intuitive for any team member', 'Deal value, probability, and expected close date on every card', 'Colour-coded age indicators — see which deals are going cold', 'Multiple pipeline views: board, list, and forecast'],
  },
  {
    num: '03', title: 'Contact & Account Management',
    Icon: () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
    desc: 'Every contact in your CRM is a complete, living profile. See their full history — every email, every call, every note, every document, every deal — all in one place. For businesses that sell to other businesses, link contacts to their company accounts for a complete picture of the relationship.',
    bullets: ['360-degree contact profiles with complete interaction history', 'Company/account hierarchy linking contacts to organisations', 'Custom fields to capture the information that matters to your business', 'Activity timeline showing every touchpoint with a contact', 'Smart search and filtering across your entire contact database'],
  },
  {
    num: '04', title: 'Automated Follow-Ups & Workflows',
    Icon: () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2"><path d="M12 22v-4M12 2v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>,
    desc: "This is where NNC CRM truly earns its place in your business. Set up intelligent automation rules that work for you around the clock. When a new lead comes in, automatically send a welcome email. When a deal has been in 'Proposal Sent' for 3 days with no response, automatically send a follow-up and create a task for your rep. When a deal is closed, automatically send a welcome email and create an onboarding task.",
    bullets: ['Drag-and-drop workflow builder — no coding required', 'Trigger automations based on actions, time delays, or deal stages', 'Automated email and SMS sequences for lead nurturing', 'Auto-task creation to keep your team on track', 'Conditional logic — different actions for different scenarios'],
  },
  {
    num: '05', title: 'Email & WhatsApp Integration',
    Icon: () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
    desc: 'Communicate with your leads and customers directly from within NNC CRM — without ever switching tabs. Send and receive emails, sync your Gmail or Outlook inbox, and even send and track WhatsApp messages. Every communication is automatically logged against the contact\'s profile, giving your entire team full visibility of every conversation.',
    bullets: ['Two-way Gmail and Outlook inbox sync', 'Send personalised emails in bulk using contact data', 'WhatsApp Business integration for direct messaging', 'Email open tracking and click tracking', 'Email templates for common responses and follow-ups'],
  },
  {
    num: '06', title: 'Task & Activity Management',
    Icon: () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0dccad" strokeWidth="2"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>,
    desc: "Never let your team drop the ball on a follow-up again. NNC CRM's built-in task management system ensures every commitment, every callback, every meeting, and every follow-up is tracked, assigned, and completed on time. Managers get full visibility of team activity, and reps get clear daily to-do lists.",
    bullets: ['Create tasks linked directly to contacts, deals, or accounts', 'Assign tasks to team members with due dates and priorities', 'Daily task dashboard — each rep knows exactly what to do today', 'Overdue task alerts sent via email and in-app notifications', 'Meeting scheduling with calendar integration (Google Calendar, Outlook)'],
  },
  {
    num: '07', title: 'Reporting & Analytics Dashboard',
    Icon: () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
    desc: "Data-driven decisions start with the right data. NNC CRM's reporting dashboard gives you real-time visibility into your entire sales operation — from the number of new leads this week to your team's conversion rates, average deal size, and revenue forecast for the month. Stop guessing. Start knowing.",
    bullets: ['Live sales dashboard with key performance metrics', 'Revenue forecast based on pipeline value and deal probability', 'Team performance reports — leads contacted, deals closed, conversion rates', 'Lead source analysis — where are your best customers coming from?', 'Custom report builder — create reports for any metric that matters'],
  },
  {
    num: '08', title: 'Customer Support Ticketing',
    Icon: () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
    desc: "NNC CRM doesn't just help you win customers — it helps you keep them. The built-in support ticketing system lets your team manage customer enquiries, complaints, and requests in a structured way. Every ticket is linked to the customer's CRM profile, giving your support team full context without asking the customer to repeat themselves.",
    bullets: ['Convert customer emails and WhatsApp messages into support tickets', 'Assign tickets to team members with priority and SLA settings', 'Full customer history visible on every ticket', 'Canned responses for common queries to save time', 'Customer satisfaction ratings after ticket resolution'],
  },
  {
    num: '09', title: 'Invoicing & Quotation Management',
    Icon: () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
    desc: "Turn quotes into invoices without leaving your CRM. NNC CRM's built-in quotation and invoicing module lets your team create professional, branded proposals and send them directly to customers. Track which quotes have been viewed, follow up on pending invoices, and record payments — all linked to the customer's deal record.",
    bullets: ['Create and send professional branded quotations in minutes', 'One-click conversion from quotation to invoice', 'Payment tracking — know which invoices are paid, pending, or overdue', 'Tax calculations and discount management', 'PDF download and direct email sending from within the CRM'],
  },
  {
    num: '10', title: 'Mobile CRM App',
    Icon: () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>,
    desc: "Your sales team doesn't stop working when they leave the office — and neither should your CRM. The NNC CRM mobile app for iOS and Android gives your team full access to their contacts, deals, tasks, and pipeline on the go. Log a call from a parking lot. Update a deal stage from a client meeting. Check your pipeline from anywhere.",
    bullets: ['Full-featured iOS and Android app', 'Offline mode — access key data even without internet connectivity', 'One-tap call logging and note taking after client meetings', 'Push notifications for tasks, follow-ups, and deal updates', 'Business card scanner — photograph a card, auto-create a contact'],
  },
]

export default function FeaturesSection() {
  const [active, setActive] = useState(0)
  const sectionRef = useRef(null)
  const twoColRef  = useRef(null)   // only this area gets pinned
  const contentRef = useRef(null)
  const activeRef  = useRef(0)

  useEffect(() => {
    const isMobile = window.innerWidth < 1024
    const ctx = gsap.context(() => {
      // Heading animates in normally
      gsap.set('.feat-head', { opacity: 0, y: 40 })
      gsap.to('.feat-head', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.feat-head', start: 'top 80%' } })

      if (!isMobile) {
        // Pin ONLY the two-column area — heading scrolls past first
        ScrollTrigger.create({
          trigger: twoColRef.current,
          start: 'top 10%',
          end: `+=${FEATURES.length * 400}`,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          onUpdate(self) {
            const idx = Math.min(Math.floor(self.progress * FEATURES.length), FEATURES.length - 1)
            if (idx !== activeRef.current) {
              activeRef.current = idx
              setActive(idx)
              if (contentRef.current) {
                gsap.fromTo(contentRef.current,
                  { opacity: 0, y: 18 },
                  { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' })
              }
            }
          },
        })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const f = FEATURES[active]

  return (
    <section ref={sectionRef} id="features" style={{ background: '#080c14' }}>

      {/* Heading scrolls normally */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <div className="feat-head">
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#0dccad' }}>Features & Capabilities</p>
          <h2 className="text-5xl lg:text-6xl font-black leading-[1.05] mb-4" style={{ letterSpacing: '-0.03em' }}>
            <span style={GT}>Everything You Need</span><br/>
            <span className="text-white">to Manage Customers and Close Deals</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
            NNC CRM packs 10 powerful capabilities into one beautifully simple platform — no add-ons, no hidden extras.
          </p>
        </div>
      </div>

      {/* Desktop: two-column area — this gets pinned */}
      <div ref={twoColRef} className="hidden lg:block" style={{ minHeight: '100vh', background: '#080c14' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 h-full flex gap-8 items-start">

          {/* Sidebar */}
          <div className="w-72 shrink-0 space-y-0.5 pt-2">
            {FEATURES.map((feat, i) => (
              <button key={feat.num} onClick={() => { setActive(i); activeRef.current = i }}
                      className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-all duration-200 ${i === active ? 'text-white' : 'text-gray-600 hover:text-gray-400'}`}
                      style={i === active ? { background: 'linear-gradient(90deg,rgba(13,204,173,0.1),transparent)', borderLeft: '3px solid #0dccad' } : { borderLeft: '3px solid transparent' }}>
                <span className="text-xs font-black tabular-nums shrink-0" style={{ color: i === active ? '#0dccad' : '#1e3a5f' }}>{feat.num}</span>
                <span className="text-sm font-medium leading-snug">{feat.title}</span>
              </button>
            ))}
          </div>

          {/* Content panel */}
          <div ref={contentRef} className="flex-1 p-8 h-full" style={{ background: 'linear-gradient(135deg,#0d1b2e,#071626)', border: '1px solid #1e3a5f', minHeight: '70vh' }}>
            <div className="flex items-start gap-5 mb-6">
              <div className="shrink-0"><f.Icon /></div>
              <div>
                <span className="text-xs font-black" style={{ color: '#0dccad' }}>{f.num}</span>
                <h3 className="text-2xl font-black text-white">{f.title}</h3>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed mb-7">{f.desc}</p>
            <ul className="space-y-3">
              {f.bullets.map(b => (
                <li key={b} className="flex items-start gap-3 text-sm text-gray-300">
                  <svg className="shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0dccad" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile: stacked */}
      <div className="lg:hidden max-w-7xl mx-auto px-4 sm:px-6 pb-16 space-y-4">
        {FEATURES.map(feat => (
          <div key={feat.num} className="p-5" style={{ background: '#0d1b2e', borderLeft: '3px solid #0dccad', border: '1px solid #1e3a5f', borderLeftWidth: '3px' }}>
            <div className="flex items-center gap-3 mb-3">
              <div><feat.Icon /></div>
              <div>
                <span className="text-xs font-black block" style={{ color: '#0dccad' }}>{feat.num}</span>
                <h3 className="text-base font-bold text-white">{feat.title}</h3>
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-3 leading-relaxed">{feat.desc}</p>
            <ul className="space-y-2">
              {feat.bullets.map(b => (
                <li key={b} className="flex items-start gap-2 text-xs text-gray-400">
                  <svg className="shrink-0 mt-0.5" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0dccad" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

    </section>
  )
}
