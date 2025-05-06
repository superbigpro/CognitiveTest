import React from 'react';
import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import {NumberPictures} from '../constant/NumberPictures';
import {SymbolItem} from '../types';

type ReferencePanelProps = {
  symbols: SymbolItem[];
};

export const ReferencePanel: React.FC<ReferencePanelProps> = ({symbols}) => {
  return (
    <View style={styles.referenceContainer}>
      <FlatList
        data={symbols}
        renderItem={({item}) => (
          <View style={styles.referenceItem}>
            <Text style={styles.referenceNumber}>{item.number}</Text>
            <Image
              source={NumberPictures[item.number]}
              style={styles.referenceImage}
              resizeMode="contain"
            />
          </View>
        )}
        keyExtractor={item => item.id}
        numColumns={3}
        contentContainerStyle={styles.referenceGrid}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  referenceContainer: {
    width: '100%',
    padding: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  referenceGrid: {
    paddingVertical: 2,
  },
  referenceItem: {
    width: 98,
    height: 48,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 2,
    margin: 2,
  },
  referenceImage: {
    width: 32,
    height: 32,
  },
  referenceNumber: {
    fontSize: 16,
  },
});
