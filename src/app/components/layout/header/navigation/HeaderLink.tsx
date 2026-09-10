'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Icon } from '@iconify/react/dist/iconify.js'
import { HeaderItem } from '../../../../types/menu'

const HeaderLink: React.FC<{ item: HeaderItem }> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false)

  // Standard link without submenu
  if (!item.submenu || item.submenu.length === 0) {
    return (
      <Link
        href={item.href}
        className='text-sm xl:text-[15px] font-semibold text-white/85 hover:text-white py-1 transition-colors relative group whitespace-nowrap'>
        <span>{item.label}</span>
        <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary rounded-full transition-all duration-300 group-hover:w-full'></span>
      </Link>
    )
  }

  // Dropdown link with submenu
  return (
    <div
      className='relative group py-1'
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}>
      {/* Trigger Button */}
      <Link
        href={item.href}
        className='flex items-center gap-1.5 text-sm xl:text-[15px] font-semibold text-white/85 hover:text-white py-1 transition-colors relative whitespace-nowrap cursor-pointer'>
        <span>{item.label}</span>
        <Icon
          icon='solar:alt-arrow-down-linear'
          className='text-xs text-secondary transition-transform duration-200 group-hover:rotate-180'
        />
        <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary rounded-full transition-all duration-300 group-hover:w-full'></span>
      </Link>

      {/* Invisible hover bridge & Floating Dropdown Panel */}
      <div className='absolute top-full -left-6 pt-3 z-50 opacity-0 invisible -translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200 pointer-events-none group-hover:pointer-events-auto'>
        <div className='w-84 p-2 rounded-2xl bg-[#082219]/98 backdrop-blur-2xl border border-border shadow-2xl shadow-black/80 space-y-1'>
          {item.submenu.map((sub, idx) => (
            <Link
              key={idx}
              href={sub.href}
              className='flex items-start gap-3 p-2.5 rounded-xl hover:bg-primary/25 border border-transparent hover:border-primary/40 transition-all group/sub'>
              {/* Submenu Icon */}
              <div className='size-9 rounded-xl bg-linear-to-br from-primary to-primary-dark p-2 flex items-center justify-center text-secondary shrink-0 shadow group-hover/sub:scale-105 transition-transform'>
                <Icon
                  icon={sub.icon || 'solar:alt-arrow-right-bold'}
                  className='text-base text-secondary'
                />
              </div>

              {/* Text info */}
              <div className='grow min-w-0'>
                <div className='flex items-center justify-between gap-1'>
                  <span className='text-xs font-bold text-white group-hover/sub:text-secondary transition-colors truncate'>
                    {sub.label}
                  </span>
                  {sub.badge && (
                    <span className='px-1.5 py-0.2 rounded-full bg-secondary/20 text-secondary text-[9px] font-black border border-secondary/30 shrink-0'>
                      {sub.badge}
                    </span>
                  )}
                </div>
                {sub.description && (
                  <p className='text-[11px] text-lightblue/80 mt-0.5 leading-snug line-clamp-1'>
                    {sub.description}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HeaderLink
