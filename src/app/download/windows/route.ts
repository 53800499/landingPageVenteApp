import { NextResponse } from 'next/server'

/**
 * Route permanente de téléchargement officiel d'ARIKE pour PC Windows.
 * URL: /download/windows (ou /download/pc)
 *
 * Fonctionnement :
 * 1. Si une URL externe valide est configurée (WINDOWS_DOWNLOAD_URL), redirection vers celle-ci.
 * 2. Sinon, redirection vers l'archive universelle locale (/downloads/arike-windows-latest.zip).
 * 3. En-têtes anti-cache stricts.
 */

const DEFAULT_SUPABASE_URL = 'https://qbfzuklaxeghmmkjxcpz.supabase.co'
const DEFAULT_WINDOWS_EXE_URL = `${DEFAULT_SUPABASE_URL}/storage/v1/object/public/releases/windows/arike-setup-v1.0.1.exe`

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const src = searchParams.get('src')

  // 1. Si demandé explicitement depuis Supabase
  if (src === 'supabase') {
    return NextResponse.redirect(DEFAULT_WINDOWS_EXE_URL, {
      status: 307,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
      },
    })
  }

  // 2. Si une URL personnalisée est fournie
  const remoteUrl =
    process.env.WINDOWS_DOWNLOAD_URL ||
    process.env.NEXT_PUBLIC_WINDOWS_DOWNLOAD_URL

  if (remoteUrl && remoteUrl.trim().length > 0 && !remoteUrl.includes('supabase.co')) {
    const targetUrl = remoteUrl.startsWith('http')
      ? remoteUrl.trim()
      : new URL(remoteUrl.trim(), request.url).toString()
    return NextResponse.redirect(targetUrl, {
      status: 307,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
      },
    })
  }

  // 3. Téléchargement direct depuis le dossier public de la Landing Page
  const localUrl = new URL('/downloads/arike-windows-latest.zip', request.url)
  return NextResponse.redirect(localUrl, {
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
