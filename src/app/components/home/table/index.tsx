'use client'
import React, { useState } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import Image from 'next/image'

interface ProductItem {
  id: string
  name: string
  category: string
  price: number
  icon: string
}

const CATALOG: ProductItem[] = [
  { id: '1', name: 'Sac de Riz Parfumé 50kg', category: 'Alimentation', price: 24500, icon: '🍚' },
  { id: '2', name: 'Bidon Huile Végétale 5L', category: 'Alimentation', price: 6500, icon: '🛢️' },
  { id: '3', name: 'Carton Spaghetti 20x', category: 'Alimentation', price: 4000, icon: '🍝' },
  { id: '4', name: 'Sac Ciment Portland 50kg', category: 'Quincaillerie', price: 4800, icon: '🧱' },
  { id: '5', name: 'Boîte Tomate Concentrée 2.2kg', category: 'Alimentation', price: 3200, icon: '🥫' },
  { id: '6', name: 'Paquet Sucre en Morceaux', category: 'Épicerie', price: 1100, icon: '🍬' },
]

const Table = () => {
  const [cart, setCart] = useState<{ [id: string]: number }>({
    '1': 1,
    '2': 2,
  })
  const [paymentMode, setPaymentMode] = useState<'cash' | 'momo' | 'moov' | 'credit'>('momo')
  const [clientName, setClientName] = useState('Mme Tossou (Boutique Ganhi)')
  const [saleValidated, setSaleValidated] = useState(false)

  const addToCart = (id: string) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }))
    setSaleValidated(false)
  }

  const removeFromCart = (id: string) => {
    setCart((prev) => {
      const updated = { ...prev }
      if (updated[id] > 1) {
        updated[id] -= 1
      } else {
        delete updated[id]
      }
      return updated
    })
    setSaleValidated(false)
  }

  const clearCart = () => {
    setCart({})
    setSaleValidated(false)
  }

  const cartEntries = Object.entries(cart).map(([id, qty]) => {
    const item = CATALOG.find((p) => p.id === id)!
    return { item, qty, total: item.price * qty }
  })

  const grandTotal = cartEntries.reduce((acc, curr) => acc + curr.total, 0)
  const estimatedProfit = Math.round(grandTotal * 0.14) // ~14% net margin

  return (
    <section id='demo-section' className='scroll-mt-20 py-20 relative'>
      <div className='bg-linear-to-r from-primary/30 to-secondary/20 absolute w-full h-full top-0 blur-390 pointer-events-none'></div>

      <div className='container relative z-10'>
        <div className='text-center mb-14'>
          <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 border border-primary/40 text-secondary text-xs font-bold uppercase tracking-wider mb-4'>
            <Icon icon='solar:bolt-circle-bold' className='text-base' />
            <span>Démo Interactive en Direct</span>
          </div>
          <h2 className='text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4'>
            Testez la Caisse <span className='text-transparent bg-clip-text bg-linear-to-r from-secondary to-gold-soft'>ARIKE</span> en 10 Secondes
          </h2>
          <p className='text-lightpurple max-w-2xl mx-auto text-base sm:text-lg'>
            Ajoutez des articles populaires de nos marchés, choisissez le mode de règlement et observez la rapidité de calcul et la génération du ticket.
          </p>
        </div>

        <div className='rounded-3xl bg-darkmode border border-border p-6 lg:p-10 shadow-2xl relative overflow-hidden'>

          <div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>

            <div className='lg:col-span-7 flex flex-col justify-between'>
              <div>
                <div className='flex items-center justify-between mb-4'>
                  <div>
                    <h3 className='text-lg font-bold text-white flex items-center gap-2'>
                      <Icon icon='solar:box-minimalistic-bold' className='text-secondary' />
                      <span>1. Sélectionnez vos articles</span>
                    </h3>
                    <p className='text-xs text-lightblue'>Touchez un article pour l&apos;ajouter au panier tactile</p>
                  </div>
                  <span className='text-xs px-2.5 py-1 rounded-full bg-primary/20 text-secondary border border-primary/30 font-semibold'>
                    Mode Hors-Ligne Actif
                  </span>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4'>
                  {CATALOG.map((product) => {
                    const inCartCount = cart[product.id] || 0
                    return (
                      <div
                        key={product.id}
                        onClick={() => addToCart(product.id)}
                        className={`p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between group ${inCartCount > 0
                            ? 'bg-primary/20 border-secondary/60 shadow-md shadow-primary/10'
                            : 'bg-body-bg/80 border-border hover:border-primary/50 hover:bg-body-bg'
                          }`}>
                        <div className='flex items-center gap-3'>
                          <span className='text-2xl size-10 rounded-xl bg-darkmode flex items-center justify-center border border-border group-hover:scale-110 transition-transform'>
                            {product.icon}
                          </span>
                          <div>
                            <p className='text-xs sm:text-sm font-bold text-white leading-tight'>{product.name}</p>
                            <p className='text-xs font-semibold text-secondary mt-0.5'>
                              {product.price.toLocaleString('fr-FR')} FCFA
                            </p>
                          </div>
                        </div>

                        {inCartCount > 0 ? (
                          <span className='size-7 rounded-full bg-secondary text-white font-black text-xs flex items-center justify-center shadow'>
                            {inCartCount}
                          </span>
                        ) : (
                          <span className='size-7 rounded-full bg-darkmode border border-border text-lightblue flex items-center justify-center text-xs group-hover:border-secondary group-hover:text-white'>
                            +
                          </span>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className='mt-8 pt-6 border-t border-border'>
                <h3 className='text-sm font-bold text-white mb-3 flex items-center gap-2'>
                  <Icon icon='solar:wallet-money-bold' className='text-secondary' />
                  <span>2. Choisissez le mode d&apos;encaissement</span>
                </h3>
                <div className='grid grid-cols-2 sm:grid-cols-4 gap-2.5'>
                  <button
                    onClick={() => setPaymentMode('momo')}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all flex flex-col items-center gap-1 cursor-pointer ${paymentMode === 'momo'
                        ? 'bg-primary/30 border-secondary text-white shadow-md'
                        : 'bg-body-bg border-border text-lightblue hover:text-white'
                      }`}>
                    <Icon icon='solar:smartphone-2-bold' className='text-lg text-secondary' />
                    <span>MTN MoMo</span>
                  </button>

                  <button
                    onClick={() => setPaymentMode('moov')}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all flex flex-col items-center gap-1 cursor-pointer ${paymentMode === 'moov'
                        ? 'bg-primary/30 border-secondary text-white shadow-md'
                        : 'bg-body-bg border-border text-lightblue hover:text-white'
                      }`}>
                    <Icon icon='solar:smartphone-update-bold' className='text-lg text-secondary' />
                    <span>Moov Money</span>
                  </button>

                  <button
                    onClick={() => setPaymentMode('cash')}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all flex flex-col items-center gap-1 cursor-pointer ${paymentMode === 'cash'
                        ? 'bg-primary/30 border-secondary text-white shadow-md'
                        : 'bg-body-bg border-border text-lightblue hover:text-white'
                      }`}>
                    <Icon icon='solar:banknote-2-bold' className='text-lg text-secondary' />
                    <span>Espèces (Cash)</span>
                  </button>

                  <button
                    onClick={() => setPaymentMode('credit')}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all flex flex-col items-center gap-1 cursor-pointer ${paymentMode === 'credit'
                        ? 'bg-primary/30 border-secondary text-white shadow-md'
                        : 'bg-body-bg border-border text-lightblue hover:text-white'
                      }`}>
                    <Icon icon='solar:user-hand-up-bold' className='text-lg text-secondary' />
                    <span>Vente à Crédit</span>
                  </button>
                </div>
              </div>
            </div>

            <div className='lg:col-span-5 bg-body-bg rounded-2xl border border-border p-6 flex flex-col justify-between relative shadow-inner'>
              <div>
                <div className='flex items-center justify-between pb-3 border-b border-border'>
                  <div className='flex items-center gap-2'>
                    <div className='size-2.5 rounded-full bg-emerald-400'></div>
                    <span className='text-xs font-bold text-white uppercase tracking-wider'>Aperçu Ticket Caisse</span>
                  </div>
                  {cartEntries.length > 0 && (
                    <button
                      onClick={clearCart}
                      className='text-[11px] text-lightblue hover:text-red-400 font-medium underline cursor-pointer'>
                      Vider le panier
                    </button>
                  )}
                </div>

                <div className='mt-4 p-4 rounded-xl bg-darkmode/70 border border-border/80 font-mono text-xs text-white/90 space-y-2'>
                  <div className='text-center pb-2 border-b border-dashed border-border/80'>
                    <p className='font-bold text-sm tracking-wider text-secondary'>*** BOUTIQUE ARIKE ***</p>
                    <p className='text-[10px] text-lightblue'>Marché Ganhi • Cotonou, Bénin</p>
                    <p className='text-[10px] text-lightblue'>Tél: +229 53 80 04 99</p>
                  </div>

                  <div className='py-2 space-y-2 max-h-44 overflow-y-auto'>
                    {cartEntries.length === 0 ? (
                      <p className='text-center text-lightblue py-6 font-sans italic text-xs'>
                        Panier vide. Cliquez sur un article à gauche pour l&apos;ajouter !
                      </p>
                    ) : (
                      cartEntries.map(({ item, qty, total }) => (
                        <div key={item.id} className='flex items-center justify-between'>
                          <div className='pr-2 truncate'>
                            <p className='truncate font-medium'>{item.name}</p>
                            <p className='text-[10px] text-lightblue'>
                              {qty} × {item.price.toLocaleString('fr-FR')} F
                            </p>
                          </div>
                          <div className='flex items-center gap-2 shrink-0'>
                            <span className='font-bold'>{total.toLocaleString('fr-FR')} F</span>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className='text-red-400 hover:text-red-300 px-1 cursor-pointer font-sans'>
                              ✕
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <div className='pt-2 border-t border-dashed border-border/80 space-y-1'>
                    <div className='flex justify-between font-bold text-sm text-white'>
                      <span>TOTAL :</span>
                      <span className='text-secondary'>{grandTotal.toLocaleString('fr-FR')} FCFA</span>
                    </div>
                    <div className='flex justify-between text-[10px] text-lightblue'>
                      <span>Règlement :</span>
                      <span className='uppercase font-semibold text-white'>
                        {paymentMode === 'cash' && 'Espèces'}
                        {paymentMode === 'momo' && 'MTN Mobile Money'}
                        {paymentMode === 'moov' && 'Moov Money'}
                        {paymentMode === 'credit' && `Crédit Client (${clientName})`}
                      </span>
                    </div>
                    <div className='flex justify-between text-[10px] text-emerald-400 font-semibold'>
                      <span>Bénéfice net estimé :</span>
                      <span>+{estimatedProfit.toLocaleString('fr-FR')} FCFA</span>
                    </div>
                  </div>

                  <div className='pt-2 text-center text-[10px] text-lightblue border-t border-dashed border-border/80'>
                    <p>Merci pour votre achat !</p>
                    <p className='text-[9px] text-secondary'>100% Hors-Ligne • Propulsé par ARIKE</p>
                  </div>
                </div>
              </div>

              <div className='mt-5 pt-3'>
                {saleValidated ? (
                  <div className='p-4 rounded-xl bg-primary/30 border border-secondary/50 text-center space-y-2 animate-fadeIn'>
                    <div className='flex items-center justify-center gap-2 text-secondary font-bold text-sm'>
                      <Icon icon='solar:check-circle-bold' className='text-xl' />
                      <span>Vente validée en 1.8 seconde !</span>
                    </div>
                    <p className='text-xs text-white/90'>
                      Stock mis à jour localement • Reçu WhatsApp prêt à être partagé au client
                    </p>
                    <button
                      onClick={() => setSaleValidated(false)}
                      className='text-xs font-semibold text-secondary hover:underline cursor-pointer'>
                      Effectuer une autre vente
                    </button>
                  </div>
                ) : (
                  <button
                    disabled={grandTotal === 0}
                    onClick={() => setSaleValidated(true)}
                    className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${grandTotal > 0
                        ? 'bg-linear-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white shadow-lg shadow-primary/30 cursor-pointer'
                        : 'bg-border text-lightblue cursor-not-allowed opacity-60'
                      }`}>
                    <Icon icon='solar:bag-check-bold' className='text-xl' />
                    <span>Encaisser {grandTotal.toLocaleString('fr-FR')} FCFA (Simuler)</span>
                  </button>
                )}
              </div>

            </div>

          </div>

        </div>
      </div>
      <Image
        src={'/images/table/Untitled.svg'}
        alt='ellipse'
        width={2460}
        height={102}
      />
    </section>
  )
}

export default Table
