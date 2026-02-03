import { useState, useEffect } from 'react'
import usePresentationStore from '../../store/presentationStore'

const Timer = () => {
  const { startTime, isPresenting } = usePresentationStore()
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    if (!isPresenting || !startTime) {
      setElapsed(0)
      return
    }

    const interval = setInterval(() => {
      setElapsed(Date.now() - startTime)
    }, 1000)

    return () => clearInterval(interval)
  }, [isPresenting, startTime])

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000)
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="bg-gray-800 rounded-xl p-4">
      <div className="text-gray-400 text-sm mb-1">経過時間</div>
      <div className="text-3xl font-mono text-white font-bold">
        {formatTime(elapsed)}
      </div>
    </div>
  )
}

export default Timer
