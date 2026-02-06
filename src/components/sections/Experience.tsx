'use client'

import { motion, easeInOut } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Calendar, MapPin, ExternalLink } from 'lucide-react'
import FloatingTitle from '@/components/FloatingTitle'

const Experience = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const experiences = [
    {
      title: "Software Engineer",
      company: "Caze Labs Private Limited",
      url: "https://www.cazelabs.com/",
      location: "Bengaluru, Karnataka, India",
      period: "2023 - Present",
      description: [
        "Developing a SaaS application that reduces cloud infrastructure costs by up to 40%",
        "Implementing AI-powered resource optimization for Kubernetes and VM management",
        "Leading a team of 3 developers and architecting scalable backend solutions",
        "Building real-time dashboards with React, Next.js, and advanced data visualization"
      ],
      technologies: ["React", "Next.js", "Node.js", "AI/ML", "Kubernetes", "AWS", "TypeScript"]
    },
    {
      title: "Frontend Developer",
      company: "Classhed",
      url: "https://agency.classhed.space/",
      location: "Bengaluru, Karnataka, India",
      period: "January 2024 - June 2024",
      description: [
        "As a web developer at Festive Learn, I worked on diverse projects to enhance the company's online presence and tools.",
        "Collaborating with the team, I wrote clean code, fixed bugs, and added new features using HTML, CSS, JavaScript, Angular, and React.",
        "I also learned Agile practices and participated in code reviews. This job provided valuable experience, setting a strong foundation for my career in web development."
      ],
      technologies: ["HTML", "CSS", "JavaScript", "Angular", "React"]
    },
    {
      title: "Web Designing Intern",
      company: "Kristu Jayanti Software Development Centre",
      url: "https://kristujayanti.edu.in/",
      location: "Bengaluru, Karnataka, India",
      period: "June 2023 - August 2023",
      description: [
        "Developed mockups and wireframes for new website features and enhancements under the guidance of senior designers",
        "Assisted in coding HTML, CSS, and JavaScript to implement design changes and updates",
        "Researched and presented recommendations on the latest trends and best practices in web design to enhance user experience"
      ],
      technologies: ["HTML", "CSS", "JavaScript"]
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: easeInOut
      }
    }
  }

  return (
    <section id="experience" className="section-padding relative overflow-hidden">
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
              My Experience
            </FloatingTitle>
            <div className="w-24 h-px bg-white mx-auto"></div>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              A journey through my professional development and key achievements
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-white transform md:-translate-x-px"></div>

            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`relative flex items-start ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-white rounded-full transform -translate-x-2 md:-translate-x-2 z-10"></div>

                  {/* Content Card */}
                  <div className={`w-full md:w-1/2 ml-16 md:ml-0 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                    }`}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="cursor-target bg-black border border-gray-800 rounded-lg p-8 space-y-6 hover:border-white transition-colors duration-300"
                    >
                      {/* Header */}
                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-white">{exp.title}</h3>
                        <a
                          href={exp.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-lg text-gray-300 font-medium hover:underline hover:text-white transition-colors"
                        >
                          {exp.company}
                        </a>


                        <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {exp.period}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {exp.location}
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <ul className="space-y-3">
                        {exp.description.map((item, i) => (
                          <li key={i} className="text-gray-400 flex items-start">
                            <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            {item}
                          </li>
                        ))}
                      </ul>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-gray-900 text-gray-300 text-xs rounded-full border border-gray-700 hover:border-white transition-colors duration-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <motion.div variants={itemVariants} className="text-center">
            <p className="text-gray-400 mb-6">
              Want to know more about my professional journey?
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-target btn-primary group flex items-center justify-center mx-auto"
            >
              <a
                href="/assets/venkatesh-resume.pdf"
                download
                className="flex items-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Full Resume
                <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Experience