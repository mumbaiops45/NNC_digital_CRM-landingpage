'use client'
import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const GT = { background: 'linear-gradient(135deg,#0dccad 0%,#5ce8d8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }

const FAQS = [
  {
    q: 'What exactly is a CRM and does my business really need one?',
    a: 'A CRM (Customer Relationship Management) system is software that helps you manage all your interactions with potential and existing customers in one organised place. If your business has more than a handful of customers, generates leads from any source, or has a sales team of any size, then yes — you absolutely need a CRM. Without one, you\'re relying on human memory, spreadsheets, and WhatsApp chats to manage what should be your most valuable business asset: your customer relationships.',
  },
  {
    q: 'How is NNC CRM different from other CRMs like Zoho, HubSpot, or Salesforce?',
    a: 'The main differences are simplicity, pricing, and India-specific features. Enterprise CRMs like Salesforce are powerful but require months of implementation, dedicated IT support, and cost lakhs per year. Tools like HubSpot are better but still complex for small businesses. NNC CRM is built specifically for Indian small businesses — it is up in 5 minutes, priced for SMB budgets, includes WhatsApp Business and Indian payment gateway integrations natively, and is supported by a team that understands the Indian market.',
  },
  {
    q: 'How long does it take to set up NNC CRM?',
    a: 'Most customers are fully set up and running their first automation within the same day they sign up. Basic setup — importing contacts, creating your pipeline, and connecting your email — takes under 30 minutes. If you want help, our onboarding team will guide you through everything on a free video call, and we have over 50 video tutorials covering every feature.',
  },
  {
    q: 'Is my data safe and private?',
    a: 'Your data security is our highest priority. All data is stored on ISO 27001-certified cloud servers in India, encrypted at rest and in transit using AES-256 encryption. We do not share, sell, or use your data for any purpose other than providing the NNC CRM service. We are fully GDPR-compliant and adhere to all Indian data protection regulations. You own your data completely and can export it at any time.',
  },
  {
    q: 'Can I use NNC CRM for businesses beyond sales — like customer support?',
    a: 'Yes. NNC CRM includes a built-in customer support ticketing system that works alongside your sales CRM. You can convert customer emails and WhatsApp messages into support tickets, assign them to team members, set SLAs, and track resolution — all within the same platform. This gives your support team full context from the customer\'s sales history when handling queries.',
  },
  {
    q: 'What happens if I exceed my contact or user limits?',
    a: 'If you approach your plan limits, NNC CRM will notify you in advance and give you options to upgrade. We do not cut off your access or delete your data — we simply prompt you to move to a higher plan. Upgrades are instant and prorated, so you only pay for the time remaining in your billing cycle.',
  },
  {
    q: 'Does NNC CRM work on mobile devices?',
    a: 'Yes. NNC CRM has full-featured iOS and Android apps available for free download from the App Store and Google Play. The mobile app includes your full contact database, deal pipeline, task list, and communication tools. It also has an offline mode so your field sales team can access key data even without an internet connection.',
  },
  {
    q: 'Can my entire team use NNC CRM, and how do permissions work?',
    a: 'Yes. NNC CRM is designed for teams. You can invite as many team members as your plan allows, assign them individual roles and permissions, and control exactly what data each person can see and edit. Common roles include Admin (full access), Sales Manager (team view + reporting), Sales Rep (own pipeline only), and Support Agent (ticketing only). Custom roles are available on the Pro plan.',
  },
  {
    q: 'Do you offer training and onboarding support?',
    a: 'Yes, and it is included free with all plans. Every new account gets a complimentary 45-minute onboarding call with a dedicated setup specialist. Beyond that, you have access to our full library of 50+ video tutorials, a searchable help centre with 200+ articles, live weekly webinars, and a private community of NNC CRM users. Pro plan customers also get a dedicated account manager and priority phone support.',
  },
  {
    q: 'Can I import data from my current CRM or spreadsheets?',
    a: 'Yes. NNC CRM supports one-click import from Excel (.xlsx), Google Sheets, and CSV files. We also offer migration assistance from popular CRMs including Zoho CRM, HubSpot, Salesforce, and Freshsales. Our migration tool intelligently maps your existing fields to NNC CRM fields and flags any data that needs attention before import.',
  },
  {
    q: 'What if I want to cancel? Is there a lock-in?',
    a: 'There is absolutely no lock-in contract. You can cancel your NNC CRM subscription at any time from your account settings. If you cancel, you will retain access until the end of your current billing period, after which your account will be deactivated. Before deactivation, you can export all your data in CSV or Excel format. We do not charge cancellation fees of any kind.',
  },
  {
    q: 'Do you offer custom development or enterprise-specific features?',
    a: 'Yes. For businesses with specific requirements not covered by our standard plans, our enterprise team can build custom features, integrations, and workflows. We have built custom CRM modules for industries including real estate, healthcare, manufacturing, and education. Contact our enterprise sales team for a custom quote and discovery call.',
  },
]

function FaqItem({ q, a, i }) {
  const [open, setOpen] = useState(false)
  const bodyRef = useRef(null)

  const toggle = () => {
    setOpen(v => {
      const next = !v
      if (bodyRef.current) {
        if (next) gsap.fromTo(bodyRef.current, { height: 0, opacity: 0 }, { height: 'auto', opacity: 1, duration: 0.32, ease: 'power2.out' })
        else gsap.to(bodyRef.current, { height: 0, opacity: 0, duration: 0.22, ease: 'power2.in' })
      }
      return next
    })
  }

  return (
    <div className="faq-item" style={{ borderBottom: '1px solid #1e3a5f' }}>
      <button className="w-full text-left flex items-start gap-4 py-5 cursor-pointer" onClick={toggle}>
        <span className="shrink-0 text-xs font-black tabular-nums mt-0.5" style={{ color: '#0dccad' }}>
          {String(i + 1).padStart(2, '0')}
        </span>
        <span className="flex-1 text-sm font-semibold text-white leading-snug">{q}</span>
        <svg className="shrink-0 mt-0.5 transition-transform duration-300" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4b5563" strokeWidth="2"
             style={{ transform: open ? 'rotate(45deg)' : 'rotate(0)' }}>
          <path d="M12 5v14M5 12h14"/>
        </svg>
      </button>
      <div ref={bodyRef} style={{ overflow: 'hidden', height: 0, opacity: 0 }}>
        <p className="pb-5 pl-8 text-sm text-gray-400 leading-relaxed">{a}</p>
      </div>
    </div>
  )
}

export default function FAQSection() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.faq-head', { opacity: 0, y: 50 })
      gsap.to('.faq-head', { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%' } })
      gsap.set('.faq-item', { opacity: 0, x: -20 })
      gsap.to('.faq-item', { opacity: 1, x: 0, stagger: 0.04, duration: 0.45, ease: 'power2.out',
        scrollTrigger: { trigger: '.faq-list', start: 'top 80%' } })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} id="faq" className="py-24 lg:py-32" style={{ background: '#080c14' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="faq-head mb-14">
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#0dccad' }}>FAQ</p>
          <h2 className="text-5xl lg:text-6xl font-black leading-[1.05] mb-5" style={{ letterSpacing: '-0.03em' }}>
            <span className="text-white">Everything You Need to </span>
            <span style={GT}>Know About NNC CRM</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
            Everything you need to know before you get started with NNC CRM.
          </p>
        </div>

        <div className="faq-list" style={{ borderLeft: '4px solid #0dccad', paddingLeft: '1.5rem' }}>
          {FAQS.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} i={i} />)}
        </div>

        <div className="mt-10 px-6 py-5"
             style={{ borderLeft: '4px solid #0dccad', background: 'rgba(13,204,173,0.04)', border: '1px solid rgba(13,204,173,0.12)', borderLeftWidth: '4px' }}>
          <p className="text-sm text-gray-400">
            Still have a question that's not answered here?{' '}
            <span style={{ color: '#0dccad' }} className="cursor-pointer hover:underline font-semibold">Chat with our team →</span>
            {' '}Our support team responds in under 2 hours during business hours.
          </p>
        </div>

      </div>
    </section>
  )
}
