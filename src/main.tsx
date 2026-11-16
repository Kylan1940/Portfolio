import { createRoot } from 'react-dom/client'
import { Footer } from './components/Footer.tsx'
import { Hero } from './components/Hero.tsx'
import { About } from './components/About.tsx'
import { Skills } from './components/Skills.tsx'
import { Experience } from './components/Experience.tsx'
import { Projects } from './components/Projects.tsx'
import { Certificates } from './components/Certificates.tsx'
import { Contact } from './components/Contact.tsx'
import { Header } from './components/Header.tsx'
import '@fontsource-variable/fraunces'
import '@fontsource-variable/hanken-grotesk'
import './index.css'
import './section.css'

createRoot(document.getElementById('root')!).render(
  <>
    <a className="skip-link" href="#about">Skip to content</a>
    <Header />
    <main>
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Certificates />
      <Contact />
    </main>
    <Footer />
  </>
)
