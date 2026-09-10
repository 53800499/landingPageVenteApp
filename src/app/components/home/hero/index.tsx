'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Icon } from '@iconify/react/dist/iconify.js'

const Banner = () => {
  const [isOpen, setOpen] = useState(false)

  return (
    <section className='relative pb-12 pt-28 lg:pt-36 overflow-hidden' id='home-section'>
      {/* Background ambient lighting */}
      <div className='bg-banner-image absolute w-full h-full top-0 blur-390 opacity-60 pointer-events-none'></div>
      <div className='absolute top-20 right-10 w-96 h-96 rounded-full bg-secondary/10 blur-3xl pointer-events-none'></div>
      <div className='absolute top-40 left-10 w-96 h-96 rounded-full bg-primary/20 blur-3xl pointer-events-none'></div>

      <div className='container relative z-10'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 items-center'>
          
          {/* Left Column: Headlines, Value Prop & Download CTAs */}
          <div className='lg:col-span-7 text-center lg:text-left'>
            {/* Top pill badge */}
            <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 border border-primary/40 text-secondary text-xs sm:text-sm font-semibold mb-6 shadow-sm shadow-primary/10'>
              <span className='size-2 rounded-full bg-secondary animate-pulse'></span>
              <span>L&apos;ERP de Poche Populaire & Infaillible — Bénin & UEMOA</span>
            </div>

            <h1 className='text-white font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-tight mb-6'>
              Gérez vos Ventes, Stocks & Crédits{' '}
              <span className='block text-transparent bg-clip-text bg-linear-to-r from-secondary via-gold-soft to-secondary'>
                100% Hors-Ligne.
              </span>
            </h1>

            <p className='text-lightpurple text-base sm:text-lg lg:text-xl font-normal mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed'>
              Spécialement conçu pour les commerçants de <strong className='text-white font-semibold'>Dantokpa, Ganhi, Ouando, Parakou et Calavi</strong>. 
              Vendez en 3 secondes, recouvrez vos dettes via WhatsApp sans dispute et visualisez votre bénéfice net au franc près.
            </p>

            {/* Quick feature checklist */}
            <div className='grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10 text-xs sm:text-sm text-lightsky font-medium max-w-xl mx-auto lg:mx-0'>
              <div className='flex items-center gap-2'>
                <Icon icon='tabler:circle-check-filled' className='text-secondary text-lg shrink-0' />
                <span>Zéro connexion requise</span>
              </div>
              <div className='flex items-center gap-2'>
                <Icon icon='tabler:circle-check-filled' className='text-secondary text-lg shrink-0' />
                <span>Franc CFA & MoMo</span>
              </div>
              <div className='flex items-center gap-2'>
                <Icon icon='tabler:circle-check-filled' className='text-secondary text-lg shrink-0' />
                <span>Relance WhatsApp</span>
              </div>
              <div className='flex items-center gap-2'>
                <Icon icon='tabler:circle-check-filled' className='text-secondary text-lg shrink-0' />
                <span>Anti-fraude & Audit</span>
              </div>
              <div className='flex items-center gap-2'>
                <Icon icon='tabler:circle-check-filled' className='text-secondary text-lg shrink-0' />
                <span>Tickets Bluetooth</span>
              </div>
              <div className='flex items-center gap-2'>
                <Icon icon='tabler:circle-check-filled' className='text-secondary text-lg shrink-0' />
                <span>100% Gratuit au départ</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className='flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4'>
              <Link
                href='#download-section'
                className='w-full sm:w-auto flex items-center justify-center gap-3 text-base sm:text-lg font-bold text-white py-4 px-8 bg-linear-to-r from-primary to-secondary hover:from-secondary hover:to-primary rounded-2xl shadow-xl shadow-primary/25 duration-300 transform hover:-translate-y-0.5 group'>
                <Icon icon='solar:download-square-bold' className='text-2xl group-hover:scale-110 transition-transform' />
                <div className='text-left leading-tight'>
                  <span>Télécharger l&apos;APK Android</span>
                  <span className='block text-[11px] font-normal text-white/80'>v3.0.0 • APK Universel (100% compatible) • Gratuit</span>
                </div>
              </Link>

              <Link
                href='#demo-section'
                className='w-full sm:w-auto flex items-center justify-center gap-2 text-base font-semibold text-white py-4 px-6 rounded-2xl border border-border bg-darkmode hover:border-primary hover:bg-body-bg transition-all duration-300'>
                <Icon icon='solar:play-circle-bold' className='text-2xl text-secondary' />
                <span>Tester le Simulateur Caisse</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Interactive Smartphone UI Mockup */}
          <div className='lg:col-span-5 flex justify-center'>
            <div className='relative w-full max-w-[380px]'>
              {/* Floating notification badge 1 */}
              <div className='absolute -top-6 -left-6 z-20 bg-darkmode/90 backdrop-blur-md border border-primary/40 rounded-2xl p-3 shadow-2xl flex items-center gap-3 animate-bounce' style={{ animationDuration: '4s' }}>
                <div className='size-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary'>
                  <Icon icon='solar:check-circle-bold' className='text-2xl text-secondary' />
                </div>
                <div>
                  <p className='text-xs text-lightblue font-medium'>Vente validée</p>
                  <p className='text-sm text-white font-bold'>+37 500 FCFA <span className='text-[10px] text-secondary font-normal'>(2.4s)</span></p>
                </div>
              </div>

              {/* Floating notification badge 2 */}
              <div className='absolute -bottom-6 -right-6 z-20 bg-darkmode/90 backdrop-blur-md border border-secondary/40 rounded-2xl p-3 shadow-2xl flex items-center gap-3'>
                <div className='size-10 rounded-xl bg-secondary/20 flex items-center justify-center text-secondary'>
                  <Icon icon='logos:whatsapp-icon' className='text-xl' />
                </div>
                <div>
                  <p className='text-xs text-lightblue font-medium'>Relance Client</p>
                  <p className='text-sm text-white font-bold'>Reçu WhatsApp envoyé !</p>
                </div>
              </div>

              {/* Mobile Phone Mock Frame */}
              <div className='relative rounded-[40px] border-4 border-border bg-body-bg shadow-2xl overflow-hidden p-3.5 shadow-primary/20'>
                {/* Speaker & camera notch */}
                <div className='w-28 h-4 bg-border mx-auto rounded-full mb-3 flex items-center justify-center'>
                  <div className='size-2 rounded-full bg-body-bg'></div>
                </div>

                {/* App Screen Interface */}
                <div className='rounded-[28px] bg-darkmode border border-border p-4 text-white overflow-hidden'>
                  {/* Top Bar of ARIKE */}
                  <div className='flex items-center justify-between pb-3 border-b border-border/80'>
                    <div className='flex items-center gap-2'>
                      <div className='size-7 rounded-lg bg-primary flex items-center justify-center font-black text-xs text-white'>
                        A
                      </div>
                      <div>
                        <p className='text-xs font-bold leading-none'>BOUTIQUE ARIKE</p>
                        <p className='text-[9px] text-lightblue'>Marché Ganhi • Cotonou</p>
                      </div>
                    </div>
                    <div className='flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-primary/20 border border-primary/30'>
                      <span className='size-1.5 rounded-full bg-emerald-400 animate-ping'></span>
                      <span className='text-[9px] font-semibold text-secondary'>100% Hors-Ligne</span>
                    </div>
                  </div>

                  {/* Cart items preview */}
                  <div className='mt-3 space-y-2'>
                    <div className='flex justify-between items-center text-[10px] text-lightblue uppercase tracking-wider font-semibold px-1'>
                      <span>Panier en cours (3 articles)</span>
                      <span className='text-secondary'>#VT-2026-089</span>
                    </div>

                    <div className='bg-body-bg/80 rounded-xl p-2.5 flex justify-between items-center border border-border/50'>
                      <div className='flex items-center gap-2'>
                        <span className='size-6 rounded-lg bg-primary/20 text-primary flex items-center justify-center text-xs font-bold'>🍚</span>
                        <div>
                          <p className='text-xs font-bold text-white'>Sac de Riz Parfumé 50kg</p>
                          <p className='text-[10px] text-lightblue'>1 × 24 500 FCFA</p>
                        </div>
                      </div>
                      <span className='text-xs font-bold text-secondary'>24 500 F</span>
                    </div>

                    <div className='bg-body-bg/80 rounded-xl p-2.5 flex justify-between items-center border border-border/50'>
                      <div className='flex items-center gap-2'>
                        <span className='size-6 rounded-lg bg-primary/20 text-primary flex items-center justify-center text-xs font-bold'>🛢️</span>
                        <div>
                          <p className='text-xs font-bold text-white'>Bidon Huile Végétale 5L</p>
                          <p className='text-[10px] text-lightblue'>2 × 4 500 FCFA</p>
                        </div>
                      </div>
                      <span className='text-xs font-bold text-secondary'>9 000 F</span>
                    </div>

                    <div className='bg-body-bg/80 rounded-xl p-2.5 flex justify-between items-center border border-border/50'>
                      <div className='flex items-center gap-2'>
                        <span className='size-6 rounded-lg bg-primary/20 text-primary flex items-center justify-center text-xs font-bold'>🍝</span>
                        <div>
                          <p className='text-xs font-bold text-white'>Carton Spaghetti 20x</p>
                          <p className='text-[10px] text-lightblue'>1 × 4 000 FCFA</p>
                        </div>
                      </div>
                      <span className='text-xs font-bold text-secondary'>4 000 F</span>
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div className='mt-3 pt-3 border-t border-border/80'>
                    <p className='text-[10px] text-lightblue font-medium mb-1.5'>Mode de paiement sélectionné :</p>
                    <div className='grid grid-cols-4 gap-1.5'>
                      <div className='p-1.5 rounded-lg bg-body-bg border border-border text-center text-[10px] text-lightsky font-medium'>
                        Espèces
                      </div>
                      <div className='p-1.5 rounded-lg bg-primary/30 border border-primary text-center text-[10px] text-white font-bold'>
                        MoMo
                      </div>
                      <div className='p-1.5 rounded-lg bg-body-bg border border-border text-center text-[10px] text-lightsky font-medium'>
                        Moov
                      </div>
                      <div className='p-1.5 rounded-lg bg-body-bg border border-border text-center text-[10px] text-secondary font-medium'>
                        Crédit
                      </div>
                    </div>
                  </div>

                  {/* Total & Instant Action */}
                  <div className='mt-4 pt-3 border-t border-border flex items-center justify-between'>
                    <div>
                      <p className='text-[10px] text-lightblue'>TOTAL À PAYER</p>
                      <p className='text-xl font-black text-white'>37 500 <span className='text-xs text-secondary font-semibold'>FCFA</span></p>
                    </div>
                    <button className='bg-linear-to-r from-primary to-secondary text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center gap-1.5 shadow-md shadow-primary/30'>
                      <Icon icon='solar:bag-check-bold' className='text-base' />
                      <span>Valider</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Video Modal if clicked */}
      {isOpen && (
        <div className='fixed top-0 left-0 w-full h-full bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
          <div className='bg-darkmode border border-border rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl'>
            <div className='flex items-center justify-between border-b border-border p-4 bg-body-bg'>
              <h3 className='text-white font-bold text-lg'>Découvrez ARIKE en action</h3>
              <button onClick={() => setOpen(false)} className='text-lightblue hover:text-white p-1'>
                <Icon icon='tabler:x' className='text-2xl' />
              </button>
            </div>
            <div className='p-6 text-center text-white'>
              <p className='text-lightblue mb-4'>Présentation complète de la caisse, des relances WhatsApp et de l&apos;inventaire hors-ligne.</p>
              <div className='aspect-video bg-body-bg rounded-xl flex items-center justify-center border border-border'>
                <div className='text-center p-6'>
                  <Icon icon='solar:play-circle-bold' className='text-6xl text-secondary mx-auto mb-2 opacity-80' />
                  <p className='text-white font-semibold'>Vidéo de démonstration ARIKE</p>
                  <p className='text-xs text-lightblue mt-1'>Disponible prochainement sur YouTube & WhatsApp</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Banner
