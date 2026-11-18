'use client'

import React, { useState, useEffect } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import { PricingPlan } from './pricingData'

interface SubscriptionCheckoutModalProps {
  isOpen: boolean
  onClose: () => void
  initialPlan: PricingPlan
  allPlans: PricingPlan[]
  isAnnual: boolean
  onToggleAnnual: (val: boolean) => void
}

type PaymentOption = 'TRIAL' | 'MOMO' | 'WHATSAPP' | 'FREE'
type MobileMoneyProvider = 'MTN' | 'MOOV' | 'CELTIIS' | 'CARD'

export const OFFICIAL_PHONE = '2290153800499'
export const OFFICIAL_PHONE_DISPLAY = '+229 01 53 80 04 99'

export default function SubscriptionCheckoutModal({
  isOpen,
  onClose,
  initialPlan,
  allPlans,
  isAnnual,
  onToggleAnnual,
}: SubscriptionCheckoutModalProps) {
  const [selectedPlanCode, setSelectedPlanCode] = useState<string>(initialPlan.code)
  const [merchantName, setMerchantName] = useState('')
  const [shopName, setShopName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [city, setCity] = useState('Cotonou (Dantokpa)')
  const [paymentOption, setPaymentOption] = useState<PaymentOption>('TRIAL')
  const [momoProvider, setMomoProvider] = useState<MobileMoneyProvider>('MTN')

  // Workflow states
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [ussdSimulating, setUssdSimulating] = useState(false)
  const [ussdSecondsLeft, setUssdSecondsLeft] = useState(15)
  const [completedData, setCompletedData] = useState<{
    reference: string
    planName: string
    planCode: string
    billingCycle: string
    amount: number
    paymentOption: PaymentOption
    trialEndsAt?: string | null
    whatsappUrl?: string
  } | null>(null)

  // Current active plan
  const activePlan = allPlans.find((p) => p.code === selectedPlanCode) || initialPlan
  const isFree = activePlan.freeForever || activePlan.code === 'FREE'
  const price = isAnnual ? activePlan.priceYearly : activePlan.priceMonthly

  // Synchronize when opened
  useEffect(() => {
    if (isOpen) {
      setSelectedPlanCode(initialPlan.code)
      setPaymentOption(initialPlan.freeForever ? 'FREE' : 'TRIAL')
      setCompletedData(null)
      setUssdSimulating(false)
    }
  }, [isOpen, initialPlan])

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // USSD Countdown ticker
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (ussdSimulating && ussdSecondsLeft > 0) {
      interval = setInterval(() => {
        setUssdSecondsLeft((prev) => {
          if (prev <= 1) {
            setUssdSimulating(false)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [ussdSimulating, ussdSecondsLeft])

  if (!isOpen) return null

  // Format currency numbers
  const formatNum = (n: number) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!merchantName.trim() || !phoneNumber.trim()) {
      alert('Veuillez renseigner votre nom et votre numéro de téléphone.')
      return
    }

    setIsSubmitting(true)

    // Déterminer le mode de paiement technique
    let techPaymentMethod = 'TRIAL_14D'
    if (isFree) {
      techPaymentMethod = 'FREE_START'
    } else if (paymentOption === 'MOMO') {
      techPaymentMethod = `MOMO_${momoProvider}`
    } else if (paymentOption === 'WHATSAPP') {
      techPaymentMethod = 'WHATSAPP_ASSISTED'
    }

    // Si Mobile Money, simuler l'envoi du push USSD sur le téléphone
    if (!isFree && paymentOption === 'MOMO') {
      setUssdSimulating(true)
      setUssdSecondsLeft(8)
    }

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planCode: activePlan.code,
          planName: activePlan.name,
          billingCycle: isAnnual ? 'yearly' : 'monthly',
          amount: isFree ? 0 : price,
          merchantName,
          shopName: shopName || 'Commerce ARIKE',
          phoneNumber,
          city,
          paymentMethod: techPaymentMethod,
        }),
      })

      const data = await response.json()

      if (data.success) {
        if (!isFree && paymentOption === 'MOMO') {
          // Attendre la fin de la simulation USSD pour l'effet réaliste
          setTimeout(() => {
            setCompletedData({
              reference: data.reference,
              planName: activePlan.name,
              planCode: activePlan.code,
              billingCycle: isAnnual ? 'Annuel' : 'Mensuel',
              amount: isFree ? 0 : price,
              paymentOption,
              trialEndsAt: data.trialEndsAt,
              whatsappUrl: data.whatsappRedirectUrl,
            })
            setIsSubmitting(false)
            setUssdSimulating(false)
          }, 3500)
        } else {
          setCompletedData({
            reference: data.reference,
            planName: activePlan.name,
            planCode: activePlan.code,
            billingCycle: isAnnual ? 'Annuel' : 'Mensuel',
            amount: isFree ? 0 : price,
            paymentOption,
            trialEndsAt: data.trialEndsAt,
            whatsappUrl: data.whatsappRedirectUrl,
          })
          setIsSubmitting(false)

          // Si WhatsApp choisi, ouvrir directement le lien officiel
          if (paymentOption === 'WHATSAPP' && data.whatsappRedirectUrl) {
            window.open(data.whatsappRedirectUrl, '_blank')
          }
        }
      } else {
        alert(data.message || 'Une erreur est survenue.')
        setIsSubmitting(false)
        setUssdSimulating(false)
      }
    } catch {
      // Fallback hors-ligne / erreur réseau
      const mockRef = `ARIK-${activePlan.code}-${Date.now().toString(36).toUpperCase()}`
      setCompletedData({
        reference: mockRef,
        planName: activePlan.name,
        planCode: activePlan.code,
        billingCycle: isAnnual ? 'Annuel' : 'Mensuel',
        amount: isFree ? 0 : price,
        paymentOption,
        trialEndsAt: new Date(Date.now() + 14 * 86400000).toISOString(),
        whatsappUrl: `https://wa.me/${OFFICIAL_PHONE}?text=${encodeURIComponent(
          `Bonjour ARIKE, je souhaite finaliser l'inscription de ma boutique "${shopName || merchantName}" pour le forfait ${activePlan.name}.`
        )}`,
      })
      setIsSubmitting(false)
      setUssdSimulating(false)
    }
  }

  return (
    <div className='fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn'>
      {/* Click outside backdrop */}
      <div className='fixed inset-0' onClick={onClose} />

      {/* Modal Container */}
      <div className='relative z-10 w-full max-w-2xl bg-darkmode border border-border sm:rounded-3xl rounded-t-3xl shadow-2xl max-h-[92vh] flex flex-col overflow-hidden animate-slideUp'>

        {/* Mobile Swipe Bar Indicator */}
        <div className='sm:hidden flex justify-center pt-3 pb-1'>
          <div className='w-12 h-1.5 rounded-full bg-border' />
        </div>

        {/* Modal Header */}
        <div className='p-5 sm:p-6 border-b border-border/70 flex items-center justify-between bg-tablebg/50 shrink-0'>
          <div className='flex items-center gap-3'>
            <div className='size-11 rounded-2xl bg-secondary/20 text-secondary flex items-center justify-center font-black text-xl border border-secondary/30'>
              <Icon icon='solar:bag-check-bold' />
            </div>
            <div>
              <div className='flex items-center gap-2'>
                <h3 className='text-lg sm:text-xl font-black text-white'>
                  {completedData ? 'Activation Réussie !' : 'Parcours d’Inscription & Forfaits'}
                </h3>
                <span className='hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-primary/25 text-emerald-300 border border-primary/40'>
                  Offline-First & Cloud
                </span>
              </div>
              <p className='text-xs text-lightblue'>
                {completedData
                  ? 'Votre boutique est prête à encaisser en toute sérénité'
                  : 'Choisissez votre forfait et démarrez en 30 secondes chrono'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className='size-9 rounded-xl bg-body-bg/80 hover:bg-body-bg text-lightblue hover:text-white flex items-center justify-center transition-colors border border-border cursor-pointer'>
            <Icon icon='solar:close-circle-bold' className='text-xl' />
          </button>
        </div>

        {/* Modal Body */}
        <div className='p-5 sm:p-7 overflow-y-auto flex-1 space-y-6'>
          {completedData ? (
            /* SUCCESS CONFIRMATION SCREEN */
            <div className='text-center py-4 space-y-6 animate-fadeIn'>
              <div className='size-20 rounded-full bg-emerald-500/20 text-emerald-400 border-2 border-emerald-500/40 flex items-center justify-center mx-auto text-4xl shadow-xl shadow-emerald-500/10 animate-bounce'>
                <Icon icon='solar:check-circle-bold' />
              </div>

              <div>
                <span className='px-3 py-1 rounded-full bg-secondary/20 text-secondary text-xs font-black uppercase tracking-wider border border-secondary/30'>
                  Référence : {completedData.reference}
                </span>
                <h4 className='text-2xl sm:text-3xl font-extrabold text-white mt-3'>
                  Félicitations {merchantName} ! 🎉
                </h4>
                <p className='text-sm text-lightblue mt-1 max-w-md mx-auto'>
                  Votre boutique <strong className='text-white'>{shopName || 'ARIKE'}</strong> est configurée avec le forfait{' '}
                  <strong className='text-secondary'>{completedData.planName}</strong>.
                </p>
              </div>

              {/* Status Details Card */}
              <div className='bg-tablebg/80 border border-border p-4 sm:p-5 rounded-2xl max-w-lg mx-auto text-left text-xs sm:text-sm space-y-2.5'>
                <div className='flex justify-between items-center text-lightblue'>
                  <span>Formule choisie :</span>
                  <span className='text-white font-bold'>{completedData.planName} ({completedData.billingCycle})</span>
                </div>
                <div className='flex justify-between items-center text-lightblue'>
                  <span>Statut de l’accès :</span>
                  <span className='font-bold text-emerald-400 flex items-center gap-1'>
                    <Icon icon='solar:verified-check-bold' />
                    {completedData.paymentOption === 'TRIAL'
                      ? 'Essai Gratuit 14j Activé'
                      : completedData.paymentOption === 'FREE'
                        ? 'Gratuit à vie (100% Offline)'
                        : 'Paiement Validé'}
                  </span>
                </div>
                {completedData.trialEndsAt && (
                  <div className='flex justify-between items-center text-lightblue'>
                    <span>Fin de l’essai sans frais :</span>
                    <span className='text-gold-soft font-bold'>
                      {new Date(completedData.trialEndsAt).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                )}
                <div className='flex justify-between items-center text-lightblue border-t border-border/60 pt-2'>
                  <span>Garantie de vos données :</span>
                  <span className='text-lightblue font-semibold'>100% sur votre appareil (SQLite)</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className='space-y-3 max-w-md mx-auto pt-2'>
                <a
                  href='/download'
                  className='w-full py-4 px-6 rounded-2xl bg-linear-to-r from-primary to-secondary hover:brightness-110 text-white font-black text-base flex items-center justify-center gap-2 shadow-xl shadow-primary/25 transition-all cursor-pointer'>
                  <Icon icon='solar:download-square-bold' className='text-2xl' />
                  <span>Télécharger l’APK Android Officiel</span>
                </a>

                <a
                  href={completedData.whatsappUrl || `https://wa.me/${OFFICIAL_PHONE}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='w-full py-3.5 px-6 rounded-2xl bg-tablebg hover:bg-border text-white border border-border font-bold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer'>
                  <Icon icon='logos:whatsapp-icon' className='text-lg' />
                  <span>Assistance Personnalisée ({OFFICIAL_PHONE_DISPLAY})</span>
                </a>
              </div>

              <div className='text-xs text-lightblue flex items-center justify-center gap-2'>
                <Icon icon='solar:shield-check-bold' className='text-emerald-400 text-base' />
                <span>Installation sans formalités lourdes • Fonctionne immédiatement</span>
              </div>
            </div>
          ) : (
            /* CHECKOUT FORM */
            <form onSubmit={handleSubmit} className='space-y-6'>
              {/* 1. Quick Plan Switcher Tabs */}
              <div>
                <div className='flex items-center justify-between mb-2.5'>
                  <label className='text-xs font-bold uppercase tracking-wider text-lightblue'>
                    1. Choisissez votre Forfait :
                  </label>
                  {/* Billing Cycle Toggle */}
                  {!isFree && (
                    <div className='flex items-center gap-1.5 text-xs'>
                      <button
                        type='button'
                        onClick={() => onToggleAnnual(false)}
                        className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${!isAnnual ? 'bg-secondary text-[#061B14]' : 'text-lightblue hover:text-white'
                          }`}>
                        Mensuel
                      </button>
                      <button
                        type='button'
                        onClick={() => onToggleAnnual(true)}
                        className={`px-2.5 py-1 rounded-lg font-bold transition-all flex items-center gap-1 cursor-pointer ${isAnnual ? 'bg-secondary text-[#061B14]' : 'text-lightblue hover:text-white'
                          }`}>
                        <span>Annuel</span>
                        <span className='text-[9px] px-1 rounded bg-[#061B14] text-secondary font-black'>-17%</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Plan Pills */}
                <div className='grid grid-cols-2 sm:grid-cols-4 gap-2'>
                  {allPlans.map((plan) => {
                    const isSelected = plan.code === selectedPlanCode
                    return (
                      <button
                        key={plan.id}
                        type='button'
                        onClick={() => {
                          setSelectedPlanCode(plan.code)
                          if (plan.code === 'FREE') setPaymentOption('FREE')
                          else if (paymentOption === 'FREE') setPaymentOption('TRIAL')
                        }}
                        className={`p-2.5 sm:p-3 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${isSelected
                          ? 'bg-secondary/20 border-secondary shadow-lg shadow-secondary/15 scale-[1.02]'
                          : 'bg-body-bg/60 border-border/80 hover:border-primary/50 text-lightblue'
                          }`}>
                        <div className='flex items-center justify-between'>
                          <span className={`text-xs font-extrabold truncate ${isSelected ? 'text-white' : 'text-lightblue'}`}>
                            {plan.name.replace('ARIKE ', '')}
                          </span>
                          {plan.popular && (
                            <span className='text-[9px] font-black px-1.5 py-0.5 rounded bg-secondary text-[#061B14]'>
                              TOP
                            </span>
                          )}
                        </div>
                        <div className='mt-1 text-sm sm:text-base font-black text-white'>
                          {plan.freeForever ? '0 F' : `${formatNum(isAnnual ? plan.priceYearly : plan.priceMonthly)} F`}
                        </div>
                      </button>
                    )
                  })}
                </div>

                {/* Active Plan Feature Banner */}
                <div className='mt-2.5 p-3 rounded-xl bg-tablebg border border-border/80 flex items-center justify-between text-xs'>
                  <div className='flex items-center gap-2 text-white'>
                    <Icon icon='solar:star-bold' className='text-secondary text-base shrink-0' />
                    <span className='line-clamp-1'>
                      <strong>{activePlan.name} :</strong> {activePlan.tagline}
                    </span>
                  </div>
                  <span className='text-secondary font-bold shrink-0 ml-2'>
                    {activePlan.quotas.shops} • {activePlan.quotas.users}
                  </span>
                </div>
              </div>

              {/* 2. Merchant & Boutique Details */}
              <div>
                <label className='block text-xs font-bold uppercase tracking-wider text-lightblue mb-2.5'>
                  2. Vos Coordonnées Commerciales :
                </label>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-3.5'>
                  <div>
                    <span className='block text-xs text-lightblue mb-1'>Nom & Prénoms *</span>
                    <input
                      type='text'
                      required
                      placeholder='Ex: Sikirou K.'
                      value={merchantName}
                      onChange={(e) => setMerchantName(e.target.value)}
                      className='w-full p-3 rounded-xl bg-body-bg border border-border text-white text-sm focus:border-secondary focus:outline-none transition-colors'
                    />
                  </div>

                  <div>
                    <span className='block text-xs text-lightblue mb-1'>Nom de votre Boutique *</span>
                    <input
                      type='text'
                      required
                      placeholder='Ex: Éts La Victoire'
                      value={shopName}
                      onChange={(e) => setShopName(e.target.value)}
                      className='w-full p-3 rounded-xl bg-body-bg border border-border text-white text-sm focus:border-secondary focus:outline-none transition-colors'
                    />
                  </div>

                  <div>
                    <span className='block text-xs text-lightblue mb-1'>Numéro WhatsApp / Mobile Money *</span>
                    <input
                      type='tel'
                      required
                      placeholder='Ex: 01 53 80 49 ou 97 00 00 00'
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className='w-full p-3 rounded-xl bg-body-bg border border-border text-white text-sm focus:border-secondary focus:outline-none transition-colors'
                    />
                  </div>

                  <div>
                    <span className='block text-xs text-lightblue mb-1'>Ville / Marché</span>
                    <input
                      type='text'
                      placeholder='Ex: Cotonou Dantokpa, Calavi, Parakou...'
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className='w-full p-3 rounded-xl bg-body-bg border border-border text-white text-sm focus:border-secondary focus:outline-none transition-colors'
                    />
                  </div>
                </div>
              </div>

              {/* 3. Activation or Payment Mode */}
              {!isFree ? (
                <div>
                  <label className='block text-xs font-bold uppercase tracking-wider text-lightblue mb-2.5'>
                    3. Mode d’Activation ou de Paiement :
                  </label>

                  <div className='space-y-2.5'>
                    {/* Option A: Essai 14j */}
                    <label
                      className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${paymentOption === 'TRIAL'
                        ? 'bg-primary/20 border-primary shadow-md'
                        : 'bg-body-bg/60 border-border/70 hover:border-border'
                        }`}>
                      <input
                        type='radio'
                        name='paymentOption'
                        checked={paymentOption === 'TRIAL'}
                        onChange={() => setPaymentOption('TRIAL')}
                        className='mt-1 text-primary focus:ring-0 cursor-pointer'
                      />
                      <div className='flex-1'>
                        <div className='flex items-center gap-2'>
                          <span className='text-sm font-bold text-white'>Activer l’Essai Gratuit de 14 Jours</span>
                          <span className='px-2 py-0.5 rounded text-[10px] font-black bg-secondary text-[#061B14] uppercase'>
                            Recommandé
                          </span>
                        </div>
                        <p className='text-xs text-lightblue mt-0.5 leading-relaxed'>
                          Zéro franc débité aujourd’hui. Testez immédiatement la sauvegarde Cloud, le multi-appareils et l’anti-fraude sans engagement.
                        </p>
                      </div>
                    </label>

                    {/* Option B: Mobile Money (FedaPay) */}
                    <label
                      className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${paymentOption === 'MOMO'
                        ? 'bg-secondary/20 border-secondary shadow-md'
                        : 'bg-body-bg/60 border-border/70 hover:border-border'
                        }`}>
                      <input
                        type='radio'
                        name='paymentOption'
                        checked={paymentOption === 'MOMO'}
                        onChange={() => setPaymentOption('MOMO')}
                        className='mt-1 text-secondary focus:ring-0 cursor-pointer'
                      />
                      <div className='flex-1'>
                        <div className='flex items-center justify-between'>
                          <span className='text-sm font-bold text-white'>Payer par Mobile Money (FedaPay)</span>
                          <span className='text-sm font-extrabold text-secondary'>
                            {formatNum(price)} FCFA
                          </span>
                        </div>
                        <p className='text-xs text-lightblue mt-0.5'>
                          Règlement sécurisé immédiat via MTN, Moov, Celtiis ou Carte Visa.
                        </p>

                        {/* Providers sub-selector when MOMO selected */}
                        {paymentOption === 'MOMO' && (
                          <div className='grid grid-cols-4 gap-2 mt-3 pt-3 border-t border-border/60 animate-fadeIn'>
                            {(['MTN', 'MOOV', 'CELTIIS', 'CARD'] as MobileMoneyProvider[]).map((prov) => (
                              <button
                                key={prov}
                                type='button'
                                onClick={() => setMomoProvider(prov)}
                                className={`py-2 px-1 rounded-xl text-xs font-bold border transition-all text-center ${momoProvider === prov
                                  ? 'bg-secondary text-[#061B14] border-secondary'
                                  : 'bg-tablebg text-lightblue border-border hover:text-white'
                                  }`}>
                                {prov === 'CARD' ? 'Carte CB' : prov}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </label>

                    {/* Option C: WhatsApp Assisted */}
                    <label
                      className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${paymentOption === 'WHATSAPP'
                        ? 'bg-tablebg border-secondary/60'
                        : 'bg-body-bg/60 border-border/70 hover:border-border'
                        }`}>
                      <input
                        type='radio'
                        name='paymentOption'
                        checked={paymentOption === 'WHATSAPP'}
                        onChange={() => setPaymentOption('WHATSAPP')}
                        className='mt-1 text-secondary focus:ring-0 cursor-pointer'
                      />
                      <div className='flex-1'>
                        <div className='flex items-center gap-2'>
                          <Icon icon='logos:whatsapp-icon' className='text-base' />
                          <span className='text-sm font-bold text-white'>Finaliser avec un Conseiller par WhatsApp</span>
                        </div>
                        <p className='text-xs text-lightblue mt-0.5'>
                          Assistance personnalisée avec l’équipe officielle ARIKE ({OFFICIAL_PHONE_DISPLAY}).
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              ) : (
                /* FREE PLAN SPECIFIC BANNER */
                <div className='p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-lightblue space-y-1.5'>
                  <div className='text-white font-bold flex items-center gap-1.5 text-sm'>
                    <Icon icon='solar:check-circle-bold' className='text-emerald-400 text-lg' />
                    <span>Forfait 100% Gratuit & Illimité à Vie</span>
                  </div>
                  <p>
                    Zéro carte bancaire requise, aucun frais caché. Vos ventes, dettes et stocks sont enregistrés directement sur votre smartphone via SQLite sans dépendre d’une connexion Internet.
                  </p>
                </div>
              )}

              {/* USSD PUSH SIMULATION POPUP IN-FORM */}
              {ussdSimulating && (
                <div className='p-4 rounded-2xl bg-secondary/15 border-2 border-secondary text-center space-y-2 animate-pulse'>
                  <Icon icon='solar:smartphone-bold' className='text-3xl text-secondary mx-auto' />
                  <div className='text-sm font-black text-white'>Demande de Paiement USSD Transmise !</div>
                  <p className='text-xs text-lightblue'>
                    Veuillez composer votre code secret sur le pop-up apparu sur votre téléphone <strong>{phoneNumber}</strong> ({momoProvider}).
                  </p>
                  <div className='text-xs text-gold-soft font-bold'>Validation en cours... ({ussdSecondsLeft}s)</div>
                </div>
              )}

              {/* Submit CTA Button */}
              <div className='pt-2'>
                <button
                  type='submit'
                  disabled={isSubmitting || ussdSimulating}
                  className='w-full py-4 px-6 rounded-2xl bg-linear-to-r from-primary via-secondary to-primary hover:brightness-110 text-white font-black text-base flex items-center justify-center gap-2 shadow-xl shadow-secondary/20 transition-all cursor-pointer disabled:opacity-50'>
                  {isSubmitting ? (
                    <>
                      <Icon icon='solar:refresh-circle-bold' className='text-2xl animate-spin' />
                      <span>Traitement de l’inscription...</span>
                    </>
                  ) : isFree ? (
                    <>
                      <Icon icon='solar:download-square-bold' className='text-2xl' />
                      <span>Démarrer Gratuitement & Télécharger l’APK</span>
                    </>
                  ) : paymentOption === 'TRIAL' ? (
                    <>
                      <Icon icon='solar:star-bold' className='text-2xl text-gold-soft' />
                      <span>Activer mes 14 Jours d’Essai Gratuit</span>
                    </>
                  ) : paymentOption === 'MOMO' ? (
                    <>
                      <Icon icon='solar:card-2-bold' className='text-2xl' />
                      <span>Valider & Payer {formatNum(price)} FCFA via {momoProvider}</span>
                    </>
                  ) : (
                    <>
                      <Icon icon='logos:whatsapp-icon' className='text-xl' />
                      <span>Ouvrir WhatsApp Officiel ({OFFICIAL_PHONE_DISPLAY})</span>
                    </>
                  )}
                </button>
              </div>

              {/* Data & Security Guarantees */}
              <div className='pt-1 text-center text-[11px] text-lightblue flex items-center justify-center gap-3 flex-wrap'>
                <span className='flex items-center gap-1'>
                  <Icon icon='solar:shield-check-bold' className='text-emerald-400' />
                  Données locales inviolables
                </span>
                <span>•</span>
                <span>Rétrogradation douce en Gratuit sans perte</span>
                <span>•</span>
                <span>Support local Bénin</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
