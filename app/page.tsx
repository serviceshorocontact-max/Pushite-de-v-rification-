'use client';

import TicketForm from '@/app/components/TicketForm';
import ProductCards from '@/app/components/ProductCards';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Section Hero avec animation */}
      <section className="relative overflow-hidden bg-gradient-to-br from-custom-light-green/10 via-custom-white to-custom-light-yellow/30 py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold text-custom-green mb-4"
          >
            Obtenez votre <span className="text-custom-yellow">Ticket</span> d'Activation
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Choisissez votre offre et recevez votre code en quelques minutes.
          </motion.p>
        </div>
        {/* Éléments décoratifs flottants */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-custom-yellow/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-custom-green/10 rounded-full blur-3xl animate-float-delayed"></div>
      </section>

      {/* Section Cartes Produits */}
      <ProductCards />

      {/* Section Formulaire */}
      <section className="py-16 px-4 bg-white/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-custom-green mb-8">
            🎫 Demande de ticket
          </h2>
          <TicketForm />
        </div>
      </section>
    </main>
  );
}
