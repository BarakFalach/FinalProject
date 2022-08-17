import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {GroupContext} from '../../App';

export const LineItem = props => {
  const {name, score} = props.user;
  return (
    <View style={styles.rowContainer}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          flex: 1,
        }}>
        <Text style={props.place === 0 ? styles.userText : styles.text}>
          # {props.place + 1}
        </Text>
        <View
          style={{
            justifyContent: 'flex-start',
            flexDirection: 'row',
            flex: 0.7,
          }}>
          <Text style={props.place === 0 ? styles.userText : styles.text}>
            {name}
          </Text>
        </View>
      </View>
      <Text style={props.place === 0 ? styles.userText : styles.text}>
        {score}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  text: {color: 'white', fontWeight: '500', fontSize: 16},
  userText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});
