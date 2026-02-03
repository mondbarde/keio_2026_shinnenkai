import usePresentationStore from '../../store/presentationStore'
import { usePresenterSync } from '../../hooks/useSyncChannel'

const ControlPanel = () => {
  const {
    currentSlide,
    totalSlides,
    nextSlide,
    prevSlide,
    goToSlide,
    isPresenting,
    startPresentation,
    endPresentation,
  } = usePresentationStore()

  const { broadcastStart, broadcastEnd } = usePresenterSync()

  const handleStart = () => {
    startPresentation()
    broadcastStart()
  }

  const handleEnd = () => {
    endPresentation()
    broadcastEnd()
  }

  return (
    <div className="bg-gray-800 rounded-xl p-4">
      <div className="text-gray-400 text-sm mb-3">コントロール</div>

      {/* 발표 시작/종료 버튼 */}
      <div className="mb-4">
        {!isPresenting ? (
          <button
            onClick={handleStart}
            className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clipRule="evenodd"
              />
            </svg>
            発表開始
          </button>
        ) : (
          <button
            onClick={handleEnd}
            className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z"
                clipRule="evenodd"
              />
            </svg>
            発表終了
          </button>
        )}
      </div>

      {/* 슬라이드 네비게이션 */}
      <div className="flex items-center gap-3">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-600 text-white rounded-lg font-bold transition-colors flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          前へ
        </button>

        <button
          onClick={nextSlide}
          disabled={currentSlide === totalSlides - 1}
          className="flex-1 py-3 bg-keio-blue hover:bg-keio-blue-light disabled:bg-gray-800 disabled:text-gray-600 text-white rounded-lg font-bold transition-colors flex items-center justify-center gap-2"
        >
          次へ
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* 슬라이드 점프 */}
      <div className="mt-4">
        <div className="text-gray-400 text-xs mb-2">スライドジャンプ</div>
        <div className="flex gap-2 flex-wrap">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`
                w-10 h-10 rounded-lg font-bold transition-all
                ${currentSlide === index
                  ? 'bg-keio-yellow text-keio-blue-dark'
                  : 'bg-gray-700 hover:bg-gray-600 text-white'
                }
              `}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* 키보드 단축키 안내 */}
      <div className="mt-4 pt-4 border-t border-gray-700">
        <div className="text-gray-500 text-xs space-y-1">
          <p>← → : スライド移動</p>
          <p>Space / Enter : 次へ</p>
          <p>Home / End : 最初 / 最後</p>
        </div>
      </div>
    </div>
  )
}

export default ControlPanel
