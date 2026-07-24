import { useTranslation } from 'react-i18next'
import { ArrowRight, ChevronDown, MapPin, Plus } from 'lucide-react'
import profile from "../../assets/hero-portrait.webp"

const BADGES = [
  { id: 'dev', labelKey: 'hero.badges.dev' },
  { id: 'bilingual', labelKey: 'hero.badges.bilingual' },
  { id: 'sdd', labelKey: 'hero.badges.sdd' },
]

export default function Hero() {
  const { t } = useTranslation()

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-center px-4 py-12 lg:py-20 overflow-hidden bg-[#09090b]">
      
      {/* Luz ambiental técnica súper sutil */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-accent/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Columna Izquierda: Copy Editorial */}
        <div className="lg:col-span-7 flex flex-col items-start text-left relative">
          
          {/* Micro-guía de arquitectura */}
          <Plus size={16} className="absolute -top-10 -left-6 text-surface-border/50 hidden lg:block" />

          {/* Badge Estado - Neutralizado */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-8 bg-surface-card/30 border border-surface-border/50 rounded-none">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent" />
            </span>
            <span className="text-[10px] sm:text-xs font-sans font-semibold text-text-light tracking-widest uppercase">
              {t('hero.badge')}
            </span>
          </div>

          {/* H1 Gigante (Display) */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-text-light leading-[1.1] mb-6 tracking-tighter">
            <span className="block text-text-muted text-sm sm:text-base font-sans font-semibold mb-4 tracking-widest uppercase">
              Jesus Pupo <span className="text-surface-border font-light mx-2">/</span> {t('hero.role')}
            </span>
            {t('hero.title')}
          </h1>

          <p className="text-base sm:text-lg text-text-muted max-w-xl mb-10 leading-relaxed font-light">
            {t('hero.subtitle')}
          </p>

          {/* Badges de Stack */}
          <div className="flex flex-wrap items-center gap-3 mb-12">
            {BADGES.map((badge) => (
              <span
                key={badge.id}
                className="px-3 py-1.5 text-xs font-mono text-text-muted bg-surface-card/30 border border-surface-border rounded-sm hover:border-text-light transition-colors"
              >
                {t(badge.labelKey)}
              </span>
            ))}
          </div>

          {/* Botones - Alta Conversión */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold bg-brand-accent text-[#09090b] rounded-sm hover:bg-brand-accent/90 transition-all shadow-[0_0_20px_rgba(var(--brand-accent),0.15)] hover:scale-[1.02]"
            >
              {t('hero.cta_projects')}
              <ArrowRight size={18} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-sans font-medium text-text-light border border-surface-border bg-transparent rounded-sm hover:border-text-muted hover:bg-surface-card transition-all"
            >
              {t('hero.cta_contact')}
            </a>
          </div>

          {/* Micro-guía */}
          <Plus size={16} className="absolute -bottom-10 -left-6 text-surface-border/50 hidden lg:block" />
        </div>

        {/* Columna Derecha: Tarjeta Fotográfica */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
          
          <div className="relative group w-full max-w-md">
            {/* Brillo de fondo */}
            <div className="absolute -inset-0.5 bg-gradient-to-b from-brand-accent/10 to-transparent rounded-xl blur-xl opacity-50 group-hover:opacity-100 transition duration-700" />

            <div className="relative bg-[#09090b] border border-surface-border/50 p-2 rounded-xl backdrop-blur-sm">
              
              {/* Contenedor Fotográfico */}
              <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden bg-surface-dark border border-surface-border/50">
                <img
                  src={profile} 
                  alt="Jesus Pupo"
                  className="w-full h-full object-cover object-center filter grayscale contrast-125 brightness-90 group-hover:grayscale-0 transition-all duration-700 [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]"
                />
                
                <div className="absolute inset-0 border border-white/5 rounded-lg pointer-events-none" />
              </div>

              {/* Metadatos */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-text-light font-sans tracking-tight">Jesus Pupo</h3>
                  <p className="text-[10px] text-text-muted font-mono uppercase tracking-widest mt-0.5">WannaDev Studios</p>
                </div>

                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#09090b]/80 border border-surface-border/50 backdrop-blur-md text-[10px] font-mono text-text-muted rounded-sm">
                  <MapPin size={12} className="text-brand-accent" />
                  <span>{t('hero.location')}</span>
                </div>
              </div>

            </div>
          </div>
          
          {/* Micro-guía */}
          <Plus size={16} className="absolute -top-10 -right-6 text-surface-border/50 hidden lg:block" />
        </div>

      </div>

      <a
        href="#projects"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-text-muted hover:text-brand-accent transition-colors animate-bounce hidden sm:block"
      >
        <ChevronDown size={20} strokeWidth={1.5} />
      </a>
    </section>
  )
}