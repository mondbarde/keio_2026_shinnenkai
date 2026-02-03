import SlideWrapper from './SlideWrapper'

const InfoSlide = ({ index, data }) => {
  return (
    <SlideWrapper index={index}>
      <div className="w-full max-w-4xl">
        {/* 타이틀 */}
        <h1
          data-animate
          className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-center mb-12 text-glow"
        >
          {data.title}
        </h1>

        {/* 정보 카드 */}
        <div className="space-y-6">
          {data.items?.map((item, idx) => (
            <div
              key={idx}
              data-animate
              className="p-6 md:p-8 rounded-2xl backdrop-blur-custom bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="flex items-start gap-6">
                {/* 아이콘 */}
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-keio-yellow/20 flex items-center justify-center">
                  <span className="text-keio-yellow text-xl font-bold">{idx + 1}</span>
                </div>

                {/* 콘텐츠 */}
                <div className="flex-grow">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-keio-yellow transition-colors">
                    {item.label}
                  </h3>
                  <p className="text-white/70 text-lg md:text-xl">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SlideWrapper>
  )
}

export default InfoSlide
