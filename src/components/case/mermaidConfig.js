/* ==========================================================================
   MERMAID SHARED CONFIG
   ========================================================================== */

export const MERMAID_THEME = {
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
}

export const buildMermaidConfig = (htmlLabels) => ({
  startOnLoad: false,
  theme: 'dark',
  htmlLabels,
  themeVariables: MERMAID_THEME,
  flowchart: { htmlLabels, curve: 'basis', padding: 16, useMaxWidth: true },
  sequence: { mirrorActors: false, actorMargin: 40, messageMargin: 30, wrap: true, useMaxWidth: true },
})

export const cleanChart = (chart) => chart.replace(/%%\{init:[\s\S]*?\}%%/g, '').trim()

export const sanitizeChartForExport = (chart) =>
  cleanChart(chart)
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/?i>/gi, '')
