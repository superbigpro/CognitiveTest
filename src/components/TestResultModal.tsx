import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {TestPerformance} from '../types';
import {formatResponseTime} from '../libs/testUtils';

type TestResultModalProps = {
  visible: boolean;
  onClose: () => void;
  score: number;
  totalQuestions: number;
  performance: TestPerformance;
};

export const TestResultModal: React.FC<TestResultModalProps> = ({
  visible,
  onClose,
  score,
  totalQuestions,
  performance,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>테스트 결과</Text>

          {/* 점수 정보 */}
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreText}>
              점수: {score}/{totalQuestions}
            </Text>
            <Text style={styles.scorePercent}>
              ({Math.round((score / totalQuestions) * 100)}%)
            </Text>
          </View>

          {/* 구분선 */}
          <View style={styles.divider} />

          {/* 반응 속도 정보 */}
          <Text style={styles.sectionTitle}>반응 속도 분석</Text>

          <ScrollView style={styles.statsContainer}>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>평균 반응 시간:</Text>
              <Text style={styles.statValue}>
                {formatResponseTime(performance.averageResponseTime)}
              </Text>
            </View>

            <View style={styles.statRow}>
              <Text style={styles.statLabel}>가장 빠른 반응:</Text>
              <Text style={styles.statValue}>
                {formatResponseTime(performance.fastestResponseTime)}
              </Text>
            </View>

            <View style={styles.statRow}>
              <Text style={styles.statLabel}>가장 느린 반응:</Text>
              <Text style={styles.statValue}>
                {formatResponseTime(performance.slowestResponseTime)}
              </Text>
            </View>

            <View style={styles.statRow}>
              <Text style={styles.statLabel}>정답 평균 반응 시간:</Text>
              <Text style={styles.statValue}>
                {formatResponseTime(performance.correctAnswersResponseTime)}
              </Text>
            </View>

            <View style={styles.statRow}>
              <Text style={styles.statLabel}>오답 평균 반응 시간:</Text>
              <Text style={styles.statValue}>
                {formatResponseTime(performance.incorrectAnswersResponseTime)}
              </Text>
            </View>
          </ScrollView>

          {/* 닫기 버튼 */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>닫기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  scoreText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4E9EF6',
  },
  scorePercent: {
    fontSize: 16,
    marginLeft: 5,
    color: '#666',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'flex-start',
    color: '#333',
  },
  statsContainer: {
    width: '100%',
    maxHeight: 200,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  statLabel: {
    fontSize: 14,
    color: '#555',
  },
  statValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    backgroundColor: '#4E9EF6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  closeButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});
