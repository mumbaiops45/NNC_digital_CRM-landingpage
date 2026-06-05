'use client'
import Image from "next/image"
const COLUMNS = [
  {
    heading: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Integrations', href: '#integrations' },
      { label: 'How It Works', href: '#how-it-works' },
      { label: 'Mobile App', href: '#features' },
      { label: 'API & Developers', href: '#' },
      { label: "What's New", href: '#' },
    ],
  },
  {
    heading: 'Solutions',
    links: [
      { label: 'Retail', href: '#' },
      { label: 'Real Estate', href: '#' },
      { label: 'Healthcare & Clinics', href: '#' },
      { label: 'Education & Coaching', href: '#' },
      { label: 'Financial Services', href: '#' },
      { label: 'Hospitality', href: '#' },
      { label: 'Manufacturing', href: '#' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About NNC Digital', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Case Studies', href: '#testimonials' },
      { label: 'Careers', href: '#' },
      { label: 'Partners', href: '#' },
      { label: 'Press', href: '#' },
      { label: 'Contact Us', href: '#' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Help Centre', href: '#' },
      { label: 'Video Tutorials', href: '#' },
      { label: 'Webinars', href: '#' },
      { label: 'CRM Glossary', href: '#' },
      { label: 'ROI Calculator', href: '#' },
      { label: 'Free CRM Guide', href: '#' },
      { label: 'Community Forum', href: '#' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Cookie Policy', href: '#' },
      { label: 'GDPR Compliance', href: '#' },
      { label: 'Data Processing Agreement', href: '#' },
      { label: 'Security', href: '#' },
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
            <p className="text-xs text-gray-600 leading-relaxed max-w-[200px] mb-5">
              India's most loved CRM for small and growing businesses. Built to help you capture, organise, automate, and close.
            </p>
            <div className="flex gap-3">
              {['𝕏', 'in', 'f', 'yt'].map(s => (
                <a key={s} href="#" className="w-8 h-8 rounded-full flex items-center justify-center text-xs text-gray-600 border border-gray-800 hover:border-teal-500/40 hover:text-teal-400 transition-colors duration-200">
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
                       className="text-xs text-gray-600 hover:text-teal-400 transition-colors duration-200">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: '#0a2040', marginBottom: '1.5rem' }}/>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-700 text-center sm:text-left">
            © 2024 NNC Digital Pvt. Ltd. All rights reserved. Made with ❤️ in India.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            {['Privacy', 'Terms', 'Cookies', 'Security'].map(l => (
              <a key={l} href="#" className="text-xs text-gray-700 hover:text-gray-500 transition-colors duration-200">{l}</a>
            ))}
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-700">
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: '#0dccad' }}/>
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  )
}
