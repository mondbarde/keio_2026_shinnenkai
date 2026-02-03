import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import usePresentationStore from '../../store/presentationStore'

const SlideWrapper = ({ children, index, className = '' }) => {
  const slideRef = useRef(null)
  const contentRef = useRef(null)
  const { currentSlide } = usePresentationStore()

  const isActive = currentSlide === index
  const isPrev = currentSlide > index
  const isNext = currentSlide < index

  useEffect(() => {
    const slide = slideRef.current
    const content = contentRef.current
    if (!slide || !content) return

    if (isActive) {
      // 활성화 애니메이션
      gsap.fromTo(slide,
        {
          opacity: 0,
          scale: 0.9,
        },
        {
          duration: 0.8,
          opacity: 1,
          scale: 1,
          ease: 'power3.out',
        }
      )

      // 콘텐츠 등장 애니메이션
      const elements = content.querySelectorAll('[data-animate]')
      gsap.fromTo(elements,
        {
          opacity: 0,
          y: 50,
        },
        {
          duration: 0.6,
          opacity: 1,
          y: 0,
          stagger: 0.1,
          delay: 0.3,
          ease: 'power2.out',
        }
      )
    } else {
      // 비활성화
      gsap.to(slide, {
        duration: 0.5,
        opacity: 0,
        scale: isPrev ? 1.1 : 0.9,
        ease: 'power2.in',
      })
    }
  }, [isActive, isPrev])

  return (
    <div
      ref={slideRef}
      className={`
        absolute inset-0 w-full h-full
        flex items-center justify-center
        opacity-0
        ${className}
      `}
      style={{
        pointerEvents: isActive ? 'auto' : 'none',
        zIndex: isActive ? 10 : 0,
      }}
    >
      <div
        ref={contentRef}
        className="w-full h-full flex flex-col items-center justify-center px-8 md:px-16 lg:px-24"
      >
        {children}
      </div>
    </div>
  )
}

export default SlideWrapper
