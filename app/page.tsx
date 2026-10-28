import Redirect from '@/components/Redirect'

// The site's default landing is /blog.
export default function Page() {
  return <Redirect to="/blog" />
}
