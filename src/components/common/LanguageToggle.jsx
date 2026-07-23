import { useTranslation } from 'react-i18next'
import { Languages } from 'lucide-react'

export default function LanguageToggle() {
  const { i18n } = useTranslation()

  const toggleLanguage = () => {
    const next = i18n.language === 'es' ? 'en' : 'es'
    i18n.changeLanguage(next)
  }

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium
        text-text-muted hover:text-text-light transition-colors
        border border-surface-border rounded-lg
        hover:border-brand-accent/50"
      aria-label={`Switch language to ${i18n.language === 'es' ? 'English' : 'Español'}`}
    >
      <Languages size={16} />
      <span>{i18n.language === 'es' ? 'EN' : 'ES'}</span>
    </button>
  )
}
