'use client'
import React from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'

const hubs = [
  { name: 'Marché Dantokpa', tag: 'Cotonou', icon: 'solar:shop-2-bold' },
  { name: 'MTN Mobile Money', tag: 'Paiement', icon: 'solar:wallet-money-bold' },
  { name: 'Marché Ganhi', tag: 'Centre d’affaires', icon: 'solar:buildings-bold' },
  { name: 'Moov Money', tag: 'Paiement', icon: 'solar:card-transfer-bold' },
  { name: 'Marché Ouando', tag: 'Porto-Novo', icon: 'solar:shop-bold' },
  { name: 'Celtiis Cash', tag: 'Paiement', icon: 'solar:smartphone-2-bold' },
  { name: 'Marché Missèbo', tag: 'Textile & Gros', icon: 'solar:bag-bold' },
  { name: 'Tickets Bluetooth', tag: '58mm / 80mm', icon: 'solar:printer-bold' },
]

const Companies = () => {
  return (
    <section className='border-y border-border/70 py-6 bg-darkmode/50'>
      <div className='container'>
        <div className='flex flex-col md:flex-row items-center justify-between gap-6'>
          <div className='text-center md:text-left shrink-0'>
            <p className='text-xs uppercase font-bold tracking-widest text-secondary'>Écosystème & Terrains</p>
            <p className='text-sm text-white/90 font-medium'>Pensé pour les commerces du Bénin</p>
          </div>

          <div className='flex items-center gap-3 overflow-x-auto w-full pb-2 md:pb-0 scrollbar-none justify-start md:justify-end'>
            {hubs.map((hub, i) => (
              <div
                key={i}
                className='shrink-0 flex items-center gap-2.5 px-4 py-2 rounded-xl bg-body-bg/80 border border-border hover:border-primary/50 transition-colors'>
                <div className='size-7 rounded-lg bg-primary/20 text-secondary flex items-center justify-center'>
                  <Icon icon={hub.icon} className='text-base' />
                </div>
                <div>
                  <p className='text-xs font-bold text-white whitespace-nowrap'>{hub.name}</p>
                  <p className='text-[10px] text-lightblue whitespace-nowrap'>{hub.tag}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Companies
