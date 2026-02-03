import SlideWrapper from './SlideWrapper'
import { slidesData } from '../../data/slides'
import PenMark from '../ui/PenMark'

const ClosingSlide = () => {
  // 마지막 슬라이드 (closing 타입) 찾기
  const closingIndex = slidesData.findIndex(slide => slide.id === 'closing')
  const data = slidesData[closingIndex]

  return (
    <SlideWrapper index={closingIndex}>
      <div className="text-center w-full flex flex-col items-center">
        {/* 메인 타이틀 - 전체 너비 사용 */}
        <h1
          data-animate
          className="font-display font-bold mb-12 text-glow whitespace-nowrap"
          style={{ fontSize: 'clamp(1.5rem, 6vw, 5rem)' }}
        >
          {data.title}
        </h1>

        {/* 감사 메시지 */}
        <p
          data-animate
          className="text-xl md:text-2xl lg:text-3xl text-white/90 font-light leading-relaxed mb-12 whitespace-pre-line max-w-4xl px-4"
        >
          {data.message}
        </p>

        {/* 장식 */}
        <div data-animate className="flex items-center justify-center gap-4 mb-12">
          <span className="text-4xl">🎍</span>
          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-keio-yellow to-transparent" />
          <span className="text-4xl animate-pulse">🌅</span>
          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-keio-yellow to-transparent" />
          <span className="text-4xl">🎍</span>
        </div>

        {/* 새해 인사 */}
        <p
          data-animate
          className="text-lg md:text-xl text-keio-yellow font-display whitespace-nowrap px-4"
          style={{ fontSize: 'clamp(0.875rem, 3vw, 1.25rem)' }}
        >
          {data.footer}
        </p>

        {/* 慶應義塾大学 로고 및 텍스트 */}
        <div data-animate className="mt-16 flex flex-col items-center">
          <PenMark size={60} color="#FFD700" className="mb-4 opacity-70" />
          <p className="text-2xl md:text-3xl font-display tracking-widest opacity-60">
            慶應義塾大学
          </p>
          <p className="text-lg text-white/50 mt-2">
            Keio University
          </p>
        </div>
      </div>
    </SlideWrapper>
  )
}

export default ClosingSlide
