/* ==========================================================================
   IMPORTS & CONFIG
   ========================================================================== */

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Send, CheckCircle, AlertCircle, Plus } from 'lucide-react'
import { IoLogoWhatsapp } from 'react-icons/io5'
import { sendContactEmail } from '../../services/emailService'

/* ==========================================================================
   CONTACT FORM COMPONENT
   ========================================================================== */

export default function ContactForm() {
  const { t } = useTranslation()

  /* ==========================================================================
     STATE
     ========================================================================== */

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    honeypot: '',
  })

  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState({ submitting: false, success: false, error: false })

  const whatsappNumber = '573012629385'
  const whatsappMessage = encodeURIComponent('Hola, vi tu portafolio y quisiera hablar contigo.')
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

  /* ==========================================================================
     HANDLERS & LOGIC
     ========================================================================== */

  const validate = () => {
    let newErrors = {}
    if (!formData.name.trim()) {
      newErrors.name = t('contact.errors.name_required', 'El nombre es obligatorio.')
    }
    if (!formData.email.trim()) {
      newErrors.email = t('contact.errors.email_required', 'El correo es obligatorio.')
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('contact.errors.email_invalid', 'El formato del correo no es válido.')
    }
    if (!formData.message.trim()) {
      newErrors.message = t('contact.errors.message_required', 'El mensaje es obligatorio.')
    } else if (formData.message.trim().length < 10) {
      newErrors.message = t('contact.errors.message_min', 'El mensaje debe tener al menos 10 caracteres.')
    }
    return newErrors
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate()

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setErrors({})
    setStatus({ submitting: true, success: false, error: false })

    try {
      await sendContactEmail(formData)
      setStatus({ submitting: false, success: true, error: false })
      setFormData({ name: '', email: '', message: '', honeypot: '' })
    } catch (err) {
      setStatus({ submitting: false, success: false, error: true })
    }
  }

  /* ==========================================================================
     RENDER / JSX
     ========================================================================== */

  return (
    <section id="contact" className="relative px-4 py-24 bg-[#09090b] overflow-hidden scroll-mt-16">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-accent/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* --- Section Header --- */}
        <div className="relative mb-12">
          <Plus size={16} className="absolute -top-10 -left-6 text-surface-border/50 hidden lg:block" />

          <div className="flex items-center gap-3 mb-3">
            <span className="px-2 py-0.5 text-[10px] font-mono font-semibold text-brand-accent uppercase tracking-widest bg-brand-accent/10 border border-brand-accent/25 rounded-sm">
              {t('contact.badge', 'Contacto')}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text-light tracking-tight">
            {t('contact.title', 'Trabajemos Juntos')}
          </h2>

          <p className="text-text-muted mt-3 max-w-xl text-base sm:text-lg font-light">
            {t('contact.subtitle', '¿Tienes un proyecto en mente o buscas contratar a un desarrollador? Envíame un mensaje.')}
          </p>

          <Plus size={16} className="absolute -bottom-10 -left-6 text-surface-border/50 hidden lg:block" />
        </div>

        {/* --- Main Layout --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

          {/* --- Form (2 columns) --- */}
          <div className="lg:col-span-2 group relative">
            <Plus size={14} className="absolute -top-3 -left-3 text-surface-border/50 z-10 hidden md:block" />

            <div className="relative bg-surface-card/20 border border-surface-border/50 rounded-sm p-6 sm:p-8 transition-all duration-500 hover:border-surface-border">

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>

                {/* --- Honeypot (hidden anti-spam field) --- */}
                <div aria-hidden="true" className="absolute -left-[9999px] opacity-0 pointer-events-none" tabIndex={-1}>
                  <label htmlFor="contact-honeypot">Do not fill this field</label>
                  <input
                    id="contact-honeypot"
                    name="honeypot"
                    type="text"
                    value={formData.honeypot}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-text-muted mb-2">
                    {t('contact.form.name', 'Tu Nombre')}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Juan Pérez"
                    className={`w-full bg-surface-card/40 border rounded-sm px-4 py-3 text-text-light text-base focus:outline-none transition-colors ${
                      errors.name ? 'border-red-500/50' : 'border-surface-border/50 focus:border-brand-accent'
                    }`}
                  />
                  {errors.name && (
                    <span className="flex items-center gap-1 text-xs text-red-400 mt-1.5 font-mono">
                      <AlertCircle size={12} /> {errors.name}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-text-muted mb-2">
                    {t('contact.form.email', 'Tu Correo')}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="juan@ejemplo.com"
                    className={`w-full bg-surface-card/40 border rounded-sm px-4 py-3 text-text-light text-base focus:outline-none transition-colors ${
                      errors.email ? 'border-red-500/50' : 'border-surface-border/50 focus:border-brand-accent'
                    }`}
                  />
                  {errors.email && (
                    <span className="flex items-center gap-1 text-xs text-red-400 mt-1.5 font-mono">
                      <AlertCircle size={12} /> {errors.email}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-text-muted mb-2">
                    {t('contact.form.message', 'Mensaje')}
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Cuéntame sobre tu proyecto..."
                    className={`w-full bg-surface-card/40 border rounded-sm px-4 py-3 text-text-light text-base focus:outline-none transition-colors resize-none ${
                      errors.message ? 'border-red-500/50' : 'border-surface-border/50 focus:border-brand-accent'
                    }`}
                  />
                  {errors.message && (
                    <span className="flex items-center gap-1 text-xs text-red-400 mt-1.5 font-mono">
                      <AlertCircle size={12} /> {errors.message}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status.submitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-accent text-[#09090b] font-mono text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-opacity rounded-sm disabled:opacity-50 cursor-pointer mt-2"
                >
                  {status.submitting ? (
                    t('contact.form.submitting', 'Enviando...')
                  ) : (
                    <>
                      <Send size={14} /> {t('contact.form.submit', 'Enviar Mensaje')}
                    </>
                  )}
                </button>

                {status.success && (
                  <div className="flex items-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-sm text-emerald-400 text-xs font-mono mt-2">
                    <CheckCircle size={16} />
                    {t('contact.form.success', '¡Mensaje enviado con éxito! Te responderé pronto.')}
                  </div>
                )}

                {status.error && (
                  <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-sm text-red-400 text-xs font-mono mt-2">
                    <AlertCircle size={16} />
                    {t('contact.form.error', 'Hubo un error al enviar el mensaje. Inténtalo de nuevo.')}
                  </div>
                )}

              </form>

            </div>
            <Plus size={14} className="absolute -bottom-3 -right-3 text-surface-border/50 z-10 hidden md:block" />
          </div>

          {/* --- WhatsApp Card (1 column) --- */}
          <div className="lg:col-span-1 group relative">
            <Plus size={14} className="absolute -top-3 -left-3 text-surface-border/50 z-10 hidden md:block" />

            <div className="relative h-full bg-surface-card/20 border border-surface-border/50 rounded-sm p-6 flex flex-col justify-between transition-all duration-500 hover:border-surface-border">
              <div>
                <div className="w-10 h-10 rounded-sm bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent mb-6">
                  <IoLogoWhatsapp size={20} />
                </div>

                <h3 className="text-xl font-sans font-bold text-text-light tracking-tight">
                  {t('contact.direct.title', '¿Prefieres mensajería instantánea?')}
                </h3>

                <p className="text-text-muted text-sm font-light mt-3">
                  {t('contact.direct.desc', 'Contáctame directamente por WhatsApp para una respuesta más rápida.')}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-surface-border/30">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-surface-card/40 border border-surface-border/60 hover:border-brand-accent/50 text-text-light hover:text-brand-accent text-xs font-mono font-medium rounded-sm transition-colors"
                >
                  <IoLogoWhatsapp size={14} />
                  {t('contact.whatsapp_button', 'Chatear en WhatsApp')}
                </a>
              </div>

            </div>
            <Plus size={14} className="absolute -bottom-3 -right-3 text-surface-border/50 z-10 hidden md:block" />
          </div>

        </div>

      </div>
    </section>
  )
}
