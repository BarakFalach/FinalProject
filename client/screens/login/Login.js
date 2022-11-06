import React, {useEffect, useState} from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {View} from 'react-native';
import axios from 'axios';
import {Button} from '@rneui/themed';

const webClientId =
  '268322603163-mh7i98imn3m5s949bdqa1pi5bt6kmbmq.apps.googleusercontent.com';

const url = 'http://10.0.2.2:3000/';

function LoginScreen({navigation}) {
  const [user, setUser] = useState({});
  const [authenticated, setAuthenticated] = useState(false);
  useEffect(() => {
    GoogleSignin.configure({
      webClientId,
      offlineAccess: true,
      forceCodeForRefreshToken: true,
      scopes: ['https://www.googleapis.com/auth/fitness.activity.read'],
    });
  }, []);

  const navigateToHomePage = () => {
    navigation.navigate('Home');
  };

  const authClient = async () => {
    const data = JSON.stringify({
      id_token: user.idToken,
    });
    const headers = {
      'content-type': 'application/json',
      idToken: user.idToken,
      code: user.serverAuthCode,
    };

    await axios
      .post(`${url}auth`, data, {
        headers,
      })
      .then(() => setAuthenticated(true))
      .catch(err => console.log(err));
  };

  const getName = async () => {
    await axios
      .get(`${url}user`)
      .then(res => setUser(res.data))
      .catch(err => console.log(err));
  };

  const signIn = async () => {
    try {
      console.log('Stsrt sign in');
      await GoogleSignin.hasPlayServices();
      console.log('hasPlayServices');
      const userInfo = await GoogleSignin.signIn();
      setUser(userInfo);
      console.log(userInfo);
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

  return (
    <View>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Light}
        onPress={signIn}
      />
      <Button onPress={signOut}>Sign Out</Button>
      <Button onPress={authClient}>Auth Server</Button>
      {authenticated && <Button onPress={navigateToHomePage}>Get Name</Button>}
    </View>
  );
}

export default LoginScreen;
