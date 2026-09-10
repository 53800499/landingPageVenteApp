'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Icon } from '@iconify/react'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react'
import { FaqType } from '@/app/types/faq'

const Faq = () => {
  const [faqdata, setFaqdata] = useState<FaqType[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/page-data')
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setFaqdata(data?.Faqdata)
      } catch (error) {
        console.error('Error fetching services:', error)
      }
    }
    fetchData()
  }, [])

  return (
    <section id='faq-section' className='scroll-mt-20 py-20 overflow-hidden relative'>
      <div className='container relative z-10'>
        <div className='text-center mb-14'>
          <div className='inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-secondary/15 border border-secondary/30 text-secondary text-xs font-bold uppercase tracking-wider mb-4'>
            Foire Aux Questions
          </div>
          <h2 className='text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4'>
            Questions Fréquentes des <span className='text-transparent bg-clip-text bg-linear-to-r from-secondary to-gold-soft'>Commerçants</span>
          </h2>
          <p className='text-lightpurple text-base sm:text-lg max-w-2xl mx-auto leading-relaxed'>
            Vous avez des questions sur le fonctionnement hors-ligne, la sauvegarde de vos données ou l&apos;impression de tickets ? Trouvez ici toutes vos réponses.
          </p>
        </div>

        <div>
          <div className='grid lg:grid-cols-2 items-center gap-8'>
            <div className='w-full'>
              <div className='w-full space-y-4'>
                {faqdata?.map((items, i) => (
                  <div
                    className='w-full rounded-2xl bg-darkmode border border-border hover:border-primary/50 transition-colors p-6'
                    key={i}>
                    <Disclosure>
                      {({ open }) => (
                        <div>
                          <DisclosureButton className='flex w-full justify-between items-center text-white text-left text-base sm:text-lg font-bold cursor-pointer gap-4'>
                            <span>{items.heading}</span>
                            <Icon
                              icon='solar:alt-arrow-down-bold'
                              className={`${
                                open ? 'rotate-180 text-secondary' : 'text-lightblue'
                              } text-xl transition-transform shrink-0`}
                            />
                          </DisclosureButton>
                          <DisclosurePanel className='pt-3 text-sm sm:text-base text-lightblue font-normal leading-relaxed border-t border-border/60 mt-3'>
                            {items.subheading}
                          </DisclosurePanel>
                        </div>
                      )}
                    </Disclosure>
                  </div>
                ))}
              </div>
            </div>
            <div className='hidden lg:flex items-center justify-center p-8'>
              <div className='rounded-3xl bg-body-bg/80 border border-border p-8 text-center max-w-md shadow-2xl relative overflow-hidden'>
                <div className='size-16 rounded-2xl bg-secondary/20 text-secondary flex items-center justify-center mx-auto mb-4'>
                  <Icon icon='solar:chat-round-dots-bold' className='text-3xl' />
                </div>
                <h4 className='text-xl font-bold text-white mb-2'>Une question spécifique ?</h4>
                <p className='text-sm text-lightblue mb-6 leading-relaxed'>
                  Notre équipe d&apos;assistance locale à Cotonou est disponible du lundi au samedi pour vous guider par WhatsApp ou par appel.
                </p>
                <a
                  href='https://wa.me/22990000000?text=Bonjour,%20j%27ai%20une%20question%20sur%20ARIKE'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center gap-2 bg-linear-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-primary/20 text-sm'>
                  <Icon icon='logos:whatsapp-icon' className='text-lg' />
                  <span>Discuter avec un Conseiller</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Faq
