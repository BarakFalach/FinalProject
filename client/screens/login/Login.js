import React, {useCallback, useEffect, useState} from 'react';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import {Dimensions} from 'react-native';
import {Fonts, SignInErrors} from '../../utils/constants';
import {useUser} from '../../hooks/useUser';
import {getSessionidUser} from '../../api/login';
import {useSignIn} from '../../api/useSignIn';
import {Box, Center, Spinner, Text, VStack} from 'native-base';
import {GoogleFitAlert} from './GoogleFitAlert';
import {Loader} from '../../components/common/Loader';

const NO_USER = 'NO_USER';

function LoginScreen({navigation}) {
  const {user, setUser} = useUser();
  const {signIn, isLoading, error} = useSignIn();
  const [initialLoading, setInitialLoading] = useState(true);
  useEffect(() => {
    getSessionidUser().then(res => {
      if (res.data === NO_USER) {
        console.log('no user');
        setInitialLoading(false);
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

  if (initialLoading) {
    return (
      <Center height={Dimensions.get('window').height}>
        <Loader />
      </Center>
    );
  }

  return (
    <VStack
      justifyContent="center"
      alignItems="center"
      space={4}
      height={Dimensions.get('window').height}>
      <Box paddingLeft="20px" paddingRight="20px">
        <Text fontFamily={Fonts.regular} fontSize="md">
          Sign in with Google to get started and track your fitness journey.
        </Text>
      </Box>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Light}
        onPress={signIn}
        disabled={isLoading}
      />
      {error === SignInErrors.GOOGLE_FIT ? <GoogleFitAlert /> : null}
      {isLoading ? (
        <VStack marginTop={2} space={2}>
          <Text fontFamily={Fonts.regular}>
            We are preparing your account...
          </Text>
          <Text fontFamily={Fonts.regular}>Thank you for your patience </Text>
          <Spinner />
        </VStack>
      ) : null}
    </VStack>
  );
}

export default LoginScreen;
