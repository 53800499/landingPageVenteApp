'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Icon } from '@iconify/react/dist/iconify.js'
import Logo from '../header/logo'
import { FooterType } from '@/app/types/footerlink'
import { SocialType } from '@/app/types/sociallink'

const Footer = () => {
  const [sociallink, setSociallink] = useState<SocialType[]>([])
  const [footerlink, setFooterlink] = useState<FooterType[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/page-data')
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setSociallink(data.Sociallinkdata)
        setFooterlink(data.Footerlinkdata)
      } catch (error) {
        console.error('Error fetching service', error)
      }
    }
    fetchData()
  }, [])

  return (
    <footer className='bg-body-bg relative pt-16 border-t border-border'>
      <div className='bg-linear-to-r from-primary/20 to-secondary/15 hidden lg:block absolute w-full h-full top-0 -left-1/2 blur-390 pointer-events-none'></div>
      <div className='container relative z-10 pb-16'>
        <div className='grid grid-cols-1 gap-y-10 md:gap-x-12 sm:grid-cols-2 lg:grid-cols-12'>

          {/* Brand & Mission */}
          <div className='lg:col-span-5 sm:col-span-2'>
            <div className='mb-4'>
              <Logo />
            </div>
            <p className='text-lightblue text-sm font-normal max-w-sm leading-relaxed mb-6'>
              L&apos;ERP de poche populaire & infaillible. Caisse tactile ultra-rapide, suivi des stocks en temps réel et recouvrement des créances par WhatsApp, 100% opérationnel sans Internet.
            </p>
            <div className='flex items-center gap-3'>
              <a
                href='https://wa.me/22990000000'
                target='_blank'
                rel='noopener noreferrer'
                className='size-9 rounded-xl bg-darkmode border border-border flex items-center justify-center text-secondary hover:border-primary transition-colors'>
                <Icon icon='logos:whatsapp-icon' className='text-lg' />
              </a>
              <a
                href='https://facebook.com'
                target='_blank'
                rel='noopener noreferrer'
                className='size-9 rounded-xl bg-darkmode border border-border flex items-center justify-center text-white hover:border-primary transition-colors'>
                <Icon icon='solar:chat-round-bold' className='text-lg text-secondary' />
              </a>
              <a
                href='https://linkedin.com'
                target='_blank'
                rel='noopener noreferrer'
                className='size-9 rounded-xl bg-darkmode border border-border flex items-center justify-center text-white hover:border-primary transition-colors'>
                <Icon icon='solar:link-circle-bold' className='text-lg text-secondary' />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className='lg:col-span-3'>
            <p className='text-white text-base font-bold mb-6 flex items-center gap-2'>
              <span className='size-2 rounded-full bg-secondary'></span>
              <span>Navigation Rapide</span>
            </p>
            <ul className='space-y-3'>
              {footerlink.map((item, i) => (
                <li key={i}>
                  <Link
                    href={item.href}
                    className='text-lightblue hover:text-secondary text-sm font-medium transition-colors'>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Local Office */}
          <div className='lg:col-span-4'>
            <p className='text-white text-base font-bold mb-6 flex items-center gap-2'>
              <span className='size-2 rounded-full bg-secondary'></span>
              <span>Contact & Support Bénin</span>
            </p>
            <div className='space-y-3.5 text-sm text-lightblue'>
              <a
                href='tel:+22997000000'
                className='hover:text-secondary flex items-center gap-2.5 transition-colors'>
                <Icon icon='solar:phone-calling-bold' className='text-secondary text-lg shrink-0' />
                <span>+229 53 80 04 99 / 90 00 00 00</span>
              </a>
              <a
                href='https://wa.me/22990000000'
                target='_blank'
                rel='noopener noreferrer'
                className='hover:text-secondary flex items-center gap-2.5 transition-colors'>
                <Icon icon='logos:whatsapp-icon' className='text-lg shrink-0' />
                <span>Assistance WhatsApp directe</span>
              </a>
              <a
                href='mailto:bassirousikirou59@gmail.com'
                className='hover:text-secondary flex items-center gap-2.5 transition-colors'>
                <Icon icon='solar:letter-bold' className='text-secondary text-lg shrink-0' />
                <span>bassirousikirou59@gmail.com</span>
              </a>
              <div className='flex items-start gap-2.5 pt-1'>
                <Icon icon='solar:map-point-bold' className='text-secondary text-lg shrink-0 mt-0.5' />
                <span>Cotonou (Ganhi / Dantokpa), République du Bénin</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Copyright Bar */}
      <div className='py-6 px-4 border-t border-border/80 bg-darkmode/40 text-xs text-center text-lightblue'>
        <div className='container flex flex-col sm:flex-row items-center justify-between gap-2'>
          <p>© 2026 ARIKE — Tous droits réservés.</p>
          <p className='text-secondary font-medium'>Conçu & Développé avec fierté pour l&apos;économie du Bénin & de l&apos;UEMOA.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
