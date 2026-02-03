import { useEffect } from 'react'
import usePresentationStore from '../store/presentationStore'
import useSlideNavigation from '../hooks/useSlideNavigation'
import { usePresenterSync } from '../hooks/useSyncChannel'

// 발표자 컴포넌트
import Timer from '../components/presenter/Timer'
import PresenterNotes from '../components/presenter/PresenterNotes'
import SlidePreview from '../components/presenter/SlidePreview'
import ControlPanel from '../components/presenter/ControlPanel'

const PresenterView = () => {
  const { currentSlide, totalSlides, isPresenting } = usePresentationStore()

  // 키보드 네비게이션 활성화 (휠/터치는 비활성화)
  useSlideNavigation({
    enableWheel: false,
    enableKeyboard: true,
    enableTouch: false,
  })

  // 동기화 훅
  usePresenterSync()

  return (
    <div className="w-screen h-screen bg-gray-900 p-4 overflow-hidden">
      {/* 헤더 */}
      <header className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-bold text-white">
            発表者ビュー
          </h1>
          <p className="text-gray-400 text-sm">
            2026年 慶應義塾大学 合同新年会
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* 발표 상태 인디케이터 */}
          <div className={`
            flex items-center gap-2 px-4 py-2 rounded-full
            ${isPresenting
              ? 'bg-green-600/20 text-green-400'
              : 'bg-gray-700 text-gray-400'
            }
          `}>
            <span className={`w-2 h-2 rounded-full ${isPresenting ? 'bg-green-400 animate-pulse' : 'bg-gray-500'}`} />
            {isPresenting ? '発表中' : '待機中'}
          </div>

          {/* 청중 화면 열기 버튼 */}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-keio-blue hover:bg-keio-blue-light text-white rounded-lg text-sm transition-colors"
          >
            聴衆画面を開く ↗
          </a>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <div className="grid grid-cols-12 gap-4 h-[calc(100vh-120px)]">
        {/* 왼쪽: 슬라이드 미리보기 */}
        <div className="col-span-8 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4 flex-grow">
            {/* 현재 슬라이드 */}
            <div className="h-full">
              <SlidePreview
                slideIndex={currentSlide}
                label="現在のスライド"
                isCurrent={true}
              />
            </div>

            {/* 다음 슬라이드 */}
            <div className="h-full">
              <SlidePreview
                slideIndex={currentSlide + 1}
                label="次のスライド"
              />
            </div>
          </div>

          {/* 발표자 노트 */}
          <div className="h-48">
            <PresenterNotes />
          </div>
        </div>

        {/* 오른쪽: 컨트롤 패널 */}
        <div className="col-span-4 flex flex-col gap-4">
          {/* 타이머 */}
          <Timer />

          {/* 컨트롤 */}
          <div className="flex-grow">
            <ControlPanel />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PresenterView
