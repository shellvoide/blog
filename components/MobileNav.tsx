'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Link from './Link'
import headerNavLinks from '@/data/headerNavLinks'

const MobileNav = () => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <button
        aria-label="Toggle Menu"
        onClick={() => setOpen(true)}
        className="hover:text-primary-500 text-gray-900 sm:hidden"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-8 w-8">
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open &&
        createPortal(
          <div className="fixed inset-0 z-60 sm:hidden">
          <button
            aria-label="Close Menu"
            onClick={() => setOpen(false)}
            className="absolute inset-0 h-full w-full cursor-default bg-black/25"
          />
          <nav className="absolute inset-y-0 right-0 flex w-full max-w-xs flex-col bg-white px-8 py-6 shadow-xl">
            <button
              aria-label="Close Menu"
              onClick={() => setOpen(false)}
              className="hover:text-primary-500 self-end text-gray-900"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-8 w-8">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <div className="mt-6 flex flex-col gap-1">
              {headerNavLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  target="_self"
                  onClick={() => setOpen(false)}
                  className="hover:text-primary-600 py-2 text-xl font-bold tracking-tight text-gray-900"
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </nav>
          </div>,
          document.body
        )}
    </>
  )
}

export default MobileNav
