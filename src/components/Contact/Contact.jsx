import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import emailjs from '@emailjs/browser'
import './Contact.css'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Contact() {
  const ref = useRef(null)
  const formRef = useRef()
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const navigate = useNavigate()
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    emailjs.sendForm(
      'service_vaka8mo',
      'template_8194067',
      formRef.current,
      'vem11oMURqtij3Ej1'
    )
    .then(() => {
      setSent(true)
      setLoading(false)
      formRef.current.reset()
      setTimeout(() => setSent(false), 4000)
    })
    .catch((error) => {
      console.error(error)
      setLoading(false)
      alert('Something went wrong. Please try again.')
    })
  }

  return (
    <section className="contact" id="contact" ref={ref}>
      <div className="contact__inner">

        <motion.div
          className="section-header section-header--hoverable"
          onClick={() => { navigate('/contact'); window.scrollTo(0,0) }}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeUp}
          custom={0}
        >
          <span className="section-label section-label--strong">Contact</span>
          <span className="section-line" />
          <span className="section-loader"><span className="section-loader__bar" /></span>
          <span className="section-nav-arrow">›</span>
        </motion.div>

        <div className="contact__grid">

          {/* LEFT */}
          <motion.div
            className="contact__left"
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={fadeUp}
            custom={1}
          >
            <h2 className="contact__heading">
              Let's build
              <br />
              something
              <br />
              <span className="contact__heading--blue">remarkable.</span>
            </h2>

            <div className="contact__links">

              <a href="mailto:vijaypavan1291@gmail.com" className="contact__link">
                <span className="contact__link-label">Email</span>
                <span className="contact__link-value">
                  vijaypavan1291@gmail.com
                </span>
              </a>

              <a
                href="https://linkedin.com/in/vijay-pavan-kumar-yeruva-23b4262b2"
                target="_blank"
                rel="noopener noreferrer"
                className="contact__link"
              >
                <span className="contact__link-label">LinkedIn</span>
                <span className="contact__link-value">
                  in/vijay-pavan-kumar-yeruva
                </span>
              </a>

              <a
                href="https://github.com/Vijaypawankumar"
                target="_blank"
                rel="noopener noreferrer"
                className="contact__link"
              >
                <span className="contact__link-label">GitHub</span>
                <span className="contact__link-value">
                  github.com/Vijaypawankumar
                </span>
              </a>

            </div>
          </motion.div>

          {/* RIGHT: FORM */}
          <motion.form
            ref={formRef}
            className="contact__form"
            onSubmit={handleSubmit}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={fadeUp}
            custom={2}
          >
            <div className="contact__field">
              <label className="contact__label">Name</label>
              <input
                name="name"
                type="text"
                className="contact__input"
                placeholder="Your name"
                required
              />
            </div>

            <div className="contact__field">
              <label className="contact__label">Email</label>
              <input
                name="email"
                type="email"
                className="contact__input"
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="contact__field">
              <label className="contact__label">Message</label>
              <textarea
                name="message"
                className="contact__input contact__textarea"
                placeholder="Tell me about your project..."
                rows={5}
                required
              />
            </div>

            <button type="submit" className={`contact__btn${sent ? ' sent' : ''}`}>
              {loading ? 'Sending...' : sent ? 'Message Sent ✓' : 'Send Message →'}
            </button>
          </motion.form>

        </div>
      </div>
    </section>
  )
}