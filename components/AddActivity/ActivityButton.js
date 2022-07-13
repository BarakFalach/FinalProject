import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {ListItem, Avatar} from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import TouchableScale from 'react-native-touchable-scale';

const ActivityButton = props => {
  const back = () => props.navigation.goBack();

  return (
    <View>
      <Text>Activity Button</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default ActivityButton;
