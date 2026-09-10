'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  // Top: 0 takes us all the way back to the top of the page
  // Behavior: smooth keeps it smooth!
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    // Button is displayed after scrolling for 500 pixels
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)

    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  return (
    <div className='fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-50'>
      <div className='flex items-center gap-3'>
        <Link
          href='#download-section'
          className='hidden lg:flex items-center gap-2 bg-linear-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white text-xs font-bold px-4 py-3 rounded-xl shadow-xl shadow-primary/30 transition-all duration-300 transform hover:-translate-y-0.5 text-nowrap'>
          <span>Télécharger ARIKE</span>
        </Link>
        {isVisible && (
          <button
            onClick={scrollToTop}
            aria-label='Remonter en haut de la page'
            className='back-to-top flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl bg-darkmode border border-border text-secondary shadow-lg transition duration-300 ease-in-out hover:bg-primary hover:text-white'>
            <span className='mt-1 h-3 w-3 rotate-45 border-l-2 border-t-2 border-current'></span>
          </button>
        )}
      </div>
    </div>
  )
}
