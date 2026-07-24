/* ==========================================================================
   IMPORTS & CONFIG
   ========================================================================== */

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Menu, X, Download, ExternalLink } from 'lucide-react'
import LanguageToggle from './LanguageToggle'

const NAV_LINKS = [
  { key: 'projects', href: '#projects' },
  { key: 'workflow', href: '#workflow' },
  { key: 'contact', href: '#contact' },
]

/* ==========================================================================
   NAVBAR COMPONENT
   ========================================================================== */

export default function Navbar() {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-sm bg-[#09090b]/80 border-b border-[#27272a]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* --- Brand --- */}
          <a href="#" className="flex flex-col leading-tight">
            <span className="text-lg font-bold text-text-light tracking-tight">
              Jesus Pupo
            </span>
            <span className="text-xs font-medium text-brand-accent tracking-widest uppercase">
              WannaDev
            </span>
          </a>

          {/* --- Desktop Navigation --- */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  className="px-3 py-2 text-sm font-medium text-text-muted
                    hover:text-text-light transition-colors rounded-lg
                    hover:bg-surface-border/50"
                >
                  {t(`nav.${link.key}`)}
                </a>
              ))}
              <LanguageToggle />
            </div>

            <a
              href="/docs/CV_Jesus_Pupo_Software_Developer.pdf"
              download
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium
                bg-brand-accent text-[#09090b] rounded-lg
                hover:bg-brand-accent/90 transition-colors"
            >
              <Download size={16} />
              {t('nav.download_cv')}
            </a>
          </div>

          {/* --- Mobile Right Section --- */}
          <div className="md:hidden flex items-center gap-1">
            <LanguageToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-text-muted hover:text-text-light transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* --- Mobile Menu --- */}
      <div
        className={`md:hidden border-t border-[#27272a] overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 py-4 space-y-3 bg-[#09090b]/95">
          {NAV_LINKS.map((link) => (
            <a
              key={link.key}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-text-muted
                hover:text-text-light transition-colors rounded-lg
                hover:bg-surface-border/50"
            >
              {t(`nav.${link.key}`)}
            </a>
          ))}

          <div className="flex items-center gap-3 pt-2">
            <a
              href="/docs/CV_Jesus_Pupo_Software_Developer.pdf"
              download
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium
                bg-brand-accent text-[#09090b] rounded-lg
                hover:bg-brand-accent/90 transition-colors flex-1 justify-center"
            >
              <Download size={16} />
              {t('nav.download_cv')}
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
