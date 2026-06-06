'use client'
import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const GT = { background: 'linear-gradient(135deg,#0dccad 0%,#5ce8d8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }

const TESTIMONIALS = [
  {
    stars: 5, industry: 'Retail', color: '#0dccad', bgRgb: '13,204,173', initials: 'RS',
    quote: 'Before NNC CRM, we were losing at least 5 leads every week just because nobody followed up on time. Within the first month, our lead conversion rate jumped from 12% to 31%. The automated follow-up sequences are genuinely magic — leads get contacted within minutes of enquiring, even at midnight.',
    name: 'Ravi Sharma', role: 'Founder, QuickMart Retail', result: 'Lead conversion: 12% → 31%',
  },
  {
    stars: 5, industry: 'Healthcare', color: '#60A5FA', bgRgb: '96,165,250', initials: 'PN',
    quote: 'Managing patient enquiries for 3 clinic branches was an absolute nightmare before NNC CRM. Our reception staff were spending 3 hours a day just on follow-up calls and WhatsApp messages. NNC CRM automated all of that. Patient appointment bookings increased by 40% in the first month.',
    name: 'Dr. Priya Nair', role: 'Medical Director, MedCare Clinics', result: 'Appointment bookings: +40% in Month 1',
  },
  {
    stars: 5, industry: 'Education', color: '#F59E0B', bgRgb: '245,158,11', initials: 'AM',
    quote: 'We were running our entire student admissions process through Google Sheets, WhatsApp, and memory. NNC CRM changed everything. Now every enquiry is captured automatically, followed up perfectly, and our admissions team has a clear daily task list. Our enrollment conversion rate went from 18% to 44% in just 60 days.',
    name: 'Anita Menon', role: 'CEO, EduSpark Learning', result: 'Enrollment conversion: 18% → 44%',
  },
  {
    stars: 5, industry: 'Real Estate', color: '#10B981', bgRgb: '16,185,129', initials: 'SP',
    quote: "Real estate is all about relationships and follow-ups — and NNC CRM is the best tool I've found for managing both. I have 200+ active property enquiries at any time. Before NNC CRM, I was manually calling everyone, missing follow-ups, and losing deals. Now my pipeline is clean, my follow-ups are automated, and my deal closure rate has doubled.",
    name: 'Suresh Patel', role: 'Owner, Patel Properties', result: 'Deal closure rate doubled in 3 months',
  },
  {
    stars: 5, industry: 'Hospitality', color: '#8B5CF6', bgRgb: '139,92,246', initials: 'KR',
    quote: 'We implemented NNC CRM across 4 of our hotels for managing corporate account sales. The results were immediate and dramatic. Our sales team now spends their time selling instead of doing admin. Revenue from corporate accounts increased by 35% in the first quarter. The ROI on NNC CRM is frankly embarrassing — it pays for itself 20 times over.',
    name: 'Kavitha Reddy', role: 'Director, Reddy Hospitality Group', result: 'Corporate revenue: +35% in Q1',
  },
]

function Stars({ n }) {
  return (
    <div className="flex gap-0.5">
      {Array(n).fill(0).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#FBBF24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
      ))}
    </div>
  )
}

export default function TestimonialsSection() {
  const [activeIdx, setActiveIdx] = useState(0)
  const sectionRef = useRef(null)
  const slidesRef  = useRef(null)

  useEffect(() => {
    const isMobile = window.innerWidth < 768
    if (isMobile) return

    const ctx = gsap.context(() => {
      const totalMove = (TESTIMONIALS.length - 1) * window.innerWidth

      gsap.to(slidesRef.current, {
        x: -totalMove,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${totalMove}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate(self) {
            setActiveIdx(Math.round(self.progress * (TESTIMONIALS.length - 1)))
          },
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* ─── Pinned section ─── */}
      <section
        ref={sectionRef}
        id="testimonials"
        className="overflow-hidden"
        style={{ background: '#0a1e36', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
      >
        {/* Header — visible throughout */}
        <div className="flex-none max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-16 pb-8 lg:pb-4">
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#0dccad' }}>Social Proof</p>
          <h2 className="text-5xl lg:text-6xl font-black leading-[1.05] mb-4" style={{ letterSpacing: '-0.03em' }}>
            <span className="text-white">Real Businesses. </span>
            <span style={GT}>Real Results.</span>
            <span className="text-white"> Real Growth.</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl">
            Don't just take our word for it — here's what our customers say after making the switch to NNC CRM.
          </p>
        </div>

        {/* Slides — desktop horizontal scroll */}
        <div className="flex-1 overflow-hidden hidden md:block relative">
          <div ref={slidesRef} className="flex h-full" style={{ width: `${TESTIMONIALS.length * 100}vw` }}>
            {TESTIMONIALS.map(t => (
              <div key={t.name} className="flex items-center justify-center px-8"
                   style={{ width: '100vw', minHeight: '55vh' }}>
                <div className="max-w-4xl w-full p-10 lg:px-8 lg:py-6 relative overflow-hidden"
                     style={{
                       background: `rgba(${t.bgRgb},0.08)`,
                       borderLeft: `5px solid ${t.color}`,
                       border: `1px solid rgba(${t.bgRgb},0.2)`,
                       borderLeftWidth: '5px',
                     }}>
                  <div className="absolute top-6 right-8 opacity-[0.06]" style={{ color: t.color }}>
                    <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
                  </div>
                  <Stars n={t.stars} />
                  <p className="text-lg lg:text-xl text-gray-300 leading-relaxed mt-5 mb-8 italic">"{t.quote}"</p>
                  <div className="flex items-center justify-between flex-wrap gap-4"
                       style={{ borderTop: `1px solid rgba(${t.bgRgb},0.15)`, paddingTop: '1.25rem' }}>
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 shrink-0 flex items-center justify-center text-sm font-black"
                           style={{ background: `rgba(${t.bgRgb},0.15)`, color: t.color, border: `1.5px solid rgba(${t.bgRgb},0.3)` }}>
                        {t.initials}
                      </div>
                      <div>
                        <p className="font-bold text-white">{t.name}</p>
                        <p className="text-sm text-gray-500">{t.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold px-3 py-1" style={{ background: `rgba(${t.bgRgb},0.1)`, color: t.color }}>{t.industry}</span>
                      <span className="text-sm font-semibold" style={{ color: t.color }}>↑ {t.result}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Progress dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {TESTIMONIALS.map((_, i) => (
              <div key={i} className="transition-all duration-300"
                   style={{ width: i === activeIdx ? '24px' : '8px', height: '8px', background: i === activeIdx ? '#0dccad' : '#1e3a5f' }}/>
            ))}
          </div>
        </div>

        {/* Mobile: stacked */}
        <div className="md:hidden px-4 pb-10 space-y-5">
          {TESTIMONIALS.map(t => (
            <div key={t.name} className="p-6 relative"
                 style={{ background: `rgba(${t.bgRgb},0.07)`, borderLeft: `4px solid ${t.color}`, border: `1px solid rgba(${t.bgRgb},0.15)`, borderLeftWidth: '4px' }}>
              <Stars n={t.stars} />
              <p className="text-sm text-gray-400 leading-relaxed mt-3 mb-4 italic">"{t.quote}"</p>
              <div className="flex items-center gap-3" style={{ borderTop: `1px solid rgba(${t.bgRgb},0.15)`, paddingTop: '0.75rem' }}>
                <div className="w-9 h-9 flex items-center justify-center text-xs font-black shrink-0"
                     style={{ background: `rgba(${t.bgRgb},0.15)`, color: t.color }}>{t.initials}</div>
                <div>
                  <p className="text-sm font-bold text-white">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Below div — full width, always left border primary ─── */}
      <div style={{ background: '#0a1e36', borderBottom: '1px solid #0d2040' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 px-7 py-6"
               style={{ borderLeft: '4px solid #0dccad', background: 'rgba(13,204,173,0.04)', border: '1px solid rgba(13,204,173,0.12)', borderLeftWidth: '4px' }}>
            <div className="flex flex-col items-center text-center shrink-0 gap-1">
              <span className="text-4xl font-black text-white">4.9</span>
              <div className="flex gap-0.5">
                {Array(5).fill(0).map((_,i) => <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#FBBF24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
              </div>
              <span className="text-xs text-gray-500">out of 5.0</span>
            </div>
            <div style={{ width: '1px', height: '50px', background: '#1e3a5f' }} className="hidden sm:block"/>
            <p className="text-sm text-gray-400">
              Based on <strong className="text-white">480+ verified customer reviews</strong> across Google, G2, and Capterra.
              Rated <strong className="text-white">#1 CRM for Indian Small Businesses</strong> two years running.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
