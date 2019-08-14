import React from 'react';
import ServiceItem from '../../../src/components/shared/ServiceItem';
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
  const [editableContent, setEditableContent] = React.useState('내용');
  return (
    <Container>
      <Description>Default</Description>
      <ServiceItem/>
      <Description>Clickable</Description>
      <ServiceItem title='클릭가능한 아이템' onPress={() => { /* DO SOMTHING */ }}/>
      <Description>Editable {editableContent}</Description>
      <ServiceItem
        title='편집할 수 있는 아이템'
        editable
        onChangeContent={(value) => setEditableContent(value)}/>
    </Container>
  );
};

storiesOf('shared-ServiceItem', module)
  .add('default', () => <Story />);
