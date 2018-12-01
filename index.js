/** @format */

import { AppRegistry, YellowBox, Platform } from 'react-native';
import App from './App';
import {name as appName} from './app.json';
// import 'babel-polyfill';

YellowBox.ignoreWarnings(['Remote debugger is in a background tab which']);

AppRegistry.registerComponent(appName, () => App);
