'use client'
import React, { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Icon } from '@iconify/react/dist/iconify.js'

const Trade = () => {
  const [downloadStarted, setDownloadStarted] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const handleDownload = () => {
    setDownloadStarted(true)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      setDownloadStarted(false)
    }, 5000)
  }

  return (
    <section id='download-section' className='overflow-hidden py-24 scroll-mt-14 relative'>
      <div className='bg-linear-to-r from-primary/30 to-secondary/20 hidden lg:block absolute w-full h-full top-1/2 blur-390 pointer-events-none'></div>

      <div className='container relative z-10'>
        {/* Header */}
        <div className='text-center max-w-3xl mx-auto mb-16'>
          <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/15 border border-secondary/30 text-secondary text-xs font-bold uppercase tracking-wider mb-4'>
            <Icon icon='solar:download-square-bold' className='text-base' />
            <span>Téléchargement Direct</span>
          </div>
          <h2 className='text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4'>
            Installez <span className='text-transparent bg-clip-text bg-linear-to-r from-secondary to-gold-soft'>ARIKE</span> Facilement sur votre Téléphone
          </h2>
          <p className='text-lightpurple text-base sm:text-lg leading-relaxed'>
            Téléchargez le fichier APK officiel, installez-le en 1 clic et profitez de l&apos;intégralité de vos fonctionnalités sans frais ni abonnement caché.
          </p>
        </div>

        {/* Big Download & Presentation Card */}
        <div className='rounded-3xl bg-darkmode border border-border p-8 lg:p-12 shadow-2xl relative overflow-hidden'>
          <div className='grid lg:grid-cols-12 gap-10 items-center'>
            
            {/* Left Column: Direct APK Download & Specs */}
            <div className='lg:col-span-7 flex flex-col gap-6'>
              <div className='flex items-center gap-3'>
                <div className='size-14 rounded-2xl bg-linear-to-br from-primary to-primary-dark p-2 border border-primary/40 shadow-lg shadow-primary/20 flex items-center justify-center shrink-0'>
                  <Image
                    src='/images/logo/app_icon.png'
                    alt='ARIKE App Icon'
                    width={48}
                    height={48}
                    className='size-10 object-contain rounded-lg'
                  />
                </div>
                <div>
                  <div className='flex items-center gap-2'>
                    <h3 className='text-2xl font-black text-white'>ARIKE Mobile v3.0</h3>
                    <span className='px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold'>
                      Officiel
                    </span>
                  </div>
                  <p className='text-xs text-lightblue'>Édition Commerce & Caisse • Bénin & Sous-région</p>
                </div>
              </div>

              <p className='text-white/90 text-sm sm:text-base leading-relaxed'>
                <strong className='text-secondary font-semibold'>Édition Universelle tout-en-un</strong> : garantie 100% compatible avec tous les smartphones et tablettes Android (Infinix, Tecno, Samsung, Xiaomi, Itel, Redmi...). 
                Aucun choix complexe d&apos;architecture à faire, un seul clic pour installer et commencer à vendre.
              </p>

              {/* Technical Badges - Option A Universel */}
              <div className='grid grid-cols-2 sm:grid-cols-4 gap-3 py-2'>
                <div className='p-3 rounded-xl bg-body-bg/80 border border-border text-center'>
                  <p className='text-[10px] text-lightblue uppercase font-bold'>Format APK</p>
                  <p className='text-sm font-bold text-white'>Universel</p>
                </div>
                <div className='p-3 rounded-xl bg-body-bg/80 border border-border text-center'>
                  <p className='text-[10px] text-lightblue uppercase font-bold'>Compatibilité</p>
                  <p className='text-sm font-bold text-white'>100% Android 6+</p>
                </div>
                <div className='p-3 rounded-xl bg-body-bg/80 border border-border text-center'>
                  <p className='text-[10px] text-lightblue uppercase font-bold'>Architecture</p>
                  <p className='text-sm font-bold text-secondary'>ARM64 & ARM32</p>
                </div>
                <div className='p-3 rounded-xl bg-body-bg/80 border border-border text-center'>
                  <p className='text-[10px] text-lightblue uppercase font-bold'>Mises à jour</p>
                  <p className='text-sm font-bold text-emerald-400'>OTA Silencieuses</p>
                </div>
              </div>

              {/* Download Buttons */}
              <div className='space-y-3 pt-2'>
                <a
                  href='/download'
                  onClick={handleDownload}
                  className='w-full sm:w-auto inline-flex items-center justify-center gap-3 py-4 px-8 rounded-2xl bg-linear-to-r from-primary via-emerald-600 to-secondary hover:from-secondary hover:to-primary text-white font-extrabold text-base sm:text-lg shadow-xl shadow-primary/30 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer'>
                  <Icon icon='solar:download-square-bold' className='text-3xl animate-bounce' style={{ animationDuration: '2s' }} />
                  <div className='text-left'>
                    <span>Télécharger ARIKE pour Android</span>
                    <span className='block text-[11px] font-normal text-white/80'>APK Universel • Tout smartphone • Gratuit</span>
                  </div>
                </a>

                {downloadStarted && (
                  <div className='p-3 rounded-xl bg-primary/20 border border-secondary/40 text-xs text-white flex items-center gap-2.5 animate-fadeIn shadow-lg shadow-primary/10'>
                    <Icon icon='solar:check-circle-bold' className='text-lg text-secondary shrink-0' />
                    <span className='flex-1 leading-snug'>
                      Le téléchargement de l&apos;APK a démarré ! Appuyez sur le fichier dans vos notifications pour l&apos;installer.
                    </span>
                    <button
                      type='button'
                      onClick={() => setDownloadStarted(false)}
                      className='p-1 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors shrink-0 ml-auto'
                      title='Fermer'
                      aria-label='Fermer la notification'>
                      <Icon icon='solar:close-circle-bold' className='text-lg' />
                    </button>
                  </div>
                )}
              </div>

              {/* 3 Step Installation Notice */}
              <div className='mt-3 p-4 rounded-2xl bg-body-bg/60 border border-border/80'>
                <p className='text-xs font-bold text-white mb-2 flex items-center gap-1.5'>
                  <Icon icon='solar:info-circle-bold' className='text-secondary' />
                  <span>Installation rapide en 3 étapes (sans Play Store) :</span>
                </p>
                <ol className='text-xs text-lightblue space-y-1.5 list-decimal list-inside'>
                  <li>Appuyez sur <strong>Télécharger ARIKE</strong> ci-dessus.</li>
                  <li>Ouvrez le fichier téléchargé. Si Android demande l&apos;autorisation, cochez <em>« Autoriser cette source »</em>.</li>
                  <li>Appuyez sur <strong>Installer</strong>. Les prochaines mises à jour arriveront automatiquement sans réinstallation !</li>
                </ol>
              </div>
            </div>

            {/* Right Column: QR Code & Multi-Platform Showcase */}
            <div className='lg:col-span-5 flex flex-col items-center justify-center bg-body-bg/70 rounded-3xl border border-border p-8 text-center'>
              <p className='text-xs uppercase font-bold tracking-widest text-secondary mb-1'>Scan & Téléchargement Mobile</p>
              <h4 className='text-lg font-bold text-white mb-4'>Scannez avec votre Téléphone</h4>

              {/* QR Code Container */}
              <a
                href='/download'
                title='Télécharger directement ARIKE'
                className='size-52 bg-white rounded-2xl p-3.5 shadow-2xl flex items-center justify-center border-4 border-secondary/30 relative group hover:border-secondary transition-all'>
                {/* SVG QR Code Illustration styled cleanly */}
                <svg viewBox='0 0 100 100' className='w-full h-full text-slate-900'>
                  {/* Top-left position box */}
                  <rect x='10' y='10' width='24' height='24' rx='3' fill='#0B6E4F' />
                  <rect x='15' y='15' width='14' height='14' rx='2' fill='#FFFFFF' />
                  <rect x='18' y='18' width='8' height='8' fill='#0B6E4F' />

                  {/* Top-right position box */}
                  <rect x='66' y='10' width='24' height='24' rx='3' fill='#0B6E4F' />
                  <rect x='71' y='15' width='14' height='14' rx='2' fill='#FFFFFF' />
                  <rect x='74' y='18' width='8' height='8' fill='#0B6E4F' />

                  {/* Bottom-left position box */}
                  <rect x='10' y='66' width='24' height='24' rx='3' fill='#0B6E4F' />
                  <rect x='15' y='71' width='14' height='14' rx='2' fill='#FFFFFF' />
                  <rect x='18' y='74' width='8' height='8' fill='#0B6E4F' />

                  {/* Matrix dots simulating real QR */}
                  <rect x='38' y='12' width='5' height='5' fill='#E8A317' />
                  <rect x='48' y='16' width='6' height='4' fill='#0B6E4F' />
                  <rect x='40' y='24' width='4' height='6' fill='#0B6E4F' />
                  <rect x='52' y='28' width='6' height='6' fill='#E8A317' />
                  
                  <rect x='12' y='42' width='6' height='6' fill='#0B6E4F' />
                  <rect x='24' y='46' width='8' height='4' fill='#E8A317' />
                  <rect x='40' y='40' width='20' height='20' rx='4' fill='#084A36' />
                  <text x='50' y='54' fill='#E8A317' fontSize='12' fontWeight='bold' textAnchor='middle'>A</text>
                  
                  <rect x='68' y='42' width='6' height='6' fill='#E8A317' />
                  <rect x='80' y='48' width='8' height='4' fill='#0B6E4F' />
                  <rect x='42' y='68' width='6' height='6' fill='#0B6E4F' />
                  <rect x='54' y='72' width='6' height='6' fill='#E8A317' />
                  <rect x='68' y='68' width='8' height='4' fill='#0B6E4F' />
                  <rect x='82' y='78' width='6' height='8' fill='#E8A317' />
                  <rect x='48' y='84' width='10' height='4' fill='#0B6E4F' />
                </svg>

                <span className='absolute -bottom-3 bg-darkmode text-secondary text-[10px] font-bold px-3 py-0.5 rounded-full border border-secondary/40 shadow group-hover:scale-105 transition-transform'>
                  Lien Universel /download
                </span>
              </a>

              <p className='text-xs text-lightblue mt-5 max-w-xs'>
                Ouvrez l&apos;appareil photo de votre smartphone pour scanner et lancer le téléchargement universel sur votre mobile.
              </p>

              {/* Multi-Platform Badges */}
              <div className='w-full mt-6 pt-5 border-t border-border/80 flex items-center justify-around'>
                <div className='flex flex-col items-center gap-1'>
                  <Icon icon='solar:smartphone-bold' className='text-2xl text-secondary' />
                  <span className='text-[10px] text-white font-medium'>Android Mobile</span>
                </div>
                <div className='h-8 w-px bg-border'></div>
                <div className='flex flex-col items-center gap-1'>
                  <Icon icon='solar:tablet-bold' className='text-2xl text-secondary' />
                  <span className='text-[10px] text-white font-medium'>Tablette Caisse</span>
                </div>
                <div className='h-8 w-px bg-border'></div>
                <div className='flex flex-col items-center gap-1'>
                  <Icon icon='solar:laptop-bold' className='text-2xl text-secondary' />
                  <span className='text-[10px] text-white font-medium'>Back-Office Web</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}

export default Trade
