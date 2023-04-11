import React, {useCallback, useEffect} from 'react';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import {View, Button} from 'react-native';
import {Colors} from '../../utils/constants';
import {useUser} from '../../hooks/useUser';
import {getSessionidUser} from '../../api/login';
import {useSignIn} from '../../api/useSignIn';

const NO_USER = 'NO_USER';

function LoginScreen({navigation}) {
  const {user, setUser} = useUser();
  const {signIn, isLoading} = useSignIn();
  useEffect(() => {
    getSessionidUser().then(res => {
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
  }, [navigation]);

  useEffect(() => {
    if (user?.email) {
      navigateToHomePage();
    }
  }, [user, navigateToHomePage]);

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        backgroundColor: Colors.secondary,
      }}>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Light}
        onPress={signIn}
      />
      {/* <Button title="Sign Out" onPress={signOut} /> */}
    </View>
  );
}

export default LoginScreen;
