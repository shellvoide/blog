import Image from 'next/image'
import LogoPng from '@/data/logo.png'
import Link from './Link'
import NavLinks from './NavLinks'
import MobileNav from './MobileNav'
import SearchButton from './SearchButton'

const Header = () => {
  return (
    <header className="sticky top-0 z-50 px-4 pt-4">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 rounded-full border border-gray-200/70 bg-white/80 px-4 py-2.5 shadow-sm backdrop-blur-md sm:px-5 xl:max-w-5xl">
        <Link href="/blog" aria-label="Shellvoide" className="group flex shrink-0 items-center gap-2.5">
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

        <div className="flex items-center gap-4 sm:gap-6">
          <NavLinks />

          <SearchButton />

          <Link
            href="https://shellvoide.com/book"
            className="bg-primary-600 hover:bg-primary-700 hidden shrink-0 rounded-full px-4 py-2 text-sm font-semibold text-white transition-colors sm:inline-block"
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
