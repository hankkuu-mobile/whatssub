import DatePicker from '../../../src/components/shared/DatePicker';
import React from 'react';
import { colors } from '../../../src/theme';
import moment from 'moment';
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
  const [date, setDate] = React.useState(new Date());
  return (
    <Container>
      <Description>
        {`선택된 날짜 : ${moment(date).format('YYYYMMDD')}`}
      </Description>
      <DatePicker
        title='샘플 타이틀'
        description='날짜를 선택해주세요'
        date={date}
        onDateChange={(newDate) => setDate(newDate)}/>
    </Container>
  );
};

storiesOf('shared-DatePicker', module)
  .add('default', () => <Story/>);
