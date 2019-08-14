/* eslint-disable react/prop-types */
import React, { Children, useState } from 'react';
import {
  createAppContainer,
  createStackNavigator,
} from 'react-navigation';
import CustomSubsRegister from '../../../src/components/screen/CustomSubsRegister';

import { SafeAreaView } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
`;

const ResgisterPersonalProductStory = () => {
  return (
    <Container>
      <CustomSubsRegister
        navigation={{
          setParams: (newParams) => null,
        }}/>
    </Container>
  );
};

storiesOf('CustomSubsRegister', module)
  .add('default', () => <ResgisterPersonalProductStory />);
