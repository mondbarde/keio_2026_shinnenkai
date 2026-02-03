import SlideWrapper from './SlideWrapper'
import { slidesData } from '../../data/slides'
import PenMark from '../ui/PenMark'

const OpeningSlide = () => {
  const data = slidesData[0]

  return (
    <SlideWrapper index={0}>
      <div className="text-center w-full px-4">
        {/* 펜마크 로고 */}
        <div data-animate className="flex justify-center mb-8">
          <PenMark size={100} color="#FFD700" className="drop-shadow-lg" />
        </div>

        {/* 메인 타이틀 */}
        <h1
          data-animate
          className="whitespace-nowrap font-display font-bold mb-6 text-glow"
          style={{ fontSize: 'clamp(1.5rem, 8vw, 6rem)' }}
        >
          {data.title}
        </h1>

        {/* 서브타이틀 */}
        <h2
          data-animate
          className="whitespace-nowrap font-display text-keio-yellow text-glow-gold mb-12"
          style={{ fontSize: 'clamp(1.2rem, 6vw, 4rem)' }}
        >
          {data.subtitle}
        </h2>

        {/* 장식선 */}
        <div data-animate className="flex items-center justify-center gap-4 mb-12">
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-keio-yellow to-transparent" />
          <div className="w-3 h-3 bg-keio-yellow rounded-full animate-pulse-glow" />
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-keio-yellow to-transparent" />
        </div>

        {/* 날짜 & 장소 */}
        <div data-animate className="space-y-4">
          <p className="text-xl md:text-2xl text-white/90 font-light tracking-wider">
            {data.date}
          </p>
          <p className="text-lg md:text-xl text-white/70 font-light">
            {data.venue}
          </p>
        </div>

        {/* 장식 요소 */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2">
          <div data-animate className="flex flex-col items-center animate-bounce">
            <span className="text-white/50 text-sm mb-2">Scroll</span>
            <svg
              className="w-6 h-6 text-white/50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>
    </SlideWrapper>
  )
}

export default OpeningSlide
