import SlideWrapper from './SlideWrapper'

const PrizeSlide = ({ index, data }) => {
  const getRankStyle = (rank) => {
    switch (rank) {
      case '大賞':
      case '特等':
        return 'bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 text-keio-blue-dark'
      case '1等':
        return 'bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 text-keio-blue-dark'
      case '2等':
        return 'bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-white'
      default:
        return 'bg-white/20 text-white'
    }
  }

  const getIcon = (rank) => {
    switch (rank) {
      case '大賞':
      case '特等':
        return '👑'
      case '1等':
        return '🥇'
      case '2等':
        return '🥈'
      case '3等':
        return '🥉'
      default:
        return '🎁'
    }
  }

  return (
    <SlideWrapper index={index}>
      <div className="w-full max-w-4xl">
        {/* 타이틀 */}
        <h2
          data-animate
          className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-center mb-4 text-glow"
        >
          {data.title}
        </h2>

        {/* 서브타이틀 */}
        {data.subtitle && (
          <p
            data-animate
            className="text-center text-keio-yellow text-2xl mb-8"
          >
            {data.subtitle}
          </p>
        )}

        <p
          data-animate
          className="text-center text-white/60 text-lg mb-12 animate-pulse"
        >
          ✨ 豪華賞品をゲットしよう！ ✨
        </p>

        {/* 경품 리스트 */}
        <div className="space-y-4">
          {data.prizes?.map((item, idx) => (
            <div
              key={idx}
              data-animate
              className={`
                relative flex items-center gap-4 md:gap-6 p-4 md:p-6 rounded-2xl
                backdrop-blur-custom border border-white/10
                hover:scale-[1.02] transition-all duration-300 group
                ${idx === 0 ? 'bg-gradient-to-r from-yellow-500/20 to-yellow-600/10' : 'bg-white/5'}
              `}
            >
              {/* 아이콘 */}
              <div className="text-4xl md:text-5xl">
                {getIcon(item.rank)}
              </div>

              {/* 등수 뱃지 */}
              <div
                className={`
                  flex-shrink-0 px-4 py-2 rounded-full font-bold text-lg md:text-xl
                  ${getRankStyle(item.rank)}
                `}
              >
                {item.rank}
              </div>

              {/* 경품명 */}
              <div className="flex-grow">
                <span className="text-xl md:text-2xl text-white group-hover:text-keio-yellow transition-colors">
                  {item.prize}
                </span>
              </div>

              {/* 대상 전용 특별 효과 */}
              {idx === 0 && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </SlideWrapper>
  )
}

export default PrizeSlide
