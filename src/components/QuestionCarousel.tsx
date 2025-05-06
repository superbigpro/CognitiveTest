import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {SymbolItem} from '../types';

type QuestionCarouselProps = {
  currentIndex: number;
  testData: SymbolItem[];
};

export const QuestionCarousel: React.FC<QuestionCarouselProps> = ({
  currentIndex,
  testData,
}) => {
  // 현재 인덱스 기준으로 이전, 현재, 다음 아이템 렌더링
  const prevIndex = currentIndex > 0 ? currentIndex - 1 : null;
  const nextIndex =
    currentIndex < testData.length - 1 ? currentIndex + 1 : null;

  return (
    <View style={styles.carouselSection}>
      <Text style={styles.instructionText}>
        이 숫자에 해당하는 기호를 아래 다이얼에서 선택하세요
      </Text>

      <View style={styles.fixedCarousel}>
        {/* 이전 아이템 - 빈 공간 유지를 위한 View */}
        <View style={styles.sideItemContainer}>
          {prevIndex !== null && (
            <View style={styles.sideItem}>
              <Text style={styles.sideNumber}>
                {testData[prevIndex].number}
              </Text>
            </View>
          )}
        </View>

        {/* 현재 아이템 - 항상 중앙에 위치 */}
        <View style={styles.centerItem}>
          <Text style={styles.centerNumber}>
            {testData[currentIndex].number}
          </Text>
        </View>

        {/* 다음 아이템 - 빈 공간 유지를 위한 View */}
        <View style={styles.sideItemContainer}>
          {nextIndex !== null && (
            <View style={styles.sideItem}>
              <Text style={styles.sideNumber}>
                {testData[nextIndex].number}
              </Text>
            </View>
          )}
        </View>
      </View>

      <Text style={styles.questionCounter}>
        {currentIndex + 1}/{testData.length}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselSection: {
    width: '100%',
    padding: 12,
    marginVertical: 10,
  },
  instructionText: {
    textAlign: 'center',
    marginBottom: 15,
  },
  fixedCarousel: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 150,
  },
  sideItemContainer: {
    width: 70,
    height: 70,
    marginHorizontal: 6,
  },
  sideItem: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerItem: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  sideNumber: {
    fontSize: 34,
  },
  centerNumber: {
    fontSize: 60,
  },
  questionCounter: {
    textAlign: 'center',
    marginTop: 15,
  },
});
