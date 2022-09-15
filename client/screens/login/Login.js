import React from 'react';
import {View} from 'react-native';
import {Input, Button, ThemeProvider} from '@rneui/themed';

function LoginScreen({navigation}) {
  const navigateToHomePage = () => {
    navigation.navigate('Home');
  };

  return (
    <ThemeProvider>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Input placeholder="Username" />
        <Input placeholder="Password" secureTextEntry />

        <Button onPress={navigateToHomePage} color="secondary" radius={4}>
          Login
        </Button>
      </View>
    </ThemeProvider>
  );
}

export default LoginScreen;
