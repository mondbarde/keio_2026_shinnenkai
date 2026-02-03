import SlideWrapper from './SlideWrapper'
import { slidesData } from '../../data/slides'

const GroupsSlide = () => {
  const data = slidesData[3]

  return (
    <SlideWrapper index={3}>
      <div className="w-full max-w-5xl">
        {/* 타이틀 */}
        <h2
          data-animate
          className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-center mb-12 text-glow"
        >
          {data.title}
        </h2>

        {/* 그룹 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.groups.map((group, index) => (
            <div
              key={index}
              data-animate
              className="relative p-6 md:p-8 rounded-2xl backdrop-blur-custom bg-white/5 border border-white/10 hover:border-keio-yellow/50 transition-all duration-500 group overflow-hidden"
            >
              {/* 배경 글로우 효과 */}
              <div className="absolute inset-0 bg-gradient-to-br from-keio-yellow/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* 넘버링 */}
              <div className="absolute top-4 right-4 text-6xl font-bold text-white/5 group-hover:text-keio-yellow/20 transition-colors">
                {String(index + 1).padStart(2, '0')}
              </div>

              {/* 콘텐츠 */}
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-keio-yellow transition-colors">
                  {group.name}
                </h3>
                <p className="text-white/70 text-lg">
                  {group.description}
                </p>
              </div>

              {/* 하단 장식선 */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-keio-yellow to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </SlideWrapper>
  )
}

export default GroupsSlide
