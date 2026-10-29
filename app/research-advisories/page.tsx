import Link from '@/components/Link'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'Research & Advisories',
  description:
    'Coordinated vulnerability disclosures from the Shellvoide / KLUE team, with upstream advisories and CVE IDs.',
})

type Cve = { id: string; desc: string; advisory?: string }
type Advisory = {
  name: string
  ecosystem: string
  writeup?: string
  cves: Cve[]
}

// Packages with an assigned CVE, from the Shellvoide disclosure log.
const advisories: Advisory[] = [
  {
    name: 'Poweradmin',
    ecosystem: 'PHP',
    writeup: '/poweradmin-seven-security-findings',
    cves: [
      {
        id: 'CVE pending',
        desc: 'Tenant-triggered code execution on the DNS server via LUA record injection through the zone metadata editor.',
        advisory:
          'https://github.com/poweradmin/poweradmin/security/advisories/GHSA-cpw8-xprw-73x5',
      },
      {
        id: 'CVE-2026-115459',
        desc: 'OIDC/SAML account linking trusts an unverified email claim, allowing takeover of a local administrator account (nOAuth pattern).',
        advisory:
          'https://github.com/poweradmin/poweradmin/security/advisories/GHSA-h2h8-xprp-w5cc',
      },
      {
        id: 'CVE-2026-115461',
        desc: 'Fail-open privilege assignment: OIDC/SAML auto-provisioning grants Administrator when the default permission template cannot be resolved.',
        advisory:
          'https://github.com/poweradmin/poweradmin/security/advisories/GHSA-vw9h-w6h7-9wwm',
      },
      {
        id: 'CVE-2026-115460',
        desc: 'Privilege escalation via getMinimalPermissionTemplateId(): the least-privilege default resolves to Administrator.',
        advisory:
          'https://github.com/poweradmin/poweradmin/security/advisories/GHSA-jq2m-gjfr-82cg',
      },
      {
        id: 'CVE pending',
        desc: 'SOA/NS write restriction for zone_content_edit_own_as_client bypassed by changing the record type in the same request.',
        advisory:
          'https://github.com/poweradmin/poweradmin/security/advisories/GHSA-3h74-qh4c-64gg',
      },
      {
        id: 'CVE pending',
        desc: 'Missing CSRF protection on GET-triggered state-changing endpoints (DNSSEC key toggle, template/supermaster/permission-template deletion).',
        advisory:
          'https://github.com/poweradmin/poweradmin/security/advisories/GHSA-rjcc-m8cx-6p4c',
      },
      {
        id: 'CVE-2026-115458',
        desc: 'Installer IP allow-list bypass via a spoofable X-Forwarded-For header.',
        advisory:
          'https://github.com/poweradmin/poweradmin/security/advisories/GHSA-q7r4-26g9-q7cv',
      },
    ],
  },
  {
    name: 'follow-redirects',
    ecosystem: 'npm',
    writeup: '/follow-redirects-credential-header-leaks',
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
    writeup: '/hydra-untrusted-config-rce',
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
    writeup: '/kin-openapi-three-dos-bugs',
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
    writeup: '/axios-prototype-pollution-method-gadget',
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
  const isAssigned = (c: Cve) => c.id.startsWith('CVE-')
  const totalCves = advisories.reduce((n, p) => n + p.cves.filter(isAssigned).length, 0)
  const pendingCount = advisories.reduce(
    (n, p) => n + p.cves.filter((c) => !isAssigned(c)).length,
    0
  )

  return (
    <div className="pb-16">
      <div className="pt-6 pb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Research &amp; Advisories
        </h1>
        <p className="mt-4 max-w-2xl leading-7 text-gray-600">
          Coordinated vulnerability disclosures from the Shellvoide / KLUE team. Each entry links to
          the upstream advisory; CVE IDs are shown once assigned.
        </p>
        <p className="mt-3 text-sm font-medium text-gray-500">
          {totalCves} CVEs · {pendingCount} pending · {advisories.length} packages
        </p>
      </div>

      <div className="space-y-6">
        {advisories.map((pkg) => {
          const assigned = pkg.cves.filter(isAssigned).length
          const pending = pkg.cves.length - assigned
          return (
            <section key={pkg.name} className="rounded-3xl bg-gray-50 p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-bold tracking-tight text-gray-900">{pkg.name}</h2>
                  <span className="rounded-full border border-gray-200 bg-white px-2.5 py-0.5 text-xs font-medium text-gray-500">
                    {pkg.ecosystem}
                  </span>
                  <span className="text-xs font-medium text-gray-400">
                    {[
                      assigned > 0 ? `${assigned} CVE${assigned === 1 ? '' : 's'}` : null,
                      pending > 0 ? `${pending} pending` : null,
                    ]
                      .filter(Boolean)
                      .join(' · ')}
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
                    key={c.advisory ?? c.id}
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
          )
        })}
      </div>
    </div>
  )
}
