'use client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import HeaderLink from './navigation/HeaderLink'
import MobileHeaderLink from './navigation/MobileHeaderLink'
import Logo from './logo'
import { HeaderItem } from '@/app/types/menu'

const Header: React.FC = () => {
  const [navbarOpen, setNavbarOpen] = useState(false)
  const [sticky, setSticky] = useState(false)
  const [navlink, setNavLink] = useState<HeaderItem[]>([])

  const mobileMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/page-data')
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setNavLink(data.Headerdata)
      } catch (error) {
        console.error('Error fetching service', error)
      }
    }
    fetchData()
  }, [])

  const handleScroll = () => {
    setSticky(window.scrollY >= 10)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (
      mobileMenuRef.current &&
      !mobileMenuRef.current.contains(event.target as Node) &&
      navbarOpen
    ) {
      setNavbarOpen(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [navbarOpen])

  useEffect(() => {
    if (navbarOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [navbarOpen])

  return (
    <>
      <header
        className={`fixed top-0 z-40 w-full transition-all duration-300 ${
          sticky
            ? 'shadow-xl bg-[#061B14]/95 backdrop-blur-md border-b border-border/80 py-3'
            : 'shadow-none py-4 sm:py-5'
        }`}>
        <div className='container flex items-center justify-between gap-3'>
          <Logo />

          {/* Desktop Navigation Links (with hover dropdowns) */}
          <nav className='hidden lg:flex items-center gap-6 xl:gap-8 justify-center ml-4'>
            {navlink.map((item, index) => (
              <HeaderLink key={index} item={item} />
            ))}
          </nav>

          {/* Header Action Buttons */}
          <div className='flex items-center gap-2.5 sm:gap-3 shrink-0'>
            {/* Mobile quick-action download pill (<640px) */}
            <Link
              href='#download-section'
              className='flex sm:hidden items-center gap-1.5 bg-primary/25 border border-primary/50 hover:bg-primary/40 text-secondary font-bold text-xs px-3 py-2 rounded-xl transition-colors'>
              <Icon icon='solar:download-square-bold' className='text-base' />
              <span>APK</span>
            </Link>

            {/* Desktop & Tablet Full Download CTA (>=640px) */}
            <Link
              href='#download-section'
              className='hidden sm:flex items-center gap-2 bg-linear-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white font-semibold duration-300 px-4 xl:px-5 py-2.5 rounded-xl shadow-lg shadow-primary/20 text-xs xl:text-sm group'>
              <Icon icon='solar:download-square-bold' className='text-lg xl:text-xl group-hover:translate-y-0.5 transition-transform' />
              <span>Télécharger l&apos;APK</span>
            </Link>

            {/* Burger toggle for mobile & tablet (<1024px) */}
            <button
              onClick={() => setNavbarOpen(!navbarOpen)}
              className='block lg:hidden p-2 rounded-xl bg-darkmode border border-border text-white hover:border-primary transition-colors cursor-pointer'
              aria-label='Toggle navigation menu'>
              <Icon icon={navbarOpen ? 'tabler:x' : 'tabler:menu-2'} className='text-2xl text-white' />
            </button>
          </div>
        </div>
      </header>

      {/* Solid Backdrop Overlay (Placed outside <header> to prevent containing-block clipping) */}
      {navbarOpen && (
        <div
          onClick={() => setNavbarOpen(false)}
          className='fixed inset-0 w-screen h-screen bg-black/80 backdrop-blur-sm z-50 transition-opacity duration-300 lg:hidden'
        />
      )}

      {/* High-Opacity Solid Mobile Navigation Drawer (Spans full 100dvh height, scrollable) */}
      <div
        ref={mobileMenuRef}
        className={`lg:hidden fixed top-0 right-0 h-screen h-dvh w-full max-w-xs sm:max-w-sm bg-[#061B14] border-l border-border shadow-2xl transform transition-transform duration-300 ease-in-out ${
          navbarOpen ? 'translate-x-0' : 'translate-x-full'
        } z-60 flex flex-col justify-between overflow-y-auto`}>
        
        <div>
          {/* Mobile Drawer Top Bar */}
          <div className='flex items-center justify-between p-4 sm:p-5 border-b border-border bg-[#0A261D] shrink-0'>
            <Logo />
            <button
              onClick={() => setNavbarOpen(false)}
              className='p-2 rounded-xl bg-darkmode border border-border text-white/80 hover:text-white cursor-pointer transition-colors'
              aria-label='Fermer le menu'>
              <Icon icon='tabler:x' className='text-xl' />
            </button>
          </div>

          {/* Mobile Navigation Links with Accordion Support */}
          <nav className='flex flex-col p-4 sm:p-5 gap-2'>
            {navlink.map((item, index) => (
              <div key={index} className='w-full'>
                <MobileHeaderLink
                  item={item}
                  onItemClick={() => setNavbarOpen(false)}
                />
              </div>
            ))}
          </nav>
        </div>

        {/* Drawer Bottom Actions & Contacts */}
        <div className='p-4 sm:p-5 border-t border-border bg-[#0A261D]/90 space-y-3 shrink-0'>
          <Link
            href='#download-section'
            onClick={() => setNavbarOpen(false)}
            className='w-full flex items-center justify-center gap-2 bg-linear-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-primary/20 text-sm transition-all'>
            <Icon icon='solar:download-square-bold' className='text-xl' />
            <span>Télécharger ARIKE APK (v3.0)</span>
          </Link>

          <a
            href='https://wa.me/22990000000?text=Bonjour,%20je%20souhaite%20d%C3%A9couvrir%20ARIKE'
            target='_blank'
            rel='noopener noreferrer'
            onClick={() => setNavbarOpen(false)}
            className='w-full flex items-center justify-center gap-2 bg-darkmode border border-border hover:border-secondary text-white font-semibold py-2.5 px-4 rounded-xl text-xs transition-colors'>
            <Icon icon='logos:whatsapp-icon' className='text-base' />
            <span>Assistance WhatsApp Directe</span>
          </a>

          <p className='text-[10px] text-center text-lightblue/80 pt-1'>
            100% Hors-Ligne • Sans Frais Cachés • Cotonou, Bénin
          </p>
        </div>
      </div>
    </>
  )
}

export default Header
