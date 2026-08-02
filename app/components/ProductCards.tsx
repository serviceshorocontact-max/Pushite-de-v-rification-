'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

// Données des cartes (à adapter avec vos propres informations)
const cardsData = [
  {
    id: 0,
    title: 'Offre Découverte',
    description: 'Parfait pour tester nos services. Code valable 1 mois.',
    image: '/carte0.jpg', // Placez vos images dans le dossier public/
    price: '19€',
  },
  {
    id: 1,
    title: 'Offre Standard',
    description: 'Le meilleur rapport qualité-prix. Code valable 6 mois.',
    image: '/carte1.jpg',
    price: '49€',
  },
  {
    id: 2,
    title: 'Offre Premium',
    description: 'Accès complet et prioritaire. Code valable 1 an.',
    image: '/carte2.jpg',
    price: '99€',
  },
  {
    id: 3,
    title: 'Offre Entreprise',
    description: 'Solution sur mesure pour les professionnels.',
    image: '/carte3.jpg',
    price: 'Sur devis',
  },
];

export default function ProductCards() {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-custom-white to-custom-light-yellow/20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-custom-green mb-12">
          Nos offres
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cardsData.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden border border-custom-yellow/20 hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <span className="absolute bottom-3 right-3 bg-custom-yellow text-custom-dark font-bold px-3 py-1 rounded-full text-sm">
                  {card.price}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-custom-green mb-2">{card.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{card.description}</p>
                <button className="w-full py-2 bg-custom-green text-white font-semibold rounded-lg hover:bg-custom-light-green transition-colors duration-300">
                  Choisir cette offre
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
