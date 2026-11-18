import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  return NextResponse.json({ status: 'ok', service: 'ARIKE Subscriptions API' })
}

export interface SubscribePayload {
  planCode: 'FREE' | 'ESSENTIEL' | 'PRO' | 'BUSINESS' | 'ENTERPRISE'
  planName: string
  billingCycle: 'monthly' | 'yearly'
  amount: number
  merchantName: string
  shopName: string
  phoneNumber: string
  city?: string
  paymentMethod: 'FREE_START' | 'TRIAL_14D' | 'MOMO_MTN' | 'MOMO_MOOV' | 'MOMO_CELTIIS' | 'CARD' | 'WHATSAPP_ASSISTED'
}

/**
 * Route API pour traiter l'inscription, l'essai gratuit ou le paiement Mobile Money
 * POST /api/subscribe
 */
export async function POST(request: Request) {
  try {
    const body: SubscribePayload = await request.json()

    if (!body.merchantName || !body.phoneNumber || !body.planCode) {
      return NextResponse.json(
        { success: false, message: 'Veuillez renseigner votre nom, téléphone et forfait.' },
        { status: 400 }
      )
    }

    // Génération d'une référence unique de souscription
    const timestamp = Date.now().toString(36).toUpperCase()
    const randomHex = Math.random().toString(36).substring(2, 6).toUpperCase()
    const reference = `ARIK-${body.planCode}-${timestamp}-${randomHex}`

    // Date de fin / période d'essai
    const now = new Date()
    let trialEndsAt: string | null = null
    let status: 'ACTIVE' | 'TRIAL' | 'PENDING_PAYMENT' = 'ACTIVE'

    if (body.paymentMethod === 'TRIAL_14D') {
      status = 'TRIAL'
      const trialDate = new Date(now.getTime() + 14 * 86400000)
      trialEndsAt = trialDate.toISOString()
    } else if (body.paymentMethod.startsWith('MOMO_') || body.paymentMethod === 'CARD') {
      status = 'PENDING_PAYMENT'
    }

    // Formatage propre du message d'assistance WhatsApp vers le numéro officiel
    const officialPhone = '2290153800499'
    const waText = encodeURIComponent(
      `*Demande de Souscription ARIKE*\n` +
      `🔖 *Référence :* ${reference}\n` +
      `📦 *Forfait :* ${body.planName} (${body.billingCycle === 'yearly' ? 'Annuel - 2 mois offerts' : 'Mensuel'})\n` +
      `💰 *Montant :* ${body.amount.toLocaleString('fr-FR')} FCFA\n` +
      `👤 *Commerçant :* ${body.merchantName}\n` +
      `🏪 *Boutique :* ${body.shopName || 'Non précisé'}\n` +
      `📍 *Ville :* ${body.city || 'Bénin'}\n` +
      `📞 *Téléphone :* ${body.phoneNumber}\n` +
      `💳 *Mode choisi :* ${body.paymentMethod}\n` +
      (trialEndsAt ? `⏳ *Essai 14j jusqu'au :* ${new Date(trialEndsAt).toLocaleDateString('fr-FR')}\n` : '') +
      `\nMerci de bien vouloir valider mon activation !`
    )

    const whatsappRedirectUrl = `https://wa.me/${officialPhone}?text=${waText}`

    // Résultat retourné au frontend
    return NextResponse.json({
      success: true,
      reference,
      status,
      planCode: body.planCode,
      planName: body.planName,
      billingCycle: body.billingCycle,
      amount: body.amount,
      trialEndsAt,
      downloadUrl: '/download',
      whatsappRedirectUrl,
      message:
        body.planCode === 'FREE'
          ? 'Votre accès gratuit et autonome à vie est prêt !'
          : body.paymentMethod === 'TRIAL_14D'
            ? 'Votre essai gratuit de 14 jours a été activé avec succès !'
            : 'Demande de paiement enregistrée avec succès.',
    })
  } catch (error) {
    console.error('Erreur API subscribe:', error)
    return NextResponse.json(
      { success: false, message: 'Erreur lors du traitement de la souscription.' },
      { status: 500 }
    )
  }
}
