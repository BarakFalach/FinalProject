import React from 'react';
import {Alert, Box, HStack, Link, VStack} from 'native-base';
import {Linking} from 'react-native';

export const GoogleFitAlert = () => {
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

  return (
    <Alert shadow={2} maxW="400" w="100%" colorScheme="warning" padding={2}>
      <VStack space={1} flexShrink={1} w="100%">
        <HStack
          flexShrink={1}
          space={2}
          alignItems="center"
          justifyContent="space-between">
          <HStack space={2} flexShrink={1} alignItems="center">
            <Alert.Icon />
            <Box
              pl="6"
              _text={{
                color: 'coolGray.600',
              }}>
              it looks like Google Fit isn't installed on your phone. Please
              download it, then try again.
              <Link onPress={handleLinkClick}>Download Google Fit</Link>
            </Box>
          </HStack>
        </HStack>
      </VStack>
    </Alert>
  );
};
