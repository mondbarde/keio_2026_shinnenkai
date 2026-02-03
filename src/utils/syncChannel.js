// BroadcastChannel을 사용한 화면 간 동기화

const CHANNEL_NAME = 'keio-presentation-sync'

class SyncChannel {
  constructor() {
    this.channel = null
    this.listeners = new Map()
  }

  // 채널 초기화
  init() {
    if (typeof BroadcastChannel === 'undefined') {
      console.warn('BroadcastChannel is not supported in this browser')
      return false
    }

    this.channel = new BroadcastChannel(CHANNEL_NAME)

    this.channel.onmessage = (event) => {
      const { type, payload } = event.data
      const callback = this.listeners.get(type)
      if (callback) {
        callback(payload)
      }
    }

    return true
  }

  // 메시지 전송
  send(type, payload) {
    if (!this.channel) return

    this.channel.postMessage({ type, payload })
  }

  // 이벤트 리스너 등록
  on(type, callback) {
    this.listeners.set(type, callback)
  }

  // 이벤트 리스너 해제
  off(type) {
    this.listeners.delete(type)
  }

  // 채널 종료
  close() {
    if (this.channel) {
      this.channel.close()
      this.channel = null
    }
    this.listeners.clear()
  }
}

// 싱글톤 인스턴스
const syncChannel = new SyncChannel()

// 메시지 타입 상수
export const SYNC_EVENTS = {
  SLIDE_CHANGE: 'SLIDE_CHANGE',
  START_PRESENTATION: 'START_PRESENTATION',
  END_PRESENTATION: 'END_PRESENTATION',
}

export default syncChannel
