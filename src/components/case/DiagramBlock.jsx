/* ==========================================================================
   DIAGRAM BLOCK (mermaid + ampliar + descargar PNG/SVG)
   ========================================================================== */

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Maximize2, FileImage, FileCode } from 'lucide-react'
import MermaidDiagram from './MermaidDiagram'
import Lightbox from './Lightbox'

const K = 'projects.case.lamagiadecantar.diagrams.actions'

const downloadBlob = (blob, name) => {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = name
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

export default function DiagramBlock({ chart, fileName, label }) {
  const { t } = useTranslation()
  const [svg, setSvg] = useState('')
  const [open, setOpen] = useState(false)

  const btn = (k) => t(`${K}.${k}`)

  const downloadSvg = () => {
    if (!svg) return
    downloadBlob(new Blob([svg], { type: 'image/svg+xml;charset=utf-8' }), `${fileName}.svg`)
  }

  const downloadPng = () => {
    if (!svg) return
    const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const img = new Image()
    img.onload = () => {
      const scale = 2
      const canvas = document.createElement('canvas')
      canvas.width = (img.naturalWidth || 1200) * scale
      canvas.height = (img.naturalHeight || 800) * scale
      const ctx = canvas.getContext('2d')
      ctx.fillStyle = '#09090b'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      canvas.toBlob((b) => {
        if (b) downloadBlob(b, `${fileName}.png`)
      }, 'image/png')
      URL.revokeObjectURL(url)
    }
    img.onerror = () => URL.revokeObjectURL(url)
    img.src = url
  }

  const actionBtnClass =
    'inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium text-text-muted border border-surface-border/70 rounded-sm hover:text-text-light hover:border-brand-accent/50 transition-colors'

  return (
    <div>
      <div className="relative bg-surface-card/10 border border-surface-border/50 rounded-sm p-4 md:p-8 overflow-hidden">
        <MermaidDiagram chart={chart} onRendered={setSvg} />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button onClick={() => setOpen(true)} className={actionBtnClass}>
          <Maximize2 size={14} /> {btn('zoom')}
        </button>
        <button onClick={downloadPng} className={actionBtnClass}>
          <FileImage size={14} /> {btn('png')}
        </button>
        <button onClick={downloadSvg} className={actionBtnClass}>
          <FileCode size={14} /> {btn('svg')}
        </button>
      </div>

      <Lightbox
        open={open}
        onClose={() => setOpen(false)}
        title={label}
        actions={
          <>
            <button onClick={downloadPng} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-text-light border border-surface-border rounded-sm hover:border-brand-accent/50 transition-colors">
              <FileImage size={14} /> {btn('png')}
            </button>
            <button onClick={downloadSvg} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-text-light border border-surface-border rounded-sm hover:border-brand-accent/50 transition-colors">
              <FileCode size={14} /> {btn('svg')}
            </button>
          </>
        }
      >
        <div className="bg-[#09090b] rounded-sm flex justify-center">
          {svg ? (
            <div className="mermaid-svg" dangerouslySetInnerHTML={{ __html: svg }} />
          ) : (
            <div className="py-16 text-xs font-mono text-text-muted/50">Cargando diagrama…</div>
          )}
        </div>
      </Lightbox>
    </div>
  )
}
