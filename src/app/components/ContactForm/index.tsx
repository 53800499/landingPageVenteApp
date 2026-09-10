'use client'
import React, { useState, useEffect } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'

const NEED_TAGS = [
  { id: 'demo', label: '🏪 Démo en Boutique', text: 'Demande de démonstration en boutique' },
  { id: 'printer', label: '🖨️ Devis Imprimante Bluetooth', text: 'Devis pour imprimante thermique 58mm/80mm' },
  { id: 'multi', label: '👥 Multi-Boutiques & Équipe', text: 'Gestion multi-boutiques et rôles vendeurs' },
  { id: 'other', label: '❓ Autre Question', text: 'Question générale sur l’application ARIKE' },
]

const ContactForm = () => {
  const [selectedTag, setSelectedTag] = useState(NEED_TAGS[0].id)
  const [formData, setFormData] = useState({
    name: '',
    shopName: '',
    location: '',
    phone: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loader, setLoader] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false)

  useEffect(() => {
    const isValid = formData.name.trim() !== '' && formData.phone.trim() !== ''
    setIsFormValid(isValid)
  }, [formData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleTagClick = (tagId: string) => {
    setSelectedTag(tagId)
    const found = NEED_TAGS.find((t) => t.id === tagId)
    if (found && !formData.message) {
      setFormData((prev) => ({ ...prev, message: found.text }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoader(true)

    const subject = NEED_TAGS.find((t) => t.id === selectedTag)?.text || 'Contact ARIKE'

    // Open WhatsApp with a structured, professional message
    const waText = encodeURIComponent(
      `*Demande ARIKE — ${subject}*\n\n` +
      `👤 *Nom & Prénoms :* ${formData.name}\n` +
      `📞 *Numéro Téléphone :* ${formData.phone}\n` +
      `🏪 *Boutique / Établissement :* ${formData.shopName || 'Non précisé'}\n` +
      `📍 *Ville / Marché :* ${formData.location || 'Bénin'}\n\n` +
      `💬 *Message :* ${formData.message || subject}`
    )
    window.open(`https://wa.me/22997000000?text=${waText}`, '_blank')

    setTimeout(() => {
      setLoader(false)
      setSubmitted(true)
      setFormData({
        name: '',
        shopName: '',
        location: '',
        phone: '',
        message: '',
      })
    }, 800)
  }

  return (
    <section id='contact' className='scroll-mt-14 py-20 lg:py-28 pb-32 sm:pb-36 bg-[#04130E] border-t border-border relative overflow-hidden'>
      {/* Background ambient lighting */}
      <div className='absolute top-0 right-1/4 w-96 h-96 bg-primary/15 rounded-full blur-3xl pointer-events-none'></div>
      <div className='absolute bottom-0 left-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none'></div>

      <div className='container relative z-10'>
        {/* Section Header */}
        <div className='text-center max-w-3xl mx-auto mb-14 sm:mb-16'>
          <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/15 border border-secondary/30 text-secondary text-xs font-bold uppercase tracking-wider mb-4'>
            <Icon icon='solar:chat-round-call-bold' className='text-base' />
            <span>Assistance & Déploiement Local</span>
          </div>
          <h2 className='text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 tracking-tight leading-tight'>
            Besoin d&apos;Aide ou d&apos;une <span className='text-transparent bg-clip-text bg-linear-to-r from-secondary to-gold-soft'>Démonstration</span> ?
          </h2>
          <p className='text-[#E8F5EF] text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-medium'>
            Notre équipe basée à Cotonou vous accompagne gratuitement pour installer l&apos;application, configurer votre caisse et tester les tickets.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start max-w-6xl mx-auto'>

          {/* Left Column: Direct Fast Channels (WhatsApp, Phone, Office) */}
          <div className='lg:col-span-5 flex flex-col gap-5'>

            {/* Direct WhatsApp Callout Card */}
            <div className='p-6 sm:p-7 rounded-3xl bg-[#0A261D] border border-primary/40 shadow-xl relative overflow-hidden group'>
              <div className='flex items-center gap-3.5 mb-4'>
                <div className='size-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30'>
                  <Icon icon='logos:whatsapp-icon' className='text-2xl' />
                </div>
                <div>
                  <h3 className='text-lg font-bold text-white leading-tight'>Assistance WhatsApp Directe</h3>
                  <span className='inline-flex items-center gap-1.5 text-xs text-secondary font-semibold'>
                    <span className='size-1.5 rounded-full bg-emerald-400 animate-pulse'></span>
                    Réponse habituelle en moins de 15 min
                  </span>
                </div>
              </div>

              <p className='text-sm text-lightblue/90 leading-relaxed mb-5'>
                Discutez immédiatement avec un spécialiste pour poser vos questions, demander une démo sur place ou commander une imprimante thermique.
              </p>

              <a
                href='https://wa.me/22997000000?text=Bonjour,%20je%20souhaite%20des%20informations%20sur%20l%27application%20ARIKE'
                target='_blank'
                rel='noopener noreferrer'
                className='w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm shadow-lg shadow-emerald-900/40 transition-all transform hover:-translate-y-0.5 cursor-pointer'>
                <Icon icon='logos:whatsapp-icon' className='text-xl' />
                <span>Ouvrir WhatsApp (+229 53 80 04 99)</span>
              </a>
            </div>

            {/* Local Support & Office Details */}
            <div className='p-6 sm:p-7 rounded-3xl bg-darkmode border border-border shadow-xl space-y-4'>
              <h4 className='text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2'>
                <Icon icon='solar:buildings-bold' className='text-secondary text-base' />
                <span>Présence & Disponibilité au Bénin</span>
              </h4>

              <div className='space-y-3 text-sm text-lightblue/90 divide-y divide-border/60'>
                <div className='pt-2 flex items-start gap-3'>
                  <div className='size-8 rounded-xl bg-primary/20 text-secondary flex items-center justify-center shrink-0 mt-0.5'>
                    <Icon icon='solar:phone-calling-bold' className='text-lg' />
                  </div>
                  <div>
                    <p className='text-xs text-white/60 uppercase font-semibold'>Appels & Urgences</p>
                    <a href='tel:+22997000000' className='text-white font-bold hover:text-secondary transition-colors'>
                      +229 53 80 04 99 / 90 00 00 00
                    </a>
                  </div>
                </div>

                <div className='pt-3 flex items-start gap-3'>
                  <div className='size-8 rounded-xl bg-primary/20 text-secondary flex items-center justify-center shrink-0 mt-0.5'>
                    <Icon icon='solar:map-point-bold' className='text-lg' />
                  </div>
                  <div>
                    <p className='text-xs text-white/60 uppercase font-semibold'>Zone de Couverture</p>
                    <p className='text-white font-medium'>Cotonou, Ganhi, Dantokpa, Calavi, Porto-Novo, Parakou</p>
                  </div>
                </div>

                <div className='pt-3 flex items-start gap-3'>
                  <div className='size-8 rounded-xl bg-primary/20 text-secondary flex items-center justify-center shrink-0 mt-0.5'>
                    <Icon icon='solar:clock-circle-bold' className='text-lg' />
                  </div>
                  <div>
                    <p className='text-xs text-white/60 uppercase font-semibold'>Horaires de Permanence</p>
                    <p className='text-white font-medium'>Lundi au Samedi : 08h00 — 19h00</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: High-Touch Interactive Form */}
          <div className='lg:col-span-7 bg-darkmode border border-border p-6 sm:p-8 lg:p-10 rounded-3xl shadow-2xl relative'>
            <form onSubmit={handleSubmit} className='space-y-6'>

              {/* Quick Demand Selector Tags */}
              <div>
                <label className='block text-xs font-bold uppercase tracking-wider text-white mb-2.5'>
                  Quel est votre besoin principal ?
                </label>
                <div className='flex flex-wrap gap-2'>
                  {NEED_TAGS.map((tag) => (
                    <button
                      key={tag.id}
                      type='button'
                      onClick={() => handleTagClick(tag.id)}
                      className={`text-xs font-bold px-3.5 py-2 rounded-xl border transition-all cursor-pointer ${selectedTag === tag.id
                          ? 'bg-secondary text-darkmode border-secondary shadow-md font-extrabold'
                          : 'bg-body-bg/80 border-border text-lightblue hover:text-white hover:border-primary/60'
                        }`}>
                      {tag.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Fields Grid */}
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5'>
                <div>
                  <label htmlFor='name' className='block text-xs font-bold text-white mb-1.5'>
                    Nom & Prénoms <span className='text-secondary'>*</span>
                  </label>
                  <div className='relative'>
                    <input
                      id='name'
                      type='text'
                      name='name'
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder='Ex: Jean-Baptiste Dossou'
                      className='w-full text-sm sm:text-base px-4 py-3.5 rounded-xl border border-border bg-body-bg text-white focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none transition-colors'
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor='phone' className='block text-xs font-bold text-white mb-1.5'>
                    Numéro WhatsApp / Téléphone <span className='text-secondary'>*</span>
                  </label>
                  <div className='relative'>
                    <input
                      id='phone'
                      type='tel'
                      name='phone'
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder='Ex: +229 53 80 04 99'
                      className='w-full text-sm sm:text-base px-4 py-3.5 rounded-xl border border-border bg-body-bg text-white focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none transition-colors'
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor='shopName' className='block text-xs font-bold text-white mb-1.5'>
                    Nom de votre Boutique / Établissement
                  </label>
                  <input
                    id='shopName'
                    type='text'
                    name='shopName'
                    value={formData.shopName}
                    onChange={handleChange}
                    placeholder='Ex: Éts Grâce Divine'
                    className='w-full text-sm sm:text-base px-4 py-3.5 rounded-xl border border-border bg-body-bg text-white focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none transition-colors'
                  />
                </div>

                <div>
                  <label htmlFor='location' className='block text-xs font-bold text-white mb-1.5'>
                    Ville ou Marché
                  </label>
                  <input
                    id='location'
                    type='text'
                    name='location'
                    value={formData.location}
                    onChange={handleChange}
                    placeholder='Ex: Cotonou (Dantokpa)'
                    className='w-full text-sm sm:text-base px-4 py-3.5 rounded-xl border border-border bg-body-bg text-white focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none transition-colors'
                  />
                </div>
              </div>

              {/* Message / Details Area */}
              <div>
                <label htmlFor='message' className='block text-xs font-bold text-white mb-1.5'>
                  Détails complémentaires (Optionnel)
                </label>
                <textarea
                  id='message'
                  name='message'
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder='Précisez votre activité, le nombre de téléphones de vente, ou toute question sur ARIKE...'
                  className='w-full text-sm sm:text-base px-4 py-3 rounded-xl border border-border bg-body-bg text-white focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none transition-colors resize-none'></textarea>
              </div>

              {/* Submitted Confirmation Message */}
              {submitted && (
                <div className='p-4 rounded-xl bg-primary/30 border border-secondary text-sm text-secondary font-bold text-center flex items-center justify-center gap-2 animate-fadeIn'>
                  <Icon icon='solar:check-circle-bold' className='text-xl' />
                  <span>Votre demande est prête ! WhatsApp s&apos;ouvre pour échanger avec notre conseiller.</span>
                </div>
              )}

              {/* Form Action & Security Guarantee */}
              <div className='pt-2 flex flex-col sm:flex-row items-center justify-between gap-4'>
                <p className='text-[11px] text-lightblue/80 text-center sm:text-left'>
                  🔒 Confidentialité assurée • Aucune donnée n&apos;est revendue.
                </p>

                <button
                  type='submit'
                  disabled={!isFormValid || loader}
                  className={`w-full sm:w-auto inline-flex items-center justify-center gap-2.5 py-4 px-8 rounded-2xl font-bold text-sm sm:text-base transition-all duration-300 ${isFormValid && !loader
                      ? 'bg-linear-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white shadow-xl shadow-primary/30 cursor-pointer transform hover:-translate-y-0.5'
                      : 'bg-border text-lightblue/60 cursor-not-allowed opacity-60'
                    }`}>
                  <Icon icon='logos:whatsapp-icon' className='text-xl' />
                  <span>{loader ? 'Préparation...' : 'Envoyer ma Demande sur WhatsApp'}</span>
                </button>
              </div>

            </form>
          </div>

        </div>
      </div>
    </section>
  )
}

export default ContactForm
