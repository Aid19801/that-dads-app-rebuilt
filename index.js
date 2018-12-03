import './ReactotronConfig';
/** @format */

import { AppRegistry, YellowBox, Platform } from 'react-native';
import App from './App';
import {name as appName} from './app.json';

YellowBox.ignoreWarnings(['Warning: isMounted', 'Remote debugger is in a background tab which', 'Setting a timer']);

AppRegistry.registerComponent(appName, () => App);
