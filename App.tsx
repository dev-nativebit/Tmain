/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {ThemeProvider} from '@shopify/restyle';
import {theme} from './src/style';
import {
  ForceUpdateFullScreen,
  FullScreenProgress,
  NoInternetFullScreen,
  refFullScreenProgress
} from "@/component";
import {AppNavigator} from '@/navigation/AppNavigation';
import {initHttpClient} from '@/core';
import {BASE_URL} from '@/api';
import {Provider} from 'react-redux';
import { actions, store } from "@/redux/root.store";

export const App: React.FC = () => {
  useEffect(() => {
    initHttpClient(BASE_URL);
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <NoInternetFullScreen onTryAgain={() => {}}>
          <AppNavigator onRouteChange={() => {}} />
          <FullScreenProgress ref={refFullScreenProgress} />
          <ForceUpdateFullScreen />
        </NoInternetFullScreen>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
