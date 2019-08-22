import React, { useState } from 'react';

import AuthLoading from '../../../src/components/screen/AuthLoading';
import { number } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
`;

const AuthLoadingStory = () => {
  const [count, setCount] = useState(1);
  return (
    <Container>
      <AuthLoading
        // by changing key, the component will re-render
        key={count}
        navigation={
          {
            navigate: (arg) => {
              // console.log(`navigate function got called ${count} times`);
              setTimeout(() => {
                setCount(count + 1);
              }, number('delay', 300));
            },
          } as any
        }
      />
    </Container>
  );
};

storiesOf('AuthLoading', module).add('default', () => <AuthLoadingStory />);
