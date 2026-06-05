'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

const NAV_LINKS = [
  { label: 'Features',     href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Pricing',      href: '#pricing' },
  { label: 'Integrations', href: '#integrations' },
  { label: 'Case Studies', href: '#testimonials' },
  { label: 'Blog',         href: '#' },
  { label: 'Support',      href: '#faq' },
]

const HamIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
    <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
)
const XIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)

export default function NNCNavbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobile, setMobile] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const smoothScroll = (e, href) => {
    if (!href.startsWith('#')) return
    e.preventDefault()
    setMobile(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const navBg = scrolled
    ? 'bg-[#0d1024] backdrop-blur-md shadow-lg shadow-black/30'
    : 'bg-[#0d1024] backdrop-blur-md shadow-lg shadow-black/30'

  return (
    <nav className={` transition-all duration-300 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* Logo */}
       <a
  href="#hero"
  onClick={(e) => smoothScroll(e, "#hero")}
  className="flex items-center shrink-0"
>
  <Image
    src="/NNCLOGO.webp"
    alt="NNC Digital CRM"
    width={180}
    height={50}
    priority
    className="h-20 w-auto"
  />
</a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map(l => (
              <a
                key={l.label}
                href={l.href}
                onClick={(e) => smoothScroll(e, l.href)}
                className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors rounded-md hover:bg-white/5"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a href="#" className="px-4 py-2 text-sm font-semibold text-gray-300 hover:text-white border border-gray-600 hover:border-gray-400 rounded-lg transition-all">
              Sign In
            </a>
            <a
              href="#pricing"
              onClick={(e) => smoothScroll(e, '#pricing')}
              className="px-5 py-2.5 text-sm font-bold text-white rounded-lg transition-all"
              style={{ background: 'linear-gradient(135deg,#0dccad,#08a88c)' }}
            >
              Start Free Trial
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobile(!mobile)}
            className="lg:hidden text-gray-300 hover:text-white p-2 transition-colors"
            aria-label="Toggle menu"
          >
            {mobile ? <XIcon /> : <HamIcon />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobile && (
        <div className="lg:hidden border-t border-white/10" style={{ background: '#071626' }}>
          <div className="py-3 px-4 flex flex-col gap-1">
            {NAV_LINKS.map(l => (
              <a
                key={l.label}
                href={l.href}
                onClick={(e) => smoothScroll(e, l.href)}
                className="block px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                {l.label}
              </a>
            ))}
            <div className="flex gap-3 mt-3 pt-3 border-t border-white/10">
              <a href="#" className="flex-1 text-center py-2.5 text-sm font-semibold text-gray-300 border border-gray-600 rounded-lg">
                Sign In
              </a>
              <a href="#pricing" onClick={(e) => smoothScroll(e, '#pricing')}
                 className="flex-1 text-center py-2.5 text-sm font-bold text-white rounded-lg"
                 style={{ background: 'linear-gradient(135deg,#0dccad,#08a88c)' }}>
                Start Free Trial
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
