'use client'

import React, { useState } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import Link from 'next/link'
import {
  PRICING_PLANS,
  HARDWARE_PACKS,
  COMPARISON_CATEGORIES,
  PROFILE_RECOMMENDATIONS,
  PRICING_FAQ,
  PricingPlan,
} from './pricingData'
import SubscriptionCheckoutModal, {
  OFFICIAL_PHONE,
  OFFICIAL_PHONE_DISPLAY,
} from './SubscriptionCheckoutModal'

const Pricing: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState<boolean>(true)
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null)
  const [showMatrix, setShowMatrix] = useState<boolean>(false)
  const [matrixMobilePlan, setMatrixMobilePlan] = useState<'essentiel' | 'pro' | 'business'>('pro')
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

  // Mobile active plan tab for < 768px view
  const [mobilePlanCode, setMobilePlanCode] = useState<string>('PRO')

  // Checkout modal states
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false)
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState<PricingPlan>(PRICING_PLANS[2]) // PRO default

  // Format numbers with thousands spaces
  const formatPrice = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  }

  // Determine active plan recommendation from profile
  const recommendedCode = selectedProfile
    ? PROFILE_RECOMMENDATIONS.find((p) => p.id === selectedProfile)?.recommendedPlanCode
    : null

  // Trigger modal with plan
  const handleOpenCheckout = (plan: PricingPlan) => {
    setSelectedPlanForCheckout(plan)
    setIsCheckoutOpen(true)
  }

  // Active plan for mobile card view
  const activeMobilePlan = PRICING_PLANS.find((p) => p.code === mobilePlanCode) || PRICING_PLANS[2]

  return (
    <section id='tarifs' className='scroll-mt-20 py-20 lg:py-24 relative overflow-hidden bg-body-bg'>
      {/* Dual anchor for compatibility with #pricing-section and #tarifs */}
      <div id='pricing-section' className='absolute -top-20' />

      {/* Glow ambient background circles */}
      <div className='bg-linear-to-r from-primary/25 to-secondary/15 absolute w-full h-full top-0 -left-1/4 blur-390 pointer-events-none' />
      <div className='bg-linear-to-l from-primary/20 to-gold-soft/15 absolute w-full h-full bottom-0 -right-1/4 blur-390 pointer-events-none' />

      <div className='container relative z-10'>
        {/* Section Header */}
        <div className='max-w-3xl mx-auto text-center mb-10 sm:mb-12'>
          <div className='inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/15 border border-secondary/35 text-secondary text-xs font-bold uppercase tracking-wider mb-4 shadow-sm'>
            <Icon icon='solar:tag-price-bold' className='text-base' />
            <span>Tarifs Transparents & Modèle Freemium</span>
          </div>

          <h2 className='text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-5 leading-tight'>
            Des Formules Conçues pour Chaque{' '}
            <span className='text-transparent bg-clip-text bg-linear-to-r from-secondary via-gold-soft to-secondary'>
              Étape de votre Commerce
            </span>
          </h2>

          <p className='text-lightpurple text-base sm:text-lg max-w-2xl mx-auto leading-relaxed'>
            Démarrez <strong className='text-white font-semibold'>100% gratuitement à vie</strong> sans carte bancaire avec notre caisse autonome hors-ligne, puis débloquez la sauvegarde Cloud, le multi-vendeurs et l’anti-fraude à votre rythme.
          </p>
        </div>

        {/* Profile Matcher / Quick Filter */}
        <div className='max-w-4xl mx-auto mb-10'>
          <div className='text-center mb-3'>
            <span className='text-xs sm:text-sm font-semibold text-lightblue uppercase tracking-wider'>
              💡 Quel est votre profil ? Cliquez pour afficher le forfait idéal :
            </span>
          </div>
          <div className='grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3'>
            {PROFILE_RECOMMENDATIONS.map((profile) => {
              const isActive = selectedProfile === profile.id
              return (
                <button
                  key={profile.id}
                  onClick={() => {
                    if (isActive) {
                      setSelectedProfile(null)
                    } else {
                      setSelectedProfile(profile.id)
                      setMobilePlanCode(profile.recommendedPlanCode)
                    }
                  }}
                  className={`flex flex-col items-center text-center p-3 sm:p-4 rounded-2xl border transition-all duration-200 cursor-pointer min-h-[88px] justify-center ${
                    isActive
                      ? 'bg-secondary/20 border-secondary text-white shadow-lg shadow-secondary/15 scale-[1.02]'
                      : 'bg-darkmode/70 border-border/80 text-lightblue hover:border-primary/50 hover:bg-darkmode'
                  }`}>
                  <Icon
                    icon={profile.icon}
                    className={`text-2xl mb-1.5 ${isActive ? 'text-secondary' : 'text-primary'}`}
                  />
                  <span className='text-xs sm:text-sm font-bold leading-tight'>{profile.label}</span>
                </button>
              )
            })}
          </div>

          {selectedProfile && (
            <div className='mt-3 p-3.5 rounded-xl bg-tablebg/80 border border-secondary/30 flex items-center justify-between text-xs sm:text-sm text-lightsky animate-fadeIn'>
              <div className='flex items-center gap-2'>
                <Icon icon='solar:check-circle-bold' className='text-secondary text-lg shrink-0' />
                <span>
                  {PROFILE_RECOMMENDATIONS.find((p) => p.id === selectedProfile)?.description}
                </span>
              </div>
              <button
                onClick={() => setSelectedProfile(null)}
                className='text-secondary hover:underline text-xs shrink-0 ml-3 font-semibold cursor-pointer'>
                Réinitialiser
              </button>
            </div>
          )}
        </div>

        {/* Billing Cycle Toggle (Mensuel / Annuel) */}
        <div className='flex items-center justify-center mb-10 sm:mb-14'>
          <div className='inline-flex items-center p-1.5 rounded-2xl bg-darkmode border border-border/80 shadow-xl'>
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer min-h-[44px] ${
                !isAnnual
                  ? 'bg-tablebg text-white shadow-md border border-border'
                  : 'text-lightblue hover:text-white'
              }`}>
              Paiement Mensuel
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer min-h-[44px] ${
                isAnnual
                  ? 'bg-linear-to-r from-primary to-secondary text-white shadow-lg shadow-primary/25'
                  : 'text-lightblue hover:text-white'
              }`}>
              <span>Paiement Annuel</span>
              <span className='px-2 py-0.5 rounded-full bg-gold-soft text-[#061B14] text-[10px] sm:text-xs font-black uppercase tracking-wide'>
                -17% (2 mois offerts)
              </span>
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* MOBILE ERGONOMIC VIEW (< 768px): TABBED THUMB-ZONE DESIGN */}
        {/* ========================================================= */}
        <div className='block md:hidden mb-12'>
          {/* Mobile Tab Selector Bar */}
          <div className='grid grid-cols-4 gap-1.5 p-1.5 rounded-2xl bg-darkmode border border-border/90 mb-5 shadow-lg'>
            {PRICING_PLANS.map((plan) => {
              const isSelected = plan.code === mobilePlanCode
              return (
                <button
                  key={plan.id}
                  onClick={() => setMobilePlanCode(plan.code)}
                  className={`py-2.5 px-1 rounded-xl text-center text-xs font-black transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 min-h-[52px] ${
                    isSelected
                      ? 'bg-secondary text-[#061B14] shadow-md scale-[1.02]'
                      : 'text-lightblue hover:text-white bg-transparent'
                  }`}>
                  <span className='truncate w-full'>
                    {plan.code === 'FREE'
                      ? 'Gratuit'
                      : plan.code === 'ESSENTIEL'
                      ? 'Essentiel'
                      : plan.code === 'PRO'
                      ? 'Pro ⭐'
                      : 'Business'}
                  </span>
                  <span className={`text-[10px] font-bold ${isSelected ? 'text-[#061B14]/80' : 'text-lightblue/70'}`}>
                    {plan.freeForever ? '0 F' : `${isAnnual ? Math.round(plan.priceYearly / 1000) + 'k' : Math.round(plan.priceMonthly / 1000) + 'k'}`}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Active Mobile Plan Card */}
          <div
            className={`rounded-3xl p-6 relative overflow-hidden transition-all shadow-2xl border-2 ${
              activeMobilePlan.popular
                ? 'bg-linear-to-b from-[#13382C] via-darkmode to-darkmode border-secondary shadow-secondary/20'
                : 'bg-darkmode border-border'
            }`}>
            {/* Top Badge */}
            {activeMobilePlan.popular ? (
              <div className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-linear-to-r from-secondary to-gold-soft text-[#061B14] text-[11px] font-black uppercase tracking-wider mb-3 shadow'>
                <Icon icon='solar:star-bold' />
                <span>Formule la Plus Plébiscitée</span>
              </div>
            ) : activeMobilePlan.freeForever ? (
              <div className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold uppercase tracking-wider mb-3 border border-emerald-500/30'>
                <Icon icon='solar:bolt-bold' />
                <span>100% Autonome & Illimité</span>
              </div>
            ) : null}

            <div className='flex items-baseline justify-between mb-2'>
              <h3 className='text-2xl font-black text-white'>{activeMobilePlan.name}</h3>
              <div className='text-right'>
                <span className='text-2xl font-black text-white'>
                  {activeMobilePlan.freeForever
                    ? '0 FCFA'
                    : `${formatPrice(isAnnual ? activeMobilePlan.priceYearly : activeMobilePlan.priceMonthly)} F`}
                </span>
                <span className='block text-[11px] text-lightblue'>
                  {activeMobilePlan.freeForever ? 'À vie' : isAnnual ? '/ an (2 mois offerts)' : '/ mois'}
                </span>
              </div>
            </div>

            <p className='text-xs text-lightblue mb-4'>{activeMobilePlan.tagline}</p>

            {/* Quotas Badges */}
            <div className='grid grid-cols-3 gap-1.5 py-2.5 mb-5 bg-body-bg/80 rounded-xl px-2 border border-border/80 text-center text-[11px] font-semibold text-white'>
              <div>
                <Icon icon='solar:shop-2-bold' className='mx-auto text-primary text-sm mb-0.5' />
                <span>{activeMobilePlan.quotas.shops}</span>
              </div>
              <div>
                <Icon icon='solar:users-group-rounded-bold' className='mx-auto text-secondary text-sm mb-0.5' />
                <span>{activeMobilePlan.quotas.users}</span>
              </div>
              <div>
                <Icon icon='solar:bolt-bold' className='mx-auto text-gold-soft text-sm mb-0.5' />
                <span>{activeMobilePlan.quotas.mode}</span>
              </div>
            </div>

            {/* Feature List */}
            <div className='space-y-2 mb-6 text-xs'>
              {activeMobilePlan.keyFeatures.map((feat, idx) => (
                <div key={idx} className='flex items-start gap-2'>
                  <Icon
                    icon='solar:check-circle-bold'
                    className={`text-base shrink-0 mt-0.5 ${feat.highlight ? 'text-secondary' : 'text-primary'}`}
                  />
                  <span className={feat.highlight ? 'text-white font-bold' : 'text-lightblue'}>
                    {feat.text}
                    {feat.badge && (
                      <span className='ml-1.5 px-1.5 py-0.2 rounded text-[9px] font-bold bg-primary/25 text-white border border-primary/40'>
                        {feat.badge}
                      </span>
                    )}
                  </span>
                </div>
              ))}
            </div>

            {/* Mobile Direct Action Button (Opens Checkout Modal) */}
            <button
              onClick={() => handleOpenCheckout(activeMobilePlan)}
              className={`w-full py-4 px-5 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-xl cursor-pointer transition-all min-h-[48px] ${
                activeMobilePlan.popular
                  ? 'bg-linear-to-r from-secondary via-gold-soft to-secondary text-[#061B14] shadow-secondary/25'
                  : activeMobilePlan.freeForever
                  ? 'bg-primary text-white shadow-primary/25'
                  : 'bg-tablebg hover:bg-border text-white border border-secondary/60'
              }`}>
              <Icon
                icon={
                  activeMobilePlan.freeForever
                    ? 'solar:download-square-bold'
                    : activeMobilePlan.popular
                    ? 'solar:star-bold'
                    : 'solar:card-2-bold'
                }
                className='text-xl'
              />
              <span>
                {activeMobilePlan.freeForever
                  ? 'Démarrer Gratuitement'
                  : `Choisir ${activeMobilePlan.name.replace('ARIKE ', '')} (Essai 14j)`}
              </span>
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* DESKTOP & TABLET GRID (>= 768px): FULL 4 CARDS SHOWCASE */}
        {/* ========================================================= */}
        <div className='hidden md:grid md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8 items-stretch mb-16'>
          {PRICING_PLANS.map((plan: PricingPlan) => {
            const isRecommended = recommendedCode === plan.code
            const price = isAnnual ? plan.priceYearly : plan.priceMonthly
            const monthlyEquivalent = isAnnual && plan.priceYearly > 0 ? Math.round(plan.priceYearly / 12) : plan.priceMonthly

            return (
              <div
                key={plan.id}
                className={`relative flex flex-col rounded-3xl transition-all duration-300 ${
                  plan.popular
                    ? 'bg-linear-to-b from-[#13382C] via-darkmode to-darkmode border-2 border-secondary shadow-2xl shadow-secondary/20 xl:-translate-y-2'
                    : isRecommended
                    ? 'bg-tablebg border-2 border-primary shadow-xl shadow-primary/25'
                    : 'bg-darkmode/90 border border-border hover:border-primary/50 hover:shadow-xl'
                }`}>
                {/* Popular or Recommended Top Badge */}
                {plan.popular && (
                  <div className='absolute -top-3.5 left-1/2 -translate-x-1/2'>
                    <div className='flex items-center gap-1.5 px-4 py-1 rounded-full bg-linear-to-r from-secondary via-gold-soft to-secondary text-[#061B14] text-xs font-black uppercase tracking-wider shadow-lg'>
                      <Icon icon='solar:star-bold' className='text-sm' />
                      <span>Le Plus Populaire</span>
                    </div>
                  </div>
                )}

                {isRecommended && !plan.popular && (
                  <div className='absolute -top-3.5 left-1/2 -translate-x-1/2'>
                    <div className='flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary text-white text-xs font-bold uppercase tracking-wider shadow-md'>
                      <Icon icon='solar:check-circle-bold' className='text-sm' />
                      <span>Conseillé pour vous</span>
                    </div>
                  </div>
                )}

                <div className='p-6 sm:p-7 flex flex-col flex-1'>
                  {/* Plan Name & Target */}
                  <div className='mb-4'>
                    <h3 className='text-2xl font-bold text-white mb-1.5'>{plan.name}</h3>
                    <p className='text-xs text-lightblue font-medium line-clamp-2 min-h-[32px]'>
                      {plan.tagline}
                    </p>
                  </div>

                  {/* Pricing Display */}
                  <div className='py-4 my-2 border-y border-border/70 flex flex-col justify-center min-h-[105px]'>
                    {plan.freeForever ? (
                      <div>
                        <div className='flex items-baseline gap-2'>
                          <span className='text-4xl font-extrabold text-white'>0 FCFA</span>
                          <span className='text-sm text-lightblue font-medium'>/ À vie</span>
                        </div>
                        <span className='text-xs text-secondary font-semibold mt-1 inline-block'>
                          Sans carte bancaire • 100% Hors-Ligne
                        </span>
                      </div>
                    ) : (
                      <div>
                        <div className='flex items-baseline gap-1.5'>
                          <span className='text-3.5xl sm:text-4xl font-extrabold text-white'>
                            {formatPrice(price)}
                          </span>
                          <span className='text-xs sm:text-sm text-lightblue font-medium'>
                            FCFA {isAnnual ? '/ an' : '/ mois'}
                          </span>
                        </div>

                        {isAnnual ? (
                          <div className='mt-1.5 flex items-center gap-1.5'>
                            <span className='text-xs text-gold-soft font-semibold'>
                              Soit {formatPrice(monthlyEquivalent)} F/mois
                            </span>
                            <span className='text-[10px] px-1.5 py-0.5 rounded bg-secondary/20 text-secondary font-bold'>
                              2 mois offerts
                            </span>
                          </div>
                        ) : (
                          <div className='mt-1 text-xs text-lightblue'>
                            Facturé par Mobile Money (MTN, Moov, Celtiis)
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Quotas Badges */}
                  <div className='grid grid-cols-3 gap-1.5 py-3 mb-4 bg-body-bg/60 rounded-xl px-2.5 border border-border/60 text-center text-[11px] font-medium text-lightblue'>
                    <div className='truncate' title={plan.quotas.shops}>
                      <Icon icon='solar:shop-2-bold' className='mx-auto mb-0.5 text-primary text-sm' />
                      <span className='block text-white font-bold truncate'>{plan.quotas.shops}</span>
                    </div>
                    <div className='truncate' title={plan.quotas.users}>
                      <Icon icon='solar:users-group-rounded-bold' className='mx-auto mb-0.5 text-secondary text-sm' />
                      <span className='block text-white font-bold truncate'>{plan.quotas.users}</span>
                    </div>
                    <div className='truncate' title={plan.quotas.mode}>
                      <Icon icon='solar:bolt-bold' className='mx-auto mb-0.5 text-gold-soft text-sm' />
                      <span className='block text-white font-bold truncate'>{plan.quotas.mode}</span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className='space-y-2.5 mb-8 flex-1'>
                    <div className='text-xs font-bold text-lightsky uppercase tracking-wider mb-2'>
                      Avantages inclus :
                    </div>
                    {plan.keyFeatures.map((feat, idx) => (
                      <div key={idx} className='flex items-start gap-2.5 text-xs sm:text-sm leading-snug'>
                        <Icon
                          icon='solar:check-circle-bold'
                          className={`text-base shrink-0 mt-0.5 ${
                            feat.highlight
                              ? 'text-secondary'
                              : 'text-primary'
                          }`}
                        />
                        <span className={feat.highlight ? 'text-white font-semibold' : 'text-lightblue'}>
                          {feat.text}
                          {feat.badge && (
                            <span className='ml-1.5 px-1.5 py-0.2 rounded text-[10px] font-bold bg-primary/25 text-white border border-primary/40'>
                              {feat.badge}
                            </span>
                          )}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button -> Opens Interactive Checkout Modal */}
                  <div className='pt-2'>
                    <button
                      onClick={() => handleOpenCheckout(plan)}
                      className={`w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer min-h-[48px] ${
                        plan.freeForever
                          ? 'text-white border border-primary/50 bg-primary/20 hover:bg-primary shadow-md'
                          : plan.popular
                          ? 'text-[#061B14] bg-linear-to-r from-secondary via-gold-soft to-secondary hover:brightness-110 shadow-lg shadow-secondary/25'
                          : 'text-white bg-tablebg hover:bg-border border border-border hover:border-secondary'
                      }`}>
                      <Icon
                        icon={
                          plan.freeForever
                            ? 'solar:download-square-bold'
                            : plan.popular
                            ? 'solar:star-bold'
                            : 'solar:card-2-bold'
                        }
                        className='text-lg'
                      />
                      <span>
                        {plan.freeForever
                          ? 'Démarrer Gratuitement'
                          : plan.popular
                          ? 'Passer à ARIKE Pro ⭐'
                          : `Activer ${plan.name.replace('ARIKE ', '')}`}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* ========================================================= */}
        {/* ARCHITECTURE DE BASE DE DONNÉES & GARANTIES DU MODÈLE FREEMIUM */}
        {/* ========================================================= */}
        <div className='mb-20 rounded-3xl bg-darkmode/70 border border-border p-6 sm:p-10 relative overflow-hidden shadow-2xl'>
          <div className='text-center max-w-3xl mx-auto mb-8'>
            <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/40 text-primary text-xs font-bold uppercase tracking-wider mb-3'>
              <Icon icon='solar:server-square-bold' className='text-base' />
              <span>Architecture de Données Robuste & Modèle Freemium</span>
            </div>
            <h3 className='text-2xl sm:text-3xl font-extrabold text-white mb-3'>
              Vos Données Vous Appartiennent. Zéro Blocage de Caisse.
            </h3>
            <p className='text-lightblue text-xs sm:text-sm leading-relaxed'>
              Contrairement aux logiciels cloud traditionnels qui coupent vos ventes dès la moindre panne réseau, ARIKE est bâti sur une architecture hybride pensée pour le terrain en Afrique.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {/* Pillar 1 */}
            <div className='p-5 rounded-2xl bg-tablebg/80 border border-border flex flex-col justify-between'>
              <div>
                <div className='size-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-2xl mb-4 border border-emerald-500/30'>
                  <Icon icon='solar:database-bold' />
                </div>
                <h4 className='text-lg font-bold text-white mb-2'>1. SQLite Local Offline-First</h4>
                <p className='text-xs text-lightblue leading-relaxed'>
                  Toutes vos ventes, dettes clients et stocks s’écrivent d’abord dans la mémoire locale de votre appareil. Aucune coupure de 4G, fibre ou courant ne bloque vos encaissements.
                </p>
              </div>
              <div className='mt-4 pt-3 border-t border-border/60 text-[11px] font-bold text-emerald-400 flex items-center gap-1.5'>
                <Icon icon='solar:check-circle-bold' />
                <span>100% Fonctionnel sans Internet</span>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className='p-5 rounded-2xl bg-tablebg/80 border border-border flex flex-col justify-between'>
              <div>
                <div className='size-12 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-2xl mb-4 border border-cyan-500/30'>
                  <Icon icon='solar:cloud-upload-bold' />
                </div>
                <h4 className='text-lg font-bold text-white mb-2'>2. Cloud Sync Chiffré</h4>
                <p className='text-xs text-lightblue leading-relaxed'>
                  Dès qu’une connexion Internet est détectée, les données sont synchronisées de manière sécurisée et bidirectionnelle avec le Cloud Supabase. Vos données sont protégées contre la perte ou le vol.
                </p>
              </div>
              <div className='mt-4 pt-3 border-t border-border/60 text-[11px] font-bold text-cyan-400 flex items-center gap-1.5'>
                <Icon icon='solar:shield-check-bold' />
                <span>Restauration 1 clic sur nouvel appareil</span>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className='p-5 rounded-2xl bg-tablebg/80 border border-border flex flex-col justify-between'>
              <div>
                <div className='size-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-2xl mb-4 border border-amber-500/30'>
                  <Icon icon='solar:refresh-circle-bold' />
                </div>
                <h4 className='text-lg font-bold text-white mb-2'>3. Rétrogradation Douce</h4>
                <p className='text-xs text-lightblue leading-relaxed'>
                  Si vous décidez d’interrompre votre abonnement Pro ou Business, votre application bascule automatiquement sur le forfait Gratuit. Vous ne perdez aucune donnée et continuez de vendre normalement.
                </p>
              </div>
              <div className='mt-4 pt-3 border-t border-border/60 text-[11px] font-bold text-gold-soft flex items-center gap-1.5'>
                <Icon icon='solar:lock-unlocked-bold' />
                <span>Zéro Prise d’Otage de vos Données</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enterprise & Large Networks Banner */}
        <div className='mb-20 rounded-3xl bg-linear-to-r from-darkmode via-tablebg to-darkmode border border-border/90 p-8 sm:p-10 relative overflow-hidden shadow-2xl'>
          <div className='relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6'>
            <div className='max-w-2xl text-center lg:text-left'>
              <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/15 border border-secondary/30 text-secondary text-xs font-bold uppercase tracking-wider mb-3'>
                <Icon icon='solar:crown-bold' className='text-sm' />
                <span>Grands Réseaux, Coopératives & Franchises</span>
              </div>
              <h3 className='text-2xl sm:text-3xl font-extrabold text-white mb-3'>
                Besoin d’une Solution Sur Mesure pour + de 5 Boutiques ?
              </h3>
              <p className='text-lightblue text-sm sm:text-base leading-relaxed'>
                Bénéficiez de quotas illimités, d’intégrations personnalisées avec vos systèmes comptables et bancaires, d’un gestionnaire de compte dédié et de la formation de l’ensemble de votre personnel sur site.
              </p>
            </div>

            <div className='shrink-0 flex flex-col sm:flex-row items-center gap-3'>
              <a
                href={`https://wa.me/${OFFICIAL_PHONE}?text=${encodeURIComponent(
                  'Bonjour ARIKE, je représente un réseau commercial et souhaite un devis personnalisé pour le forfait Enterprise.'
                )}`}
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-2 py-3.5 px-7 rounded-xl text-sm font-bold text-white bg-linear-to-r from-primary to-secondary hover:from-secondary hover:to-primary shadow-xl shadow-primary/20 transition-all cursor-pointer min-h-[48px]'>
                <Icon icon='solar:handshake-bold' className='text-xl' />
                <span>Demander un Devis Enterprise</span>
              </a>
            </div>
          </div>
        </div>

        {/* Hardware Packs Section (Packs Matériels) */}
        <div className='mb-20'>
          <div className='text-center max-w-2xl mx-auto mb-10'>
            <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/40 text-primary text-xs font-bold uppercase tracking-wider mb-3'>
              <Icon icon='solar:printer-bold' className='text-base text-primary' />
              <span>Packs Matériels Clé en Main</span>
            </div>
            <h3 className='text-2xl sm:text-3xl font-extrabold text-white mb-3'>
              Équipez votre Caisse à Prix Accessible
            </h3>
            <p className='text-lightblue text-sm sm:text-base'>
              Pas de caisse coûteuse à acheter. Nos imprimantes thermiques Bluetooth et smartphones configurés sont livrés prêts à l’emploi avec abonnement Pro offert.
            </p>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto'>
            {HARDWARE_PACKS.map((pack) => (
              <div
                key={pack.id}
                className='rounded-3xl bg-darkmode border border-border p-7 sm:p-8 flex flex-col justify-between hover:border-secondary/60 transition-all duration-300 shadow-xl relative overflow-hidden group'>
                <div className='absolute top-0 right-0 w-36 h-36 bg-secondary/10 rounded-full blur-2xl pointer-events-none group-hover:bg-secondary/20 transition-all' />

                <div>
                  <div className='flex items-center justify-between mb-4'>
                    <span className='px-3 py-1 rounded-full bg-secondary/20 text-secondary text-xs font-bold uppercase tracking-wider border border-secondary/30'>
                      {pack.badge}
                    </span>
                    <div className='text-2xl sm:text-3xl font-black text-white'>
                      {pack.price}
                    </div>
                  </div>

                  <h4 className='text-xl font-bold text-white mb-2'>{pack.name}</h4>
                  <p className='text-xs sm:text-sm text-lightblue mb-6 leading-relaxed'>
                    {pack.description}
                  </p>

                  <div className='space-y-2.5 mb-6'>
                    <div className='text-xs font-bold text-lightsky uppercase tracking-wider'>
                      Contenu du pack :
                    </div>
                    {pack.items.map((item, i) => (
                      <div key={i} className='flex items-center gap-2.5 text-xs sm:text-sm text-lightblue'>
                        <Icon icon='solar:box-bold' className='text-secondary text-base shrink-0' />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Bonus Tag */}
                  <div className='p-3.5 rounded-xl bg-tablebg border border-gold-soft/40 text-gold-soft text-xs sm:text-sm font-bold mb-6 flex items-center gap-2'>
                    <span>{pack.bonus}</span>
                  </div>
                </div>

                <a
                  href={pack.ctaHref}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl text-sm font-bold text-white bg-linear-to-r from-primary to-secondary hover:from-secondary hover:to-primary transition-all duration-200 shadow-lg shadow-primary/20 cursor-pointer min-h-[48px]'>
                  <Icon icon='logos:whatsapp-icon' className='text-lg' />
                  <span>Commander le Pack par WhatsApp ({OFFICIAL_PHONE_DISPLAY})</span>
                </a>
              </div>
            ))}
          </div>

          <div className='mt-6 text-center text-xs text-lightblue flex items-center justify-center gap-4 flex-wrap'>
            <span className='flex items-center gap-1.5'>
              <Icon icon='solar:delivery-bold' className='text-secondary text-base' />
              Livraison express à Cotonou, Calavi, Porto-Novo, Parakou
            </span>
            <span>•</span>
            <span className='flex items-center gap-1.5'>
              <Icon icon='solar:shield-check-bold' className='text-primary text-base' />
              Garantie matériel 6 mois échange standard
            </span>
          </div>
        </div>

        {/* Collapsible Feature Comparison Matrix */}
        <div className='mb-20'>
          <div className='text-center mb-8'>
            <button
              onClick={() => setShowMatrix(!showMatrix)}
              className='inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-darkmode border border-border hover:border-secondary text-white font-bold text-sm sm:text-base transition-all duration-200 cursor-pointer shadow-lg min-h-[48px]'>
              <Icon
                icon={showMatrix ? 'solar:alt-arrow-up-bold' : 'solar:checklist-minimalistic-bold'}
                className='text-secondary text-xl'
              />
              <span>
                {showMatrix
                  ? 'Masquer le Tableau Comparatif Détaillé'
                  : 'Afficher le Tableau Comparatif Détaillé des 25+ Fonctionnalités'}
              </span>
              <Icon
                icon='solar:alt-arrow-down-bold'
                className={`text-lightblue transition-transform duration-200 ${
                  showMatrix ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>

          {showMatrix && (
            <div className='rounded-3xl bg-darkmode border border-border p-4 sm:p-8 shadow-2xl animate-fadeIn'>
              
              {/* Mobile Filter: Choose which plan to compare with GRATUIT */}
              <div className='block sm:hidden mb-4 p-3 rounded-2xl bg-tablebg border border-border'>
                <span className='block text-xs font-bold text-lightblue mb-2'>
                  Comparer GRATUIT avec :
                </span>
                <div className='grid grid-cols-3 gap-1.5'>
                  {(['essentiel', 'pro', 'business'] as const).map((pCode) => (
                    <button
                      key={pCode}
                      onClick={() => setMatrixMobilePlan(pCode)}
                      className={`py-1.5 px-2 rounded-xl text-xs font-bold capitalize transition-all ${
                        matrixMobilePlan === pCode
                          ? 'bg-secondary text-[#061B14]'
                          : 'bg-darkmode text-lightblue border border-border'
                      }`}>
                      {pCode === 'pro' ? 'Pro ⭐' : pCode}
                    </button>
                  ))}
                </div>
              </div>

              {/* Responsive Table */}
              <div className='overflow-x-auto'>
                <table className='w-full text-left text-sm min-w-[600px] sm:min-w-[700px]'>
                  <thead>
                    <tr className='border-b border-border/80 text-xs uppercase tracking-wider text-lightblue'>
                      <th className='pb-4 font-bold w-2/5'>Fonctionnalités & Modules</th>
                      <th className='pb-4 font-bold text-center w-[15%] text-emerald-400'>GRATUIT</th>
                      <th className='pb-4 font-bold text-center w-[15%] text-cyan-400'>ESSENTIEL</th>
                      <th className='pb-4 font-bold text-center w-[15%] text-amber-400'>PRO ⭐</th>
                      <th className='pb-4 font-bold text-center w-[15%] text-orange-400'>BUSINESS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARISON_CATEGORIES.map((cat, catIdx) => (
                      <React.Fragment key={catIdx}>
                        <tr className='bg-tablebg/70'>
                          <td
                            colSpan={5}
                            className='py-3 px-3 font-extrabold text-xs uppercase text-gold-soft tracking-wider rounded-lg'>
                            {cat.categoryName}
                          </td>
                        </tr>
                        {cat.rows.map((row, rowIdx) => (
                          <tr
                            key={rowIdx}
                            className='border-b border-border/40 hover:bg-body-bg/40 transition-colors'>
                            <td className='py-3.5 px-3 font-medium text-white'>
                              <div className='flex items-center gap-1.5'>
                                <span>{row.feature}</span>
                                {row.tooltip && (
                                  <span
                                    title={row.tooltip}
                                    className='cursor-help text-lightblue text-xs'>
                                    ⓘ
                                  </span>
                                )}
                              </div>
                            </td>

                            {/* Free */}
                            <td className='py-3.5 px-2 text-center'>
                              {typeof row.free === 'boolean' ? (
                                row.free ? (
                                  <Icon icon='solar:check-circle-bold' className='text-emerald-400 text-lg mx-auto' />
                                ) : (
                                  <span className='text-gray-500 font-bold'>—</span>
                                )
                              ) : (
                                <span className='text-xs font-semibold text-lightblue'>{row.free}</span>
                              )}
                            </td>

                            {/* Essentiel */}
                            <td className='py-3.5 px-2 text-center'>
                              {typeof row.essentiel === 'boolean' ? (
                                row.essentiel ? (
                                  <Icon icon='solar:check-circle-bold' className='text-cyan-400 text-lg mx-auto' />
                                ) : (
                                  <span className='text-gray-500 font-bold'>—</span>
                                )
                              ) : (
                                <span className='text-xs font-semibold text-lightblue'>{row.essentiel}</span>
                              )}
                            </td>

                            {/* Pro */}
                            <td className='py-3.5 px-2 text-center bg-secondary/5 font-bold'>
                              {typeof row.pro === 'boolean' ? (
                                row.pro ? (
                                  <Icon icon='solar:check-circle-bold' className='text-amber-400 text-lg mx-auto' />
                                ) : (
                                  <span className='text-gray-500 font-bold'>—</span>
                                )
                              ) : (
                                <span className='text-xs font-bold text-amber-300'>{row.pro}</span>
                              )}
                            </td>

                            {/* Business */}
                            <td className='py-3.5 px-2 text-center'>
                              {typeof row.business === 'boolean' ? (
                                row.business ? (
                                  <Icon icon='solar:check-circle-bold' className='text-orange-400 text-lg mx-auto' />
                                ) : (
                                  <span className='text-gray-500 font-bold'>—</span>
                                )
                              ) : (
                                <span className='text-xs font-bold text-orange-300'>{row.business}</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Pricing Specific FAQ & Guarantees */}
        <div className='max-w-4xl mx-auto'>
          {/* Trust Guarantees Badges */}
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12'>
            <div className='flex items-center gap-3 p-4 rounded-2xl bg-darkmode border border-border'>
              <div className='size-11 rounded-xl bg-primary/20 text-primary flex items-center justify-center shrink-0'>
                <Icon icon='solar:card-2-bold' className='text-2xl' />
              </div>
              <div>
                <div className='text-sm font-bold text-white'>100% Mobile Money</div>
                <div className='text-xs text-lightblue'>MTN, Moov, Celtiis sans carte</div>
              </div>
            </div>

            <div className='flex items-center gap-3 p-4 rounded-2xl bg-darkmode border border-border'>
              <div className='size-11 rounded-xl bg-secondary/20 text-secondary flex items-center justify-center shrink-0'>
                <Icon icon='solar:lock-unlocked-bold' className='text-2xl' />
              </div>
              <div>
                <div className='text-sm font-bold text-white'>Zéro Engagement</div>
                <div className='text-xs text-lightblue'>Arrêtez ou changez quand vous voulez</div>
              </div>
            </div>

            <div className='flex items-center gap-3 p-4 rounded-2xl bg-darkmode border border-border'>
              <div className='size-11 rounded-xl bg-gold-soft/20 text-gold-soft flex items-center justify-center shrink-0'>
                <Icon icon='solar:shield-check-bold' className='text-2xl' />
              </div>
              <div>
                <div className='text-sm font-bold text-white'>Données Préservées</div>
                <div className='text-xs text-lightblue'>Retour en gratuit sans perte de données</div>
              </div>
            </div>
          </div>

          {/* Pricing FAQ Accordion */}
          <div className='rounded-3xl bg-darkmode border border-border p-6 sm:p-8 shadow-xl'>
            <h4 className='text-xl font-bold text-white mb-6 flex items-center gap-2'>
              <Icon icon='solar:question-circle-bold' className='text-secondary text-2xl' />
              <span>Questions Fréquentes sur les Tarifs & Abonnements</span>
            </h4>

            <div className='space-y-3.5'>
              {PRICING_FAQ.map((faq, idx) => {
                const isOpen = openFaqIndex === idx
                return (
                  <div
                    key={idx}
                    className='rounded-xl border border-border/70 bg-body-bg/70 overflow-hidden transition-colors'>
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className='w-full flex items-center justify-between p-4 text-left text-sm sm:text-base font-bold text-white cursor-pointer hover:text-secondary gap-3 min-h-[48px]'>
                      <span>{faq.q}</span>
                      <Icon
                        icon='solar:alt-arrow-down-bold'
                        className={`text-lg text-secondary shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className='px-4 pb-4 text-xs sm:text-sm text-lightblue font-normal leading-relaxed border-t border-border/40 pt-3 animate-fadeIn'>
                        {faq.a}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Subscription & Checkout Modal */}
      <SubscriptionCheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        initialPlan={selectedPlanForCheckout}
        allPlans={PRICING_PLANS}
        isAnnual={isAnnual}
        onToggleAnnual={setIsAnnual}
      />
    </section>
  )
}

export default Pricing
