'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ArrowDown } from 'lucide-react'
import LightRays from '@/components/animations/LightRays'
import RippleGrid from '../animations/RippleGrid'
import MoonModel from '@/components/3d/MoonModel'

const Hero = () => {
  const [mounted, setMounted] = useState(false)
  const [currentWordIndex, setCurrentWordIndex] = useState(0)

  const words = ['Developer', 'Designer', 'Architect', 'Innovator']

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [words.length])

  if (!mounted) return null

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <LightRays
        raysOrigin="top-center"
        raysColor="#ffffffff"
        raysSpeed={1.5}
        lightSpread={1}
        rayLength={1.5}
        followMouse={true}
        mouseInfluence={0.2}
        noiseAmount={0.1}
        distortion={0.01}
        className="absolute inset-0 z-0"
      />

      <div className="relative z-10 px-[10vw] w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-4"
            >
              <motion.h1
                className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Hi, I&apos;m{' '}
                <span className="highlight inline-block cursor-target">Rishi</span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-2xl md:text-3xl lg:text-4xl font-light text-gray-300"
              >
                Full Stack{' '}
                <motion.span
                  key={currentWordIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="highlight inline-block"
                >
                  {words[currentWordIndex]}
                </motion.span>
              </motion.div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed"
            >
              Transforming ideas into powerful digital solutions with cutting-edge AI integration.
              I craft scalable SaaS applications that reduce costs and maximize efficiency.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 "
            >
              <a
                href="#about"
                className="cursor-target btn-primary group flex items-center"
              >
                Explore My Work <ArrowDown className="ml-2 w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" />
              </a>

              <motion.a
                href="#contact"
                className="cursor-target btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
              </motion.a>
            </motion.div>
          </div>

          {/* Right Content - 3D Moon Model */}
          {/* Right Content - 3D Moon Model */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            // Use flex so the child can fill the available height; allow the column to be tall on lg
            className="hidden lg:flex relative w-full h-[80vh] xl:h-[85vh] items-center justify-center"
          >
            <div className="w-full h-full">
              <MoonModel />
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.a
          href="#about"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-white/60 hover:text-white transition-colors duration-300"
        >
          <ArrowDown size={24} />
        </motion.a>
      </motion.div>
    </section>
  )
}

export default Hero