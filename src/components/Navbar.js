'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

// ─── Icons ───────────────────────────────────────────────────────
const ChevronDown = ({ open }) => (
  <svg
    width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"
    className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
)

const HamburgerIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
    <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
  </svg>
)

const CloseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

// ─── Data ─────────────────────────────────────────────────────────
const APP_CATEGORIES = [
  {
    id: 'sales', label: 'Sales',
    products: [
      { name: 'CRM', fullName: 'Nexus CRM', desc: 'Close more deals with a smart, unified CRM platform.', bg: '#EEF2FF', ic: '#4F46E5' },
      { name: 'SalesIQ', fullName: 'Nexus SalesIQ', desc: 'Live chat and visitor tracking for your sales team.', bg: '#E0F2FE', ic: '#0284C7' },
      { name: 'Bigin', fullName: 'Nexus Bigin', desc: 'Pipeline-centric CRM built for small businesses.', bg: '#ECFDF5', ic: '#059669' },
      { name: 'Sign', fullName: 'Nexus Sign', desc: 'eSignature solution for legally binding documents.', bg: '#FFF7ED', ic: '#EA580C' },
      { name: 'Forms', fullName: 'Nexus Forms', desc: 'Build powerful online forms and automate workflows.', bg: '#FDF4FF', ic: '#9333EA' },
      { name: 'Contracts', fullName: 'Nexus Contracts', desc: 'End-to-end contract lifecycle management.', bg: '#FFF1F2', ic: '#E11D48' },
    ]
  },
  {
    id: 'marketing', label: 'Marketing',
    products: [
      { name: 'Campaigns', fullName: 'Nexus Campaigns', desc: 'Targeted email marketing that drives conversions.', bg: '#FFF7ED', ic: '#EA580C' },
      { name: 'Social', fullName: 'Nexus Social', desc: 'Manage your social media presence effortlessly.', bg: '#EEF2FF', ic: '#4F46E5' },
      { name: 'Survey', fullName: 'Nexus Survey', desc: 'Create engaging surveys and analyze responses.', bg: '#ECFDF5', ic: '#059669' },
      { name: 'Automation', fullName: 'Nexus Marketing Hub', desc: 'Unified automation platform for modern marketers.', bg: '#E0F2FE', ic: '#0284C7' },
      { name: 'PageSense', fullName: 'Nexus PageSense', desc: 'Conversion rate optimization and A/B testing.', bg: '#FDF4FF', ic: '#9333EA' },
    ]
  },
  {
    id: 'commerce', label: 'Commerce and POS',
    products: [
      { name: 'Commerce', fullName: 'Nexus Commerce', desc: 'Build and manage your online store with ease.', bg: '#FFF1F2', ic: '#E11D48' },
      { name: 'Inventory', fullName: 'Nexus Inventory', desc: 'Multi-channel inventory management made simple.', bg: '#ECFDF5', ic: '#059669' },
      { name: 'Checkout', fullName: 'Nexus Checkout', desc: 'Create payment pages without writing any code.', bg: '#FFF7ED', ic: '#EA580C' },
      { name: 'Subscriptions', fullName: 'Nexus Subscriptions', desc: 'Automate recurring billing and subscription plans.', bg: '#EEF2FF', ic: '#4F46E5' },
    ]
  },
  {
    id: 'service', label: 'Service',
    products: [
      { name: 'Desk', fullName: 'Nexus Desk', desc: 'Context-aware help desk software for support teams.', bg: '#E0F2FE', ic: '#0284C7' },
      { name: 'Assist', fullName: 'Nexus Assist', desc: 'Remote support and unattended device access.', bg: '#EEF2FF', ic: '#4F46E5' },
      { name: 'Lens', fullName: 'Nexus Lens', desc: 'AR-powered remote assistance for field teams.', bg: '#FDF4FF', ic: '#9333EA' },
      { name: 'FSM', fullName: 'Nexus FSM', desc: 'Field service management from request to resolution.', bg: '#ECFDF5', ic: '#059669' },
    ]
  },
  {
    id: 'finance', label: 'Finance',
    products: [
      { name: 'Books', fullName: 'Nexus Books', desc: 'Smart accounting software for growing businesses.', bg: '#ECFDF5', ic: '#059669' },
      { name: 'Invoice', fullName: 'Nexus Invoice', desc: 'Professional invoicing for freelancers and SMBs.', bg: '#FFF7ED', ic: '#EA580C' },
      { name: 'Expense', fullName: 'Nexus Expense', desc: 'Automated expense reporting and approval flows.', bg: '#EEF2FF', ic: '#4F46E5' },
      { name: 'Payroll', fullName: 'Nexus Payroll', desc: 'Simplified payroll processing and compliance.', bg: '#E0F2FE', ic: '#0284C7' },
    ]
  },
  {
    id: 'erp', label: 'ERP',
    products: [
      { name: 'ERP', fullName: 'Nexus ERP', desc: 'ERP software for faster, smarter business operations.', bg: '#FFF1F2', ic: '#E11D48' },
      { name: 'Creator', fullName: 'Nexus Creator', desc: 'Low-code platform to build custom business apps.', bg: '#EEF2FF', ic: '#4F46E5' },
      { name: 'Flow', fullName: 'Nexus Flow', desc: 'Integrate and automate your business workflows.', bg: '#ECFDF5', ic: '#059669' },
    ]
  },
  {
    id: 'email', label: 'Email, Storage, and Collaboration',
    products: [
      { name: 'Mail', fullName: 'Nexus Mail', desc: 'Ad-free business email hosting for your domain.', bg: '#E0F2FE', ic: '#0284C7' },
      { name: 'WorkDrive', fullName: 'Nexus WorkDrive', desc: 'Secure file management and collaboration for teams.', bg: '#FDF4FF', ic: '#9333EA' },
      { name: 'Meeting', fullName: 'Nexus Meeting', desc: 'Video conferencing and webinar platform.', bg: '#FFF7ED', ic: '#EA580C' },
      { name: 'Cliq', fullName: 'Nexus Cliq', desc: 'Team messaging with channels, calls, and bots.', bg: '#EEF2FF', ic: '#4F46E5' },
      { name: 'Notebook', fullName: 'Nexus Notebook', desc: 'Beautiful note-taking app for every device.', bg: '#ECFDF5', ic: '#059669' },
    ]
  },
  {
    id: 'hr', label: 'Human Resources',
    products: [
      { name: 'People', fullName: 'Nexus People', desc: 'Comprehensive HR management for modern teams.', bg: '#FFF1F2', ic: '#E11D48' },
      { name: 'Recruit', fullName: 'Nexus Recruit', desc: 'End-to-end recruitment and applicant tracking.', bg: '#EEF2FF', ic: '#4F46E5' },
      { name: 'Shifts', fullName: 'Nexus Shifts', desc: 'Schedule and manage employee shifts effortlessly.', bg: '#ECFDF5', ic: '#059669' },
    ]
  },
  {
    id: 'legal', label: 'Legal',
    products: [
      { name: 'Contracts', fullName: 'Nexus Contracts', desc: 'Complete contract lifecycle management platform.', bg: '#FDF4FF', ic: '#9333EA' },
      { name: 'Sign', fullName: 'Nexus Sign', desc: 'Legally binding eSignatures for every workflow.', bg: '#FFF7ED', ic: '#EA580C' },
    ]
  },
  {
    id: 'security', label: 'Security and IT Management',
    products: [
      { name: 'Vault', fullName: 'Nexus Vault', desc: 'Password manager built for teams and enterprises.', bg: '#EEF2FF', ic: '#4F46E5' },
      { name: 'Directory', fullName: 'Nexus Directory', desc: 'Identity and access management for your org.', bg: '#E0F2FE', ic: '#0284C7' },
      { name: 'OneAuth', fullName: 'Nexus OneAuth', desc: 'Multi-factor authentication for all your accounts.', bg: '#ECFDF5', ic: '#059669' },
      { name: 'MDM', fullName: 'Nexus MDM', desc: 'Enterprise mobile device management platform.', bg: '#FFF1F2', ic: '#E11D48' },
    ]
  },
  {
    id: 'analytics', label: 'BI and Analytics',
    products: [
      { name: 'Analytics', fullName: 'Nexus Analytics', desc: 'Self-service BI and data analytics platform.', bg: '#FDF4FF', ic: '#9333EA' },
      { name: 'DataPrep', fullName: 'Nexus DataPrep', desc: 'Intelligent data preparation and cataloging tool.', bg: '#EEF2FF', ic: '#4F46E5' },
    ]
  },
  {
    id: 'projects', label: 'Project Management',
    products: [
      { name: 'Projects', fullName: 'Nexus Projects', desc: 'Full-featured project management for every team.', bg: '#E0F2FE', ic: '#0284C7' },
      { name: 'Sprints', fullName: 'Nexus Sprints', desc: 'Agile project management for scrum teams.', bg: '#ECFDF5', ic: '#059669' },
      { name: 'BugTracker', fullName: 'Nexus BugTracker', desc: 'Issue tracking and bug management made easy.', bg: '#FFF7ED', ic: '#EA580C' },
      { name: 'Connect', fullName: 'Nexus Connect', desc: 'Enterprise social network for your company.', bg: '#FDF4FF', ic: '#9333EA' },
    ]
  },
  {
    id: 'developer', label: 'Developer Platforms',
    products: [
      { name: 'Creator', fullName: 'Nexus Creator', desc: 'Low-code platform to build and deploy custom apps.', bg: '#EEF2FF', ic: '#4F46E5' },
      { name: 'Flow', fullName: 'Nexus Flow', desc: 'Automate and integrate apps without writing code.', bg: '#ECFDF5', ic: '#059669' },
      { name: 'Catalyst', fullName: 'Nexus Catalyst', desc: 'Serverless cloud platform for building scalable apps.', bg: '#FFF1F2', ic: '#E11D48' },
      { name: 'Apptics', fullName: 'Nexus Apptics', desc: 'App analytics and mobile usage intelligence.', bg: '#E0F2FE', ic: '#0284C7' },
    ]
  },
]

const SUITES = [
  { name: 'CRM Plus', desc: 'Unified platform to deliver top-notch customer experience.', bg: '#EEF2FF', ic: '#4F46E5' },
  { name: 'Service Plus', desc: 'Unified platform for customer service and support teams.', bg: '#ECFDF5', ic: '#059669' },
  { name: 'Finance Plus', desc: 'All-in-one suite to manage your operations and finances.', bg: '#E0F2FE', ic: '#0284C7' },
  { name: 'People Plus', desc: 'Comprehensive HR platform for seamless employee experiences.', bg: '#FFF1F2', ic: '#E11D48' },
  { name: 'Workplace', desc: 'Application suite to improve team productivity and collaboration.', bg: '#FDF4FF', ic: '#9333EA' },
  { name: 'Marketing Plus', desc: 'Unified marketing platform for modern marketing teams.', bg: '#FFF7ED', ic: '#EA580C' },
  { name: 'IT Management Plus', desc: 'Comprehensive IT management and security for enterprises.', bg: '#F0FDF4', ic: '#16A34A' },
  { name: 'Analytics Plus', desc: 'Business intelligence and advanced data analytics suite.', bg: '#FAF5FF', ic: '#7C3AED' },
  { name: 'Commerce Plus', desc: 'End-to-end commerce platform from storefront to fulfilment.', bg: '#FEF9C3', ic: '#CA8A04' },
]

const CUSTOMERS_LINKS = [
  { label: 'Customer Stories', desc: 'See how businesses scale with our platform' },
  { label: 'User Community', desc: 'Connect with thousands of users worldwide' },
  { label: 'Training & Certification', desc: 'Master our tools with expert-led courses' },
  { label: 'Affiliate Program', desc: 'Earn by referring customers to our platform' },
]

const PARTNERS_LINKS = [
  { label: 'Partner Program', desc: 'Join our global partner ecosystem' },
  { label: 'Find a Partner', desc: 'Get help from certified implementation experts' },
  { label: 'Become a Reseller', desc: 'Grow your business by reselling our products' },
  { label: 'Partner Portal', desc: 'Access resources, deals, and training materials' },
]

const RESOURCES_LINKS = [
  { label: 'Documentation', desc: 'Detailed guides, how-tos, and API references' },
  { label: 'Blog & Updates', desc: 'Latest news, tips, and product updates' },
  { label: 'Webinars', desc: 'Live and on-demand sessions from our experts' },
  { label: 'Developer Hub', desc: 'SDKs, APIs, and tools for building on our platform' },
  { label: 'Nexus Academy', desc: 'Free learning resources for users at every level' },
]

// ─── Sub-components ───────────────────────────────────────────────
function ProductCard({ product }) {
  return (
    <a
      href="#"
      className="flex items-start gap-3 p-3.5 rounded-xl hover:bg-gray-50 transition-colors group"
    >
      <div
        style={{ background: product.bg }}
        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
      >
        <span style={{ color: product.ic }} className="text-sm font-bold leading-none">
          {product.name[0]}
        </span>
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">
          {product.fullName}
        </p>
        <p className="text-xs text-gray-500 mt-0.5 leading-snug line-clamp-2">
          {product.desc}
        </p>
      </div>
    </a>
  )
}

function SuiteCard({ suite }) {
  return (
    <a
      href="#"
      style={{ background: suite.bg }}
      className="flex items-start gap-3 p-4 rounded-xl hover:shadow-md transition-all group"
    >
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
        style={{ background: 'rgba(255,255,255,0.65)' }}
      >
        <span style={{ color: suite.ic }} className="text-base font-black leading-none">
          {suite.name[0]}
        </span>
      </div>
      <div>
        <p className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">
          {suite.name}
        </p>
        <p className="text-xs text-gray-600 mt-1 leading-snug">{suite.desc}</p>
        <span
          className="inline-block mt-2 text-xs font-bold tracking-wide"
          style={{ color: suite.ic }}
        >
          TRY NOW →
        </span>
      </div>
    </a>
  )
}

function SimpleDropdown({ links }) {
  return (
    <div className="absolute top-full left-0 mt-1 w-72 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
      {links.map((link) => (
        <a
          key={link.label}
          href="#"
          className="flex flex-col px-4 py-3 hover:bg-gray-50 transition-colors"
        >
          <span className="text-sm font-semibold text-gray-900">{link.label}</span>
          <span className="text-xs text-gray-500 mt-0.5">{link.desc}</span>
        </a>
      ))}
    </div>
  )
}

// ─── Main Navbar ──────────────────────────────────────────────────
export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(null)
  const [activeTab, setActiveTab] = useState('apps')
  const [activeCategory, setActiveCategory] = useState('sales')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileAccordion, setMobileAccordion] = useState(null)

  const navRef = useRef(null)

  useEffect(() => {
    const handler = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenMenu(null)
        setMobileOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const toggleMenu = (menu) => {
    setOpenMenu((prev) => (prev === menu ? null : menu))
    if (menu === 'products') {
      setActiveTab('apps')
      setActiveCategory('sales')
    }
  }

  const navBtnClass = (menu) =>
    `flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150 ${
      openMenu === menu ? 'text-blue-600' : 'text-gray-800 hover:text-blue-600'
    }`

  const currentProducts =
    APP_CATEGORIES.find((c) => c.id === activeCategory)?.products || []

  return (
    <nav
      ref={navRef}
      className="bg-white border-b border-gray-100 sticky top-0 z-50 relative"
    >
      {/* ── Main row ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[68px]">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-sm">N</span>
            </div>
            <span className="text-xl font-extrabold text-gray-900 tracking-tight">
              Nexus
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center">

            {/* Products */}
            <button
              onClick={() => toggleMenu('products')}
              className={navBtnClass('products')}
            >
              Products <ChevronDown open={openMenu === 'products'} />
            </button>

            {/* Enterprise – no dropdown */}
            <a
              href="#"
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-800 hover:text-blue-600 rounded-md transition-colors duration-150"
            >
              Enterprise
            </a>

            {/* Customers */}
            <div className="relative">
              <button
                onClick={() => toggleMenu('customers')}
                className={navBtnClass('customers')}
              >
                Customers <ChevronDown open={openMenu === 'customers'} />
              </button>
              {openMenu === 'customers' && (
                <SimpleDropdown links={CUSTOMERS_LINKS} />
              )}
            </div>

            {/* Partners */}
            <div className="relative">
              <button
                onClick={() => toggleMenu('partners')}
                className={navBtnClass('partners')}
              >
                Partners <ChevronDown open={openMenu === 'partners'} />
              </button>
              {openMenu === 'partners' && (
                <SimpleDropdown links={PARTNERS_LINKS} />
              )}
            </div>

            {/* Resources */}
            <div className="relative">
              <button
                onClick={() => toggleMenu('resources')}
                className={navBtnClass('resources')}
              >
                Resources <ChevronDown open={openMenu === 'resources'} />
              </button>
              {openMenu === 'resources' && (
                <SimpleDropdown links={RESOURCES_LINKS} />
              )}
            </div>
          </div>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="hidden lg:inline-flex items-center bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors duration-150"
            >
              Get Started
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <CloseIcon /> : <HamburgerIcon />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Products mega dropdown ── */}
      {openMenu === 'products' && (
        <div className="absolute left-0 right-0 top-full bg-white border-t border-gray-100 shadow-2xl z-40">

          {/* Tab bar */}
          <div className="border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-6 flex">
              {['apps', 'suites'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 text-sm font-semibold capitalize border-b-2 transition-colors ${
                    activeTab === tab
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {tab === 'apps' ? 'Apps' : 'Suites'}
                </button>
              ))}
            </div>
          </div>

          {/* Apps: two-column layout */}
          {activeTab === 'apps' && (
            <div className="max-w-7xl mx-auto flex" style={{ maxHeight: '520px' }}>
              {/* Left: category list */}
              <div
                className="w-56 shrink-0 border-r border-gray-100 overflow-y-auto py-3"
              >
                {APP_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onMouseEnter={() => setActiveCategory(cat.id)}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`w-full text-left px-5 py-2.5 text-sm transition-colors ${
                      activeCategory === cat.id
                        ? 'text-blue-600 bg-blue-50 font-semibold border-r-2 border-blue-600'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Right: product cards grid */}
              <div className="flex-1 p-5 overflow-y-auto">
                <div className="grid grid-cols-3 gap-2">
                  {currentProducts.map((p) => (
                    <ProductCard key={p.fullName} product={p} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Suites: single-layout grid */}
          {activeTab === 'suites' && (
            <div className="max-w-7xl mx-auto p-6">
              <div className="grid grid-cols-3 gap-4">
                {SUITES.map((s) => (
                  <SuiteCard key={s.name} suite={s} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Mobile menu ── */}
      {mobileOpen && (
        <div
          className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-xl z-40 overflow-y-auto"
          style={{ maxHeight: 'calc(100vh - 68px)' }}
        >
          <div className="py-2">

            {/* Products accordion */}
            <MobileAccordion
              label="Products"
              open={mobileAccordion === 'products'}
              onToggle={() =>
                setMobileAccordion((p) => (p === 'products' ? null : 'products'))
              }
            >
              <div className="px-4 pt-1 pb-3">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider px-2 mb-2">
                  Apps
                </p>
                {APP_CATEGORIES.map((cat) => (
                  <a
                    key={cat.id}
                    href="#"
                    className="block px-2 py-2 text-sm text-gray-700 hover:text-blue-600 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {cat.label}
                  </a>
                ))}
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider px-2 mb-2 mt-3">
                  Suites
                </p>
                {SUITES.map((s) => (
                  <a
                    key={s.name}
                    href="#"
                    className="block px-2 py-2 text-sm text-gray-700 hover:text-blue-600 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {s.name}
                  </a>
                ))}
              </div>
            </MobileAccordion>

            {/* Enterprise */}
            <a
              href="#"
              className="block px-5 py-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 hover:text-blue-600 transition-colors"
            >
              Enterprise
            </a>

            {/* Customers accordion */}
            <MobileAccordion
              label="Customers"
              open={mobileAccordion === 'customers'}
              onToggle={() =>
                setMobileAccordion((p) => (p === 'customers' ? null : 'customers'))
              }
            >
              <div className="px-4 pt-1 pb-3">
                {CUSTOMERS_LINKS.map((l) => (
                  <a
                    key={l.label}
                    href="#"
                    className="block px-2 py-2 text-sm text-gray-700 hover:text-blue-600 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </MobileAccordion>

            {/* Partners accordion */}
            <MobileAccordion
              label="Partners"
              open={mobileAccordion === 'partners'}
              onToggle={() =>
                setMobileAccordion((p) => (p === 'partners' ? null : 'partners'))
              }
            >
              <div className="px-4 pt-1 pb-3">
                {PARTNERS_LINKS.map((l) => (
                  <a
                    key={l.label}
                    href="#"
                    className="block px-2 py-2 text-sm text-gray-700 hover:text-blue-600 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </MobileAccordion>

            {/* Resources accordion */}
            <MobileAccordion
              label="Resources"
              open={mobileAccordion === 'resources'}
              onToggle={() =>
                setMobileAccordion((p) => (p === 'resources' ? null : 'resources'))
              }
            >
              <div className="px-4 pt-1 pb-3">
                {RESOURCES_LINKS.map((l) => (
                  <a
                    key={l.label}
                    href="#"
                    className="block px-2 py-2 text-sm text-gray-700 hover:text-blue-600 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </MobileAccordion>

            {/* CTA */}
            <div className="px-5 pt-3 pb-5">
              <a
                href="#"
                className="block w-full text-center bg-blue-600 text-white text-sm font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

function MobileAccordion({ label, open, onToggle, children }) {
  return (
    <div className="border-b border-gray-50 last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
      >
        {label}
        <ChevronDown open={open} />
      </button>
      {open && children}
    </div>
  )
}
