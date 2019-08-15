import * as AppAuth from 'expo-app-auth';
import * as Facebook from 'expo-facebook';
import * as GoogleSignIn from 'expo-google-sign-in';

import { AsyncStorage, Platform, TouchableOpacity, View } from 'react-native';
import { AuthPayload, Gender, ScreenProps, SocialInput } from '../../types';
import { IC_FACEBOOK, IC_GOOGLE, IC_LOGO, IC_SLASH } from '../../utils/Icons';
import { NavigationScreenProp, NavigationStateRoute } from 'react-navigation';
import React, { useContext, useEffect, useState } from 'react';
import {
  androidExpoClientId,
  iOSClientId,
  iOSExpoClientId,
} from '../../../config';

import { AppContext } from '../../providers';
import { Button } from 'dooboo-native-widgets';
import Constants from 'expo-constants';
import { Text } from 'react-native-animatable';
import _range from 'lodash/range';
import { getString } from '../../../STRINGS';
import { gql } from 'apollo-boost';
import styled from 'styled-components/native';
import useInterval from '../../hooks/useInterval';
import { useMutation } from '@apollo/react-hooks';

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

export const titleArray = _range(5).map((index: number) =>
  getString(`INTRO_TITLE_${index + 1}`),
);

export const MUTATION_FACEBOOK = gql`
  mutation signInFacebook($socialUser: SocialUserCreateInput!) {
    signInFacebook(socialUser: $socialUser) {
      token
      user {
        id
        email
      }
    }
  }
`;

function Intro(props: Props) {
  const [requestSignInFacebook] = useMutation<
    AuthPayload,
    { socialUser: SocialInput }
  >(MUTATION_FACEBOOK);

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

  const facebookLogin = async () => {
    setSigningInFacebook(true);
    try {
      const { type, token } = await Facebook.logInWithReadPermissionsAsync(
        Constants.manifest.facebookAppId,
        {
          permissions: ['email', 'public_profile'],
        },
      );
      if (type === 'success') {
        const response = await fetch(
          `https://graph.facebook.com/me?fields=
            id,name,email,birthday,gender,first_name,last_name,picture
            &access_token=${token}`,
        );
        const responseObject = JSON.parse(await response.text());
        const socialInput: SocialInput = {
          social: responseObject.id,
          photo:
            responseObject.picture && responseObject.picture.data
              ? responseObject.picture.data.url
              : null,
          email: responseObject.email,
          name: responseObject.name,
          nickname: responseObject.name,
          birthday: responseObject.birthday,
          phone: responseObject.mobile_phone,
          gender:
            responseObject.gender === 'male'
              ? Gender.MALE
              : responseObject.gender === 'female'
              ? Gender.FEMALE
              : null,
        };
        const variables = { socialUser: socialInput };
        const {
          data: { signInFacebook },
        }: any = await requestSignInFacebook({ variables });
        const accessToken = signInFacebook.token;
        AsyncStorage.setItem('token', accessToken);
        props.navigation.navigate('MainStackNavigator');
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
            <TouchableOpacity onPress={props.screenProps.changeTheme}>
              <LogoImage source={IC_LOGO} />
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
            {titleArray[titleIndex]}
          </StyledAnimatableText>
          <StyledText>{getString('INTRO_MESSAGE')}</StyledText>
          <StyledText
            style={{
              color: props.screenProps.theme.rosa,
            }}
          >
            {getString('INTRO_WHATSSUB')}
          </StyledText>
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
              onClick={() => googleSignInAsync()}
              textStyle={{
                color: props.screenProps.theme.fontColor,
                fontSize: 14,
              }}
              text={getString('SIGN_IN_WITH_GOOGLE')}
            />
            <View style={{ marginTop: 8 }} />
            <Button
              testID='btnFacebook'
              style={btnStyle}
              imgLeftSrc={IC_FACEBOOK}
              indicatorColor={props.screenProps.theme.marine}
              isLoading={signingInFacebook}
              imgLeftStyle={{
                height: 28,
                width: 16,
                position: 'absolute',
                left: 16,
              }}
              onClick={facebookLogin}
              textStyle={{
                color: props.screenProps.theme.fontColor,
                fontSize: 14,
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
