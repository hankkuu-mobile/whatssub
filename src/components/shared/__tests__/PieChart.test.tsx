import * as React from 'react';

import { Text, TouchableOpacity } from 'react-native';

import PieChart from '../PieChart';
import { ThemeProvider } from 'styled-components/native';
import { ThemeType } from '../../../types';
import { createTheme } from '../../../theme';
import { getString } from '../../../../STRINGS';
import renderer from 'react-test-renderer';

const ComponentToTest = () => {
  const [selectedMonth, setSelectedMonth] = React.useState('2019.06');

  return (
    <ThemeProvider theme={createTheme(ThemeType.LIGHT)}>
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
    </ThemeProvider>
  );
};

// wrap `ComponentToTest` to avoid Hooks bug
const component = () => <ComponentToTest />;

describe('[PieChart]', () => {
  it('renders without crashing', () => {
    const rendered = renderer.create(component()).toJSON();
    expect(rendered).toMatchSnapshot();
  });
});

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
