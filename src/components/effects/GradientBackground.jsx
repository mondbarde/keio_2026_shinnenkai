import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const GradientBackground = ({ variant = 'default' }) => {
  const bgRef = useRef(null)

  const gradients = {
    default: [
      'radial-gradient(ellipse at 20% 30%, rgba(30, 87, 153, 0.4) 0%, transparent 50%)',
      'radial-gradient(ellipse at 80% 70%, rgba(0, 53, 107, 0.4) 0%, transparent 50%)',
      'radial-gradient(ellipse at 50% 50%, rgba(65, 105, 225, 0.2) 0%, transparent 60%)',
    ],
    celebration: [
      'radial-gradient(ellipse at 20% 30%, rgba(220, 20, 60, 0.3) 0%, transparent 50%)',
      'radial-gradient(ellipse at 80% 70%, rgba(255, 215, 0, 0.3) 0%, transparent 50%)',
      'radial-gradient(ellipse at 50% 50%, rgba(65, 105, 225, 0.2) 0%, transparent 60%)',
    ],
    gold: [
      'radial-gradient(ellipse at 30% 20%, rgba(255, 215, 0, 0.4) 0%, transparent 50%)',
      'radial-gradient(ellipse at 70% 80%, rgba(255, 165, 0, 0.3) 0%, transparent 50%)',
      'radial-gradient(ellipse at 50% 50%, rgba(218, 165, 32, 0.2) 0%, transparent 60%)',
    ],
  }

  useEffect(() => {
    const bg = bgRef.current
    if (!bg) return

    const orbs = bg.children

    // 부드러운 움직임 (transform만 사용)
    Array.from(orbs).forEach((orb, index) => {
      gsap.to(orb, {
        duration: 20 + index * 5,
        x: () => Math.random() * 50 - 25,
        y: () => Math.random() * 50 - 25,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    })

    return () => {
      Array.from(orbs).forEach(orb => {
        gsap.killTweensOf(orb)
      })
    }
  }, [])

  const currentGradients = gradients[variant] || gradients.default

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-keio-blue-dark">
      <div ref={bgRef} className="absolute inset-0">
        {currentGradients.map((gradient, index) => (
          <div
            key={index}
            className="absolute inset-0 will-change-transform"
            style={{ background: gradient }}
          />
        ))}
      </div>

      {/* 정적 장식 요소 (애니메이션 제거) */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(30, 87, 153, 0.8) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(65, 105, 225, 0.8) 0%, transparent 70%)',
          }}
        />
      </div>
    </div>
  )
}

export default GradientBackground
