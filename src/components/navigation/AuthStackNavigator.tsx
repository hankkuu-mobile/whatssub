import {
  NavigationContainer,
  NavigationRouteConfigMap,
  StackNavigatorConfig,
  createStackNavigator,
} from 'react-navigation';

import IntroScreen from '../screen/Intro';
import React from 'react';
import { ScreenProps } from '../../types';
import { Text } from 'react-native';

const routeConfig: NavigationRouteConfigMap = {
  Intro: {
    screen: IntroScreen,
    navigationOptions: {
      header: null,
      headerMode: 'none',
      title: 'Intro',
      // headerStyle: {
      //   borderBottomWidth: 0,
      //   backgroundColor: '#023059',
      // },
    },
    path: 'intro',
  },
};

const navigatorConfig: StackNavigatorConfig = {
  initialRouteName: 'Intro',
  // header: null,
  // headerMode: 'none',
  navigationOptions: ({
    navigation,
    screenProps,
  }: {
    navigation: any;
    screenProps: any;
  }) => {
    const { theme } = screenProps;
    return {
      headerStyle: {
        backgroundColor: theme.background,
        borderBottomColor: 'transparent',
        borderBottomWidth: 0,
        elevation: 0,
      },
      headerTitleStyle: { color: theme.fontColor },
      headerTintColor: theme.tintColor,
    };
  },
};

export default createStackNavigator(routeConfig, navigatorConfig);
