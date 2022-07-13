import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const GroupIconItem = props => {
  return (
    <View>
      <View style={styles.imageContainer}>
        <Image style={styles.icon} source={props.iconSource} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{props.value}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  icon: {
    width: 45,
    height: 45,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default GroupIconItem;
