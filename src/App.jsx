import Navbar from './components/common/Navbar'
import Hero from './components/sections/Hero'
import Projects from './components/sections/Projects'
import AboutSDD from './components/sections/AboutSDD'

function App() {
  return (
    <div className="min-h-screen bg-surface-dark text-text-light">
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <AboutSDD />
        <section id="contact" className="h-screen flex items-center justify-center border-t border-surface-border">
          <p className="text-text-muted text-lg">Contact Section</p>
        </section>
      </main>
    </div>
  )
}

export default App
