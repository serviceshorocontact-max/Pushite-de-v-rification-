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

        {/* Grille des offres */}
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

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const offers = [
    {
      title: 'Offre Découverte',
      price: '19€',
      description: 'Parfait pour tester nos services. Code valable 1 mois.',
      popular: false,
    },
    {
      title: 'Offre Standard',
      price: '49€',
      description: 'Le meilleur rapport qualité-prix. Code valable 6 mois.',
      popular: true,
    },
    {
      title: 'Offre Premium',
      price: '99€',
      description: 'Accès complet et prioritaire. Code valable 1 an.',
      popular: false,
    },
  ];

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

        {/* Grille des offres */}
        <div className="grid md:grid-cols-3 gap-8">
          {offers.map((offer, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 p-8 border ${
                offer.popular
                  ? 'border-custom-yellow ring-2 ring-custom-yellow/20'
                  : 'border-gray-100'
              }`}
            >
              {offer.popular && (
                <div className="text-center mb-4">
                  <span className="bg-custom-yellow text-custom-green text-sm font-semibold px-4 py-1 rounded-full">
                    ⭐ Populaire
                  </span>
                </div>
              )}
              <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
                {offer.title}
              </h2>
              <p className="text-4xl font-extrabold text-custom-green text-center mb-4">
                {offer.price}
              </p>
              <p className="text-gray-600 text-center mb-6 leading-relaxed">
                {offer.description}
              </p>
              <button className="w-full bg-custom-green text-white font-semibold py-3 px-6 rounded-xl hover:bg-custom-light-green transition-colors duration-200 shadow-md hover:shadow-lg">
                Choisir cette offre
              </button>
            </div>
          ))}
        </div>

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
