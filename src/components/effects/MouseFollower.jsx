import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const MouseFollower = ({ enabled = true }) => {
  const followerRef = useRef(null)
  const glowRef = useRef(null)

  useEffect(() => {
    if (!enabled) return

    const follower = followerRef.current
    const glow = glowRef.current
    if (!follower || !glow) return

    const handleMouseMove = (e) => {
      gsap.to(follower, {
        duration: 0.3,
        x: e.clientX,
        y: e.clientY,
        ease: 'power2.out',
      })

      gsap.to(glow, {
        duration: 0.6,
        x: e.clientX,
        y: e.clientY,
        ease: 'power2.out',
      })
    }

    const handleMouseEnter = () => {
      gsap.to(follower, {
        duration: 0.3,
        opacity: 1,
        scale: 1,
      })
      gsap.to(glow, {
        duration: 0.3,
        opacity: 0.5,
        scale: 1,
      })
    }

    const handleMouseLeave = () => {
      gsap.to(follower, {
        duration: 0.3,
        opacity: 0,
        scale: 0.5,
      })
      gsap.to(glow, {
        duration: 0.3,
        opacity: 0,
        scale: 0.5,
      })
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      {/* 메인 커서 */}
      <div
        ref={followerRef}
        className="fixed w-4 h-4 -ml-2 -mt-2 rounded-full pointer-events-none z-50 opacity-0"
        style={{
          background: 'radial-gradient(circle, #FFD700 0%, transparent 70%)',
          boxShadow: '0 0 20px #FFD700',
        }}
      />

      {/* 글로우 효과 */}
      <div
        ref={glowRef}
        className="fixed w-32 h-32 -ml-16 -mt-16 rounded-full pointer-events-none z-40 opacity-0"
        style={{
          background: 'radial-gradient(circle, rgba(255, 215, 0, 0.1) 0%, transparent 70%)',
        }}
      />
    </>
  )
}

export default MouseFollower
