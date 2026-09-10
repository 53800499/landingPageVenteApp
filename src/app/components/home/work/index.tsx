'use client'
import { useEffect, useState } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import WorkSkeleton from '../../Skeleton/Work'
import { WorkType } from '@/app/types/work'

const Work = () => {
  const [workdata, setWorkdata] = useState<WorkType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/page-data')
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setWorkdata(data?.workdata)
      } catch (error) {
        console.error('Error fetching services:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const stepIcons = [
    'solar:download-square-bold',
    'solar:bag-check-bold',
    'solar:chat-round-money-bold',
  ]

  return (
    <section id='work-section' className='relative py-20 scroll-mt-14'>
      <div className='bg-banner-image absolute w-full h-full right-auto blur-390 opacity-40 pointer-events-none' />
      <div className='container relative z-10'>
        <div className='text-center mb-16'>
          <div className='inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-secondary/15 border border-secondary/30 text-secondary text-xs font-bold uppercase tracking-wider mb-4'>
            Démarrage Immédiat
          </div>
          <h2 className='text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4'>
            Comment fonctionne <span className='text-transparent bg-clip-text bg-linear-to-r from-secondary to-gold-soft'>ARIKE</span> ?
          </h2>
          <p className='text-lightpurple max-w-2xl mx-auto text-base sm:text-lg font-normal leading-relaxed'>
            Une solution pensée pour la réalité du terrain. Pas de formalités lourdes, pas besoin de carte bancaire : commencez à vendre en quelques instants.
          </p>
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12'>
          {loading
            ? Array.from({ length: 3 }).map((_, i) => <WorkSkeleton key={i} />)
            : workdata?.map((item, i) => (
                <div
                  className='bg-darkmode border border-border/80 hover:border-primary/80 transition-all duration-300 p-8 relative rounded-3xl group shadow-xl hover:-translate-y-1'
                  key={i}>
                  {/* Step number badge */}
                  <div className='absolute -top-5 left-8 size-11 rounded-2xl bg-linear-to-br from-primary to-secondary text-white font-black text-lg flex items-center justify-center shadow-lg shadow-primary/30 border border-white/20'>
                    0{i + 1}
                  </div>

                  <div className='mt-4 size-14 rounded-2xl bg-primary/20 text-secondary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform'>
                    <Icon icon={stepIcons[i] || 'solar:check-circle-bold'} className='text-3xl' />
                  </div>

                  <h3 className='text-xl text-white font-bold mb-3'>
                    {item.heading}
                  </h3>
                  <p className='text-sm text-lightblue leading-relaxed'>
                    {item.subheading}
                  </p>
                </div>
              ))}
        </div>
      </div>
    </section>
  )
}

export default Work
