// 화면 구성을 위한 예시 데이터입니다. Supabase 연결 단계에서 원격 데이터로 교체합니다.
// 감상과 질문 메모는 사용자의 실제 기록이 아닌 예시입니다.
export const books = [
  {
    id: 'masquerade', title: '가면무도회', authorId: 'lermontov', genre: '희곡',
    status: '완독', color: '#643f49',
    note: '음악을 듣다가 원작이 궁금해졌다. 책을 읽고 같은 음악을 다시 들어보고 싶다.',
    resources: [
      { id: 'masquerade-music', category: '음악·예술', title: '책에서 무대로, 하차투리안의 왈츠',
        description: '1941년 바흐탄고프 극장의 『가면무도회』 공연을 위해 하차투리안이 음악을 썼다. 공연 기록에서 책과 음악의 연결을 살펴볼 수 있다.',
        url: 'https://vakhtangov.ru/en/show/maskarad/', source: '바흐탄고프 극장 공연 기록', spoiler: false },
      { id: 'masquerade-names', category: '이름·호칭', title: '이름과 부칭은 어떻게 구분할까?',
        description: '같은 인물이 다른 호칭으로 등장할 때 다시 확인할 자료를 찾아두고 싶다. 아직 해설과 출처를 추가하지 않은 질문 메모다.',
        url: '', source: '', spoiler: false },
      { id: 'masquerade-ending', category: '독서 메모', title: '마지막 장면을 읽고 다시 듣기',
        description: '마지막 장면을 읽은 뒤 음악의 인상이 어떻게 달라졌는지 여기에 기록해보기. 스포일러 접기 기능을 보여주는 예시 메모다.',
        url: '', source: '', spoiler: true },
    ],
  },
  { id: 'first-love', title: '첫사랑', authorId: 'turgenev', genre: '소설', status: '완독', color: '#5d684f', note: '', resources: [] },
  { id: 'forged-coupon', title: '위조 쿠폰', authorId: 'tolstoy', genre: '소설', status: '완독', color: '#8a6648', note: '', resources: [] },
  { id: 'overcoat-nose', title: '외투 · 코', authorId: 'gogol', genre: '소설', status: '완독', color: '#475e68', note: '', resources: [] },
]
