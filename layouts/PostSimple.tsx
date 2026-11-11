import { ReactNode } from 'react'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import AdvisoryTable, { type Advisory } from '@/components/AdvisoryTable'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import PostProgress from '@/components/PostProgress'

interface LayoutProps {
  content: CoreContent<Blog>
  children: ReactNode
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
}

function PostNavCard({
  post,
  direction,
}: {
  post: { path: string; title: string }
  direction: 'prev' | 'next'
}) {
  const isNext = direction === 'next'
  return (
    <Link
      href={`/${post.path}`}
      aria-label={`${isNext ? 'Next' : 'Previous'} post: ${post.title}`}
      className={`group hover:border-primary-300 dark:hover:border-primary-700 flex flex-col gap-1.5 rounded-2xl border border-gray-200 px-5 py-4 transition-colors dark:border-gray-800 ${
        isNext ? 'sm:items-end sm:text-right' : ''
      }`}
    >
      <span className="text-xs font-medium tracking-wide text-gray-500 dark:text-gray-400">
        {isNext ? 'Next →' : '← Previous'}
      </span>
      <span className="group-hover:text-primary-700 dark:group-hover:text-primary-400 line-clamp-2 text-sm font-semibold text-gray-900 transition-colors dark:text-gray-100">
        {post.title}
      </span>
    </Link>
  )
}

export default function PostLayout({ content, next, prev, children }: LayoutProps) {
  const { slug, date, title, tags, category, readingTime, system } = content
  const advisories = (content.advisories as Advisory[] | undefined) ?? []
  const isAdvisory = category === 'research-advisories'
  const back = isAdvisory
    ? { href: '/research-advisories', label: 'Back to Advisories' }
    : { href: '/', label: 'Back to all posts' }
  const kicker = isAdvisory ? 'Security Advisory' : tags?.[0]?.split(' ').join('-')
  const readTime = (readingTime as { text?: string } | undefined)?.text
  const toc = (content.toc as { value: string; url: string; depth: number }[] | undefined) ?? []

  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <article
        className={`relative pt-6 pb-10 ${advisories.length > 0 ? 'has-advisory-table' : ''}`}
      >
        <div
          aria-hidden
          className="post-hero-dots pointer-events-none absolute inset-x-0 top-0 -z-10 h-[26rem]"
        />

        {/* the tracker spans the whole post, from the back link to the last card */}
        <div className="relative mx-auto max-w-3xl">
          {toc.length > 0 && (
            <aside className="absolute top-0 right-full mr-10 h-full w-44 pt-2 sm:pt-4 2xl:mr-24 2xl:w-56">
              <PostProgress toc={toc} />
            </aside>
          )}

          <header className="mx-auto max-w-3xl pt-2 pb-10 sm:pt-4">
            <Link
              href={back.href}
              className="hover:border-primary-300 hover:text-primary-700 dark:hover:border-primary-700 dark:hover:text-primary-400 inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white/70 px-3 py-1.5 text-sm font-medium text-gray-600 backdrop-blur transition-colors dark:border-gray-800 dark:bg-gray-950/60 dark:text-gray-400"
            >
              <span aria-hidden>&larr;</span>
              {back.label}
            </Link>

            <div className="mt-8 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm text-gray-500 dark:text-gray-400">
              {kicker && (
                <span className="text-primary-600 dark:text-primary-400 text-xs font-semibold tracking-wider uppercase">
                  {kicker}
                </span>
              )}
              {kicker && <span className="text-gray-300 dark:text-gray-600">&middot;</span>}
              <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
              {readTime && (
                <>
                  <span className="text-gray-300 dark:text-gray-600">&middot;</span>
                  <span>{readTime}</span>
                </>
              )}
            </div>

            <div className="mt-4">
              <PageTitle>{title}</PageTitle>
            </div>

            {advisories.length > 0 && (
              <AdvisoryTable advisories={advisories} date={date} system={system} />
            )}
          </header>

          <div id="post-body" className="prose dark:prose-invert mx-auto max-w-3xl pb-4">
            {children}
          </div>

          <footer className="mx-auto mt-12 max-w-3xl space-y-8 border-t border-gray-200 pt-8 dark:border-gray-800">
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap items-baseline gap-x-1 gap-y-2">
                <span className="mr-3 text-xs font-medium tracking-wide text-gray-500 dark:text-gray-400">
                  Tagged
                </span>
                {tags.map((tag) => (
                  <Tag key={tag} text={tag} />
                ))}
              </div>
            )}

            {(prev?.path || next?.path) && (
              <nav className="grid gap-3 sm:grid-cols-2">
                <div>{prev?.path && <PostNavCard post={prev} direction="prev" />}</div>
                <div>{next?.path && <PostNavCard post={next} direction="next" />}</div>
              </nav>
            )}
          </footer>

          {siteMetadata.comments && (
            <div className="mx-auto mt-10 max-w-3xl text-gray-700 dark:text-gray-300" id="comment">
              <Comments slug={slug} />
            </div>
          )}
        </div>
      </article>
    </SectionContainer>
  )
}
