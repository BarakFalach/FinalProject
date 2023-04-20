import React from 'react';
import {Center, Image} from 'native-base';
import {Dimensions} from 'react-native';
import {Colors} from '../../utils/constants';
import {Text, StyleSheet} from 'react-native';

const icons = {
  score: require('../../assets/playstore-icon.png'),
  podium: require('../../assets/podium.png'),
  group: require('../../assets/group.png'),
};

export const WelcomeScreen = ({navigation}) => {
  React.useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Login');
    }, 2000);
  }, []);

  return (
    <Center
      backgroundColor={Colors.logoBackground}
      height={Dimensions.get('window').height}>
      <Text style={styles.text} color="orange.200">
        Walk With Us
      </Text>
      <Image source={icons.score} size="xl" alt="icon" />
      <Text fontFamily={'heading'} style={styles.heading}>
        BGU Fit
      </Text>
    </Center>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 24,
    color: Colors.backGround,
  },
  text: {
    fontSize: 24,
    fontFamily: 'Montserrat-Regular',
    color: Colors.backGround,
  },
});
