import { IC_ADD, IC_ADD_SERVICE } from '../../utils/Icons';
import {
  Image,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { Component } from 'react';
import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';
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
  background-color: rgb(231,234,238);
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
      <LinearGradient
        colors={['rgb(114,181,255)', 'rgb(62,126,255)']}
        style={{ width: '100%', height: '40%' }}>
        <ScrollView style={{ marginTop: Platform.OS === 'ios' ? 30 : 0 }} >
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <View style={{ justifyContent: 'center', paddingRight: 40 }}>
              <StyledText>{getString('EMPTY_WELCOME')}</StyledText>
            </View>
            <Image source={IC_ADD}></Image>
            <TouchableOpacity
              testID='btn'
              onPress={() => {}}
              style={{ paddingRight: 10, marginTop: 15, position: 'absolute' }}>
              <Image style={{ width: 30, height: 30 }} source={IC_ADD_SERVICE}></Image>
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: 'flex-end', paddingRight: 110 }}>
            <StyledText style={{ paddingRight: 40 }}>{getString('EMPTY_COMMENT1')}</StyledText>
            <StyledText>{getString('EMPTY_COMMENT2')}</StyledText>
          </View>
        </ScrollView>
      </LinearGradient>
      <StyledOuterEmptyBox>
        <StyledEmptyBox style={{ height: 180 }}>
          <View style= {{
            marginTop: 20.3,
            marginLeft: 81.5,
            marginRight: 70,
          }}>
            <StyledEmptySpace></StyledEmptySpace>
          </View>
          <View style= {{
            marginTop: 20.3,
            marginLeft: 122.8,
            marginRight: 111.2,
          }}>
            <StyledEmptySpace></StyledEmptySpace>
          </View>
          <View style= {{
            marginTop: 20.3,
            marginLeft: 122.8,
            marginRight: 111.2,
          }}>
            <StyledEmptySpace></StyledEmptySpace>
          </View>
          <View style= {{
            marginTop: 20.3,
            marginLeft: 81.5,
            marginRight: 70,
          }}>
            <StyledEmptySpace></StyledEmptySpace>
          </View>
        </StyledEmptyBox>
        <StyledOuterEmptyBox>
          <StyledEmptyBox style={{ height: 60 }}>
            <View style= {{
              marginTop: 20.3,
              marginLeft: 81.5,
              marginRight: 70,
            }}>
              <StyledEmptySpace></StyledEmptySpace>
            </View>
          </StyledEmptyBox>
        </StyledOuterEmptyBox>
        <StyledOuterEmptyBox>
          <StyledEmptyBox style={{ height: 60 }}>
            <View style= {{
              marginTop: 20.3,
              marginLeft: 81.5,
              marginRight: 70,
            }}>
              <StyledEmptySpace></StyledEmptySpace>
            </View>
          </StyledEmptyBox>
        </StyledOuterEmptyBox>
        <StyledOuterEmptyBox>
          <StyledEmptyBox style={{ height: 100 }}>
          </StyledEmptyBox>
        </StyledOuterEmptyBox>
      </StyledOuterEmptyBox>
    </Container>
  );
}

export default Page;
