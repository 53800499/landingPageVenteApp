'use client'

import React, { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Icon } from '@iconify/react/dist/iconify.js'
import Pricing from '@/app/components/home/pricing'
import { PRICING_PLANS } from '@/app/components/home/pricing/pricingData'
import SubscriptionCheckoutModal, {
  OFFICIAL_PHONE,
  OFFICIAL_PHONE_DISPLAY,
} from '@/app/components/home/pricing/SubscriptionCheckoutModal'

function SubscriptionContent() {
  const searchParams = useSearchParams()
  const planParam = searchParams.get('plan')?.toUpperCase()

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState(PRICING_PLANS[2]) // Default PRO
  const [isAnnual, setIsAnnual] = useState(true)

  // Auto-open modal if ?plan=XXX is provided in URL
  useEffect(() => {
    if (planParam) {
      const found = PRICING_PLANS.find(
        (p) => p.code.toUpperCase() === planParam
      )
      if (found) {
        setSelectedPlan(found)
        setIsCheckoutOpen(true)
      }
    }
  }, [planParam])

  return (
    <div className='bg-body-bg min-h-screen pt-28 pb-20 relative overflow-hidden'>
      {/* Glow ambient background circles */}
      <div className='bg-linear-to-r from-primary/30 to-secondary/20 absolute w-full h-[600px] top-0 -left-1/4 blur-390 pointer-events-none' />
      <div className='bg-linear-to-l from-primary/25 to-gold-soft/20 absolute w-full h-[600px] top-1/3 -right-1/4 blur-390 pointer-events-none' />

      {/* Breadcrumb & Portal Badge */}
      <div className='container relative z-10 mb-8'>
        <div className='flex flex-wrap items-center justify-between gap-4 py-3 px-5 rounded-2xl bg-darkmode/70 border border-border/80 backdrop-blur-md'>
          <div className='flex items-center gap-2 text-xs sm:text-sm text-lightblue'>
            <Link href='/' className='hover:text-secondary transition-colors flex items-center gap-1.5'>
              <Icon icon='solar:home-2-bold' className='text-base' />
              <span>Accueil</span>
            </Link>
            <span>/</span>
            <span className='text-white font-semibold'>Portail Abonnements</span>
          </div>

          <div className='flex items-center gap-2'>
            <span className='w-2 h-2 rounded-full bg-emerald-400 animate-pulse' />
            <span className='text-xs font-semibold text-lightsky'>
              Paiement Sécurisé Mobile Money & Wave
            </span>
          </div>
        </div>
      </div>

      {/* Subscription Dedicated Page Heading */}
      <div className='container relative z-10 text-center max-w-3xl mx-auto mb-6'>
        <div className='inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/15 border border-secondary/35 text-secondary text-xs font-bold uppercase tracking-wider mb-4 shadow-sm'>
          <Icon icon='solar:verified-check-bold' className='text-base' />
          <span>Portail Officiel d&apos;Abonnement ARIKE</span>
        </div>

        <h1 className='text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-4'>
          Choisissez la Formule qui Fait{' '}
          <span className='text-transparent bg-clip-text bg-linear-to-r from-secondary via-gold-soft to-secondary'>
            Grandir votre Commerce
          </span>
        </h1>

        <p className='text-lightpurple text-sm sm:text-base max-w-2xl mx-auto leading-relaxed'>
          Démarrez <strong className='text-white font-semibold'>100% gratuitement à vie</strong> avec la caisse autonome hors-ligne, ou débloquez la synchronisation Cloud, le multi-boutiques et l&apos;assistant IA.
        </p>

        {/* Reassurance Bar */}
        <div className='mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left'>
          <div className='p-3 rounded-xl bg-tablebg/60 border border-border/60 flex items-center gap-2.5'>
            <div className='w-8 h-8 rounded-lg bg-primary/30 flex items-center justify-center text-secondary text-lg shrink-0'>
              <Icon icon='solar:shield-check-bold' />
            </div>
            <div>
              <span className='block text-xs font-bold text-white'>14j d&apos;essai gratuit</span>
              <span className='text-[10px] text-lightblue'>Sans engagement</span>
            </div>
          </div>

          <div className='p-3 rounded-xl bg-tablebg/60 border border-border/60 flex items-center gap-2.5'>
            <div className='w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center text-secondary text-lg shrink-0'>
              <Icon icon='solar:card-bold' />
            </div>
            <div>
              <span className='block text-xs font-bold text-white'>Mobile Money</span>
              <span className='text-[10px] text-lightblue'>MTN, Moov, Celtiis</span>
            </div>
          </div>

          <div className='p-3 rounded-xl bg-tablebg/60 border border-border/60 flex items-center gap-2.5'>
            <div className='w-8 h-8 rounded-lg bg-primary/30 flex items-center justify-center text-secondary text-lg shrink-0'>
              <Icon icon='solar:wifi-off-bold' />
            </div>
            <div>
              <span className='block text-xs font-bold text-white'>100% Offline-First</span>
              <span className='text-[10px] text-lightblue'>Zéro coupure caisse</span>
            </div>
          </div>

          <div className='p-3 rounded-xl bg-tablebg/60 border border-border/60 flex items-center gap-2.5'>
            <div className='w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center text-secondary text-lg shrink-0'>
              <Icon icon='solar:phone-calling-bold' />
            </div>
            <div>
              <span className='block text-xs font-bold text-white'>Support Local 24/7</span>
              <span className='text-[10px] text-lightblue'>WhatsApp & Appel</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Pricing & Subscription Component */}
      <Pricing />

      {/* Quick WhatsApp Contact Floating Banner */}
      <div className='container relative z-10 mt-12 text-center'>
        <div className='p-6 rounded-3xl bg-linear-to-r from-darkmode via-tablebg to-darkmode border border-secondary/30 shadow-2xl max-w-3xl mx-auto'>
          <h3 className='text-lg sm:text-xl font-bold text-white mb-2'>
            Vous avez un réseau de boutiques ou un besoin sur-mesure ?
          </h3>
          <p className='text-xs sm:text-sm text-lightblue mb-4'>
            Notre équipe à Cotonou vous accompagne pour l&apos;installation de votre matériel et la formation de vos équipes.
          </p>
          <a
            href={`https://wa.me/${OFFICIAL_PHONE}?text=${encodeURIComponent(
              "Bonjour l'équipe ARIKE ! J'aimerais des renseignements sur vos abonnements et forfaits pour mon commerce."
            )}`}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-secondary hover:bg-gold-soft text-[#061B14] font-black text-sm transition-all shadow-lg shadow-secondary/20'>
            <Icon icon='solar:chat-round-dots-bold' className='text-lg' />
            <span>Discuter avec un Conseiller ({OFFICIAL_PHONE_DISPLAY})</span>
          </a>
        </div>
      </div>

      {/* Interactive Checkout Modal (if auto-opened via param) */}
      <SubscriptionCheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        initialPlan={selectedPlan}
        allPlans={PRICING_PLANS}
        isAnnual={isAnnual}
        onToggleAnnual={setIsAnnual}
      />
    </div>
  )
}

export default function SubscriptionPage() {
  return (
    <Suspense
      fallback={
        <div className='min-h-screen bg-body-bg flex items-center justify-center text-secondary'>
          <div className='animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-secondary' />
        </div>
      }>
      <SubscriptionContent />
    </Suspense>
  )
}
