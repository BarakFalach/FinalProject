import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
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

export const LineItem = props => {
  const {name, score} = props.user;
  const {user} = useUser();

  const isUser = name === user?.name;
  console.log('isUser', name, user?.name, isUser);
  return (
    <View style={styles.rowContainer}>
      <View style={{width: 120}}>
        <Text numberOfLines={1} style={isUser ? styles.userText : styles.text}>
          {convertToOrdinal(props.place + 1)}
        </Text>
      </View>
      <View
        style={{
          alignItems: 'flex-start',
          width: 140,
        }}>
        <Text numberOfLines={1} style={isUser ? styles.userText : styles.text}>
          {name}
        </Text>
      </View>
      <View style={{width: 120, alignItems: 'flex-end'}}>
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
    marginBottom: 10,
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
