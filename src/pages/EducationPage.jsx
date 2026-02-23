import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './PageLayout.css'
import './EducationPage.css'

const degrees = [
  {
    degree: 'B.E. Computer Science & Engineering',
    school: 'Sathyabama Institute of Science and Technology, Chennai',
    period: '2022 – 2026',
    focus: 'Focused on Artificial Intelligence, Computer Vision, Machine Learning, and Software Engineering.',
  },
]

const certs = [
  {
    name: 'Oracle Certified Foundations Associate',
    org: 'Oracle University',
    year: '2025',
  },
  {
    name: 'Reinforcement Learning and Deep Learning Essentials',
    org: 'IBM Skills Network / Cognitive Class',
    year: '2025',
  },
  {
    name: 'Product Development with AI',
    org: 'Cognibot',
    year: '2024',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function EducationPage() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div className="page" ref={ref}>
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
          transition={{ delay: 0.1 }}
        >
          Academic background
        </motion.p>

        <motion.h1
          className="page__title"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          Education
        </motion.h1>

        <motion.div
          className="page__star"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <StarIcon />
        </motion.div>
      </motion.div>

      <div className="page__content">
        {/* Degree */}
        <div className="edu-page__degrees">
          {degrees.map((d, i) => (
            <motion.div
              key={d.school}
              className="edu-page__degree"
              custom={i}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              <div className="edu-page__degree-left">
                <span className="edu-page__period">{d.period}</span>
                <span className="edu-page__school">{d.school}</span>
              </div>

              <div className="edu-page__degree-right">
                <h3 className="edu-page__degree-title">{d.degree}</h3>
                <p className="edu-page__focus">{d.focus}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="page-section__divider" />

        {/* Certifications */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <p className="page-section__label">Certifications</p>

          <div className="edu-page__certs">
            {certs.map((c, i) => (
              <motion.div
                key={c.name}
                className="edu-page__cert"
                custom={i + 4}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
              >
                <div className="edu-page__cert-info">
                  <span className="edu-page__cert-name">{c.name}</span>
                  <span className="edu-page__cert-org">{c.org}</span>
                </div>

                <span className="edu-page__cert-year">{c.year}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
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