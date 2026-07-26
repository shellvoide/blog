import headerNavLinks from '@/data/headerNavLinks'
import Image from 'next/image'
import LogoPng from '@/data/logo.png'
import Link from './Link'
import MobileNav from './MobileNav'
import SearchButton from './SearchButton'

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3 sm:px-6 xl:max-w-5xl xl:px-0">
        <Link href="/" aria-label="Shellvoide" className="group flex items-center gap-2.5">
          <Image
            src={LogoPng}
            alt="Shellvoide"
            width={27}
            height={32}
            priority
            className="h-8 w-auto"
          />
          <span className="text-xl font-bold tracking-tight text-gray-900">Shellvoide</span>
        </Link>

        <div className="flex items-center gap-3 sm:gap-5">
          <nav className="hidden items-center gap-6 sm:flex">
            {headerNavLinks
              .filter((link) => link.href !== '/')
              .map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  target="_self"
                  className="hover:text-primary-600 text-sm font-medium text-gray-600 transition-colors"
                >
                  {link.title}
                </Link>
              ))}
          </nav>

          <SearchButton />

          <Link
            href="https://shellvoide.com/book"
            className="bg-primary-600 hover:bg-primary-700 hidden rounded-full px-4 py-2 text-sm font-semibold text-white transition-colors sm:inline-block"
          >
            Book a pentest
          </Link>

          <MobileNav />
        </div>
      </div>
    </header>
  )
}

export default Header
