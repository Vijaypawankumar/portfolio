import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import './Education.css'

const degrees = [
  {
    degree: 'B.E. Computer Science & Engineering',
    school: 'Sathyabama University, Chennai',
    period: '2022 – 2026',
    focus: '',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Education() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const navigate = useNavigate()

  return (
    <section className="education" id="education" ref={ref}>
      <div className="education__inner">
        <motion.div
          className="section-header section-header--hoverable"
          onClick={() => { navigate('/education'); window.scrollTo(0,0) }}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeUp}
          custom={0}
        >
          <span className="section-label section-label--strong">Education</span>
          <span className="section-line" />
          <span className="section-loader">
            <span className="section-loader__bar" />
          </span>
          <span className="section-nav-arrow">›</span>
        </motion.div>

        <div className="education__degrees">
          {degrees.map((d, i) => (
            <motion.div
              key={d.school}
              className="education__degree"
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={fadeUp}
              custom={i + 1}
            >
              <div className="education__degree-tag">{d.period}</div>
              <h3 className="education__degree-title">{d.degree}</h3>
              <p className="education__degree-school">{d.school}</p>
              {d.focus && (
                <p className="education__degree-focus">{d.focus}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}