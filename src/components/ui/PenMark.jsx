// 慶應義塾大学 펜마크 로고 컴포넌트
const PenMark = ({ className = '', size = 120 }) => {
  return (
    <img
      src="/images/penmark.png"
      alt="慶應義塾大学 ペンマーク"
      width={size}
      height={size}
      className={className}
      style={{ objectFit: 'contain' }}
    />
  )
}

export default PenMark
