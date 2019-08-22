import { CATEGORY_LIST } from '../../../../src/components/screen/SearchService/mock';
import React from 'react';
import ServiceCategory from '../../../../src/components/screen/SearchService/ServiceCategory';
import { storiesOf } from '@storybook/react-native';
import styled from 'styled-components/native';

const Container = styled.SafeAreaView`
  flex: 1;
`;

const SimpleContainerDecorator = (storyFn) => (
  <Container>{storyFn()}</Container>
);

storiesOf('SearchService', module)
  .addDecorator(SimpleContainerDecorator)
  .add('└ServiceCategory', () => (
    <ServiceCategory
      categoryList={CATEGORY_LIST}
      onSelect={(category) => {
        // eslint-disable-next-line no-console
        console.log('category selected', category);
      }}
      initialCategory={CATEGORY_LIST[0]}
    />
  ));
