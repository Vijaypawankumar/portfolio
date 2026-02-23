import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav/Nav'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Projects from './components/Projects/Projects'
import Experience from './components/Experience/Experience'
import Education from './components/Education/Education'
import Certification from './components/Certification/Certification'
import Contact from './components/Contact/Contact'
import Ribbon from './components/Ribbon/Ribbon'

import AboutPage from './pages/AboutPage'
import ProjectsPage from './pages/ProjectsPage'
import ExperiencePage from './pages/ExperiencePage'
import EducationPage from './pages/EducationPage'
import CertificationPage from './pages/CertificationPage'
import CertificationDetailPage from './pages/CertificationDetailPage'
import ProjectDetailPage from './pages/ProjectDetailPage'
import ContactPage from './pages/ContactPage'

function Footer() {
  return (
    <footer>
      <Ribbon />
      <div style={{
        background: '#111',
        color: 'rgba(255,255,255,0.25)',
        textAlign: 'center',
        padding: '20px',
        fontFamily: 'var(--font-mono)',
        fontSize: '11px',
        letterSpacing: '0.1em',
      }}>
        © {new Date().getFullYear()} Vijay Pavan — All rights reserved
      </div>
    </footer>
  )
}

function SimpleFooter() {
  return (
    <div style={{
      background: '#111',
      color: 'rgba(255,255,255,0.25)',
      textAlign: 'center',
      padding: '20px',
      fontFamily: 'var(--font-mono)',
      fontSize: '11px',
      letterSpacing: '0.1em',
    }}>
      © {new Date().getFullYear()} Vijay Pavan — All rights reserved
    </div>
  )
}

function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Education />
      <Certification />
      <Contact />
      <Footer />
    </>
  )
}

function PageWrapper({ children }) {
  return (
    <>
      {children}
      <SimpleFooter />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<PageWrapper><AboutPage /></PageWrapper>} />
          <Route path="/projects" element={<PageWrapper><ProjectsPage /></PageWrapper>} />
          <Route path="/projects/:slug" element={<PageWrapper><ProjectDetailPage /></PageWrapper>} />
          <Route path="/experience" element={<PageWrapper><ExperiencePage /></PageWrapper>} />
          <Route path="/education" element={<PageWrapper><EducationPage /></PageWrapper>} />
          <Route path="/certification" element={<PageWrapper><CertificationPage /></PageWrapper>} />
          <Route path="/certification/:slug" element={<PageWrapper><CertificationDetailPage /></PageWrapper>} />
          <Route path="/contact" element={<PageWrapper><ContactPage /></PageWrapper>} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}