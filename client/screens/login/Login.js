import React, {useCallback, useEffect} from 'react';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import {View, Linking} from 'react-native';
import {Colors, SignInErrors} from '../../utils/constants';
import {useUser} from '../../hooks/useUser';
import {getSessionidUser} from '../../api/login';
import {useSignIn} from '../../api/useSignIn';
import {Button, Spinner, Text, VStack} from 'native-base';
import {Loader} from '../../components/common/Loader';

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

  const handleLinkClick = async () => {
    const url =
      'https://play.google.com/store/apps/details?id=com.google.android.apps.fitness';
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      console.log(`Unable to open ${url}`);
    }
  };

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
      }}>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Light}
        onPress={signIn}
        disabled={isLoading}
      />
      {error === SignInErrors.GOOGLE_FIT ? (
        <VStack
          marginTop={2}
          space={2}
          justifyContent="center"
          alignItems="center">
          <Text fontSize="md" textAlign="center">
            it is look like you don't have Google Fit installed on your phone
          </Text>
          <Button
            size="lg"
            variant="link"
            maxWidth="200px"
            onPress={handleLinkClick}>
            Download google fit
          </Button>
        </VStack>
      ) : null}
      {isLoading ? (
        <VStack marginTop={2} space={2}>
          <Text>we are preparing your account... </Text>
          <Spinner />
        </VStack>
      ) : null}
    </View>
  );
}

export default LoginScreen;
