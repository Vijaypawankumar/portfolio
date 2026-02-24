import { useRef, useEffect } from 'react'
import './Ribbon.css'

const items = [
  { label: 'GitHub', href: 'https://github.com/Vijaypawankumar' },
  { label: '✦', href: null },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/vijay-pavan-kumar-yeruva-23b4262b2' },
  { label: '✦', href: null },
  { label: 'Resume', href: '/resume.pdfC:\Users\pavan\OneDrive\Desktop\sampfol\public\SIST-B.E-CSE-42612055-Yeruva_Vijay_pavan_kumar_reddy.pdf' }, // Put your resume inside public folder
  { label: '✦', href: null },
]

export default function Ribbon() {
  const trackRef = useRef(null)
  const animRef = useRef(null)
  const posRef = useRef(0)
  const pausedRef = useRef(false)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const totalWidth = track.scrollWidth / 2

    const animate = () => {
      if (!pausedRef.current) {
        posRef.current -= 0.6 // slower, premium feel
        if (Math.abs(posRef.current) >= totalWidth) {
          posRef.current = 0
        }
        track.style.transform = `translate3d(${posRef.current}px, 0, 0)`
      }
      animRef.current = requestAnimationFrame(animate)
    }

    animRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animRef.current)
  }, [])

  const renderItems = () =>
    items.map((item, i) =>
      item.href ? (
        <a
          key={i}
          href={item.href}
          target={item.href.startsWith('http') ? '_blank' : undefined}
          rel="noopener noreferrer"
          className="ribbon__item ribbon__item--link"
        >
          {item.label}
        </a>
      ) : (
        <span key={i} className="ribbon__item ribbon__item--sep">
          {item.label}
        </span>
      )
    )

  return (
    <div
      className="ribbon"
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
    >
      <div className="ribbon__track" ref={trackRef}>
        {renderItems()}
        {renderItems()}
        {renderItems()}
      </div>
    </div>
  )
}