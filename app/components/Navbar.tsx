'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-md border-b border-custom-yellow/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-custom-green to-custom-yellow rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white text-xl">🎫</span>
            </div>
            <span className="text-2xl font-bold text-custom-green tracking-tight">
              Ticket<span className="text-custom-yellow">App</span>
            </span>
          </div>

          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/" className="text-custom-green font-medium hover:text-custom-yellow transition-all duration-300 relative group">
              Accueil
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-custom-yellow transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/services" className="text-gray-600 hover:text-custom-green transition-all duration-300 relative group">
              Services
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-custom-green transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/tarifs" className="text-gray-600 hover:text-custom-green transition-all duration-300 relative group">
              Tarifs
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-custom-green transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-custom-green transition-all duration-300 relative group">
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-custom-green transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <button className="bg-gradient-to-r from-custom-green to-custom-light-green text-white px-6 py-2.5 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 font-medium">
              Se connecter
            </button>
          </div>

          <button className="md:hidden text-custom-green" onClick={() => setIsOpen(!isOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 space-y-3 bg-white/90 backdrop-blur-sm rounded-xl p-4 mt-2 shadow-lg">
            <Link href="/" className="block text-custom-green font-medium py-2 border-b border-gray-100 hover:pl-2 transition-all">Accueil</Link>
            <Link href="/services" className="block text-gray-600 py-2 border-b border-gray-100 hover:pl-2 transition-all">Services</Link>
            <Link href="/tarifs" className="block text-gray-600 py-2 border-b border-gray-100 hover:pl-2 transition-all">Tarifs</Link>
            <Link href="/contact" className="block text-gray-600 py-2 border-b border-gray-100 hover:pl-2 transition-all">Contact</Link>
            <button className="w-full bg-gradient-to-r from-custom-green to-custom-light-green text-white px-5 py-2 rounded-xl hover:shadow-lg transition-all font-medium">
              Se connecter
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
