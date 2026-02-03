import SlideWrapper from './SlideWrapper'

const VideoSlide = ({ index, data }) => {
  return (
    <SlideWrapper index={index}>
      <div className="text-center max-w-4xl">
        {/* 타이틀 */}
        <h1
          data-animate
          className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 text-glow"
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

        {/* 비디오 플레이스홀더 */}
        <div
          data-animate
          className="relative w-full max-w-3xl mx-auto aspect-video bg-black/50 rounded-2xl border-2 border-white/20 overflow-hidden mb-8"
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {/* 재생 아이콘 */}
            <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center mb-4 animate-pulse">
              <svg
                className="w-12 h-12 text-white ml-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <p className="text-white/60 text-lg">映像再生中</p>
          </div>
        </div>

        {/* 설명 */}
        <p
          data-animate
          className="text-xl md:text-2xl text-white/70 font-light"
        >
          {data.description}
        </p>
      </div>
    </SlideWrapper>
  )
}

export default VideoSlide
