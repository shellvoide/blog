import { formatDate } from 'pliny/utils/formatDate'
import siteMetadata from '@/data/siteMetadata'

export interface Advisory {
  id: string
  url?: string
  label?: string
  severity?: string
  score?: number | string
  cve?: string
  affected?: string
  fixed?: string
}

interface Props {
  advisories: Advisory[]
  date: string
  system?: string
}

// severity is coloured text only, one clearly different hue per level in both themes
const severityTone: Record<string, string> = {
  critical: 'text-red-800 dark:text-red-300',
  high: 'text-red-600 dark:text-red-400',
  medium: 'text-amber-600 dark:text-amber-400',
  moderate: 'text-amber-600 dark:text-amber-400',
  low: 'text-sky-600 dark:text-sky-400',
}
const neutralTone = 'text-gray-700 dark:text-gray-300'

// one padding scheme shared by header and body cells, so every column lines up
const col = ['md:pl-5 md:pr-4', 'md:px-4', 'md:px-4', 'md:pl-4 md:pr-5']

const cellLabel = 'w-20 shrink-0 text-xs leading-5 text-gray-500 md:hidden dark:text-gray-400'

// ">= 2.10.0, < 2.11.2 and >= 2.3.0" -> one range per line, with proper symbols
const ranges = (s?: string) =>
  (s || '')
    .replace(/>=/g, '≥')
    .replace(/<=/g, '≤')
    .split(/\s+and\s+/)
    .filter(Boolean)

const versions = (s?: string) =>
  (s || '')
    .split(/\s*,\s*(?=v?\d)/)
    .map((v) => v.trim())
    .filter(Boolean)

function Summary({
  label,
  children,
  className = '',
}: {
  label: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`px-5 py-3.5 ${className}`}>
      <dt className="text-xs text-gray-500 dark:text-gray-400">{label}</dt>
      <dd className="mt-1 text-sm font-semibold text-gray-900 dark:text-gray-100">{children}</dd>
    </div>
  )
}

export default function AdvisoryTable({ advisories, date, system }: Props) {
  const allFixed = advisories.every((a) => a.fixed)

  return (
    <section
      aria-label="Advisory summary"
      className="mt-8 overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950"
    >
      <dl className="grid grid-cols-2 border-b border-gray-200 bg-gray-50 sm:grid-cols-3 md:grid-cols-[31%_16%_33%_20%] dark:border-gray-800 dark:bg-gray-900/60">
        {system && (
          <Summary label="Affected system" className={col[0]}>
            {system}
          </Summary>
        )}
        <Summary label="Published" className={`md:col-span-2 ${col[1]}`}>
          <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
        </Summary>
        {allFixed && (
          <Summary label="Status" className={col[3]}>
            Patched
          </Summary>
        )}
      </dl>

      <table className="block w-full text-left md:table md:table-fixed">
        <colgroup className="hidden md:table-column-group">
          <col className="w-[31%]" />
          <col className="w-[16%]" />
          <col className="w-[33%]" />
          <col className="w-[20%]" />
        </colgroup>
        <thead className="hidden border-b border-gray-200 text-xs text-gray-500 md:table-header-group dark:border-gray-800 dark:text-gray-400">
          <tr>
            {['Advisory', 'Severity', 'Affected', 'Fixed in'].map((h, i) => (
              <th key={h} scope="col" className={`py-2.5 font-medium ${col[i]}`}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="block divide-y divide-gray-200 md:table-row-group dark:divide-gray-800">
          {advisories.map((a) => {
            const shown = a.cve || a.id
            const tone = severityTone[(a.severity || '').toLowerCase()] || neutralTone
            return (
              <tr
                key={a.id}
                className="block space-y-1.5 px-5 py-3.5 md:table-row md:space-y-0 md:p-0"
              >
                <td className={`block align-top md:table-cell md:py-3.5 ${col[0]}`}>
                  {a.url ? (
                    <a
                      href={a.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary-700 dark:hover:text-primary-400 inline-flex items-center gap-1 font-mono text-[0.8rem] leading-5 font-semibold whitespace-nowrap text-gray-900 underline-offset-4 transition-colors hover:underline dark:text-gray-100"
                    >
                      {shown}
                      <svg
                        aria-hidden
                        viewBox="0 0 12 12"
                        className="h-3 w-3 opacity-40"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 9 9 3M4.5 3H9v4.5" />
                      </svg>
                    </a>
                  ) : (
                    <span className="font-mono text-[0.8rem] leading-5 font-semibold whitespace-nowrap text-gray-900 dark:text-gray-100">
                      {shown}
                    </span>
                  )}
                  {a.label && (
                    <div className="text-[0.8rem] leading-5 text-gray-500 dark:text-gray-400">
                      {a.label}
                    </div>
                  )}
                </td>

                <td className={`flex align-top md:table-cell md:py-3.5 ${col[1]}`}>
                  <span className={cellLabel}>Severity</span>
                  <span className="text-[0.85rem] leading-5 whitespace-nowrap">
                    <span className={`font-bold ${tone}`}>{a.severity || 'Unrated'}</span>
                    {a.score !== undefined && a.score !== '' && (
                      <span
                        title="CVSS score"
                        className="ml-1.5 font-medium text-gray-500 tabular-nums dark:text-gray-400"
                      >
                        {a.score}
                      </span>
                    )}
                  </span>
                </td>

                <td className={`flex align-top md:table-cell md:py-3.5 ${col[2]}`}>
                  <span className={cellLabel}>Affected</span>
                  <span className="font-mono text-[0.78rem] leading-5 text-gray-700 dark:text-gray-300">
                    {ranges(a.affected).map((r) => (
                      <span key={r} className="block">
                        {r}
                      </span>
                    ))}
                  </span>
                </td>

                <td className={`flex align-top md:table-cell md:py-3.5 ${col[3]}`}>
                  <span className={cellLabel}>Fixed in</span>
                  <span className="font-mono text-[0.78rem] leading-5 font-medium text-emerald-700 dark:text-emerald-400">
                    {versions(a.fixed).map((v) => (
                      <span key={v} className="block whitespace-nowrap">
                        {v}
                      </span>
                    ))}
                  </span>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </section>
  )
}
