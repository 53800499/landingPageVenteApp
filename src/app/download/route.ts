import { NextResponse } from 'next/server'

/**
 * Route permanente de téléchargement officiel d'ARIKE pour Android & Windows.
 * URL: /download
 *
 * Fonctionnement :
 * 1. Détecte la plateforme demandée (?platform=android|windows, défaut: android)
 * 2. Redirige vers le bucket Supabase Storage officiel :
 *    - Android : releases/android/arike-v1.0.1.apk (ou via APK_DOWNLOAD_URL)
 *    - Windows : releases/windows/arike-setup-v1.0.1.exe (ou via WINDOWS_DOWNLOAD_URL)
 * 3. Fallback automatique vers le fichier APK local (/downloads/arike-latest.apk) si nécessaire.
 * 4. En-têtes anti-cache stricts (no-cache) pour garantir que l'utilisateur reçoit toujours la version à jour.
 */

const DEFAULT_SUPABASE_URL = 'https://qbfzuklaxeghmmkjxcpz.supabase.co'
const DEFAULT_ANDROID_APK_URL = `${DEFAULT_SUPABASE_URL}/storage/v1/object/public/releases/android/arike-v1.0.1.apk`
const DEFAULT_WINDOWS_EXE_URL = `${DEFAULT_SUPABASE_URL}/storage/v1/object/public/releases/windows/arike-setup-v1.0.1.exe`

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const platform = (searchParams.get('platform') || 'android').toLowerCase()

  // 1. Pour Windows
  if (platform === 'windows') {
    const windowsUrl =
      process.env.WINDOWS_DOWNLOAD_URL ||
      process.env.NEXT_PUBLIC_WINDOWS_DOWNLOAD_URL ||
      DEFAULT_WINDOWS_EXE_URL

    return NextResponse.redirect(windowsUrl.trim(), {
      status: 307,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
      },
    })
  }

  // 2. Pour Android (défaut)
  // Priorité 1 : URL d'environnement explicite
  const customUrl =
    process.env.APK_DOWNLOAD_URL || process.env.NEXT_PUBLIC_APK_DOWNLOAD_URL

  if (customUrl && customUrl.trim().length > 0) {
    return NextResponse.redirect(customUrl.trim(), {
      status: 307,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
      },
    })
  }

  // Priorité 2 : URL officielle Supabase Storage
  if (searchParams.get('fallback') !== 'local') {
    return NextResponse.redirect(DEFAULT_ANDROID_APK_URL, {
      status: 307,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
      },
    })
  }

  // Priorité 3 : Fallback APK local sur le même domaine (/downloads/arike-latest.apk)
  const localDownloadUrl = new URL('/downloads/arike-latest.apk', request.url)
  return NextResponse.redirect(localDownloadUrl, {
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
