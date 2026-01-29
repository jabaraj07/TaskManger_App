/**
 * @format
 * Web entry point for React Native Web
 */

// Import polyfills FIRST before any other imports
import './src/web/polyfills.web';

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

// Register the app
AppRegistry.registerComponent(appName, () => App);

// Start the app
AppRegistry.runApplication(appName, {
  initialProps: {},
  rootTag: document.getElementById('root'),
});

