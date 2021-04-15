import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './screens/HomeScreen.js';
import DetailScreen from './screens/DetailScreen.js';
import VideoPlayerScreen from './screens/VideoPlayerScreen.js';

const MainStackNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
  Detail: {
    screen: DetailScreen,
  },
  VideoPlayer: {
    screen: VideoPlayerScreen,
  }
});

export default createAppContainer(MainStackNavigator);