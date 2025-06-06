export interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

export const faqData: { faqItems: FaqItem[] } = {
  faqItems: [
    {
      id: 1,
      question: 'GOGO는 어떤 서비스 인가요?',
      answer:
        'GOGO는 전국 중·고등학교를 대상으로 하는 스포츠 행사 플랫폼입니다. 사용자는 간편하게 스포츠 행사를 생성하고 운영할 수 있으며, 대진표 생성, 경기 일정 관리 등을 손쉽게 진행할 수 있습니다. 또한 다른 사용자들은 경기의 승부를 예측하여 포인트를 획득하고, 경기를 더욱 재미있게 즐길 수 있습니다.',
    },
    {
      id: 2,
      question: '스테이지는 무엇인가요?',
      answer:
        '스테이지는 하나의 스포츠 행사 단위로, 예를 들어 교내 체육대회나 스포츠 리그 등을 의미합니다.',
    },
    {
      id: 3,
      question: '사설, 공식 스테이지의 차이점은 무엇인가요?',
      answer:
        '사설 스테이지는 학생 누구나 생성할 수 있으며, 하나의 경기만 추가할 수 있고 코인토스 미니게임을 사용할 수 있습니다. 공식 스테이지는 경기 추가에 제한이 없고, 코인토스, 야바위, 플린코 미니게임을 추가할 수 있으며 상점 기능도 사용할 수 있습니다.',
    },
    {
      id: 4,
      question: '공식 스테이지를 생성하려면 어떻게 해야하나요?',
      answer:
        '공식 스포츠 행사를 생성하려면 해당 학교의 학생회 인원이 고객센터를 통해 학교 인증을 받아야 하며, 인증을 완료하면 공식 스테이지 생성 권한이 부여됩니다. 자세한 사항은 고객센터를 참고하시기 바랍니다.',
    },
    {
      id: 5,
      question: '배팅은 언제 가능한가요?',
      answer: '배팅은 매치 시작 24시간 전부터 시작 5분 전까지 가능합니다.',
    },
    {
      id: 6,
      question: '배팅에 성공하면 포인트를 얼마나 받을 수 있나요?',
      answer:
        '배당식은 다음과 같습니다. (패배팀 총 배팅 포인트 / 승리팀 총 배팅 포인트) X 나의 배팅 포인트 + 나의 배팅 포인트',
    },
    {
      id: 7,
      question: '내가 출전하는 매치에는 배팅이 불가능한가요?',
      answer: '네 불가합니다.',
    },
    {
      id: 8,
      question: '정산은 무엇인가요?',
      answer:
        '정산은 매치 종료 이후 스테이지 관리자가 경기 결과를 확정하는 과정입니다. 정산 후 5분 이내에는 취소할 수 있으며, 이후에는 취소할 수 없습니다. 정산을 취소한 경우, 3분 후에 다시 정산할 수 있습니다.',
    },
    {
      id: 9,
      question: '배팅에 성공했는데 포인트가 들어오지 않아요.',
      answer:
        '정산이 완료되면 획득한 포인트는 임시포인트 형태로 먼저 지급됩니다. 임시포인트는 사용자 프로필 → 스테이지 상세보기에서 확인할 수 있으며, 지급 후 5분이 지나면 실제 포인트로 전환됩니다.',
    },
    {
      id: 10,
      question: '파산했어요.. (for GSM)',
      answer:
        'GOGO는 청소년 불법 도박, 도박 중독 캠페인과 함께합니다. 파산 모달을 확인했다면 2층 홈베이스에 비치되어있는 도박예방서약서에 서명을 하고 제출함에 제출하면 한 번의 기회로 포인트를 지원받을 수 있습니다. (전체 포인트의 평균, 최소 3만, 최대 5만)',
    },
  ],
};

export default faqData;
