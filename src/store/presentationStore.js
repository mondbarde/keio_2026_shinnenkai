import { create } from 'zustand'

const usePresentationStore = create((set, get) => ({
  // 현재 슬라이드 인덱스
  currentSlide: 0,

  // 전체 슬라이드 수
  totalSlides: 12,

  // 애니메이션 진행 중 여부 (중복 전환 방지)
  isAnimating: false,

  // 발표 시작 시간
  startTime: null,

  // 발표 진행 중 여부
  isPresenting: false,

  // 슬라이드 이동
  goToSlide: (index) => {
    const { totalSlides, isAnimating } = get()
    if (isAnimating) return
    if (index < 0 || index >= totalSlides) return

    set({ currentSlide: index, isAnimating: true })

    // 애니메이션 완료 후 잠금 해제
    setTimeout(() => set({ isAnimating: false }), 800)
  },

  // 다음 슬라이드
  nextSlide: () => {
    const { currentSlide, totalSlides, goToSlide } = get()
    if (currentSlide < totalSlides - 1) {
      goToSlide(currentSlide + 1)
    }
  },

  // 이전 슬라이드
  prevSlide: () => {
    const { currentSlide, goToSlide } = get()
    if (currentSlide > 0) {
      goToSlide(currentSlide - 1)
    }
  },

  // 발표 시작
  startPresentation: () => {
    set({ isPresenting: true, startTime: Date.now(), currentSlide: 0 })
  },

  // 발표 종료
  endPresentation: () => {
    set({ isPresenting: false, startTime: null })
  },

  // 애니메이션 상태 설정
  setAnimating: (isAnimating) => set({ isAnimating }),
}))

export default usePresentationStore
