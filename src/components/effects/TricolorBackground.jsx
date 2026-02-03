import { useEffect, useRef } from 'react'

// 慶應義塾大学 삼색기 배경 (青・赤・青) - 바람에 휘날리는 효과
const TricolorBackground = ({ active = false }) => {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)

  useEffect(() => {
    if (!active || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    // 캔버스 크기 설정
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // 색상 정의
    const colors = [
      { start: '#00356B', end: '#002244' }, // 파랑 (왼쪽)
      { start: '#DC143C', end: '#B91030' }, // 빨강 (중앙)
      { start: '#00356B', end: '#002244' }, // 파랑 (오른쪽)
    ]

    let time = 0

    const animate = () => {
      const width = canvas.width
      const height = canvas.height
      const stripeWidth = width / 3

      ctx.clearRect(0, 0, width, height)

      // 각 스트라이프 그리기 (파도 효과 적용)
      colors.forEach((color, index) => {
        const baseX = index * stripeWidth

        // 그라데이션 생성
        const gradient = ctx.createLinearGradient(0, 0, 0, height)
        gradient.addColorStop(0, color.start)
        gradient.addColorStop(1, color.end)
        ctx.fillStyle = gradient

        // 파도 경로 생성
        ctx.beginPath()

        // 상단 시작점
        const topWave1 = Math.sin(time * 2 + index * 0.5) * 15
        const topWave2 = Math.sin(time * 1.5 + index * 0.3) * 10
        ctx.moveTo(baseX + topWave1, 0)

        // 왼쪽 경계선 (파도 효과)
        for (let y = 0; y <= height; y += 20) {
          const waveOffset =
            Math.sin(time * 2 + y * 0.008 + index * 0.5) * 20 +
            Math.sin(time * 1.3 + y * 0.012 + index * 0.3) * 15 +
            Math.sin(time * 0.7 + y * 0.005) * 10
          ctx.lineTo(baseX + waveOffset, y)
        }

        // 하단 오른쪽으로
        const bottomWave1 = Math.sin(time * 2 + height * 0.008 + (index + 1) * 0.5) * 20
        const bottomWave2 = Math.sin(time * 1.3 + height * 0.012 + (index + 1) * 0.3) * 15
        ctx.lineTo(baseX + stripeWidth + bottomWave1 + bottomWave2, height)

        // 오른쪽 경계선 (파도 효과) - 역방향
        for (let y = height; y >= 0; y -= 20) {
          const waveOffset =
            Math.sin(time * 2 + y * 0.008 + (index + 1) * 0.5) * 20 +
            Math.sin(time * 1.3 + y * 0.012 + (index + 1) * 0.3) * 15 +
            Math.sin(time * 0.7 + y * 0.005) * 10
          ctx.lineTo(baseX + stripeWidth + waveOffset, y)
        }

        ctx.closePath()
        ctx.fill()
      })

      // 하이라이트/쉐도우 효과 (입체감)
      for (let y = 0; y < height; y += 4) {
        const shadowIntensity =
          (Math.sin(time * 2 + y * 0.01) * 0.5 + 0.5) * 0.15 +
          (Math.sin(time * 1.5 + y * 0.015) * 0.5 + 0.5) * 0.1

        ctx.fillStyle = `rgba(0, 0, 0, ${shadowIntensity})`
        ctx.fillRect(0, y, width, 4)
      }

      // 빛 반사 효과
      const lightGradient = ctx.createRadialGradient(
        width * 0.3 + Math.sin(time) * 50,
        height * 0.3 + Math.cos(time * 0.7) * 30,
        0,
        width * 0.3,
        height * 0.3,
        width * 0.6
      )
      lightGradient.addColorStop(0, 'rgba(255, 255, 255, 0.15)')
      lightGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.05)')
      lightGradient.addColorStop(1, 'transparent')
      ctx.fillStyle = lightGradient
      ctx.fillRect(0, 0, width, height)

      time += 0.02
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [active])

  if (!active) return null

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* 캔버스 기반 파도 애니메이션 */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* 오버레이 (콘텐츠 가독성을 위해) */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.5) 100%)',
        }}
      />

      {/* 상단 빛 효과 */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 animate-pulse-slow"
          style={{
            background: 'radial-gradient(ellipse at top center, rgba(255,255,255,0.25) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* 하단 그라데이션 (자연스러운 페이드) */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 100%)',
        }}
      />
    </div>
  )
}

export default TricolorBackground
