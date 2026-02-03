import usePresentationStore from '../../store/presentationStore'

const Navigation = ({ visible = true }) => {
  const { currentSlide, totalSlides, goToSlide } = usePresentationStore()

  if (!visible) return null

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-3">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <button
          key={index}
          onClick={() => goToSlide(index)}
          className={`
            w-3 h-3 rounded-full transition-all duration-300
            ${currentSlide === index
              ? 'bg-keio-yellow scale-125 shadow-lg'
              : 'bg-white/30 hover:bg-white/60 hover:scale-110'
            }
          `}
          style={{
            boxShadow: currentSlide === index
              ? '0 0 15px rgba(255, 215, 0, 0.5)'
              : 'none'
          }}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}

      {/* 슬라이드 카운터 */}
      <div className="mt-4 text-center text-white/60 text-sm font-light">
        <span className="text-white font-medium">{currentSlide + 1}</span>
        <span className="mx-1">/</span>
        <span>{totalSlides}</span>
      </div>
    </div>
  )
}

export default Navigation
