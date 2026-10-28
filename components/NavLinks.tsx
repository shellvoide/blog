'use client'

import { usePathname } from 'next/navigation'
import Link from './Link'
import headerNavLinks from '@/data/headerNavLinks'

const NavLinks = () => {
  const pathname = usePathname()
  return (
    <nav className="hidden items-center gap-6 sm:flex">
      {headerNavLinks.map((link) => {
        const external = link.href.startsWith('http')
        const active = !external && (pathname === link.href || pathname.startsWith(`${link.href}/`))
        return (
          <Link
            key={link.title}
            href={link.href}
            target={external ? undefined : '_self'}
            className={`inline-flex items-center gap-1 text-sm font-medium whitespace-nowrap transition-colors ${
              active ? 'text-primary-700' : 'hover:text-primary-600 text-gray-600'
            }`}
          >
            {link.title}
            {external && (
              <svg
                aria-hidden
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3 w-3"
              >
                <path d="M3 9 9 3M4.5 3H9v4.5" />
              </svg>
            )}
          </Link>
        )
      })}
    </nav>
  )
}

export default NavLinks
