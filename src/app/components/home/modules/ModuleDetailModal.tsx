'use client'
import React, { useEffect } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import Link from 'next/link'
import { ModuleDetail } from './modulesData'

interface ModuleDetailModalProps {
  module: ModuleDetail | null
  onClose: () => void
}

export const ModuleDetailModal: React.FC<ModuleDetailModalProps> = ({
  module,
  onClose,
}) => {
  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  // Lock body scroll when modal is open
  useEffect(() => {
    if (module) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [module])

  if (!module) return null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-fadeIn'>
      {/* Backdrop click to close */}
      <div
        onClick={onClose}
        className='fixed inset-0 w-full h-full pointer-events-auto'
      />

      {/* Modal Container */}
      <div className='relative z-10 w-full max-w-5xl bg-[#082219] border border-border/90 rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col my-auto'>
        
        {/* Modal Top Bar */}
        <div className='p-5 sm:p-6 border-b border-border bg-darkmode flex items-center justify-between gap-4 shrink-0'>
          <div className='flex items-center gap-3.5'>
            <div className='size-12 rounded-2xl bg-linear-to-br from-primary to-primary-dark p-2.5 flex items-center justify-center text-secondary shadow-md shrink-0'>
              <Icon icon={module.icon} className='text-2xl text-secondary' />
            </div>
            <div>
              <div className='flex items-center gap-2 flex-wrap'>
                <h3 className='text-xl sm:text-2xl font-black text-white'>
                  {module.title}
                </h3>
                <span className='px-2.5 py-0.5 rounded-full bg-secondary/20 text-secondary border border-secondary/40 text-[10px] font-black uppercase'>
                  {module.badge}
                </span>
              </div>
              <p className='text-xs text-lightblue mt-0.5'>{module.tagline}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className='size-10 rounded-xl bg-body-bg border border-border text-lightblue hover:text-white hover:border-secondary flex items-center justify-center transition-colors cursor-pointer shrink-0'
            aria-label='Fermer'>
            <Icon icon='tabler:x' className='text-2xl' />
          </button>
        </div>

        {/* Modal Body Content (Scrollable) */}
        <div className='p-6 sm:p-8 overflow-y-auto space-y-8'>
          
          <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-start'>
            
            {/* Left Column: Pedagogical Explanations */}
            <div className='lg:col-span-7 space-y-6'>
              
              {/* Problem vs Solution Comparison Box */}
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div className='p-4 rounded-2xl bg-red-950/30 border border-red-500/30 space-y-2'>
                  <div className='flex items-center gap-2 text-red-400 font-bold text-xs uppercase tracking-wider'>
                    <Icon icon='solar:danger-triangle-bold' className='text-base' />
                    <span>Sans ARIKE (La galère)</span>
                  </div>
                  <p className='text-xs text-white/80 leading-relaxed'>
                    {module.problemWithout}
                  </p>
                </div>

                <div className='p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-2'>
                  <div className='flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider'>
                    <Icon icon='solar:check-circle-bold' className='text-base' />
                    <span>Avec ARIKE (La solution)</span>
                  </div>
                  <p className='text-xs text-white/90 leading-relaxed'>
                    {module.solutionWith}
                  </p>
                </div>
              </div>

              {/* 3 Steps "How it works in practice" */}
              <div className='space-y-3'>
                <h4 className='text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2'>
                  <Icon icon='solar:running-round-bold' className='text-secondary text-base' />
                  <span>Comment ça fonctionne en 3 étapes simples :</span>
                </h4>

                <div className='space-y-2.5'>
                  {module.threeSteps.map((step, idx) => (
                    <div
                      key={idx}
                      className='p-3.5 rounded-2xl bg-darkmode/70 border border-border/80 flex items-start gap-3'>
                      <span className='size-7 rounded-xl bg-linear-to-br from-primary to-primary-dark text-secondary font-black text-xs flex items-center justify-center shrink-0 shadow'>
                        {idx + 1}
                      </span>
                      <div>
                        <p className='text-xs sm:text-sm font-bold text-white'>{step.title}</p>
                        <p className='text-xs text-lightblue mt-0.5 leading-relaxed'>{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Concrete Real-world Case Example */}
              <div className='p-5 rounded-2xl bg-linear-to-br from-[#0B2E22] to-darkmode border border-secondary/30 space-y-2.5 relative overflow-hidden'>
                <div className='flex items-center justify-between gap-2'>
                  <span className='text-[10px] font-bold text-secondary uppercase tracking-wider flex items-center gap-1.5'>
                    <Icon icon='solar:shop-2-bold' className='text-sm' />
                    <span>Exemple réel du quotidien</span>
                  </span>
                  <span className='text-[11px] font-bold text-white/90 bg-body-bg/80 px-2.5 py-0.5 rounded-md border border-border'>
                    {module.concreteExample.numbers}
                  </span>
                </div>

                <h5 className='text-sm font-bold text-white'>
                  « {module.concreteExample.title} »
                </h5>

                <p className='text-xs text-lightblue leading-relaxed'>
                  {module.concreteExample.scenario}
                </p>

                <div className='pt-2 border-t border-border/60 flex items-center gap-2 text-xs font-semibold text-emerald-400'>
                  <Icon icon='solar:verified-check-bold' className='text-base shrink-0' />
                  <span>{module.concreteExample.result}</span>
                </div>
              </div>

              {/* Full list of features */}
              <div className='space-y-2'>
                <h4 className='text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2'>
                  <Icon icon='solar:star-bold' className='text-secondary' />
                  <span>Toutes les capacités du module :</span>
                </h4>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
                  {module.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className='p-2.5 rounded-xl bg-body-bg border border-border flex items-center gap-2 text-xs text-lightblue'>
                      <Icon icon='solar:check-read-bold' className='text-secondary text-sm shrink-0' />
                      <span className='leading-tight'>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Realistic Smartphone UI Mockup */}
            <div className='lg:col-span-5 flex flex-col items-center justify-center'>
              
              <div className='w-full max-w-sm rounded-3xl bg-[#04120E] border-4 border-border shadow-2xl p-4 sm:p-5 relative space-y-4'>
                
                {/* Simulated Phone Top Bar */}
                <div className='flex items-center justify-between text-[11px] text-lightblue pb-2 border-b border-border/60 font-mono'>
                  <span className='font-bold text-white'>14:32</span>
                  <div className='flex items-center gap-2'>
                    <span className='text-[9px] px-1.5 py-0.5 rounded-md bg-primary/30 text-secondary font-bold'>
                      Offline 100%
                    </span>
                    <Icon icon='solar:battery-charge-minimalistic-bold' className='text-sm text-emerald-400' />
                  </div>
                </div>

                {/* Simulated App Header */}
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-[10px] text-lightblue uppercase font-bold tracking-wider'>
                      ARIKE Mobile v1.0.1
                    </p>
                    <h4 className='text-sm font-black text-white truncate'>
                      {module.mockup.screenTitle}
                    </h4>
                  </div>
                  <span className='px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/40'>
                    {module.mockup.badgeStatus}
                  </span>
                </div>

                {/* Simulated Highlight Box (Key KPI) */}
                <div className='p-4 rounded-2xl bg-linear-to-br from-primary/30 to-darkmode border border-secondary/40 text-center space-y-1 shadow-inner'>
                  <p className='text-[10px] uppercase font-bold text-secondary tracking-widest'>
                    {module.mockup.highlightKey}
                  </p>
                  <p className='text-2xl font-black text-white tracking-tight'>
                    {module.mockup.highlightValue}
                  </p>
                </div>

                {/* Simulated Item Rows */}
                <div className='space-y-2 p-3 rounded-2xl bg-darkmode/90 border border-border/80 text-xs'>
                  {module.mockup.items.map((item, idx) => (
                    <div key={idx} className='flex items-center justify-between py-1 border-b border-border/50 last:border-0'>
                      <div>
                        <p className='font-semibold text-white/90 text-xs'>{item.label}</p>
                        {item.sub && <p className='text-[10px] text-lightblue'>{item.sub}</p>}
                      </div>
                      <span className={`font-bold ${item.color || 'text-white'}`}>
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Simulated App Button */}
                <div className='w-full py-3 rounded-xl bg-linear-to-r from-primary to-secondary text-white text-xs font-black shadow-lg shadow-primary/30 flex items-center justify-center gap-2'>
                  <Icon icon='solar:check-circle-bold' className='text-base' />
                  <span>{module.mockup.primaryAction}</span>
                </div>

                <p className='text-[9px] text-center text-lightblue/70 font-sans italic'>
                  Interface réelle et intuitive • Utilisable par tout commerçant
                </p>
              </div>

              {/* Fast Action Buttons in Modal */}
              <div className='w-full max-w-sm mt-4 flex items-center gap-2.5'>
                <Link
                  href='#demo-section'
                  onClick={onClose}
                  className='flex-1 py-3 px-3 rounded-xl bg-darkmode hover:bg-body-bg border border-border hover:border-secondary text-white text-center text-xs font-bold transition-all flex items-center justify-center gap-1.5'>
                  <Icon icon='solar:bolt-circle-bold' className='text-secondary text-base' />
                  <span>Simuler en direct</span>
                </Link>

                <Link
                  href='#download-section'
                  onClick={onClose}
                  className='flex-1 py-3 px-3 rounded-xl bg-linear-to-r from-primary to-secondary text-white text-center text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5'>
                  <Icon icon='solar:download-square-bold' className='text-base' />
                  <span>Télécharger</span>
                </Link>
              </div>

            </div>

          </div>

        </div>

        {/* Modal Footer */}
        <div className='p-4 sm:p-5 border-t border-border bg-darkmode flex items-center justify-between text-xs text-lightblue shrink-0'>
          <div className='flex items-center gap-2'>
            <Icon icon='solar:shield-check-bold' className='text-secondary text-base' />
            <span>Base SQLite locale chiffrée • 100% Hors-Ligne</span>
          </div>

          <button
            onClick={onClose}
            className='px-4 py-2 rounded-xl bg-body-bg border border-border text-white hover:border-secondary font-bold text-xs transition-colors cursor-pointer'>
            Fermer l&apos;aperçu
          </button>
        </div>

      </div>
    </div>
  )
}

