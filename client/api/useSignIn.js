import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {useEffect, useState} from 'react';
import {useUser} from '../hooks/useUser';
import {signInCall} from './login';
import {SignInErrors} from '../utils/constants';

const webClientId =
  '268322603163-mh7i98imn3m5s949bdqa1pi5bt6kmbmq.apps.googleusercontent.com';

export const useSignIn = () => {
  const {setUser} = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [signInError, setError] = useState(null);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId,
      offlineAccess: true,
      forceCodeForRefreshToken: true,
      scopes: ['https://www.googleapis.com/auth/fitness.activity.read'],
    });
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

    await signInCall(data, headers)
      .then(userData => setUser(userData.data))
      .catch(err => console.log(err));

    setIsLoading(false);
  };

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      setUser({});
    } catch (error) {
      console.error(error);
    }
  };

  const signIn = async () => {
    try {
      setIsLoading(true);
      console.log('Stsrt sign in');
      await GoogleSignin.hasPlayServices();
      console.log('hasPlayServices');
      GoogleSignin.signIn().then(userAuthData => authClient(userAuthData));
    } catch (error) {
      setIsLoading(false);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User Cancelled the Login Flow');
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Signing In');
        // operation (e.g. sign in) is in progress already
      } else if (error.error === 'Error in stepCountCall') {
        setError(SignInErrors.GOOGLE_FIT);
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
  return {signIn, signOut, isLoading, error: signInError};
};
