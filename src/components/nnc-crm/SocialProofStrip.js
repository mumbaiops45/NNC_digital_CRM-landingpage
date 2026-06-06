'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

// Replace src values with your actual logo image URLs
const LOGOS = [
  { name: 'QuickMart',        src: '/mls.webp' },
  { name: 'MedCare',          src: '/vstudio.webp' },
  { name: 'EduSpark',         src: '/neet.webp' },
  { name: 'Patel Properties', src: '/gencom.webp' },
  { name: 'Reddy Group',      src: '/healing.webp' },
  { name: 'TechServe',        src: '/infinitymart.webp' },
  { name: 'FreshFoods',       src: '/organic.webp' },
  { name: 'BuildRight',       src: '/anigram.webp' },
]

const doubled = [...LOGOS, ...LOGOS]

export default function SocialProofStrip() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.proof-label', { opacity: 0, y: 15 })
      gsap.to('.proof-label', { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 88%' } })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="py-12 overflow-hidden relative"
             style={{ background: '#0a1e36', borderTop: '1px solid rgba(13,204,173,0.08)', borderBottom: '1px solid rgba(13,204,173,0.08)' }}>

      {/* Subtle top glow */}
      <div className="absolute inset-0 pointer-events-none"
           style={{ backgroundImage: 'radial-gradient(ellipse 50% 80% at 50% 50%,rgba(13,204,173,0.03) 0%,transparent 70%)' }}/>

      <p className="proof-label text-center text-[10px] font-bold uppercase tracking-[0.25em] mb-8"
         style={{ color: 'rgba(13,204,173,0.5)' }}>
        Trusted by 500+ growing businesses across India
      </p>

      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
             style={{ background: 'linear-gradient(to right,#0a1e36,transparent)' }}/>
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
             style={{ background: 'linear-gradient(to left,#0a1e36,transparent)' }}/>

        <div className="flex gap-3 animate-marquee" style={{ width: 'max-content' }}>
          {doubled.map((logo, i) => (
            <div key={i}
                 className="shrink-0 rounded-md flex items-center justify-center px-6 py-4 cursor-default"
                 style={{
                   background: '#ffffff',
                   border: '1px solid rgba(255,255,255,0.15)',
                   transition: 'box-shadow 0.25s, transform 0.25s',
                   minWidth: '130px',
                   height: '68px',
                   boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
                 }}
                 onMouseEnter={e => {
                   e.currentTarget.style.boxShadow = '0 6px 20px rgba(13,204,173,0.2)'
                   e.currentTarget.style.transform = 'translateY(-2px)'
                 }}
                 onMouseLeave={e => {
                   e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.18)'
                   e.currentTarget.style.transform = 'translateY(0)'
                 }}>
              {logo.src ? (
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="h-8 w-auto object-contain select-none"
                  draggable={false}
                />
              ) : (
                <span className="text-xs font-bold text-gray-400 whitespace-nowrap tracking-wide">
                  {logo.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
