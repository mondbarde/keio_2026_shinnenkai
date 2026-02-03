import { useState, useRef } from 'react'
import SlideWrapper from './SlideWrapper'
import PenMark from '../ui/PenMark'

// 불꽃 파티클 컴포넌트 (크기별로 다른 스타일)
const FlameParticle = ({ delay, left, size, duration, type = 'normal' }) => {
  const colors = type === 'bright'
    ? 'radial-gradient(ellipse at bottom, #ffff00 0%, #ff6b35 20%, #ff4500 50%, transparent 100%)'
    : type === 'hot'
    ? 'radial-gradient(ellipse at bottom, #ffffff 0%, #ffff00 15%, #ff6b35 40%, #ff4500 70%, transparent 100%)'
    : 'radial-gradient(ellipse at bottom, #ff6b35 0%, #f7931e 30%, #ff4500 60%, transparent 100%)'

  return (
    <div
      className={`absolute bottom-0 ${type === 'hot' ? 'animate-flame-fast' : type === 'bright' ? 'animate-flame-high' : 'animate-flame'}`}
      style={{
        left: `${left}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
      }}
    >
      <div
        className="rounded-full"
        style={{
          width: `${size}px`,
          height: `${size * 2}px`,
          background: colors,
          filter: type === 'hot' ? 'blur(3px)' : 'blur(2px)',
        }}
      />
    </div>
  )
}

const SongSlide = ({ index, data }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleEnded = () => {
    setIsPlaying(false)
  }

  // 불꽃 파티클 생성 (다양한 타입으로)
  const flames = Array.from({ length: 60 }, (_, i) => {
    const typeRandom = Math.random()
    const type = typeRandom < 0.3 ? 'hot' : typeRandom < 0.6 ? 'bright' : 'normal'
    return {
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 3,
      size: type === 'hot' ? 25 + Math.random() * 35 : type === 'bright' ? 20 + Math.random() * 30 : 15 + Math.random() * 25,
      duration: type === 'hot' ? 1.2 + Math.random() * 1 : type === 'bright' ? 2 + Math.random() * 1.5 : 1.5 + Math.random() * 1.5,
      type,
    }
  })

  return (
    <SlideWrapper index={index}>
      {/* 불꽃 효과 오버레이 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
        {/* 하단 불꽃 그라데이션 - 높이 증가 */}
        <div
          className="absolute bottom-0 left-0 right-0 h-80 animate-pulse-slow"
          style={{
            background: 'linear-gradient(to top, rgba(255,69,0,0.5) 0%, rgba(255,140,0,0.3) 30%, rgba(255,200,0,0.15) 60%, transparent 100%)',
          }}
        />
        {/* 중앙 불꽃 기둥 - 가장 높이 타오름 */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-64 h-full animate-pulse-slow"
          style={{
            background: 'linear-gradient(to top, rgba(255,100,0,0.4) 0%, rgba(255,150,0,0.2) 30%, rgba(255,200,0,0.1) 50%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        {/* 불꽃 파티클들 */}
        {flames.map((flame) => (
          <FlameParticle key={flame.id} {...flame} />
        ))}
        {/* 좌우 불꽃 기둥 - 높이와 너비 증가 */}
        <div className="absolute left-0 bottom-0 w-48 h-[80vh] animate-flame-pillar-left"
          style={{
            background: 'linear-gradient(to top, rgba(255,69,0,0.7) 0%, rgba(255,140,0,0.4) 30%, rgba(255,180,0,0.2) 60%, transparent 100%)',
            filter: 'blur(25px)',
          }}
        />
        <div className="absolute right-0 bottom-0 w-48 h-[80vh] animate-flame-pillar-right"
          style={{
            background: 'linear-gradient(to top, rgba(255,69,0,0.7) 0%, rgba(255,140,0,0.4) 30%, rgba(255,180,0,0.2) 60%, transparent 100%)',
            filter: 'blur(25px)',
          }}
        />
        {/* 추가 불꽃 기둥들 - 좌우 안쪽 */}
        <div className="absolute left-[15%] bottom-0 w-32 h-[60vh] animate-flame-pillar-right"
          style={{
            background: 'linear-gradient(to top, rgba(255,80,0,0.5) 0%, rgba(255,120,0,0.3) 40%, transparent 100%)',
            filter: 'blur(20px)',
          }}
        />
        <div className="absolute right-[15%] bottom-0 w-32 h-[60vh] animate-flame-pillar-left"
          style={{
            background: 'linear-gradient(to top, rgba(255,80,0,0.5) 0%, rgba(255,120,0,0.3) 40%, transparent 100%)',
            filter: 'blur(20px)',
          }}
        />
      </div>

      <div className="text-center max-w-4xl relative z-20">
        {/* 펜마크 로고 */}
        <div data-animate className="flex justify-center mb-6">
          <PenMark size={80} color="#FFD700" className="animate-pulse" />
        </div>

        {/* 타이틀 */}
        <h1
          data-animate
          className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-2 text-glow"
        >
          {data.title}
        </h1>

        {/* 서브타이틀 */}
        {data.subtitle && (
          <h2
            data-animate
            className="text-2xl md:text-3xl text-keio-yellow font-display mb-8"
          >
            {data.subtitle}
          </h2>
        )}

        {/* 오디오 플레이어 */}
        <div data-animate className="mb-8">
          <audio
            ref={audioRef}
            src="https://www.keio.ac.jp/ja/assets/download/about/learn-more/college-songs/index/02.mp3"
            onEnded={handleEnded}
          />
          <button
            onClick={togglePlay}
            className={`
              px-8 py-4 rounded-full text-xl font-bold transition-all duration-300
              flex items-center gap-3 mx-auto
              ${isPlaying
                ? 'bg-red-500/80 hover:bg-red-500 text-white shadow-lg shadow-red-500/30'
                : 'bg-keio-yellow hover:bg-yellow-400 text-keio-blue-dark shadow-lg shadow-keio-yellow/30'
              }
            `}
          >
            {isPlaying ? (
              <>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
                <span>一時停止</span>
              </>
            ) : (
              <>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                <span>音楽再生</span>
              </>
            )}
          </button>
        </div>

        {/* 가사 */}
        <div
          data-animate
          className="p-8 md:p-12 rounded-3xl backdrop-blur-custom bg-white/5 border border-white/10"
        >
          <div className="space-y-4">
            {data.lyrics?.map((line, idx) => (
              <p
                key={idx}
                className="text-xl md:text-2xl lg:text-3xl text-white font-display leading-relaxed"
              >
                {line}
              </p>
            ))}
          </div>
        </div>

        {/* 하단 장식 */}
        <div data-animate className="mt-8 flex items-center justify-center gap-4">
          <span className="text-4xl">🎵</span>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-keio-yellow to-transparent" />
          <span className="text-keio-yellow text-xl font-display">慶應義塾</span>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-keio-yellow to-transparent" />
          <span className="text-4xl">🎵</span>
        </div>
      </div>
    </SlideWrapper>
  )
}

export default SongSlide
