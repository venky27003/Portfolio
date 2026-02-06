'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Code, Brain, Rocket, Users } from 'lucide-react'
import FloatingTitle from '@/components/FloatingTitle'

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const features = [
    {
      icon: Code,
      title: "Full Stack Mastery",
      description: "Expert in modern web technologies with deep understanding of both frontend and backend architectures."
    },
    {
      icon: Brain,
      title: "AI Integration",
      description: "Leveraging artificial intelligence to create smarter, more efficient solutions that automate complex processes."
    },
    {
      icon: Rocket,
      title: "Performance Focused",
      description: "Building lightning-fast applications with optimized performance and scalable infrastructure."
    },
    {
      icon: Users,
      title: "Team Leadership",
      description: "Leading development teams and mentoring developers while maintaining high code quality standards."
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants: any = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8
      }
    }
  }

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="space-y-16"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <FloatingTitle className="cursor-target text-4xl md:text-6xl font-bold">
              About Me
            </FloatingTitle>
            <div className="w-24 h-px bg-white mx-auto"></div>
          </motion.div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Story */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-semibold text-gray-200">
                My Journey in Tech
              </h3>
              
              <div className="space-y-4 text-gray-400 leading-relaxed">
                <p>
                  I started coding in 10th grade, diving deep into traditional programming and 
                  spending countless hours on Stack Overflow. What began as curiosity evolved 
                  into a passion for creating digital solutions.
                </p>
                
                <p>
                  The arrival of AI transformed my approach to development. I discovered I could 
                  leverage AI tools more effectively than most, completing projects in a fraction 
                  of the time while maintaining high quality standards.
                </p>
                
                <p>
                  Currently, I&apos;m working at a startup developing a SaaS application that helps 
                  businesses reduce cloud costs using AI-powered resource management for 
                  Kubernetes and VM infrastructure.
                </p>
                
                <p>
                  My unique combination of traditional programming skills and AI expertise 
                  allows me to deliver solutions that are both innovative and practical.
                </p>
              </div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="inline-block"
              >
                <a
                  href="/assets/venkatesh-resume.pdf"
                  download
                  className="cursor-target btn-primary inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download Resume
                </a>
              </motion.div>
            </motion.div>

            {/* Right - Stats & Features */}
            <motion.div variants={itemVariants} className="space-y-8">
              {/* Stats */}
              <div className="grid grid-cols-2 gap-6">
                <div className="cursor-target text-center p-6 border border-gray-800 rounded-lg">
                  <div className="text-3xl font-bold text-white mb-2">1+</div>
                  <div className="text-gray-400 text-sm uppercase tracking-wider">Years Experience</div>
                </div>
                <div className="cursor-target text-center p-6 border border-gray-800 rounded-lg">
                  <div className="text-3xl font-bold text-white mb-2">20+</div>
                  <div className="text-gray-400 text-sm uppercase tracking-wider">Projects Completed</div>
                </div>
                <div className="cursor-target text-center p-6 border border-gray-800 rounded-lg">
                  <div className="text-3xl font-bold text-white mb-2">10x</div>
                  <div className="text-gray-400 text-sm uppercase tracking-wider">Faster Development</div>
                </div>
                <div className="cursor-target text-center p-6 border border-gray-800 rounded-lg">
                  <div className="text-3xl font-bold text-white mb-2">100%</div>
                  <div className="text-gray-400 text-sm uppercase tracking-wider">Client Satisfaction</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Features Grid */}
          <motion.div
            variants={containerVariants}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="cursor-target group p-6 border border-gray-800 rounded-lg hover:border-white transition-colors duration-300"
              >
                <feature.icon className="w-8 h-8 text-white mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h4 className="text-lg font-semibold text-white mb-2">{feature.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default About