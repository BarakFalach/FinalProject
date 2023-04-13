import React, {useCallback, useEffect} from 'react';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import {Dimensions} from 'react-native';
import {SignInErrors} from '../../utils/constants';
import {useUser} from '../../hooks/useUser';
import {getSessionidUser} from '../../api/login';
import {useSignIn} from '../../api/useSignIn';
import {Spinner, Text, VStack} from 'native-base';
import {GoogleFitAlert} from './GoogleFitAlert';

const NO_USER = 'NO_USER';

function LoginScreen({navigation}) {
  const {user, setUser} = useUser();
  const {signIn, isLoading, error} = useSignIn();
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
    <VStack
      justifyContent="center"
      alignItems="center"
      space={4}
      height={Dimensions.get('window').height}>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Light}
        onPress={signIn}
        disabled={isLoading}
      />
      {error === SignInErrors.GOOGLE_FIT ? <GoogleFitAlert /> : null}
      {isLoading ? (
        <VStack marginTop={2} space={2}>
          <Text>we are preparing your account... </Text>
          <Spinner />
        </VStack>
      ) : null}
    </VStack>
  );
}

export default LoginScreen;
