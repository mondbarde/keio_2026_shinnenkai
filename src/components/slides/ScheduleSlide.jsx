import SlideWrapper from './SlideWrapper'
import { slidesData } from '../../data/slides'

const ScheduleSlide = () => {
  const data = slidesData[2]

  return (
    <SlideWrapper index={2}>
      <div className="w-full max-w-4xl">
        {/* 타이틀 */}
        <h2
          data-animate
          className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-center mb-12 text-glow"
        >
          {data.title}
        </h2>

        {/* 스케줄 리스트 */}
        <div className="space-y-4">
          {data.items.map((item, index) => (
            <div
              key={index}
              data-animate
              className="flex items-center gap-6 p-4 md:p-6 rounded-xl backdrop-blur-custom bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group"
            >
              {/* 시간 */}
              <div className="flex-shrink-0 w-24 md:w-28">
                <span className="text-2xl md:text-3xl font-bold text-keio-yellow font-mono">
                  {item.time}
                </span>
              </div>

              {/* 구분선 */}
              <div className="w-0.5 h-12 bg-gradient-to-b from-keio-yellow via-keio-yellow to-transparent opacity-50" />

              {/* 이벤트명 */}
              <div className="flex-grow">
                <span className="text-xl md:text-2xl text-white group-hover:text-keio-yellow transition-colors">
                  {item.event}
                </span>
              </div>

              {/* 호버 시 표시되는 화살표 */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <svg
                  className="w-6 h-6 text-keio-yellow"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SlideWrapper>
  )
}

export default ScheduleSlide
