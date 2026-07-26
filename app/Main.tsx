import Link from '@/components/Link'
import Image from 'next/image'
import LogoPng from '@/data/logo.png'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'

const MAX_POSTS = 9

function TagList({ tags = [], max = 3 }: { tags?: string[]; max?: number }) {
  if (!tags.length) return null
  return (
    <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs font-medium tracking-wide text-gray-400 uppercase">
      {tags.slice(0, max).map((tag) => (
        <span key={tag}>{tag.split(' ').join('-')}</span>
      ))}
    </div>
  )
}

export default function Home({ posts }) {
  const featured = posts[0]
  const rest = posts.slice(1, MAX_POSTS)

  return (
    <div className="pb-16">
      {/* Hero */}
      <section className="relative isolate">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[24rem]"
          style={{
            backgroundImage: 'radial-gradient(var(--color-gray-200) 1px, transparent 1px)',
            backgroundSize: '22px 22px',
            WebkitMaskImage: 'linear-gradient(to bottom, black, transparent 75%)',
            maskImage: 'linear-gradient(to bottom, black, transparent 75%)',
          }}
        />

        <div className="pt-8 pb-10 sm:pt-10 sm:pb-14">
          <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl md:leading-[1.05]">
            Offensive security, <span className="text-primary-600">shown in full.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            {siteMetadata.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            {featured && (
              <Link
                href={`/${featured.slug}`}
                className="bg-primary-600 hover:bg-primary-700 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-colors"
              >
                Read the latest writeup
                <span aria-hidden>→</span>
              </Link>
            )}
            <Link
              href="https://shellvoide.com"
              className="hover:text-primary-600 inline-flex items-center gap-1.5 text-sm font-semibold text-gray-700 transition-colors"
            >
              Explore Shellvoide
              <span aria-hidden>↗</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured post */}
      {featured && (
        <section>
          <Link
            href={`/${featured.slug}`}
            className="group block rounded-3xl bg-gray-50 p-7 transition-colors duration-200 hover:bg-gray-100 sm:p-9"
          >
            <div className="flex items-center gap-3 text-xs font-semibold tracking-wide uppercase">
              <span className="text-primary-600">Latest</span>
              <span className="text-gray-300">·</span>
              <time className="text-gray-500" dateTime={featured.date}>
                {formatDate(featured.date, siteMetadata.locale)}
              </time>
            </div>
            <h2 className="group-hover:text-primary-700 mt-4 text-2xl font-bold tracking-tight text-gray-900 transition-colors sm:text-3xl sm:leading-tight">
              {featured.title}
            </h2>
            <p className="mt-4 max-w-3xl leading-7 text-gray-600">{featured.summary}</p>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <TagList tags={featured.tags} />
              <span className="text-primary-600 inline-flex items-center gap-1.5 text-sm font-semibold">
                Read more
                <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </span>
            </div>
          </Link>
        </section>
      )}

      {/* Grid of remaining posts */}
      {rest.length > 0 && (
        <section className="pt-14">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">More writeups</h2>
            <span className="text-sm text-gray-500">{posts.length} posts</span>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/${post.slug}`}
                className="group flex flex-col rounded-2xl bg-gray-50 p-6 transition-colors duration-200 hover:bg-gray-100"
              >
                <time
                  className="text-xs font-medium tracking-wide text-gray-500"
                  dateTime={post.date}
                >
                  {formatDate(post.date, siteMetadata.locale)}
                </time>
                <h3 className="group-hover:text-primary-700 mt-2 text-lg font-bold tracking-tight text-gray-900 transition-colors">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-3 flex-1 text-sm leading-6 text-gray-600">
                  {post.summary}
                </p>
                <div className="mt-5">
                  <TagList tags={post.tags} max={2} />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA band */}
      <section className="pt-16">
        <div className="bg-primary-50 relative overflow-hidden rounded-3xl p-8 sm:p-12">
          <Image
            src={LogoPng}
            alt=""
            aria-hidden
            width={280}
            height={330}
            className="pointer-events-none absolute -right-8 -bottom-10 w-56 opacity-[0.06] select-none sm:w-72"
          />
          <div className="relative max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Want a run like this against your own stack?
            </h2>
            <p className="mt-4 leading-7 text-gray-600">
              Powered by KLUE and a certified team, Shellvoide finds the security gaps across your
              apps, cloud, and systems, and delivers full penetration tests in hours, not days, so
              you can fix what matters before anyone else finds it.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Link
                href="https://shellvoide.com/book"
                className="bg-primary-600 hover:bg-primary-700 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-colors"
              >
                Book a pentest
                <span aria-hidden>→</span>
              </Link>
              <Link
                href={`mailto:${siteMetadata.email}`}
                className="hover:text-primary-600 text-sm font-semibold text-gray-700 transition-colors"
              >
                {siteMetadata.email}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
