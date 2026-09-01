/* ==========================================================================
   IMPORTS & CONFIG
   ========================================================================== */

import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/common/Navbar'
import Hero from './components/sections/Hero'
import Projects from './components/sections/Projects'
import AboutSDD from './components/sections/AboutSDD'
import ContactForm from './components/sections/ContactForm'
import Footer from './components/common/Footer'
import ProjectCase from './pages/ProjectCase'

/* ==========================================================================
   SCROLL TO TOP (on route change)
   ========================================================================== */

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        el.scrollIntoView({ behavior: 'instant' })
        return
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])

  return null
}

/* ==========================================================================
   HOME PAGE (landing sections)
   ========================================================================== */

function HomePage() {
  return (
    <main>
      <Hero />
      <Projects />
      <AboutSDD />
      <ContactForm />
    </main>
  )
}

/* ==========================================================================
   APP COMPONENT
   ========================================================================== */

function App() {
  return (
    <div className="min-h-screen bg-surface-dark text-text-light">
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/lamagiadecantar" element={<ProjectCase />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
