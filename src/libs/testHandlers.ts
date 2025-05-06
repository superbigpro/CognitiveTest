import {ResponseTime, SymbolItem, TestPerformance} from '../types';
import {calculatePerformance} from './testUtils';

export const handleNumberSelect = (
  selectedNumber: number,
  currentState: {
    currentQuestion: SymbolItem;
    testData: SymbolItem[];
    currentIndex: number;
    score: number;
    answered: string[];
    correctAnswers: string[];
    responseTimes: ResponseTime[];
    startTime: number;
    isComplete: boolean;
  },
  handlers: {
    updateScore: (newScore: number) => void;
    moveToNextQuestion: () => void;
    completeTest: (performance: TestPerformance) => void;
    recordAnswer: (
      questionId: string,
      isCorrect: boolean,
      responseTime: number,
    ) => void;
  },
) => {
  // 이미 테스트가 완료되었거나 이미 답한 문제면 무시
  if (
    currentState.isComplete ||
    currentState.answered.includes(currentState.currentQuestion.id)
  ) {
    return;
  }

  // 응답 시간 계산
  const endTime = new Date().getTime();
  const responseTime = endTime - currentState.startTime;

  // 정답 여부 확인
  const isCorrect = selectedNumber === currentState.currentQuestion.number;

  // 응답 기록 (정답 여부와 응답 시간)
  handlers.recordAnswer(
    currentState.currentQuestion.id,
    isCorrect,
    responseTime,
  );

  // 점수 업데이트 (정답인 경우)
  if (isCorrect) {
    handlers.updateScore(currentState.score + 1);
  }

  // 다음 문제로 이동 또는 테스트 완료
  if (currentState.currentIndex < currentState.testData.length - 1) {
    handlers.moveToNextQuestion();
  } else {
    // 성능 통계를 계산하여 테스트 완료
    const allResponseTimes = [
      ...currentState.responseTimes,
      {
        questionId: currentState.currentQuestion.id,
        timeInMs: responseTime,
      },
    ];

    // 테스트 완료 핸들러 호출 (성능 통계는 컴포넌트에서 계산)
    handlers.completeTest({
      averageResponseTime: calculateAverageTime(allResponseTimes),
      fastestResponseTime: calculateMinTime(allResponseTimes),
      slowestResponseTime: calculateMaxTime(allResponseTimes),
      correctAnswersResponseTime: 0, // 컴포넌트에서 계산
      incorrectAnswersResponseTime: 0, // 컴포넌트에서 계산
    });
  }
};

// 간단한 헬퍼 함수들
const calculateAverageTime = (times: ResponseTime[]): number => {
  if (times.length === 0) return 0;
  const sum = times.reduce((acc, time) => acc + time.timeInMs, 0);
  return Math.round(sum / times.length);
};

const calculateMinTime = (times: ResponseTime[]): number => {
  if (times.length === 0) return 0;
  return Math.min(...times.map(t => t.timeInMs));
};

const calculateMaxTime = (times: ResponseTime[]): number => {
  if (times.length === 0) return 0;
  return Math.max(...times.map(t => t.timeInMs));
};
