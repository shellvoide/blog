import Link from '@/components/Link'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'Research & Advisories',
  description:
    'Coordinated vulnerability disclosures from the Shellvoide / KLUE team, with assigned CVE IDs.',
})

type Cve = { id: string; desc: string; advisory?: string }
type Advisory = { name: string; ecosystem: string; writeup?: string; cves: Cve[] }

// Packages with an assigned CVE, from the Shellvoide disclosure log.
const advisories: Advisory[] = [
  {
    name: 'follow-redirects',
    ecosystem: 'npm',
    writeup: '/blog/follow-redirects-credential-header-leaks',
    cves: [
      {
        id: 'CVE-2026-111756',
        desc: 'Array-form request headers bypass cross-origin sensitive-header stripping (Authorization, Cookie, Proxy-Authorization forwarded to the redirect target).',
        advisory:
          'https://github.com/follow-redirects/follow-redirects/security/advisories/GHSA-q3jh-wrc6-jgq8',
      },
      {
        id: 'CVE-2026-111755',
        desc: 'Incomplete regular-expression escaping in the sensitiveHeaders option lets metacharacter-named credential headers silently bypass cross-origin stripping.',
        advisory:
          'https://github.com/follow-redirects/follow-redirects/security/advisories/GHSA-8r9p-f939-6h3c',
      },
    ],
  },
  {
    name: 'Hydra',
    ecosystem: 'PyPI',
    writeup: '/blog/hydra-untrusted-config-rce',
    cves: [
      {
        id: 'CVE-2026-106441',
        desc: 'Arbitrary code execution via a malicious logging config (dictConfig) when loading an untrusted Hydra configuration.',
        advisory:
          'https://github.com/hydra-ecosystem/hydra/security/advisories/GHSA-c3wx-c55w-pxjq',
      },
      {
        id: 'CVE-2026-106442',
        desc: 'instantiate() blocklist bypass via a timeit.timeit / pickle.loads chain, reaching code execution past the blocklist.',
        advisory:
          'https://github.com/hydra-ecosystem/hydra/security/advisories/GHSA-rqx7-p7vv-w7hr',
      },
    ],
  },
  {
    name: 'kin-openapi',
    ecosystem: 'Go',
    writeup: '/blog/kin-openapi-three-dos-bugs',
    cves: [
      {
        id: 'CVE-2026-100352',
        desc: 'YAML NaN/Inf values bypass the built-in guards and panic via the OAS 3.1 validation path.',
        advisory: 'https://github.com/getkin/kin-openapi/security/advisories/GHSA-rj39-cv6w-8wv7',
      },
      {
        id: 'CVE-2026-100353',
        desc: 'Incomplete fix for GHSA-p6wj-qrr4-pgh5: three unpatched nil-Items panic paths in openapi3filter.',
        advisory: 'https://github.com/getkin/kin-openapi/security/advisories/GHSA-vrcc-3ch7-hppw',
      },
      {
        id: 'CVE-2026-100354',
        desc: 'Uncontrolled recursion on circular allOf/anyOf/oneOf schemas causes a fatal process crash.',
        advisory: 'https://github.com/getkin/kin-openapi/security/advisories/GHSA-g8cf-rcjf-c8cf',
      },
    ],
  },
  {
    name: 'axios',
    ecosystem: 'npm',
    writeup: '/blog/axios-prototype-pollution-method-gadget',
    cves: [
      {
        id: 'CVE-2026-101902',
        desc: 'Prototype-pollution gadget in the Axios default instance allows an inherited request-method override (a safe GET can go out as DELETE, POST, PUT, or PATCH).',
        advisory: 'https://github.com/axios/axios/security/advisories/GHSA-9fr6-4gfg-395g',
      },
    ],
  },
  {
    name: 'YesWiki',
    ecosystem: 'PHP',
    cves: [
      {
        id: 'CVE-2026-52762',
        desc: 'Authenticated (admin) server-side template injection to remote code execution via Bazar semantic templates.',
      },
      {
        id: 'CVE-2026-52767',
        desc: 'Unauthenticated ActivityPub signature-verification bypass via !openssl_verify(...) accepting int(-1).',
      },
      {
        id: 'CVE-2026-52769',
        desc: 'Unauthenticated server-side request forgery via the ActivityPub Signature.keyId.',
      },
      {
        id: 'CVE-2026-52771',
        desc: 'Second-order SQL injection in the page-delete API via an unescaped page tag (ApiController::deletePage).',
      },
      {
        id: 'CVE-2026-52773',
        desc: 'Reflected XSS via an unescaped archived-revision time parameter in handlers/page/show.php.',
      },
      {
        id: 'CVE-2026-52774',
        desc: 'Reflected XSS via an unescaped id parameter in Bazar widget HTML attributes.',
      },
    ],
  },
]

const cveLink = (c: Cve) => c.advisory || `https://www.cve.org/CVERecord?id=${c.id}`

export default function ResearchAdvisoriesPage() {
  const totalCves = advisories.reduce((n, p) => n + p.cves.length, 0)

  return (
    <div className="pb-16">
      <div className="pt-6 pb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Research &amp; Advisories
        </h1>
        <p className="mt-4 max-w-2xl leading-7 text-gray-600">
          Coordinated vulnerability disclosures from the Shellvoide / KLUE team. Each entry below
          has an assigned CVE.
        </p>
        <p className="mt-3 text-sm font-medium text-gray-500">
          {totalCves} CVEs · {advisories.length} packages
        </p>
      </div>

      <div className="space-y-6">
        {advisories.map((pkg) => (
          <section key={pkg.name} className="rounded-3xl bg-gray-50 p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold tracking-tight text-gray-900">{pkg.name}</h2>
                <span className="rounded-full border border-gray-200 bg-white px-2.5 py-0.5 text-xs font-medium text-gray-500">
                  {pkg.ecosystem}
                </span>
                <span className="text-xs font-medium text-gray-400">
                  {pkg.cves.length} {pkg.cves.length === 1 ? 'CVE' : 'CVEs'}
                </span>
              </div>
              {pkg.writeup && (
                <Link
                  href={pkg.writeup}
                  className="text-primary-600 hover:text-primary-700 inline-flex items-center gap-1.5 text-sm font-semibold"
                >
                  Read the writeup
                  <span aria-hidden>→</span>
                </Link>
              )}
            </div>

            <ul className="mt-5 divide-y divide-gray-200">
              {pkg.cves.map((c) => (
                <li
                  key={c.id}
                  className="grid gap-1.5 py-4 sm:grid-cols-[180px_1fr] sm:gap-6 sm:py-3.5"
                >
                  <Link
                    href={cveLink(c)}
                    className="text-primary-700 hover:text-primary-800 font-mono text-sm font-semibold"
                  >
                    {c.id}
                    <span aria-hidden className="ml-1 text-gray-400">
                      ↗
                    </span>
                  </Link>
                  <p className="text-sm leading-6 text-gray-600">{c.desc}</p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
}
