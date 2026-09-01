/* ==========================================================================
   MERMAID DIAGRAM COMPONENT
   ========================================================================== */

import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { buildMermaidConfig, cleanChart } from './mermaidConfig'

export default function MermaidDiagram({ chart, onRendered, className }) {
  const { t } = useTranslation()
  const [svg, setSvg] = useState('')
  const [error, setError] = useState(null)
  const renderId = useRef('mmd-' + Math.random().toString(36).slice(2))

  useEffect(() => {
    let cancelled = false

    async function render() {
      try {
        const mermaid = (await import('mermaid')).default
        mermaid.initialize(buildMermaidConfig(true))

        const { svg: renderedSvg } = await mermaid.render(renderId.current, cleanChart(chart))
        if (!cancelled) {
          setSvg(renderedSvg)
          onRendered?.(renderedSvg)
        }
      } catch (e) {
        if (!cancelled) {
          setError(e?.message || String(e))
          onRendered?.('')
        }
      }
    }

    render()
    return () => {
      cancelled = true
    }
  }, [chart, onRendered])

  if (error) {
    return (
      <div className="p-4 text-xs font-mono text-red-400/80 bg-red-400/5 border border-red-400/20 rounded-sm">
        {error}
      </div>
    )
  }

  return (
    <div className={`overflow-x-auto ${className || ''}`}>
      {svg ? (
        <div
          className="mermaid-svg w-full flex justify-center"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      ) : (
        <div className="py-16 text-center text-xs font-mono text-text-muted/50 animate-pulse">
          {t('projects.case.lamagiadecantar.diagrams.actions.loading', 'Cargando diagrama…')}
        </div>
      )}
    </div>
  )
}
