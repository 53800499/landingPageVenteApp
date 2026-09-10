'use client'
import { useEffect, useState } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import FeaturesSkeleton from '../../Skeleton/Features'
import { FeatureType } from '@/app/types/features'

const featureIcons = [
  'solar:cart-large-4-bold',
  'solar:server-square-bold',
  'solar:chat-round-money-bold',
  'solar:box-minimalistic-bold',
  'solar:shield-check-bold',
  'solar:printer-bold',
]

const Features = () => {
  const [featuresdata, setFeaturesdata] = useState<FeatureType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/page-data')
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setFeaturesdata(data?.Featuresdata)
      } catch (error) {
        console.error('Error fetching services:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <section id='features-section' className='scroll-mt-20 py-20 relative'>
      <div className='bg-linear-to-r from-primary/30 to-secondary/15 absolute w-full h-full top-0 -left-1/4 blur-390 pointer-events-none'></div>
      <div className='container relative z-10'>
        {/* Header */}
        <div className='text-center mb-16'>
          <div className='inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/20 border border-primary/40 text-secondary text-xs font-bold uppercase tracking-wider mb-4'>
            Puissance & Simplicité
          </div>
          <h2 className='text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4'>
            Tout pour Piloter votre Boutique au <span className='text-transparent bg-clip-text bg-linear-to-r from-secondary to-gold-soft'>Quotidien</span>
          </h2>
          <p className='text-lightpurple max-w-2xl mx-auto text-base sm:text-lg leading-relaxed'>
            Fini les cahiers égarés, les calculs manuels erronés et les contestations d’impayés. ARIKE réunit tous les outils essentiels dans votre poche.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'>
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <FeaturesSkeleton key={i} />
              ))
            : featuresdata?.map((item, i) => (
                <div
                  className='bg-darkmode border border-border/80 hover:border-primary/80 transition-all duration-300 p-8 rounded-3xl flex flex-col gap-4 shadow-xl hover:-translate-y-1 group relative overflow-hidden'
                  key={i}>
                  {/* Subtle top ambient glow on hover */}
                  <div className='absolute -top-12 -right-12 size-24 bg-primary/10 rounded-full blur-xl group-hover:bg-primary/20 transition-all'></div>

                  <div className='rounded-2xl bg-linear-to-br from-primary to-primary-dark w-fit p-3.5 flex items-center justify-center text-secondary shadow-md shadow-primary/20 group-hover:scale-110 transition-transform'>
                    <Icon icon={featureIcons[i] || 'solar:star-bold'} className='text-2xl text-secondary' />
                  </div>

                  <h3 className='text-white text-lg font-bold'>
                    {item.heading}
                  </h3>

                  <p className='text-lightblue text-sm font-normal leading-relaxed'>
                    {item.subheading}
                  </p>
                </div>
              ))}
        </div>
      </div>
    </section>
  )
}

export default Features
