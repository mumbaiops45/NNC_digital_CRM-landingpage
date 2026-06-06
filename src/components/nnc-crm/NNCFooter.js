'use client'
import Image from "next/image"
const COLUMNS = [
  {
    heading: 'Product',
    links: [
      { label: 'Features Overview', href: '#features' },
      { label: 'How It Works', href: '#how-it-works' },
      { label: 'Pricing', href: '#pricing' },
      { label: "What's New", href: '#' },
      { label: 'Roadmap', href: '#' },
      { label: 'API Documentation', href: '#' },
    ],
  },
  {
    heading: 'Solutions',
    links: [
      { label: 'For Sales Teams', href: '#' },
      { label: 'For Retail Businesses', href: '#' },
      { label: 'For Healthcare', href: '#' },
      { label: 'For Real Estate', href: '#' },
      { label: 'For Education', href: '#' },
      { label: 'For Agencies', href: '#' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About NNC Digital', href: '#' },
      { label: 'Our Team', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Press & Media', href: '#' },
      { label: 'Partner Program', href: '#' },
      { label: 'Contact Us', href: '#' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Blog & Articles', href: '#' },
      { label: 'Case Studies', href: '#testimonials' },
      { label: 'Video Tutorials', href: '#' },
      { label: 'Help Centre', href: '#' },
      { label: 'Live Webinars', href: '#' },
      { label: 'Community Forum', href: '#' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Cookie Policy', href: '#' },
      { label: 'Refund Policy', href: '#' },
      { label: 'Data Processing Agreement', href: '#' },
      { label: 'Security Overview', href: '#' },
    ],
  },
]

function smoothScroll(e, href) {
  if (!href.startsWith('#')) return
  e.preventDefault()
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function NNCFooter() {
  return (
    <footer style={{ background: '#020e1e', borderTop: '1px solid #0a2040' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">

        {/* Top: Brand + columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 mb-14">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <a
              href="#hero"
              onClick={(e) => smoothScroll(e, "#hero")}
              className="flex items-center shrink-0 mb-6"
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
            <p className="text-xs text-gray-500 leading-relaxed max-w-[200px] mb-5">
              India's most loved CRM for small and growing businesses. Built to help you capture, organise, automate, and close.
            </p>
            <div className="flex gap-3">
              {['𝕏', 'in', 'f', 'yt'].map(s => (
                <a key={s} href="#" className="w-8 h-8 rounded-full flex items-center justify-center text-xs text-gray-500 border border-gray-800 hover:border-teal-500/40 hover:text-teal-400 transition-colors duration-200">
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {COLUMNS.map(col => (
            <div key={col.heading}>
              <p className="text-xs font-black uppercase tracking-widest text-gray-500 mb-4">{col.heading}</p>
              <ul className="space-y-2.5">
                {col.links.map(l => (
                  <li key={l.label}>
                    <a href={l.href} onClick={e => smoothScroll(e, l.href)}
                      className="text-xs text-gray-500 hover:text-teal-400 transition-colors duration-200">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="bg-[var(--primary)]/30" style={{ height: '1px', marginBottom: '1.5rem' }} />

        {/* Bottom bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 text-center lg:text-left">
          <p className="text-xs text-gray-500">
            © 2024 NNC Digital. All Rights Reserved.
          </p>

          <p className="text-xs text-gray-500">
            NNC Digital CRM, Smart CRM for Growing Businesses
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-gray-500">
            <a
              href="https://www.nncdigital.com/crm"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-500 transition-colors duration-200"
            >
              www.nncdigital.com/crm
            </a>

            <span>•</span>

            <a
              href="mailto:crm@nncdigital.com"
              className="hover:text-gray-500 transition-colors duration-200"
            >
              crm@nncdigital.com
            </a>

            <span>•</span>

            <a
              href="tel:+919876543210"
              className="hover:text-gray-500 transition-colors duration-200"
            >
              +91 98765 43210
            </a>

            <span>•</span>

            <span>Bengaluru, India</span>
          </div>

          <p className="text-xs text-gray-500">
            Made with ♥ in India
          </p>
        </div>
      </div>
    </footer>
  )
}
