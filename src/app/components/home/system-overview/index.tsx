'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Icon } from '@iconify/react/dist/iconify.js'
import { MODULES_DATA, ModuleDetail } from '../modules/modulesData'
import { ModuleDetailModal } from '../modules/ModuleDetailModal'

const SystemOverview = () => {
  const [activeModule, setActiveModule] = useState<ModuleDetail | null>(null)

  return (
    <section className='py-20 lg:py-28 bg-body-bg border-y border-border/80 relative overflow-hidden'>
      {/* ─────────────────────────────────────────────────────────────
          1. SYSTEM ATMOSPHERIC BACKGROUND LIGHTING
      ────────────────────────────────────────────────────────────── */}
      <div className='bg-linear-to-r from-primary/30 to-secondary/15 absolute w-full h-full top-0 -left-1/4 blur-390 pointer-events-none' />
      <div className='bg-linear-to-l from-primary/20 to-secondary/20 absolute w-full h-full bottom-0 -right-1/4 blur-390 pointer-events-none' />
      <div className='bg-banner-image absolute w-full h-full right-auto blur-390 opacity-25 pointer-events-none' />

      <div className='container relative z-10'>
        {/* Section Header */}
        <div className='max-w-3xl mx-auto text-center mb-14'>
          <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/25 border border-primary/50 text-secondary text-xs font-bold uppercase tracking-wider mb-4 shadow-sm'>
            <Icon icon='solar:widget-5-bold' className='text-sm' />
            <span>Guide & Découverte Complète</span>
          </div>

          <h2 className='text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4'>
            Tout ce que vous pouvez accomplir avec{' '}
            <span className='text-transparent bg-clip-text bg-linear-to-r from-secondary via-gold-soft to-amber-300'>
              ARIKE
            </span>
          </h2>

          <p className='text-lightsky text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto'>
            Cliquez sur un module pour afficher son cas d’usage concret, la comparaison avant/après et l’écran réel de démonstration.
          </p>
        </div>

        {/* 14 Capabilities Grid using MODULES_DATA */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5'>
          {MODULES_DATA.map((module) => (
            <div
              key={module.id}
              onClick={() => setActiveModule(module)}
              className='group p-5 rounded-2xl bg-darkmode/90 hover:bg-darkmode border border-border/80 hover:border-secondary/60 transition-all duration-300 flex flex-col justify-between shadow-xl hover:shadow-2xl hover:-translate-y-1 cursor-pointer relative overflow-hidden'>
              
              {/* Subtle top right ambient aura */}
              <div className='absolute -top-10 -right-10 size-24 bg-primary/10 rounded-full blur-xl group-hover:bg-primary/25 transition-all pointer-events-none' />

              <div>
                {/* Header: Icon, Category & Badge */}
                <div className='flex items-center justify-between gap-2 mb-3.5'>
                  <div className='size-11 rounded-xl bg-primary/25 border border-primary/40 text-secondary flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shadow-sm'>
                    <Icon icon={module.icon} />
                  </div>
                  <span className='text-[10px] font-black px-2.5 py-0.5 rounded-full bg-secondary/15 text-secondary border border-secondary/35 uppercase tracking-wide'>
                    {module.badge || module.categoryLabel}
                  </span>
                </div>

                {/* Title */}
                <h3 className='text-base font-bold text-white group-hover:text-gold-soft transition-colors mb-2 leading-snug'>
                  {module.title}
                </h3>

                {/* Subtitle / Tagline */}
                <p className='text-xs text-lightblue/90 leading-relaxed mb-3'>
                  {module.tagline}
                </p>

                {/* Concrete snippet preview */}
                <div className='p-2.5 rounded-xl bg-body-bg/80 border border-border/60 text-[11px] text-white/80 line-clamp-2'>
                  <span className='text-secondary font-bold mr-1'>Exemple :</span>
                  {module.concreteExample.title}
                </div>
              </div>

              {/* Action Button: Click to open Pedagogical Modal */}
              <div className='mt-4 pt-3 border-t border-border/70 flex items-center justify-between text-xs font-bold text-secondary group-hover:text-amber-300 transition-colors'>
                <span className='flex items-center gap-1.5'>
                  <Icon icon='solar:eye-bold' className='text-sm' />
                  <span>Voir le cas concret</span>
                </span>
                <Icon icon='solar:arrow-right-bold' className='text-sm group-hover:translate-x-1 transition-transform' />
              </div>
            </div>
          ))}
        </div>

        {/* Footer Guidance Link */}
        <div className='mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-4'>
          <Link
            href='#modules-section'
            className='inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary/30 hover:bg-primary border border-primary/50 text-white text-xs sm:text-sm font-bold transition-all shadow-md group'>
            <Icon icon='solar:list-check-bold' className='text-secondary text-base' />
            <span>Accéder au Guide Pédagogique Complet & Filtres de Recherche</span>
            <Icon icon='solar:arrow-down-bold' className='text-secondary group-hover:translate-y-0.5 transition-transform' />
          </Link>

          <a
            href='/download'
            className='inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white text-xs sm:text-sm font-bold shadow-lg shadow-primary/30 transition-all'>
            <Icon icon='solar:download-square-bold' className='text-base' />
            <span>Télécharger ARIKE (Android & PC)</span>
          </a>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. DETAILED PEDAGOGICAL MODAL WITH ALL MODULE DETAILS
      ────────────────────────────────────────────────────────────── */}
      <ModuleDetailModal
        module={activeModule}
        onClose={() => setActiveModule(null)}
      />
    </section>
  )
}

export default SystemOverview
