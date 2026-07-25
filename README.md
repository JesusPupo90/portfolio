# ⚡ Personal Portfolio & Contact System

Modern, minimalist, and high-performance personal portfolio built with React and Vite, featuring a secure serverless contact system integrated with the Resend API and built-in analytics.

---

## 🚀 Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Lucide Icons, React Router.
- **Internationalization (i18n):** Multi-language support (English / Spanish).
- **Backend / Serverless:** Vercel Serverless Functions (`api/send.js`).
- **Email Delivery Service:** Resend API (with domain authentication via SPF/DKIM).
- **Analytics:** Vercel Analytics.

---

## ✨ Key Features

- **Secure Contact Form:** Fully validated form with real-time feedback and state management.
- **Anti-Spam Honeypot:** Integrated hidden field mechanism to intercept and silently discard automated bot submissions.
- **Serverless Backend:** Secure email dispatch handling using Vercel Serverless Functions, keeping private API keys hidden from the client side.
- **Responsive & Accessible Design:** Clean, modern UI inspired by developer-first design systems.
- **Direct Messaging Alternative:** Quick redirection link for direct communication via WhatsApp.

---

## 📂 Project Structure

```text
├── api/
│   └── send.js               # Vercel serverless function for Resend email dispatch
├── src/
│   ├── components/           # UI sections (ContactForm, Hero, Projects, etc.)
│   ├── services/
│   │   └── emailService.js   # Frontend client wrapper for the /api/send endpoint
│   ├── App.jsx               # Root application component
│   └── main.jsx              # Entry point (includes Vercel Analytics integration)
├── .env.local                # Local environment variables (git-ignored)
├── package.json              # Dependencies and project metadata
└── README.md