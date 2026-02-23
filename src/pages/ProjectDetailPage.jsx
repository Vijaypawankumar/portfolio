import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { projects } from '../components/Projects/Projects'
import './PageLayout.css'
import './ProjectDetailPage.css'

export default function ProjectDetailPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div className="page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)', marginBottom: 16 }}>Project not found</p>
          <button onClick={() => navigate('/projects')} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--blue)', background: 'none', border: '1px solid var(--border)', padding: '10px 20px', borderRadius: 40, cursor: 'pointer' }}>
            ← Back to Projects
          </button>
        </div>
      </div>
    )
  }

  const related = projects.filter((p) => p.slug !== slug).slice(0, 2)

  return (
    <div className="page">

      {/* Back */}
      <motion.div className="proj-detail__back" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <button className="proj-detail__back-btn" onClick={() => { navigate('/projects'); window.scrollTo(0, 0) }}>
          ← Projects
        </button>
      </motion.div>

      {/* Title */}
      <motion.div className="proj-detail__header" initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
        <h1 className="proj-detail__title">{project.title}</h1>
      </motion.div>

      {/* Meta + Description */}
      <motion.div className="proj-detail__meta-wrap" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
        <div className="proj-detail__meta-grid">
          <div className="proj-detail__meta-item">
            <span className="proj-detail__meta-label">Industry</span>
            <span className="proj-detail__meta-value">{project.industry}</span>
          </div>
          <div className="proj-detail__meta-item">
            <span className="proj-detail__meta-label">Client</span>
            <span className="proj-detail__meta-value">{project.client}</span>
          </div>
          <div className="proj-detail__meta-item">
            <span className="proj-detail__meta-label">Service</span>
            <span className="proj-detail__meta-value">{project.service}</span>
          </div>
          <div className="proj-detail__meta-item">
            <span className="proj-detail__meta-label">Date</span>
            <span className="proj-detail__meta-value">{project.date}</span>
          </div>
        </div>
        <div className="proj-detail__description">
          <p>{project.desc}</p>
          <div className="proj-detail__tags">
            {project.tags.map((t) => (
              <span key={t} className="proj-detail__tag">{t}</span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Hero image — real photo instead of gradient */}
      <motion.div
        className="proj-detail__hero-img"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        style={{
          backgroundImage: `url(${project.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="proj-detail__hero-dim" />
        <span className="proj-detail__hero-label">{project.title}</span>
      </motion.div>

      {/* Related Projects */}
      <div className="proj-detail__related">
        <div className="proj-detail__related-header">
          <span className="proj-detail__related-label">RELATED PROJECTS</span>
          <button className="proj-detail__view-all" onClick={() => { navigate('/projects'); window.scrollTo(0, 0) }}>
            VIEW ALL PROJECTS
          </button>
        </div>
        <div className="proj-detail__related-grid">
          {related.map((p) => (
            <div
              key={p.id}
              className="proj-detail__related-card"
              onClick={() => { navigate(`/projects/${p.slug}`); window.scrollTo(0, 0) }}
            >
              <div
                className="proj-detail__related-img"
                style={{ backgroundImage: `url(${p.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              >
                <div className="proj-detail__related-dim" />
                <div className="proj-detail__related-label-block">
                  <span className="proj-detail__related-title">{p.title}</span>
                  <span className="proj-detail__related-meta">{p.year} · {p.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}