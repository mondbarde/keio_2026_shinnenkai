import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const ParticleBackground = ({ particleCount = 30, colors = ['#FFD700', '#FFFFFF', '#4169E1'] }) => {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const particles = []

    // 파티클 생성
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div')
      particle.className = 'absolute rounded-full pointer-events-none will-change-transform'

      const size = Math.random() * 4 + 2
      const color = colors[Math.floor(Math.random() * colors.length)]

      particle.style.width = `${size}px`
      particle.style.height = `${size}px`
      particle.style.backgroundColor = color
      particle.style.opacity = '0'

      container.appendChild(particle)
      particles.push(particle)

      // 각 파티클 애니메이션
      animateParticle(particle)
    }

    function animateParticle(particle) {
      const startX = Math.random() * window.innerWidth
      const startY = Math.random() * window.innerHeight

      gsap.set(particle, {
        x: startX,
        y: startY,
        opacity: 0,
      })

      gsap.to(particle, {
        duration: Math.random() * 4 + 3,
        x: startX + (Math.random() - 0.5) * 150,
        y: startY - Math.random() * 150 - 50,
        opacity: Math.random() * 0.5 + 0.2,
        ease: 'power1.out',
        onComplete: () => {
          gsap.to(particle, {
            duration: Math.random() * 2 + 1,
            opacity: 0,
            onComplete: () => animateParticle(particle),
          })
        },
      })
    }

    return () => {
      particles.forEach(p => {
        gsap.killTweensOf(p)
        p.remove()
      })
    }
  }, [particleCount, colors])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none z-10"
    />
  )
}

export default ParticleBackground
