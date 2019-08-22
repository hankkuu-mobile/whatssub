import React, { useContext, useState } from 'react';

import { Button } from 'dooboo-native-widgets';
import DebugButton from '../../../../src/components/shared/DebugButton';
import SearchInput from '../../../../src/components/screen/SearchService/SearchInput';
import { storiesOf } from '@storybook/react-native';
import styled from 'styled-components/native';

const Container = styled.SafeAreaView`
  flex: 1;
`;

const SearchInputWithState = () => {
  const [value, setValue] = useState('');
  return <SearchInput value={value} onDebounceOrOnReset={setValue} />;
};

const ContainerDeco = (storyFn) => <Container>{storyFn()}</Container>;

storiesOf('SearchService', module)
  .addDecorator(ContainerDeco)
  .add('└SearchInput', () => (
    <>
      <SearchInputWithState />
      <DebugButton />
    </>
  ));
