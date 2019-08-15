import {
  Modal,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { NavigationScreenProp, NavigationStateRoute } from 'react-navigation';
import React, { Component, useEffect, useState } from 'react';

import DatePicker from '../shared/DatePicker';
import { IC_BACK } from '../../utils/Icons';
import ServiceHeader from '../shared/ServiceHeader';
import ServiceItem from '../shared/ServiceItem';
import { colors } from '../../theme';
import moment from 'moment';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  background-color: ${colors.backgroundLight};
  align-items: center;
`;

const Seperator = styled.View`
  height: 12px;
`;

const Memoboard = styled.TextInput`
  width: 100%;
  min-height: 130px;
  background-color: ${colors.headerBackgroundLight};
  padding: 13px 16px;
  font-size: 16px;
  font-family: 'spoqa-han-sans-regular';
`;

const RegisterText = styled.Text`
  font-family: 'spoqa-han-sans-regular';
  font-size: 16px;
  margin-right: 20px;
`;

const BackImage = styled.Image`
  width: 24px;
  height: 25px;
`;

const ModalContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
  background-color: rgba(0, 0, 0, 0.5);
`;

interface Props {
  navigation?: NavigationScreenProp<any, any>;
  serviceName?: string;
  standardDate?: Date;
}

function RegisterBtn(props: { submittable }) {
  const { submittable } = props;
  return (
    <TouchableOpacity>
      <RegisterText
        style={{
          color: submittable
            ? colors.highlightLight
            : colors.textSecondaryLight,
        }}
      >
        등록
      </RegisterText>
    </TouchableOpacity>
  );
}

function CustomSubsRegister(props: Props) {
  const [valid, setValid] = useState(false);
  const [serviceName, setServiceName] = useState(props.serviceName || '');
  const [expirationDate, setExpirationDate] = useState(
    props.standardDate || new Date(),
  );
  const [isPickingDate, setIsPickingDate] = useState(false);
  useEffect(() => {
    props.navigation.setParams({
      submittable: serviceName && serviceName.length > 0,
    });
  }, [serviceName]);
  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.backgroundLight }}>
      <Container>
        <ServiceHeader
          custom
          serviceName={serviceName}
          onChangeServiceName={(name) => setServiceName(name)}
        />
        <Seperator />
        <ServiceItem
          title='요금'
          content='0원'
          editable
          contentStyle={{ color: colors.blue }}
        />
        <Seperator />
        <ServiceItem
          title='결제주기'
          content='매 월'
          showArrow
          onPress={() => {
            // Maybe need to select Modal.
          }}
        />
        <ServiceItem
          title='만기일'
          content={moment(expirationDate).format('YYYY년 M월 D일')}
          showArrow
          onPress={() => setIsPickingDate(true)}
        />
        <ServiceItem
          title='이전 결제일'
          content='10일'
          showArrow
          onPress={() => {
            // Maybe need to select Modal.
          }}
        />
        <ServiceItem
          title='결제전 알림'
          content='3일 전'
          showArrow
          onPress={() => {
            // Maybe need to select Modal.
          }}
        />
        <Seperator />
        <Memoboard
          placeholder='메모'
          multiline
          style={{ textAlignVertical: 'top' }}
        />
        <Modal
          animationType='fade'
          transparent={true}
          visible={isPickingDate}
          presentationStyle='overFullScreen'
        >
          <ModalContainer>
            <TouchableWithoutFeedback
              style={{ flex: 1 }}
              onPress={() => setIsPickingDate(false)}
            >
              <View style={{ flex: 1 }} />
            </TouchableWithoutFeedback>
            <SafeAreaView>
              <DatePicker
                title='만기일'
                description='만기일을 선택해주세요.'
                date={expirationDate}
                onDateChange={(date) => setExpirationDate(date)}
              />
            </SafeAreaView>
          </ModalContainer>
        </Modal>
      </Container>
    </ScrollView>
  );
}

CustomSubsRegister.navigationOptions = ({ navigation }) => {
  return {
    headerStyle: {
      elevation: 0, // remove shadow on Android
      shadowOpacity: 0, // remove shadow on iOS
      borderWidth: 1,
    },
    headerRight: (
      <RegisterBtn submittable={navigation.getParam('submittable')} />
    ),
    headerTitle: '',
    headerLeft: (
      <TouchableOpacity
        style={{ marginStart: 13 }}
        onPress={() => navigation.goBack()}
      >
        <BackImage source={IC_BACK} />
      </TouchableOpacity>
    ),
  };
};

export default CustomSubsRegister;
