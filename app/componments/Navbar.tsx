'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-sm border-b border-custom-yellow/20 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🎫</span>
            <span className="text-xl font-bold text-custom-green">
              Ticket<span className="text-custom-yellow">App</span>
            </span>
          </div>

          {/* Liens Desktop */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-custom-green font-medium hover:text-custom-yellow transition">Accueil</Link>
            <Link href="/services" className="text-gray-600 hover:text-custom-green transition">Services</Link>
            <Link href="/tarifs" className="text-gray-600 hover:text-custom-green transition">Tarifs</Link>
            <Link href="/contact" className="text-gray-600 hover:text-custom-green transition">Contact</Link>
          </div>

          {/* Bouton Connexion */}
          <div className="hidden md:block">
            <button className="bg-custom-green text-white px-5 py-2 rounded-lg hover:bg-custom-light-green transition font-medium">
              Se connecter
            </button>
          </div>

          {/* Bouton Menu Mobile */}
          <button className="md:hidden text-custom-green" onClick={() => setIsOpen(!isOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Menu Mobile */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-3">
            <Link href="/" className="block text-custom-green font-medium py-2 border-b border-gray-100">Accueil</Link>
            <Link href="/services" className="block text-gray-600 py-2 border-b border-gray-100">Services</Link>
            <Link href="/tarifs" className="block text-gray-600 py-2 border-b border-gray-100">Tarifs</Link>
            <Link href="/contact" className="block text-gray-600 py-2 border-b border-gray-100">Contact</Link>
            <button className="w-full bg-custom-green text-white px-5 py-2 rounded-lg hover:bg-custom-light-green transition font-medium">
              Se connecter
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
