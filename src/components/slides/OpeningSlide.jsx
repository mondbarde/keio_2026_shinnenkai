import { useState, useRef } from 'react'
import SlideWrapper from './SlideWrapper'
import { slidesData } from '../../data/slides'
import PenMark from '../ui/PenMark'

// YouTube URL에서 Video ID 추출
const extractYoutubeId = (url) => {
  if (!url) return null
  // 이미 ID만 있는 경우
  if (url.length === 11 && !url.includes('/')) return url
  // youtu.be 형식
  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/)
  if (shortMatch) return shortMatch[1]
  // youtube.com 형식
  const longMatch = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/)
  if (longMatch) return longMatch[1]
  // embed 형식
  const embedMatch = url.match(/embed\/([a-zA-Z0-9_-]{11})/)
  if (embedMatch) return embedMatch[1]
  return null
}

// 기본 플레이리스트 (작동 확인된 것만)
const defaultPlaylist = [
  {
    id: 1,
    title: 'Merry-Go-Round of Life',
    album: 'ハウルの動く城',
    youtubeId: 'HMGetv40FkI',
  },
]

const OpeningSlide = () => {
  const data = slidesData[0]
  const [showPlayer, setShowPlayer] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [customUrl, setCustomUrl] = useState('')
  const [playlist, setPlaylist] = useState(defaultPlaylist)
  const iframeRef = useRef(null)

  const handlePlayTrack = (idx) => {
    setCurrentTrack(idx)
    setIsPlaying(true)
  }

  const handleStop = () => {
    setIsPlaying(false)
  }

  // 커스텀 URL 추가
  const handleAddCustom = () => {
    const videoId = extractYoutubeId(customUrl)
    if (videoId) {
      const newTrack = {
        id: Date.now(),
        title: 'Custom BGM',
        album: 'YouTube',
        youtubeId: videoId,
      }
      setPlaylist([...playlist, newTrack])
      setCustomUrl('')
      // 바로 재생
      setCurrentTrack(playlist.length)
      setIsPlaying(true)
    }
  }

  // 커스텀 URL로 바로 재생
  const handlePlayCustom = () => {
    const videoId = extractYoutubeId(customUrl)
    if (videoId) {
      const newTrack = {
        id: Date.now(),
        title: 'Custom BGM',
        album: 'YouTube',
        youtubeId: videoId,
      }
      setPlaylist([...playlist, newTrack])
      setCurrentTrack(playlist.length)
      setIsPlaying(true)
      setCustomUrl('')
    }
  }

  return (
    <SlideWrapper index={0}>
      <div className="text-center w-full px-4">
        {/* 펜마크 로고 */}
        <div data-animate className="flex justify-center mb-8">
          <PenMark size={100} color="#FFD700" className="drop-shadow-lg" />
        </div>

        {/* 메인 타이틀 */}
        <h1
          data-animate
          className="whitespace-nowrap font-display font-bold mb-6 text-glow"
          style={{ fontSize: 'clamp(1.5rem, 8vw, 6rem)' }}
        >
          {data.title}
        </h1>

        {/* 서브타이틀 */}
        <h2
          data-animate
          className="whitespace-nowrap font-display text-keio-yellow text-glow-gold mb-12"
          style={{ fontSize: 'clamp(1.2rem, 6vw, 4rem)' }}
        >
          {data.subtitle}
        </h2>

        {/* 장식선 */}
        <div data-animate className="flex items-center justify-center gap-4 mb-12">
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-keio-yellow to-transparent" />
          <div className="w-3 h-3 bg-keio-yellow rounded-full animate-pulse-glow" />
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-keio-yellow to-transparent" />
        </div>

        {/* 날짜 & 장소 */}
        <div data-animate className="space-y-4">
          <p className="text-xl md:text-2xl text-white/90 font-light tracking-wider">
            {data.date}
          </p>
          <p className="text-lg md:text-xl text-white/70 font-light">
            {data.venue}
          </p>
        </div>

        {/* 장식 요소 */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2">
          <div data-animate className="flex flex-col items-center animate-bounce">
            <span className="text-white/50 text-sm mb-2">Scroll</span>
            <svg
              className="w-6 h-6 text-white/50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* 배경음악 플레이어 UI - 하단 고정 */}
      <div className="fixed bottom-4 right-4 z-50">
        {/* 플레이어 토글 버튼 */}
        <button
          onClick={() => setShowPlayer(!showPlayer)}
          className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all shadow-lg"
          title="배경음악"
        >
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
          </svg>
        </button>

        {/* 플레이어 패널 */}
        {showPlayer && (
          <div className="absolute bottom-16 right-0 w-96 bg-black/90 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
            {/* 헤더 */}
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-medium">BGM Playlist</h4>
                  <p className="text-white/50 text-sm">久石譲 Piano Collection</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-white/50 text-xs">YouTube</span>
                </div>
              </div>
            </div>

            {/* YouTube 플레이어 - 숨김 (음악만 재생) */}
            {isPlaying && (
              <div className="absolute -left-[9999px] w-1 h-1 overflow-hidden">
                <iframe
                  ref={iframeRef}
                  src={`https://www.youtube.com/embed/${playlist[currentTrack].youtubeId}?autoplay=1&rel=0`}
                  title={playlist[currentTrack].title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              </div>
            )}

            {/* 현재 재생 중인 곡 정보 + 정지 버튼 */}
            {isPlaying && (
              <div className="p-4 bg-gradient-to-r from-keio-yellow/20 to-keio-yellow/10 border-b border-white/10">
                <div className="flex items-center gap-3">
                  {/* 음파 애니메이션 */}
                  <div className="flex items-end gap-0.5 h-6">
                    <div className="w-1 bg-keio-yellow rounded-full animate-pulse" style={{ height: '60%', animationDelay: '0s' }} />
                    <div className="w-1 bg-keio-yellow rounded-full animate-pulse" style={{ height: '100%', animationDelay: '0.2s' }} />
                    <div className="w-1 bg-keio-yellow rounded-full animate-pulse" style={{ height: '40%', animationDelay: '0.4s' }} />
                    <div className="w-1 bg-keio-yellow rounded-full animate-pulse" style={{ height: '80%', animationDelay: '0.1s' }} />
                  </div>
                  {/* 곡 정보 */}
                  <div className="flex-1 min-w-0">
                    <p className="text-keio-yellow text-sm font-medium truncate">
                      {playlist[currentTrack].title}
                    </p>
                    <p className="text-white/50 text-xs truncate">{playlist[currentTrack].album}</p>
                  </div>
                  {/* 정지 버튼 */}
                  <button
                    onClick={handleStop}
                    className="w-8 h-8 rounded-full bg-red-500/80 hover:bg-red-500 flex items-center justify-center transition-colors"
                    title="停止"
                  >
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 6h12v12H6z" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* 플레이리스트 */}
            <div className="max-h-48 overflow-y-auto">
              {playlist.map((track, idx) => (
                <button
                  key={track.id}
                  onClick={() => handlePlayTrack(idx)}
                  className={`w-full p-3 flex items-center gap-3 hover:bg-white/10 transition-colors text-left ${
                    currentTrack === idx && isPlaying ? 'bg-white/10' : ''
                  }`}
                >
                  {/* 트랙 번호/재생 아이콘 */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    currentTrack === idx && isPlaying ? 'bg-keio-yellow' : 'bg-white/10'
                  }`}>
                    {currentTrack === idx && isPlaying ? (
                      <svg className="w-4 h-4 text-keio-blue-dark" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 text-white/70" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </div>
                  {/* 트랙 정보 */}
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm truncate ${currentTrack === idx && isPlaying ? 'text-keio-yellow' : 'text-white'}`}>
                      {track.title}
                    </p>
                    <p className="text-xs text-white/50 truncate">{track.album}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* 커스텀 YouTube URL 입력 */}
            <div className="p-3 border-t border-white/10">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  placeholder="YouTube URL を貼り付け"
                  className="flex-1 px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm placeholder-white/40 focus:outline-none focus:border-keio-yellow/50"
                  onKeyDown={(e) => e.key === 'Enter' && handlePlayCustom()}
                />
                <button
                  onClick={handlePlayCustom}
                  disabled={!customUrl}
                  className="px-3 py-2 rounded-lg bg-keio-yellow/80 hover:bg-keio-yellow text-keio-blue-dark text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  再生
                </button>
              </div>
            </div>

            {/* 푸터 */}
            <div className="p-2 border-t border-white/10 bg-white/5">
              <p className="text-center text-white/40 text-xs">
                {isPlaying ? '再生中 - YouTube Audio' : 'YouTubeのURLを貼り付けて再生'}
              </p>
            </div>
          </div>
        )}
      </div>
    </SlideWrapper>
  )
}

export default OpeningSlide
