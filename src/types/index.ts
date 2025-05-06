export type SymbolItem = {
  id: string;
  number: number;
};

export type TestResult = {
  answered: string[];
  correctAnswers: string[];
};

export type ResponseTime = {
  questionId: string;
  timeInMs: number;
};

export type TestPerformance = {
  averageResponseTime: number;
  fastestResponseTime: number;
  slowestResponseTime: number;
  correctAnswersResponseTime: number;
  incorrectAnswersResponseTime: number;
};
