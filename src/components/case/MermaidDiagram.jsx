/* ==========================================================================
   MERMAID DIAGRAM COMPONENT
   ========================================================================== */

import { useEffect, useRef, useState } from 'react'

const cleanChart = (chart) => chart.replace(/%%\{init:[\s\S]*?\}%%/g, '').trim()

export default function MermaidDiagram({ chart, onRendered, className }) {
  const [svg, setSvg] = useState('')
  const [error, setError] = useState(null)
  const renderId = useRef('mmd-' + Math.random().toString(36).slice(2))

  useEffect(() => {
    let cancelled = false

    async function render() {
      try {
        const mermaid = (await import('mermaid')).default
        mermaid.initialize({
          startOnLoad: false,
          theme: 'dark',
          themeVariables: {
            background: '#09090b',
            primaryColor: '#18181b',
            primaryBorderColor: '#27272a',
            primaryTextColor: '#f4f4f5',
            secondaryColor: '#18181b',
            secondaryBorderColor: '#27272a',
            tertiaryColor: '#18181b',
            lineColor: '#a1a1aa',
            arrowheadColor: '#a1a1aa',
            fontSize: '14px',
            fontFamily: 'Inter, system-ui, sans-serif',
            actorBkg: '#18181b',
            actorBorder: '#27272a',
            actorTextColor: '#f4f4f5',
            noteBkgColor: '#18181b',
            noteBorderColor: '#27272a',
            noteTextColor: '#a1a1aa',
            signalColor: '#f4f4f5',
            signalTextColor: '#f4f4f5',
            labelBoxBkgColor: '#18181b',
            labelBoxBorderColor: '#27272a',
            labelTextColor: '#f4f4f5',
          },
          flowchart: { htmlLabels: true, curve: 'basis', padding: 16, useMaxWidth: true },
          sequence: { mirrorActors: false, actorMargin: 40, messageMargin: 30, wrap: true, useMaxWidth: true },
        })

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
          Cargando diagrama…
        </div>
      )}
    </div>
  )
}
