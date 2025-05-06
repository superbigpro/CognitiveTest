import {ResponseTime, SymbolItem, TestPerformance} from '../types';

// 랜덤 테스트 데이터 생성 (1~9 중 랜덤 숫자 20개)
export const generateRandomData = (): SymbolItem[] => {
  const randomData: SymbolItem[] = [];
  for (let i = 0; i < 20; i++) {
    randomData.push({
      id: `question-${i}`,
      number: Math.floor(Math.random() * 9) + 1,
    });
  }
  return randomData;
};

// 반응 시간 통계 계산
export const calculatePerformance = (
  responseTimes: ResponseTime[],
  correctAnswers: string[],
): TestPerformance => {
  if (responseTimes.length === 0) {
    return {
      averageResponseTime: 0,
      fastestResponseTime: 0,
      slowestResponseTime: 0,
      correctAnswersResponseTime: 0,
      incorrectAnswersResponseTime: 0,
    };
  }

  // 모든 응답 시간
  const allTimes = responseTimes.map(item => item.timeInMs);

  // 평균, 최소, 최대 응답 시간
  const totalTime = allTimes.reduce((sum, time) => sum + time, 0);
  const averageResponseTime = Math.round(totalTime / allTimes.length);
  const fastestResponseTime = Math.min(...allTimes);
  const slowestResponseTime = Math.max(...allTimes);

  // 정답과 오답으로 응답 시간 분류
  const correctTimes: number[] = [];
  const incorrectTimes: number[] = [];

  responseTimes.forEach(item => {
    if (correctAnswers.includes(item.questionId)) {
      correctTimes.push(item.timeInMs);
    } else {
      incorrectTimes.push(item.timeInMs);
    }
  });

  // 정답과 오답의 평균 응답 시간
  const correctAnswersResponseTime =
    correctTimes.length > 0
      ? Math.round(
          correctTimes.reduce((sum, time) => sum + time, 0) /
            correctTimes.length,
        )
      : 0;

  const incorrectAnswersResponseTime =
    incorrectTimes.length > 0
      ? Math.round(
          incorrectTimes.reduce((sum, time) => sum + time, 0) /
            incorrectTimes.length,
        )
      : 0;

  return {
    averageResponseTime,
    fastestResponseTime,
    slowestResponseTime,
    correctAnswersResponseTime,
    incorrectAnswersResponseTime,
  };
};

// 응답 시간을 사람이 읽기 쉬운 형식으로 변환 (예: 1200ms -> "1.2초")
export const formatResponseTime = (timeInMs: number): string => {
  if (timeInMs < 1000) {
    return `${timeInMs}ms`;
  }
  return `${(timeInMs / 1000).toFixed(1)}초`;
};
