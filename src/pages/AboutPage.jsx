import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './PageLayout.css'
import './AboutPage.css'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function AboutPage() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div className="page" ref={ref}>
      {/* Page Hero */}
      <motion.div
        className="page__hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.p
          className="page__label"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Get to know me
        </motion.p>
        <motion.h1
          className="page__title"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          About
        </motion.h1>
        <motion.div
          className="page__star"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <StarIcon />
        </motion.div>
      </motion.div>

      {/* Content */}
      <div className="page__content">
        <div className="about-page__grid">
          {/* Left: Portrait + social */}
          <motion.div
            className="about-page__left"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="about-page__portrait">
              <div className="about-page__portrait-img">
                <span className="about-page__portrait-initials">VP</span>
              </div>
            </div>

            <div className="about-page__socials">
              <a
                href="https://github.com/Vijaypawankumar"
                target="_blank"
                rel="noopener noreferrer"
                className="about-page__social-link"
              >
                <GithubIcon /> GitHub
              </a>

              <a
                href="https://linkedin.com/in/vijay-pavan-kumar-yeruva-23b4262b2"
                target="_blank"
                rel="noopener noreferrer"
                className="about-page__social-link"
              >
                <LinkedInIcon /> LinkedIn
              </a>

              <a
                href="mailto:vijaypavan1291@gmail.com"
                className="about-page__social-link"
              >
                <MailIcon /> Email
              </a>
            </div>
          </motion.div>

          {/* Right: Bio */}
          <div className="about-page__right">
            <motion.p
              className="about-page__bio-lead"
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              I’m an Associate System Engineer – Trainee with a strong foundation in
              Computer Vision, Machine Learning, and Java Development.
            </motion.p>

            <motion.p
              className="about-page__bio-body"
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              Currently pursuing B.E. in Computer Science & Engineering at
              Sathyabama Institute of Science and Technology (2022–2026), I
              specialize in building intelligent systems that combine AI,
              real-time processing, and practical engineering.
            </motion.p>

            <motion.p
              className="about-page__bio-body"
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              During my internship at AI ROBO Infinity, I worked as a CAD Designer,
              where I built a full production-ready 3D model of an agricultural
              seed-dropping drone based on R&D specifications and tested its
              aerodynamics for real-world feasibility. I have also completed
              professional AI programs with IBM and Oracle, strengthening my
              cloud and deep learning foundations.
            </motion.p>

            <motion.div
              className="about-page__skills"
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              <p className="about-page__skills-label">Core skills</p>
              <div className="about-page__skill-tags">
                {[
                  'Computer Vision',
                  'Machine Learning',
                  'Deep Learning',
                  'Java',
                  'Python',
                  'OpenCV',
                  'PyTorch',
                  'Cloud Fundamentals',
                ].map(tag => (
                  <span key={tag} className="about-page__tag">{tag}</span>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="about-page__stats"
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              <div className="about-page__stat">
                <span className="about-page__stat-num">4+</span>
                <span className="about-page__stat-label">Major Projects</span>
              </div>
              <div className="about-page__stat">
                <span className="about-page__stat-num">3</span>
                <span className="about-page__stat-label">Certifications</span>
              </div>
              <div className="about-page__stat">
                <span className="about-page__stat-num">1</span>
                <span className="about-page__stat-label">Industry Internship</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StarIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
      <path d="M16 2L18.47 13.53L30 16L18.47 18.47L16 30L13.53 18.47L2 16L13.53 13.53L16 2Z" fill="#2563EB" />
    </svg>
  )
}

function GithubIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
}

function LinkedInIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/></svg>
}

function MailIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
}