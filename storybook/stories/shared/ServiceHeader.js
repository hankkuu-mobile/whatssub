import { IC_FACEBOOK } from '../../../src/utils/Icons';
import React from 'react';
import ServiceHeader from '../../../src/components/shared/ServiceHeader';
import { colors } from '../../../src/theme';
import { storiesOf } from '@storybook/react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  background-color: ${colors.gray};
`;

const Description = styled.Text`
  padding: 10px;
`;

const Story = () => {
  const [title, setTitle] = React.useState('');
  return (
    <Container>
      <Description>Default (custom) title : {title}</Description>
      <ServiceHeader
        custom
        onChangeServiceName={(text) => setTitle(text)}/>
      <Description>Casual mode</Description>
      <ServiceHeader
        serviceName='페이스북'
        image={IC_FACEBOOK}
        description='페이스북 구독 페이지'/>
    </Container>
  );
};

storiesOf('shared-ServiceHeader', module)
  .add('default', () => <Story/>)
;
