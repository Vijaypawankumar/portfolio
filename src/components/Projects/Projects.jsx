import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import './Projects.css'

export const projects = [
  {
    id: 1,
    slug: 'multimodal-alzheimers-screening',
    title: "Multimodal Alzheimer's Screening",
    year: '2025',
    category: 'AI / Healthcare',
    industry: 'Medical AI',
    client: 'Academic Research',
    service: 'Deep Learning System',
    date: 'January 2025',
    desc: "Developed a multimodal deep learning system combining retinal fundus images and speech recordings for early Alzheimer's detection. Implemented EfficientNet-based visual encoder and CNN-based audio pipeline with attention fusion.",
    tags: ['PyTorch', 'OpenCV', 'Deep Learning', 'Grad-CAM'],
    color: '#0f172a',
    accent: '#2563eb',
    image: '/alzhimers.jpeg',
  },
  {
    id: 2,
    slug: 'agricultural-seed-dropping-drone',
    title: 'Agricultural Seed Dropping Drone',
    year: '2024',
    category: 'Robotics / CAD',
    industry: 'AgriTech',
    client: 'AI ROBO Infinity',
    service: '3D Design & Aerodynamics',
    date: 'September 2024',
    desc: 'Designed a production-ready 3D CAD model of an agricultural seed-dropping drone based on R&D specifications. Validated structural integrity and optimized aerodynamic stability for real-world deployment.',
    tags: ['Blender', 'CAD', 'Drone Design', 'Simulation'],
    color: '#111827',
    accent: '#22c55e',
    image: '/seed-dropping-drone.jpeg',
  },
  {
    id: 3,
    slug: 'agentic-career-counseling-companion',
    title: 'Agentic Career Counseling Companion',
    year: '2025',
    category: 'AI / Agent Systems',
    industry: 'EdTech',
    client: 'IBM AICTE Initiative',
    service: 'Autonomous AI Agent',
    date: 'February 2025',
    desc: 'Built an intelligent agent that analyzes student performance, interests, and labor market trends to deliver adaptive career recommendations. Implemented using IBM Watsonx.ai and cloud-based deployment.',
    tags: ['Watsonx.ai', 'LLMs', 'Cloud', 'AI Agents'],
    color: '#1e293b',
    accent: '#0f62fe',
    image: '/ai-carrier-counciling.jpeg',
  },
  {
    id: 4,
    slug: 'video-to-3d-reconstruction',
    title: 'Video to 3D Reconstruction Pipeline',
    year: '2024',
    category: 'Computer Vision',
    industry: '3D Vision',
    client: 'Personal Research',
    service: '3D Mesh Generation',
    date: 'August 2024',
    desc: 'Implemented a resource-efficient 3D reconstruction pipeline converting monocular video into textured 3D meshes using feature matching, camera pose estimation, triangulation, and Open3D mesh processing.',
    tags: ['OpenCV', 'Open3D', 'Structure from Motion', '3D Vision'],
    color: '#0b132b',
    accent: '#3b82f6',
    image: '/video-to-3d.jpeg',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const navigate = useNavigate()

  return (
    <section className="projects" id="projects" ref={ref}>
      <div className="projects__inner">
        <motion.div
          className="section-header section-header--hoverable"
          onClick={() => { navigate('/projects'); window.scrollTo(0, 0) }}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeUp}
          custom={0}
        >
          <span className="section-label section-label--strong">Projects</span>
          <span className="section-line" />
          <span className="section-loader"><span className="section-loader__bar" /></span>
          <span className="section-nav-arrow">›</span>
        </motion.div>

        <div className="projects__grid">
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              className="project-card"
              onClick={() => { navigate(`/projects/${p.slug}`); window.scrollTo(0, 0) }}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: {
                  opacity: 1, y: 0,
                  transition: { duration: 0.6, delay: i * 0.12 + 0.2, ease: [0.22, 1, 0.36, 1] },
                },
              }}
            >
              <div
                className="project-card__img"
                style={{ backgroundImage: `url(${p.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              >
                <div className="project-card__dim" />
              </div>
              <div className="project-card__label">
                <span className="project-card__label-title">{p.title}</span>
                <span className="project-card__label-meta">{p.year} · {p.category}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="projects__view-all"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <button className="projects__view-btn" onClick={() => { navigate('/projects'); window.scrollTo(0, 0) }}>
            VIEW ALL PROJECTS
          </button>
        </motion.div>
      </div>
    </section>
  )
}