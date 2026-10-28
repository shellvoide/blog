import { redirect } from 'next/navigation'

// Legacy post URLs (/<slug>) live under /blog/<slug>; also used by the
// built-in search, which pushes to "/" + path.
export default async function Page(props: { params: Promise<{ slug: string[] }> }) {
  const params = await props.params
  redirect(`/blog/${params.slug.join('/')}`)
}
