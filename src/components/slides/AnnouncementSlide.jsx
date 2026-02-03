import SlideWrapper from './SlideWrapper'

const AnnouncementSlide = ({ index, data }) => {
  const hasBothLanguages = data.messageKo && data.messageJa

  return (
    <SlideWrapper index={index}>
      <div className="w-full max-w-4xl text-center">
        {/* 타이틀 (일본어) */}
        <h1
          data-animate
          className={`text-4xl md:text-5xl lg:text-6xl font-display font-bold text-glow ${data.titleKo ? 'mb-2' : 'mb-12'}`}
        >
          {data.title}
        </h1>

        {/* 타이틀 (한국어) */}
        {data.titleKo && (
          <h2
            data-animate
            className="text-2xl md:text-3xl text-keio-yellow font-display mb-12"
          >
            {data.titleKo}
          </h2>
        )}

        {/* 메시지 박스 */}
        <div
          data-animate
          className="p-8 md:p-10 rounded-3xl backdrop-blur-custom bg-white/5 border border-white/10"
        >
          {/* 이미지 */}
          {data.image && (
            <div className="mb-6 flex justify-center">
              <img
                src={data.image}
                alt={data.title}
                className="max-h-64 md:max-h-80 w-auto rounded-xl shadow-lg object-contain"
              />
            </div>
          )}

          {/* 한국어 메시지 */}
          {data.messageKo && (
            <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8">
              {data.messageKo}
            </p>
          )}

          {/* 구분선 - 양쪽 언어 모두 있을 때만 표시 */}
          {hasBothLanguages && (
            <div className="flex items-center justify-center gap-4 my-6">
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-keio-yellow to-transparent" />
              <div className="w-2 h-2 bg-keio-yellow rounded-full" />
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-keio-yellow to-transparent" />
            </div>
          )}

          {/* 일본어 메시지 */}
          {data.messageJa && (
            <p className={`text-lg md:text-xl leading-relaxed ${hasBothLanguages ? 'text-white/80 font-light' : 'text-white/90'}`}>
              {data.messageJa}
            </p>
          )}

          {/* 주소 */}
          {data.address && (
            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-base md:text-lg text-keio-yellow/90 whitespace-pre-line">
                {data.address}
              </p>
            </div>
          )}
        </div>
      </div>
    </SlideWrapper>
  )
}

export default AnnouncementSlide
