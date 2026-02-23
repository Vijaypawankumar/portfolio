import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import './Certification.css'

export const certs = [
  {
    slug: 'oracle-certified-foundations-associate',
    title: 'Oracle Certified Foundations Associate',
    issuer: 'Oracle University',
    date: 'Jun 19, 2025',
    year: '2025',
    category: 'Cloud Infrastructure',
    level: 'Certified',
    color: '#C74634',
    accent: '#f5a623',
    image: '/cert-oracle.png',
    desc: 'Recognized by Oracle Corporation as Oracle Cloud Infrastructure 2025 Certified Foundations Associate. Validates foundational knowledge of cloud concepts and Oracle Cloud Infrastructure services.',
    skills: ['Oracle Cloud Infrastructure', 'Cloud Concepts', 'Core OCI Services', 'Security', 'Pricing & Support'],
    credential: '101852104OCI25FNDCFA',
    recipient: 'Yeruva Vijay Pavan Kumar reddy',
    authority: 'Damien Carey, Senior Vice President, Oracle University',
  },
  {
    slug: 'reinforcement-learning-deep-learning',
    title: 'Reinforcement Learning and Deep Learning Essentials',
    issuer: 'IBM Skills Network / Cognitive Class',
    date: 'Jun 1, 2025',
    year: '2025',
    category: 'Machine Learning',
    level: 'Specialization',
    color: '#0f62fe',
    accent: '#4589ff',
    image: '/cert-ibm.png',
    desc: 'Successfully completed and received a passing grade in Reinforcement Learning and Deep Learning Essentials (ML0106EN), provided by IBM Skills Network. Powered by IBM Developer Skills Network.',
    skills: ['Reinforcement Learning', 'Deep Learning', 'Neural Networks', 'IBM Skills Network', 'Python'],
    credential: 'ML0106EN',
    recipient: 'Y Vijay Pavan Kumar Reddy',
    authority: 'Rav Ahuja, Global Program Director, IBM',
  },
  {
    slug: 'product-development-with-ai',
    title: 'Product Development with AI',
    issuer: 'Cognibot / Sathyabama Institute',
    date: 'Oct 17, 2024',
    year: '2024',
    category: 'AI / Product Development',
    level: 'Training',
    color: '#8b0000',
    accent: '#c41e3a',
    image: '/cert-cognibot.png',
    desc: 'Certificate of Training from Sathyabama Institute of Science and Technology for successfully completing the professional training program on Product Development with AI conducted at Sathyabama Institute during Odd Semester 2024.',
    skills: ['Product Development', 'Artificial Intelligence', 'AI Integration', 'Professional Training'],
    credential: '42612055',
    recipient: 'Yeruva Vijay Pavan Kumar Reddy',
    authority: 'Ajay Kumar, Director, Cognibot',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 },
  }),
}

export default function Certification() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const navigate = useNavigate()

  return (
    <section className="certification" id="certification" ref={ref}>
      <div className="certification__inner">
        <motion.div
          className="section-header section-header--hoverable"
          onClick={() => { navigate('/certification'); window.scrollTo(0, 0) }}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp}
          custom={0}
        >
          <span className="section-label section-label--strong">Certification</span>
          <span className="section-line" />
          <span className="section-loader"><span className="section-loader__bar" /></span>
          <span className="section-nav-arrow">›</span>
          <button className="section-arrow" onClick={() => navigate('/certification')} aria-label="View certifications">
            <ArrowIcon />
          </button>
        </motion.div>

        <div className="certification__list">
          {certs.map((cert, i) => (
            <motion.div
              key={cert.slug}
              className="certification__item"
              custom={i + 1}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              onClick={() => { navigate(`/certification/${cert.slug}`); window.scrollTo(0, 0) }}
              style={{ cursor: 'pointer' }}
            >
              <div className="certification__item-left">
                <h3 className="certification__cert-title">{cert.title}</h3>
                <p className="certification__cert-desc">{cert.desc}</p>
              </div>
              <div className="certification__item-right">
                <span className="certification__issuer">{cert.issuer}</span>
                <span className="certification__year">{cert.year}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}