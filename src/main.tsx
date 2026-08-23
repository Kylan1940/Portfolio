import { createRoot } from 'react-dom/client'
import { Divider, Label } from './components/SectionLabel.tsx'
import { Footer } from './components/Footer.tsx'
import { Hero } from './components/Hero.tsx'
import { About } from './components/About.tsx'
import { Skills } from './components/Skills.tsx'
import { Experience } from './components/Experience.tsx'
import { Projects } from './components/Projects.tsx'
import { Certificates } from './components/Certificates.tsx'
import { Contact } from './components/Contact.tsx'
import './index.css'
import './App.css'

createRoot(document.getElementById('root')!).render(
  <main>
    <Hero />
    <Divider />
    <About />
    <Label />
    <Skills />
    <Label />
    <Experience />
    <Label />
    <Projects />
    <Label />
    <Certificates />
    <Label />
    <Contact />
    <Divider />
    <Footer />
  </main>
)
