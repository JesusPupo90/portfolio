/* ==========================================================================
   IMPORTS & CONFIG
   ========================================================================== */

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, ExternalLink, Plus, Check, Download } from 'lucide-react'
import { IoLogoGithub } from 'react-icons/io5'
import DiagramBlock from '../components/case/DiagramBlock'
import Lightbox from '../components/case/Lightbox'
import architectureChartEs from '../diagrams/paymentArchitecture.mmd?raw'
import architectureChartEn from '../diagrams/paymentArchitecture-en.mmd?raw'
import processChartEs from '../diagrams/paymentModule.mmd?raw'
import processChartEn from '../diagrams/paymentModule-en.mmd?raw'

const STACK_CHIPS = [
  'Next.js',
  'TypeScript',
  'PostgreSQL',
  'Supabase',
  'Mercado Pago',
  'Resend',
  'Vercel',
  'Tailwind CSS',
]

const GALLERY_IMAGES = [
  { src: '/projects/lamagiadecantar-home.webp', altKey: 'home' },
  { src: '/projects/lamagiadecantar-checkout.webp', altKey: 'checkout' },
  { src: '/projects/lamagiadecantar-voice.webp', altKey: 'voice' },
]

const K = 'projects.case.lamagiadecantar'

/* ==========================================================================
   UI PRIMITIVES
   ========================================================================== */

function SectionLabel({ children }) {
  return (
    <span className="inline-block px-2 py-0.5 text-[10px] font-mono font-semibold text-brand-highlight uppercase tracking-widest bg-brand-highlight/10 border border-brand-highlight/25 rounded-sm">
      {children}
    </span>
  )
}

function SectionHeading({ label, title }) {
  return (
    <div className="relative mb-10">
      <SectionLabel>{label}</SectionLabel>
      <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-extrabold text-text-light tracking-tight">
        {title}
      </h2>
      <Plus size={16} className="absolute -top-8 -right-2 text-surface-border/50 hidden lg:block" />
    </div>
  )
}

function Checklist({ items }) {
  return (
    <ul className="space-y-4">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="mt-0.5 shrink-0 w-5 h-5 rounded-sm bg-brand-highlight/15 border border-brand-highlight/30 flex items-center justify-center">
            <Check size={12} className="text-brand-highlight" />
          </span>
          <span className="text-text-muted font-light text-sm md:text-base leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  )
}

/* ==========================================================================
   PROJECT CASE PAGE
   ========================================================================== */

export default function ProjectCase() {
  const { t, i18n } = useTranslation()
  const c = (path) => t(`${K}.${path}`)
  const items = (path) => t(`${K}.${path}`, { returnObjects: true }) || []
  const [activeImage, setActiveImage] = useState(null)

  const isEn = i18n.language === 'en'
  const architectureChart = isEn ? architectureChartEn : architectureChartEs
  const processChart = isEn ? processChartEn : processChartEs
  const galleryItems = GALLERY_IMAGES.map((img) => ({
    ...img,
    alt: t(`projects.case.lamagiadecantar.gallery.${img.altKey}`),
  }))

  const downloadLabel = t('projects.case.lamagiadecantar.diagrams.actions.download', 'Descargar')

  return (
    <main className="relative overflow-hidden">
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-brand-highlight/[0.04] rounded-full blur-[140px] pointer-events-none" />

      {/* ================= HERO ================= */}
      <section className="relative px-4 pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="max-w-5xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-text-muted hover:text-text-light transition-colors"
          >
            <ArrowLeft size={14} /> {c('back')}
          </Link>

          <div className="mt-8">
            <SectionLabel>{c('badge')}</SectionLabel>
            <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-extrabold text-text-light tracking-tight">
              {c('title')}
            </h1>
            <p className="mt-5 max-w-3xl text-text-muted font-light text-lg md:text-xl leading-relaxed">
              {c('subtitle')}
            </p>

            <div className="mt-8 flex flex-wrap gap-3 text-xs font-mono">
              <span className="px-3 py-1.5 rounded-sm bg-surface-card/40 border border-surface-border/60 text-text-muted">
                {c('client')}
              </span>
              <span className="px-3 py-1.5 rounded-sm bg-surface-card/40 border border-surface-border/60 text-text-muted">
                {c('role')}
              </span>
              <span className="px-3 py-1.5 rounded-sm bg-surface-card/40 border border-surface-border/60 text-text-muted">
                {c('year')}
              </span>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
              <a
                href="https://lamagiadecantar.co"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-brand-highlight text-[#09090b] rounded-lg hover:bg-brand-highlight/90 transition-colors"
              >
                <ExternalLink size={16} /> {c('cta_demo')}
              </a>
              <a
                href="https://github.com/JesusPupo90/la-magia-de-cantar"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-text-light border border-surface-border rounded-lg hover:border-brand-highlight/50 transition-colors"
              >
                <IoLogoGithub size={16} /> {c('cta_code')}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= OVERVIEW ================= */}
      <section className="relative px-4 py-16 border-t border-surface-border/40">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10">
          <SectionHeading label={c('overview.label')} title={c('overview.title')} />
          <div className="space-y-5">
            <p className="text-text-muted font-light leading-relaxed">{c('overview.p1')}</p>
            <p className="text-text-muted font-light leading-relaxed">{c('overview.p2')}</p>
          </div>
        </div>
      </section>

      {/* ================= PROBLEM / SOLUTION ================= */}
      <section className="relative px-4 py-16 border-t border-surface-border/40">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="relative bg-surface-card/20 border border-surface-border/50 rounded-sm p-6 md:p-8">
            <Plus size={14} className="absolute -top-3 -left-3 text-surface-border/50" />
            <SectionLabel>{c('problem.label')}</SectionLabel>
            <h3 className="mt-4 text-xl md:text-2xl font-bold text-text-light tracking-tight">
              {c('problem.title')}
            </h3>
            <div className="mt-5">
              <Checklist items={items('problem.items')} />
            </div>
          </div>
          <div className="relative bg-surface-card/20 border border-surface-border/50 rounded-sm p-6 md:p-8">
            <Plus size={14} className="absolute -top-3 -left-3 text-surface-border/50" />
            <SectionLabel>{c('solution.label')}</SectionLabel>
            <h3 className="mt-4 text-xl md:text-2xl font-bold text-text-light tracking-tight">
              {c('solution.title')}
            </h3>
            <div className="mt-5">
              <Checklist items={items('solution.items')} />
            </div>
          </div>
        </div>
      </section>

      {/* ================= GALLERY ================= */}
      <section className="relative px-4 py-16 border-t border-surface-border/40">
        <div className="max-w-5xl mx-auto">
          <SectionHeading label={c('gallery.label')} title={c('gallery.title')} />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {galleryItems.map((img) => (
              <div
                key={img.src}
                className="group relative aspect-[16/11] bg-surface-dark border border-surface-border/50 rounded-sm overflow-hidden cursor-zoom-in"
                onClick={() => setActiveImage(img)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full h-full object-cover object-left-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent opacity-50" />
                <span className="absolute bottom-3 left-3 text-[10px] font-mono uppercase tracking-widest text-text-light/80">
                  {img.alt}
                </span>
                <a
                  href={img.src}
                  download
                  onClick={(e) => e.stopPropagation()}
                  aria-label={downloadLabel}
                  className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-sm bg-black/50 border border-surface-border/70 text-text-light/80 opacity-0 group-hover:opacity-100 hover:text-brand-highlight hover:border-brand-highlight/50 transition-all"
                >
                  <Download size={15} />
                </a>
              </div>
            ))}
          </div>

          <Lightbox
            open={!!activeImage}
            onClose={() => setActiveImage(null)}
            title={activeImage?.alt}
            actions={
              activeImage && (
                <a
                  href={activeImage.src}
                  download
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-text-light border border-surface-border rounded-sm hover:border-brand-accent/50 transition-colors"
                >
                  <Download size={14} /> {downloadLabel}
                </a>
              )
            }
          >
            {activeImage && (
              <img
                src={activeImage.src}
                alt={activeImage.alt}
                className="w-full h-auto rounded-sm"
              />
            )}
          </Lightbox>
        </div>
      </section>

      {/* ================= STACK ================= */}
      <section className="relative px-4 py-16 border-t border-surface-border/40">
        <div className="max-w-5xl mx-auto">
          <SectionHeading label={c('stack.label')} title={c('stack.title')} />
          <p className="text-text-muted font-light mb-6">{c('stack.subtitle')}</p>
          <div className="flex flex-wrap gap-2">
            {STACK_CHIPS.map((chip) => (
              <span
                key={chip}
                className="px-3 py-1.5 text-[11px] font-mono text-text-muted uppercase tracking-widest bg-surface-card/50 border border-surface-border/60 rounded-sm"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ARCHITECTURE DIAGRAM ================= */}
      <section className="relative px-4 py-16 border-t border-surface-border/40">
        <div className="max-w-6xl mx-auto">
          <SectionHeading label={c('diagrams.architecture.label')} title={c('diagrams.architecture.title')} />
          <p className="text-text-muted font-light mb-8 max-w-3xl">{c('diagrams.architecture.intro')}</p>
          <DiagramBlock
            chart={architectureChart}
            fileName="paymentArchitecture"
            label={c('diagrams.architecture.title')}
          />
          <div className="mt-8">
            <SectionLabel>{c('diagrams.architecture.takeaways_label')}</SectionLabel>
            <div className="mt-5">
              <Checklist items={items('diagrams.architecture.takeaways')} />
            </div>
          </div>
        </div>
      </section>

      {/* ================= PROCESS DIAGRAM ================= */}
      <section className="relative px-4 py-16 border-t border-surface-border/40">
        <div className="max-w-6xl mx-auto">
          <SectionHeading label={c('diagrams.process.label')} title={c('diagrams.process.title')} />
          <p className="text-text-muted font-light mb-8 max-w-3xl">{c('diagrams.process.intro')}</p>
          <DiagramBlock
            chart={processChart}
            fileName="paymentModule"
            label={c('diagrams.process.title')}
          />
          <div className="mt-8">
            <SectionLabel>{c('diagrams.process.takeaways_label')}</SectionLabel>
            <div className="mt-5">
              <Checklist items={items('diagrams.process.takeaways')} />
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="relative px-4 py-16 border-t border-surface-border/40">
        <div className="max-w-5xl mx-auto">
          <SectionHeading label={c('features.label')} title={c('features.title')} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items('features.items').map((feature, i) => (
              <div
                key={i}
                className="relative bg-surface-card/20 border border-surface-border/50 rounded-sm p-6 hover:border-brand-highlight/40 transition-colors duration-300"
              >
                <Plus size={14} className="absolute -top-3 -left-3 text-surface-border/50" />
                <h3 className="text-sm font-mono font-semibold uppercase tracking-wider text-text-light">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm text-text-muted font-light leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= VALUE ================= */}
      <section className="relative px-4 py-16 border-t border-surface-border/40">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10">
          <SectionHeading label={c('value.label')} title={c('value.title')} />
          <Checklist items={items('value.items')} />
        </div>
      </section>

      {/* ================= FOOTER NOTE + CTA ================= */}
      <section className="relative px-4 py-20 border-t border-surface-border/40">
        <div className="max-w-5xl mx-auto text-center">
          <Plus size={16} className="absolute top-8 left-1/2 -translate-x-1/2 text-surface-border/50" />
          <p className="max-w-2xl mx-auto text-xs font-mono text-text-muted/70 leading-relaxed">
            {c('footer_note')}
          </p>
          <div className="mt-10 flex flex-wrap justify-center items-center gap-4">
            <a
              href="https://lamagiadecantar.co"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold bg-brand-highlight text-[#09090b] rounded-lg hover:bg-brand-highlight/90 transition-colors"
            >
              {c('cta_demo')} <ArrowUpRight size={16} />
            </a>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-text-light border border-surface-border rounded-lg hover:border-brand-highlight/50 transition-colors"
            >
              <ArrowLeft size={16} /> {c('back')}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
