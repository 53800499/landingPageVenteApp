export interface ModuleDetail {
  id: string
  title: string
  shortName: string
  category: 'caisse' | 'dettes' | 'stocks' | 'finances' | 'securite'
  categoryLabel: string
  icon: string
  tagline: string
  color: string
  badge: string
  problemWithout: string
  solutionWith: string
  threeSteps: [
    { title: string; desc: string },
    { title: string; desc: string },
    { title: string; desc: string }
  ]
  features: string[]
  concreteExample: {
    title: string
    scenario: string
    numbers: string
    result: string
  }
  mockup: {
    screenTitle: string
    badgeStatus: string
    highlightKey: string
    highlightValue: string
    items: { label: string; value: string; sub?: string; color?: string }[]
    primaryAction: string
  }
}

export const MODULE_CATEGORIES = [
  { id: 'all', label: 'Tous les modules (14)', icon: 'solar:widget-5-bold' },
  { id: 'caisse', label: 'Vente & Caisse', icon: 'solar:cart-large-4-bold' },
  { id: 'dettes', label: 'Dettes & Clients', icon: 'solar:chat-round-money-bold' },
  { id: 'stocks', label: 'Stocks & Logistique', icon: 'solar:box-minimalistic-bold' },
  { id: 'finances', label: 'Trésorerie & Dépenses', icon: 'solar:wallet-money-bold' },
  { id: 'securite', label: 'Sécurité & Offline', icon: 'solar:shield-check-bold' },
] as const

export const MODULES_DATA: ModuleDetail[] = [
  // 1. Caisse & Ventes
  {
    id: 'pos-sales',
    title: 'Caisse Tactile & Ventes Express',
    shortName: 'Caisse & Ventes',
    category: 'caisse',
    categoryLabel: 'Vente & Caisse',
    icon: 'solar:cart-large-4-bold',
    tagline: 'Vendez en moins de 3 secondes avec ou sans code-barres',
    color: '#0B6E4F',
    badge: 'Cœur de Vente',
    problemWithout:
      'Files d’attente interminables, calculs manuels sur papier avec des risques d’erreurs de monnaie et tickets illisibles.',
    solutionWith:
      'Un terminal de caisse tactile ultra-rapide (< 3 secondes par client), un scanner caméra pour les codes-barres et le calcul automatique de la monnaie.',
    threeSteps: [
      {
        title: '1. Choisissez ou scannez',
        desc: 'Touchez l’article sur votre écran ou scannez son code-barres avec l’appareil photo du téléphone.',
      },
      {
        title: '2. Sélectionnez le mode',
        desc: 'Encaissez en Espèces, MTN MoMo, Moov Money, Celtiis Cash ou Vente à Crédit.',
      },
      {
        title: '3. Validez & Imprimez',
        desc: 'Le stock est déduit instantanément, la monnaie est calculée et le ticket Bluetooth ou WhatsApp est prêt.',
      },
    ],
    features: [
      'Encaissement instantané en moins de 3 secondes',
      'Mode Express pour vente au montant sans détailler les articles',
      'Scanner caméra de codes-barres ultra-réactif',
      'Gestion des remises en % ou montant fixe en FCFA',
      'Multi-moyens de paiement (Espèces, MoMo, Moov, Crédit)',
    ],
    concreteExample: {
      title: 'Affluence du samedi matin au marché',
      scenario:
        'Un client prend 1 sac de riz 50kg (24 500 F) et 2 bidons d’huile (13 000 F). Il donne 40 000 F en espèces.',
      numbers: 'Total : 37 500 FCFA • Reçu : 40 000 FCFA',
      result:
        'ARIKE affiche immédiatement "Monnaie à rendre : 2 500 F". Vente enregistrée en 2 clics sans erreur.',
    },
    mockup: {
      screenTitle: 'Nouvelle Vente • Panier (2)',
      badgeStatus: 'Hors-Ligne Actif',
      highlightKey: 'TOTAL À PAYER',
      highlightValue: '37 500 FCFA',
      items: [
        { label: 'Riz Parfumé 50kg', value: '24 500 F', sub: '1 sac' },
        { label: 'Huile Végétale 5L', value: '13 000 F', sub: '2 bidons (6 500 F/u)' },
        { label: 'Monnaie à rendre', value: '2 500 F', sub: 'Sur 40 000 F donnés', color: 'text-emerald-400' },
      ],
      primaryAction: 'Encaisser 37 500 FCFA',
    },
  },

  // 2. Sessions de Caisse
  {
    id: 'cash-sessions',
    title: 'Sessions de Caisse & Clôture X/Z',
    shortName: 'Sessions de Caisse',
    category: 'caisse',
    categoryLabel: 'Vente & Caisse',
    icon: 'solar:safe-square-bold',
    tagline: 'Fini les trous de caisse inexpliqués en fin de journée',
    color: '#0B6E4F',
    badge: 'Anti-Écarts',
    problemWithout:
      'Impossible de savoir combien d’argent liquide devrait être dans le tiroir-caisse le soir, facilitant les coulage et disparitions de billets.',
    solutionWith:
      'Ouverture obligatoire avec déclaration du fond de caisse initial le matin et clôture le soir avec calcul automatique des écarts.',
    threeSteps: [
      {
        title: '1. Ouverture du matin',
        desc: 'Le vendeur saisit son fond de caisse en monnaie (ex: 20 000 FCFA pour faire la monnaie).',
      },
      {
        title: '2. Ventes & Dépenses de la journée',
        desc: 'Chaque vente en espèces s’ajoute au solde théorique ; chaque dépense autorisée en est déduite.',
      },
      {
        title: '3. Clôture & Comptage du soir',
        desc: 'Le gérant compte physiquement les billets et pièces. ARIKE compare avec le solde théorique et calcule l’écart au franc près.',
      },
    ],
    features: [
      'Ouverture de session avec fond de caisse tracé',
      'Suivi en direct des flux physiques d’espèces',
      'Rapprochement comptable de clôture (Tickets X de mi-journée et Z du soir)',
      'Déclaration obligatoire d’un motif en cas d’écart de caisse > 500 F',
      'Rapport de caisse imprimable et transmissible au gérant par WhatsApp',
    ],
    concreteExample: {
      title: 'Clôture de soirée à la supérette',
      scenario:
        'Fond de caisse : 25 000 F + Ventes espèces : 180 000 F - Dépense transport : 5 000 F = 200 000 F attendus.',
      numbers: 'Attendu : 200 000 FCFA • Compté dans la caisse : 200 000 FCFA',
      result: 'Écart : 0 FCFA. Caisse parfaitement équilibrée, zéro perte.',
    },
    mockup: {
      screenTitle: 'Clôture de Caisse (Session #142)',
      badgeStatus: 'Contrôle Soir',
      highlightKey: 'SOLDE THÉORIQUE EN CAISSE',
      highlightValue: '200 000 FCFA',
      items: [
        { label: 'Fond de caisse matin', value: '25 000 F' },
        { label: 'Total espèces encaissées', value: '+180 000 F' },
        { label: 'Sorties de caisse (courses)', value: '-5 000 F' },
        { label: 'Écart de caisse final', value: '0 FCFA (Parfait)', color: 'text-emerald-400' },
      ],
      primaryAction: 'Valider la Clôture Z',
    },
  },

  // 3. Reçus & Factures
  {
    id: 'receipts-printing',
    title: 'Reçus Bluetooth & Factures WhatsApp',
    shortName: 'Reçus & Tickets',
    category: 'caisse',
    categoryLabel: 'Vente & Caisse',
    icon: 'solar:printer-bold',
    tagline: 'Imprimez sur papier thermique ou partagez directement sur WhatsApp',
    color: '#0B6E4F',
    badge: 'Professionnalisme',
    problemWithout:
      'Reçus écrits à la main sur bouts de papier souvent égarés par le client, illisibles et sources de contestations ultérieures.',
    solutionWith:
      'Génération instantanée de tickets de caisse normalisés avec logo de la boutique, imprimables en Bluetooth 58mm/80mm ou partageables par WhatsApp et SMS.',
    threeSteps: [
      {
        title: '1. Validation de vente',
        desc: 'Dès que vous validez la vente, le reçu au format normalisé REC-2026-XXXX est généré.',
      },
      {
        title: '2. Choix du support',
        desc: 'Appuyez sur "Imprimer Bluetooth" ou "Envoyer par WhatsApp" selon la préférence du client.',
      },
      {
        title: '3. Image de marque renforcée',
        desc: 'Le client reçoit un reçu professionnel mentionnant le nom de votre boutique, date, articles et coordonnées.',
      },
    ],
    features: [
      'Compatible 100% avec les imprimantes thermiques Bluetooth portables (58mm et 80mm)',
      'Partage direct du reçu numérique en image ou PDF sur WhatsApp',
      'Mention du mode de paiement et de la monnaie rendue',
      'Personnalisation du nom, numéro et message de remerciement de la boutique',
      'Réimpression possible à tout moment depuis l’historique des ventes',
    ],
    concreteExample: {
      title: 'Vente à un client pressé',
      scenario:
        'Le client achète pour 15 000 F de fournitures et demande un justificatif pour son patron.',
      numbers: 'Reçu n° REC-20260909-0034 • Format PDF Pro',
      result:
        'En 1 clic, le reçu PDF complet avec en-tête de votre boutique est expédié sur son WhatsApp.',
    },
    mockup: {
      screenTitle: 'Ticket n° REC-20260909-0034',
      badgeStatus: 'Imprimé & Partagé',
      highlightKey: 'MONTANT TOTAL RÉGLÉ',
      highlightValue: '15 000 FCFA',
      items: [
        { label: 'Boutique Émettrice', value: 'Boutique Ganhi' },
        { label: 'Mode de règlement', value: 'MTN Mobile Money' },
        { label: 'Statut du paiement', value: 'Soldé 100%', color: 'text-emerald-400' },
      ],
      primaryAction: 'Partager sur WhatsApp',
    },
  },

  // 4. Carnet de Dettes & Recouvrement
  {
    id: 'debts-whatsapp',
    title: 'Carnet de Dettes & Relances WhatsApp',
    shortName: 'Dettes & Recouvrement',
    category: 'dettes',
    categoryLabel: 'Dettes & Clients',
    icon: 'solar:chat-round-money-bold',
    tagline: 'Supprimez l’ardoise papier et récupérez 100% de vos impayés sans conflit',
    color: '#E8A317',
    badge: 'Anti-Impayés n°1',
    problemWithout:
      'Cahiers de crédit perdus, montants contestés par les clients ("j’avais déjà payé 5 000 F la semaine dernière !"), gênes et retards chroniques.',
    solutionWith:
      'Un carnet numérique infalsifiable enregistrant chaque crédit et chaque acompte, avec relance WhatsApp courtoise pré-remplie en 1 clic.',
    threeSteps: [
      {
        title: '1. Enregistrez le crédit',
        desc: 'Lors de la vente, choisissez "Crédit Client" et sélectionnez ou créez la fiche du client avec son numéro.',
      },
      {
        title: '2. Consignez chaque acompte',
        desc: 'Dès que le client verse 2 000 F ou 10 000 F, ARIKE déduit la somme et met à jour le reste à payer.',
      },
      {
        title: '3. Relancez poliment par WhatsApp',
        desc: 'Un bouton dédié ouvre WhatsApp avec un message amical détaillant le montant restant dû et les coordonnées de la boutique.',
      },
    ],
    features: [
      'Remplacement intégral du cahier d’ardoise physique',
      'Historique immuable de tous les acomptes versés par date et heure',
      'Message de relance WhatsApp automatique, poli et personnalisé',
      'Alerte automatique sur les dettes sans versement depuis plus de 30 jours',
      'Option sécurisée "Pardon de dette" réservée au patron avec motif obligatoire',
    ],
    concreteExample: {
      title: 'Mme Sossou au marché Ganhi',
      scenario:
        'Achat initial à crédit de 45 000 F. Elle a déjà versé 2 acomptes de 10 000 F chacun.',
      numbers: 'Initial : 45 000 F • Reste dû : 25 000 F (44% soldé)',
      result:
        'Un tap sur "Relance WhatsApp" envoie son relevé exact. Elle remercie et verse les 25 000 F restants par MoMo.',
    },
    mockup: {
      screenTitle: 'Fiche Dette • Mme Sossou',
      badgeStatus: 'Relance Recommandée',
      highlightKey: 'RESTE À RECOUVRER',
      highlightValue: '25 000 FCFA',
      items: [
        { label: 'Montant initial', value: '45 000 F' },
        { label: 'Acomptes versés (2)', value: '20 000 F (Espèces & MoMo)' },
        { label: 'Ancienneté du crédit', value: '14 jours' },
        { label: 'Progression remboursement', value: '44% effectué', color: 'text-secondary' },
      ],
      primaryAction: 'Envoyer Rappel WhatsApp',
    },
  },

  // 5. Fiches Clients & CRM
  {
    id: 'customers-crm',
    title: 'Fiches Clients & Historique d’Achats',
    shortName: 'Répertoire Clients',
    category: 'dettes',
    categoryLabel: 'Dettes & Clients',
    icon: 'solar:users-group-two-rounded-bold',
    tagline: 'Connaissez parfaitement vos meilleurs clients et fidélisez-les',
    color: '#E8A317',
    badge: 'Fidélisation',
    problemWithout:
      'Aucune trace des coordonnées des clients réguliers, impossibilité de savoir qui sont les plus fidèles ou les plus solvables.',
    solutionWith:
      'Un répertoire client enrichi : coordonnées complètes, volume total des achats réalisés, solde des créances en cours et appel/WhatsApp direct.',
    threeSteps: [
      {
        title: '1. Créez la fiche en 10 secondes',
        desc: 'Indiquez le nom, prénom, numéro WhatsApp et quartier du client.',
      },
      {
        title: '2. Suivi automatique',
        desc: 'Chaque vente rattachée au client alimente son historique d’achat et son panier moyen.',
      },
      {
        title: '3. Protection anti-perte',
        desc: 'Impossible d’archiver ou supprimer un client tant qu’il a un solde débiteur non réglé.',
      },
    ],
    features: [
      'Fiches contacts avec appel téléphonique et WhatsApp direct en 1 tap',
      'Affichage en direct du solde débiteur total du client',
      'Historique exhaustif de tous les tickets et achats passés',
      'Identification des meilleurs clients pour leur accorder des remises personnalisées',
      'Protection automatique contre l’archivage des clients ayant des impayés',
    ],
    concreteExample: {
      title: 'Grossiste en cosmétiques',
      scenario:
        'M. Kpadonou vient commander pour son salon de coiffure. Le gérant consulte sa fiche avant d’accepter un nouveau crédit.',
      numbers: 'Total achats cumulés : 1 250 000 FCFA • Dette active : 0 FCFA',
      result:
        'Client exemplaire toujours à jour. Le commerçant lui accorde 5% de remise fidélité.',
    },
    mockup: {
      screenTitle: 'Profil Client • M. Kpadonou',
      badgeStatus: 'Client VIP Gold',
      highlightKey: 'VOLUME ACHATS TOTAL',
      highlightValue: '1 250 000 FCFA',
      items: [
        { label: 'Téléphone', value: '+229 97 45 22 10' },
        { label: 'Localisation', value: 'Cotonou, Menontin' },
        { label: 'Solde dette actuel', value: '0 FCFA (À jour)', color: 'text-emerald-400' },
        { label: 'Nombre d’achats', value: '38 commandes' },
      ],
      primaryAction: 'Nouvelle Vente pour ce Client',
    },
  },

  // 6. Gestion des Stocks & Alertes
  {
    id: 'inventory-stock',
    title: 'Gestion des Stocks & Alertes Rupture',
    shortName: 'Stocks & Inventaire',
    category: 'stocks',
    categoryLabel: 'Stocks & Logistique',
    icon: 'solar:box-minimalistic-bold',
    tagline: 'Ne soyez plus jamais pris au dépourvu par une rupture de vos produits phares',
    color: '#0B6E4F',
    badge: 'Temps Réel',
    problemWithout:
      'Marchandises en rupture sans qu’on s’en rende compte (perte de clients), surplus d’articles qui ne tournent pas, et vols non identifiés.',
    solutionWith:
      'Un catalogue dynamique avec suivi des quantités au centième près, alertes de seuil critique et valorisation globale du magasin.',
    threeSteps: [
      {
        title: '1. Enregistrez vos articles',
        desc: 'Nom, catégorie, prix d’achat fournisseur et prix de vente en FCFA.',
      },
      {
        title: '2. Décrémentation automatique',
        desc: 'Chaque vente sortie en caisse met immédiatement le stock à jour sans aucun recalcul manuel.',
      },
      {
        title: '3. Alertes sonores & visuelles',
        desc: 'Dès qu’un produit passe sous le seuil d’alerte (ex: reste 3 cartons), ARIKE vous prévient pour commander à temps.',
      },
    ],
    features: [
      'Calcul en temps réel de la valeur totale de votre stock (au prix d’achat et de vente)',
      'Alertes de stock critique personnalisables par article',
      'Blocage automatique des ventes si stock insuffisant (anti-stock négatif)',
      'Gestion par lots et suivi des dates de péremption (DLC / FEFO)',
      'Ajustements manuels d’inventaire (casse, avarie, vol) avec motif obligatoire tracé',
    ],
    concreteExample: {
      title: 'Quincaillerie & Matériaux',
      scenario:
        'Le seuil d’alerte du Ciment Portland 50kg est fixé à 10 sacs. Après une vente de 8 sacs, il n’en reste que 4.',
      numbers: 'Stock restant : 4 sacs • Seuil fixé : 10 sacs',
      result:
        'Alerte immédiate affichée sur le tableau de bord : réassort déclenché avant la rupture totale.',
    },
    mockup: {
      screenTitle: 'Catalogue Stocks • 186 Articles',
      badgeStatus: '3 Alertes Rupture',
      highlightKey: 'VALEUR TOTALE EN MAGASIN',
      highlightValue: '8 450 000 FCFA',
      items: [
        { label: 'Ciment Portland 50kg', value: '4 sacs restants', color: 'text-amber-400' },
        { label: 'Huile Végétale 5L', value: '2 bidons (Alerte)', color: 'text-red-400' },
        { label: 'Riz Parfumé 50kg', value: '42 sacs en réserve', color: 'text-emerald-400' },
        { label: 'Articles en bonne santé', value: '183 / 186 références' },
      ],
      primaryAction: 'Générer la Liste de Réassort',
    },
  },

  // 7. Approvisionnements Fournisseurs
  {
    id: 'procurement-suppliers',
    title: 'Approvisionnements & Réceptions Fournisseurs',
    shortName: 'Achats & Fournisseurs',
    category: 'stocks',
    categoryLabel: 'Stocks & Logistique',
    icon: 'solar:delivery-bold',
    tagline: 'Pointez chaque carton à la livraison et constatez les avaries sans contestation',
    color: '#0B6E4F',
    badge: 'Contrôle Réception',
    problemWithout:
      'Livraisons avec des cartons manquants ou des bouteilles cassées acceptées par mégarde et payées au prix fort sans recours.',
    solutionWith:
      'Pointage contradictoire article par article à l’arrivée du camion : conformes, manquants ou avaries avec motif immédiat et réapprovisionnement automatique.',
    threeSteps: [
      {
        title: '1. Créez la commande d’achat',
        desc: 'Indiquez les quantités commandées au grossiste et le prix négocié.',
      },
      {
        title: '2. Pointez à la réception',
        desc: 'À l’arrivée du livreur, validez les articles reçus et signalez tout carton manquant ou endommagé.',
      },
      {
        title: '3. Réapprovisionnement automatique',
        desc: 'Seules les quantités réellement reçues et conformes sont ajoutées au stock de vente.',
      },
    ],
    features: [
      'Fiches coordonnées des grossistes et importateurs',
      'Pointage contradictoire avec le livreur à la réception',
      'Déclaration de litige pour articles avariés ou cassés avec motif obligatoire',
      'Génération d’un bon de réception ou de refus PDF partageable',
      'Mise à jour instantanée du prix d’achat moyen et des stocks',
    ],
    concreteExample: {
      title: 'Livraison de boissons en gros',
      scenario:
        'Commande de 50 casiers. À l’arrivée, 48 casiers sont intacts, 2 casiers ont des bouteilles brisées.',
      numbers: 'Commandé : 50 casiers • Conforme : 48 casiers • Rejeté : 2 casiers',
      result:
        'ARIKE intègre 48 casiers en stock et génère un bon d’avarie de 2 casiers pour remboursement immédiat par le fournisseur.',
    },
    mockup: {
      screenTitle: 'Réception Bon n° REC-FOUR-089',
      badgeStatus: 'Pointage Terminé',
      highlightKey: 'STOCK CONFORME VALIDÉ',
      highlightValue: '+48 Casiers',
      items: [
        { label: 'Fournisseur', value: 'Brasseries & Cie' },
        { label: 'Articles conformes', value: '48 casiers (Acceptés)', color: 'text-emerald-400' },
        { label: 'Articles avariés / brisés', value: '2 casiers (Refusés)', color: 'text-red-400' },
        { label: 'Motif consigné', value: 'Casse durant le transport camion' },
      ],
      primaryAction: 'Confirmer & Mettre en Vente',
    },
  },

  // 8. Transferts Inter-Boutiques
  {
    id: 'stock-transfers',
    title: 'Transferts de Stock Inter-Boutiques',
    shortName: 'Transferts Inter-Sites',
    category: 'stocks',
    categoryLabel: 'Stocks & Logistique',
    icon: 'solar:transmission-bold',
    tagline: 'Déplacez vos marchandises entre entrepôt et boutiques sans perte ni vol',
    color: '#0B6E4F',
    badge: 'Multi-Sites',
    problemWithout:
      'Marchandises envoyées au dépôt qui disparaissent en route entre le chauffeur et la boutique secondaire sans que personne ne sache où est la perte.',
    solutionWith:
      'Chaîne de transfert sécurisée : Débit source → Statut « En transit » avec bordereau transporteur → Pointage contradictoire à l’arrivée.',
    threeSteps: [
      {
        title: '1. Émission sécurisée',
        desc: 'L’entrepôt central sélectionne les articles et quantités à expédier. Le stock source est réservé.',
      },
      {
        title: '2. En transit',
        desc: 'Un bordereau avec le nom du transporteur ou conducteur de moto est généré.',
      },
      {
        title: '3. Réception contradictoire',
        desc: 'La boutique destinataire valide article par article à l’arrivée pour intégrer les pièces dans son stock.',
      },
    ],
    features: [
      'Traçabilité complète des mouvements inter-boutiques et dépôts',
      'Protection contre la double-vente pendant le transport',
      'Pointage obligatoire à l’arrivée pour valider l’entrée en stock',
      'Déclaration immédiate des manquants en cas de colis incomplet',
      'Journal d’audit consignant qui a envoyé et qui a réceptionné',
    ],
    concreteExample: {
      title: 'Dépôt central Dantokpa vers boutique Ganhi',
      scenario:
        'Envoi de 10 cartons de savon. Le stock de Dantokpa est débité immédiatement.',
      numbers: '10 cartons en route • Transporteur : M. Alidou',
      result:
        'À l’arrivée à Ganhi, la vendeuse confirme les 10 cartons. Stock Ganhi augmenté, statut clôturé avec succès.',
    },
    mockup: {
      screenTitle: 'Bordereau Transfert #TRSF-041',
      badgeStatus: 'En Transit Sécurisé',
      highlightKey: 'COLIS EN CHEMINEMENT',
      highlightValue: '10 Cartons Savon',
      items: [
        { label: 'Site Expéditeur', value: 'Dépôt Central Dantokpa' },
        { label: 'Site Destinataire', value: 'Boutique Ganhi' },
        { label: 'Transporteur', value: 'Conducteur Alidou (Tél: 95 12 34 56)' },
        { label: 'Contrôle départ', value: 'Scellé n° 4492 - Conforme', color: 'text-emerald-400' },
      ],
      primaryAction: 'Valider Réception à l’Arrivée',
    },
  },

  // 9. Dépenses & Charges
  {
    id: 'expenses-management',
    title: 'Gestion des Dépenses & Charges avec Photos',
    shortName: 'Dépenses & Charges',
    category: 'finances',
    categoryLabel: 'Trésorerie & Dépenses',
    icon: 'solar:bill-check-bold',
    tagline: 'Photographiez chaque reçu et suivez vos frais de fonctionnement réels',
    color: '#0B6E4F',
    badge: 'Maîtrise des Coûts',
    problemWithout:
      'L’argent de la caisse est pris pour payer l’électricité, le taxi, le loyer ou le repas sans trace, faussant complètement le calcul du vrai bénéfice.',
    solutionWith:
      'Consignation immédiate de chaque sortie d’argent par catégorie (SBEE, SONEB, transport, loyer, personnel) avec prise de photo de la facturette papier.',
    threeSteps: [
      {
        title: '1. Saisissez le montant',
        desc: 'Indiquez la somme dépensée et la catégorie (ex: Facture SBEE 12 000 FCFA).',
      },
      {
        title: '2. Prenez en photo le reçu',
        desc: 'Photographiez le reçu papier avec l’appareil photo du téléphone pour l’archiver localement.',
      },
      {
        title: '3. Déduction automatique',
        desc: 'La dépense est déduite de la session de caisse en cours et intégrée au calcul du bénéfice net.',
      },
    ],
    features: [
      'Catégorisation claire (Loyer, Électricité SBEE, Eau SONEB, Transport, Repas, Entretien)',
      'Prise de photo directe du reçu ou de la facture justificative',
      'Déduction automatique du solde physique en caisse si payé en espèces',
      'Rapports analytiques des postes de dépenses les plus coûteux',
      'Droit de saisie paramétrable selon le rôle de l’employé',
    ],
    concreteExample: {
      title: 'Paiement de la facture d’électricité de la boutique',
      scenario:
        'Le caissier prend 12 500 F dans le tiroir pour payer la recharge prépayée SBEE.',
      numbers: 'Montant : 12 500 FCFA • Reçu photo enregistré',
      result:
        'Le solde de caisse baisse de 12 500 F, le reçu est sauvegardé et le patron voit la dépense dans son bilan.',
    },
    mockup: {
      screenTitle: 'Enregistrer une Dépense',
      badgeStatus: 'Justificatif Photo Enregistré',
      highlightKey: 'SORTIE DE CAISSE ENREGISTRÉE',
      highlightValue: '-12 500 FCFA',
      items: [
        { label: 'Catégorie', value: 'Électricité & Énergie (SBEE)' },
        { label: 'Mode de sortie', value: 'Espèces (Caisse active)' },
        { label: 'Justificatif', value: 'Reçu_SBEE_0909.jpg (Archivé)', color: 'text-emerald-400' },
        { label: 'Impact Bénéfice', value: 'Déduit du bénéfice net du mois' },
      ],
      primaryAction: 'Enregistrer la Dépense',
    },
  },

  // 10. Bureau de Change FX
  {
    id: 'fx-exchange',
    title: 'Bureau de Change FX (Naira, Euro, Dollar)',
    shortName: 'Bureau de Change',
    category: 'finances',
    categoryLabel: 'Trésorerie & Dépenses',
    icon: 'solar:dollar-minimalistic-bold',
    tagline: 'Idéal pour le commerce frontalier et les échanges FCFA ⇄ Naira NGN',
    color: '#0B6E4F',
    badge: 'Frontalier & Multi-Devises',
    problemWithout:
      'Calculs mentaux complexes des taux de change flottants du Naira nigérian ou du Dollar, avec des erreurs coûteuses sur chaque conversion.',
    solutionWith:
      'Un module de change professionnel : fixation quotidienne des cours d’achat et de vente, calcul automatique du gain brut et reçu de change officiel.',
    threeSteps: [
      {
        title: '1. Fixez le cours du jour',
        desc: 'Renseignez le cours d’achat et de vente pour le Naira (NGN), Dollar (USD) ou Euro (EUR).',
      },
      {
        title: '2. Enregistrez l’échange',
        desc: 'Saisissez la somme remise par le client ; ARIKE calcule instantanément la contre-valeur en FCFA.',
      },
      {
        title: '3. Reçu de change délivré',
        desc: 'Émettez un bordereau de change conforme avec taux appliqué, montants et marge réalisée.',
      },
    ],
    features: [
      'Support natif du Naira nigérian (NGN), Euro (EUR) et Dollar américain (USD)',
      'Sessions quotidiennes de fixation des cours d’achat et vente',
      'Calcul instantané de la marge brute de change réalisée',
      'Émission de reçus d’opération de change personnalisés',
      'Fonctionne 100% hors-ligne sans connexion Internet',
    ],
    concreteExample: {
      title: 'Commerçant à la frontière Sèmè-Kraké',
      scenario:
        'Un client nigérian achète avec 200 000 Naira (NGN) au cours de 1 NGN = 0,42 FCFA.',
      numbers: '200 000 NGN convertis en 84 000 FCFA',
      result:
        'Calcul immédiat sans calculatrice externe, reçu de change délivré et stock de devises ajusté.',
    },
    mockup: {
      screenTitle: 'Opération de Change FX',
      badgeStatus: 'Session Active du Jour',
      highlightKey: 'CONTRE-VALEUR EN FCFA',
      highlightValue: '84 000 FCFA',
      items: [
        { label: 'Devise reçue', value: '200 000 NGN (Naira)' },
        { label: 'Cours appliqué', value: '1 NGN = 0,42 FCFA' },
        { label: 'Bénéfice de change estimé', value: '+3 200 FCFA', color: 'text-emerald-400' },
        { label: 'Client', value: 'M. Babatunde (Lagos)' },
      ],
      primaryAction: 'Valider & Imprimer le Bordereau',
    },
  },

  // 11. Calculateurs Commerciaux
  {
    id: 'business-calculators',
    title: 'Calculateurs de Marge & Seuil de Rentabilité',
    shortName: 'Outils & Simulateurs',
    category: 'finances',
    categoryLabel: 'Trésorerie & Dépenses',
    icon: 'solar:calculator-minimalistic-bold',
    tagline: 'Fixez vos prix au juste montant et calculez votre seuil de rentabilité',
    color: '#0B6E4F',
    badge: 'Aide à la Décision',
    problemWithout:
      'Fixer les prix au hasard sans savoir combien il faut vendre chaque jour pour payer le loyer et les salaires sans être à perte.',
    solutionWith:
      'Des simulateurs intégrés : calculateur de prix de vente cible selon la marge désirée, point mort journalier et simulateur d’impact des remises.',
    threeSteps: [
      {
        title: '1. Entrez votre coût d’achat',
        desc: 'Indiquez le prix d’achat chez le grossiste et les frais d’approche (transport).',
      },
      {
        title: '2. Définissez votre marge voulue',
        desc: 'Choisissez par exemple 20% de marge brute : ARIKE vous donne le prix de vente exact.',
      },
      {
        title: '3. Simulez le point mort',
        desc: 'Voyez exactement combien de ventes par jour sont nécessaires pour couvrir vos charges fixes.',
      },
    ],
    features: [
      'Calculateur de prix de vente optimal selon la marge en % ou montant',
      'Simulateur de seuil de rentabilité (point mort journalier et mensuel)',
      'Simulateur d’impact des remises pour ne jamais vendre à perte',
      'Calculateur de marge commerciale nette après frais de transport',
      'Accessible à tout moment directement depuis le menu principal',
    ],
    concreteExample: {
      title: 'Lancement d’un nouvel article',
      scenario:
        'Carton acheté à 18 000 F + 1 000 F de transport = Coût de revient de 19 000 F. Objectif : 25% de marge.',
      numbers: 'Coût : 19 000 F • Marge voulue : 25%',
      result:
        'ARIKE conseille un prix de vente à 25 350 F et montre que le bénéfice net sera de 6 350 F par carton.',
    },
    mockup: {
      screenTitle: 'Simulateur de Marge & Prix Cible',
      badgeStatus: 'Simulation Optimale',
      highlightKey: 'PRIX DE VENTE RECOMMANDÉ',
      highlightValue: '25 350 FCFA',
      items: [
        { label: 'Prix d’achat fournisseur', value: '18 000 F' },
        { label: 'Frais de transport / unité', value: '1 000 F' },
        { label: 'Taux de marge brute', value: '25% appliqué' },
        { label: 'Bénéfice net unitaire', value: '+6 350 FCFA', color: 'text-emerald-400' },
      ],
      primaryAction: 'Appliquer ce Prix au Catalogue',
    },
  },

  // 12. Rapports Financiers & Dashboard
  {
    id: 'reports-analytics',
    title: 'Rapports Financiers & Bilan Journalier',
    shortName: 'Rapports & Statistiques',
    category: 'finances',
    categoryLabel: 'Trésorerie & Dépenses',
    icon: 'solar:chart-2-bold',
    tagline: 'Visualisez votre bénéfice net réel au franc près sur n’importe quelle période',
    color: '#0B6E4F',
    badge: 'Vision 360°',
    problemWithout:
      'Confondre chiffre d’affaires et bénéfice net, sans savoir si la boutique gagne ou perd de l’argent à la fin du mois.',
    solutionWith:
      'Tableau de bord dynamique en temps réel : Chiffre d’affaires brut et net, marge réalisée, panier moyen, palmarès des produits stars et export PDF sans Internet.',
    threeSteps: [
      {
        title: '1. Choisissez la période',
        desc: 'Aujourd’hui, Cette semaine, Ce mois, ou sélection personnalisée de dates.',
      },
      {
        title: '2. Consultez les indicateurs',
        desc: 'Visualisez le CA réalisé, les dépenses déduites et le bénéfice net restant dans vos poches.',
      },
      {
        title: '3. Exportez en PDF ou WhatsApp',
        desc: 'Générez un rapport comptable clair prêt à être imprimé ou partagé avec les associés.',
      },
    ],
    features: [
      'Distinction stricte entre Chiffre d’Affaires et Bénéfice Net Réel',
      'Top 10 des articles les plus vendus et les plus rentables',
      'Statistiques de performance par vendeur ou caissier',
      'Taux de recouvrement des créances et évolution des dettes',
      'Export PDF certifié et partage WhatsApp 100% hors-ligne',
    ],
    concreteExample: {
      title: 'Bilan de fin de mois du patron',
      scenario:
        'Le commerçant consulte son rapport mensuel : CA de 4 850 000 F, Dépenses de 450 000 F, Coût d’achat de 3 400 000 F.',
      numbers: 'CA : 4 850 000 F • Dépenses : 450 000 F',
      result:
        'Bénéfice net réel : 1 000 000 FCFA. Il sait exactement ce qu’il peut prélever pour lui-même en toute sécurité.',
    },
    mockup: {
      screenTitle: 'Tableau de Bord Financier (Mois)',
      badgeStatus: 'Mise à Jour Temps Réel',
      highlightKey: 'BÉNÉFICE NET DU MOIS',
      highlightValue: '+1 000 000 FCFA',
      items: [
        { label: 'Chiffre d’affaires total', value: '4 850 000 F' },
        { label: 'Achats marchandises (Coût)', value: '-3 400 000 F' },
        { label: 'Charges & Dépenses boutique', value: '-450 000 F' },
        { label: 'Taux de marge nette', value: '20.6% de rentabilité', color: 'text-emerald-400' },
      ],
      primaryAction: 'Exporter le Rapport PDF du Mois',
    },
  },

  // 13. Audit Trail Anti-Fraude
  {
    id: 'audit-security',
    title: 'Audit Trail Anti-Fraude & Sécurité PIN',
    shortName: 'Sécurité & Anti-Fraude',
    category: 'securite',
    categoryLabel: 'Sécurité & Offline',
    icon: 'solar:shield-check-bold',
    tagline: 'Tolérance zéro sur les vols et les manipulations cachées de vos employés',
    color: '#0B6E4F',
    badge: 'Protection Absolue',
    problemWithout:
      'Ventes effacées en cachette par un vendeur malhonnête, prix modifiés à la tête du client et fausses déclarations d’avaries.',
    solutionWith:
      'Un journal d’audit inviolable (immuable) qui consigne automatiquement : Qui a fait Quoi, Quand, sur quel article et pour quel Motif.',
    threeSteps: [
      {
        title: '1. Authentification sécurisée',
        desc: 'Chaque utilisateur se connecte avec son propre code PIN à 4 ou 6 chiffres (haché en bcrypt) ou par empreinte digitale.',
      },
      {
        title: '2. Traçabilité automatique',
        desc: 'Toute action sensible (annulation de vente dans les 24h, modification de prix, ajustement de stock) est enregistrée avec motif obligatoire.',
      },
      {
        title: '3. Contrôle du patron',
        desc: 'Le patron consulte le journal d’audit à tout moment. Aucune ligne ne peut être modifiée ni effacée de la base de données.',
      },
    ],
    features: [
      'Journal d’audit immuable en écriture seule (impossible à falsifier ou supprimer)',
      'Traçabilité complète : Utilisateur, Date/Heure exacte, Ancienne valeur, Nouvelle valeur, Motif',
      'Annulation de vente strictement limitée à 24h avec saisie d’un motif obligatoire',
      'Connexion par code PIN sécurisé ou reconnaissance biométrique (empreinte digitale)',
      'Exportation du registre d’audit en document certifié en cas de litige',
    ],
    concreteExample: {
      title: 'Tentative d’annulation suspecte',
      scenario:
        'Un vendeur tente d’annuler une vente de 24 500 F passée 3 heures plus tôt.',
      numbers: 'Annulation tracée : Vendeur Kofi • 14h25 • Motif saisi : "Erreur de saisie"',
      result:
        'Le patron reçoit une alerte et vérifie le journal. Toute tentative de coulage est immédiatement stoppée.',
    },
    mockup: {
      screenTitle: 'Journal d’Audit & Sécurité',
      badgeStatus: 'Protection Active 24/7',
      highlightKey: 'JOURNAL DES ACTIONS SENSIBLES',
      highlightValue: '100% Inviolable',
      items: [
        { label: '14:25 • Annulation Vente', value: 'Vendeur Kofi (Motif requis)', color: 'text-amber-400' },
        { label: '11:10 • Ajustement Stock', value: 'Patron (-1 Casse bouteille)' },
        { label: '08:00 • Ouverture Caisse', value: 'Caissière Amina (Fond 20 000 F)', color: 'text-emerald-400' },
        { label: 'Niveau de protection', value: 'Chiffrement bcrypt & SQLite local' },
      ],
      primaryAction: 'Consulter l’Historique Complet',
    },
  },

  // 14. 100% Offline-First & Sync
  {
    id: 'offline-sync',
    title: 'Moteur 100% Hors-Ligne & Notifications Sonores',
    shortName: 'Hors-Ligne & Sync',
    category: 'securite',
    categoryLabel: 'Sécurité & Offline',
    icon: 'solar:wifi-router-minimalistic-bold',
    tagline: 'Travaillez sans Internet pendant des semaines et synchronisez quand vous voulez',
    color: '#0B6E4F',
    badge: 'Infaillible',
    problemWithout:
      'Coupures de connexion 4G ou délestages électriques qui bloquent la caisse, empêchant de servir les clients et faisant perdre des ventes.',
    solutionWith:
      'Une technologie Offline-First native sur base SQLite locale ultra-rapide. L’application n’a jamais besoin d’Internet pour fonctionner, et synchronise sans conflit dès le retour du réseau.',
    threeSteps: [
      {
        title: '1. Vendez en zone blanche',
        desc: 'Même sans aucun forfait Internet, vos ventes, stocks et dettes sont enregistrés localement sur votre téléphone.',
      },
      {
        title: '2. Notifications sonores hors-app',
        desc: 'Même l’application fermée, des alarmes sonores fortes vous alertent sur les stocks critiques ou le bilan à 20h.',
      },
      {
        title: '3. Synchronisation automatique',
        desc: 'Dès qu’une connexion Wi-Fi ou mobile est détectée, les données se synchronisent de façon transparente et sans écrasement.',
      },
    ],
    features: [
      'Zéro dépendance au réseau : 100% des fonctions marchent sans connexion',
      'Base locale SQLite ultra-performante et légère (~22 Mo d’APK)',
      'Notifications locales sonores audibles même dans le bruit du marché',
      'Synchronisation cloud intelligente avec réconciliation additive des ventes',
      'Sauvegarde chiffrée exportable en 1 tap sur votre téléphone ou Google Drive',
    ],
    concreteExample: {
      title: 'Délestage général et coupure 4G au marché',
      scenario:
        'Le réseau mobile tombe pendant 4 heures en pleine journée de vente intensive.',
      numbers: '68 ventes réalisées • 0 seconde d’interruption',
      result:
        'ARIKE a fonctionné à pleine vitesse. Le soir à la maison sous Wi-Fi, les 68 ventes se synchronisent en 5 secondes.',
    },
    mockup: {
      screenTitle: 'Statut Système • Moteur Offline',
      badgeStatus: '100% Opérationnel',
      highlightKey: 'ÉTAT DE LA CONNEXION',
      highlightValue: 'Hors-Ligne (Normal)',
      items: [
        { label: 'Mode de fonctionnement', value: 'Base SQLite Locale Chiffrée', color: 'text-emerald-400' },
        { label: 'Ventes en attente de sync', value: '68 transactions sécurisées' },
        { label: 'Alarmes sonores activées', value: 'Bilan 20h & Alertes Ruptures' },
        { label: 'Dernière sauvegarde locale', value: 'Aujourd’hui à 12h00' },
      ],
      primaryAction: 'Lancer Sauvegarde Immédiate',
    },
  },
]
