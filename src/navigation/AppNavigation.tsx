import React, {useEffect, useState} from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

import {
  CommonActions,
  createNavigationContainerRef,
  NavigationContainer,
  StackActions,
} from '@react-navigation/native';
import {Storage} from '@/core/Storage';
import RNSplashScreen from 'react-native-splash-screen';
import {
  DashboardScreen,
  LoginScreen, RequestDetailScreen
} from "@/screens";
import {actions} from '@/redux/root.store';
import { RequestModel } from "@/model";

export type StackParamList = {
  DashboardScreen: undefined;
  LoginScreen: undefined;
  RequestDetailScreen: {
    data:RequestModel
  };
};

const navigationRef = createNavigationContainerRef<StackParamList>();

export enum Routes {
  Dashboard = 'DashboardScreen',
  Login = 'LoginScreen',
  RequestDetail = 'RequestDetailScreen',
}
export interface NavigationProps {
  screenName: Routes;
  params?: any;
}

export function navigate({screenName, params}: NavigationProps) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(screenName, params);
  }
}

export function replace({screenName, params}: NavigationProps) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch({
      ...StackActions.replace(screenName, params),
    });
  }
}

export function reset({screenName, params}: NavigationProps) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: screenName, params}],
      }),
    );
  }
}

export function goBack() {
  if (navigationRef.isReady()) {
    if (navigationRef.canGoBack()) {
      navigationRef.goBack();
    }
  }
}

export const safeNavigate = (route: Routes, params?: Record<string, any>) => {
  navigate({screenName: route, params});
};

export interface AppNavigationProps {
  onRouteChange: (route: string) => void;
}

/**
 *  Right To Left Screen Open Animation
 **/

export const horizontalAnimation = {
  // @ts-ignore
  cardStyleInterpolator: ({current, layouts}) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
};

// @ts-ignore
export const AppNavigator: React.FunctionComponent<AppNavigationProps> = ({
  onRouteChange,
}) => {
  const Stack = createStackNavigator();
  const [loadNavigator, setLoadNavigator] = useState(false);
  const [initRouteName, setInitRouteName] = useState<Routes>();
  const [isLoginDone, setIsLoginDone] = useState(false);

  const loginAgain = async () => {
    try {
      const response = await Storage.getItemAsync(Storage.keys.login);
      if (response !== null) {
        await actions.LoginAgainThunkCallActions();
        // await actions.userPermissionThunkCallActions();
        // await actions.dashboardThunkCallActions();
        setInitRouteName(Routes.Dashboard);
      } else {
        setInitRouteName(Routes.Login);
      }
    } catch (e) {
      console.log(e);
    }
  };

  /***
   * Added this patch to Update
   * the session with the latest token everytime
   * app comes to for ground
   */

  const init = async () => {
    // console.warn('islogin->',accountStore)
    Promise.all([await loginAgain()])
      .then(async () => {
        setLoadNavigator(() => true);
        setTimeout(() => {
          RNSplashScreen.hide();
        }, 500);
      })
      .catch(error => {
        console.log('Error', error);
      });
  };

  useEffect(() => {
    init();
  }, []);

  const navigator = (
    <>
      <NavigationContainer
        ref={navigationRef}
        independent={true}
        // linking={linking}
        onStateChange={() => {
          console.log('SCREEN_NAME', navigationRef.getCurrentRoute()?.name);
        }}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyleInterpolator:
              CardStyleInterpolators.forScaleFromCenterAndroid,
            transitionSpec: {
              open: {animation: 'timing', config: {duration: 400}},
              close: {animation: 'timing', config: {duration: 450}},
            },
          }}
          initialRouteName={initRouteName as Routes}>
          <Stack.Screen
            name={Routes.Login}
            component={LoginScreen}
            options={horizontalAnimation}
          />
          <Stack.Screen
            name={Routes.Dashboard}
            component={DashboardScreen}
            options={horizontalAnimation}
          />
          <Stack.Screen
            name={Routes.RequestDetail}
            component={RequestDetailScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );

  return loadNavigator && navigator;
};
