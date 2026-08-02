import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import Navbar from '@/app/components/Navbar'

const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'] 
})

export const metadata: Metadata = {
  title: 'Ticket d\'activation - Obtenez votre code en 2 min',
  description: 'Vente de tickets d\'activation sécurisée',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={poppins.className}>
        <Navbar />
        <main className="min-h-screen bg-custom-gradient">
          {children}
        </main>
      </body>
    </html>
  )
}
