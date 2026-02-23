import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { projects } from '../components/Projects/Projects'
import './PageLayout.css'
import './ProjectsPage.css'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function ProjectsPage() {
  const navigate = useNavigate()

  return (
    <div className="page">
      <motion.div className="page__hero" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
        <motion.p className="page__label" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          Selected work
        </motion.p>
        <motion.h1 className="page__title" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          Projects
        </motion.h1>
        <motion.div className="page__star" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}>
          <StarIcon />
        </motion.div>
      </motion.div>

      <div className="page__content">
        <div className="projects-page__grid">
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              className="proj-page-card"
              custom={i}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              onClick={() => { navigate(`/projects/${p.slug}`); window.scrollTo(0, 0) }}
            >
              <div
                className="proj-page-card__img"
                style={{ background: `linear-gradient(145deg, ${p.color} 0%, ${p.accent}20 100%)` }}
              >
                <div className="proj-page-card__noise" />
                <div className="proj-page-card__dim" />
              </div>
              <div className="proj-page-card__label">
                <span className="proj-page-card__label-title">{p.title}</span>
                <span className="proj-page-card__label-meta">{p.year} · {p.category}</span>
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
      <path d="M16 2L18.47 13.53L30 16L18.47 18.47L16 30L13.53 18.47L2 16L13.53 13.53L16 2Z" fill="#2563EB" />
    </svg>
  )
}
