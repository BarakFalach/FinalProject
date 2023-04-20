import React from 'react';
import TableContainer from '../../components/LeaderBoard/TableContainer';
import {screenStyle} from '../home/Home';
import LinearGradient from 'react-native-linear-gradient';
import {Box, Center} from 'native-base';
import {Dimensions} from 'react-native';
import {Colors} from '../../utils/constants';

function LeaderBoardScreen({navigation}) {
  const navigateToHomePage = () => {
    navigation.navigate('Home');
  };
  return (
    <Box
      height={Dimensions.get('screen').height}
      width={Dimensions.get('screen').width}>
      <TableContainer navigateToHomePage={navigateToHomePage} />
    </Box>
  );
}

export default LeaderBoardScreen;
