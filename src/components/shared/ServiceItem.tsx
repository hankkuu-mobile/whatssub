import React, { Component, useRef } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { IC_LIST_BTN } from '../../utils/Icons';
import { colors } from '../../theme';
import styled from 'styled-components/native';

const Container = styled.View`
  height: 50px;
  width: 100%;
  background-color: ${colors.headerBackgroundLight};
  flex-direction: row;
  align-items: center;
  padding: 0 16px;
`;

const Title = styled.Text`
  color: ${colors.textPrimaryLight};
  font-size: 16px;
  font-family: 'spoqa-han-sans-regular';
`;

const Content = styled.TextInput`
  color: ${colors.textSecondaryLight};
  font-size: 16px;
  font-family: 'spoqa-han-sans-regular';
`;

const Arrow = styled.Image`
  width: 8px;
  height: 13px;
  margin-left: 11px;
`;

interface Props {
  title: string;
  content: string;
  testID?: string;
  contentStyle?: any;
  showArrow?: boolean;
  onPress?(): any;
  editable?: boolean;
  onChangeContent?(string): void;
}

function ServiceItem(props: Props) {
  const {
    title = '제목',
    content = '내용',
    contentStyle,
    showArrow,
    editable = false,
    onPress = null,
    onChangeContent = null,
  } = props;
  const inputText = useRef(null);
  return (
    <TouchableOpacity
      testID={props.testID}
      onPress={
        // prettier-ignore
        props.onPress
          ? props.onPress
          : editable && inputText != null
            ? () => inputText.current.focus()
            : null
      }
      activeOpacity={props.onPress ? 0.2 : 1}
    >
      <Container>
        <Title>{title}</Title>
        <View style={{ flex: 1 }} />
        <Content
          ref={inputText}
          style={contentStyle}
          editable={editable}
          pointerEvents={editable ? 'auto' : 'none'}
          onChangeText={onChangeContent}
        >
          {content}
        </Content>
        {showArrow ? <Arrow source={IC_LIST_BTN} /> : null}
      </Container>
    </TouchableOpacity>
  );
}

export default ServiceItem;
