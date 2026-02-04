import { useState, useCallback, useRef, useEffect } from 'react'
import SlideWrapper from './SlideWrapper'

const STORAGE_KEY = 'keio_luckydraw_settings'

// 기본 참가자 목록
const DEFAULT_PARTICIPANTS = [
  'チョ・ヘナ',
  'ユ・ヒョク',
  'チョン・ソクグン',
  'チェ・ジェフン',
  'キム・ソニョン',
  '長谷川湧一',
  '木浦岬大',
  '伊藤 光',
  '中島幸一',
  '宮崎能成',
  '長島一平',
  '高瀬 勇',
  '山崎裕二',
  '大坪克英',
  '大坪英泰',
  '西園 壽元',
  'ノ・ミリム',
  'イム・ジュンソプ',
  'パク・ジュニョン',
  'イ・ソギョン',
  'チャン・ジェグク',
  'チョン・ソンファン',
  'キム・ミンジュ',
  'ソ・ジュンボム',
  'キム・スジン',
  'ソ・ジヌク',
  'パク・ミヌ',
  'ソン・ギヒ',
  'ソ・ウィソク',
  'イ・イルギュ',
  'チョン・ユジン',
  'イ・ホンチョン',
  'チョン・ユンソン',
  'キム・ヘリ',
  'キム・サンリム',
  'チョン・ソンファン',
  'イ・ジョンソプ',
  'イ・ミンゴル',
  'キム・ジェヒ',
  'チョン・ヨヌ',
  'キルガン・ジフィ・ヨシオカ',
  'ヤン・ヨンジュン',
  'チェ・スンイル',
  'ク・ダヨン',
  'キム・ウジュ',
  'パク・ウジン',
  'キム・ヒョジュン',
  'クォン・ヨンヒョン',
  'チ・ヨンヒ',
  'クォン・ジュンギョム',
  'ハン・ウヨン',
  'カン・ジウ',
  'パク・ジュビン',
  'シン・ユンソ',
  'キム・ミンソ',
  'キム・ジョンヒョン',
  'ヤスハラ・ナオマサ',
  'イ・ダヨン',
]

// 드럼롤 MP3 사운드 훅
const useSound = () => {
  const audioRef = useRef(null)

  const playDrumRoll = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
    audioRef.current = new Audio('/sounds/drum-roll-2-228358.mp3')
    audioRef.current.volume = 0.8
    audioRef.current.play().catch(e => console.log('Audio play failed:', e))
  }

  const stopSound = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
  }

  return { playDrumRoll, stopSound }
}

// 설정 팝업 컴포넌트
const SettingsPopup = ({ isOpen, onClose, settings, onSave }) => {
  const [localSettings, setLocalSettings] = useState(settings)
  const [participantsText, setParticipantsText] = useState('')

  useEffect(() => {
    setLocalSettings(settings)
    setParticipantsText(settings.participants?.join('\n') || '')
  }, [settings, isOpen])

  const handleAddPrize = () => {
    setLocalSettings(prev => ({
      ...prev,
      prizes: [...prev.prizes, { id: Date.now(), name: '', quantity: 1, sponsor: '' }]
    }))
  }

  const handleRemovePrize = (id) => {
    setLocalSettings(prev => ({
      ...prev,
      prizes: prev.prizes.filter(p => p.id !== id)
    }))
  }

  const handlePrizeChange = (id, field, value) => {
    setLocalSettings(prev => ({
      ...prev,
      prizes: prev.prizes.map(p => p.id === id ? { ...p, [field]: value } : p)
    }))
  }

  const handleSave = () => {
    // 참가자 텍스트를 배열로 변환 (빈 줄 제거, 앞뒤 공백 제거)
    const participants = participantsText
      .split('\n')
      .map(name => name.trim())
      .filter(name => name.length > 0)

    onSave({
      ...localSettings,
      participants
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 배경 오버레이 */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* 팝업 내용 */}
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-keio-blue-dark to-keio-blue rounded-3xl border border-white/20 shadow-2xl"
        onWheel={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-white/10 bg-keio-blue-dark/90 backdrop-blur-sm rounded-t-3xl">
          <h3 className="text-2xl font-bold text-white flex items-center gap-2">
            <span>⚙️</span> 抽選設定
          </h3>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* 참가자 명단 */}
          <div>
            <h4 className="text-lg font-medium text-keio-yellow mb-4 flex items-center gap-2">
              <span>👥</span> 参加者リスト
              <span className="text-sm text-white/50 font-normal ml-2">
                ({participantsText.split('\n').filter(n => n.trim()).length}名)
              </span>
            </h4>
            <textarea
              value={participantsText}
              onChange={(e) => setParticipantsText(e.target.value)}
              placeholder="1行に1名ずつ入力してください&#10;例:&#10;山田太郎&#10;田中花子&#10;鈴木一郎"
              className="w-full h-48 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:border-keio-yellow resize-none"
            />
            <p className="mt-2 text-white/50 text-sm">
              ※ 1行に1名ずつ入力してください
            </p>
          </div>

          {/* 상품 테이블 */}
          <div>
            <h4 className="text-lg font-medium text-keio-yellow mb-4 flex items-center gap-2">
              <span>🎁</span> 景品リスト
            </h4>

            {/* 테이블 헤더 */}
            <div className="grid grid-cols-[1fr_80px_1fr_40px] gap-2 mb-2 px-2">
              <span className="text-white/50 text-sm">景品名</span>
              <span className="text-white/50 text-sm text-center">個数</span>
              <span className="text-white/50 text-sm">スポンサー名</span>
              <span></span>
            </div>

            {/* 상품 목록 */}
            <div className="space-y-2">
              {localSettings.prizes.map((prize) => (
                <div
                  key={prize.id}
                  className="grid grid-cols-[1fr_80px_1fr_40px] gap-2 items-center p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <input
                    type="text"
                    value={prize.name}
                    onChange={(e) => handlePrizeChange(prize.id, 'name', e.target.value)}
                    placeholder="例: 特賞"
                    className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:border-keio-yellow text-sm"
                  />
                  <input
                    type="number"
                    min="1"
                    value={prize.quantity}
                    onChange={(e) => handlePrizeChange(prize.id, 'quantity', parseInt(e.target.value) || 1)}
                    className="px-2 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-center focus:outline-none focus:border-keio-yellow text-sm"
                  />
                  <input
                    type="text"
                    value={prize.sponsor}
                    onChange={(e) => handlePrizeChange(prize.id, 'sponsor', e.target.value)}
                    placeholder="例: 〇〇会社"
                    className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:border-keio-yellow text-sm"
                  />
                  <button
                    onClick={() => handleRemovePrize(prize.id)}
                    className="w-8 h-8 rounded-full bg-red-500/20 hover:bg-red-500/40 flex items-center justify-center transition-colors"
                  >
                    <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            {/* 상품 추가 버튼 */}
            <button
              onClick={handleAddPrize}
              className="mt-3 w-full py-3 rounded-lg border-2 border-dashed border-white/20 text-white/50 hover:border-keio-yellow/50 hover:text-keio-yellow transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              景品を追加
            </button>
          </div>
        </div>

        {/* 푸터 */}
        <div className="sticky bottom-0 flex gap-4 p-6 border-t border-white/10 bg-keio-blue-dark/90 backdrop-blur-sm rounded-b-3xl">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            キャンセル
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-keio-yellow to-yellow-500 text-keio-blue-dark font-bold hover:scale-105 transition-transform"
          >
            保存する
          </button>
        </div>
      </div>
    </div>
  )
}

const PrizeSlide = ({ index, data }) => {
  // 설정 상태
  const [settings, setSettings] = useState({
    participants: DEFAULT_PARTICIPANTS,
    prizes: []
  })
  const [showSettings, setShowSettings] = useState(false)
  const [isSetupComplete, setIsSetupComplete] = useState(false)

  // 추첨 상태
  const [drawCount, setDrawCount] = useState(1)
  const [excludeDuplicates, setExcludeDuplicates] = useState(true)
  const [drawnNames, setDrawnNames] = useState([])
  const [currentDrawn, setCurrentDrawn] = useState([])
  const [isDrawing, setIsDrawing] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const [selectedPrizeId, setSelectedPrizeId] = useState(null)
  const [currentPrizeName, setCurrentPrizeName] = useState('')
  const [currentSponsor, setCurrentSponsor] = useState('')
  const [drawHistory, setDrawHistory] = useState([])

  // 애니메이션 상태
  const [rollingNames, setRollingNames] = useState([])
  const [rollPhase, setRollPhase] = useState('idle')

  // 사운드 훅
  const { playDrumRoll, stopSound } = useSound()

  // localStorage에서 설정 로드
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        // 저장된 참가자 목록이 비어있으면 기본값 사용
        if (!parsed.participants || parsed.participants.length === 0) {
          parsed.participants = DEFAULT_PARTICIPANTS
        }
        setSettings(parsed)
        setIsSetupComplete(true)
      } catch (e) {
        console.error('Failed to parse saved settings:', e)
        setIsSetupComplete(true)
      }
    } else {
      // 저장된 설정이 없으면 기본 참가자 목록 사용
      setIsSetupComplete(true)
    }
  }, [])

  // 설정 저장
  const handleSaveSettings = (newSettings) => {
    setSettings(newSettings)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings))
    if (newSettings.participants && newSettings.participants.length > 0) {
      setIsSetupComplete(true)
    }
  }

  // 추첨 가능한 참가자 계산
  const getAvailableParticipants = useCallback(() => {
    const all = settings.participants || []
    if (excludeDuplicates) {
      return all.filter(name => !drawnNames.includes(name))
    }
    return all
  }, [settings.participants, drawnNames, excludeDuplicates])

  // 남은 상품 목록 (추첨되지 않은 것만)
  const getAvailablePrizes = useCallback(() => {
    const drawnPrizeIds = drawHistory.map(h => h.prizeId)
    return settings.prizes.filter(p => !drawnPrizeIds.includes(p.id))
  }, [settings.prizes, drawHistory])

  // 추첨 실행
  const handleDraw = () => {
    const available = getAvailableParticipants()
    const selectedPrize = settings.prizes.find(p => p.id === selectedPrizeId)
    const count = selectedPrize ? Math.min(selectedPrize.quantity, available.length) : Math.min(drawCount, available.length)

    if (count === 0) {
      alert('抽選可能な参加者がいません！')
      return
    }

    setIsDrawing(true)
    setCurrentDrawn([])
    setShowCelebration(false)
    setRollPhase('fast')
    setCurrentPrizeName(selectedPrize?.name || '景品')
    setCurrentSponsor(selectedPrize?.sponsor || '')

    playDrumRoll()

    const shuffled = [...available].sort(() => Math.random() - 0.5)
    const winners = shuffled.slice(0, count)

    const allParticipants = settings.participants || []
    const startTime = Date.now()
    const totalDuration = 4000

    const roll = () => {
      const elapsed = Date.now() - startTime
      const progress = elapsed / totalDuration

      // 랜덤 이름 롤링
      const randomRolling = Array.from({ length: count }, () =>
        allParticipants[Math.floor(Math.random() * allParticipants.length)]
      )
      setRollingNames(randomRolling)

      if (progress < 0.6) {
        setRollPhase('fast')
      } else if (progress < 1) {
        setRollPhase('slow')
      }

      if (elapsed >= totalDuration) {
        setRollPhase('reveal')
        setCurrentDrawn(winners)
        setDrawnNames(prev => [...prev, ...winners])
        setDrawHistory(prev => [...prev, {
          prizeId: selectedPrizeId,
          prizeName: selectedPrize?.name || '景品',
          sponsor: selectedPrize?.sponsor || '',
          winners: winners
        }])
        setRollingNames([])
        setIsDrawing(false)
        setShowCelebration(true)
        setSelectedPrizeId(null)

        setTimeout(() => {
          setShowCelebration(false)
          setRollPhase('idle')
        }, 3000)
      } else {
        const speed = progress < 0.6 ? 50 : 50 + (progress - 0.6) * 500
        setTimeout(roll, speed)
      }
    }

    roll()
  }

  // 리셋
  const handleReset = () => {
    if (window.confirm('本当に最初からやり直しますか？\n抽選履歴がすべてリセットされます。')) {
      stopSound()
      setDrawnNames([])
      setCurrentDrawn([])
      setShowCelebration(false)
      setDrawCount(1)
      setExcludeDuplicates(true)
      setRollPhase('idle')
      setSelectedPrizeId(null)
      setCurrentPrizeName('')
      setCurrentSponsor('')
      setDrawHistory([])
    }
  }

  const availablePrizes = getAvailablePrizes()
  const availableParticipants = getAvailableParticipants()

  return (
    <SlideWrapper index={index}>
      <div className="w-full max-w-6xl relative">
        {/* 설정 팝업 */}
        <SettingsPopup
          isOpen={showSettings}
          onClose={() => setShowSettings(false)}
          settings={settings}
          onSave={handleSaveSettings}
        />

        {/* 축하 효과 오버레이 */}
        {showCelebration && (
          <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="absolute animate-confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `-20px`,
                  width: `${Math.random() * 10 + 5}px`,
                  height: `${Math.random() * 10 + 5}px`,
                  backgroundColor: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'][Math.floor(Math.random() * 8)],
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${Math.random() * 2 + 3}s`,
                }}
              />
            ))}
            <div className="absolute inset-0 flex items-center justify-center animate-celebration-flash">
              <div className="text-6xl md:text-8xl lg:text-9xl font-bold text-white text-center w-full text-glow whitespace-nowrap">
                🎉 おめでとう！ 🎉
              </div>
            </div>
          </div>
        )}

        {/* 타이틀 */}
        <h2
          data-animate
          className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-center text-glow mb-4"
        >
          {data.title}
        </h2>

        {/* 서브타이틀 */}
        {data.subtitle && (
          <p data-animate className="text-center text-keio-yellow text-2xl mb-8">
            {data.subtitle}
          </p>
        )}

        {/* 설정이 없으면 안내 메시지 */}
        {!isSetupComplete ? (
          <div data-animate className="p-8 md:p-10 rounded-3xl backdrop-blur-custom bg-white/5 border border-white/10 text-center">
            <p className="text-white/70 text-xl mb-6">
              抽選を始める前に設定を行ってください
            </p>
            <button
              onClick={() => setShowSettings(true)}
              className="py-4 px-8 text-xl font-bold rounded-xl bg-gradient-to-r from-keio-yellow to-yellow-500 text-keio-blue-dark hover:scale-105 transition-transform"
            >
              ⚙️ 設定を開く
            </button>
          </div>
        ) : (
          /* 추첨 화면 - 3열 구조 */
          <div data-animate className="space-y-4">
            {/* 현재 상태 표시 */}
            <div className="flex flex-wrap justify-center gap-3 text-white/70 text-sm">
              <span className="px-3 py-1.5 rounded-full bg-white/10">
                参加者: {settings.participants?.length || 0}名
              </span>
              <span className="px-3 py-1.5 rounded-full bg-white/10">
                当選済: {drawnNames.length}名
              </span>
              <span className="px-3 py-1.5 rounded-full bg-white/10">
                残り: {availableParticipants.length}名
              </span>
              {settings.prizes.length > 0 && (
                <span className="px-3 py-1.5 rounded-full bg-white/10">
                  残り景品: {availablePrizes.length}種
                </span>
              )}
            </div>

            {/* 3열 레이아웃 */}
            <div className="flex flex-col lg:flex-row gap-4">
              {/* 좌측: 컨트롤 */}
              <div className="lg:w-64 flex-shrink-0">
                <div className="p-4 rounded-2xl backdrop-blur-custom bg-white/5 border border-white/10 h-full">
                  {/* 상품 선택 (등록된 상품이 있을 때) */}
                  {settings.prizes.length > 0 ? (
                    <div className="mb-4">
                      <div className="flex flex-col gap-2">
                        <label className="text-white/80 text-sm">🎁 景品を選択:</label>
                        <select
                          value={selectedPrizeId || ''}
                          onChange={(e) => setSelectedPrizeId(e.target.value ? Number(e.target.value) : null)}
                          disabled={isDrawing || availablePrizes.length === 0}
                          className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:border-keio-yellow disabled:opacity-50 cursor-pointer appearance-none"
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 8px center',
                            backgroundSize: '16px',
                          }}
                        >
                          <option value="" disabled className="bg-keio-blue-dark text-white/50">
                            選択してください
                          </option>
                          {availablePrizes.map((prize) => (
                            <option key={prize.id} value={prize.id} className="bg-keio-blue-dark text-white">
                              {prize.name} ({prize.quantity}名)
                            </option>
                          ))}
                        </select>
                        {selectedPrizeId && (
                          <div className="text-keio-yellow/80 text-xs">
                            {(() => {
                              const prize = settings.prizes.find(p => p.id === selectedPrizeId)
                              return prize ? `${prize.quantity}名様${prize.sponsor ? ` / ${prize.sponsor}` : ''}` : ''
                            })()}
                          </div>
                        )}
                      </div>
                      {availablePrizes.length === 0 && (
                        <p className="text-white/50 py-2 text-xs">すべて抽選済み</p>
                      )}
                    </div>
                  ) : (
                    /* 상품 미등록 시 인원 수 직접 입력 */
                    <div className="mb-4">
                      <label className="text-white/80 text-sm block mb-2">抽選人数:</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="1"
                          max={availableParticipants.length}
                          value={drawCount}
                          onChange={(e) => setDrawCount(Math.max(1, parseInt(e.target.value) || 1))}
                          className="w-20 px-3 py-2 text-center rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-keio-yellow"
                        />
                        <span className="text-white/80 text-sm">名</span>
                      </div>
                    </div>
                  )}

                  {/* 중복 제외 체크박스 */}
                  <div className="mb-4">
                    <label className="flex items-center gap-2 cursor-pointer text-xs">
                      <input
                        type="checkbox"
                        checked={excludeDuplicates}
                        onChange={(e) => setExcludeDuplicates(e.target.checked)}
                        className="w-4 h-4 rounded accent-keio-yellow"
                      />
                      <span className="text-white/80">当選済みを除外</span>
                    </label>
                  </div>

                  {/* 추첨 버튼 */}
                  <div className="space-y-2">
                    <button
                      onClick={handleDraw}
                      disabled={isDrawing || availableParticipants.length === 0 || (settings.prizes.length > 0 && !selectedPrizeId)}
                      className="w-full py-3 text-lg font-bold rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white hover:scale-105 transition-all shadow-lg shadow-red-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {isDrawing ? '🎰 抽選中...' : '🎲 抽選開始！'}
                    </button>

                    <div className="flex gap-2">
                      <button
                        onClick={handleReset}
                        disabled={isDrawing}
                        className="flex-1 py-2 text-sm rounded-lg bg-white/10 text-white/80 hover:bg-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        リセット
                      </button>
                      <button
                        onClick={() => setShowSettings(true)}
                        className="px-3 py-2 rounded-lg bg-white/10 text-white/80 hover:bg-white/20 transition-all"
                        title="設定"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* 중앙: 추첨 결과 표시 */}
              <div className="flex-1">
                <div className={`p-4 md:p-6 rounded-2xl backdrop-blur-custom border h-full min-h-[280px] flex flex-col transition-all duration-300 ${
                  rollPhase === 'slow' ? 'bg-yellow-500/10 border-yellow-500/30' :
                  rollPhase === 'reveal' ? 'bg-green-500/10 border-green-500/30' :
                  'bg-white/5 border-white/10'
                }`}>
                  <h4 className="text-xl text-keio-yellow mb-2 text-center">
                    {isDrawing
                      ? rollPhase === 'fast'
                        ? `🎰 ${currentPrizeName} 抽選中...`
                        : `🥁 ${currentPrizeName} まもなく発表...`
                      : currentDrawn.length > 0
                        ? `🎉 ${currentPrizeName} 当選者`
                        : '抽選結果がここに表示されます'}
                  </h4>
                  {currentSponsor && !isDrawing && currentDrawn.length > 0 && (
                    <p className="text-center text-white/60 text-sm mb-2">提供: {currentSponsor}</p>
                  )}

                  <div className="flex-1 flex items-center justify-center">
                    <div className="flex flex-wrap justify-center gap-4">
                      {(isDrawing ? rollingNames : currentDrawn).map((name, idx) => (
                        <div
                          key={idx}
                          className={`
                            px-6 py-4 md:px-8 md:py-5 rounded-2xl flex items-center justify-center
                            text-xl md:text-2xl font-bold transition-all min-w-[120px]
                            ${isDrawing
                              ? rollPhase === 'slow'
                                ? 'bg-yellow-500/30 text-yellow-300 scale-110'
                                : 'bg-white/20 text-white animate-pulse'
                              : 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-keio-blue-dark animate-winner-pop shadow-lg shadow-yellow-500/50'
                            }
                          `}
                        >
                          {name}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 우측: 추첨 이력 */}
              <div className="lg:w-64 flex-shrink-0">
                <div
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 h-full max-h-[350px] lg:max-h-[400px] overflow-y-auto"
                  onWheel={(e) => e.stopPropagation()}
                >
                  <h4 className="text-sm text-white/60 mb-3">
                    📋 履歴 {drawHistory.length > 0 && `(${drawHistory.length})`}
                  </h4>
                  {drawHistory.length > 0 ? (
                    <div className="space-y-2">
                      {drawHistory.map((draw, idx) => (
                        <div key={idx} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                          <div className="text-keio-yellow text-xs font-medium mb-1">
                            {draw.prizeName}
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {draw.winners.map((name, nameIdx) => (
                              <span
                                key={nameIdx}
                                className="px-2 py-0.5 rounded-full bg-white/10 text-white text-xs"
                              >
                                {name}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-white/30 text-xs text-center py-6">
                      履歴なし
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </SlideWrapper>
  )
}

export default PrizeSlide
