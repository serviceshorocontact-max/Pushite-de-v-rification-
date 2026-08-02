'use client';

import ProductCards from '@/app/components/ProductCards';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-custom-light-green/10 via-custom-white to-custom-light-yellow/30 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-custom-green mb-4">
            Obtenez votre Ticket d'Activation
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choisissez votre offre et recevez votre code en quelques minutes.
          </p>
        </div>

        {/* Grille des offres - Utilisation du composant ProductCards */}
        <ProductCards />

        {/* Mention "Sur devis" */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            💼 Une offre sur mesure ? <span className="text-custom-green font-medium">Contactez-nous</span>
          </p>
        </div>
      </div>
    </main>
  );
}
