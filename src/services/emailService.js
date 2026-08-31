/* ==========================================================================
   emailService — Frontend API client for /api/send
   ========================================================================== */

export async function sendContactEmail(formData) {
  const payload = {
    name: formData.name,
    email: formData.email,
    message: formData.message,
    honeypot: formData.honeypot || '',
    consent: !!formData.consent,
  }

  try {
    const response = await fetch('/api/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('[EmailService] Request failed:', response.status, data.error)
      throw new Error(data.error || 'Failed to send message')
    }

    console.log('[EmailService] Message sent successfully')
    return data
  } catch (err) {
    if (err instanceof TypeError && err.message === 'Failed to fetch') {
      console.error('[EmailService] Network error — server may be unreachable')
      throw new Error('Network error. Please check your connection and try again.')
    }

    console.error('[EmailService] Error:', err.message)
    throw err
  }
}
