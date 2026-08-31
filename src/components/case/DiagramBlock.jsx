/* ==========================================================================
   DIAGRAM BLOCK (mermaid + ampliar + descargar PNG/SVG)
   ========================================================================== */

import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Maximize2, FileImage, FileCode } from 'lucide-react'
import MermaidDiagram from './MermaidDiagram'
import Lightbox from './Lightbox'
import { buildMermaidConfig, sanitizeChartForExport } from './mermaidConfig'

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

const toExportableSvg = (svgStr) => {
  const openIdx = svgStr.indexOf('<svg')
  const closeIdx = svgStr.indexOf('>', openIdx)
  if (openIdx === -1 || closeIdx === -1) return svgStr

  const openTag = svgStr.slice(openIdx, closeIdx + 1)
  const rest = svgStr.slice(closeIdx + 1)
  const vb = openTag.match(/viewBox="([^"]+)"/)

  let tag = openTag.replace(/style="[^"]*"/, '')

  if (vb) {
    const parts = vb[1].trim().split(/\s+/).map(Number)
    if (parts.length === 4 && parts[2] > 0 && parts[3] > 0) {
      tag = tag
        .replace(/width="[^"]*"/, `width="${parts[2]}"`)
        .replace(/height="[^"]*"/, `height="${parts[3]}"`)
      if (!/height="/.test(tag)) tag = tag.replace(/^<svg/, `<svg height="${parts[3]}"`)
    }
  }

  return tag + rest
}

export default function DiagramBlock({ chart, fileName, label }) {
  const { t } = useTranslation()
  const [svg, setSvg] = useState('')
  const [open, setOpen] = useState(false)
  const exportSvgRef = useRef(null)
  const exportPromiseRef = useRef(null)

  const btn = (k) => t(`${K}.${k}`)

  /* Re-render the chart with htmlLabels:false so the exported SVG is plain,
     valid XML (no embedded HTML/foreignObject) — required for crisp PNG export. */
  const getExportSvg = () => {
    if (exportSvgRef.current) return Promise.resolve(exportSvgRef.current)
    if (!exportPromiseRef.current) {
      exportPromiseRef.current = (async () => {
        const mermaid = (await import('mermaid')).default
        mermaid.initialize(buildMermaidConfig(false))
        const renderId = 'mmd-exp-' + Math.random().toString(36).slice(2)
        const { svg: renderedSvg } = await mermaid.render(renderId, sanitizeChartForExport(chart))
        exportSvgRef.current = toExportableSvg(renderedSvg)
        return exportSvgRef.current
      })()
    }
    return exportPromiseRef.current
  }

  const downloadSvg = async () => {
    const exportSvg = await getExportSvg()
    downloadBlob(new Blob([exportSvg], { type: 'image/svg+xml;charset=utf-8' }), `${fileName}.svg`)
  }

  const downloadPng = async () => {
    const exportSvg = await getExportSvg()
    const blob = new Blob([exportSvg], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const img = new Image()
    img.onload = () => {
      const vb = exportSvg.match(/viewBox="[^"]* ([\d.]+) ([\d.]+)"/)
      const width = vb ? parseFloat(vb[1]) : img.naturalWidth || 1200
      const height = vb ? parseFloat(vb[2]) : img.naturalHeight || 800
      const scale = Math.min(2, 6000 / width)
      const canvas = document.createElement('canvas')
      canvas.width = Math.round(width * scale)
      canvas.height = Math.round(height * scale)
      const ctx = canvas.getContext('2d')
      ctx.fillStyle = '#09090b'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'
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
