/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import IntroScreen from './src/screens/IntroScreen';
import MainNavigation from './src/Navigation/MainNavigation';
import {name as appName} from './app.json';
import 'react-native-reanimated';
import {LogBox} from 'react-native';

LogBox.ignoreLogs([
  'ViewPropTypes will be removed',
  'ColorPropType will be removed',
]);
global.__reanimatedWorkletInit = () => {};
AppRegistry.registerComponent(appName, () => MainNavigation);
