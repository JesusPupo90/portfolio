/* ==========================================================================
   IMPORTS & CONFIG
   ========================================================================== */

import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { ExternalLink, Plus } from 'lucide-react'
import { IoLogoGithub } from 'react-icons/io5'

const getProjectImages = (currentLanguage) => ({
  casamartha: '/projects/casa-martha-recovery.webp',
  slice: `/projects/slice-pizzeria-${currentLanguage}.webp`,
  aura: `/projects/aura-apparel-${currentLanguage}.webp`,
});

const PROJECT_TAGS = {
  casamartha: ['React', 'Tailwind CSS', 'Vite', 'Mapbox SDK', 'React Router', 'Payments'],
  slice: ['React', 'Tailwind CSS', 'Vite', 'i18next', 'Context API'],
  aura: ['React', 'Tailwind CSS', 'Vite', 'i18next', 'Context API'],
}

const PROJECT_LINKS = {
  casamartha: {
    demo: 'https://casa-martha-recovery.vercel.app',
    github: 'https://github.com/JesusPupo90/casa-martha',
  },
  slice: {
    demo: 'https://slice-pizzeria-virid.vercel.app/',
    github: 'https://github.com/JesusPupo90/slice-pizzeria',
  },
  aura: {
    demo: 'https://aura-apparel-store-three.vercel.app/',
    github: 'https://github.com/JesusPupo90/aura-apparel-store',
  },
}

/* ==========================================================================
   FADE IMAGE COMPONENT
   ========================================================================== */

function FadeImage({ src, alt, className }) {
  const [loaded, setLoaded] = useState(false)
  const imgRef = useRef(null)

  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true)
  }, [])

  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      onLoad={() => setLoaded(true)}
      className={`${className} transition-all duration-700 ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
    />
  )
}

/* ==========================================================================
   PROJECT CARD COMPONENT
   ========================================================================== */

function ProjectCard({ projectKey, featured }) {
  const { t, i18n } = useTranslation()
  
  const title = t(`projects.items.${projectKey}.title`)
  const description = t(`projects.items.${projectKey}.description`)
  const tags = PROJECT_TAGS[projectKey]
  const links = PROJECT_LINKS[projectKey]
  
  const projectImages = getProjectImages(i18n.language)
  const image = projectImages[projectKey]

  if (featured) {
    return (
      <div className="md:col-span-2 group relative">
        <Plus size={14} className="absolute -top-3 -left-3 text-surface-border/50 z-10 hidden md:block" />
        <div className="relative h-full bg-surface-card/20 border border-surface-border/50 rounded-sm overflow-hidden transition-all duration-500 hover:border-surface-border flex flex-col md:flex-row">

          {/* --- Image Container --- */}
          <div className="relative w-full md:w-3/5 h-64 md:h-auto overflow-hidden bg-surface-dark">
            <FadeImage
              src={image}
              alt={title}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent opacity-60 md:hidden" />
          </div>

          {/* --- Text Container --- */}
          <div className="relative z-20 flex flex-col justify-center p-6 md:p-8 md:w-2/5 bg-surface-card/40 md:bg-transparent">

              {featured && (
                <span className="w-fit px-2 py-0.5 mb-6 text-[10px] font-mono font-semibold text-brand-accent uppercase tracking-widest bg-brand-accent/10 border border-brand-accent/25 rounded-sm">
                  {t('projects.featured_label')}
                </span>
              )}
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <h3 className="text-2xl md:text-3xl font-sans font-extrabold text-text-light tracking-tight">
                {title}
              </h3>
            </div>

            <p className="text-text-muted font-light mt-2 text-sm md:text-base">
              {description}
            </p>

            <div className="flex flex-wrap gap-2 mt-4">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-[10px] font-mono text-text-muted uppercase tracking-widest bg-surface-card/50 border border-surface-border/50 rounded-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* --- Action Links --- */}
            <div className="flex items-center gap-4 mt-6">
              <a
                href={links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-text-light hover:text-brand-accent transition-colors"
              >
                <ExternalLink size={14} /> {t("projects.live_demo", "Demo")}
              </a>
              <a
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-text-muted hover:text-text-light transition-colors"
              >
                <IoLogoGithub size={14} /> {t("projects.source_code", "Código")}
              </a>
            </div>
          </div>

        </div>
        <Plus size={14} className="absolute -bottom-3 -right-3 text-surface-border/50 z-10 hidden md:block" />
      </div>
    )
  }

  return (
    <div className="group relative">
      <Plus size={14} className="absolute -top-3 -left-3 text-surface-border/50 z-10 hidden md:block" />
      <div className="relative h-full bg-surface-card/20 border border-surface-border/50 rounded-sm overflow-hidden transition-all duration-500 hover:border-surface-border flex flex-col justify-between">
        <div>
          <div className="relative w-full aspect-[4/3] overflow-hidden bg-surface-dark">
            <FadeImage
              src={image}
              alt={title}
              className="w-full h-full object-cover object-[25%_center] group-hover:scale-105 transition-transform duration-700 [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/20 to-transparent" />
          </div>
          <div className="p-5">
            <h3 className="text-xl font-sans font-extrabold text-text-light tracking-tight">
              {title}
            </h3>
            <p className="text-text-muted font-light mt-2 text-sm">
              {description}
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-[10px] font-mono text-text-muted uppercase tracking-widest bg-surface-card/50 border border-surface-border/50 rounded-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="px-5 pb-5 pt-2 flex items-center gap-4">
          <a
            href={links.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-text-light hover:text-brand-accent transition-colors"
          >
            <ExternalLink size={14} /> {t("projects.live_demo", "Demo")}
          </a>
          <a
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-text-muted hover:text-text-light transition-colors"
          >
            <IoLogoGithub size={14} /> {t("projects.source_code", "Código")}
          </a>
        </div>

      </div>
      <Plus size={14} className="absolute -bottom-3 -right-3 text-surface-border/50 z-10 hidden md:block" />
    </div>
  )
}

/* ==========================================================================
   PROJECTS SECTION COMPONENT
   ========================================================================== */

export default function Projects() {
  const { t } = useTranslation()

  return (
    <section id="projects" className="relative px-4 py-24 bg-[#09090b] overflow-hidden scroll-mt-16">
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-brand-accent/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="relative mb-16">
          <Plus size={16} className="absolute -top-10 -left-6 text-surface-border/50 hidden lg:block" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text-light tracking-tight">
            {t('projects.title')}
          </h2>
          <p className="text-text-muted mt-4 max-w-2xl text-lg">
            {t('projects.subtitle')}
          </p>
          <Plus size={16} className="absolute -bottom-10 -left-6 text-surface-border/50 hidden lg:block" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProjectCard projectKey="casamartha" featured />
          <ProjectCard projectKey="slice" />
          <ProjectCard projectKey="aura" />
        </div>
      </div>
    </section>
  )
}