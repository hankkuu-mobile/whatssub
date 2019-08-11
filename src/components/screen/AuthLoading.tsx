import { NavigationScreenProp, NavigationState } from 'react-navigation';
import React, { useState } from 'react';
import { Asset } from 'expo-asset';
import { AsyncStorage } from 'react-native';
import { IMG_GIF_SPLASH } from '../../utils/Images';
import { SplashScreen } from 'expo';
import styled from 'styled-components/native';

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

const SPLASH_SHOW_TIME = 1500;

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  align-items: center;
  justify-content: center;
`;

const StyledSplashImage = styled.Image`
  width: 200;
  height: 47;
  margin-bottom: 50%;
`;

const StyledText = styled.Text`
  color: #cdd3d3;
  position: absolute;
  bottom: 50;
`;

export default function AuthLoading(props: Props) {
  const [areResourcesReady, setResourcesReady] = useState(false);
  const [isAppReady, setAppReady] = useState(false);

  const cacheResourcesAsync = async () => {
    try {
      await Asset.fromModule(IMG_GIF_SPLASH).downloadAsync();
    } catch (error) {
      // handle error
    } finally {
      setResourcesReady(true);
    }
  };

  const navigateToScreen = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      props.navigation.navigate('MainStackNavigator');
      return;
    }
    props.navigation.navigate('AuthStackNavigator');
  };

  React.useEffect(() => {
    if (!isAppReady) {
      SplashScreen.preventAutoHide();
      cacheResourcesAsync();
      return;
    }

    navigateToScreen();
  }, [isAppReady]);

  if (!isAppReady && areResourcesReady) {
    return (
      <Container>
        <StyledSplashImage
          testID="SPLASH_IMAGE"
          source={IMG_GIF_SPLASH}
          resizeMode='contain'
          onLoadEnd={() => {
            const timeout = setTimeout(() => {
              setAppReady(true);
              clearTimeout(timeout);
            }, SPLASH_SHOW_TIME);
            SplashScreen.hide();
          }}
        />
        <StyledText>ⓒ Whatssub Studio</StyledText>
      </Container>
    );
  }

  return (<Container />);
};
