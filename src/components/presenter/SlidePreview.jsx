import { slidesData } from '../../data/slides'

const SlidePreview = ({ slideIndex, label = '', isCurrent = false }) => {
  const data = slidesData[slideIndex]

  if (!data) {
    return (
      <div className="bg-gray-800 rounded-xl p-4">
        <div className="text-gray-400 text-sm mb-2">{label}</div>
        <div className="aspect-video bg-gray-700 rounded-lg flex items-center justify-center">
          <span className="text-gray-500">No slide</span>
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-gray-800 rounded-xl p-4 ${isCurrent ? 'ring-2 ring-keio-yellow' : ''}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-400 text-sm">{label}</span>
        <span className="text-gray-500 text-xs">
          {slideIndex + 1} / {slidesData.length}
        </span>
      </div>

      <div className="aspect-video bg-gradient-to-br from-keio-blue to-keio-blue-dark rounded-lg overflow-hidden relative">
        {/* 슬라이드 미리보기 콘텐츠 */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
          <h3 className="text-white font-bold text-lg md:text-xl mb-2 line-clamp-2">
            {data.title}
          </h3>
          {data.subtitle && (
            <p className="text-keio-yellow text-sm">
              {data.subtitle}
            </p>
          )}

          {/* 슬라이드 타입 뱃지 */}
          <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/30 rounded text-xs text-white/70">
            {data.type}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SlidePreview
