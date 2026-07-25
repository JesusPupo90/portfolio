/* ==========================================================================
   POST /api/send — Vercel Serverless Function
   Sends contact form submissions via Resend API.
   Includes honeypot anti-spam, field validation, and error handling.
   ========================================================================== */

import { Resend } from 'resend'

/* ==========================================================================
   CONFIG
   ========================================================================== */

const RESEND_API_KEY = process.env.RESEND_API_KEY

const EMAIL_DOMAIN = 'jesuspupo.dev'
const EMAIL_TO = ['hello@jesuspupo.dev']
const EMAIL_SUBJECT_PREFIX = 'Portfolio Contact'

/* ==========================================================================
   HELPERS
   ========================================================================== */

function buildEmailHtml({ name, email, message }) {
  const date = new Date().toLocaleString('en-US', {
    dateStyle: 'long',
    timeStyle: 'short',
  })

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          body { margin: 0; padding: 0; background-color: #09090b; font-family: 'Inter', system-ui, sans-serif; }
          .wrapper { max-width: 600px; margin: 0 auto; padding: 32px 24px; }
          .card { background: #18181b; border: 1px solid #27272a; border-radius: 4px; padding: 32px; }
          .badge { display: inline-block; padding: 4px 10px; background: rgba(163,230,53,0.1); border: 1px solid rgba(163,230,53,0.25); border-radius: 2px; font-size: 10px; font-weight: 600; color: #a3e635; text-transform: uppercase; letter-spacing: 0.1em; font-family: 'SF Mono', 'Fira Code', monospace; }
          h1 { font-size: 24px; font-weight: 800; color: #f4f4f5; margin: 20px 0 8px; letter-spacing: -0.02em; }
          .meta { font-size: 12px; color: #a1a1aa; font-family: 'SF Mono', 'Fira Code', monospace; margin-bottom: 24px; }
          .label { font-size: 10px; font-weight: 600; color: #a1a1aa; text-transform: uppercase; letter-spacing: 0.1em; font-family: 'SF Mono', 'Fira Code', monospace; margin-bottom: 4px; }
          .value { font-size: 15px; color: #f4f4f5; margin-bottom: 20px; padding: 12px; background: #09090b; border: 1px solid #27272a; border-radius: 2px; }
          .divider { height: 1px; background: #27272a; margin: 24px 0; }
          .footer { font-size: 11px; color: #52525b; text-align: center; margin-top: 24px; font-family: 'SF Mono', 'Fira Code', monospace; }
        </style>
      </head>
      <body>
        <div class="wrapper">
          <div class="card">
            <span class="badge">New Contact Message</span>
            <h1>${escapeHtml(name)}</h1>
            <div class="meta">${date} &middot; ${escapeHtml(email)}</div>
            <div class="divider"></div>
            <div class="label">Message</div>
            <div class="value">${escapeHtml(message).replace(/\n/g, '<br>')}</div>
            <div class="divider"></div>
            <div class="footer">Sent from jesuspupo.dev &middot; Portfolio Contact Form</div>
          </div>
        </div>
      </body>
    </html>
  `
}

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

/* ==========================================================================
   HANDLER
   ========================================================================== */

export default async function handler(req, res) {
  /* --- Method Check --- */
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, message, honeypot } = req.body || {}

  /* --- Honeypot Anti-Spam --- */
  if (honeypot) {
    console.log('[Honeypot] Bot submission detected and silently discarded')
    return res.status(200).json({ success: true })
  }

  /* --- Field Validation --- */
  const errors = []
  if (!name?.trim()) errors.push('Name is required')
  if (!email?.trim()) errors.push('Email is required')
  if (!message?.trim()) errors.push('Message is required')

  if (errors.length > 0) {
    return res.status(400).json({ error: errors.join(', ') })
  }

  /* --- Resend API Key Check --- */
  if (!RESEND_API_KEY) {
    console.error('[Email] Missing RESEND_API_KEY environment variable')
    return res.status(500).json({ error: 'Server configuration error' })
  }

  /* --- Send Email via Resend --- */
  try {
    const resend = new Resend(RESEND_API_KEY)

    const { data, error } = await resend.emails.send({
      from: `${name} <hello@${EMAIL_DOMAIN}>`,
      to: EMAIL_TO,
      subject: `${EMAIL_SUBJECT_PREFIX} — ${name}`,
      html: buildEmailHtml({ name, email, message }),
      replyTo: email,
    })

    if (error) {
      console.error('[Resend] API error:', error)
      return res.status(500).json({ error: 'Failed to send message' })
    }

    console.log('[Email] Message sent successfully to', EMAIL_TO[0], '— ID:', data?.id)
    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('[Email] Unexpected error:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}