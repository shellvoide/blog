'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from './Link'

// Client-side redirect usable in a static export (output: export), where
// server redirect() only emits an error shell. useRouter().replace keeps the
// configured basePath.
export default function Redirect({ to }: { to: string }) {
  const router = useRouter()
  useEffect(() => {
    router.replace(to)
  }, [router, to])
  return (
    <p className="py-24 text-center text-sm text-gray-500">
      Redirecting…{' '}
      <Link href={to} className="text-primary-600 hover:text-primary-700 underline">
        Continue
      </Link>
    </p>
  )
}
