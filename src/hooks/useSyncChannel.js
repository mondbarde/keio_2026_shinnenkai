import { useEffect, useCallback } from 'react'
import syncChannel, { SYNC_EVENTS } from '../utils/syncChannel'
import usePresentationStore from '../store/presentationStore'

// 발표자 모드용 훅 (메시지 전송)
export const usePresenterSync = () => {
  const { currentSlide, isPresenting } = usePresentationStore()

  useEffect(() => {
    syncChannel.init()

    return () => {
      syncChannel.close()
    }
  }, [])

  // 슬라이드 변경 시 동기화 메시지 전송
  useEffect(() => {
    syncChannel.send(SYNC_EVENTS.SLIDE_CHANGE, { slideIndex: currentSlide })
  }, [currentSlide])

  // 발표 시작 알림
  const broadcastStart = useCallback(() => {
    syncChannel.send(SYNC_EVENTS.START_PRESENTATION, { startTime: Date.now() })
  }, [])

  // 발표 종료 알림
  const broadcastEnd = useCallback(() => {
    syncChannel.send(SYNC_EVENTS.END_PRESENTATION, {})
  }, [])

  return {
    broadcastStart,
    broadcastEnd,
  }
}

// 청중 모드용 훅 (메시지 수신)
export const useAudienceSync = () => {
  const { goToSlide, startPresentation, endPresentation } = usePresentationStore()

  useEffect(() => {
    syncChannel.init()

    // 슬라이드 변경 수신
    syncChannel.on(SYNC_EVENTS.SLIDE_CHANGE, (payload) => {
      goToSlide(payload.slideIndex)
    })

    // 발표 시작 수신
    syncChannel.on(SYNC_EVENTS.START_PRESENTATION, () => {
      startPresentation()
    })

    // 발표 종료 수신
    syncChannel.on(SYNC_EVENTS.END_PRESENTATION, () => {
      endPresentation()
    })

    return () => {
      syncChannel.off(SYNC_EVENTS.SLIDE_CHANGE)
      syncChannel.off(SYNC_EVENTS.START_PRESENTATION)
      syncChannel.off(SYNC_EVENTS.END_PRESENTATION)
      syncChannel.close()
    }
  }, [goToSlide, startPresentation, endPresentation])
}

export default { usePresenterSync, useAudienceSync }
