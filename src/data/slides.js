// 슬라이드 콘텐츠 데이터
// 실제 콘텐츠는 사용자가 업데이트할 수 있습니다

export const slidesData = [
  // 1. 開会
  {
    id: 'opening',
    type: 'opening',
    title: '2026年 慶應義塾大学',
    subtitle: '韓国・ソウル三田会 合同新年会',
    date: '2026年2月4日',
    venue: 'ロッテホテル ソウル',
    notes: '오프닝 슬라이드입니다. 참가자들이 착석할 때까지 이 화면을 표시합니다.',
  },
  // 2. 開会の辞
  {
    id: 'opening-speech',
    type: 'speech',
    title: '開会の辞',
    speaker: '李錫容（イ・ソクヨン）',
    message: '皆様、本日は韓国・ソウル三田会合同新年会に\nお集まりいただき、誠にありがとうございます。',
    notes: '개회사입니다. 사회자가 행사 시작을 알립니다.',
  },
  // 3. 塾長祝辞映像視聴
  {
    id: 'president-video',
    type: 'video',
    title: '塾長祝辞映像',
    subtitle: '伊藤公平塾長',
    description: '慶應義塾大学塾長からの祝辞映像をご覧ください',
    notes: '총장 축사 영상을 재생합니다. 영상 시작 전 안내합니다.',
  },
  // 4. 東京三田倶楽部祝賀映像視聴
  {
    id: 'mita-club-video',
    type: 'video',
    title: '東京三田倶楽部',
    subtitle: '祝賀映像',
    description: '東京三田倶楽部からのお祝いメッセージをご覧ください',
    notes: '도쿄 미타클럽 축하 영상을 재생합니다.',
  },
  // 5. 三田会のご案内
  {
    id: 'mita-info',
    type: 'info',
    title: '三田会のご案内',
    items: [
      { label: '韓国三田会', description: '韓国在住の慶應義塾卒業生の会' },
      { label: 'ソウル三田会', description: 'ソウル地域の慶應義塾卒業生の会' },
      { label: '入会案内', description: '新規会員募集中！' },
    ],
    notes: '미타클럽(동문회) 안내입니다. 신규 회원 모집을 안내합니다.',
  },
  // 6. 食事・乾杯
  {
    id: 'toast',
    type: 'toast',
    title: '乾杯',
    subtitle: '食事開始',
    message: '皆様のご健康と\n慶應義塾の発展を祈念いたしまして',
    caller: '乾杯ご発声',
    notes: '건배 제의입니다. 건배 발성자를 소개합니다.',
  },
  // 7. 抽選会
  {
    id: 'lucky-draw',
    type: 'prize',
    title: '抽選会',
    subtitle: 'ラッキードロー',
    prizes: [
      { rank: '大賞', prize: '豪華賞品' },
      { rank: '1等', prize: '賞品A' },
      { rank: '2等', prize: '賞品B' },
      { rank: '3等', prize: '賞品C' },
      { rank: '参加賞', prize: '記念品' },
    ],
    notes: '럭키드로우(경품 추첨)입니다. 참가자들의 기대감을 높입니다.',
  },
  // 8. 初参加者・在学生紹介
  {
    id: 'introductions',
    type: 'introductions',
    title: '初参加者・在学生紹介',
    subtitle: 'ようこそ！新しい仲間たち',
    categories: [
      { name: '初参加者', description: '本日初めてご参加の皆様' },
      { name: '在学生', description: '現在慶應義塾に在学中の皆様' },
    ],
    notes: '첫 참가자와 재학생을 소개합니다. 각자 간단히 인사하도록 안내합니다.',
  },
  // 9. 閉会の辞
  {
    id: 'closing-speech',
    type: 'speech',
    title: '閉会の辞',
    speaker: '代表者名',
    message: '本日は韓国・ソウル三田会合同新年会に\nご参加いただき、誠にありがとうございました。',
    notes: '폐회사입니다. 대표자가 감사 인사를 전합니다.',
  },
  // 10. 若き血斉唱
  {
    id: 'wakakichi',
    type: 'song',
    title: '若き血',
    subtitle: '斉唱',
    lyrics: [
      '若き血に燃ゆる者',
      '光輝みてる我等',
      '希望の明星仰ぎて此処に',
      '勝利に進む我が力',
      '慶應 慶應 陸の王者 慶應',
    ],
    notes: '와카키치(若き血) 제창입니다. 가사를 화면에 표시합니다.',
  },
  // 11. 記念撮影
  {
    id: 'photo',
    type: 'photo',
    title: '記念撮影',
    message: '皆様、ステージ前にお集まりください',
    instruction: '撮影後は二次会会場へご案内いたします',
    notes: '기념사진 촬영입니다. 참가자들을 무대 앞으로 안내합니다.',
  },
  // 12. 閉会
  {
    id: 'closing',
    type: 'closing',
    title: 'ありがとうございました',
    message: '本日は合同新年会にご参加いただき、\n誠にありがとうございました。',
    footer: '2026年も皆様にとって素晴らしい一年になりますように',
    notes: '폐회 슬라이드입니다. 감사 인사와 함께 마무리합니다.',
  },
]

export default slidesData
