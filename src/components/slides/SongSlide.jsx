import SlideWrapper from './SlideWrapper'

const SongSlide = ({ index, data }) => {
  return (
    <SlideWrapper index={index}>
      <div className="text-center max-w-4xl">
        {/* 음표 아이콘 */}
        <div data-animate className="text-6xl mb-6 animate-pulse">
          🎵
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
            className="text-2xl md:text-3xl text-keio-yellow font-display mb-12"
          >
            {data.subtitle}
          </h2>
        )}

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
