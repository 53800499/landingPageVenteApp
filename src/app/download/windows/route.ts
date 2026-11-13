import { NextResponse } from 'next/server'

/**
 * Route permanente de téléchargement officiel d'ARIKE pour PC Windows.
 * URL: /download/windows (ou /download/pc)
 */

const DEFAULT_SUPABASE_URL = 'https://qbfzuklaxeghmmkjxcpz.supabase.co'
const DEFAULT_WINDOWS_EXE_URL = `${DEFAULT_SUPABASE_URL}/storage/v1/object/public/releases/windows/arike-setup-v1.0.1.exe`

export async function GET(request: Request) {
  const remoteUrl =
    process.env.WINDOWS_DOWNLOAD_URL ||
    process.env.NEXT_PUBLIC_WINDOWS_DOWNLOAD_URL ||
    DEFAULT_WINDOWS_EXE_URL

  return NextResponse.redirect(remoteUrl.trim(), {
    status: 307,
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      Pragma: 'no-cache',
      Expires: '0',
    },
  })
}

export async function HEAD(request: Request) {
  return GET(request)
}

