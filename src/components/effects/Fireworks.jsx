import { useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'

const Fireworks = ({ active = false, intensity = 'medium' }) => {
  const containerRef = useRef(null)
  const intervalRef = useRef(null)

  const createFirework = useCallback((x, y) => {
    const container = containerRef.current
    if (!container) return

    const colors = ['#FFD700', '#DC143C', '#4169E1', '#FFFFFF', '#00FF00', '#FF69B4']
    const particleCount = intensity === 'high' ? 40 : intensity === 'medium' ? 25 : 15

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div')
      particle.className = 'absolute rounded-full pointer-events-none'

      const size = Math.random() * 4 + 2
      const color = colors[Math.floor(Math.random() * colors.length)]

      particle.style.width = `${size}px`
      particle.style.height = `${size}px`
      particle.style.backgroundColor = color
      particle.style.boxShadow = `0 0 ${size * 3}px ${color}`

      container.appendChild(particle)

      const angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.5
      const velocity = Math.random() * 150 + 100
      const endX = x + Math.cos(angle) * velocity
      const endY = y + Math.sin(angle) * velocity

      gsap.set(particle, { x, y, opacity: 1 })

      gsap.to(particle, {
        duration: Math.random() * 1 + 0.5,
        x: endX,
        y: endY + 50, // 중력 효과
        opacity: 0,
        ease: 'power2.out',
        onComplete: () => particle.remove(),
      })
    }
  }, [intensity])

  const launchFirework = useCallback(() => {
    const x = Math.random() * window.innerWidth
    const y = Math.random() * (window.innerHeight * 0.6) + 100

    // 발사체 (올라가는 불꽃)
    const rocket = document.createElement('div')
    rocket.className = 'absolute w-1 h-4 bg-white rounded-full pointer-events-none'
    rocket.style.boxShadow = '0 0 10px #FFD700'

    const container = containerRef.current
    if (!container) return

    container.appendChild(rocket)

    const startY = window.innerHeight

    gsap.set(rocket, { x, y: startY, opacity: 1 })

    gsap.to(rocket, {
      duration: 0.8,
      y: y,
      ease: 'power2.out',
      onComplete: () => {
        rocket.remove()
        createFirework(x, y)
      },
    })
  }, [createFirework])

  useEffect(() => {
    if (active) {
      // 초기 불꽃놀이
      for (let i = 0; i < 3; i++) {
        setTimeout(() => launchFirework(), i * 300)
      }

      // 지속적인 불꽃놀이
      const intervalTime = intensity === 'high' ? 500 : intensity === 'medium' ? 1000 : 2000
      intervalRef.current = setInterval(launchFirework, intervalTime)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [active, intensity, launchFirework])

  if (!active) return null

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none z-20"
    />
  )
}

export default Fireworks
