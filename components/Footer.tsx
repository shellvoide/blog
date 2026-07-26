import Link from './Link'
import Image from 'next/image'
import LogoPng from '@/data/logo.png'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'

export default function Footer() {
  return (
    <footer className="mt-20 bg-gray-50">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 xl:max-w-5xl xl:px-0">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" aria-label="Shellvoide" className="flex items-center gap-2.5">
            <Image src={LogoPng} alt="Shellvoide" width={27} height={32} className="h-8 w-auto" />
            <span className="flex flex-col leading-tight">
              <span className="font-bold text-gray-900">Shellvoide</span>
              <span className="text-xs text-gray-500">
                AI-Powered Cybersecurity &amp; Penetration Testing
              </span>
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={6} />
            <SocialIcon kind="github" href={siteMetadata.github} size={6} />
            <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={6} />
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-3 pt-2 text-sm text-gray-500 sm:flex-row sm:justify-between">
          <div>{`© ${new Date().getFullYear()} Shellvoide. All rights reserved.`}</div>
          <div className="flex items-center gap-5">
            <Link
              href="https://shellvoide.com"
              className="hover:text-primary-600 transition-colors"
            >
              shellvoide.com
            </Link>
            <Link href="/feed.xml" className="hover:text-primary-600 transition-colors">
              RSS
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
