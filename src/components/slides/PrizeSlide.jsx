import { useState, useCallback, useRef } from 'react'
import SlideWrapper from './SlideWrapper'

// 드럼롤 MP3 사운드 훅
const useSound = () => {
  const audioRef = useRef(null)

  // 드럼롤 MP3 재생 (4초, 끝에 심벌즈)
  const playDrumRoll = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
    audioRef.current = new Audio('/sounds/drum-roll-2-228358.mp3')
    audioRef.current.volume = 0.8
    audioRef.current.play().catch(e => console.log('Audio play failed:', e))
  }

  // 사운드 정지
  const stopSound = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
  }

  return { playDrumRoll, stopSound }
}

const PrizeSlide = ({ index, data }) => {
  // 설정 상태
  const [maxNumber, setMaxNumber] = useState('')
  const [isSetupComplete, setIsSetupComplete] = useState(false)

  // 추첨 상태
  const [drawCount, setDrawCount] = useState(1)
  const [excludeDuplicates, setExcludeDuplicates] = useState(true)
  const [drawnNumbers, setDrawnNumbers] = useState([])
  const [currentDrawn, setCurrentDrawn] = useState([])
  const [isDrawing, setIsDrawing] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)

  // 애니메이션 상태
  const [rollingNumbers, setRollingNumbers] = useState([])
  const [rollPhase, setRollPhase] = useState('idle') // idle, fast, slow, reveal

  // 사운드 훅
  const { playDrumRoll, stopSound } = useSound()

  // 설정 완료
  const handleSetupComplete = () => {
    const num = parseInt(maxNumber)
    if (num > 0) {
      setIsSetupComplete(true)
    }
  }

  // 추첨 가능한 번호 계산
  const getAvailableNumbers = useCallback(() => {
    const max = parseInt(maxNumber)
    const all = Array.from({ length: max }, (_, i) => i + 1)
    if (excludeDuplicates) {
      return all.filter(n => !drawnNumbers.includes(n))
    }
    return all
  }, [maxNumber, drawnNumbers, excludeDuplicates])

  // 추첨 실행 (4초 드럼롤 MP3에 맞춤)
  const handleDraw = () => {
    const available = getAvailableNumbers()
    const count = Math.min(drawCount, available.length)

    if (count === 0) {
      alert('추첨 가능한 번호가 없습니다!')
      return
    }

    setIsDrawing(true)
    setCurrentDrawn([])
    setShowCelebration(false)
    setRollPhase('fast')

    // 드럼롤 MP3 재생 (4초, 끝에 심벌즈)
    playDrumRoll()

    // 실제 당첨 번호 미리 계산
    const shuffled = [...available].sort(() => Math.random() - 0.5)
    const winners = shuffled.slice(0, count)

    const max = parseInt(maxNumber)
    const startTime = Date.now()
    const totalDuration = 4000 // 4초 (MP3 길이에 맞춤)

    const roll = () => {
      const elapsed = Date.now() - startTime
      const progress = elapsed / totalDuration

      // 랜덤 숫자 롤링
      const randomRolling = Array.from({ length: count }, () =>
        Math.floor(Math.random() * max) + 1
      )
      setRollingNumbers(randomRolling)

      // 진행도에 따른 페이즈 변경
      if (progress < 0.6) {
        // 빠른 롤링 (0~2.4초)
        setRollPhase('fast')
      } else if (progress < 1) {
        // 느린 롤링 (2.4~4초)
        setRollPhase('slow')
      }

      if (elapsed >= totalDuration) {
        // 4초에 심벌즈와 함께 결과 발표
        setRollPhase('reveal')
        setCurrentDrawn(winners)
        setDrawnNumbers(prev => [...prev, ...winners])
        setRollingNumbers([])
        setIsDrawing(false)
        setShowCelebration(true)

        // 축하 효과 3초 후 종료
        setTimeout(() => {
          setShowCelebration(false)
          setRollPhase('idle')
        }, 3000)
      } else {
        // 진행도에 따라 속도 조절 (점점 느려짐)
        const speed = progress < 0.6 ? 50 : 50 + (progress - 0.6) * 500
        setTimeout(roll, speed)
      }
    }

    roll()
  }

  // 리셋 (설정 화면으로 돌아가기)
  const handleReset = () => {
    if (window.confirm('本当に最初からやり直しますか？\n抽選履歴がすべてリセットされます。')) {
      stopSound()
      setIsSetupComplete(false)
      setMaxNumber('')
      setDrawnNumbers([])
      setCurrentDrawn([])
      setShowCelebration(false)
      setDrawCount(1)
      setExcludeDuplicates(true)
      setRollPhase('idle')
    }
  }

  return (
    <SlideWrapper index={index}>
      <div className="w-full max-w-4xl relative">
        {/* 축하 효과 오버레이 */}
        {showCelebration && (
          <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {/* 색종이 효과 */}
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
            {/* 축하 텍스트 - 화면 전체 가로로 표시 후 사라짐 */}
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
          className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-center mb-4 text-glow"
        >
          {data.title}
        </h2>

        {/* 서브타이틀 */}
        {data.subtitle && (
          <p
            data-animate
            className="text-center text-keio-yellow text-2xl mb-8"
          >
            {data.subtitle}
          </p>
        )}

        {/* 설정 화면 */}
        {!isSetupComplete ? (
          <div
            data-animate
            className="p-8 md:p-10 rounded-3xl backdrop-blur-custom bg-white/5 border border-white/10"
          >
            <h3 className="text-2xl md:text-3xl text-white mb-8 text-center">
              🎫 抽選設定
            </h3>

            <div className="max-w-md mx-auto space-y-6">
              <div>
                <label className="block text-white/80 text-lg mb-2">
                  番号札の最大番号
                </label>
                <input
                  type="number"
                  min="1"
                  value={maxNumber}
                  onChange={(e) => setMaxNumber(e.target.value)}
                  placeholder="例: 50"
                  className="w-full px-6 py-4 text-2xl rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-keio-yellow focus:ring-2 focus:ring-keio-yellow/50"
                />
                <p className="mt-2 text-white/50 text-sm">
                  1番から入力した番号までが抽選対象になります
                </p>
              </div>

              <button
                onClick={handleSetupComplete}
                disabled={!maxNumber || parseInt(maxNumber) < 1}
                className="w-full py-4 px-8 text-xl font-bold rounded-xl bg-gradient-to-r from-keio-yellow to-yellow-500 text-keio-blue-dark hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                設定完了 →
              </button>
            </div>
          </div>
        ) : (
          /* 추첨 화면 */
          <div data-animate className="space-y-6">
            {/* 현재 상태 표시 */}
            <div className="flex flex-wrap justify-center gap-4 text-white/70">
              <span className="px-4 py-2 rounded-full bg-white/10">
                番号範囲: 1 〜 {maxNumber}
              </span>
              <span className="px-4 py-2 rounded-full bg-white/10">
                抽選済み: {drawnNumbers.length}名
              </span>
              <span className="px-4 py-2 rounded-full bg-white/10">
                残り: {getAvailableNumbers().length}名
              </span>
            </div>

            {/* 추첨 컨트롤 */}
            <div className="p-6 md:p-8 rounded-3xl backdrop-blur-custom bg-white/5 border border-white/10">
              <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center justify-center mb-6">
                {/* 추첨 인원 수 */}
                <div className="flex items-center gap-3">
                  <label className="text-white/80">抽選人数:</label>
                  <input
                    type="number"
                    min="1"
                    max={getAvailableNumbers().length}
                    value={drawCount}
                    onChange={(e) => setDrawCount(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-20 px-4 py-2 text-xl text-center rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-keio-yellow"
                  />
                  <span className="text-white/80">名</span>
                </div>

                {/* 중복 제외 체크박스 */}
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={excludeDuplicates}
                    onChange={(e) => setExcludeDuplicates(e.target.checked)}
                    className="w-5 h-5 rounded accent-keio-yellow"
                  />
                  <span className="text-white/80">当選済み番号を除外</span>
                </label>
              </div>

              {/* 추첨 버튼 */}
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <button
                  onClick={handleDraw}
                  disabled={isDrawing || getAvailableNumbers().length === 0}
                  className="py-4 px-12 text-2xl font-bold rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white hover:scale-105 transition-all shadow-lg shadow-red-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isDrawing ? '🎰 抽選中...' : '🎲 抽選開始！'}
                </button>

                <button
                  onClick={handleReset}
                  disabled={isDrawing}
                  className="py-4 px-8 text-lg rounded-xl bg-white/10 text-white/80 hover:bg-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  最初からやり直す
                </button>
              </div>
            </div>

            {/* 추첨 결과 표시 */}
            <div className={`p-6 md:p-8 rounded-3xl backdrop-blur-custom border min-h-[200px] transition-all duration-300 ${
              rollPhase === 'slow' ? 'bg-yellow-500/10 border-yellow-500/30' :
              rollPhase === 'reveal' ? 'bg-green-500/10 border-green-500/30' :
              'bg-white/5 border-white/10'
            }`}>
              <h4 className="text-xl text-keio-yellow mb-6 text-center">
                {isDrawing
                  ? rollPhase === 'fast'
                    ? '🎰 抽選中...'
                    : '🥁 まもなく発表...'
                  : currentDrawn.length > 0
                    ? '🎉 当選番号'
                    : '抽選結果がここに表示されます'}
              </h4>

              {/* 롤링 또는 결과 번호 */}
              <div className="flex flex-wrap justify-center gap-4">
                {(isDrawing ? rollingNumbers : currentDrawn).map((num, idx) => (
                  <div
                    key={idx}
                    className={`
                      w-24 h-24 md:w-32 md:h-32 rounded-2xl flex items-center justify-center
                      text-4xl md:text-5xl font-bold transition-all
                      ${isDrawing
                        ? rollPhase === 'slow'
                          ? 'bg-yellow-500/30 text-yellow-300 scale-110'
                          : 'bg-white/20 text-white animate-pulse'
                        : 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-keio-blue-dark animate-winner-pop shadow-lg shadow-yellow-500/50'
                      }
                    `}
                  >
                    {num}
                  </div>
                ))}
              </div>
            </div>

            {/* 추첨 이력 */}
            {drawnNumbers.length > 0 && (
              <div className="p-4 md:p-6 rounded-2xl bg-white/5 border border-white/10">
                <h4 className="text-sm text-white/60 mb-3">当選済み番号一覧:</h4>
                <div className="flex flex-wrap gap-2">
                  {drawnNumbers.map((num, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full bg-keio-yellow/20 text-keio-yellow text-sm"
                    >
                      {num}
                    </span>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}
      </div>
    </SlideWrapper>
  )
}

export default PrizeSlide
