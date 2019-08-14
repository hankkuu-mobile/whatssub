import { NavigationScreenProp, NavigationStateRoute } from 'react-navigation';
import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  background-color: transparent;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const StyledText = styled.Text`
  font-size: 16;
  color: blue;
`;

interface Props {
  navigation?: NavigationScreenProp<any, any>;
}

function Page(props: Props) {
  return (
    <Container>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('CustomSubsRegister');
        }}
      >
        <StyledText testID='myText'>CustomSubsRegister screen</StyledText>
      </TouchableOpacity>
    </Container>
  );
}

export default Page;
