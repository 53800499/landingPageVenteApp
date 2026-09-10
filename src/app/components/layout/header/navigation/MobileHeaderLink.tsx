'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Icon } from '@iconify/react/dist/iconify.js'
import { HeaderItem } from '../../../../types/menu'

const iconMap: Record<string, string> = {
  Accueil: 'solar:home-2-bold',
  'Solution & Modules': 'solar:widget-5-bold',
  'Modules (14)': 'solar:widget-5-bold',
  Fonctionnalités: 'solar:star-fall-minimalistic-2-bold',
  'Simulateur Caisse': 'solar:calculator-bold',
  'Comment ça marche': 'solar:lightbulb-bolt-bold',
  Téléchargement: 'solar:download-square-bold',
  FAQ: 'solar:question-circle-bold',
  Contact: 'solar:chat-round-call-bold',
}

interface MobileHeaderLinkProps {
  item: HeaderItem
  onItemClick?: () => void
}

const MobileHeaderLink: React.FC<MobileHeaderLinkProps> = ({ item, onItemClick }) => {
  const [expanded, setExpanded] = useState(false)
  const icon = iconMap[item.label] || 'solar:alt-arrow-right-bold'
  const hasSubmenu = item.submenu && item.submenu.length > 0

  if (!hasSubmenu) {
    return (
      <div className='relative w-full'>
        <Link
          href={item.href}
          onClick={onItemClick}
          className='flex items-center gap-3.5 w-full py-2.5 px-3 rounded-xl text-white/90 hover:text-white hover:bg-white/10 active:bg-primary/30 transition-all font-semibold text-sm'>
          <span className='size-8 rounded-lg bg-primary/25 text-secondary flex items-center justify-center shrink-0'>
            <Icon icon={icon} className='text-base' />
          </span>
          <span className='grow'>{item.label}</span>
          <Icon icon='solar:alt-arrow-right-bold' className='text-xs text-lightblue/50' />
        </Link>
      </div>
    )
  }

  return (
    <div className='relative w-full rounded-xl bg-darkmode/60 border border-border/50 overflow-hidden'>
      {/* Accordion header button */}
      <button
        type='button'
        onClick={() => setExpanded(!expanded)}
        className='flex items-center justify-between gap-3 w-full py-2.5 px-3 text-white/90 hover:text-white transition-all font-semibold text-sm cursor-pointer'>
        <div className='flex items-center gap-3'>
          <span className='size-8 rounded-lg bg-primary/25 text-secondary flex items-center justify-center shrink-0'>
            <Icon icon={icon} className='text-base' />
          </span>
          <span className='text-left'>{item.label}</span>
        </div>
        <div className='flex items-center gap-1.5'>
          <span className='px-1.5 py-0.2 rounded-full bg-secondary/20 text-secondary text-[10px] font-bold border border-secondary/30'>
            {item.submenu!.length}
          </span>
          <Icon
            icon='solar:alt-arrow-down-linear'
            className={`text-sm text-secondary transition-transform duration-200 ${
              expanded ? 'rotate-180' : ''
            }`}
          />
        </div>
      </button>

      {/* Accordion content */}
      {expanded && (
        <div className='p-2 space-y-1 bg-body-bg/80 border-t border-border/60 animate-fadeIn'>
          {item.submenu!.map((sub, idx) => (
            <Link
              key={idx}
              href={sub.href}
              onClick={onItemClick}
              className='flex items-start gap-2.5 p-2 rounded-lg hover:bg-primary/25 transition-all'>
              <span className='size-7 rounded-lg bg-primary/20 text-secondary flex items-center justify-center shrink-0 mt-0.5'>
                <Icon icon={sub.icon || 'solar:alt-arrow-right-bold'} className='text-sm' />
              </span>
              <div className='grow min-w-0'>
                <div className='flex items-center justify-between gap-1'>
                  <span className='text-xs font-bold text-white truncate'>{sub.label}</span>
                  {sub.badge && (
                    <span className='px-1.5 py-0.2 rounded-full bg-secondary/20 text-secondary text-[8px] font-black shrink-0'>
                      {sub.badge}
                    </span>
                  )}
                </div>
                {sub.description && (
                  <p className='text-[10px] text-lightblue/80 mt-0.5 line-clamp-1'>
                    {sub.description}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default MobileHeaderLink
