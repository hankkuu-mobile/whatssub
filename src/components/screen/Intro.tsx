import * as AppAuth from 'expo-app-auth';
import * as Facebook from 'expo-facebook';
import * as GoogleSignIn from 'expo-google-sign-in';

import { IC_FACEBOOK, IC_GOOGLE, IC_LOGO, IC_SLASH } from '../../utils/Icons';
import { NavigationScreenProp, NavigationStateRoute } from 'react-navigation';
import {
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import {
  androidExpoClientId,
  iOSClientId,
  iOSExpoClientId,
} from '../../../config';

import { AppContext } from '../../providers';
import { Button } from 'dooboo-native-widgets';
import Constants from 'expo-constants';
import { ScreenProps } from '../../types';
import { Text } from 'react-native-animatable';
import _range from 'lodash/range';
import { getString } from '../../../STRINGS';
import styled from 'styled-components/native';
import useInterval from '../../hooks/useInterval';

const Container = styled.View`
  flex: 1;
  align-self: stretch;
  overflow: scroll;
  background-color: ${({ theme }) => theme.marine};

  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
`;

const TitleWrapper = styled.View`
  margin-top: 120;
  align-self: center;

  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const LogoImage = styled.Image`
  width: 135;
  height: 30;
`;

const SlashImage = styled.Image`
  width: 14;
  height: 14;
`;

const ContentWrapper = styled.View`
  flex-direction: column;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: flex-start;
`;

const ContentScroll = styled.ScrollView`
  height: 100%;
  width: 100%;
`;

const StyledAnimatableText = styled(Text)`
  font-size: 36;
  font-weight: 600;
  min-height: 44;
  line-height: 48;
  color: white;
  text-align: center;
`;

const StyledText = styled.Text`
  font-size: 36;
  font-weight: 600;
  line-height: 48;
  text-align: center;
  color: white;
`;

const ButtonWrapper = styled.View`
  bottom: 40;
  width: 100%;
  height: 200;
  margin-top: 28;
  padding-top: 28;

  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

interface Props {
  store?: any;
  screenProps?: ScreenProps;
  navigation?: NavigationScreenProp<NavigationStateRoute<any>>;
}

export const titleArray =
  _range(5).map((index: number) => getString(`INTRO_TITLE_${index + 1}`));

function Intro(props: Props) {
  const [titleIndex, setTitleIndex] = React.useState(0);
  const [googleUser, setGoogleUser] = useState(null);
  const [signingInFacebook, setSigningInFacebook] = useState(false);
  const [signingInGoogle, setSigningInGoogle] = useState(false);
  const { state, changeTheme } = useContext(AppContext);

  useEffect(() => {
    initAsync();
    // console.log('appOwnership', Constants.appOwnership);
  }, []);

  const initAsync = async () => {
    await GoogleSignIn.initAsync({
      clientId: iOSClientId,
    });
  };

  const googleSignOutAsync = async () => {
    await GoogleSignIn.signOutAsync();
    setGoogleUser(null);
  };

  const googleSignInAsync = async () => {
    setSigningInGoogle(true);
    if (Constants.appOwnership === 'expo') {
      try {
        const response = await AppAuth.authAsync({
          issuer: 'https://accounts.google.com',
          scopes: ['profile'],
          clientId: Platform.select({
            ios: iOSExpoClientId,
            android: androidExpoClientId,
          }),
        });
        // console.log(response);
      } catch ({ message }) {
        // console.log('err', message);
      } finally {
        setSigningInGoogle(false);
      }
      return;
    }
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      if (type === 'success') {
        setGoogleUser(user);
      }
    } catch ({ message }) {
      alert('login: Error:' + message);
    } finally {
      setSigningInGoogle(false);
    }
  };

  // if (user) {
  //   props.navigation.navigate('MainStackNavigator');
  // }

  const facebookLogin = async () => {
    setSigningInFacebook(true);
    try {
      const {
        type,
        token,
      } = await Facebook.logInWithReadPermissionsAsync(
        Constants.manifest.facebookAppId, {
          permissions: ['public_profile'],
        });
      if (type === 'success') {
        // Build Firebase credential with the Facebook access token.
        // const credential = firebase.auth
        // .FacebookAuthProvider.credential(token);
        // Sign in with credential from the Facebook user.
        // await firebase.auth().signInWithCredential(credential);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      /* istanbul ignore next */
      alert(`Facebook Login Error: ${message}`);
    } finally {
      setSigningInFacebook(false);
    }
  };

  const btnStyle = {
    backgroundColor: props.screenProps.theme.background,
    borderWidth: 1,
    borderRadius: 0,
    borderColor: props.screenProps.theme.background,
  };

  useInterval(() => {
    if (titleIndex === 4) {
      setTitleIndex(0);
    } else {
      setTitleIndex(titleIndex + 1);
    }
  }, 2000);

  return (
    <Container>
      <ContentWrapper>
        <ContentScroll
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TitleWrapper>
            <TouchableOpacity
              onPress={props.screenProps.changeTheme}
            >
              <LogoImage source={IC_LOGO}/>
            </TouchableOpacity>
          </TitleWrapper>
          <SlashImage
            style={{
              marginTop: 68,
              marginBottom: 34,
            }}
            source={IC_SLASH}
          />
          <StyledAnimatableText
            testID='animatableText'
            animation='fadeIn'
            iterationCount='infinite'
            direction='alternate'
            duration={1000}
          >
            { titleArray[titleIndex] }
          </StyledAnimatableText>
          <StyledText>{getString('INTRO_MESSAGE')}</StyledText>
          <StyledText style={{
            color: props.screenProps.theme.rosa,
          }}>{getString('INTRO_WHATSSUB')}</StyledText>
          <SlashImage
            style={{
              marginTop: 38,
              marginBottom: 68,
            }}
            source={IC_SLASH}
          />
          <ButtonWrapper>
            <Button
              testID='btnGoogle'
              style={btnStyle}
              imgLeftSrc={IC_GOOGLE}
              isLoading={signingInGoogle}
              indicatorColor={props.screenProps.theme.marine}
              onClick={ () => googleSignInAsync() }
              text={getString('SIGN_IN_WITH_GOOGLE')}
            />
            <View style={{ marginTop: 8 }}/>
            <Button
              testID='btnFacebook'
              style={btnStyle}
              imgLeftSrc={IC_FACEBOOK}
              indicatorColor={props.screenProps.theme.marine}
              isLoading={signingInFacebook}
              imgLeftStyle={{
                height: 28,
                width: 16,
              }}
              onClick={ () => {
                facebookLogin();
              }}
              text={getString('SIGN_IN_WITH_FACEBOOK')}
            />

          </ButtonWrapper>
        </ContentScroll>
      </ContentWrapper>
    </Container>
  );
}

export default Intro;
