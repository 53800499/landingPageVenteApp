'use client'
import React, { useState, useMemo, useEffect } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import Link from 'next/link'
import { MODULES_DATA, MODULE_CATEGORIES, ModuleDetail } from './modulesData'

const Modules = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [activeModule, setActiveModule] = useState<ModuleDetail | null>(null)

  // Filter modules based on category and search query
  const filteredModules = useMemo(() => {
    return MODULES_DATA.filter((mod) => {
      const matchCategory =
        selectedCategory === 'all' || mod.category === selectedCategory
      const query = searchQuery.trim().toLowerCase()
      if (!query) return matchCategory

      const matchSearch =
        mod.title.toLowerCase().includes(query) ||
        mod.tagline.toLowerCase().includes(query) ||
        mod.problemWithout.toLowerCase().includes(query) ||
        mod.solutionWith.toLowerCase().includes(query) ||
        mod.features.some((f) => f.toLowerCase().includes(query)) ||
        mod.categoryLabel.toLowerCase().includes(query) ||
        mod.concreteExample.scenario.toLowerCase().includes(query)

      return matchCategory && matchSearch
    })
  }, [selectedCategory, searchQuery])

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveModule(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeModule) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [activeModule])

  return (
    <section id='modules-section' className='scroll-mt-20 py-24 relative overflow-hidden'>
      {/* Background ambient lighting */}
      <div className='bg-linear-to-r from-primary/30 to-secondary/15 absolute w-full h-full top-0 -left-1/4 blur-390 pointer-events-none'></div>
      <div className='bg-linear-to-l from-primary/20 to-secondary/20 absolute w-full h-full bottom-0 -right-1/4 blur-390 pointer-events-none'></div>

      <div className='container relative z-10'>
        {/* Section Header */}
        <div className='text-center max-w-4xl mx-auto mb-14'>
          <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 border border-primary/40 text-secondary text-xs font-bold uppercase tracking-wider mb-4'>
            <Icon icon='solar:widget-5-bold' className='text-base' />
            <span>Guide Pédagogique des Modules</span>
          </div>

          <h2 className='text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-5 tracking-tight'>
            Chacun de nos <span className='text-transparent bg-clip-text bg-linear-to-r from-secondary to-gold-soft'>14 Modules</span> Expliqué Simplement
          </h2>

          <p className='text-lightpurple max-w-3xl mx-auto text-base sm:text-lg leading-relaxed'>
            Chaque module d&apos;ARIKE a été forgé pour répondre aux réalités concrètes des commerçants d&apos;Afrique de l&apos;Ouest : fin des contestations d&apos;impayés, zéro vol interne, caisse rapide et fonctionnement 100% hors-ligne.
          </p>
        </div>

        {/* Search Bar & Category Filter Tabs */}
        <div className='mb-12 space-y-6'>
          {/* Live Search Input */}
          <div className='max-w-xl mx-auto relative'>
            <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-lightblue'>
              <Icon icon='solar:magnifer-bold' className='text-xl' />
            </div>
            <input
              type='text'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Rechercher un module (ex: WhatsApp, Bénéfice, Inventaire, Naira, Caisse)...'
              className='w-full pl-12 pr-10 py-3.5 rounded-2xl bg-darkmode/90 border border-border focus:border-secondary focus:outline-hidden text-white placeholder-lightblue/60 text-sm shadow-xl transition-all'
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className='absolute inset-y-0 right-0 pr-4 flex items-center text-lightblue hover:text-white cursor-pointer'
                aria-label='Effacer la recherche'>
                <Icon icon='solar:close-circle-bold' className='text-lg' />
              </button>
            )}
          </div>

          {/* Categories Tab Navigation */}
          <div className='flex items-center justify-center flex-wrap gap-2.5'>
            {MODULE_CATEGORIES.map((cat) => {
              const count =
                cat.id === 'all'
                  ? MODULES_DATA.length
                  : MODULES_DATA.filter((m) => m.category === cat.id).length
              const isActive = selectedCategory === cat.id

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer border ${
                    isActive
                      ? 'bg-linear-to-r from-primary to-primary-dark border-secondary text-white shadow-lg shadow-primary/30 scale-105'
                      : 'bg-darkmode/70 border-border text-lightblue hover:text-white hover:border-primary/60'
                  }`}>
                  <Icon icon={cat.icon} className={`text-base ${isActive ? 'text-secondary' : 'text-lightblue'}`} />
                  <span>{cat.label}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[11px] font-bold ${
                      isActive ? 'bg-secondary text-darkmode' : 'bg-body-bg text-lightblue'
                    }`}>
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Modules Grid */}
        {filteredModules.length === 0 ? (
          <div className='text-center py-16 bg-darkmode/50 rounded-3xl border border-border max-w-lg mx-auto p-8'>
            <Icon icon='solar:sad-circle-bold' className='text-5xl text-secondary mx-auto mb-3' />
            <h4 className='text-lg font-bold text-white mb-1'>Aucun module trouvé</h4>
            <p className='text-xs text-lightblue mb-4'>
              Aucun résultat ne correspond à votre recherche « {searchQuery} ».
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('all')
              }}
              className='text-xs font-bold text-secondary hover:underline cursor-pointer'>
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'>
            {filteredModules.map((module) => (
              <div
                key={module.id}
                className='bg-darkmode border border-border/80 hover:border-primary/80 rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-xl hover:-translate-y-1.5 transition-all duration-300 group relative overflow-hidden'>
                
                {/* Ambient hover top right corner glow */}
                <div className='absolute -top-12 -right-12 size-28 bg-primary/10 rounded-full blur-xl group-hover:bg-primary/25 transition-all pointer-events-none'></div>

                <div>
                  {/* Top Bar: Category pill + Tagline Badge */}
                  <div className='flex items-center justify-between gap-2 mb-4'>
                    <span className='px-3 py-1 rounded-full bg-body-bg border border-border text-[11px] font-semibold text-lightblue flex items-center gap-1.5'>
                      <Icon icon={module.icon} className='text-secondary text-xs' />
                      <span>{module.categoryLabel}</span>
                    </span>
                    <span className='px-2.5 py-0.5 rounded-full bg-secondary/15 border border-secondary/30 text-[10px] font-black text-secondary uppercase tracking-wider'>
                      {module.badge}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className='flex items-start gap-4 mb-4'>
                    <div className='size-13 rounded-2xl bg-linear-to-br from-primary to-primary-dark p-3 flex items-center justify-center text-secondary shadow-md shadow-primary/20 shrink-0 group-hover:scale-110 transition-transform'>
                      <Icon icon={module.icon} className='text-2xl text-secondary' />
                    </div>
                    <div>
                      <h3 className='text-white text-lg sm:text-xl font-bold leading-tight group-hover:text-secondary transition-colors'>
                        {module.title}
                      </h3>
                      <p className='text-xs text-lightblue/80 mt-1 line-clamp-1'>
                        {module.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Before vs With ARIKE Comparison Snippet */}
                  <div className='p-3.5 rounded-2xl bg-body-bg/80 border border-border/70 mb-4 space-y-2 text-xs'>
                    <div className='flex items-start gap-2'>
                      <span className='size-4 rounded-full bg-red-500/20 text-red-400 font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5'>
                        ✕
                      </span>
                      <p className='text-white/70 line-clamp-2'>
                        <strong className='text-red-400 font-semibold'>Sans ARIKE :</strong> {module.problemWithout}
                      </p>
                    </div>
                    <div className='flex items-start gap-2 pt-1.5 border-t border-border/60'>
                      <span className='size-4 rounded-full bg-emerald-500/20 text-emerald-400 font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5'>
                        ✓
                      </span>
                      <p className='text-white/90 line-clamp-2'>
                        <strong className='text-emerald-400 font-semibold'>Avec ARIKE :</strong> {module.solutionWith}
                      </p>
                    </div>
                  </div>

                  {/* 3 Key Feature Bullets */}
                  <ul className='space-y-1.5 mb-6 text-xs text-lightblue'>
                    {module.features.slice(0, 3).map((feat, idx) => (
                      <li key={idx} className='flex items-center gap-2'>
                        <Icon icon='solar:check-circle-bold' className='text-secondary text-sm shrink-0' />
                        <span className='truncate'>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Action Button */}
                <button
                  onClick={() => setActiveModule(module)}
                  className='w-full py-3 px-4 rounded-xl bg-body-bg hover:bg-primary/30 border border-border hover:border-secondary/60 text-white hover:text-secondary font-bold text-xs flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer group-hover:shadow-md'>
                  <Icon icon='solar:eye-bold' className='text-base text-secondary' />
                  <span>Comprendre ce module en détail</span>
                  <Icon icon='solar:arrow-right-linear' className='text-sm group-hover:translate-x-1 transition-transform' />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Banner Invitation */}
        <div className='mt-16 p-8 rounded-3xl bg-linear-to-r from-darkmode via-[#0E3327] to-darkmode border border-border shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6'>
          <div className='space-y-1.5 text-center lg:text-left'>
            <div className='inline-flex items-center gap-2 text-secondary text-xs font-bold uppercase tracking-wider'>
              <Icon icon='solar:crown-star-bold' className='text-base' />
              <span>100% Inclus dans la version Gratuite Starter</span>
            </div>
            <h4 className='text-xl sm:text-2xl font-bold text-white'>
              Tous ces modules sont activés dès l&apos;installation sans carte bancaire
            </h4>
            <p className='text-lightblue text-xs sm:text-sm max-w-2xl'>
              Installez l&apos;application sur votre smartphone ou tablette et commencez à encaisser vos clients dans la minute qui suit.
            </p>
          </div>

          <div className='flex items-center gap-3 shrink-0 flex-wrap justify-center'>
            <Link
              href='#demo-section'
              className='px-5 py-3 rounded-xl bg-body-bg border border-border hover:border-secondary text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-all'>
              <Icon icon='solar:bolt-circle-bold' className='text-secondary text-lg' />
              <span>Tester la Caisse</span>
            </Link>

            <Link
              href='#download-section'
              className='px-6 py-3 rounded-xl bg-linear-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white text-xs sm:text-sm font-bold shadow-lg shadow-primary/20 flex items-center gap-2 transition-all'>
              <Icon icon='solar:download-square-bold' className='text-lg' />
              <span>Télécharger l&apos;APK Direct</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* DETAILED INTERACTIVE MODAL / DRAWER FOR CHOSEN MODULE                    */}
      {/* ========================================================================= */}
      {activeModule && (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-fadeIn'>
          {/* Backdrop click to close */}
          <div
            onClick={() => setActiveModule(null)}
            className='fixed inset-0 w-full h-full pointer-events-auto'
          />

          {/* Modal Container */}
          <div className='relative z-10 w-full max-w-5xl bg-[#082219] border border-border/90 rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col my-auto'>
            
            {/* Modal Top Bar */}
            <div className='p-5 sm:p-6 border-b border-border bg-darkmode flex items-center justify-between gap-4 shrink-0'>
              <div className='flex items-center gap-3.5'>
                <div className='size-12 rounded-2xl bg-linear-to-br from-primary to-primary-dark p-2.5 flex items-center justify-center text-secondary shadow-md shrink-0'>
                  <Icon icon={activeModule.icon} className='text-2xl text-secondary' />
                </div>
                <div>
                  <div className='flex items-center gap-2 flex-wrap'>
                    <h3 className='text-xl sm:text-2xl font-black text-white'>
                      {activeModule.title}
                    </h3>
                    <span className='px-2.5 py-0.5 rounded-full bg-secondary/20 text-secondary border border-secondary/40 text-[10px] font-black uppercase'>
                      {activeModule.badge}
                    </span>
                  </div>
                  <p className='text-xs text-lightblue mt-0.5'>{activeModule.tagline}</p>
                </div>
              </div>

              <button
                onClick={() => setActiveModule(null)}
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
                        {activeModule.problemWithout}
                      </p>
                    </div>

                    <div className='p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-2'>
                      <div className='flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider'>
                        <Icon icon='solar:check-circle-bold' className='text-base' />
                        <span>Avec ARIKE (La solution)</span>
                      </div>
                      <p className='text-xs text-white/90 leading-relaxed'>
                        {activeModule.solutionWith}
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
                      {activeModule.threeSteps.map((step, idx) => (
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
                        {activeModule.concreteExample.numbers}
                      </span>
                    </div>

                    <h5 className='text-sm font-bold text-white'>
                      « {activeModule.concreteExample.title} »
                    </h5>

                    <p className='text-xs text-lightblue leading-relaxed'>
                      {activeModule.concreteExample.scenario}
                    </p>

                    <div className='pt-2 border-t border-border/60 flex items-center gap-2 text-xs font-semibold text-emerald-400'>
                      <Icon icon='solar:verified-check-bold' className='text-base shrink-0' />
                      <span>{activeModule.concreteExample.result}</span>
                    </div>
                  </div>

                  {/* Full list of features */}
                  <div className='space-y-2'>
                    <h4 className='text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2'>
                      <Icon icon='solar:star-bold' className='text-secondary' />
                      <span>Toutes les capacités du module :</span>
                    </h4>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
                      {activeModule.features.map((feat, idx) => (
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
                          ARIKE Mobile v3.0
                        </p>
                        <h4 className='text-sm font-black text-white truncate'>
                          {activeModule.mockup.screenTitle}
                        </h4>
                      </div>
                      <span className='px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/40'>
                        {activeModule.mockup.badgeStatus}
                      </span>
                    </div>

                    {/* Simulated Highlight Box (Key KPI) */}
                    <div className='p-4 rounded-2xl bg-linear-to-br from-primary/30 to-darkmode border border-secondary/40 text-center space-y-1 shadow-inner'>
                      <p className='text-[10px] uppercase font-bold text-secondary tracking-widest'>
                        {activeModule.mockup.highlightKey}
                      </p>
                      <p className='text-2xl font-black text-white tracking-tight'>
                        {activeModule.mockup.highlightValue}
                      </p>
                    </div>

                    {/* Simulated Item Rows */}
                    <div className='space-y-2 p-3 rounded-2xl bg-darkmode/90 border border-border/80 text-xs'>
                      {activeModule.mockup.items.map((item, idx) => (
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
                    <button className='w-full py-3 rounded-xl bg-linear-to-r from-primary to-secondary text-white text-xs font-black shadow-lg shadow-primary/30 flex items-center justify-center gap-2'>
                      <Icon icon='solar:check-circle-bold' className='text-base' />
                      <span>{activeModule.mockup.primaryAction}</span>
                    </button>

                    <p className='text-[9px] text-center text-lightblue/70 font-sans italic'>
                      Interface réelle et intuitive • Utilisable par tout commerçant
                    </p>
                  </div>

                  {/* Fast Action Buttons in Modal */}
                  <div className='w-full max-w-sm mt-4 flex items-center gap-2.5'>
                    <Link
                      href='#demo-section'
                      onClick={() => setActiveModule(null)}
                      className='flex-1 py-3 px-3 rounded-xl bg-darkmode hover:bg-body-bg border border-border hover:border-secondary text-white text-center text-xs font-bold transition-all flex items-center justify-center gap-1.5'>
                      <Icon icon='solar:bolt-circle-bold' className='text-secondary text-base' />
                      <span>Simuler en direct</span>
                    </Link>

                    <Link
                      href='#download-section'
                      onClick={() => setActiveModule(null)}
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
                onClick={() => setActiveModule(null)}
                className='px-4 py-2 rounded-xl bg-body-bg border border-border text-white hover:border-secondary font-bold text-xs transition-colors cursor-pointer'>
                Fermer l&apos;aperçu
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  )
}

export default Modules
