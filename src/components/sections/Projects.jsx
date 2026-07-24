import { useTranslation } from 'react-i18next'
import { ExternalLink, Plus } from 'lucide-react'
import { IoLogoGithub } from 'react-icons/io5'

// Recomendación: Coloca las imágenes en la carpeta public (ej: /projects/casamartha.webp) 
// para que Vite las sirva de forma directa y limpia sin errores de ruta.
const PROJECT_IMAGES = {
  casamartha: '/projects/casa-martha-recovery.webp',
  slice: '/projects/slice-pizzeria.webp',
  aura: '/projects/aura-apparel.webp',
}

const PROJECT_TAGS = {
  casamartha: ['React', 'Tailwind CSS', 'Vite'],
  slice: ['React', 'Context API', 'CSS Modules'],
  aura: ['React', 'i18next', 'Zustand'],
}

function ProjectCard({ projectKey, featured }) {
  const { t } = useTranslation()
  const title = t(`projects.items.${projectKey}.title`)
  const description = t(`projects.items.${projectKey}.description`)
  const tags = PROJECT_TAGS[projectKey]
  const image = PROJECT_IMAGES[projectKey]

  if (featured) {
    return (
      <div className="md:col-span-2 group relative">
        <Plus size={14} className="absolute -top-3 -left-3 text-surface-border/50 z-10 hidden md:block" />
        <div className="relative h-full bg-surface-card/20 border border-surface-border/50 rounded-sm overflow-hidden transition-all duration-500 hover:border-surface-border flex flex-col md:flex-row">
          
          {/* Contenedor de la Imagen: Altura fija en móvil para que respire */}
          <div className="relative w-full md:w-3/5 h-64 md:h-auto overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            {/* Gradiente sutil solo para fundir con el borde */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent opacity-60 md:hidden" />
          </div>

          {/* Contenedor de Texto: Bloque independiente abajo en móvil, al lado en desktop */}
          <div className="relative z-20 flex flex-col justify-center p-6 md:p-8 md:w-2/5 bg-surface-card/40 md:bg-transparent">
            <h3 className="text-2xl md:text-3xl font-sans font-extrabold text-text-light tracking-tight">
              {title}
            </h3>
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
            
            {/* Enlaces de acción directos en el flujo del texto */}
            <div className="flex items-center gap-4 mt-6">
              <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-text-light hover:text-brand-accent transition-colors cursor-pointer">
                <ExternalLink size={14} /> {t("projects.live_demo", "Demo")}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-text-muted hover:text-text-light transition-colors cursor-pointer">
                <IoLogoGithub size={14} /> {t("projects.source_code", "Código")}
              </span>
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
          <div className="relative w-full aspect-[4/3] overflow-hidden">
            <img
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

        {/* Enlaces de acción idénticos a los del featured pero abajo del todo */}
        <div className="px-5 pb-5 pt-2 flex items-center gap-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-text-light hover:text-brand-accent transition-colors cursor-pointer">
            <ExternalLink size={14} /> {t("projects.live_demo", "Demo")}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-text-muted hover:text-text-light transition-colors cursor-pointer">
            <IoLogoGithub size={14} /> {t("projects.source_code", "Código")}
          </span>
        </div>

      </div>
      <Plus size={14} className="absolute -bottom-3 -right-3 text-surface-border/50 z-10 hidden md:block" />
    </div>
  )
}

export default function Projects() {
  const { t } = useTranslation()

  return (
    <section id="projects" className="relative px-4 py-24 bg-[#09090b] overflow-hidden">
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