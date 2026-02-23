import { useEffect, useRef, Suspense } from 'react'
import { motion } from 'framer-motion'
import { lazy } from 'react'
import './Hero.css'

// Only lazy-load Badge on desktop — don't ship the 3D bundle to mobile at all
const isDesktop = typeof window !== 'undefined' && window.innerWidth > 1024
const Badge = isDesktop ? lazy(() => import('../Badge/Badge')) : null

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function Hero() {
  const scrollRef = useRef(null)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    let frame
    const animate = () => {
      const t = Date.now() / 1000
      el.style.opacity = 0.5 + 0.5 * Math.sin(t * 1.5)
      frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [])

  const scrollDown = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero" id="hero">
      <motion.div
        className="hero__content"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {/* Label */}
        <motion.p className="hero__hello" variants={fadeUp}>
          Hello, I am
        </motion.p>

        {/* Name */}
        <motion.div className="hero__name-wrapper" variants={fadeUp}>
          <h1 className="hero__name">Vijay Pavan</h1>
        </motion.div>

        {/* Blue star */}
        <motion.div className="hero__star" variants={fadeUp}>
          <StarIcon />
        </motion.div>

        {/* Intro */}
        <motion.p className="hero__intro" variants={fadeUp}>
          Associate System Engineer - Trainee
          <br />
          building immersive digital experiences.
        </motion.p>

        {/* Scroll indicator */}
        <motion.button
          className="hero__scroll"
          variants={fadeUp}
          onClick={scrollDown}
        >
          <span ref={scrollRef} className="hero__scroll-label">
            Scroll to explore
          </span>
          <span className="hero__scroll-arrow">↓</span>
        </motion.button>
      </motion.div>

      {/* 3D Badge — desktop only, not rendered or loaded on mobile/tablet */}
      {Badge && (
        <div className="hero__badge-wrapper">
          <Suspense fallback={<div className="hero__badge-loader" />}>
            <Badge />
          </Suspense>
        </div>
      )}
    </section>
  )
}

function StarIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path
        d="M16 2L18.47 13.53L30 16L18.47 18.47L16 30L13.53 18.47L2 16L13.53 13.53L16 2Z"
        fill="#2563EB"
      />
    </svg>
  )
}