import Link from 'next/link'
import { Icon } from '@iconify/react/dist/iconify.js'

const Simple = () => {
  return (
    <section className='bg-simple-bg py-20 relative before:absolute before:w-full before:h-full before:bg-arrow-bg before:bg-no-repeat before:top-10 overflow-hidden'>
      <div className='container relative z-10'>
        <div className='max-w-3xl mx-auto text-center'>
          <div className='inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-secondary/20 border border-secondary/40 text-secondary text-xs font-bold uppercase tracking-wider mb-4'>
            Rejoignez le Mouvement
          </div>
          <h2 className='text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight'>
            Prêt à Moderniser et Sécuriser la Gestion de votre <span className='text-transparent bg-clip-text bg-linear-to-r from-secondary to-gold-soft'>Commerce</span> ?
          </h2>
          <p className='text-lightpurple text-base sm:text-lg font-normal mb-10 max-w-2xl mx-auto leading-relaxed'>
            Que vous soyez gérant d&apos;une supérette, quincaillerie, boutique de quartier ou grossiste au marché Dantokpa, ARIKE vous fait gagner du temps et supprime les pertes financières.
          </p>
        </div>

        <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
          <Link
            href='#download-section'
            className='w-full sm:w-auto flex items-center justify-center gap-2 text-base font-bold text-white py-4 px-8 bg-linear-to-r from-primary to-secondary hover:from-secondary hover:to-primary rounded-2xl shadow-xl shadow-primary/30 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer'>
            <Icon icon='solar:download-square-bold' className='text-2xl' />
            <span>Télécharger l&apos;Application Gratuite</span>
          </Link>

          <Link
            href='https://wa.me/22990000000?text=Bonjour,%20je%20souhaite%20des%20informations%20sur%20ARIKE'
            target='_blank'
            rel='noopener noreferrer'
            className='w-full sm:w-auto flex items-center justify-center gap-2 text-base font-semibold text-white py-4 px-8 rounded-2xl border border-border bg-darkmode hover:border-secondary hover:text-secondary transition-all duration-300'>
            <Icon icon='logos:whatsapp-icon' className='text-xl' />
            <span>Échanger sur WhatsApp</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Simple
