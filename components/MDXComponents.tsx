import TOCInline from 'pliny/ui/TOCInline'
import BlogNewsletterForm from 'pliny/ui/BlogNewsletterForm'
import type { MDXComponents } from 'mdx/types'
import Image from './Image'
import CustomLink from './Link'
import TableWrapper from './TableWrapper'
import { BarChart, ScatterPlot, CoverageMatrix } from './Chart'
import { ReasoningTrace } from './ReasoningTrace'
import CodeBlock from './CodeBlock'

export const components: MDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: CodeBlock,
  table: TableWrapper,
  BlogNewsletterForm,
  BarChart,
  ScatterPlot,
  CoverageMatrix,
  ReasoningTrace,
}
