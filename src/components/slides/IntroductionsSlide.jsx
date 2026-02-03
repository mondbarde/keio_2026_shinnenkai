import SlideWrapper from './SlideWrapper'

const IntroductionsSlide = ({ index, data }) => {
  return (
    <SlideWrapper index={index}>
      <div className="w-full max-w-4xl">
        {/* 타이틀 */}
        <h1
          data-animate
          className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-center mb-4 text-glow"
        >
          {data.title}
        </h1>

        {/* 서브타이틀 */}
        {data.subtitle && (
          <p
            data-animate
            className="text-center text-keio-yellow text-xl md:text-2xl mb-12"
          >
            {data.subtitle}
          </p>
        )}

        {/* 카테고리 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.categories?.map((category, idx) => (
            <div
              key={idx}
              data-animate
              className="p-8 md:p-10 rounded-3xl backdrop-blur-custom bg-gradient-to-br from-white/10 to-white/5 border border-white/20 hover:border-keio-yellow/50 transition-all duration-500 group text-center"
            >
              {/* 아이콘 */}
              <div className="text-6xl mb-6">
                {idx === 0 ? '🎉' : '🎓'}
              </div>

              {/* 카테고리명 */}
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-keio-yellow transition-colors">
                {category.name}
              </h3>

              {/* 설명 */}
              <p className="text-white/70 text-lg">
                {category.description}
              </p>
            </div>
          ))}
        </div>

        {/* 안내 메시지 */}
        <p
          data-animate
          className="text-center text-white/50 text-lg mt-12"
        >
          お名前を呼ばれた方は、簡単に自己紹介をお願いいたします
        </p>
      </div>
    </SlideWrapper>
  )
}

export default IntroductionsSlide
