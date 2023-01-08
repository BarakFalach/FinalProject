import React, {useCallback, useEffect, useState} from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {View} from 'react-native';
import axios from 'axios';
import {Button} from '@rneui/themed';
import {UserContext} from '../../App';

const webClientId =
  '268322603163-mh7i98imn3m5s949bdqa1pi5bt6kmbmq.apps.googleusercontent.com';

const NO_USER = 'NO_USER';

const url = 'http://10.0.2.2:3000/';
GoogleSignin.configure({
  webClientId,
  offlineAccess: true,
  forceCodeForRefreshToken: true,
  scopes: ['https://www.googleapis.com/auth/fitness.activity.read'],
});

function LoginScreen({navigation}) {
  const {user, setUser} = React.useContext(UserContext);
  useEffect(() => {
    axios.get(`${url}user`).then(res => {
      if (res.data === NO_USER) {
        console.log('no user');
        return;
      }
      console.log('res.data', res.data);
      setUser(res.data);
    });
  }, [setUser]);

  const navigateToHomePage = useCallback(() => {
    navigation.navigate('Join Group');
  }, []);

  const authClient = async userAuthData => {
    const data = JSON.stringify({
      id_token: userAuthData.idToken,
    });
    const headers = {
      'content-type': 'application/json',
      idToken: userAuthData.idToken,
      code: userAuthData.serverAuthCode,
    };

    await axios
      .post(`${url}auth`, data, {
        headers,
      })
      .then(userData => setUser(userData.data))
      .catch(err => console.log(err));
  };

  const signIn = async () => {
    try {
      console.log('Stsrt sign in');
      await GoogleSignin.hasPlayServices();
      console.log('hasPlayServices');
      GoogleSignin.signIn().then(userAuthData => authClient(userAuthData));
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User Cancelled the Login Flow');
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Signing In');
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play Services Not Available or Outdated');
        // play services not available or outdated
      } else {
        console.log('Some Other Error Happened', error.code);
        // some other error happened
      }
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      setUser({});
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user?.email) {
      navigateToHomePage();
    }
  }, [user, navigateToHomePage]);

  return (
    <View>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Light}
        onPress={signIn}
      />
      <Button onPress={signOut}>Sign Out</Button>
    </View>
  );
}

export default LoginScreen;
