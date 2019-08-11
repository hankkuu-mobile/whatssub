import * as Font from 'expo-font';
import React, { useEffect, useState } from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloProviderHook } from '@apollo/react-hooks';
import { AsyncStorage } from 'react-native';
import { InitialProviders } from './providers';
import SwitchNavigator from './components/navigation/SwitchNavigator';
import { ThemeType } from './types';
import client from './apollo/Client';

const App = () => {
  const [theme, setTheme] = useState<ThemeType>(ThemeType.LIGHT);
  const getCurrentThemeType = async () => {
    const value = await AsyncStorage.getItem('theme') as ThemeType;
    if (value && value !== ThemeType.LIGHT) {
      setTheme(value);
    }
  };

  useEffect(() => {
    Font.loadAsync({
      'spoqa-han-sans-bold':
        require('../assets/fonts/SpocaHanSans/SpoqaHanSans-Bold.ttf'),
      'spoqa-han-sans-regular':
        require('../assets/fonts/SpocaHanSans/SpoqaHanSans-Regular.ttf'),
    });
    getCurrentThemeType();
  }, []);

  return (
    <ApolloProvider client={client}>
      <ApolloProviderHook client={client}>
        <InitialProviders>
          <SwitchNavigator />
        </InitialProviders>
      </ApolloProviderHook>
    </ApolloProvider>
  );
};

export default App;
