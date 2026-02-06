'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import Image from 'next/image'
import FloatingTitle from '@/components/FloatingTitle'

type SkillItem = {
  name: string
  icon: string
  level: number
  category: string
  color: string
  description: string
}

const Skills = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeCategory, setActiveCategory] = useState('All')

  const skillsData: SkillItem[] = [
    // Frontend Skills
    {
      name: "HTML",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
      level: 95,
      category: "Frontend",
      color: "#E34F26",
      description: "Semantic markup and modern HTML5 features for accessible web structure"
    },
    {
      name: "CSS",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
      level: 92,
      category: "Frontend",
      color: "#1572B6",
      description: "Advanced styling with Flexbox, Grid, animations, and responsive design"
    },
    {
      name: "SCSS/Sass",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg",
      level: 88,
      category: "Frontend",
      color: "#CC6699",
      description: "CSS preprocessing with variables, mixins, and modular architecture"
    },
    {
      name: "React",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      level: 95,
      category: "Frontend",
      color: "#61DAFB",
      description: "Building modern, interactive user interfaces with hooks, context, and performance optimization"
    },
    {
      name: "Next.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
      level: 90,
      category: "Frontend",
      color: "#FFFFFF",
      description: "Full-stack React framework with SSR, SSG, API routes, and optimal performance"
    },
    {
      name: "TypeScript",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      level: 88,
      category: "Frontend",
      color: "#3178C6",
      description: "Type-safe JavaScript development for scalable and maintainable applications"
    },
    {
      name: "Tailwind CSS",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
      level: 92,
      category: "Frontend",
      color: "#06B6D4",
      description: "Utility-first CSS framework for rapid UI development and consistent design systems"
    },
    {
      name: "Material-UI",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/materialui/materialui-original.svg",
      level: 85,
      category: "Frontend",
      color: "#0081CB",
      description: "React component library implementing Google's Material Design system"
    },
    {
      name: "Vue.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
      level: 80,
      category: "Frontend",
      color: "#4FC08D",
      description: "Progressive JavaScript framework with reactive data binding and component architecture"
    },

    // Backend Skills
    {
      name: "Node.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      level: 90,
      category: "Backend",
      color: "#339933",
      description: "JavaScript runtime for building scalable server-side applications and APIs"
    },
    {
      name: "Python",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      level: 85,
      category: "Backend",
      color: "#3776AB",
      description: "Versatile programming language for web development, automation, and data science"
    },
    {
      name: "Firebase",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
      level: 92,
      category: "Backend",
      color: "#FFCA28",
      description: "Backend-as-a-Service platform with real-time database, authentication, and hosting"
    },
    {
      name: "Supabase",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg",
      level: 88,
      category: "Backend",
      color: "#3ECF8E",
      description: "Open-source Firebase alternative with PostgreSQL, real-time subscriptions, and auth"
    },
    {
      name: "Django",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
      level: 82,
      category: "Backend",
      color: "#092E20",
      description: "High-level Python web framework for rapid development with built-in admin and ORM"
    },

    // Database Skills
    {
      name: "PostgreSQL",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
      level: 88,
      category: "Database",
      color: "#336791",
      description: "Advanced relational database with JSON support, full-text search, and ACID compliance"
    },
    {
      name: "MongoDB",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
      level: 85,
      category: "Database",
      color: "#47A248",
      description: "NoSQL document database for flexible, scalable data storage and aggregation"
    },
    {
      name: "Redis",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
      level: 78,
      category: "Database",
      color: "#DC382D",
      description: "In-memory data store for caching, session management, and real-time applications"
    },

    // Cloud & DevOps
    {
      name: "AWS",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
      level: 85,
      category: "Cloud",
      color: "#FF9900",
      description: "Cloud computing platform with EC2, S3, Lambda, and comprehensive service ecosystem"
    },
    {
      name: "Docker",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
      level: 88,
      category: "DevOps",
      color: "#2496ED",
      description: "Containerization platform for consistent application deployment across environments"
    },
    {
      name: "Kubernetes",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
      level: 80,
      category: "DevOps",
      color: "#326CE5",
      description: "Container orchestration for automated deployment, scaling, and management"
    },

    // Tools & Others
    {
      name: "Git",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
      level: 90,
      category: "Tools",
      color: "#F05032",
      description: "Distributed version control for collaborative development and code management"
    },
    {
      name: "Postman",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg",
      level: 90,
      category: "API",
      color: "#FF6C37",
      description: "API development and testing tool for REST and GraphQL endpoints"
    },
    {
      name: "Figma",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
      level: 85,
      category: "Design",
      color: "#F24E1E",
      description: "Collaborative design tool for UI/UX design, prototyping, and design systems"
    },
    {
      name: "Canva",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/canva/canva-original.svg",
      level: 88,
      category: "Design",
      color: "#00C4CC",
      description: "Graphic design platform for creating stunning visuals and marketing materials"
    },
    {
      name: "OpenAI",
      icon: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
      level: 95,
      category: "AI",
      color: "#10A37F",
      description: "AI integration specialist with advanced prompt engineering and model optimization"
    },
    {
      name: "TensorFlow",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
      level: 78,
      category: "AI",
      color: "#FF6F00",
      description: "Machine learning framework for building and training neural networks"
    },
    {
      name: "GraphQL",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
      level: 82,
      category: "API",
      color: "#E10098",
      description: "Query language and runtime for efficient, flexible API data fetching"
    }
  ]

  const categories = ['All', 'Frontend', 'Backend', 'Database', 'Cloud', 'DevOps', 'AI', 'Tools', 'Design', 'API']

  const filteredSkills = activeCategory === 'All'
    ? skillsData
    : skillsData.filter(skill => skill.category === activeCategory)

  // Split skills into 3 rows for infinite scroll (only when "All" is selected)
  const skillsPerRow = Math.ceil(filteredSkills.length / 3)
  const row1 = filteredSkills.slice(0, skillsPerRow)
  const row2 = filteredSkills.slice(skillsPerRow, skillsPerRow * 2)
  const row3 = filteredSkills.slice(skillsPerRow * 2)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15
      }
    }
  }

  

  // Skill Card Component with Fixed Hover State
  const SkillCard = ({ skill, index }: { skill: SkillItem, index: number }) => (
    <motion.div
      whileHover={{
        scale: 1.05,
        y: -8,
        rotateY: 5,
        zIndex: 10
      }}
      className="flex-shrink-0 w-56 group relative cursor-target"
    >
      {/* Skill Card */}
      <div className="relative p-5 bg-transparent backdrop-blur-sm border border-gray-800 rounded-xl hover:border-white/30 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-white/10 overflow-hidden h-44">

        {/* Default Content - Hidden on Hover */}
        <div className="relative z-10 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
          {/* Skill Icon */}
          <div className="mb-3">
            <motion.div
              className="w-10 h-10 mx-auto relative"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.8 }}
            >
              <Image
                src={skill.icon} // can be a local import or remote URL
                alt={skill.name}
                width={40} // required for next/image
                height={40} // required for next/image
                className="w-full h-full object-contain"
                style={{
                  filter: skill.name === "Next.js"
                    ? "invert(1) brightness(1.2)"
                    : "brightness(1.1)",
                }}
              />
            </motion.div>
          </div>

          {/* Skill Name */}
          <h3 className="text-center font-semibold text-white mb-3 text-sm">
            {skill.name}
          </h3>

          {/* Skill Level Bar */}
          <div className="relative mb-3">
            <div className="w-full bg-gray-700/50 rounded-full h-1.5 overflow-hidden backdrop-blur-sm">
              <motion.div
                initial={{ width: 0 }}
                animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                transition={{
                  duration: 1.5,
                  delay: index * 0.05,
                  ease: "easeOut"
                }}
                className="h-full rounded-full relative overflow-hidden"
                style={{
                  backgroundColor: skill.name === 'Next.js' ? '#FFFFFF' : skill.color,
                  boxShadow: `0 0 15px ${skill.name === 'Next.js' ? '#FFFFFF' : skill.color}60`
                }}
              >
                {/* Animated shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                    ease: "linear"
                  }}
                />
              </motion.div>
            </div>
            <motion.span
              className="absolute -top-5 right-0 text-xs font-medium border border-white/20 px-2 py-0.5 rounded-full bg-gray-900/80 backdrop-blur-sm text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.05 + 1 }}
            >
              {skill.level}%
            </motion.span>
          </div>

          {/* Category Badge */}
          <div className="flex justify-center">
            <span className="text-xs px-2 py-1 bg-gray-800/80 text-gray-300 rounded-full border border-gray-600 backdrop-blur-sm">
              {skill.category}
            </span>
          </div>
        </div>

        {/* Hover Description - Appears on Hover */}
        <motion.div
          className="absolute inset-0 bg-black/95 backdrop-blur-md rounded-xl p-4 flex flex-col justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-20"
          initial={{ scale: 0.9 }}

        >
          <div className="text-center space-y-3">
            <div className="w-8 h-8 mx-auto mb-2 relative">
              <Image
                src={skill.icon} // string path or imported image
                alt={skill.name}
                fill // makes it fill the parent div
                className="object-contain"
                style={{
                  filter: skill.name === "Next.js"
                    ? "invert(1) brightness(1.2)"
                    : "brightness(1.1)",
                }}
              />
            </div>
            <h4 className="font-semibold text-white text-base">{skill.name}</h4>
            <p className="text-gray-300 text-xs leading-relaxed">
              {skill.description}
            </p>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
              <span
                className="text-xs font-medium px-2 py-1 rounded-full border border-white bg-white/10 text-white"
              >
                {skill.level}% Proficiency
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )

  // Infinite Scrolling Row Component
  const InfiniteScrollRow = ({
    skills,
    direction,
    speed
  }: {
    skills: SkillItem[],
    direction: 'left' | 'right',
    speed: number
  }) => {
    // Calculate the total width needed for one complete set of skills
    const cardWidth = 224 + 16 // w-56 (224px) + gap (16px)
    const totalWidth = skills.length * cardWidth

    return (
      <div className="w-full overflow-hidden py-3">
        <motion.div
          className="flex gap-4"
          style={{ width: `${totalWidth * 2}px` }}
          animate={{
            x: direction === 'left'
              ? [`0px`, `-${totalWidth}px`]
              : [`-${totalWidth}px`, `0px`]
          }}
          transition={{
            x: {
              duration: speed,
              repeat: Infinity,
              ease: "linear",
            },
          }}
          whileHover={{ animationPlayState: 'paused' }}
        >
          {/* First set of skills */}
          {skills.map((skill, index) => (
            <SkillCard key={`first-${skill.name}-${index}`} skill={skill} index={index} />
          ))}
          {/* Duplicate set for seamless loop */}
          {skills.map((skill, index) => (
            <SkillCard key={`second-${skill.name}-${index}`} skill={skill} index={index} />
          ))}
        </motion.div>
      </div>
    )
  }

  return (
    <section ref={ref} id="skills" className="py-20 relative overflow-hidden min-h-screen">

      <div className="w-full relative z-10">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="space-y-16"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center space-y-4 px-6">
            <FloatingTitle className="cursor-target text-4xl md:text-6xl font-bold text-white">
              Technical Skills
            </FloatingTitle>
            <motion.div
              className="w-24 h-px bg-white mx-auto"
              initial={{ width: 0 }}
              animate={isInView ? { width: 96 } : { width: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              A comprehensive toolkit of modern technologies and frameworks I use to bring ideas to life
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-3 px-6"
          >
            {categories.map((category, index) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`cursor-target px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${activeCategory === category
                  ? 'bg-white text-black shadow-lg shadow-white/20'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-600 hover:border-gray-400'
                  }`}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>

          {/* Conditional Skills Display */}
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {activeCategory === 'All' ? (
              // Infinite Scrolling for "All" category
              <div className="space-y-6">
                {/* Row 1 - Right to Left */}
                <InfiniteScrollRow skills={row1} direction="left" speed={30} />

                {/* Row 2 - Left to Right */}
                <InfiniteScrollRow skills={row2} direction="right" speed={35} />

                {/* Row 3 - Right to Left */}
                <InfiniteScrollRow skills={row3} direction="left" speed={25} />
              </div>
            ) : (
              // Centered Grid for specific categories
              <div className="max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredSkills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex justify-center"
                    >
                      <SkillCard skill={skill} index={index} />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Enhanced Stats Section - Consistent with About page styling */}
          <motion.div
            variants={containerVariants}
            className="max-w-6xl mx-auto px-6"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { number: "25+", label: "Technologies", subtitle: "Modern tools & frameworks" },
                { number: "10x", label: "Faster Development", subtitle: "Using AI-powered workflows" },
                { number: "24/7", label: "Learning", subtitle: "Always staying updated" },
                { number: "100%", label: "Problem Solving", subtitle: "Creative solutions" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  className="cursor-target text-center p-6 border border-gray-800 rounded-lg hover:border-white transition-colors duration-300"
                >
                  <motion.div
                    className="text-3xl font-bold text-white mb-2"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ delay: index * 0.2, type: "spring", stiffness: 200 }}
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-gray-400 text-sm uppercase tracking-wider font-medium">
                    {stat.label}
                  </div>
                  <div className="text-gray-500 text-xs mt-1">
                    {stat.subtitle}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

    </section>
  )
}

export default Skills