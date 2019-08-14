import {
  Dimensions,
  Text,
  View,
} from 'react-native';
import React, { Component, useEffect, useState } from 'react';
import Picker from 'react-native-picker-scrollview';
import { colors } from '../../theme';
import moment from 'moment';
import styled from 'styled-components/native';

const Container = styled.View`
  width: ${Dimensions.get('screen').width}px;
  height: 255px;
  background-color: ${colors.headerBackgroundLight};
  align-items: center;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

const Header = styled.View`
  align-items: center;
  border-bottom-color: #e6eaee;
  border-bottom-width: 1px;
  height: 90px;
  width: ${Dimensions.get('screen').width}px;
`;

const Title = styled.Text`
  color: ${colors.textPrimaryLight};
  font-family: 'spoqa-han-sans-bold';
  font-size: 16px;
  line-height: 19px;
  margin-top: 21px;
`;

const Description = styled.Text`
  color: ${colors.textPrimaryLight};
  font-family: 'spoqa-han-sans-regular';
  font-size: 14px;
  margin-top: 14px;
`;

const Body = styled.View`
  align-items: center;
  flex: 1;
  flex-direction: row;
  justify-content: space-around;
  padding: 0 40px;
  width: 100%;
`;

const Row = styled.View`
  align-items: center;
  flex-direction: row;
`;

const DateUnit = styled.Text`
  color: ${colors.textPrimaryLight};
  font-family: 'spoqa-han-sans-regular';
  font-size: 24px;
`;

const PickerText = styled.Text`
  background-color: ${colors.headerBackgroundLight};
  color: ${colors.blue};  
  font-family: 'spoqa-han-sans-regular';
  font-size: 24px;
  height: 35px;
`;

interface Props {
  date?: Date
  onDateChange?(newDate: Date): void
  minDate?: Date
  maxDate?: Date
  title: string
  description?: string
}

function DatePicker(props: Props) {
  const today = new Date();
  const {
    title,
    description = '날짜를 선택해주세요.',
    date = today,
    minDate = new Date(today.getFullYear() - 10, today.getMonth()),
    maxDate = new Date(today.getFullYear() + 10, today.getMonth()),
    onDateChange = () => null,
  } = props;
  const [selectedDate, setSelectedDate] = useState(date);
  useEffect(() => {
    if (onDateChange) {
      onDateChange(selectedDate);
    }
  }, [selectedDate]);
  const yearSource = Array.from(
    Array(maxDate.getFullYear() - minDate.getFullYear() + 1).keys()
  ).map((adder) => minDate.getFullYear() + adder);
  const yearIndex = selectedDate.getFullYear() - minDate.getFullYear();
  return (
    <Container>
      <Header>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </Header>
      <Body>
        <Row>
          <Picker
            highlightColor={'transparent'}
            wrapperHeight={105}
            itemHeight={35}
            dataSource={yearSource}
            selectedIndex={yearIndex}
            onValueChange={(value) => setSelectedDate(
              new Date(
                value,
                selectedDate.getMonth(),
                selectedDate.getDate()
              )
            )}
            renderItem={(value, idx, isSelected) => (
              <PickerText style={{ opacity: isSelected ? 1 : 0.2 }}>{value}</PickerText>
            )}/>
          <DateUnit>년</DateUnit>
        </Row>
        <Row>
          <Picker
            highlightColor={'transparent'}
            wrapperHeight={105}
            itemHeight={35}
            dataSource={Array.from(Array(12).keys())}
            selectedIndex={selectedDate.getMonth()}
            onValueChange={(value) => setSelectedDate(
              new Date(
                selectedDate.getFullYear(),
                value,
                selectedDate.getDate()
              )
            )}
            renderItem={(value, idx, isSelected) => (
              <PickerText style={{ opacity: isSelected ? 1 : 0.2 }}>{value + 1}</PickerText>
            )}/>
          <DateUnit>월</DateUnit>
        </Row>
        <Row>
          <Picker
            highlightColor={'transparent'}
            wrapperHeight={105}
            itemHeight={35}
            dataSource={Array.from(Array(31).keys()).map((d) => d + 1)}
            selectedIndex={selectedDate.getDate() - 1}
            onValueChange={(value) => setSelectedDate(
              new Date(
                selectedDate.getFullYear(),
                selectedDate.getMonth(),
                value,
              )
            )}
            renderItem={(value, idx, isSelected) => (
              <PickerText style={{ opacity: isSelected ? 1 : 0.2 }}>{value}</PickerText>
            )}/>
          <DateUnit>일</DateUnit>
        </Row>
      </Body>
    </Container>
  );
}

export default DatePicker;
