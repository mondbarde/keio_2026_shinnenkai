import SlideWrapper from './SlideWrapper'
import { slidesData } from '../../data/slides'

const EventSlide = () => {
  const data = slidesData[4]

  return (
    <SlideWrapper index={4}>
      <div className="w-full max-w-4xl">
        {/* 타이틀 */}
        <h2
          data-animate
          className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-center mb-4 text-glow"
        >
          {data.title}
        </h2>

        {/* 서브 텍스트 */}
        <p
          data-animate
          className="text-center text-white/60 text-lg mb-12"
        >
          Let's enjoy together!
        </p>

        {/* 이벤트 카드 */}
        <div className="space-y-8">
          {data.events.map((event, index) => (
            <div
              key={index}
              data-animate
              className="relative p-8 md:p-10 rounded-3xl backdrop-blur-custom bg-gradient-to-r from-white/10 to-white/5 border border-white/20 hover:from-white/15 hover:to-white/10 transition-all duration-500 group"
            >
              {/* 아이콘 */}
              <div className="absolute -top-6 left-8 w-12 h-12 bg-keio-yellow rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                <span className="text-2xl">{index === 0 ? '🎮' : '🎭'}</span>
              </div>

              {/* 콘텐츠 */}
              <div className="mt-4">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-keio-yellow transition-colors">
                  {event.name}
                </h3>
                <p className="text-white/70 text-lg md:text-xl leading-relaxed">
                  {event.description}
                </p>
              </div>

              {/* 장식 요소 */}
              <div className="absolute top-1/2 right-8 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-16 h-16 border-2 border-keio-yellow/30 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-keio-yellow"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SlideWrapper>
  )
}

export default EventSlide
