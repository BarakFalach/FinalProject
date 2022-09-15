import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const HomeHeader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.stepsContainer}>
        <Text style={styles.text}>Today Steps </Text>
        <Text style={styles.numericText}>987</Text>
      </View>
      <View>
        <Text style={styles.welcomeText}>Hello, Barak</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.13,
    padding: 4,
    justifyContent: 'space-between',
    color: 'white',
  },
  numericText: {color: '#FFB703', fontWeight: '800', fontSize: 16},
  text: {color: 'white', fontWeight: '500', fontSize: 16},
  welcomeText: {
    color: 'white',
    fontWeight: '800',
    fontSize: 22,
    fontFamily: 'notoserif',
  },
  stepsContainer: {flexDirection: 'row'},
});

export default HomeHeader;
