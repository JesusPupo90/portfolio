import Navbar from './components/common/Navbar'
import Hero from './components/sections/Hero'
import Projects from './components/sections/Projects'
import AboutSDD from './components/sections/AboutSDD'
import ContactForm from './components/sections/ContactForm'
import Footer from './components/common/Footer'

function App() {
  return (
    <div className="min-h-screen bg-surface-dark text-text-light">
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <AboutSDD />
        <ContactForm />
      </main>
      <Footer />
    </div>
  )
}

export default App
