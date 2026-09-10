import { Metadata } from "next";
import Banner from "./components/home/hero";
import Companies from "./components/home/companies";
import Work from "./components/home/work";
import Table from "./components/home/table";
import Modules from "./components/home/modules";
import Features from "./components/home/features";
import Simple from "./components/home/simple";
import Trade from "./components/home/trade";
import Faq from "./components/home/faq";
import ContactForm from "./components/ContactForm";

export const metadata: Metadata = {
  title: 'ARIKE — Solution de Gestion Commerciale, Caisse & Recouvrement Offline-First',
  description:
    'L’ERP de poche populaire & infaillible pour les commerçants du Bénin et d’Afrique de l’Ouest. Vendez en 3 secondes, gérez vos stocks et recouvrez vos créances via WhatsApp 100% hors-ligne.',
  keywords: [
    'ARIKE',
    'VenteApp',
    'Caisse enregistreuse',
    'Gestion commerciale',
    'Offline-First',
    'Bénin',
    'Dantokpa',
    'Mobile Money',
    'Recouvrement dette WhatsApp',
    'Stock boutique',
  ],
  icons: {
    icon: '/images/logo/app_icon.png',
  },
}

export default function Home() {
  return (
    <main>
      <Banner/>
      <Companies />
      <Work />
      <Table />
      <Modules />
      <Features />
      <Simple />
      <Trade />
      <Faq />
      <ContactForm />
    </main>
  );
}
