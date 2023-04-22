import React from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {GroupContext} from '../../App';
import {Colors, Fonts} from '../../utils/constants';
import {useUser} from '../../hooks/useUser';

function convertToOrdinal(num) {
  if (isNaN(num)) {
    return num;
  }
  var lastDigit = num % 10;
  var lastTwoDigits = num % 100;
  if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
    return num + 'th';
  }
  switch (lastDigit) {
    case 1:
      return num + 'st';
    case 2:
      return num + 'nd';
    case 3:
      return num + 'rd';
    default:
      return num + 'th';
  }
}

const screenWidth = Math.round(Dimensions.get('window').width);

export const LineItem = props => {
  const {name, score} = props.user;
  const {user} = useUser();

  const isUser = name === user?.name;
  console.log('isUser', name, user?.name, isUser);
  return (
    <View style={styles.rowContainer}>
      <View style={{width: screenWidth * 0.25}}>
        <Text numberOfLines={1} style={isUser ? styles.userText : styles.text}>
          {convertToOrdinal(props.place + 1)}
        </Text>
      </View>
      <View
        style={{
          alignItems: 'flex-start',
          width: screenWidth * 0.4,
        }}>
        <Text numberOfLines={1} style={isUser ? styles.userText : styles.text}>
          {name}
        </Text>
      </View>
      <View
        style={{
          width: screenWidth * 0.25,
          alignItems: 'flex-end',
        }}>
        <Text numberOfLines={1} style={isUser ? styles.userText : styles.text}>
          {score}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    padding: screenWidth * 0.015,
    justifyContent: 'space-between',
  },
  text: {color: Colors.blue, fontFamily: Fonts.SemiBold, fontSize: 16},
  userText: {
    color: Colors.blue,
    fontFamily: Fonts.SemiBold,
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});
