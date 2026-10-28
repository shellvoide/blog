import { allBlogs } from 'contentlayer/generated'
import Redirect from '@/components/Redirect'

// Legacy post URLs (/<slug>) now live under /blog/<slug>; also used by the
// built-in search, which pushes to "/" + path.
export const generateStaticParams = async () =>
  allBlogs.map((p) => ({ slug: p.slug.split('/').map((name) => decodeURI(name)) }))

export default async function Page(props: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await props.params
  return <Redirect to={`/blog/${slug.join('/')}`} />
}
