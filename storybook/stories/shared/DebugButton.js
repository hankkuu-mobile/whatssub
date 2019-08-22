import { addDecorator, storiesOf } from '@storybook/react-native';

import DebugButton from '../../../src/components/shared/DebugButton';
import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
`;

const ContainerDeco = (storyFn) => <Container>{storyFn()}</Container>;

storiesOf('shared-DebugButton', module)
  .addDecorator(ContainerDeco)
  .add('default', () => <DebugButton />);
