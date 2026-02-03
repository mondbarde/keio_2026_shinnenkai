import SlideWrapper from './SlideWrapper'

const SpeechSlide = ({ index, data }) => {
  return (
    <SlideWrapper index={index}>
      <div className="text-center max-w-4xl">
        {/* 타이틀 */}
        <h1
          data-animate
          className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-8 text-glow"
        >
          {data.title}
        </h1>

        {/* 발표자 */}
        {data.speaker && (
          <div data-animate className="mb-12">
            <span className="text-keio-yellow text-2xl md:text-3xl font-display">
              {data.speaker}
            </span>
          </div>
        )}

        {/* 장식선 */}
        <div data-animate className="flex items-center justify-center gap-4 mb-12">
          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-keio-yellow to-transparent" />
          <div className="w-3 h-3 bg-keio-yellow rounded-full animate-pulse-glow" />
          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-keio-yellow to-transparent" />
        </div>

        {/* 메시지 */}
        <p
          data-animate
          className="text-xl md:text-2xl lg:text-3xl text-white/90 font-light leading-relaxed whitespace-pre-line"
        >
          {data.message}
        </p>
      </div>
    </SlideWrapper>
  )
}

export default SpeechSlide
