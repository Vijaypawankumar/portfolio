import { useEffect, useRef } from "react"

export default function SignatureDraw() {
  const animatedRef = useRef(null)

  useEffect(() => {
    const path = animatedRef.current
    if (!path) return

    const length = path.getTotalLength()

    path.style.transition = "none"
    path.style.strokeDasharray = `${length}`
    path.style.strokeDashoffset = `${length}`

    let timeoutId

    const DRAW_DURATION = 2000
    const HOLD_DURATION = 900
    const ERASE_DURATION = 1600
    const PAUSE_DURATION = 500

    function draw() {
      path.style.transition = `stroke-dashoffset ${DRAW_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)`
      path.style.strokeDashoffset = "0"
      timeoutId = setTimeout(erase, DRAW_DURATION + HOLD_DURATION)
    }

    function erase() {
      path.style.transition = `stroke-dashoffset ${ERASE_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)`
      path.style.strokeDashoffset = `${length}`
      timeoutId = setTimeout(reset, ERASE_DURATION + PAUSE_DURATION)
    }

    function reset() {
      path.style.transition = "none"
      path.style.strokeDashoffset = `${length}`
      timeoutId = setTimeout(draw, 50)
    }

    timeoutId = setTimeout(draw, 300)
    return () => clearTimeout(timeoutId)
  }, [])

  // The true centerline stroke path extracted from your SVG (the fill="none" stroke path)
  const signaturePath = `M476.540039,1135.713l-2.95697,1.7536c-10.704004,8.160223-10.379823,62.284959,5.527071,79.1561c11.529144,3.59911,38.307019-45.709455,52.68142-88.453201c3.650757-14.828078,2.390963-20.915-.995707-25.589013-2.167001-1.713753-6.959438-1.735515-9.354346,0-2.998418,1.608153-5.75441,6.751615-7.461408,10.499337-12.140223,27.508871-7.063138,53.612078,3.60236,59.344277c6.893336,2.317901,25.306193-13.389971,35.669856-24.3804-3.163848,2.045324-6.575572,10.28654-5.999086,18.036038c3.203333,11.915434,22.670417-2.355187,35.56227-14.016138-3.191437,14.278992-8.92766,35.640535-13.899186,41.9993-2.437962,2.03682-5.907754.907664-6.46486-2.531645-2.745372-10.353566,16.070576-23.474601,32.017116-29.896655`

  return (
    <svg
      width="120"
      height="60"
      viewBox="460 1095 155 130"
      fill="none"
      style={{ display: "block", overflow: "visible" }}
    >
      {/* Static ghost layer */}
      <path
        d={signaturePath}
        stroke="#aaaaaa"
        strokeWidth="4.624"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.35"
      />

      {/* Animated layer */}
      <path
        ref={animatedRef}
        d={signaturePath}
        stroke="#1a1a1a"
        strokeWidth="4.624"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}