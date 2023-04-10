import React from 'react';
import {Spinner, Heading, HStack} from 'native-base';

export const Loader = props => {
  return (
    <HStack space={2} justifyContent="center">
      <Spinner accessibilityLabel="Loading posts" />
      <Heading color="primary.500" fontSize="md">
        Loading
      </Heading>
    </HStack>
  );
};
