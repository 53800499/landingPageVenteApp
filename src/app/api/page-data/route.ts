import { NextResponse } from 'next/server'

import { HeaderItem } from '@/app/types/menu'
import { SocialType } from '@/app/types/sociallink'
import { FooterType } from '@/app/types/footerlink'
import { WorkType } from '@/app/types/work'
import { FeatureType } from '@/app/types/features'
import { FaqType } from '@/app/types/faq'

const Headerdata: HeaderItem[] = [
  { label: 'Accueil', href: '/' },
  {
    label: 'Solution & Modules',
    href: '/#modules-section',
    submenu: [
      {
        label: 'Les 14 Modules Métiers',
        href: '/#modules-section',
        description: 'Caisse, Dettes WhatsApp, Stocks, Dépenses...',
        icon: 'solar:widget-5-bold',
        badge: '14 Modules',
      },
      {
        label: 'Simulateur de Caisse',
        href: '/#demo-section',
        description: 'Testez l’encaissement interactif en 10s',
        icon: 'solar:calculator-bold',
        badge: 'Direct',
      },
      {
        label: 'Atouts & Spécificités',
        href: '/#features-section',
        description: 'Offline-First, Anti-fraude & Reçus',
        icon: 'solar:star-fall-minimalistic-2-bold',
      },
      {
        label: 'Comment ça marche',
        href: '/#work-section',
        description: 'Installation & prise en main en 3 étapes',
        icon: 'solar:lightbulb-bolt-bold',
      },
    ],
  },
  { label: 'Téléchargement', href: '/#download-section' },
  { label: 'FAQ', href: '/#faq-section' },
  { label: 'Contact', href: '/#contact' },
]

const Companiesdata: { imgSrc: string; name?: string }[] = [
  {
    imgSrc: '/images/companies/birdseye.svg',
    name: 'Marché Dantokpa',
  },
  {
    imgSrc: '/images/companies/break.svg',
    name: 'Marché Ganhi',
  },
  {
    imgSrc: '/images/companies/keddar.svg',
    name: 'Marché Ouando',
  },
  {
    imgSrc: '/images/companies/shield.svg',
    name: 'MTN Mobile Money',
  },
  {
    imgSrc: '/images/companies/tandov.svg',
    name: 'Moov Money',
  },
  {
    imgSrc: '/images/companies/tree.svg',
    name: 'Celtiis Cash',
  },
]

const workdata: WorkType[] = [
  {
    imgSrc: '/images/work/icon-one.svg',
    heading: '1. Téléchargez en 30s',
    subheading:
      'Installez directement l’application APK sur votre smartphone Android sans formalités lourdes ni carte bancaire. Prêt à l’emploi dès le premier lancement.',
  },
  {
    imgSrc: '/images/work/icon-two.svg',
    heading: '2. Vendez 100% Hors-Ligne',
    subheading:
      'Ajoutez vos articles, scannez les codes-barres et encaissez en moins de 3 secondes. Aucune coupure réseau ni problème de 4G ne bloque vos ventes.',
  },
  {
    imgSrc: '/images/work/icon-three.svg',
    heading: '3. Recouvrez & Prospérez',
    subheading:
      'Suivez les créances clients, envoyez des relances WhatsApp polies en un clic et visualisez votre bénéfice net quotidien au franc près.',
  },
]

const Featuresdata: FeatureType[] = [
  {
    imgSrc: '/images/features/featureOne.svg',
    heading: 'Caisse Tactile Ultra-Rapide (< 3s)',
    subheading:
      'Encaissement instantané en Francs CFA (XOF). Panier tactile, scanner code-barre caméra, gestion des remises et calcul automatique de la monnaie.',
  },
  {
    imgSrc: '/images/features/featureTwo.svg',
    heading: '100% Offline-First Sans Coupure',
    subheading:
      'Zéro dépendance à Internet. Base de données locale ultra-rapide (SQLite). Vos ventes ne s’arrêtent jamais, même en zone blanche ou délestage.',
  },
  {
    imgSrc: '/images/features/featureThree.svg',
    heading: 'Recouvrement Dettes & WhatsApp',
    subheading:
      'Remplacez le cahier d’ardoise physique à jamais. Suivi précis des acomptes, fiches clients détaillées et envoi de reçus WhatsApp en 1 tap.',
  },
  {
    imgSrc: '/images/features/featureOne.svg',
    heading: 'Stock Temps Réel & Alertes Rupture',
    subheading:
      'Visualisez vos stocks au jour le jour, recevez des alertes avant la rupture et tracez chaque entrée, sortie ou perte avec un motif précis.',
  },
  {
    imgSrc: '/images/features/featureTwo.svg',
    heading: 'Audit Trail Inviolable & Anti-Fraude',
    subheading:
      'Chaque opération sensible (remise, annulation, ajustement) est tracée : Qui, Quand, Quoi et Pourquoi. Clôture de caisse quotidienne sans triche.',
  },
  {
    imgSrc: '/images/features/featureThree.svg',
    heading: 'Reçus Bluetooth & Multi-Boutiques',
    subheading:
      'Imprimez sur n’importe quelle imprimante thermique Bluetooth 58mm/80mm ESC/POS et pilotez vos points de vente à distance avec le Back-Office.',
  },
]

const Faqdata: FaqType[] = [
  {
    heading: '1. ARIKE fonctionne-t-elle vraiment sans connexion Internet ?',
    subheading:
      'Oui, à 100% ! Toutes vos ventes, vos clients et vos stocks sont enregistrés directement sur votre smartphone. Vous pouvez travailler des semaines entières sans forfait data ni Wi-Fi. Dès que le réseau est disponible, vos données peuvent se synchroniser en arrière-plan sans perturber votre travail.',
  },
  {
    heading: '2. Comment télécharger et installer l’application facilement ?',
    subheading:
      'Cliquez sur le bouton "Télécharger l’APK Android" sur cette page ou scannez le QR code avec votre téléphone. Une fois le fichier téléchargé, appuyez dessus pour l’ouvrir, autorisez l’installation des applications depuis votre navigateur si Android vous le demande, et ARIKE est immédiatement opérationnelle.',
  },
  {
    heading: '3. Comment fonctionne le suivi des dettes et relances WhatsApp ?',
    subheading:
      'Lorsque vous validez une vente à crédit, ARIKE l’associe au nom et numéro du client. Vous voyez à tout moment la somme due et les acomptes versés. En appuyant sur "Relance WhatsApp", l’application génère automatiquement un message courtois et professionnel prêt à être envoyé avec le décompte exact.',
  },
  {
    heading: '4. Mes vendeurs ou employés peuvent-ils supprimer des ventes discrètement ?',
    subheading:
      'Absolument pas. ARIKE intègre une traçabilité inviolable (Audit Trail). Toute annulation de vente dans les 24h, modification de prix ou ajustement d’inventaire nécessite un motif obligatoire et enregistre l’identité de l’utilisateur ainsi que l’heure exacte. Les coulages et fraudes internes sont immédiatement détectés.',
  },
  {
    heading: '5. Puis-je imprimer des reçus pour mes clients ?',
    subheading:
      'Oui ! ARIKE est compatible avec toutes les imprimantes thermiques portables Bluetooth standard (formats 58mm et 80mm). Vous pouvez aussi partager le reçu numérique directement au format PDF ou image par WhatsApp ou SMS.',
  },
  {
    heading: '6. L’application est-elle gratuite ?',
    subheading:
      'ARIKE v3.0 offre un accès gratuit complet sans publicité pour démarrer et gérer votre boutique. Vous pouvez tester toutes les fonctionnalités clés immédiatement sans aucune carte bancaire.',
  },
]

const Sociallinkdata: SocialType[] = [
  { imgsrc: '/images/footer/insta.svg', href: 'https://wa.me/22990000000' },
  { imgsrc: '/images/footer/dribble.svg', href: 'https://facebook.com/' },
  { imgsrc: '/images/footer/twitter.svg', href: 'https://linkedin.com/' },
  { imgsrc: '/images/footer/youtube.svg', href: 'https://youtube.com/' },
]

const Footerlinkdata: FooterType[] = [
  { label: 'Accueil', href: '/' },
  { label: 'Les 14 Modules Métiers', href: '/#modules-section' },
  { label: 'Simulateur Caisse', href: '/#demo-section' },
  { label: 'Fonctionnalités Clés', href: '/#features-section' },
  { label: 'Téléchargement Direct', href: '/#download-section' },
  { label: 'FAQ Commerçants', href: '/#faq-section' },
  { label: 'Contact & Support WhatsApp', href: '/#contact' },
]

export const GET = async () => {
  return NextResponse.json({
    Headerdata,
    Companiesdata,
    workdata,
    Featuresdata,
    Faqdata,
    Sociallinkdata,
    Footerlinkdata,
  })
}
