import { useState, useRef } from 'react'
import SlideWrapper from './SlideWrapper'
import PenMark from '../ui/PenMark'

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

  return (
    <SlideWrapper index={index}>
      <div className="text-center max-w-4xl">
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
