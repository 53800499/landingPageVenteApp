export interface PlanFeature {
  text: string
  highlight?: boolean
  badge?: string
}

export interface PricingPlan {
  id: string
  code: 'FREE' | 'ESSENTIEL' | 'PRO' | 'BUSINESS' | 'ENTERPRISE'
  name: string
  tagline: string
  target: string
  popular?: boolean
  freeForever?: boolean
  priceMonthly: number
  priceYearly: number
  discountText?: string
  quotas: {
    shops: string
    users: string
    mode: string
  }
  keyFeatures: PlanFeature[]
  ctaText: string
  ctaHref: string
  ctaVariant: 'primary' | 'secondary' | 'outline' | 'gold'
  accentColor: string
}

export interface HardwarePack {
  id: string
  name: string
  badge: string
  price: string
  description: string
  items: string[]
  bonus: string
  ctaHref: string
}

export interface ComparisonCategory {
  categoryName: string
  rows: {
    feature: string
    tooltip?: string
    free: boolean | string
    essentiel: boolean | string
    pro: boolean | string
    business: boolean | string
  }[]
}

export interface ProfileRecommendation {
  id: string
  label: string
  icon: string
  recommendedPlanCode: 'FREE' | 'ESSENTIEL' | 'PRO' | 'BUSINESS'
  description: string
}

export const PROFILE_RECOMMENDATIONS: ProfileRecommendation[] = [
  {
    id: 'solo',
    label: 'Je gère mon commerce seul',
    icon: 'solar:user-bold',
    recommendedPlanCode: 'FREE',
    description: 'Kiosque, étal de marché ou artisan démarrant sans budget fixe.',
  },
  {
    id: 'small_team',
    label: 'J’ai 1 boutique & 1-3 vendeurs',
    icon: 'solar:users-group-two-rounded-bold',
    recommendedPlanCode: 'ESSENTIEL',
    description: 'Besoin de sécuriser les données dans le cloud et tracer les dépenses.',
  },
  {
    id: 'growth',
    label: 'Boutique en essor (stop aux fraudes)',
    icon: 'solar:shield-check-bold',
    recommendedPlanCode: 'PRO',
    description: 'Multi-appareils en simultané, traçage des remises/annulations et IA.',
  },
  {
    id: 'multi_shop',
    label: 'Plusieurs boutiques / Dépôt de gros',
    icon: 'solar:buildings-bold',
    recommendedPlanCode: 'BUSINESS',
    description: 'Back-office web central, transferts inter-boutiques et bureau de change.',
  },
]

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'free',
    code: 'FREE',
    name: 'ARIKE Gratuit',
    tagline: 'L’essentiel autonome pour démarrer sereinement sans débourser un franc.',
    target: 'Micro-commerçants, kiosques, artisans et vendeurs de marché',
    freeForever: true,
    priceMonthly: 0,
    priceYearly: 0,
    quotas: {
      shops: '1 Boutique',
      users: '1 Utilisateur',
      mode: '100% Hors-Ligne',
    },
    keyFeatures: [
      { text: 'Caisse tactile & Vente Flash (< 3s) en FCFA', highlight: true },
      { text: '100% Offline-First (Zéro connexion Internet requise)' },
      { text: 'Gestion de stock local avec alertes de rupture' },
      { text: 'Carnet d’ardoise clients & suivi des dettes / acomptes', highlight: true },
      { text: 'Reçus numériques WhatsApp & impression Bluetooth 58/80mm' },
      { text: 'Clôture de caisse Z journalière' },
      { text: 'Zéro carte bancaire requise, aucun frais caché à vie', badge: 'À Vie' },
    ],
    ctaText: 'Télécharger Gratuitement',
    ctaHref: '#download-section',
    ctaVariant: 'outline',
    accentColor: '#10B981',
  },
  {
    id: 'essentiel',
    code: 'ESSENTIEL',
    name: 'ARIKE Essentiel',
    tagline: 'Sécurisez votre commerce dans le cloud et encadrez vos premiers vendeurs.',
    target: 'Boutiques de quartier, supérettes, commerces de détail établis',
    priceMonthly: 3000,
    priceYearly: 30000,
    discountText: '2 mois offerts (Économisez 6 000 F)',
    quotas: {
      shops: '1 Boutique',
      users: 'Jusqu’à 3 Vendeurs',
      mode: 'Synchronisé Cloud',
    },
    keyFeatures: [
      { text: 'Tout le forfait Gratuit inclus' },
      { text: 'Sauvegarde Cloud automatique (données protégées en cas de vol/panne)', highlight: true, badge: 'Sérénité' },
      { text: 'Jusqu’à 3 comptes utilisateurs avec rôles sécurisés' },
      { text: 'Gestion des dépenses courantes de la boutique' },
      { text: 'Sessions de caisse par vendeur (qui a encaissé quoi)' },
      { text: 'Rapports périodiques d’activité et marges' },
      { text: 'Assistance prioritaire par WhatsApp' },
    ],
    ctaText: 'Choisir Essentiel (Essai 14j)',
    ctaHref: 'https://wa.me/229015380499?text=Bonjour,%20je%20souhaite%20activer%20le%20forfait%20ARIKE%20Essentiel%20(3000%20FCFA/mois)',
    ctaVariant: 'secondary',
    accentColor: '#06B6D4',
  },
  {
    id: 'pro',
    code: 'PRO',
    name: 'ARIKE Pro',
    popular: true,
    tagline: 'La formule plébiscitée pour accélérer vos ventes et éliminer les pertes financières.',
    target: 'Boutiques dynamiques, quincailleries, grossistes et commerces à fort flux',
    priceMonthly: 6000,
    priceYearly: 60000,
    discountText: '2 mois offerts (Économisez 12 000 F)',
    quotas: {
      shops: '2 Boutiques',
      users: 'Jusqu’à 10 Vendeurs',
      mode: 'Multi-Appareils Cloud',
    },
    keyFeatures: [
      { text: 'Tout le forfait Essentiel inclus' },
      { text: 'Multi-Appareils simultanés (plusieurs téléphones sur la même caisse)', highlight: true, badge: 'Vitesse' },
      { text: 'Audit Trail Anti-Fraude inviolable (traçage des remises & annulations)', highlight: true, badge: 'Anti-Vol' },
      { text: 'Assistant IA & Prévisions intelligentes des stocks' },
      { text: 'Gestion des commandes clients & réceptions fournisseurs' },
      { text: 'Relances WhatsApp programmées pour les créances impayées' },
      { text: 'Analyses poussées de rentabilité & marges nettes' },
    ],
    ctaText: 'Passer à ARIKE Pro ⭐',
    ctaHref: 'https://wa.me/229015380499?text=Bonjour,%20je%20souhaite%20activer%20le%20forfait%20ARIKE%20Pro%20(6000%20FCFA/mois)',
    ctaVariant: 'primary',
    accentColor: '#E8A317',
  },
  {
    id: 'business',
    code: 'BUSINESS',
    name: 'ARIKE Business',
    tagline: 'Le contrôle absolu sur plusieurs magasins avec portail web et transferts de stock.',
    target: 'Réseaux de boutiques, demi-grossistes, importateurs et gérants multi-sites',
    priceMonthly: 10000,
    priceYearly: 100000,
    discountText: '2 mois offerts (Économisez 20 000 F)',
    quotas: {
      shops: 'Jusqu’à 5 Boutiques',
      users: 'Jusqu’à 30 Collaborateurs',
      mode: 'Back-Office Web & ERP',
    },
    keyFeatures: [
      { text: 'Tout le forfait Pro inclus' },
      { text: 'Portail Back-Office Web Centralisé pour le patron sur PC/Tablette', highlight: true, badge: 'Direction' },
      { text: 'Transferts de stock inter-boutiques avec bons de décharge' },
      { text: 'Module Bureau de Change & Multidevise (FCFA, NGN, EUR, USD)', highlight: true },
      { text: 'Export comptable universel (Excel, PDF, CSV) & API' },
      { text: 'Rapports consolidés de tout le réseau en temps réel' },
      { text: 'Onboarding personnalisé sur site & formation de votre équipe' },
    ],
    ctaText: 'Déployer Business',
    ctaHref: 'https://wa.me/229015380499?text=Bonjour,%20je%20souhaite%20des%20informations%20sur%20le%20forfait%20ARIKE%20Business%20(10000%20FCFA/mois)',
    ctaVariant: 'gold',
    accentColor: '#F59E0B',
  },
]

export const HARDWARE_PACKS: HardwarePack[] = [
  {
    id: 'pack_starter',
    name: 'Pack Caisse Starter',
    badge: 'Matériel Essentiel',
    price: '45 000 FCFA',
    description: 'La solution prête à l’emploi pour commencer à imprimer des tickets thermiques professionnels dès le premier jour.',
    items: [
      'Imprimante thermique Bluetooth 58mm compacte',
      '10 rouleaux de papier thermique offerts',
      'Câble de charge & chargeur secteur inclus',
      'Configuration express avec votre smartphone en 5 minutes',
    ],
    bonus: '🎁 Inclus : 3 Mois d’Abonnement ARIKE Pro Offerts (Valeur 18 000 FCFA)',
    ctaHref: 'https://wa.me/229015380499?text=Bonjour,%20je%20souhaite%20commander%20le%20Pack%20Caisse%20Starter%20(45000%20FCFA)',
  },
  {
    id: 'pack_pro',
    name: 'Pack Commerce Clé en Main',
    badge: 'Tout-En-Un Recommandé',
    price: '110 000 FCFA',
    description: 'La caisse enregistreuse complète et autonome sans investir dans du matériel informatique coûteux.',
    items: [
      'Smartphone Android 4G haute autonomie dédié à la caisse',
      'Imprimante thermique Bluetooth 58mm sans fil',
      'Support de caisse rotatif sécurisé pour comptoir',
      '15 rouleaux de papier thermique haute densité',
      'Installation et pré-remplissage de votre catalogue d’articles',
    ],
    bonus: '🎁 Inclus : 6 Mois d’Abonnement ARIKE Pro Offerts (Valeur 36 000 FCFA)',
    ctaHref: 'https://wa.me/229015380499?text=Bonjour,%20je%20souhaite%20commander%20le%20Pack%20Commerce%20Clé%20en%20Main%20(110000%20FCFA)',
  },
]

export const COMPARISON_CATEGORIES: ComparisonCategory[] = [
  {
    categoryName: 'Quotas & Déploiement',
    rows: [
      {
        feature: 'Nombre de boutiques gérées',
        free: '1 Boutique',
        essentiel: '1 Boutique',
        pro: '2 Boutiques',
        business: 'Jusqu’à 5 Boutiques',
      },
      {
        feature: 'Comptes utilisateurs / Vendeurs',
        free: '1 Utilisateur',
        essentiel: '3 Utilisateurs',
        pro: '10 Utilisateurs',
        business: '30 Utilisateurs',
      },
      {
        feature: 'Fonctionnement 100% Hors-Ligne (Offline-First)',
        tooltip: 'Continue de fonctionner à 100% même en coupure de courant ou zone blanche',
        free: true,
        essentiel: true,
        pro: true,
        business: true,
      },
      {
        feature: 'Multi-appareils simultanés sur la même boutique',
        tooltip: 'Plusieurs vendeurs peuvent encaisser en même temps sur des téléphones différents',
        free: false,
        essentiel: false,
        pro: true,
        business: true,
      },
      {
        feature: 'Portail Back-Office Web Centralisé (sur PC / Mac)',
        tooltip: 'Tableau de bord de gestion pour le patron accessible depuis n’importe quel navigateur',
        free: false,
        essentiel: false,
        pro: false,
        business: true,
      },
    ],
  },
  {
    categoryName: 'Caisse, Ventes & Encaissement',
    rows: [
      {
        feature: 'Vente Flash ultra-rapide (< 3 secondes)',
        free: true,
        essentiel: true,
        pro: true,
        business: true,
      },
      {
        feature: 'Scanner code-barres par caméra intégrée',
        free: true,
        essentiel: true,
        pro: true,
        business: true,
      },
      {
        feature: 'Partage de reçus numériques par WhatsApp',
        free: true,
        essentiel: true,
        pro: true,
        business: true,
      },
      {
        feature: 'Impression tickets thermiques Bluetooth (58mm / 80mm)',
        free: true,
        essentiel: true,
        pro: true,
        business: true,
      },
      {
        feature: 'Sessions de caisse (ouvertures/clôtures par vendeur)',
        free: false,
        essentiel: true,
        pro: true,
        business: true,
      },
      {
        feature: 'Bons de commande clients & réservations',
        free: false,
        essentiel: false,
        pro: true,
        business: true,
      },
    ],
  },
  {
    categoryName: 'Stocks, Dépenses & Logistique',
    rows: [
      {
        feature: 'Gestion du catalogue articles et prix',
        free: true,
        essentiel: true,
        pro: true,
        business: true,
      },
      {
        feature: 'Alertes sonores de stock critique',
        free: true,
        essentiel: true,
        pro: true,
        business: true,
      },
      {
        feature: 'Registre des dépenses courantes de caisse',
        free: false,
        essentiel: true,
        pro: true,
        business: true,
      },
      {
        feature: 'Réceptions fournisseurs & gestion des approvisionnements',
        free: false,
        essentiel: false,
        pro: true,
        business: true,
      },
      {
        feature: 'Transferts inter-boutiques avec bons de décharge',
        free: false,
        essentiel: false,
        pro: false,
        business: true,
      },
      {
        feature: 'Module Bureau de Change & Devises (FX)',
        free: false,
        essentiel: false,
        pro: false,
        business: true,
      },
    ],
  },
  {
    categoryName: 'Dettes Clients & Recouvrement',
    rows: [
      {
        feature: 'Carnet de crédit digital (Carnet d’ardoise)',
        free: true,
        essentiel: true,
        pro: true,
        business: true,
      },
      {
        feature: 'Gestion des acomptes partiels et solde restant',
        free: true,
        essentiel: true,
        pro: true,
        business: true,
      },
      {
        feature: 'Relances WhatsApp pré-remplies et courtoises en 1 clic',
        free: true,
        essentiel: true,
        pro: true,
        business: true,
      },
      {
        feature: 'Programmation de relances automatiques et échéances',
        free: false,
        essentiel: false,
        pro: true,
        business: true,
      },
    ],
  },
  {
    categoryName: 'Sécurité, Sauvegarde & Anti-Fraude',
    rows: [
      {
        feature: 'Clôture de caisse Z infalsifiable',
        free: true,
        essentiel: true,
        pro: true,
        business: true,
      },
      {
        feature: 'Sauvegarde & Synchronisation Cloud automatique',
        tooltip: 'Restauration instantanée en 1 clic sur un nouveau téléphone en cas de perte ou vol',
        free: false,
        essentiel: true,
        pro: true,
        business: true,
      },
      {
        feature: 'Audit Trail Anti-Fraude (Qui, Quand, Quoi, Pourquoi)',
        tooltip: 'Traçage indélébile des annulations de vente, remises tarifaires et retouches de stock',
        free: false,
        essentiel: false,
        pro: true,
        business: true,
      },
      {
        feature: 'Assistant IA & Analyses prédictives des ventes',
        free: false,
        essentiel: false,
        pro: true,
        business: true,
      },
      {
        feature: 'Export comptable universel (Excel, PDF, CSV) & API',
        free: 'Standard',
        essentiel: 'Standard',
        pro: 'Avancé',
        business: 'Complet + API',
      },
    ],
  },
  {
    categoryName: 'Assistance & Formation',
    rows: [
      {
        feature: 'Documentation et tutoriels vidéo guidés',
        free: true,
        essentiel: true,
        pro: true,
        business: true,
      },
      {
        feature: 'Support WhatsApp & Téléphonique',
        free: 'Communauté',
        essentiel: 'Prioritaire 6j/7',
        pro: 'Prioritaire VIP',
        business: 'Dédié 24/7',
      },
      {
        feature: 'Déplacement et formation de l’équipe sur site',
        free: false,
        essentiel: false,
        pro: 'Sur demande',
        business: 'Inclus',
      },
    ],
  },
]

export const PRICING_FAQ = [
  {
    q: 'Comment fonctionne l’offre GRATUITE à 0 FCFA ? Y a-t-il un piège ?',
    a: 'Aucun piège et aucune carte bancaire demandée. Le forfait Gratuit (Starter) d’ARIKE est actif indéfiniment. Il vous permet de gérer 1 boutique avec 1 compte utilisateur en mode 100% hors-ligne local. Vous pouvez enregistrer toutes vos ventes, vos dettes et vos stocks sans aucune limitation de volume ni publicité.',
  },
  {
    q: 'Comment payer mon abonnement Pro ou Business en Afrique de l’Ouest ?',
    a: 'Le règlement s’effectue en toute simplicité via Mobile Money local (MTN Mobile Money, Moov Money, Celtiis Cash au Bénin, ainsi que Wave ou Orange Money dans la sous-région) ou par virement bancaire. Vous recevez un reçu officiel instantané.',
  },
  {
    q: 'Que se passe-t-il si mon abonnement payant expire et que je ne renouvelle pas immédiatement ?',
    a: 'Vous ne perdez absolument aucune donnée ! Votre application repasse automatiquement et en toute sécurité sur le forfait GRATUIT permanent. Toutes vos ventes, vos clients et vos stocks restent accessibles et modifiables en local sans interruption.',
  },
  {
    q: 'Puis-je changer de forfait à tout moment ?',
    a: 'Oui, vous pouvez passer d’un forfait à un autre (par exemple de Starter à Pro, ou de Pro à Business) à tout moment. Le basculement est instantané dès la validation de votre paiement.',
  },
  {
    q: 'Existe-t-il une période d’essai pour tester les fonctions Cloud et Anti-Fraude ?',
    a: 'Oui ! Lors de l’installation, vous pouvez activer un essai gratuit de 14 jours sur le forfait Pro pour tester la synchronisation cloud et la traçabilité des ventes sans aucun engagement.',
  },
]
