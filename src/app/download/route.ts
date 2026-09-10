import { NextResponse } from 'next/server'

/**
 * Route permanente de téléchargement officiel d'ARIKE pour Android.
 * URL: /download
 *
 * Fonctionnement :
 * 1. Si une URL de stockage distant (S3, Supabase Storage, CDN) est définie
 *    dans APK_DOWNLOAD_URL ou NEXT_PUBLIC_APK_DOWNLOAD_URL, redirection vers celle-ci.
 * 2. Sinon, redirection vers le fichier APK universel local (/downloads/arike-latest.apk).
 * 3. En-têtes anti-cache pour garantir que l'utilisateur reçoit toujours la version à jour.
 */
export async function GET(request: Request) {
  const remoteUrl =
    process.env.APK_DOWNLOAD_URL || process.env.NEXT_PUBLIC_APK_DOWNLOAD_URL

  if (remoteUrl && remoteUrl.trim().length > 0) {
    return NextResponse.redirect(remoteUrl.trim(), {
      status: 307,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
      },
    })
  }

  // Redirection relative sur le même domaine vers le fichier APK universel
  const downloadUrl = new URL('/downloads/arike-latest.apk', request.url)

  return NextResponse.redirect(downloadUrl, {
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
