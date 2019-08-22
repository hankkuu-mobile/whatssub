import AddServiceLink from '../../../../src/components/screen/SearchService/AddServiceLink';
import DebugButton from '../../../../src/components/shared/DebugButton';
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import styled from 'styled-components/native';

const Container = styled.SafeAreaView`
  flex: 1;
`;

const ContainerDeco = (storyFn) => <Container>{storyFn()}</Container>;

storiesOf('SearchService', module)
  .addDecorator(ContainerDeco)
  .add('└AddServiceLink', () => (
    <>
      <AddServiceLink />
      <DebugButton />
    </>
  ));
