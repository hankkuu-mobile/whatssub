import { IC_ADD, IC_ADD_SERVICE } from '../../utils/Icons';
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';

import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { getString } from '../../../STRINGS';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  padding-top: ${Platform.OS === 'android' ? Constants.statusBarHeight : 0};
`;
const StyledText = styled.Text`
  color: white;
  font-weight: bold;
`;
const StyledOuterEmptyBox = styled.View`
  width: 100%;
  background-color: white;
  align-items: center;
`;
const StyledEmptyBox = styled.View`
  width: 90%;
  background-color: rgb(231, 234, 238);
  margin-top: 10px;
  margin-bottom: 10px;
`;
const StyledEmptySpace = styled.Text`
  background-color: white;
`;

interface Props {
  navigation: any;
}

function Page(props: Props) {
  return (
    <Container>
      <LinearGradient colors={['rgb(114,181,255)', 'rgb(62,126,255)']}>
        <SafeAreaView>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <View style={{ justifyContent: 'center', paddingRight: 40 }}>
              <StyledText>{getString('EMPTY_WELCOME')}</StyledText>
            </View>
            <Image source={IC_ADD}></Image>
            <TouchableOpacity
              testID='btnTest'
              onPress={() => {}}
              style={{ paddingRight: 15, marginTop: 20, position: 'absolute' }}
            >
              <Image
                style={{ width: 24, height: 24 }}
                source={IC_ADD_SERVICE}
              ></Image>
            </TouchableOpacity>
          </View>
          <View
            style={{
              alignItems: 'flex-end',
              paddingRight: 110,
              marginBottom: 40,
            }}
          >
            <StyledText style={{ paddingRight: 40 }}>
              {getString('EMPTY_COMMENT1')}
            </StyledText>
            <StyledText>{getString('EMPTY_COMMENT2')}</StyledText>
          </View>
        </SafeAreaView>
      </LinearGradient>
      <ScrollView>
        <StyledOuterEmptyBox>
          <StyledEmptyBox style={{ height: 180 }}>
            <View
              style={{
                marginTop: Platform.OS === 'ios' ? 30.3 : 20.3,
                marginLeft: 81.5,
                marginRight: 70,
              }}
            >
              <StyledEmptySpace></StyledEmptySpace>
            </View>
            <View
              style={{
                marginTop: 20.3,
                marginLeft: 122.8,
                marginRight: 111.2,
              }}
            >
              <StyledEmptySpace></StyledEmptySpace>
            </View>
            <View
              style={{
                marginTop: 20.3,
                marginLeft: 122.8,
                marginRight: 111.2,
              }}
            >
              <StyledEmptySpace></StyledEmptySpace>
            </View>
            <View
              style={{
                marginTop: 20.3,
                marginLeft: 81.5,
                marginRight: 70,
              }}
            >
              <StyledEmptySpace></StyledEmptySpace>
            </View>
          </StyledEmptyBox>
          <StyledOuterEmptyBox>
            <StyledEmptyBox style={{ height: 60 }}>
              <View
                style={{
                  marginTop: 20.3,
                  marginLeft: 81.5,
                  marginRight: 70,
                }}
              >
                <StyledEmptySpace></StyledEmptySpace>
              </View>
            </StyledEmptyBox>
          </StyledOuterEmptyBox>
          <StyledOuterEmptyBox>
            <StyledEmptyBox style={{ height: 60 }}>
              <View
                style={{
                  marginTop: 20.3,
                  marginLeft: 81.5,
                  marginRight: 70,
                }}
              >
                <StyledEmptySpace></StyledEmptySpace>
              </View>
            </StyledEmptyBox>
          </StyledOuterEmptyBox>
          <StyledOuterEmptyBox>
            <StyledEmptyBox style={{ height: 100 }}></StyledEmptyBox>
          </StyledOuterEmptyBox>
        </StyledOuterEmptyBox>
      </ScrollView>
    </Container>
  );
}

export default Page;
