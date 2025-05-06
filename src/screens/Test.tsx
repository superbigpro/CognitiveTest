import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {ReferencePanel} from '../components/ReferencePanel';
import {QuestionCarousel} from '../components/QuestionCarousel';
import {NumberDial} from '../components/NumberDial';
import {TestResultModal} from '../components/TestResultModal';
import {generateRandomData} from '../libs/testUtils';
import {handleNumberSelect} from '../libs/testHandlers';
import {ResponseTime, SymbolItem, TestPerformance} from '../types';

// 기본 symbols객체 (1~9까지 고정)
const symbols: SymbolItem[] = [
  {id: 'symbol-1', number: 1},
  {id: 'symbol-2', number: 2},
  {id: 'symbol-3', number: 3},
  {id: 'symbol-4', number: 4},
  {id: 'symbol-5', number: 5},
  {id: 'symbol-6', number: 6},
  {id: 'symbol-7', number: 7},
  {id: 'symbol-8', number: 8},
  {id: 'symbol-9', number: 9},
];

// 기본 성능 통계 값
const defaultPerformance: TestPerformance = {
  averageResponseTime: 0,
  fastestResponseTime: 0,
  slowestResponseTime: 0,
  correctAnswersResponseTime: 0,
  incorrectAnswersResponseTime: 0,
};

export function Test(): React.JSX.Element {
  const [testData, setTestData] = useState(generateRandomData());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<string[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  // 반응 속도 관련 상태
  const [startTime, setStartTime] = useState(0);
  const [responseTimes, setResponseTimes] = useState<ResponseTime[]>([]);
  const [performance, setPerformance] =
    useState<TestPerformance>(defaultPerformance);
  const [showResults, setShowResults] = useState(false);

  // 컴포넌트 마운트 시 첫 문제의 시작 시간 기록
  useEffect(() => {
    setStartTime(new Date().getTime());
  }, []);

  // 테스트 초기화 함수
  const resetTest = () => {
    setTestData(generateRandomData());
    setCurrentIndex(0);
    setScore(0);
    setAnswered([]);
    setCorrectAnswers([]);
    setIsComplete(false);
    setResponseTimes([]);
    setPerformance(defaultPerformance);
    setShowResults(false);
    setStartTime(new Date().getTime());
  };

  // 사용자가 숫자를 선택했을 때 실행되는 함수
  const onNumberSelect = (selectedNumber: number) => {
    // libs/testHandlers의 handleNumberSelect 함수 사용
    handleNumberSelect(
      selectedNumber,
      {
        currentQuestion: testData[currentIndex],
        testData,
        currentIndex,
        score,
        answered,
        correctAnswers,
        responseTimes,
        startTime,
        isComplete,
      },
      {
        updateScore: (newScore: number) => setScore(newScore),
        moveToNextQuestion: () => {
          setCurrentIndex(currentIndex + 1);
          setStartTime(new Date().getTime());
        },
        completeTest: (performance: TestPerformance) => {
          // 정답/오답 응답시간 추가 계산 (복잡한 로직은 여기서 처리)
          const correctQuestionIds = [...correctAnswers];
          const isCurrentCorrect =
            selectedNumber === testData[currentIndex].number;
          if (isCurrentCorrect) {
            correctQuestionIds.push(testData[currentIndex].id);
          }

          // 정답 및 오답 시간 계산
          const endTime = new Date().getTime();
          const currentResponseTime = endTime - startTime;
          const updatedResponseTimes = [
            ...responseTimes,
            {
              questionId: testData[currentIndex].id,
              timeInMs: currentResponseTime,
            },
          ];

          const correctTimes = updatedResponseTimes
            .filter(item => correctQuestionIds.includes(item.questionId))
            .map(item => item.timeInMs);

          const incorrectTimes = updatedResponseTimes
            .filter(item => !correctQuestionIds.includes(item.questionId))
            .map(item => item.timeInMs);

          // 정답/오답 평균 시간 계산
          const correctAvg =
            correctTimes.length > 0
              ? correctTimes.reduce((a, b) => a + b, 0) / correctTimes.length
              : 0;

          const incorrectAvg =
            incorrectTimes.length > 0
              ? incorrectTimes.reduce((a, b) => a + b, 0) /
                incorrectTimes.length
              : 0;

          // 완성된 성능 객체 설정
          const completePerformance = {
            ...performance,
            correctAnswersResponseTime: correctAvg,
            incorrectAnswersResponseTime: incorrectAvg,
          };

          setPerformance(completePerformance);
          setIsComplete(true);
          setShowResults(true);
        },
        recordAnswer: (
          questionId: string,
          isCorrect: boolean,
          responseTime: number,
        ) => {
          // 응답 기록
          setAnswered([...answered, questionId]);

          // 응답 시간 기록
          setResponseTimes([
            ...responseTimes,
            {
              questionId,
              timeInMs: responseTime,
            },
          ]);

          // 정답인 경우 정답 목록에 추가
          if (isCorrect) {
            setCorrectAnswers([...correctAnswers, questionId]);
          }
        },
      },
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.scoreText}>
          점수: {score}/{testData.length}
        </Text>

        {/* 상단: 참조용 상형문자-숫자 패드 */}
        <ReferencePanel symbols={symbols} />

        {/* 중간: 고정 캐러셀 (항상 중앙에 현재 문제) */}
        <QuestionCarousel currentIndex={currentIndex} testData={testData} />

        {/* 하단: 숫자 다이얼 */}
        <NumberDial onNumberSelect={onNumberSelect} isComplete={isComplete} />

        {/* 테스트 결과 모달 */}
        <TestResultModal
          visible={showResults}
          onClose={() => resetTest()}
          score={score}
          totalQuestions={testData.length}
          performance={performance}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f7',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  scoreText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
