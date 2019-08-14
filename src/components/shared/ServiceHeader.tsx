import {
  Dimensions,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View } from 'react-native';
import React, { Component } from 'react';

import { IC_WRITE } from '../../utils/Icons';
import { IMG_MAIN } from '../../utils/Images';
import { colors } from '../../theme';
import styled from 'styled-components/native';

const Container = styled.View`
  width: 100%;
  background-color: ${colors.headerBackgroundLight};
  align-items: center;
  justify-content: center;
`;

const ImageContainer = styled.View`
  height: 86px;
  align-items: center;
  justify-content: center;
`;

const MainImage = styled.Image`
  max-height: 86px;
  width: ${Dimensions.get('window').width}px;
`;

const ServiceName = styled.Text`  
  font-family: 'spoqa-han-sans-bold';
  font-size: 16px;
`;

const ServiceNameInput = styled.TextInput`  
  font-family: 'spoqa-han-sans-bold';
  font-size: 16px;
`;

const ServiceDescription = styled.Text`  
  font-family: 'spoqa-han-sans-regular';
  font-size: 14px;
  color: ${colors.gray};
  margin-top: 13px;
  margin-bottom: 20px;
`;

interface Props {
  image?: number
  custom?: boolean
  serviceName?: string
  description?: string
  onChangeServiceName?(string): void
}

function Shared(props: Props) {
  const {
    image = IMG_MAIN,
    description = '서비스에 대한 요금과 결제정보를 입력해주세요.',
    custom = false,
    serviceName,
  } = props;
  const titleRef = React.useRef(null);
  return (
    <Container>
      <ImageContainer>
        <MainImage source={image} resizeMode='contain' />
      </ImageContainer>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {
          custom
            ? <ServiceNameInput
              ref={titleRef}
              placeholder='서비스명을 직접 입력해주세요.'
              value={serviceName}
              placeholderTextColor='black'
              onChangeText={props.onChangeServiceName}/>
            : <ServiceName>{serviceName}</ServiceName>
        }
        {
          custom
            ? <TouchableOpacity onPress={() => titleRef != null && titleRef.current.focus()}>
              <Image source={IC_WRITE} style={{ width: 14, height: 16, marginHorizontal: 4 }} />
            </TouchableOpacity>
            : null
        }
      </View>
      <ServiceDescription>{description}</ServiceDescription>
    </Container>
  );
}

export default Shared;
