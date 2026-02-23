import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import './Experience.css'

const experiences = [
  {
    role: 'Associate System Engineer (Trainee)',
    company: 'Tata Consultancy Services (TCS)',
    period: '2026 — Joining Soon',
    desc: 'Received offer as Associate System Engineer. Preparing for enterprise-level software development, system engineering, and scalable application deployment in corporate environments.',
    type: 'Full-time (Offer Received)',
  },
  {
    role: 'CAD Designer',
    company: 'AI ROBO Infinity',
    period: '3 Months Internship',
    desc: 'Worked onsite as a CAD Designer. Designed and developed a production-ready 3D model of an agricultural seed-dropping drone based on R&D team specifications. Optimized structural design, validated mechanical feasibility, and tested aerodynamic performance using simulation workflows.',
    type: 'Onsite Internship',
  },
  {
    role: 'AI & Machine Learning Intern',
    company: 'IBM Edunet Foundation',
    period: 'Internship',
    desc: 'Completed industry-aligned AI & Machine Learning training. Worked on real-world problem statements involving data preprocessing, model training, and deployment concepts under mentor guidance.',
    type: 'Virtual Internship',
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

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const navigate = useNavigate()

  return (
    <section className="experience" id="experience" ref={ref}>
      <div className="experience__inner">
        <motion.div
          className="section-header section-header--hoverable"
          onClick={() => { navigate('/experience'); window.scrollTo(0,0) }}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeUp}
          custom={0}
        >
          <span className="section-label section-label--strong">Experience</span>
          <span className="section-line" />
          <span className="section-loader">
            <span className="section-loader__bar" />
          </span>
          <span className="section-nav-arrow">›</span>
        </motion.div>

        <div className="experience__grid">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.company}
              className="experience__item"
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={fadeUp}
              custom={i + 1}
            >
              <div className="experience__meta">
                <span className="experience__type">{exp.type}</span>
                <span className="experience__period">{exp.period}</span>
              </div>

              <div className="experience__body">
                <h3 className="experience__role">{exp.role}</h3>
                <p className="experience__company">{exp.company}</p>
                <p className="experience__desc">{exp.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}