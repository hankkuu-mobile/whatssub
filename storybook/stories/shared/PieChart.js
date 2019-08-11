import { Text, TouchableOpacity } from 'react-native';

import PieChart from '../../../src/components/shared/PieChart';
import React from 'react';
import { getString } from '../../../STRINGS';
import { storiesOf } from '@storybook/react-native';
import styled from 'styled-components/native';

const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const ContainerDeco = (storyFn) => <Container>{storyFn()}</Container>;

const Story = () => {
  const [selectedMonth, setSelectedMonth] = React.useState('2019.06');

  return (
    <>
      <PieChart
        data={sampleDatas[selectedMonth]}
        style={{ width: 300, height: 300 }}
        defaultShowSlice={0}
        currentMonth={selectedMonth}
      />
      <TouchableOpacity
        onPress={() => {
          setSelectedMonth('2019.06');
        }}
      >
        <Text>{'2019.06'}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setSelectedMonth('2019.07');
        }}
      >
        <Text>{'2019.07'}</Text>
      </TouchableOpacity>
    </>
  );
};

storiesOf('shared-PieChart', module)
  .addDecorator(ContainerDeco)
  .add('default', () => <Story />);

const sampleDatas = {
  2019.06: [
    {
      name: 'prod_1',
      category: getString('CATEGORY_CULTURE_LEISURE'),
      price: 100,
      currency: '',
      date: new Date(),
      image: '',
      currentMonthPaymentDate: new Date(),
    },
    {
      name: 'prod_2',
      category: getString('CATEGORY_CULTURE_LEISURE'),
      price: 100,
      currency: '',
      date: new Date(),
      image: '',
      currentMonthPaymentDate: new Date(),
    },
    {
      name: 'prod_3',
      category: getString('CATEGORY_CULTURE_LEISURE'),
      price: 100,
      currency: '',
      date: new Date(),
      image: '',
      currentMonthPaymentDate: new Date(),
    },
    {
      name: 'prod_4',
      category: getString('CATEGORY_EDUCATION'),
      price: 100,
      currency: '',
      date: new Date(),
      image: '',
      currentMonthPaymentDate: new Date(),
    },
    {
      name: 'prod_5',
      category: getString('CATEGORY_GAME'),
      price: 100,
      currency: '',
      date: new Date(),
      image: '',
      currentMonthPaymentDate: new Date(),
    },
  ],
  2019.07: [
    {
      name: 'prod_1',
      category: getString('CATEGORY_CULTURE_LEISURE'),
      price: 100,
      currency: '',
      date: new Date(),
      image: '',
      currentMonthPaymentDate: new Date(),
    },
    {
      name: 'prod_3',
      category: getString('CATEGORY_CULTURE_LEISURE'),
      price: 200,
      currency: '',
      date: new Date(),
      image: '',
      currentMonthPaymentDate: new Date(),
    },
    {
      name: 'prod_4',
      category: getString('CATEGORY_EDUCATION'),
      price: 100,
      currency: '',
      date: new Date(),
      image: '',
      currentMonthPaymentDate: new Date(),
    },
    {
      name: 'prod_5',
      category: getString('CATEGORY_GAME'),
      price: 100,
      currency: '',
      date: new Date(),
      image: '',
      currentMonthPaymentDate: new Date(),
    },
    {
      name: 'prod_6',
      category: getString('CATEGORY_GAME'),
      price: 200,
      currency: '',
      date: new Date(),
      image: '',
      currentMonthPaymentDate: new Date(),
    },
  ],
};
