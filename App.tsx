/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {ThemeProvider} from '@shopify/restyle';
import {theme} from './src/style';
import {
  ForceUpdateFullScreen,
  FullScreenProgress, Header,
  NoInternetFullScreen,
  refFullScreenProgress, SideDrawerMenu, TopTabEnum,
} from '@/component';
import {AppNavigator} from '@/navigation/AppNavigation';
import {initHttpClient} from '@/core';
import {BASE_URL} from '@/api';
import {Provider} from 'react-redux';
import { actions, store } from "@/redux/root.store";
import {utils} from '@/utils/Utils';

export const App: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [selectedTab, setSelectedTab] = useState(TopTabEnum.Home);
  useEffect(() => {
    initHttpClient(BASE_URL);
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <NoInternetFullScreen onTryAgain={() => {}}>
          <SideDrawerMenu
            isOpen={visible}
            onGestureStart={() => setVisible(true)}
            onOptionSelected={setSelectedTab}
            selectedTab={selectedTab}
            onClosePress={() => {
              setVisible(false);
            }}
            onClose={() => {
              setVisible(false);
            }}
          >
            <Header
              title={selectedTab.toString()}
              onDrawerPress={() =>{
                setVisible(true);
              }}
              onUserPress={() =>{
                utils.handleEnabledPressed().then(res =>{
                  if(res){
                  }
                })
              }}
              isShowAttention={false}
            />
              <AppNavigator onRouteChange={() => {}} />
          </SideDrawerMenu>

          <FullScreenProgress ref={refFullScreenProgress} />
          <ForceUpdateFullScreen />
        </NoInternetFullScreen>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
