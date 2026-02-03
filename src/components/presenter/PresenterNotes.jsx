import { slidesData } from '../../data/slides'
import usePresentationStore from '../../store/presentationStore'

const PresenterNotes = () => {
  const { currentSlide } = usePresentationStore()
  const currentData = slidesData[currentSlide]

  return (
    <div className="bg-gray-800 rounded-xl p-4 h-full flex flex-col">
      <div className="text-gray-400 text-sm mb-2 flex items-center gap-2">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        発表者ノート
      </div>

      <div className="flex-grow overflow-y-auto">
        <p className="text-white text-lg leading-relaxed">
          {currentData?.notes || 'ノートがありません'}
        </p>
      </div>
    </div>
  )
}

export default PresenterNotes
