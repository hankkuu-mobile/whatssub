import { addDecorator, storiesOf } from '@storybook/react-native';

import React from 'react';
import ServiceElement from '../../../src/components/shared/ServiceElement';
import styled from 'styled-components/native';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: grey;
`;

const MOCK = {
  imageSource: {
    uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png',
  },
  name: 'name',
  category: 'category',
};

const ContainerDeco = (storyFn) => <Container>{storyFn()}</Container>;

storiesOf('shared-ServiceElement', module)
  .addDecorator(ContainerDeco)
  .add('default', () => <ServiceElement {...MOCK} />);

export { MOCK as SERVICE_ELEMENT_MOCK };
