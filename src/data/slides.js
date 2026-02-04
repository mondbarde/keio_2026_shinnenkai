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
    speaker: '李碩庸（イ・ソクヨン）',
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
    videoUrl: 'https://vimeo.com/1161430886',
    notes: '총장 축사 영상을 재생합니다. 영상 시작 전 안내합니다.',
  },
  // 4. 韓国文化院院長祝辞映像視聴
  {
    id: 'cultural-center-video',
    type: 'video',
    title: '韓国文化院院長祝辞映像',
    subtitle: '朴英恵（パク・ヨンヘ）院長',
    description: '朴英恵院長(法学部政治学科92年卒業)からの祝辞映像をご覧ください',
    videoUrl: 'https://vimeo.com/1161434996',
    notes: '주일본대한민국대사관 한국문화원 박영혜 원장의 축사 영상을 재생합니다.',
  },
  // 5. 東京三田倶楽部祝賀映像視聴
  {
    id: 'mita-club-video',
    type: 'video',
    title: '東京三田倶楽部',
    subtitle: '祝辞映像',
    description: '東京三田倶楽部からのお祝いメッセージをご覧ください',
    videoUrl: 'https://vimeo.com/1161430938',
    notes: '도쿄 미타클럽 축하 영상을 재생합니다.',
  },
  // 6. 三田クラブのご案内
  {
    id: 'mita-info',
    type: 'announcement',
    title: '東京三田倶楽部のご案内',
    image: '/images/0101.jpg',
    address: '〒104-0061\n東京都中央区銀座7-9-15 GINZA gCUBE 12階',
    notes: '도쿄 미타클럽 안내입니다. 비즈니스 미팅 및 모임 장소로 이용 가능함을 안내합니다.',
  },
  // 7. 食事・乾杯
  {
    id: 'toast',
    type: 'toast',
    title: '乾杯',
    subtitle: '食事開始',
    message: '皆様のご健康と\n慶應義塾の発展を祈念いたしまして',
    caller: '乾杯ご発声',
    callerName: 'チャン・ジェグク東西大学長',
    notes: '건배 제의입니다. 장제국 동서대 총장님이 건배 제의합니다.',
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
  // 9. 在学生発表
  {
    id: 'student-presentation',
    type: 'speech',
    title: '在学生発表',
    speaker: '発表者：塾生・崔昇一（チェ・スンイル）君',
    message: '',
    notes: '재학생 발표입니다. 최승일 군이 직접 발표합니다.',
  },
  // 10. スポンサー紹介 1
  {
    id: 'sponsor-1',
    type: 'sponsor',
    title: 'スポンサー紹介',
    subtitle: '本日の新年会を支援してくださった方々',
    sponsorName: '辛裕烈（シン・ユヨル）',
    graduation: '商学部卒業',
    logo: '/images/lotte_logo.webp',
    positions: [
      '現 ロッテホールディングス 未来成長室長 副社長',
      '現 ロッテバイオロジクス 代表取締役 副社長',
      '現 日本ロッテストラテジックインベストメント 代表取締役',
      '現 日本ロッテファイナンシャル 代表取締役',
    ],
    notes: '스폰서 소개 1 - 신유열 부사장',
  },
  // 11. スポンサー紹介 2
  {
    id: 'sponsor-2',
    type: 'sponsor',
    title: 'スポンサー紹介',
    subtitle: '本日の新年会を支援してくださった方々',
    sponsorName: 'ジョン・ヨンテ',
    graduation: '別科',
    logo: '/images/jukjangyeon.png',
    positions: [
      '現 竹長然 代表',
    ],
    notes: '스폰서 소개 2 - 정연태 대표',
  },
  // 12. スポンサー紹介 3 (景品提供者 1)
  {
    id: 'sponsor-3',
    type: 'sponsor',
    title: 'スポンサー紹介',
    subtitle: '景品をご提供いただいた方々',
    sponsors: [
      {
        name: 'ノ・ミリム',
        graduation: '文学部（1975年卒業）',
        prize: '本人著書',
      },
      {
        name: '宮崎 能成',
        graduation: '法学部政治学科（1986年卒業）',
        prize: '日本カップラーメン 1ケース',
      },
      {
        name: 'キム・スジン',
        graduation: '文学部（1989年卒業）',
        prize: '百貨店10万ウォン商品券 2枚',
      },
      {
        name: '中島 幸一',
        graduation: '理工学研究科計測工学専攻（1992年卒業）',
        prize: 'お酒（日本酒またはウイスキー等）1本 約10万ウォン',
      },
      {
        name: '高瀬 勇',
        graduation: '経済学部（1995年卒業）',
        prize: 'ワイン 1本 5万ウォン',
      },
      {
        name: '山崎 裕二',
        graduation: '経済学部（1996年卒業）',
        prize: 'ゴルフボール 1ダース',
      },
    ],
    notes: '스폰서 소개 3 - 경품 제공자 1페이지',
  },
  // 13. スポンサー紹介 4 (景品提供者 2)
  {
    id: 'sponsor-4',
    type: 'sponsor',
    title: 'スポンサー紹介',
    subtitle: '景品をご提供いただいた方々',
    sponsors: [
      {
        name: '大坪 克英',
        graduation: '法学部政治学科（1997年卒業）',
        prize: '末廣酒造（親族） 大吟醸 1本 約10万ウォン相当',
      },
      {
        name: 'ソン・ギヒ',
        graduation: 'メディアコミュニケーション研究所（2001年卒業）',
        prize: 'トゥブガク 1箱（焼き豆腐菓子 本人開発製品）',
      },
      {
        name: '西園 壽元',
        graduation: '経済学部（2007年卒業）',
        prize: 'ソラリア西鉄ホテルソウル明洞 1泊宿泊券（朝食付き）',
      },
      {
        name: '角舘 一輝',
        graduation: '経済学部（2012年卒業）',
        prize: 'スターバックスコーヒーチケット 1万ウォン券',
      },
      {
        name: 'ハ・ドギュ',
        graduation: '商学部（2015年卒業）',
        prize: 'ワイン 1本（キム・デシク国会議員贈呈のワイン）',
      },
      {
        name: 'パク・ジュンヨン',
        graduation: '商学部（2019年卒業）',
        prize: 'ワイン 1本（カナダ産 約10万ウォン相当）',
      },
    ],
    notes: '스폰서 소개 4 - 경품 제공자 2페이지',
  },
  // 14. 抽選会
  {
    id: 'lucky-draw',
    type: 'prize',
    title: '抽選会',
    subtitle: 'ラッキードロー',
    notes: '럭키드로우(경품 추첨)입니다. 번호표 범위를 설정하고 실시간으로 추첨합니다.',
  },
  // 15. 閉会の辞
  {
    id: 'closing-speech',
    type: 'speech',
    title: '閉会の辞',
    speaker: '高瀬 勇',
    message: '本日は韓国・ソウル三田会合同新年会に\nご参加いただき、誠にありがとうございました。',
    notes: '폐회사입니다. 대표자가 감사 인사를 전합니다.',
  },
  // 16. 若き血斉唱
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
      '常に新し',
      '見よ精鋭の集う処',
      '烈日の意気高らかに',
      '遮る雲なきを',
      '慶應　慶應',
      '陸の王者　慶應',
    ],
    notes: '와카키치(若き血) 제창입니다. 가사를 화면에 표시합니다.',
  },
  // 17. 記念撮影
  {
    id: 'photo',
    type: 'photo',
    title: '記念撮影',
    message: '皆様、ステージ前にお集まりください',
    instruction: '記念撮影を以って本日予定されているプログラムは全て終了となります。',
    notes: '기념사진 촬영입니다. 참가자들을 무대 앞으로 안내합니다.',
  },
  // 18. 閉会
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
