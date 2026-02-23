import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { certs } from '../components/Certification/Certification'
import './PageLayout.css'
import './CertificationDetailPage.css'

export default function CertificationDetailPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const cert = certs.find((c) => c.slug === slug)

  if (!cert) {
    return (
      <div className="page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)', marginBottom: 16 }}>Certificate not found</p>
          <button
            onClick={() => navigate('/certification')}
            style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--blue)', background: 'none', border: '1px solid var(--border)', padding: '10px 20px', borderRadius: 40, cursor: 'pointer' }}
          >
            ← Back to Certifications
          </button>
        </div>
      </div>
    )
  }

  const related = certs.filter((c) => c.slug !== slug).slice(0, 2)

  return (
    <div className="page">

      {/* Back */}
      <motion.div
        className="cert-detail__back"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <button
          className="cert-detail__back-btn"
          onClick={() => { navigate('/certification'); window.scrollTo(0, 0) }}
        >
          ← Certifications
        </button>
      </motion.div>

      {/* Header */}
      <motion.div
        className="cert-detail__header"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        <span className="cert-detail__category">{cert.category}</span>
        <h1 className="cert-detail__title">{cert.title}</h1>
      </motion.div>

      {/* Meta + Description */}
      <motion.div
        className="cert-detail__meta-wrap"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="cert-detail__meta-grid">
          <div className="cert-detail__meta-item">
            <span className="cert-detail__meta-label">Issuer</span>
            <span className="cert-detail__meta-value">{cert.issuer}</span>
          </div>
          <div className="cert-detail__meta-item">
            <span className="cert-detail__meta-label">Date</span>
            <span className="cert-detail__meta-value">{cert.date}</span>
          </div>
          <div className="cert-detail__meta-item">
            <span className="cert-detail__meta-label">Level</span>
            <span className="cert-detail__meta-value">{cert.level}</span>
          </div>
          <div className="cert-detail__meta-item">
            <span className="cert-detail__meta-label">Credential ID</span>
            <span className="cert-detail__meta-value cert-detail__meta-value--mono">{cert.credential}</span>
          </div>
        </div>

        <div className="cert-detail__description">
          <p>{cert.desc}</p>
          <div className="cert-detail__recipient-block">
            <span className="cert-detail__meta-label">Awarded to</span>
            <span className="cert-detail__recipient">{cert.recipient}</span>
          </div>
          <div className="cert-detail__skills">
            {cert.skills.map((s) => (
              <span key={s} className="cert-detail__skill">{s}</span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Hero — real certificate image */}
      <motion.div
        className="cert-detail__hero"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <img
          src={cert.image}
          alt={cert.title}
          className="cert-detail__hero-img"
        />
      </motion.div>

      {/* Related Certificates */}
      <div className="cert-detail__related">
        <div className="cert-detail__related-header">
          <span className="cert-detail__related-label">OTHER CERTIFICATES</span>
          <button
            className="cert-detail__view-all"
            onClick={() => { navigate('/certification'); window.scrollTo(0, 0) }}
          >
            VIEW ALL CERTIFICATES
          </button>
        </div>
        <div className="cert-detail__related-grid">
          {related.map((c) => (
            <div
              key={c.slug}
              className="cert-detail__related-card"
              onClick={() => { navigate(`/certification/${c.slug}`); window.scrollTo(0, 0) }}
            >
              <div
                className="cert-detail__related-img"
                style={{
                  backgroundImage: `url(${c.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="cert-detail__related-dim" />
                <div className="cert-detail__related-label-block">
                  <span className="cert-detail__related-title">{c.title}</span>
                  <span className="cert-detail__related-meta">{c.year} · {c.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}