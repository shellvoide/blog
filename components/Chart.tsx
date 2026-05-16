interface BarItem {
  label: string
  value: number
  display?: string
  highlight?: boolean
}

interface BarChartProps {
  title?: string
  caption?: string
  data: BarItem[]
  max?: number
  suffix?: string
}

export function BarChart({ title, caption, data, max, suffix = '' }: BarChartProps) {
  const computedMax = max ?? Math.max(...data.map((d) => d.value), 1)

  return (
    <figure className="not-prose my-8 overflow-hidden rounded-lg border border-gray-200 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-900/50 sm:p-6">
      {title && (
        <div className="mb-5 text-xs font-bold tracking-wider text-gray-500 uppercase dark:text-gray-400">
          {title}
        </div>
      )}
      <div className="space-y-3">
        {data.map((item) => {
          const pct = computedMax > 0 ? (item.value / computedMax) * 100 : 0
          const displayValue = item.display ?? `${item.value}${suffix}`
          return (
            <div
              key={item.label}
              className="grid grid-cols-[5.5rem_1fr_4rem] items-center gap-3 sm:grid-cols-[7rem_1fr_5rem]"
            >
              <div
                className={`truncate text-sm ${
                  item.highlight
                    ? 'font-semibold text-gray-900 dark:text-gray-100'
                    : 'font-medium text-gray-700 dark:text-gray-300'
                }`}
              >
                {item.label}
              </div>
              <div className="relative h-7 overflow-hidden rounded-md bg-gray-200/70 dark:bg-gray-800/70">
                <div
                  className={`h-full rounded-md ${
                    item.highlight ? 'bg-primary-500' : 'bg-gray-400 dark:bg-gray-600'
                  }`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <div
                className={`text-right font-mono text-sm tabular-nums ${
                  item.highlight
                    ? 'text-primary-600 dark:text-primary-400 font-bold'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                {displayValue}
              </div>
            </div>
          )
        })}
      </div>
      {caption && (
        <figcaption className="mt-4 text-xs text-gray-500 italic dark:text-gray-400">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

interface ScatterPoint {
  label: string
  x: number
  y: number
  highlight?: boolean
  align?: 'left' | 'right' | 'top' | 'bottom'
}

interface ScatterPlotProps {
  title?: string
  caption?: string
  points: ScatterPoint[]
  xLabel: string
  yLabel: string
  xMin?: number
  xMax?: number
  yMin?: number
  yMax?: number
}

export function ScatterPlot({
  title,
  caption,
  points,
  xLabel,
  yLabel,
  xMin = 0,
  xMax = 100,
  yMin = 0,
  yMax = 100,
}: ScatterPlotProps) {
  const width = 720
  const height = 440
  const padding = { top: 24, right: 32, bottom: 56, left: 64 }
  const plotW = width - padding.left - padding.right
  const plotH = height - padding.top - padding.bottom

  const toX = (v: number) => padding.left + ((v - xMin) / (xMax - xMin)) * plotW
  const toY = (v: number) => padding.top + plotH - ((v - yMin) / (yMax - yMin)) * plotH

  const xTicks = [0, 25, 50, 75, 100]
  const yTicks = [0, 25, 50, 75, 100]

  return (
    <figure className="not-prose my-8 overflow-hidden rounded-lg border border-gray-200 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-900/50 sm:p-6">
      {title && (
        <div className="mb-3 text-xs font-bold tracking-wider text-gray-500 uppercase dark:text-gray-400">
          {title}
        </div>
      )}
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full text-gray-700 dark:text-gray-300"
        preserveAspectRatio="xMidYMid meet"
      >
        {yTicks.map((t) => (
          <line
            key={`yg-${t}`}
            x1={padding.left}
            y1={toY(t)}
            x2={padding.left + plotW}
            y2={toY(t)}
            stroke="currentColor"
            strokeWidth={1}
            strokeOpacity={0.12}
          />
        ))}
        {xTicks.map((t) => (
          <line
            key={`xg-${t}`}
            x1={toX(t)}
            y1={padding.top}
            x2={toX(t)}
            y2={padding.top + plotH}
            stroke="currentColor"
            strokeWidth={1}
            strokeOpacity={0.12}
          />
        ))}
        <line
          x1={padding.left}
          y1={padding.top + plotH}
          x2={padding.left + plotW}
          y2={padding.top + plotH}
          stroke="currentColor"
          strokeWidth={1.5}
          strokeOpacity={0.4}
        />
        <line
          x1={padding.left}
          y1={padding.top}
          x2={padding.left}
          y2={padding.top + plotH}
          stroke="currentColor"
          strokeWidth={1.5}
          strokeOpacity={0.4}
        />
        {xTicks.map((t) => (
          <text
            key={`xt-${t}`}
            x={toX(t)}
            y={padding.top + plotH + 18}
            textAnchor="middle"
            fontSize={11}
            fill="currentColor"
            opacity={0.6}
          >
            {t}%
          </text>
        ))}
        {yTicks.map((t) => (
          <text
            key={`yt-${t}`}
            x={padding.left - 8}
            y={toY(t) + 4}
            textAnchor="end"
            fontSize={11}
            fill="currentColor"
            opacity={0.6}
          >
            {t}%
          </text>
        ))}
        <text
          x={padding.left + plotW / 2}
          y={height - 10}
          textAnchor="middle"
          fontSize={13}
          fontWeight={600}
          fill="currentColor"
          opacity={0.85}
        >
          {xLabel}
        </text>
        <text
          x={-(padding.top + plotH / 2)}
          y={18}
          textAnchor="middle"
          fontSize={13}
          fontWeight={600}
          fill="currentColor"
          opacity={0.85}
          transform="rotate(-90)"
        >
          {yLabel}
        </text>
        {points.map((p) => {
          const cx = toX(p.x)
          const cy = toY(p.y)
          const align = p.align ?? 'right'
          const labelDx = align === 'left' ? -14 : align === 'right' ? 14 : 0
          const labelDy = align === 'top' ? -14 : align === 'bottom' ? 22 : 4
          const anchor = align === 'left' ? 'end' : align === 'right' ? 'start' : 'middle'
          return (
            <g key={p.label}>
              <circle
                cx={cx}
                cy={cy}
                r={p.highlight ? 10 : 7}
                className={
                  p.highlight
                    ? 'fill-primary-500 stroke-primary-600'
                    : 'fill-gray-500 stroke-gray-700 dark:fill-gray-400 dark:stroke-gray-200'
                }
                fillOpacity={p.highlight ? 1 : 0.65}
                strokeWidth={p.highlight ? 2 : 1.25}
                strokeOpacity={p.highlight ? 1 : 0.5}
              />
              <text
                x={cx + labelDx}
                y={cy + labelDy}
                textAnchor={anchor}
                fontSize={13}
                fontWeight={p.highlight ? 700 : 500}
                fill="currentColor"
              >
                {p.label}
              </text>
            </g>
          )
        })}
      </svg>
      {caption && (
        <figcaption className="mt-3 text-xs text-gray-500 italic dark:text-gray-400">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
