// 慶應義塾大学 삼색기 배경 (青・赤・青)
const TricolorBackground = ({ active = false }) => {
  if (!active) return null

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* 삼색 스트라이프 배경 */}
      <div className="absolute inset-0 flex">
        {/* 파랑 (青) - 왼쪽 */}
        <div
          className="flex-1 h-full"
          style={{
            background: 'linear-gradient(180deg, #00356B 0%, #002244 100%)',
          }}
        />
        {/* 빨강 (赤) - 중앙 */}
        <div
          className="flex-1 h-full"
          style={{
            background: 'linear-gradient(180deg, #DC143C 0%, #B91030 100%)',
          }}
        />
        {/* 파랑 (青) - 오른쪽 */}
        <div
          className="flex-1 h-full"
          style={{
            background: 'linear-gradient(180deg, #00356B 0%, #002244 100%)',
          }}
        />
      </div>

      {/* 오버레이 (콘텐츠 가독성을 위해) */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)',
        }}
      />

      {/* 빛 효과 */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2"
          style={{
            background: 'radial-gradient(ellipse at top center, rgba(255,255,255,0.2) 0%, transparent 70%)',
          }}
        />
      </div>
    </div>
  )
}

export default TricolorBackground
