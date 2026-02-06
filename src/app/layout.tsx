import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import PageBorders from '@/components/PageBorders'
import TargetCursor from '@/components/TargetCursor'
import { Analytics } from "@vercel/analytics/next"
  
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Rishi - Full Stack Developer & AI Specialist',
  description: 'Portfolio of Rishi - A passionate full stack developer specializing in AI-powered solutions, SaaS applications, and modern web technologies.',
  keywords: 'Rishi, Full Stack Developer, AI Specialist, Web Developer, SaaS, React, Next.js, Portfolio',
  authors: [{ name: 'Rishi' }],
  creator: 'Rishi',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://rishi-portfolio.vercel.app',
    title: 'Rishi - Full Stack Developer & AI Specialist',
    description: 'Portfolio of Rishi - A passionate full stack developer specializing in AI-powered solutions.',
    siteName: 'Rishi Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rishi - Full Stack Developer & AI Specialist',
    description: 'Portfolio of Rishi - A passionate full stack developer specializing in AI-powered solutions.',
    creator: '@rishi',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-background text-foreground font-sans antialiased`}>
        
          <Navbar />
          <PageBorders />
          {/* TargetCursor retained */}
          <TargetCursor
            spinDuration={2}
            hideDefaultCursor={true}
            targetSelector=".cursor-target"
          />
          <main className="relative">
            {children}
            <Analytics />
          </main>
        
      </body>
    </html>
  )
}