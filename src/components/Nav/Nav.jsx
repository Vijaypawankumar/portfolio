import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import './Nav.css'
import SignatureDraw from '../SignatureDraw'

const sections = ['home', 'about', 'projects', 'experience', 'education', 'certification', 'contact']

const sectionRoutes = {
  home: '/',
  about: '/about',
  projects: '/projects',
  experience: '/experience',
  education: '/education',
  certification: '/certification',
  contact: '/contact',
}

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNav = (section) => {
    setMenuOpen(false)
    const route = sectionRoutes[section]

    if (route.includes('#')) {
      const anchor = route.split('#')[1]
      if (location.pathname !== '/') {
        navigate('/')
        setTimeout(() => {
          document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' })
        }, 350)
      } else {
        document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      navigate(route)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <>
      <motion.nav
        className={`nav${scrolled ? ' nav--scrolled' : ''}`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <button
          className="nav__hamburger"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span className={menuOpen ? 'open' : ''} />
          <span className={menuOpen ? 'open' : ''} />
          <span className={menuOpen ? 'open' : ''} />
        </button>

        <div className="nav__signature">
  <SignatureDraw />
</div>

        <div className="nav__actions">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="nav__remix-btn"
          >
            <span>Open to Work</span>
            <span className="nav__dot" />
          </a>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="nav__overlay"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul className="nav__menu">
              {sections.map((s, i) => (
                <motion.li
                  key={s}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.35 }}
                >
                  <button onClick={() => handleNav(s)} className="nav__menu-btn">
                    <span className="nav__menu-num">0{i + 1}</span>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
