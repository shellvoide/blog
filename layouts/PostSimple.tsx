import { ReactNode } from 'react'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'

interface LayoutProps {
  content: CoreContent<Blog>
  children: ReactNode
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
}

export default function PostLayout({ content, next, prev, children }: LayoutProps) {
  const { slug, date, title, tags } = content

  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <article className="relative pt-6 pb-10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[24rem]"
          style={{
            backgroundImage:
              'radial-gradient(var(--color-primary-200) 1px, transparent 1px), radial-gradient(var(--color-gray-200) 1px, transparent 1px)',
            backgroundSize: '26px 26px, 26px 26px',
            backgroundPosition: '0 0, 13px 13px',
            WebkitMaskImage: 'radial-gradient(ellipse 78% 72% at 50% 0%, black, transparent 72%)',
            maskImage: 'radial-gradient(ellipse 78% 72% at 50% 0%, black, transparent 72%)',
          }}
        />
        <header className="mx-auto max-w-3xl pt-4 pb-8 text-center sm:pt-8 sm:pb-10">
          <div className="flex items-center justify-center gap-3 text-sm text-gray-500">
            <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
            {tags && tags.length > 0 && (
              <>
                <span className="text-gray-300">·</span>
                <span className="text-primary-600 text-xs font-semibold tracking-wide uppercase">
                  {tags[0].split(' ').join('-')}
                </span>
              </>
            )}
          </div>
          <div className="mt-4">
            <PageTitle>{title}</PageTitle>
          </div>
        </header>

        <div className="prose mx-auto max-w-3xl pb-8">{children}</div>

        {tags && tags.length > 0 && (
          <div className="mx-auto max-w-3xl pt-2">
            <div className="flex flex-wrap items-center gap-y-2">
              {tags.map((tag) => (
                <Tag key={tag} text={tag} />
              ))}
            </div>
          </div>
        )}

        {(prev?.path || next?.path) && (
          <nav className="mx-auto mt-10 flex max-w-3xl flex-col gap-4 text-sm font-medium sm:flex-row sm:justify-between sm:text-base">
            <div>
              {prev?.path && (
                <Link
                  href={`/${prev.path}`}
                  className="text-primary-600 hover:text-primary-700 transition-colors"
                  aria-label={`Previous post: ${prev.title}`}
                >
                  &larr; {prev.title}
                </Link>
              )}
            </div>
            <div className="sm:text-right">
              {next?.path && (
                <Link
                  href={`/${next.path}`}
                  className="text-primary-600 hover:text-primary-700 transition-colors"
                  aria-label={`Next post: ${next.title}`}
                >
                  {next.title} &rarr;
                </Link>
              )}
            </div>
          </nav>
        )}

        <div className="mx-auto mt-12 max-w-3xl">
          <Link
            href="/"
            className="hover:text-primary-600 text-sm font-medium text-gray-500 transition-colors"
            aria-label="Back to all posts"
          >
            &larr; Back to all posts
          </Link>
        </div>

        {siteMetadata.comments && (
          <div className="mx-auto mt-10 max-w-3xl text-gray-700" id="comment">
            <Comments slug={slug} />
          </div>
        )}
      </article>
    </SectionContainer>
  )
}
