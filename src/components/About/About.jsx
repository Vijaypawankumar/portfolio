import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import './About.css'

const skills = [
  { name: 'Java', pct: 75, desc: 'Backend development, OOP principles, Spring Boot, scalable systems' },
  { name: 'Computer Vision', pct: 85, desc: 'OpenCV, YOLO, PyTorch, real-time detection systems' },
  { name: 'Machine Learning', pct: 80, desc: 'Model training, optimization, multimodal pipelines, applied AI systems' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function About() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const navigate = useNavigate()

  useEffect(() => {
    let ScrollTrigger
    const init = async () => {
      const g = await import('gsap')
      const st = await import('gsap/ScrollTrigger')
      const gsap = g.gsap
      ScrollTrigger = st.ScrollTrigger
      gsap.registerPlugin(ScrollTrigger)
      const blocks = sectionRef.current?.querySelectorAll('.skill-block')
      if (!blocks || blocks.length === 0) return
      blocks.forEach((block, i) => {
        gsap.fromTo(block, { y: 60, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: block, start: 'top 85%', toggleActions: 'play none none none' },
          delay: i * 0.15,
        })
      })
    }
    init()
    return () => ScrollTrigger?.getAll().forEach((t) => t.kill())
  }, [])

  return (
    <section className="about" id="about" ref={sectionRef}>
      <div className="about__inner">
        <motion.div
          className="section-header section-header--hoverable"
          onClick={() => { navigate('/about'); window.scrollTo(0,0) }}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeUp}
          custom={0}
        >
          <span className="section-label section-label--strong">About</span>
          <span className="section-line" />
          <span className="section-loader"><span className="section-loader__bar" /></span>
          <span className="section-nav-arrow">›</span>
        </motion.div>

        <div className="about__grid">
          <div className="about__bio">
            <motion.p className="about__bio-text about__bio-text--large" initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={fadeUp} custom={1}>
              I am an Associate System Engineer – Trainee with a strong foundation in Computer Science and a focused interest in Computer Vision and Machine Learning.
            </motion.p>
            <motion.p className="about__bio-text" initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={fadeUp} custom={2}>
              I build practical AI-driven solutions by combining structured problem solving with efficient engineering. My experience spans computer vision pipelines, machine learning model development, and Java-based application systems.
            </motion.p>
            <motion.p className="about__bio-text" initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={fadeUp} custom={3}>
              Currently focused on strengthening my expertise in applied AI systems, backend architecture, and production-ready software development.
            </motion.p>
            <motion.div className="about__tags" initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={fadeUp} custom={4}>
              {['Java', 'Machine Learning', 'Computer Vision', 'Python', 'OpenCV', 'Spring Boot'].map((tag) => (
                <span key={tag} className="about__tag">{tag}</span>
              ))}
            </motion.div>
          </div>
          <div className="about__skills">
            {skills.map((skill, i) => (
              <SkillBlock key={skill.name} skill={skill} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function SkillBlock({ skill, index }) {
  return (
    <div className="skill-block" style={{ '--delay': `${index * 0.1}s` }}>
      <div className="skill-block__header">
        <span className="skill-block__name">{skill.name}</span>
      </div>
      <div className="skill-block__desc">{skill.desc}</div>
      <div className="skill-block__bar-track">
        <div className="skill-block__bar-fill" style={{ '--target-width': `${skill.pct}%` }} />
      </div>
    </div>
  )
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}