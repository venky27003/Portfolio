'use client'

import { useRef, useState } from 'react'

type Project = {
  title: string;
  category: string;
  shortDescription: string;
  longDescription: string;
  image: string;
  technologies: string[];
  github: string | null;
  live: string | null;
  status: string;
};
import { motion, useInView } from 'framer-motion'
import { ExternalLink, Github, DownloadCloud, Info } from 'lucide-react'
import FloatingTitle from '@/components/FloatingTitle'

const Projects = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeFilter, setActiveFilter] = useState('All')
  const [modalProject, setModalProject] = useState<Project | null>(null)

  const projects: Project[] = [
    {
      title: "2D Champion",
      category: "Web Game",
      shortDescription: "Play fast 2D browser games and compete on global leaderboards.",
      longDescription:
        "2D Champion is a multiplayer 2D gaming platform built with Angular and Firebase. It supports realtime scoring, persistent leaderboards, and matchmaking for fast competitive sessions — crafted for performance and low-latency gameplay.",
      image: "/assets/2dchampion.png",
      technologies: ["Angular", "Firebase", "Realtime", "HTML5 Canvas"],
      github: null,
      live: "https://dchampion-4ce9f.web.app/",
      status: "Live"
    },
    {
      title: "Advanced Text Compare",
      category: "Utility",
      shortDescription: "Professional word-by-word text comparison with advanced diff algorithms.",
      longDescription:
        "Advanced Text Compare is a precision text-diff tool built with React. It implements advanced diffing algorithms to show word-level differences, supports side-by-side views, and is optimized for comparing large documents quickly and accurately.",
      image: "/assets/simpletextcompare.png",
      technologies: ["React", "Custom Diff Algorithms", "Accessibility"],
      github: null,
      live: "https://simple-text-compare.vercel.app/",
      status: "Live"
    },
    {
      title: "Timestamp Lab",
      category: "Utility",
      shortDescription: "Advanced epoch time converter + timezone utilities.",
      longDescription:
        "Timestamp Lab is an advanced epoch/timezone utility built with Next.js. It performs timezone conversions, epoch math, and provides copy-ready formats useful for developers, devops engineers, and everyone dealing with timestamps across regions.",
      image: "/assets/timestamplab.png",
      technologies: ["Next.js", "Date utilities", "Timezone handling"],
      github: null,
      live: "https://timestamp-lab.vercel.app/",
      status: "Live"
    },
    {
      title: "Simple IQ Tester",
      category: "Web Game",
      shortDescription: "Short IQ-style tests with score tracking and leaderboards.",
      longDescription:
        "Simple IQ Tester is built with Next.js and Supabase. It offers short quizzes designed to test problem-solving and reasoning, stores results and leaderboards in Supabase, and focuses on shareability and quick sessions.",
      image: "/assets/iqtester.png",
      technologies: ["Next.js", "Supabase", "Serverless Functions"],
      github: null,
      live: "https://simple-iq-tester.vercel.app/",
      status: "Live"
    },
    {
      title: "Connvo (Social Chat)",
      category: "Mobile App",
      shortDescription: "Realtime multi-room chat with automatic translation and geo rooms.",
      longDescription:
        "Connvo is a realtime social chat mobile app built with React Native and Supabase. Features include country/state/city-based rooms, realtime messaging, on-the-fly translation to break language barriers, and a simple discovery UI for geo-based conversations.",
      image: "/assets/connvo.png",
      technologies: ["React Native", "Supabase", "Realtime", "Translation APIs"],
      github: null,
      live: "https://expo.dev/artifacts/eas/62zd83u6gy2iw4YSjPYpAv.apk",
      status: "Live (APK)"
    },
    {
      title: "Upcoming Project",
      category: "Coming Soon",
      shortDescription: "Working on a new project — will be live soon.",
      longDescription:
        "This project is in active development. Details, repository, and deployment links will be published here once ready.",
      image: "",
      technologies: ["TBA"],
      github: null,
      live: null,
      status: "WIP"
    }
  ]

  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))]

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(project => project.category === activeFilter)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { type: "tween", staggerChildren: 0.12, ease: "easeInOut" }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "tween", duration: 0.6, ease: "easeInOut" }
    }
  }

  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="space-y-12"
        >
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <FloatingTitle className="cursor-target text-4xl md:text-6xl font-bold">
              My <span className="highlight">Projects</span>
            </FloatingTitle>
            <div className="w-24 h-px bg-white mx-auto" />
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              A curated list of projects I built — click a card to read more or open the live app.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`cursor-target px-5 py-2 text-sm font-medium tracking-wider uppercase transition-all duration-200 border rounded-md ${activeFilter === category
                  ? 'bg-white text-black border-white'
                  : 'bg-transparent text-white border-gray-600 hover:border-white'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          <motion.div variants={containerVariants} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <motion.article
                key={project.title}
                variants={itemVariants}
                layout
                className="group relative bg-black border border-gray-800 rounded-lg overflow-hidden hover:border-white transition-all duration-300 cursor-target"
              >
                <div className="relative h-44 bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title + ' screenshot'}
                      className="absolute inset-0 w-full h-full object-contain object-center transition-opacity duration-300 group-hover:opacity-60"
                      style={{ zIndex: 1 }}
                    />
                  ) : (
                    <div className="relative z-10 text-5xl font-bold text-gray-600 select-none">
                      {project.title.charAt(0)}
                    </div>
                  )}
                  <div className={`absolute top-3 z-10 right-3 px-2 py-1 text-xs font-medium rounded ${project.status === 'Live' || project.status === 'Live (APK)'
                      ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                      : project.status === 'WIP'
                        ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                        : 'bg-gray-700/20 text-gray-300 border border-gray-700/30'
                    }`}>
                    {project.status}
                  </div>
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3 z-20">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20"
                        aria-label={`${project.title} github`}
                      >
                        <Github />
                      </a>
                    )}
                    {project.live && project.live.endsWith('.apk') ? (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-2 rounded-md bg-white/10 hover:bg-white/20 text-white "
                      >
                        <DownloadCloud size={16} />
                        <span className="text-sm">APK</span>
                      </a>
                    ) : project.live ? (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-2 rounded-md bg-white/10 hover:bg-white/20 text-white"
                      >
                        <ExternalLink size={16} />
                        <span className="text-sm">Open</span>
                      </a>
                    ) : null}
                    <button
                      onClick={() => setModalProject(project)}
                      className="flex items-center gap-2 px-3 py-2 rounded-md bg-white/10 hover:bg-white/20 text-white"
                    >
                      <Info size={16} />
                      <span className="text-sm">Details</span>
                    </button>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold">{project.title}</h3>
                  <p className="mt-2 text-sm text-gray-300">{project.shortDescription}</p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.technologies.map((t) => (
                      <span key={t} className="text-xs px-2 py-1 bg-white/6 rounded-full text-gray-200">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    {project.live && !project.live.endsWith('.apk') && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-white/10 hover:bg-white/20 text-white text-sm"
                      >
                        <ExternalLink size={14} />
                        Live
                      </a>
                    )}
                    {project.live && project.live.endsWith('.apk') && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-white/10 hover:bg-white/20 text-white text-sm"
                      >
                        <DownloadCloud size={14} />
                        Download APK
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-gray-700 hover:border-white text-sm"
                      >
                        <Github size={14} />
                        GitHub
                      </a>
                    )}

                    <button
                      onClick={() => setModalProject(project)}
                      className="ml-auto text-xs uppercase tracking-wider text-gray-400 hover:text-white"
                    >
                      Read more →
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {modalProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          aria-modal="true"
          role="dialog"
        >
          <div className="absolute inset-0 bg-black/70" onClick={() => setModalProject(null)} />
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            className="relative z-10 max-w-3xl w-full bg-[#0b0b0b] border border-gray-800 rounded-xl overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 flex items-center justify-center rounded-md bg-gray-900 text-3xl font-bold text-gray-500">
                  {modalProject.title.charAt(0)}
                </div>
                <div>
                  <h2 className="text-2xl font-semibold">{modalProject.title}</h2>
                  <p className="text-sm text-gray-400 mt-1">{modalProject.category} • {modalProject.status}</p>
                </div>
                <button
                  onClick={() => setModalProject(null)}
                  className="ml-auto text-gray-400 hover:text-white"
                  aria-label="Close details"
                >
                  ✕
                </button>
              </div>

              <div className="mt-5 text-gray-200">
                <p>{modalProject.longDescription}</p>

                <div className="mt-4">
                  <h4 className="text-sm text-gray-400 uppercase tracking-wide">Technologies</h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {modalProject.technologies.map((t) => (
                      <span key={t} className="text-xs px-2 py-1 bg-white/6 rounded-full text-gray-200">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  {modalProject.live && !modalProject.live.endsWith('.apk') && (
                    <a
                      href={modalProject.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white/10 hover:bg-white/20 text-white text-sm"
                    >
                      <ExternalLink />
                      Open Live
                    </a>
                  )}

                  {modalProject.live && modalProject.live.endsWith('.apk') && (
                    <a
                      href={modalProject.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white/10 hover:bg-white/20 text-white text-sm"
                    >
                      <DownloadCloud />
                      Download APK
                    </a>
                  )}

                  {modalProject.github && (
                    <a
                      href={modalProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-gray-700 hover:border-white text-sm"
                    >
                      <Github />
                      View on GitHub
                    </a>
                  )}

                  <button
                    onClick={() => setModalProject(null)}
                    className="ml-auto px-4 py-2 text-sm rounded-md border border-gray-700 hover:border-white"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  )
}

export default Projects
