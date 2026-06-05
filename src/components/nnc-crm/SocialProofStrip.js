'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const LOGOS = [
  { name: 'QuickMart', sector: 'Retail', shape: 'M4 4h16v2H4zm0 4h16v2H4zm0 4h10v2H4z', weight: 'font-black', size: 'text-xl', spacing: 'tracking-tight' },
  { name: 'MedCare', sector: 'Healthcare', shape: 'M12 2a10 10 0 100 20 10 10 0 000-20zm1 14h-2v-4H7v-2h4V6h2v4h4v2h-4v4z', weight: 'font-semibold', size: 'text-lg', spacing: 'tracking-wide', italic: true },
  { name: 'EduSpark', sector: 'Education', shape: 'M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z', weight: 'font-extrabold', size: 'text-xl', spacing: 'tracking-widest' },
  { name: 'Patel Properties', sector: 'Real Estate', shape: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z', weight: 'font-bold', size: 'text-sm', spacing: 'tracking-[0.15em] uppercase' },
  { name: 'Reddy Group', sector: 'Hospitality', shape: 'M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2z', weight: 'font-light', size: 'text-2xl', spacing: 'tracking-[0.25em]' },
  { name: 'TechServe', sector: 'Solutions', shape: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z', weight: 'font-black', size: 'text-lg', spacing: 'tracking-tight', mono: true },
  { name: 'FreshFoods', sector: 'F&B', shape: 'M18.06 22.99h1.66c.84 0 1.53-.64 1.63-1.46L23 5.05h-5V1h-1.97v4.05h-4.97l.3 2.34c1.71.47 3.31 1.32 4.27 2.26 1.44 1.42 2.43 2.89 2.43 5.29v8.05zM1 21.99V21h15.03v.99c0 .55-.45 1-1.01 1H2.01c-.56 0-1.01-.45-1.01-1zm15.03-7c0-4.5-6.72-5-8.03-5-1.31 0-8.03.5-8.03 5H16.03z', weight: 'font-extrabold', size: 'text-lg', spacing: 'tracking-normal' },
  { name: 'BuildRight', sector: 'Infrastructure', shape: 'M13 2.05v2.02c3.95.49 7 3.85 7 7.93 0 3.21-1.81 6-4.72 7.28L13 17v5h5l-1.22-1.22C19.91 19.07 22 15.76 22 12c0-5.18-3.95-9.45-9-9.95zM11 2.05C5.95 2.55 2 6.82 2 12c0 3.76 2.09 7.07 5.22 8.78L6 22h5V2.05z', weight: 'font-black', size: 'text-base', spacing: 'tracking-[0.2em] uppercase' },
]

const doubled = [...LOGOS, ...LOGOS]

function LogoIcon({ path }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="shrink-0 opacity-60">
      <path d={path} />
    </svg>
  )
}

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
    <section ref={ref} className="py-10 overflow-hidden"
             style={{ background: '#0a1e36', borderTop: '1px solid #0d2040', borderBottom: '1px solid #0d2040' }}>
      <p className="proof-label text-center text-[10px] font-bold uppercase tracking-[0.25em] text-gray-600 mb-7">
        Trusted by 500+ growing businesses across India
      </p>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
             style={{ background: 'linear-gradient(to right,#0a1e36,transparent)' }}/>
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
             style={{ background: 'linear-gradient(to left,#0a1e36,transparent)' }}/>

        <div className="flex gap-0 animate-marquee" style={{ width: 'max-content' }}>
          {doubled.map((logo, i) => (
            <div key={i} className="flex items-center gap-0 shrink-0 px-10 py-2 group cursor-default"
                 style={{ filter: 'grayscale(1)', opacity: 0.3, transition: 'opacity 0.3s' }}
                 onMouseEnter={e => (e.currentTarget.style.opacity = '0.55')}
                 onMouseLeave={e => (e.currentTarget.style.opacity = '0.3')}>
              <div className="flex flex-col items-center gap-1.5 text-gray-300">
                <div className="flex items-center gap-2">
                  <LogoIcon path={logo.shape} />
                  <span className={`${logo.weight} ${logo.size} ${logo.spacing} whitespace-nowrap ${logo.italic ? 'italic' : ''} ${logo.mono ? 'font-mono' : ''} leading-none`}>
                    {logo.name}
                  </span>
                </div>
                <span className="text-[8px] font-bold tracking-[0.2em] text-gray-500 uppercase">{logo.sector}</span>
              </div>
              {i < doubled.length - 1 && <span className="ml-10 w-px h-8 bg-gray-800 shrink-0"/>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
