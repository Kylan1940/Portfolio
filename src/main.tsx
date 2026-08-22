import { createRoot } from 'react-dom/client'
import { Divider } from './components/Divider.tsx'
import { Footer } from './components/Footer.tsx'
import { Hero } from './components/Hero.tsx'
import { About } from './components/About.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <main>
    <Hero />
    <Divider />
    <About />
    <Divider />
    <Footer />
  </main>
)
