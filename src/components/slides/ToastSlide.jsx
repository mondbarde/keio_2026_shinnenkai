import SlideWrapper from './SlideWrapper'

const ToastSlide = ({ index, data }) => {
  return (
    <SlideWrapper index={index}>
      <div className="text-center max-w-4xl">
        {/* 건배 아이콘 */}
        <div data-animate className="text-8xl mb-8">
          🥂
        </div>

        {/* 타이틀 */}
        <h1
          data-animate
          className="text-6xl md:text-7xl lg:text-8xl font-display font-bold mb-4 text-glow-gold text-keio-yellow"
        >
          {data.title}
        </h1>

        {/* 서브타이틀 */}
        {data.subtitle && (
          <h2
            data-animate
            className="text-2xl md:text-3xl text-white/80 font-display mb-12"
          >
            {data.subtitle}
          </h2>
        )}

        {/* 메시지 */}
        <p
          data-animate
          className="text-xl md:text-2xl lg:text-3xl text-white/90 font-light leading-relaxed whitespace-pre-line mb-12"
        >
          {data.message}
        </p>

        {/* 건배 발성자 */}
        {data.caller && (
          <div
            data-animate
            className="inline-block px-8 py-4 rounded-full bg-keio-yellow/20 border border-keio-yellow/50"
          >
            <span className="text-keio-yellow text-xl md:text-2xl font-display">
              {data.caller}
            </span>
          </div>
        )}
      </div>
    </SlideWrapper>
  )
}

export default ToastSlide
