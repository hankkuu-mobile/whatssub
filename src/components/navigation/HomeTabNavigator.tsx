
import { BottomTabNavigatorConfig, NavigationContainer, NavigationRouteConfigMap,
  createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { BottomTabBar } from 'react-navigation-tabs';
import Home from '../screen/Home';
import HomeCalendar from '../screen/HomeCalendar';
import HomeFavorite from '../screen/HomeFavorite';
import HomeSetting from '../screen/HomeSetting';
import React from 'react';
import TabBarIcon from '../shared/TabBarIcon';
import styled from 'styled-components';

// Style Components
const WsubBottomTabBar = styled(BottomTabBar)`
  height: 70;
`;

// Icons Components
const HomeIcon = ({ focused } : { focused: boolean }) =>
  <TabBarIcon focused={focused} name="home" type="MaterialIcons" />;

const CalendarIcon = ({ focused } : { focused: boolean }) =>
  <TabBarIcon focused={focused} name="calendar" type="AntDesign" />;

const FavoriteIcon = ({ focused } : { focused: boolean }) =>
  <TabBarIcon focused={focused} name="favorite-border" type="MaterialIcons" />;

const SettingIcon = ({ focused } : { focused: boolean }) =>
  <TabBarIcon focused={focused} name="setting" type="AntDesign" />;

/**
 * HOME STACK NAVIGATOR
 */
const HomeStack = createStackNavigator({
  Home: { screen: Home },
});

HomeStack.navigationOptions = {
  tabBarIcon: HomeIcon,
};

/**
 * CALENDAR STACK NAVIGATOR
 */
const HomeCalendarStack = createStackNavigator({
  Home: { screen: HomeCalendar },
});

HomeCalendarStack.navigationOptions = {
  tabBarIcon: CalendarIcon,
};

/**
 * FAVORITE STACK NAVIGATOR
 */
const HomeFavoriteStack = createStackNavigator({
  Home: { screen: HomeFavorite },
});

HomeFavoriteStack.navigationOptions = {
  tabBarIcon: FavoriteIcon,
};

/**
 * SETTING STACK NAVIGATOR
 */
const HomeSettingStack = createStackNavigator({
  Home: { screen: HomeSetting },
});

HomeSettingStack.navigationOptions = {
  tabBarIcon: SettingIcon,
};

/**
 * Setting Route Configuration
 */

const routeConfig: NavigationRouteConfigMap = {
  HomeStack,
  HomeCalendarStack,
  HomeFavoriteStack,
  HomeSettingStack,
};

const tabBar = (props: any) => (<WsubBottomTabBar {...props} />);

const bottomNavigatorConfig: BottomTabNavigatorConfig = {
  initialRouteName: 'HomeStack',
  tabBarOptions: {
    showLabel: false,
  },
  tabBarComponent: tabBar,
};

/**
 * Create Bottom Tab Navigator
 */
const RootTabNavigator: NavigationContainer =
createBottomTabNavigator(routeConfig, bottomNavigatorConfig);

interface Props {
  navigation?: any;
  theme?: object;
}

/**
 * Set Theme and Navigation to NavigationContainer
 *
 */
class RootNavigator extends React.Component<Props> {
  private static router = RootTabNavigator.router;

  public render() {
    return (
      <RootTabNavigator
        navigation={this.props.navigation}
        screenProps={{ theme: this.props.theme }}
      />
    );
  }
}

export default RootNavigator;
