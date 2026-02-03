import SlideWrapper from './SlideWrapper'
import { slidesData } from '../../data/slides'

const WelcomeSlide = () => {
  const data = slidesData[1]

  return (
    <SlideWrapper index={1}>
      <div className="text-center max-w-4xl">
        {/* 환영 타이틀 */}
        <h1
          data-animate
          className="text-6xl md:text-8xl lg:text-9xl font-display font-bold mb-8 text-glow"
        >
          {data.title}
        </h1>

        {/* 새해 인사 */}
        <p
          data-animate
          className="text-2xl md:text-3xl lg:text-4xl text-keio-yellow font-display mb-12"
        >
          {data.subtitle}
        </p>

        {/* 장식 이미지/아이콘 */}
        <div data-animate className="flex justify-center gap-8 mb-12">
          <span className="text-6xl">🎍</span>
          <span className="text-6xl animate-pulse">🎊</span>
          <span className="text-6xl">🎍</span>
        </div>

        {/* 환영 메시지 */}
        <p
          data-animate
          className="text-xl md:text-2xl text-white/80 font-light leading-relaxed"
        >
          {data.message}
        </p>
      </div>
    </SlideWrapper>
  )
}

export default WelcomeSlide
