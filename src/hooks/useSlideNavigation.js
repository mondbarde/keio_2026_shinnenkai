import { useEffect, useCallback, useRef } from 'react'
import usePresentationStore from '../store/presentationStore'

const useSlideNavigation = (options = {}) => {
  const {
    enableWheel = true,
    enableKeyboard = true,
    enableTouch = true,
    wheelThreshold = 50,
    debounceTime = 100,
  } = options

  const { nextSlide, prevSlide, currentSlide, isAnimating } = usePresentationStore()

  const lastWheelTime = useRef(0)
  const touchStartY = useRef(0)
  const accumulatedDelta = useRef(0)

  // 휠 이벤트 핸들러
  const handleWheel = useCallback((e) => {
    if (isAnimating) return

    const now = Date.now()
    if (now - lastWheelTime.current < debounceTime) {
      accumulatedDelta.current += e.deltaY
    } else {
      accumulatedDelta.current = e.deltaY
    }
    lastWheelTime.current = now

    if (Math.abs(accumulatedDelta.current) > wheelThreshold) {
      if (accumulatedDelta.current > 0) {
        nextSlide()
      } else {
        prevSlide()
      }
      accumulatedDelta.current = 0
    }
  }, [nextSlide, prevSlide, isAnimating, wheelThreshold, debounceTime])

  // 키보드 이벤트 핸들러
  const handleKeyDown = useCallback((e) => {
    if (isAnimating) return

    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowRight':
      case ' ':
      case 'Enter':
      case 'PageDown':
        e.preventDefault()
        nextSlide()
        break
      case 'ArrowUp':
      case 'ArrowLeft':
      case 'PageUp':
        e.preventDefault()
        prevSlide()
        break
      case 'Home':
        e.preventDefault()
        usePresentationStore.getState().goToSlide(0)
        break
      case 'End':
        e.preventDefault()
        const total = usePresentationStore.getState().totalSlides
        usePresentationStore.getState().goToSlide(total - 1)
        break
      default:
        break
    }
  }, [nextSlide, prevSlide, isAnimating])

  // 터치 이벤트 핸들러
  const handleTouchStart = useCallback((e) => {
    touchStartY.current = e.touches[0].clientY
  }, [])

  const handleTouchEnd = useCallback((e) => {
    if (isAnimating) return

    const touchEndY = e.changedTouches[0].clientY
    const diff = touchStartY.current - touchEndY

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide()
      } else {
        prevSlide()
      }
    }
  }, [nextSlide, prevSlide, isAnimating])

  // 이벤트 리스너 등록/해제
  useEffect(() => {
    if (enableWheel) {
      window.addEventListener('wheel', handleWheel, { passive: false })
    }
    if (enableKeyboard) {
      window.addEventListener('keydown', handleKeyDown)
    }
    if (enableTouch) {
      window.addEventListener('touchstart', handleTouchStart)
      window.addEventListener('touchend', handleTouchEnd)
    }

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [
    enableWheel, enableKeyboard, enableTouch,
    handleWheel, handleKeyDown, handleTouchStart, handleTouchEnd
  ])

  return {
    currentSlide,
    nextSlide,
    prevSlide,
  }
}

export default useSlideNavigation
