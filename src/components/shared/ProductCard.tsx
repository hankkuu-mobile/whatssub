import { IC_EDIT, IC_NOTI_OFF, IC_NOTI_ON } from '../../utils/Icons';
import React, { FC, useState } from 'react';
import { SwitchToggle } from 'dooboo-native-widgets';
import {
  TouchableOpacity,
} from 'react-native';

import { getString } from '../../../STRINGS';
import moment from 'moment';
import styled from 'styled-components/native';

const Container = styled.View<{ isSummary: boolean }>`
  display: flex;
  position: relative;
  width: 100%;
  height: ${({ isSummary }) => isSummary ? '82' : '190'};
  background-color: white;
  padding: 15px 22px;
  border-radius: 15;
  
`;

const HeaderView = styled.View<{ isSubscription: boolean }>`
  position: absolute;
  width: 100%;
  height: ${({ isSubscription }) => isSubscription ? '40' : '30'};
  top: 15;
  left: 22;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ContentView = styled.View`
  display: flex;
`;

const SummaryContentView = styled.View`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SummaryContentViewWrapper = styled.View`
  position: absolute;
  left: 20;
  top: 30;
  width: 100%;
`;

const TitleText = styled.Text`
  font-family: 'spoqa-han-sans-bold';
  margin-top: 17;
  text-align: center;
  font-size: 16;
  font-weight: bold;
  color: ${({ theme }) => theme.fontColor};
`;

const SummaryTitleTextWrapper = styled.View`
  display: flex;
`;

const SummaryTitleText = styled.Text`
  font-family: 'spoqa-han-sans-bold';
  text-align: center;
  font-size: 16;
  font-weight: bold;
  color: ${({ theme }) => theme.fontColor};
`;

const PriceText = styled.Text`
  font-family: 'spoqa-han-sans-regular';
  font-size: 14;
  text-align: center;
  color: rgb(153, 162, 170);
  margin-top: 10;
`;

const DateText = styled.Text<{ variant: Variant, isSummary: boolean }>`
  font-family: ${({ isSummary }) =>
    isSummary ? 'spoqa-han-sans-bold' : 'spoqa-han-sans-regular'};
  font-size: ${({ isSummary }) =>
    isSummary ? '16' : '40'};
  text-align: center;
  color: ${({ variant }) =>
    variant === 'subscription'
      ? 'rgb(255, 77, 108)'
      : 'rgb(62, 126, 255)'};
`;

const ProductImage = styled.Image<{ isSubscription: boolean }>`
  width: ${({ isSubscription }) => isSubscription ? '75' : '31'};
  height: ${({ isSubscription }) => isSubscription ? '20' : '31'};
  margin-top: ${({ isSubscription }) => isSubscription ? '10' : '0'};
  margin-bottom: ${({ isSubscription }) => isSubscription ? '10' : '0'};
  margin-right: auto;
  margin-left: auto;
`;

const IconImage = styled.Image`
  width: 24;
  height: 24;
`;

const IconWrapper = styled.View`
  display: flex;
  flex-direction: row;
`;

const ContentText = styled.Text`
  font-family: 'spoqa-han-sans-bold';
  text-align: center;
  font-size: 13;  
`;

export enum Variant {
  Subscription = 'subscription',
  Payment = 'payment',
};

export interface ProductCardProps {
  onClickNotification: () => void;
  onClickSubscription?: () => void;
  onClickEdit: () => void;
  isNotificationEnable: boolean;
  isSubscribing?: boolean;
  name: string;
  image: string;
  price: number;
  currentMonthPaymentDate: Date;
  variant?: Variant;
  defaultIsSummary?: boolean;
}

const ProductCard: FC<ProductCardProps> = ({
  name, image, price, currentMonthPaymentDate, variant = Variant.Subscription,
  isNotificationEnable, isSubscribing = false, onClickSubscription, onClickNotification,
  onClickEdit, defaultIsSummary = false,
}) => {
  const dDay = moment(currentMonthPaymentDate)
    .diff(moment().startOf('day'), 'day');
  const isSubscription = variant === Variant.Subscription;
  const [isSummary, setIsSummary] = useState(defaultIsSummary);

  const onPressCard = () => {
    setIsSummary((prev) => !prev);
  };

  const onClickSwitchToggle = () => {
    onClickSubscription();
    return null;
  };

  const onPressNotiIcon = () => {
    onClickNotification();
  };

  const renderNoti = isNotificationEnable
    ? <TouchableOpacity onPress={onPressNotiIcon} testID='notiOffIcon'>
      <IconImage source={IC_NOTI_OFF}/>
    </TouchableOpacity>
    : <TouchableOpacity onPress={onPressNotiIcon} testID="notiOnIcon">
      <IconImage source={IC_NOTI_ON}/>
    </TouchableOpacity>;

  const renderSwitch = <SwitchToggle
    backTextRight={isSubscribing
      ? '' : getString('PRODUCTION_CARD_SUBSCRIPTION_SWITCH_OFF')}
    backTextLeft={isSubscribing
      ? getString('PRODUCTION_CARD_SUBSCRIPTION_SWITCH_ON') : ''}
    textRightStyle={{ color: 'white', position: 'absolute', left: 5, top: -7 }}
    textLeftStyle={{ color: 'white', position: 'absolute', left: 5, top: -7 }}
    switchOn={isSubscribing}
    backgroundColorOn={'rgb(2, 48, 89)'}
    backgroundColorOff={'rgb(2, 48, 89)'}
    circleColorOn={'white'}
    circleColorOff={'white'}
    onPress={onClickSwitchToggle}/>;

  return (
    <TouchableOpacity onPress={onPressCard} testID='productCard'>
      <Container isSummary={isSummary}>
        {isSummary
          ? <>
            <SummaryTitleTextWrapper testID='summaryTitleText'>
              <SummaryTitleText>{name}</SummaryTitleText>
              <PriceText>{price && `-${price.toLocaleString()}원`}</PriceText>
            </SummaryTitleTextWrapper>
            <SummaryContentViewWrapper>
              <SummaryContentView>
                <DateText variant={variant} isSummary={isSummary}>
                  {`D-${dDay}`}
                </DateText>
                {isSubscription ? renderSwitch : renderNoti}
              </SummaryContentView>
            </SummaryContentViewWrapper>
          </>
          : <>
            <ProductImage
              testID='productImg'
              source={{ uri: image }}
              isSubscription={isSubscription}
            />
            <HeaderView isSubscription={isSubscription}>
              <IconWrapper>
                <TouchableOpacity onPress={onClickEdit}>
                  <IconImage source={IC_EDIT}/>
                </TouchableOpacity>
                {isSubscription && renderNoti}
              </IconWrapper>
              {isSubscription ? renderSwitch : renderNoti}
            </HeaderView>
            <ContentView>
              <TitleText>{name}</TitleText>
              <DateText variant={variant} isSummary={false}>
                {`D-${dDay}`}
              </DateText>
              <ContentText>
                {`${moment(currentMonthPaymentDate).format('M월 D일')}에
                  ${price && price.toLocaleString()}원이 결제될 예정입니다.`}
              </ContentText>
            </ContentView>
          </>
        }
      </Container>
    </TouchableOpacity>
  );
};

export default ProductCard;
