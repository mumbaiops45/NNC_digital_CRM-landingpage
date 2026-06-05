'use client'
import { useState } from 'react'

export default function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false)
  if (dismissed) return null
  return (
    <div
      className="relative flex items-center justify-center px-4 py-2.5 text-sm font-medium text-white"
      style={{ background: '#042C53' }}
    >
      <span className="mr-2 w-2 h-2 rounded-full bg-teal-400 animate-pulse inline-block shrink-0" />
      <span className="text-gray-300">Limited Time:</span>
      <span className="mx-1 text-white font-semibold">Get 3 Months Free on any Annual Plan — Offer Ends Soon.</span>
      <a href="#pricing" className="ml-1 underline font-bold" style={{ color: '#0dccad' }}>
        Claim Now →
      </a>
      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss"
        className="absolute right-4 text-gray-400 hover:text-white transition-colors text-lg leading-none"
      >
        ×
      </button>
    </div>
  )
}
