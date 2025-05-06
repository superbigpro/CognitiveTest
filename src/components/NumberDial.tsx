import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {NumberPictures} from '../constant/NumberPictures';

type NumberDialProps = {
  onNumberSelect: (number: number) => void;
  isComplete: boolean;
};

export const NumberDial: React.FC<NumberDialProps> = ({
  onNumberSelect,
  isComplete,
}) => {
  return (
    <View style={styles.dialContainer}>
      <View style={styles.dialRow}>
        {[1, 2, 3].map(num => (
          <TouchableOpacity
            key={num}
            style={styles.dialButton}
            disabled={isComplete}
            onPress={() => onNumberSelect(num)}>
            <Image
              source={NumberPictures[num as keyof typeof NumberPictures]}
              style={styles.symbolImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.dialRow}>
        {[4, 5, 6].map(num => (
          <TouchableOpacity
            key={num}
            style={styles.dialButton}
            disabled={isComplete}
            onPress={() => onNumberSelect(num)}>
            <Image
              source={NumberPictures[num as keyof typeof NumberPictures]}
              style={styles.symbolImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.dialRow}>
        {[7, 8, 9].map(num => (
          <TouchableOpacity
            key={num}
            style={styles.dialButton}
            disabled={isComplete}
            onPress={() => onNumberSelect(num)}>
            <Image
              source={NumberPictures[num as keyof typeof NumberPictures]}
              style={styles.symbolImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dialContainer: {
    width: '100%',
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 5,
  },
  dialButton: {
    width: 62,
    height: 62,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  symbolImage: {
    width: 40,
    height: 40,
  },
});
