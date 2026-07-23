import { useTranslation } from 'react-i18next'
import { ArrowRight, ChevronDown } from 'lucide-react'

import i18n from '../../i18n'

const BADGES = [
  { id: 'dev', labelKey: 'hero.badges.dev' },
  { id: 'bilingual', labelKey: 'hero.badges.bilingual' },
  { id: 'sdd', labelKey: 'hero.badges.sdd' },
]

export default function Hero() {
  const { t } = useTranslation()

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-accent/5 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8
          bg-brand-accent/10 border border-brand-accent/20 rounded-full">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full
              rounded-full bg-brand-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent" />
          </span>
          <span className="text-xs font-medium text-brand-accent tracking-wide">
            {t('hero.badge')}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold
          text-text-light leading-tight mb-6 tracking-tight">
          {t('hero.title')}
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
          {t('hero.subtitle')}
        </p>

        {/* Tech Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {BADGES.map((badge) => (
            <span
              key={badge.id}
              className="px-3 py-1.5 text-xs font-medium text-text-muted
                border border-surface-border rounded-full
                hover:border-brand-accent/30 hover:text-text-light
                transition-colors"
            >
              {t(badge.labelKey)}
            </span>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold
              bg-brand-accent text-[#09090b] rounded-lg
              hover:bg-brand-accent/90 transition-all
              shadow-lg shadow-brand-accent/20"
          >
            {t('hero.cta_projects')}
            <ArrowRight size={18} />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold
              text-text-light border border-surface-border rounded-lg
              hover:border-text-muted hover:bg-surface-card/50 transition-all"
          >
            {t('hero.cta_contact')}
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <a
        href="#projects"
        className="absolute bottom-8 left-1/2 -translate-x-1/2
          text-text-muted hover:text-text-light transition-colors
          animate-bounce"
      >
        <ChevronDown size={24} />
      </a>
    </section>
  )
}
