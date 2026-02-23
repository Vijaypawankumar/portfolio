import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { certs } from '../components/Certification/Certification'
import './PageLayout.css'
import './CertificationPage.css'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function CertificationPage() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const navigate = useNavigate()

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
          Credentials
        </motion.p>

        <motion.h1
          className="page__title"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          Certification
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
        <div className="cert-page__list">
          {certs.map((cert, i) => (
            <motion.div
              key={cert.slug}
              className="cert-page__item"
              custom={i}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              onClick={() => { navigate(`/certification/${cert.slug}`); window.scrollTo(0, 0) }}
              style={{ cursor: 'pointer' }}
            >
              {/* Real certificate thumbnail */}
              <div className="cert-page__thumb">
                <img src={cert.image} alt={cert.title} />
              </div>

              <div className="cert-page__left">
                <div className="cert-page__meta">
                  <span className="cert-page__level">{cert.level}</span>
                  <span className="cert-page__year">{cert.year}</span>
                </div>
                <h3 className="cert-page__title">{cert.title}</h3>
                <p className="cert-page__issuer">{cert.issuer}</p>
              </div>

              <div className="cert-page__right">
                <p className="cert-page__desc">{cert.desc}</p>
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