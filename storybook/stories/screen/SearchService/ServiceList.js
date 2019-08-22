import {
  INITIAL_GROUP_ORDER_TABLE,
  SERVICE_LIST,
} from '../../../../src/components/screen/SearchService/mock';

import FakeNavigator from '../../../utils/FakeNavigator';
import React from 'react';
import ServiceList from '../../../../src/components/screen/SearchService/ServiceList';
import { dataTransform } from '../../../../src/components/screen/SearchService/dataTransform';
import { storiesOf } from '@storybook/react-native';
import styled from 'styled-components/native';

const Container = styled.SafeAreaView`
  flex: 1;
`;

const ContainerDeco = (storyFn) => <Container>{storyFn()}</Container>;

storiesOf('SearchService', module)
  .addDecorator(ContainerDeco)
  .add('└ServiceList', () => <ServiceList serviceList={MOCK} />);

const MOCK = dataTransform(SERVICE_LIST, INITIAL_GROUP_ORDER_TABLE);
