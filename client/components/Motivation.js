import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {Colors, Fonts} from '../utils/constants';

export const Motivation = ({content, height}) => {
  return (
    <View style={styles.padding}>
      <View style={{...styles.card, height: height || 50}}>
        <Text style={styles.text}>{content}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderWidth: 3,
    borderColor: Colors.pink,
    backgroundColor: 'rgba(255, 217, 183, 0.5)',
    borderRadius: 10,
    //add shadow
    padding: 5,
  },
  padding: {
    padding: 10,
  },
  text: {
    fontFamily: Fonts.SemiBold,
  },
});
