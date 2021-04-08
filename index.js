/**
 * @format
 */
import React from 'react';

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux'
import { store } from './App/reducers'
import backgroundPush from './App/backgroundPush';
const component = () => {
    return(
        <Provider store={store}>
            <App/> 
        </Provider>
    )

}

AppRegistry.registerComponent(appName, ()=>component);
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => backgroundPush);