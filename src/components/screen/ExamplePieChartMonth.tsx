import PieChart, { Product } from '../shared/PieChart';
import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
} from 'react-native';
import { getString } from '../../../STRINGS';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.background};
  align-items: center;
  justify-content: flex-start;
`;

interface Props {
  navigation: any;
}

function Page(props: Props) {
  const [data, setData] = React.useState(null);
  const [selectedMonth, setSelectedMonth] = React.useState('2019.06');
  React.useEffect(() => {
    setData(sampleDatas[selectedMonth]);
    return () => {};
  }, [selectedMonth]);

  return (
    <Container style={{
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
    }}>
      <PieChart
        data={data}
        style={{ width: 300, height: 300 }}
        defaultShowSlice={ 0 }
        currentMonth={selectedMonth}
      />
      {/* <PieChartWithDynamicSlices/>
      <PieChartWithCenteredLabels/> */}
      <TouchableOpacity
        onPress={ () => {
          setSelectedMonth('2019.06');
        }}
      >
        <Text>{'2019.06'}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={ () => {
          setSelectedMonth('2019.07');
        }}
      >
        <Text>{'2019.07'}</Text>
      </TouchableOpacity>
    </Container>
  );
}

export default Page;

const sampleDatas: { [ key : string ]: Product[] } = {
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
