import SearchService, {
  SearchServiceWithMock,
} from '../../../../src/components/screen/SearchService';

import FakeNavigator from '../../../utils/FakeNavigator';
import React from 'react';
import i18n from 'i18n-js';
import { storiesOf } from '@storybook/react-native';
import styled from 'styled-components/native';

const Container = styled.SafeAreaView`
  flex: 1;
`;

const ContainerDeco = (storyFn) => (
  <Container>
    <FakeNavigator>서비스 등록</FakeNavigator>
    {storyFn()}
  </Container>
);

storiesOf('SearchService', module)
  .addDecorator(ContainerDeco)
  .add('default', () => {
    i18n.locale = 'ko';
    return (
      <>
        <SearchServiceWithMock />
      </>
    );
  });
