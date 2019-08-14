import 'react-native';
import * as React from 'react';
import ProductCard, { ProductCardProps, Variant } from '../ProductCard';
import { RenderResult, act, fireEvent, render } from '@testing-library/react-native';

import { AppProvider } from '../../../providers';
import { ThemeProvider } from 'styled-components/native';
import { ThemeType } from '../../../types';
import { createTheme } from '../../../theme';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

const props = {
  name: 'netflix',
  image: 'url',
  onClickEdit: () => {},
  isNotificationEnable: false,
  onClickNotification: () => {},
  price: 1234,
  currentMonthPaymentDate: new Date(2019, 8, 13),
};

const component = (props: ProductCardProps) => {
  return (
    <AppProvider doNotWaitFont>
      <ThemeProvider theme={createTheme(ThemeType.LIGHT)}>
        <ProductCard {...props}/>
      </ThemeProvider>
    </AppProvider>
  );
};

let rendered: renderer.ReactTestRendererJSON;
let testingLib: RenderResult;
// test for the container page in dom
describe('[ProductCard] ui rendering test', () => {
  it('should render outer component and snapshot matches', () => {
    rendered = renderer.create(component(props)).toJSON();
    expect(rendered).toMatchSnapshot();
  });

  it('should include button when "variant" is subscription', () => {
    const Component = component({ ...props, variant: Variant.Subscription });
    rendered = renderer.create(Component).toJSON();
    testingLib = render(Component); // Todo: add SwitchToggle testID
  });

  it('should include summary title text when product card is pressed', () => {
    const Component = component(props);
    testingLib = render(Component);
    rendered = renderer.create(Component).toJSON();
    fireEvent.press(testingLib.getByTestId('productCard'));
    testingLib.getByTestId('summaryTitleText');
  });
});

describe('[ProductCard] Interaction', () => {
  let testingLib: RenderResult;

  it('should simulate [notification Icon] click', () => {
    let cnt = 0;
    const Component = component(
      { ...props, isNotificationEnable: true, onClickNotification: () => cnt++ });
    testingLib = render(Component);
    act(() => {
      fireEvent.press(testingLib.getByTestId('notiOffIcon'));
    });
    expect(cnt).toBe(1);
  });
});
