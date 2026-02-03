import SlideWrapper from './SlideWrapper'

const SponsorSlide = ({ index, data }) => {
  // 다중 스폰서 모드 (sponsors 배열이 있는 경우)
  const isMultiSponsor = data.sponsors && data.sponsors.length > 0

  return (
    <SlideWrapper index={index}>
      <div className="text-center max-w-5xl">
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
            className="text-xl md:text-2xl text-keio-yellow font-display mb-8"
          >
            {data.subtitle}
          </h2>
        )}

        {/* 다중 스폰서 모드 */}
        {isMultiSponsor ? (
          <div
            data-animate
            className="p-6 md:p-8 rounded-3xl backdrop-blur-custom bg-white/5 border border-white/10"
          >
            <div className="space-y-4">
              {data.sponsors.map((sponsor, idx) => (
                <div
                  key={idx}
                  className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 py-3 border-b border-white/10 last:border-b-0"
                >
                  <div className="flex-shrink-0 md:w-1/3">
                    <p className="text-base md:text-lg font-bold text-white">
                      {sponsor.name}
                    </p>
                    <p className="text-sm text-keio-yellow/80">
                      {sponsor.graduation}
                    </p>
                  </div>
                  <div className="flex-grow md:w-2/3 text-left">
                    <p className="text-base md:text-lg text-white/90">
                      {sponsor.prize}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* 단일 스폰서 모드 */
          <div
            data-animate
            className="p-8 md:p-10 rounded-3xl backdrop-blur-custom bg-white/5 border border-white/10"
          >
            {/* 로고 */}
            {data.logo && (
              <div className="mb-6 flex justify-center">
                <img
                  src={data.logo}
                  alt="Sponsor Logo"
                  className="h-40 md:h-48 w-auto object-contain"
                />
              </div>
            )}

            {/* 스폰서 이름 */}
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-white mb-2">
              {data.sponsorName}
            </h3>

            {/* 졸업 정보 */}
            {data.graduation && (
              <p className="text-lg md:text-xl text-keio-yellow mb-8">
                {data.graduation}
              </p>
            )}

            {/* 장식선 */}
            <div className="flex items-center justify-center gap-4 my-8">
              <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-keio-yellow to-transparent" />
              <div className="w-2 h-2 bg-keio-yellow rounded-full" />
              <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-keio-yellow to-transparent" />
            </div>

            {/* 직책 목록 */}
            {data.positions && data.positions.length > 0 && (
              <ul className="space-y-3 text-left max-w-2xl mx-auto">
                {data.positions.map((position, idx) => (
                  <li
                    key={idx}
                    className="text-lg md:text-xl text-white/90 flex items-start"
                  >
                    <span className="text-keio-yellow mr-3">•</span>
                    <span>{position}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </SlideWrapper>
  )
}

export default SponsorSlide
