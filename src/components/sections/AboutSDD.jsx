import { useTranslation } from 'react-i18next'
import { Plus, FileCode, Cpu, GitBranch, CheckCircle2 } from 'lucide-react'

const SDD_STEPS = [
  {
    id: '01',
    icon: FileCode,
    titleKey: 'sdd.steps.spec.title',
    descKey: 'sdd.steps.spec.description',
  },
  {
    id: '02',
    icon: Cpu,
    titleKey: 'sdd.steps.ai.title',
    descKey: 'sdd.steps.ai.description',
  },
  {
    id: '03',
    icon: GitBranch,
    titleKey: 'sdd.steps.refine.title',
    descKey: 'sdd.steps.refine.description',
  },
  {
    id: '04',
    icon: CheckCircle2,
    titleKey: 'sdd.steps.deploy.title',
    descKey: 'sdd.steps.deploy.description',
  },
]

export default function AboutSDD() {
  const { t } = useTranslation()

  return (
    <section id="sdd" className="relative px-4 py-24 bg-[#09090b] overflow-hidden scroll-mt-16">
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-brand-accent/[0.02] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="relative mb-16">
          <Plus size={16} className="absolute -top-10 -left-6 text-surface-border/50 hidden lg:block" />

          <div className="flex items-center gap-3 mb-3">
            <span className="px-2 py-0.5 text-[10px] font-mono font-semibold text-brand-accent uppercase tracking-widest bg-brand-accent/10 border border-brand-accent/25 rounded-sm">
              {t('sdd.badge')}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text-light tracking-tight">
            {t('sdd.title')}
          </h2>

          <p className="text-text-muted mt-4 max-w-2xl text-lg font-light">
            {t('sdd.subtitle')}
          </p>

          <Plus size={16} className="absolute -bottom-10 -left-6 text-surface-border/50 hidden lg:block" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SDD_STEPS.map((step) => {
            const Icon = step.icon
            return (
              <div key={step.id} className="group relative">
                <Plus size={14} className="absolute -top-3 -left-3 text-surface-border/50 z-10 hidden md:block" />

                <div className="relative h-full bg-surface-card/20 border border-surface-border/50 rounded-sm p-6 flex flex-col justify-between transition-all duration-500 hover:border-surface-border hover:bg-surface-card/40">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-10 h-10 rounded-sm bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent">
                        <Icon size={20} />
                      </div>
                      <span className="text-xs font-mono text-text-muted/60">
                        {step.id}
                      </span>
                    </div>

                    <h3 className="text-lg font-sans font-bold text-text-light tracking-tight">
                      {t(step.titleKey)}
                    </h3>

                    <p className="text-text-muted font-light mt-2 text-sm">
                      {t(step.descKey)}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-surface-border/30 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest">
                      Workflow SDD
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-accent/50 group-hover:bg-brand-accent transition-colors" />
                  </div>
                </div>

                <Plus size={14} className="absolute -bottom-3 -right-3 text-surface-border/50 z-10 hidden md:block" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
