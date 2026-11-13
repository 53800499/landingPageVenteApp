import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const url = new URL('/download/windows', request.url)
  return NextResponse.redirect(url, { status: 307 })
}

export async function HEAD(request: Request) {
  return GET(request)
}

