'use client'

import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Experience from '@/components/sections/Experience'
import Projects from '@/components/sections/Projects'
import Skills from '@/components/sections/Skills'
import Contact from '@/components/sections/Contact'
import Particles from '@/components/animations/Particles'
import { useEffect } from 'react'
import Lenis from 'lenis'

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      // mild ease-out; keep subtle for performance
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      smoothTouch: false,
    })

    const raf = (time: number) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    const onAnchorClick = (e: MouseEvent) => {
      const target = e.target as Element | null
      if (!target) return
      const link = (target.closest('a[href^="#"]') as HTMLAnchorElement) || null
      if (!link) return
      const href = link.getAttribute('href') || ''
      if (!href || href === '#' || href.length < 2) return
      const el = document.querySelector(href) as HTMLElement | null
      if (el) {
        e.preventDefault()
        lenis.scrollTo(el, { offset: 0 })
      }
    }
    document.addEventListener('click', onAnchorClick)

    return () => {
      document.removeEventListener('click', onAnchorClick)
      // @ts-ignore - destroy exists in Lenis runtime
      if (typeof (lenis as any).destroy === 'function') {
        ;(lenis as any).destroy()
      }
    }
  }, [])

  return (
    <div className="relative">
      <div className="relative">
        <Particles
          particleCount={10000}
          particleSpread={10}
          speed={0.05}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
          className="absolute inset-0 -z-10 pointer-events-none w-full h-full"
        />
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </div>
    </div>
  )
}