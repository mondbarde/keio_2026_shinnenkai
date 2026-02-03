import SlideWrapper from './SlideWrapper'

const PhotoSlide = ({ index, data }) => {
  return (
    <SlideWrapper index={index}>
      <div className="text-center max-w-4xl">
        {/* 카메라 아이콘 */}
        <div data-animate className="text-8xl mb-8 animate-bounce">
          📸
        </div>

        {/* 타이틀 */}
        <h1
          data-animate
          className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-8 text-glow"
        >
          {data.title}
        </h1>

        {/* 메시지 */}
        <p
          data-animate
          className="text-2xl md:text-3xl lg:text-4xl text-keio-yellow font-display mb-12"
        >
          {data.message}
        </p>

        {/* 안내 박스 */}
        <div
          data-animate
          className="inline-block px-8 py-6 rounded-2xl backdrop-blur-custom bg-white/10 border border-white/20"
        >
          <p className="text-white/80 text-xl md:text-2xl">
            {data.instruction}
          </p>
        </div>

        {/* 하단 장식 */}
        <div data-animate className="mt-16 flex items-center justify-center gap-6">
          <div className="w-16 h-16 rounded-full bg-keio-yellow/20 flex items-center justify-center animate-pulse">
            <span className="text-3xl">✨</span>
          </div>
          <div className="w-16 h-16 rounded-full bg-keio-yellow/20 flex items-center justify-center animate-pulse" style={{ animationDelay: '0.3s' }}>
            <span className="text-3xl">📷</span>
          </div>
          <div className="w-16 h-16 rounded-full bg-keio-yellow/20 flex items-center justify-center animate-pulse" style={{ animationDelay: '0.6s' }}>
            <span className="text-3xl">✨</span>
          </div>
        </div>
      </div>
    </SlideWrapper>
  )
}

export default PhotoSlide
