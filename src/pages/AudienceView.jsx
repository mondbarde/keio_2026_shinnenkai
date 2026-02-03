import useSlideNavigation from '../hooks/useSlideNavigation'
import { useAudienceSync } from '../hooks/useSyncChannel'
import usePresentationStore from '../store/presentationStore'
import { slidesData } from '../data/slides'

// 이펙트 컴포넌트
import GradientBackground from '../components/effects/GradientBackground'
import ParticleBackground from '../components/effects/ParticleBackground'
import Fireworks from '../components/effects/Fireworks'
import MouseFollower from '../components/effects/MouseFollower'

// UI 컴포넌트
import Navigation from '../components/ui/Navigation'

// 슬라이드 컴포넌트
import OpeningSlide from '../components/slides/OpeningSlide'
import SpeechSlide from '../components/slides/SpeechSlide'
import VideoSlide from '../components/slides/VideoSlide'
import InfoSlide from '../components/slides/InfoSlide'
import ToastSlide from '../components/slides/ToastSlide'
import PrizeSlide from '../components/slides/PrizeSlide'
import IntroductionsSlide from '../components/slides/IntroductionsSlide'
import SongSlide from '../components/slides/SongSlide'
import PhotoSlide from '../components/slides/PhotoSlide'
import ClosingSlide from '../components/slides/ClosingSlide'

const AudienceView = () => {
  // 슬라이드 네비게이션 훅
  useSlideNavigation({
    enableWheel: true,
    enableKeyboard: true,
    enableTouch: true,
  })

  // 발표자와 동기화
  useAudienceSync()

  const { currentSlide } = usePresentationStore()

  // 슬라이드별 이펙트 설정
  const showFireworks = currentSlide === 0 || currentSlide === 9 || currentSlide === 11 // 오프닝, 와카키치, 폐회
  const gradientVariant = currentSlide === 6 ? 'gold' : currentSlide === 11 ? 'celebration' : 'default'

  // 슬라이드 타입에 따른 컴포넌트 렌더링
  const renderSlide = (data, index) => {
    switch (data.type) {
      case 'opening':
        return <OpeningSlide key={data.id} />
      case 'speech':
        return <SpeechSlide key={data.id} index={index} data={data} />
      case 'video':
        return <VideoSlide key={data.id} index={index} data={data} />
      case 'info':
        return <InfoSlide key={data.id} index={index} data={data} />
      case 'toast':
        return <ToastSlide key={data.id} index={index} data={data} />
      case 'prize':
        return <PrizeSlide key={data.id} index={index} data={data} />
      case 'introductions':
        return <IntroductionsSlide key={data.id} index={index} data={data} />
      case 'song':
        return <SongSlide key={data.id} index={index} data={data} />
      case 'photo':
        return <PhotoSlide key={data.id} index={index} data={data} />
      case 'closing':
        return <ClosingSlide key={data.id} />
      default:
        return null
    }
  }

  return (
    <div className="w-screen h-screen overflow-hidden relative">
      {/* 배경 이펙트 */}
      <GradientBackground variant={gradientVariant} />
      <ParticleBackground particleCount={40} />
      <Fireworks active={showFireworks} intensity="medium" />
      <MouseFollower enabled={true} />

      {/* 메인 슬라이드 컨테이너 */}
      <main className="relative z-20 w-full h-full">
        {slidesData.map((data, index) => renderSlide(data, index))}
      </main>

      {/* 네비게이션 */}
      <Navigation visible={true} />

      {/* 하단 정보 */}
      <footer className="fixed bottom-4 left-4 z-30 text-white/30 text-sm">
        <p>2026年 慶應義塾大学 合同新年会</p>
      </footer>
    </div>
  )
}

export default AudienceView
