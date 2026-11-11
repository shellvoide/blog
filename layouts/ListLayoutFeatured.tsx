import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'

interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
}

function TagList({ tags = [], max = 3 }: { tags?: string[]; max?: number }) {
  if (!tags.length) return null
  return (
    <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs font-medium tracking-wide text-gray-400 uppercase dark:text-gray-500">
      {tags.slice(0, max).map((tag) => (
        <span key={tag}>{tag.split(' ').join('-')}</span>
      ))}
    </div>
  )
}

export default function ListLayoutFeatured({ posts, title }: ListLayoutProps) {
  const featured = posts[0]
  const rest = posts.slice(1)

  return (
    <div className="pb-16">
      <div className="flex items-end justify-between gap-4 pt-6 pb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-100">
          {title}
        </h1>
        <span className="shrink-0 pb-1 text-sm text-gray-500 dark:text-gray-400">
          {posts.length} posts
        </span>
      </div>

      {featured && (
        <Link
          href={`/${featured.path}`}
          className="group block rounded-3xl bg-gray-50 p-7 transition-colors duration-200 hover:bg-gray-100 sm:p-9 dark:bg-gray-900 dark:hover:bg-gray-800"
        >
          <div className="flex items-center gap-3 text-xs font-semibold tracking-wide uppercase">
            <span className="text-primary-600 dark:text-primary-400">Latest</span>
            <span className="text-gray-300 dark:text-gray-600">·</span>
            <time className="text-gray-500 dark:text-gray-400" dateTime={featured.date}>
              {formatDate(featured.date, siteMetadata.locale)}
            </time>
          </div>
          <h2 className="group-hover:text-primary-700 dark:group-hover:text-primary-400 mt-4 text-2xl font-bold tracking-tight text-gray-900 transition-colors sm:text-3xl sm:leading-tight dark:text-gray-100">
            {featured.title}
          </h2>
          <p className="mt-4 max-w-3xl leading-7 text-gray-600 dark:text-gray-400">
            {featured.summary}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <TagList tags={featured.tags} />
            <span className="text-primary-600 dark:text-primary-400 inline-flex items-center gap-1.5 text-sm font-semibold">
              Read more
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </span>
          </div>
        </Link>
      )}

      {rest.length > 0 && (
        <section className="pt-12">
          <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            More writeups
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {rest.map((post) => (
              <Link
                key={post.path}
                href={`/${post.path}`}
                className="group flex flex-col rounded-2xl bg-gray-50 p-6 transition-colors duration-200 hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800"
              >
                <time
                  className="text-xs font-medium tracking-wide text-gray-500 dark:text-gray-400"
                  dateTime={post.date}
                >
                  {formatDate(post.date, siteMetadata.locale)}
                </time>
                <h3 className="group-hover:text-primary-700 dark:group-hover:text-primary-400 mt-2 text-lg font-bold tracking-tight text-gray-900 transition-colors dark:text-gray-100">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-3 flex-1 text-sm leading-6 text-gray-600 dark:text-gray-400">
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
    </div>
  )
}
