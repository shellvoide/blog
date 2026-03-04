import { NextResponse } from 'next/server'

export const dynamic = 'force-static'

export function GET() {
  return NextResponse.json({ message: 'Newsletter not configured' }, { status: 404 })
}

export function POST() {
  return NextResponse.json({ message: 'Newsletter not configured' }, { status: 404 })
}
