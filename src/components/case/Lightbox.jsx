/* ==========================================================================
   LIGHTBOX COMPONENT (modal genérico)
   ========================================================================== */

import { useEffect } from 'react'
import { X } from 'lucide-react'

export default function Lightbox({ open, onClose, title, actions, children }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title || 'Lightbox'}
    >
      <div
        className="relative max-w-7xl w-full max-h-[90vh] flex flex-col bg-[#09090b] border border-surface-border/70 rounded-sm overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 px-4 py-3 border-b border-surface-border/60">
          <span className="text-xs font-mono uppercase tracking-widest text-text-muted truncate">
            {title}
          </span>
          <div className="flex items-center gap-2 shrink-0">
            {actions}
            <button
              onClick={onClose}
              className="p-1.5 text-text-muted hover:text-text-light border border-surface-border rounded-sm hover:border-brand-accent/50 transition-colors"
              aria-label="Cerrar"
            >
              <X size={16} />
            </button>
          </div>
        </div>
        <div className="overflow-auto p-4 md:p-6">
          {children}
        </div>
      </div>
    </div>
  )
}
