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
import './section.css'
// import { Header } from './components/Header.tsx'

createRoot(document.getElementById('root')!).render(
  <main>
    {/* <Header /> */}
    <Hero />
    <Divider />
    <About />
    <Label />
    <Experience />
    <Label />
    <Skills />
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
