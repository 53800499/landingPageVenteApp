'use client'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { Icon } from '@iconify/react/dist/iconify.js'

interface HeroSlide {
  id: number
  image: string
  tag: string
  badgeIcon: string
  headline: string
  highlight: string
  description: string
  statNumber: string
  statLabel: string
}

const HERO_SLIDES: HeroSlide[] = [
  /* {
    id: 0,
    image:
      'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=2000&q=80',
    tag: 'Caisse Tactile & Encaissement Express',
    badgeIcon: 'solar:cart-large-4-bold',
    headline: 'Vendez en moins de 3 secondes',
    highlight: 'Avec ou Sans Code-Barres.',
    description:
      'Caisse tactile ultra-rapide, scanner caméra, calcul automatique de la monnaie, encaissement Espèces, MTN MoMo, Moov Money et impression de tickets Bluetooth.',
    statNumber: '< 3s',
    statLabel: 'par encaissement',
  }, */
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=2000&q=80',
    tag: 'Gestion des Stocks & Alertes Rupture',
    badgeIcon: 'solar:box-minimalistic-bold',
    headline: 'Maîtrisez vos stocks au carton près',
    highlight: 'Zéro Rupture, Zéro Vol.',
    description:
      'Déstockage instantané à chaque vente, inventaire physique avec réconciliation d’écarts, alertes sonores de réassort et transferts inter-boutiques.',
    statNumber: '100%',
    statLabel: 'visibilité en direct',
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=2000&q=80',
    tag: 'Carnet de Dettes & Recouvrement WhatsApp',
    badgeIcon: 'solar:chat-round-money-bold',
    headline: 'Recouvrez vos créances',
    highlight: 'Via WhatsApp sans Dispute.',
    description:
      'Consignez les crédits clients, notez chaque acompte au franc près et relancez poliment par WhatsApp avec un reçu numérique officiel infalsifiable.',
    statNumber: '0 dispute',
    statLabel: 'reçus infalsifiables',
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=2000&q=80',
    tag: 'Sessions de Caisse & Sécurité Financière',
    badgeIcon: 'solar:wallet-money-bold',
    headline: 'Clôturez votre caisse le soir',
    highlight: 'Sans Aucun Écart Inexpliqué.',
    description:
      'Comptage du fond de caisse à l’ouverture, justification obligatoire des dépenses et calcul automatique de l’écart théorique vs réel.',
    statNumber: '0 FCFA',
    statLabel: 'd’écart masqué',
  },
  {
    id: 4,
    image:
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2000&q=80',
    tag: 'Moteur 100% Hors-Ligne & Multi-Boutiques',
    badgeIcon: 'solar:shield-check-bold',
    headline: 'Vendez même en plein délestage',
    highlight: 'Sans Connexion Internet.',
    description:
      'Base locale SQLite sur chaque smartphone et PC Windows. Vos ventes continuent sans réseau et se synchronisent dès le retour d’Internet.',
    statNumber: '100%',
    statLabel: 'résilience hors-ligne',
  },
]

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  // Auto-play interval
  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        nextSlide()
      }, 3000)
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isPaused, nextSlide])

  const slide = HERO_SLIDES[currentSlide]

  return (
    <section
      className='relative pt-28 lg:pt-36 pb-16 overflow-hidden min-h-[85vh] flex flex-col justify-between'
      id='home-section'
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}>

      {/* ─────────────────────────────────────────────────────────────
          1. BACKGROUND IMAGE SLIDER - VIBRANT, LUMINOUS & DAYLIGHT
      ────────────────────────────────────────────────────────────── */}
      <div className='absolute inset-0 z-0 overflow-hidden pointer-events-none'>
        {HERO_SLIDES.map((item, index) => {
          const isActive = index === currentSlide
          return (
            <div
              key={item.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${isActive ? 'opacity-100' : 'opacity-0'
                }`}>
              <div
                className={`w-full h-full bg-cover bg-center filter brightness-110 contrast-105 saturate-120 transition-transform duration-7000 ease-out ${isActive ? 'scale-105' : 'scale-100'
                  }`}
                style={{
                  backgroundImage: `url(${item.image})`,
                }}
              />
            </div>
          )
        })}

        {/* Soft, light gradient overlay (never dark / gloomy) */}
        <div className='absolute inset-0 bg-linear-to-r from-black/45 via-black/20 to-transparent z-1'></div>
        <div className='absolute inset-0 bg-linear-to-t from-darkmode/70 via-transparent to-transparent z-1'></div>

        {/* Ambient warm glows */}
        <div className='absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-secondary/15 blur-3xl pointer-events-none z-2'></div>
        <div className='absolute top-20 left-10 w-[500px] h-[500px] rounded-full bg-emerald-400/15 blur-3xl pointer-events-none z-2'></div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. SLIDER ARROWS (DESKTOP)
      ────────────────────────────────────────────────────────────── */}
      <button
        onClick={prevSlide}
        aria-label='Slide précédente'
        className='hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 size-11 rounded-full bg-darkmode/60 hover:bg-primary border border-white/10 hover:border-secondary text-white items-center justify-center transition-all duration-300 shadow-xl cursor-pointer hover:scale-110'>
        <Icon icon='solar:alt-arrow-left-bold' className='text-xl' />
      </button>

      <button
        onClick={nextSlide}
        aria-label='Slide suivante'
        className='hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 size-11 rounded-full bg-darkmode/60 hover:bg-primary border border-white/10 hover:border-secondary text-white items-center justify-center transition-all duration-300 shadow-xl cursor-pointer hover:scale-110'>
        <Icon icon='solar:alt-arrow-right-bold' className='text-xl' />
      </button>

      {/* ─────────────────────────────────────────────────────────────
          3. MAIN HERO CONTENT (AIRY & UNCLUTTERED)
      ────────────────────────────────────────────────────────────── */}
      <div className='container relative z-10'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center'>

          {/* Left Column: Headlines & Actions */}
          <div className='lg:col-span-7 text-center lg:text-left'>
            {/* Pill Tag */}
            <div className='inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/30 border border-primary/50 text-secondary text-xs sm:text-sm font-semibold mb-5 shadow-sm backdrop-blur-md'>
              <Icon icon={slide.badgeIcon} className='text-base text-secondary' />
              <span>{slide.tag}</span>
            </div>

            {/* Headline */}
            <h1 className='text-white font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]'>
              {slide.headline}{' '}
              <span className='block text-transparent bg-clip-text bg-linear-to-r from-secondary via-gold-soft to-amber-300'>
                {slide.highlight}
              </span>
            </h1>

            {/* Description */}
            <p className='text-lightsky text-sm sm:text-base lg:text-lg font-medium mb-6 max-w-xl mx-auto lg:mx-0 leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]'>
              {slide.description}
            </p>

            {/* Simple CTAs & Trust Badges */}
            <div className='flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 mb-6'>
              <a
                href='/download'
                className='w-full sm:w-auto flex items-center justify-center gap-2.5 text-sm sm:text-base font-bold text-white py-3 px-5 bg-linear-to-r from-primary to-secondary hover:from-secondary hover:to-primary rounded-xl shadow-lg shadow-primary/30 transition-all transform hover:-translate-y-0.5 group cursor-pointer'>
                <Icon icon='solar:smartphone-bold' className='text-xl text-secondary group-hover:scale-110 transition-transform' />
                <span>Télécharger l’App (Android & PC)</span>
              </a>

              <Link
                href='#modules-section'
                className='w-full sm:w-auto flex items-center justify-center gap-2 text-sm font-semibold text-white py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 transition-all border border-white/15'>
                <Icon icon='solar:widget-5-bold' className='text-base text-secondary' />
                <span>Découvrir les 14 fonctionnalités ↓</span>
              </Link>
            </div>

            {/* Trust points */}
            <div className='flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-lightblue/90'>
              <span className='flex items-center gap-1.5'>
                <Icon icon='solar:shield-check-bold' className='text-emerald-400 text-sm' />
                100% Fonctionnel Hors-Ligne
              </span>
              <span className='flex items-center gap-1.5'>
                <Icon icon='solar:check-circle-bold' className='text-secondary text-sm' />
                Tickets Bluetooth & WhatsApp
              </span>
              <span className='flex items-center gap-1.5'>
                <Icon icon='solar:card-2-bold' className='text-lightblue text-sm' />
                MTN MoMo & Moov Money
              </span>
            </div>
          </div>

          {/* Right Column: Clean Smartphone Mockup */}
          <div className='lg:col-span-5 flex justify-center'>
            <div className='relative w-full max-w-[320px]'>
              {/* Smartphone Frame */}
              <div className='rounded-[36px] border-4 border-border/80 bg-body-bg shadow-2xl overflow-hidden p-3 shadow-primary/20 backdrop-blur-md'>
                {/* Notch */}
                <div className='w-20 h-3 bg-border/80 mx-auto rounded-full mb-2.5 flex items-center justify-center'>
                  <div className='size-1.5 rounded-full bg-body-bg'></div>
                </div>

                {/* App Screen */}
                <div className='rounded-[24px] bg-darkmode border border-border p-3.5 text-white'>
                  {/* Top Header */}
                  <div className='flex items-center justify-between pb-2.5 border-b border-border/70'>
                    <div className='flex items-center gap-2'>
                      <div className='size-6 rounded-md bg-primary flex items-center justify-center font-black text-[11px] text-white'>
                        A
                      </div>
                      <div>
                        <p className='text-[11px] font-bold leading-none'>BOUTIQUE ARIKE</p>
                        <p className='text-[8px] text-lightblue'>Ganhi • Cotonou</p>
                      </div>
                    </div>
                    <span className='px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[8px] font-bold border border-emerald-500/30'>
                      ● Hors-Ligne
                    </span>
                  </div>

                  {/* Cart preview */}
                  <div className='mt-2.5 space-y-1.5'>
                    <div className='flex justify-between items-center text-[9px] text-lightblue font-medium'>
                      <span>Panier en cours</span>
                      <span className='text-secondary'>#REC-0089</span>
                    </div>

                    <div className='bg-body-bg/80 rounded-lg p-2 flex justify-between items-center border border-border/40 text-xs'>
                      <div>
                        <p className='font-bold text-white text-[11px]'>Sac de Riz 50kg</p>
                        <p className='text-[9px] text-lightblue'>1 × 24 500 F</p>
                      </div>
                      <span className='font-bold text-secondary text-[11px]'>24 500 F</span>
                    </div>

                    <div className='bg-body-bg/80 rounded-lg p-2 flex justify-between items-center border border-border/40 text-xs'>
                      <div>
                        <p className='font-bold text-white text-[11px]'>Huile Végétale 5L</p>
                        <p className='text-[9px] text-lightblue'>2 × 4 500 F</p>
                      </div>
                      <span className='font-bold text-secondary text-[11px]'>9 000 F</span>
                    </div>
                  </div>

                  {/* Total & Action */}
                  <div className='mt-3 pt-2.5 border-t border-border flex items-center justify-between'>
                    <div>
                      <p className='text-[8px] text-lightblue uppercase'>Total</p>
                      <p className='text-base font-black text-white'>
                        33 500 <span className='text-[10px] text-secondary font-semibold'>FCFA</span>
                      </p>
                    </div>
                    <div className='bg-linear-to-r from-primary to-secondary text-white text-[10px] font-bold py-1.5 px-3 rounded-lg flex items-center gap-1 shadow-sm'>
                      <Icon icon='solar:bag-check-bold' className='text-xs' />
                      <span>Encaisser</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ─────────────────────────────────────────────────────────────
            4. SLEEK SLIDER TABS & INDICATORS (AIRY & LIGHT)
        ────────────────────────────────────────────────────────────── */}
        <div className='mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4'>
          {/* Quick theme selector tabs */}
          <div className='flex flex-wrap items-center justify-center gap-1.5'>
            {HERO_SLIDES.map((s, idx) => {
              const isSelected = idx === currentSlide
              return (
                <button
                  key={s.id}
                  onClick={() => goToSlide(idx)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${isSelected
                    ? 'bg-secondary text-darkmode font-bold shadow-md shadow-secondary/20'
                    : 'bg-darkmode/50 text-lightblue hover:text-white hover:bg-darkmode border border-white/5'
                    }`}>
                  <Icon icon={s.badgeIcon} className='text-xs' />
                  <span>{s.tag.split('&')[0].trim()}</span>
                </button>
              )
            })}
          </div>

          {/* Dots Indicator */}
          <div className='flex items-center gap-2'>
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                aria-label={`Aller au slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${idx === currentSlide
                  ? 'w-6 h-2 bg-secondary shadow-sm shadow-secondary/40'
                  : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                  }`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

export default Banner
