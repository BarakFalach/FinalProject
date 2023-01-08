import React from 'react';
import TableContainer from '../../components/LeaderBoard/TableContainer';
import {screenStyle} from '../home/Home';
import {ThemeProvider} from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';

function LeaderBoardScreen({navigation}) {
  const navigateToHomePage = () => {
    navigation.navigate('Home');
  };
  return (
    <ThemeProvider>
      <LinearGradient
        colors={['#57CC99', '#22577A']}
        style={screenStyle.container}>
        <TableContainer navigateToHomePage={navigateToHomePage} />
      </LinearGradient>
    </ThemeProvider>
  );
}

export default LeaderBoardScreen;
