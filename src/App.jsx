import Navbar from './components/common/Navbar'
import Hero from './components/sections/Hero'
import Projects from './components/sections/Projects'

function App() {
  return (
    <div className="min-h-screen bg-surface-dark text-text-light">
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <section id="workflow" className="h-screen flex items-center justify-center border-t border-surface-border">
          <p className="text-text-muted text-lg">SDD Workflow Section</p>
        </section>
        <section id="contact" className="h-screen flex items-center justify-center border-t border-surface-border">
          <p className="text-text-muted text-lg">Contact Section</p>
        </section>
      </main>
    </div>
  )
}

export default App
