import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './PageLayout.css'
import './ExperiencePage.css'

const stats = [
  { num: '1+', label: 'Years of Practical Experience' },
  { num: '4+', label: 'Major Projects Built' },
  { num: '2', label: 'Organizations Worked With' },
  { num: '1', label: 'Offer Secured (TCS)' },
]

const experiences = [
  {
    role: 'Associate System Engineer (Offer Received)',
    company: 'Tata Consultancy Services (TCS)',
    period: '2025 — Joining Awaited',
    type: 'Full-time Offer',
    desc: 'Received official offer letter from Tata Consultancy Services as Associate System Engineer – Trainee. Awaiting onboarding schedule and formal joining date confirmation.',
  },
  {
    role: 'CAD Designer',
    company: 'AI ROBO Infinity',
    period: '3 Months (Onsite Internship)',
    type: 'Internship',
    desc: 'Designed and developed a full production-ready 3D model of an agricultural seed-dropping drone based on R&D team specifications. Worked on structural optimization, aerodynamics validation, and real-world feasibility testing to ensure performance efficiency.',
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

export default function ExperiencePage() {
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
          Career
        </motion.p>
        <motion.h1
          className="page__title"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          Experience
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

        {/* Stats */}
        <div className="exp-page__stats">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="exp-page__stat"
              custom={i}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              <span className="exp-page__stat-num">{s.num}</span>
              <span className="exp-page__stat-label">{s.label}</span>
            </motion.div>
          ))}
        </div>

        <div className="page-section__divider" />

        {/* Experience grid */}
        <div className="exp-page__grid">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.company}
              className="exp-page__item"
              custom={i}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              <div className="exp-page__meta">
                <span className="exp-page__type">{exp.type}</span>
                <span className="exp-page__period">{exp.period}</span>
              </div>
              <div className="exp-page__body">
                <h3 className="exp-page__role">{exp.role}</h3>
                <p className="exp-page__company">{exp.company}</p>
                <p className="exp-page__desc">{exp.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  )
}

function StarIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
      <path
        d="M16 2L18.47 13.53L30 16L18.47 18.47L16 30L13.53 18.47L2 16L13.53 13.53L16 2Z"
        fill="#2563EB"
      />
    </svg>
  )
}