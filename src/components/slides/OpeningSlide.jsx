import { useState, useRef, useEffect } from 'react'
import SlideWrapper from './SlideWrapper'
import { slidesData } from '../../data/slides'
import PenMark from '../ui/PenMark'

// YouTube URL에서 Video ID 또는 Playlist ID 추출
const extractYoutubeInfo = (url) => {
  if (!url) return null

  // 플레이리스트 ID 추출 (list= 파라미터)
  const playlistMatch = url.match(/[?&]list=([a-zA-Z0-9_-]+)/)
  if (playlistMatch) {
    return {
      type: 'playlist',
      id: playlistMatch[1],
    }
  }

  // 이미 ID만 있는 경우 (11자)
  if (url.length === 11 && !url.includes('/')) {
    return { type: 'video', id: url }
  }
  // youtu.be 형식
  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/)
  if (shortMatch) return { type: 'video', id: shortMatch[1] }
  // youtube.com 형식
  const longMatch = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/)
  if (longMatch) return { type: 'video', id: longMatch[1] }
  // embed 형식
  const embedMatch = url.match(/embed\/([a-zA-Z0-9_-]{11})/)
  if (embedMatch) return { type: 'video', id: embedMatch[1] }

  return null
}

// JSON 객체의 끝을 찾는 함수 (브라켓 매칭)
const findJsonEnd = (str, startIndex) => {
  let depth = 0
  let inString = false
  let escape = false

  for (let i = startIndex; i < str.length; i++) {
    const char = str[i]

    if (escape) {
      escape = false
      continue
    }

    if (char === '\\') {
      escape = true
      continue
    }

    if (char === '"' && !escape) {
      inString = !inString
      continue
    }

    if (inString) continue

    if (char === '{') depth++
    if (char === '}') {
      depth--
      if (depth === 0) return i + 1
    }
  }

  return -1
}

// 플레이리스트에서 개별 영상 목록 가져오기
const fetchPlaylistVideos = async (playlistId) => {
  try {
    // CORS 프록시를 통해 플레이리스트 페이지 가져오기 (10초 타임아웃)
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000)

    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(`https://www.youtube.com/playlist?list=${playlistId}`)}`
    const response = await fetch(proxyUrl, { signal: controller.signal })
    clearTimeout(timeoutId)
    const data = await response.json()

    if (!data.contents) return []

    // HTML에서 비디오 정보 추출 (ytInitialData JSON 파싱)
    const html = data.contents

    // ytInitialData 시작 위치 찾기
    const markers = ['var ytInitialData = {', 'ytInitialData = {', 'window["ytInitialData"] = {']
    let ytData = null

    for (const marker of markers) {
      const startIdx = html.indexOf(marker)
      if (startIdx !== -1) {
        const jsonStart = html.indexOf('{', startIdx)
        const jsonEnd = findJsonEnd(html, jsonStart)

        if (jsonEnd !== -1) {
          const jsonStr = html.substring(jsonStart, jsonEnd)
          try {
            ytData = JSON.parse(jsonStr)
            console.log('Successfully parsed ytInitialData')
            break
          } catch (e) {
            console.log(`Failed to parse JSON with marker "${marker}":`, e.message)
          }
        }
      }
    }

    if (ytData) {
      return extractVideosFromYtData(ytData)
    }

    console.log('Could not find or parse ytInitialData')
    return []
  } catch (error) {
    console.error('Failed to fetch playlist:', error)
    return []
  }
}

// ytInitialData에서 비디오 정보 추출
const extractVideosFromYtData = (ytData) => {
  const videos = []

  try {
    // 여러 가능한 경로 시도
    let contents = null

    // 경로 1: 표준 플레이리스트 경로
    contents = ytData?.contents?.twoColumnBrowseResultsRenderer?.tabs?.[0]
      ?.tabRenderer?.content?.sectionListRenderer?.contents?.[0]
      ?.itemSectionRenderer?.contents?.[0]?.playlistVideoListRenderer?.contents

    // 경로 2: 대체 경로
    if (!contents) {
      contents = ytData?.contents?.twoColumnBrowseResultsRenderer?.tabs?.[0]
        ?.tabRenderer?.content?.sectionListRenderer?.contents?.[0]
        ?.playlistVideoListRenderer?.contents
    }

    // 경로 3: 또 다른 대체 경로
    if (!contents) {
      const tabs = ytData?.contents?.twoColumnBrowseResultsRenderer?.tabs
      if (tabs) {
        for (const tab of tabs) {
          const sectionContents = tab?.tabRenderer?.content?.sectionListRenderer?.contents
          if (sectionContents) {
            for (const section of sectionContents) {
              const playlistRenderer = section?.itemSectionRenderer?.contents?.[0]?.playlistVideoListRenderer
                || section?.playlistVideoListRenderer
              if (playlistRenderer?.contents) {
                contents = playlistRenderer.contents
                break
              }
            }
          }
          if (contents) break
        }
      }
    }

    if (!contents) {
      console.log('Could not find playlist contents in ytData')
      return []
    }

    contents.forEach((item, index) => {
      const video = item?.playlistVideoRenderer
      if (video && video.videoId) {
        videos.push({
          id: Date.now() + index,
          title: video.title?.runs?.[0]?.text || video.title?.simpleText || `Track ${index + 1}`,
          album: video.shortBylineText?.runs?.[0]?.text || video.longBylineText?.runs?.[0]?.text || 'YouTube',
          youtubeId: video.videoId,
        })
      }
    })

    console.log(`Extracted ${videos.length} videos from playlist`)
  } catch (e) {
    console.error('Error extracting videos:', e)
  }

  return videos
}

// 기본 BGM
const DEFAULT_VIDEO_ID = 'whLvb0yvIFo'

// 초기 플레이리스트
const defaultPlaylist = [
  {
    id: 1,
    title: 'ジブリのベストピアノ曲',
    album: 'Ghibli Piano Collection',
    youtubeId: DEFAULT_VIDEO_ID,
  },
]

const OpeningSlide = () => {
  const data = slidesData[0]
  const [showPlayer, setShowPlayer] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [customUrl, setCustomUrl] = useState('')
  const [playlist, setPlaylist] = useState(defaultPlaylist)
  const [isLoading, setIsLoading] = useState(false)
  const [ytReady, setYtReady] = useState(false)
  const playerRef = useRef(null)
  const playerContainerRef = useRef(null)
  const currentTrackRef = useRef(currentTrack)
  const playlistRef = useRef(playlist)

  // Refs 동기화
  useEffect(() => { currentTrackRef.current = currentTrack }, [currentTrack])
  useEffect(() => { playlistRef.current = playlist }, [playlist])

  // YouTube IFrame API 로드
  useEffect(() => {
    if (window.YT && window.YT.Player) {
      setYtReady(true)
      return
    }

    const prevCallback = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      if (prevCallback) prevCallback()
      setYtReady(true)
    }

    if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      document.head.appendChild(tag)
    }
  }, [])

  // YouTube Player 생성/업데이트 (자동 다음 곡 전환 포함)
  useEffect(() => {
    if (!ytReady) return

    const destroyPlayer = () => {
      if (playerRef.current) {
        try { playerRef.current.destroy() } catch (e) { /* ignore */ }
        playerRef.current = null
      }
    }

    if (!isPlaying) {
      destroyPlayer()
      return
    }

    const track = playlistRef.current[currentTrack]
    if (!track) {
      destroyPlayer()
      return
    }

    destroyPlayer()

    const container = playerContainerRef.current
    if (!container) return
    container.innerHTML = ''
    const playerDiv = document.createElement('div')
    container.appendChild(playerDiv)

    const config = {
      width: 1,
      height: 1,
      playerVars: {
        autoplay: 1,
        rel: 0,
      },
      events: {
        onStateChange: (event) => {
          if (event.data === window.YT.PlayerState.ENDED) {
            const ct = currentTrackRef.current
            const pl = playlistRef.current
            if (ct < pl.length - 1) {
              setCurrentTrack(ct + 1)
            } else {
              // 마지막 곡이면 정지
              setIsPlaying(false)
            }
          }
        },
        onError: () => {
          // 에러 시 다음 곡으로
          const ct = currentTrackRef.current
          const pl = playlistRef.current
          if (ct < pl.length - 1) {
            setCurrentTrack(ct + 1)
          }
        }
      }
    }

    if (track.isPlaylistFallback) {
      config.playerVars.listType = 'playlist'
      config.playerVars.list = track.youtubeId
    } else {
      config.videoId = track.youtubeId
    }

    playerRef.current = new window.YT.Player(playerDiv, config)
  }, [ytReady, isPlaying, currentTrack])

  // 컴포넌트 언마운트 시 정리
  useEffect(() => {
    return () => {
      if (playerRef.current) {
        try { playerRef.current.destroy() } catch (e) { /* ignore */ }
        playerRef.current = null
      }
    }
  }, [])

  const handlePlayTrack = (idx) => {
    setCurrentTrack(idx)
    setIsPlaying(true)
  }

  const handleStop = () => {
    setIsPlaying(false)
  }

  // 트랙 삭제
  const handleDeleteTrack = (idx) => {
    // 현재 재생 중인 곡을 삭제하면 정지
    if (currentTrack === idx && isPlaying) {
      setIsPlaying(false)
    }
    // 삭제 후 currentTrack 조정
    if (currentTrack >= idx && currentTrack > 0) {
      setCurrentTrack(currentTrack - 1)
    }
    setPlaylist(playlist.filter((_, i) => i !== idx))
  }

  // 커스텀 URL로 바로 재생
  const handlePlayCustom = async () => {
    const info = extractYoutubeInfo(customUrl)
    if (!info) return

    if (info.type === 'playlist') {
      // 플레이리스트: 개별 영상들을 가져와서 추가
      setIsLoading(true)
      setCustomUrl('')

      const videos = await fetchPlaylistVideos(info.id)

      if (videos.length > 0) {
        setPlaylist([...playlist, ...videos])
        setCurrentTrack(playlist.length) // 첫 번째 새 곡부터 재생
        setIsPlaying(true)
      } else {
        // 파싱 실패 시 플레이리스트 전체 재생으로 폴백
        const fallbackTrack = {
          id: Date.now(),
          title: 'YouTube Playlist',
          album: '連続再生',
          youtubeId: info.id,
          isPlaylistFallback: true,
        }
        setPlaylist([...playlist, fallbackTrack])
        setCurrentTrack(playlist.length)
        setIsPlaying(true)
      }

      setIsLoading(false)
    } else {
      // 단일 영상
      const newTrack = {
        id: Date.now(),
        title: 'Custom BGM',
        album: 'YouTube',
        youtubeId: info.id,
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
          className={`w-14 h-14 rounded-full backdrop-blur-md border flex items-center justify-center transition-all shadow-lg ${
            isPlaying ? 'bg-keio-yellow/20 border-keio-yellow/50' : 'bg-white/10 border-white/20 hover:bg-white/20'
          }`}
          title="배경음악"
        >
          <svg className={`w-6 h-6 ${isPlaying ? 'text-keio-yellow' : 'text-white'}`} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
          </svg>
        </button>

        {/* YouTube 플레이어 컨테이너 - 숨김 (자동 다음 곡 전환) */}
        <div ref={playerContainerRef} className="absolute -left-[9999px] w-1 h-1 overflow-hidden" />

        {/* 플레이어 패널 */}
        {showPlayer && (
          <div
            className="absolute bottom-16 right-0 w-96 bg-black/90 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl overflow-hidden"
            onWheel={(e) => e.stopPropagation()}
          >
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
              {/* 로딩 표시 */}
              {isLoading && (
                <div className="p-4 flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-keio-yellow/30 border-t-keio-yellow rounded-full animate-spin" />
                  <span className="text-white/70 text-sm">Playlist 読み込み中...</span>
                </div>
              )}

              {playlist.map((track, idx) => (
                <div
                  key={track.id}
                  className={`w-full p-3 flex items-center gap-3 hover:bg-white/10 transition-colors group ${
                    currentTrack === idx && isPlaying ? 'bg-white/10' : ''
                  }`}
                >
                  {/* 재생 버튼 */}
                  <button
                    onClick={() => handlePlayTrack(idx)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                      currentTrack === idx && isPlaying ? 'bg-keio-yellow' : track.isPlaylistFallback ? 'bg-purple-500/30 hover:bg-purple-500/50' : 'bg-white/10 hover:bg-white/20'
                    }`}
                    title="再生"
                  >
                    {currentTrack === idx && isPlaying ? (
                      <svg className="w-4 h-4 text-keio-blue-dark" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                      </svg>
                    ) : track.isPlaylistFallback ? (
                      <svg className="w-4 h-4 text-purple-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h10v2H4v-2zm14-1v6l5-3-5-3z" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 text-white/70" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </button>
                  {/* 트랙 정보 (클릭으로 재생) */}
                  <button
                    onClick={() => handlePlayTrack(idx)}
                    className="flex-1 min-w-0 text-left"
                  >
                    <p className={`text-sm truncate ${currentTrack === idx && isPlaying ? 'text-keio-yellow' : track.isPlaylistFallback ? 'text-purple-300' : 'text-white'}`}>
                      {track.title}
                    </p>
                    <p className="text-xs text-white/50 truncate">{track.album}</p>
                  </button>
                  {/* 플레이리스트 폴백 뱃지 */}
                  {track.isPlaylistFallback && (
                    <span className="px-2 py-0.5 rounded-full bg-purple-500/30 text-purple-300 text-xs">
                      連続再生
                    </span>
                  )}
                  {/* 삭제 버튼 */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeleteTrack(idx)
                    }}
                    className="w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-red-500/30 transition-all"
                    title="削除"
                  >
                    <svg className="w-3.5 h-3.5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            {/* 커스텀 YouTube URL 입력 */}
            <div className="p-3 border-t border-white/10">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  placeholder="動画 / Playlist URL"
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
                {isLoading
                  ? 'Playlist 読み込み中...'
                  : isPlaying
                    ? playlist[currentTrack]?.isPlaylistFallback
                      ? '再生中 - Playlist 連続再生'
                      : '再生中 - YouTube Audio'
                    : '動画URL または Playlist URL'}
              </p>
            </div>
          </div>
        )}
      </div>
    </SlideWrapper>
  )
}

export default OpeningSlide
