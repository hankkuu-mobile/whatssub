import ProductCard, {
  Variant,
} from '../../../src/components/shared/ProductCard';
import React, { useState } from 'react';

import { storiesOf } from '@storybook/react-native';
import styled from 'styled-components/native';

const Container = styled.SafeAreaView`
  flex: 1;
`;
const ContainerDeco = (storyFn) => <Container>{storyFn()}</Container>;

const Story = (props) => {
  const [isNotificationEnable1, setNotificationEnable1] = useState(
    props.notification ? props.notification : false,
  );
  const [isSubscribing1, setSubscribing1] = useState(
    props.subscribing ? props.subscribing : false,
  );

  return (
    <ProductCard
      onClickNotification={() => setNotificationEnable1((prev) => !prev)}
      onClickSubscription={() => setSubscribing1((prev) => !prev)}
      onClickEdit={() => {}}
      isNotificationEnable={isNotificationEnable1}
      isSubscribing={isSubscribing1}
      name='netflix'
      image='https://dummyimage.com/75x20/000/fff'
      price={65000}
      currentMonthPaymentDate={new Date('2019-7-28')}
      variant={Variant.Subscription}
      defaultIsSummary={props.summary ? props.summary : false}
    />
  );
};

storiesOf('shared-ProductCard', module)
  .addDecorator(ContainerDeco)
  .add('default', () => <Story />)
  .add('notification', () => <Story notification={true} />)
  .add('subscribing', () => <Story subscribing={true} />)
  .add('summary', () => <Story summary={true} />);
