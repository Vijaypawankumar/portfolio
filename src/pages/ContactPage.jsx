import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import emailjs from '@emailjs/browser'
import './PageLayout.css'
import './ContactPage.css'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function ContactPage() {
  const ref = useRef(null)
  const formRef = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setError(false)

    emailjs
      .sendForm(
        'service_vaka8mo',      // 🔁 replace
        'template_8194067',     // 🔁 replace
        formRef.current,
        'vem11oMURqtij3Ej1'       // 🔁 replace
      )
      .then(
        () => {
          setSent(true)
          setLoading(false)
          formRef.current.reset()
          setTimeout(() => setSent(false), 3000)
        },
        () => {
          setError(true)
          setLoading(false)
        }
      )
  }

  return (
    <div className="page" ref={ref}>
      <motion.div
        className="page__hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.p className="page__label" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          Get in touch
        </motion.p>
        <motion.h1 className="page__title" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          Contact
        </motion.h1>
        <motion.div className="page__star" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}>
          <StarIcon />
        </motion.div>
      </motion.div>

      <div className="page__content">
        <div className="contact-page__grid">

          {/* LEFT SIDE */}
          <motion.div
            className="contact-page__left"
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <h2 className="contact-page__heading">
              Let's build<br />
              something<br />
              <span className="contact-page__heading--blue">remarkable.</span>
            </h2>

            <p className="contact-page__message">
              Whether you have a project idea, collaboration opportunity, or just want to connect —
              feel free to reach out. I typically respond within 24 hours.
            </p>

            <div className="contact-page__info">
              <div className="contact-page__info-item">
                <span className="contact-page__info-label">Email</span>
                <a
                  href="mailto:vijaypavan1291@gmail.com"
                  className="contact-page__info-value contact-page__info-link"
                >
                  vijaypavan1291@gmail.com
                </a>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE — FORM */}
          <motion.div
            className="contact-page__form-wrapper"
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <form ref={formRef} className="contact-page__form" onSubmit={handleSubmit}>

              <div className="contact-page__field">
                <label className="contact-page__label">Name</label>
                <input
                  name="user_name"
                  type="text"
                  className="contact-page__input"
                  placeholder="Your full name"
                  required
                />
              </div>

              <div className="contact-page__field">
                <label className="contact-page__label">Email</label>
                <input
                  name="user_email"
                  type="email"
                  className="contact-page__input"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div className="contact-page__field">
                <label className="contact-page__label">Message</label>
                <textarea
                  name="message"
                  className="contact-page__input contact-page__textarea"
                  placeholder="Tell me about your project..."
                  rows={6}
                  required
                />
              </div>

              <button
                type="submit"
                className={`contact-page__btn${sent ? ' sent' : ''}`}
                disabled={loading}
              >
                {loading
                  ? 'Sending...'
                  : sent
                  ? 'Message Sent ✓'
                  : error
                  ? 'Failed — Try Again'
                  : 'Send Message →'}
              </button>

            </form>
          </motion.div>

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