import { Fragment } from 'react'

type Role = 'STATE' | 'TOOL' | 'AGENT' | 'SYSTEM'

interface TraceLine {
  time?: string
  role?: Role
  text: string
}

interface ReasoningTraceProps {
  label?: string
  caption?: string
  lines: TraceLine[]
}

const ROLE_STYLE: Record<Role, string> = {
  STATE: 'text-gray-500 italic font-normal',
  TOOL: 'text-sky-400',
  AGENT: 'text-rose-400',
  SYSTEM: 'text-amber-400',
}

// Conservatively chip the tokens that read as "code" inside a log line:
// php-style $vars, file paths/names, routes, and snake_case identifiers.
const CHIP =
  /(\$[A-Za-z_]\w*|\b[\w.\-/]*\.(?:php|html|tpl|twig|js)\b|\/[\w/{}.<>-]+|\b[a-z][a-z0-9]*(?:_[a-z0-9]+)+\b)/g

function renderText(text: string) {
  return text.split(CHIP).map((part, i) =>
    i % 2 === 1 ? (
      <span
        key={i}
        className="rounded bg-emerald-400/10 px-1 text-emerald-300"
      >
        {part}
      </span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    )
  )
}

export function ReasoningTrace({ label = 'klue · reasoning trace', caption, lines }: ReasoningTraceProps) {
  return (
    <figure className="not-prose my-8 overflow-hidden rounded-lg border border-gray-800 bg-gray-950 shadow-lg">
      <div className="flex items-center gap-2 border-b border-gray-800 bg-gray-900 px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-rose-500/80" />
        <span className="h-3 w-3 rounded-full bg-amber-500/80" />
        <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
        <span className="ml-2 font-mono text-xs text-gray-400">{label}</span>
      </div>
      <div className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-gray-300 sm:p-5">
        <div className="min-w-[34rem] space-y-1.5">
          {lines.map((line, i) => (
            <div key={i} className="flex gap-3">
              <span className="w-[68px] shrink-0 tabular-nums text-gray-600 select-none">
                {line.time ?? ''}
              </span>
              <span
                className={`w-20 shrink-0 font-semibold select-none ${
                  line.role ? ROLE_STYLE[line.role] : ''
                }`}
              >
                {line.role ? `[${line.role}]` : ''}
              </span>
              <span className="flex-1 break-words whitespace-pre-wrap">
                {renderText(line.text)}
              </span>
            </div>
          ))}
        </div>
      </div>
      {caption && (
        <figcaption className="border-t border-gray-800 px-4 py-2.5 text-xs text-gray-500 italic">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
