'use client'

import { useEffect, useState, type MouseEvent } from 'react'

interface Heading {
  value: string
  url: string
  depth: number
}

// Where a heading counts as "reached": just under the sticky site header
const ACTIVE_OFFSET = 140

export default function PostProgress({ toc }: { toc: Heading[] }) {
  const headings = toc.filter((h) => h.depth >= 2 && h.depth <= 3)
  const [active, setActive] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const body = document.getElementById('post-body')
      if (body) {
        const rect = body.getBoundingClientRect()
        const span = rect.height - window.innerHeight
        const p = span > 0 ? -rect.top / span : rect.top < 0 ? 1 : 0
        setProgress(Math.min(1, Math.max(0, p)))
      }
      let current: string | null = null
      for (const h of headings) {
        const el = document.getElementById(h.url.slice(1))
        if (el && el.getBoundingClientRect().top <= ACTIVE_OFFSET) current = h.url
      }
      setActive(current)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
    // headings come from build-time front matter and do not change on the page
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const jump = (e: MouseEvent<HTMLAnchorElement>, url: string) => {
    const el = document.getElementById(url.slice(1))
    if (!el) return
    e.preventDefault()
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    history.replaceState(null, '', url)
    setActive(url)
  }

  if (headings.length === 0) return null
  const activeIndex = headings.findIndex((h) => h.url === active)
  const percent = Math.round(progress * 100)

  return (
    <>
      {/* phones and tablets: a thin bar along the top edge */}
      <div
        aria-hidden
        className="bg-primary-500 fixed inset-x-0 top-0 z-[70] h-0.5 origin-left xl:hidden"
        style={{ transform: `scaleX(${progress})` }}
      />

      {/* desktop: section list beside the article */}
      <nav aria-label="Article sections" className="sticky top-28 hidden xl:block">
        <div className="mb-3 flex items-baseline justify-between text-xs font-medium text-gray-500 dark:text-gray-400">
          <span>On this page</span>
          <span className="font-mono tabular-nums">{percent}%</span>
        </div>
        <div className="relative">
          <div
            aria-hidden
            className="absolute inset-y-0 left-0 w-px bg-gray-200 dark:bg-gray-800"
          />
          <div
            aria-hidden
            className="bg-primary-500 absolute inset-y-0 left-0 w-px origin-top transition-transform duration-300 ease-out"
            style={{ transform: `scaleY(${progress})` }}
          />
          <ol className="no-scrollbar max-h-[calc(100vh-12rem)] space-y-0.5 overflow-y-auto">
            {headings.map((h, i) => {
              const isActive = i === activeIndex
              const isRead = activeIndex !== -1 && i < activeIndex
              return (
                <li key={h.url}>
                  <a
                    href={h.url}
                    onClick={(e) => jump(e, h.url)}
                    aria-current={isActive ? 'location' : undefined}
                    className={`relative block py-1 text-[0.8rem] leading-snug transition-colors duration-200 ${
                      h.depth === 3 ? 'pl-7' : 'pl-4'
                    } ${
                      isActive
                        ? 'text-primary-700 dark:text-primary-400 font-semibold'
                        : isRead
                          ? 'text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100'
                          : 'text-gray-500 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-200'
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`bg-primary-500 absolute top-1/2 -left-[2.5px] h-1.5 w-1.5 -translate-y-1/2 rounded-full transition-all duration-200 ${
                        isActive ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                      }`}
                    />
                    {h.value}
                  </a>
                </li>
              )
            })}
          </ol>
        </div>
      </nav>
    </>
  )
}
