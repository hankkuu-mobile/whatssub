import * as React from 'react';

import { AppContext, AppProvider, initialState } from '../AppProvider';
import { Button, Text, View } from 'react-native';
import {
  act,
  cleanup,
  fireEvent,
  render,
  wait,
  waitForElement,
} from '@testing-library/react-native';

import PropTypes from 'prop-types';
import { ThemeType } from '../../types';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

let Component: React.ReactElement;

const FakeChild = () => {
  const { state, changeTheme } = React.useContext(AppContext);

  return (
    <View>
      <Text testID="TEXT">{JSON.stringify(state, null, 2)}</Text>
      <Button
        testID="BUTTON"
        onPress={() => changeTheme()}
        title="Button"
      />
    </View>
  );
};

describe('[AppProvider] rendering test', () => {
  let json: renderer.ReactTestRendererJSON;
  const component = (
    <AppProvider>
      <FakeChild />
    </AppProvider>
  );

  it('component and snapshot matches', () => {
    json = renderer.create(component).toJSON();
    expect(json).toMatchSnapshot();
  });
});

describe('[AppProvider] interactions', () => {
  Component = (
    <AppProvider doNotWaitFont>
      <FakeChild />
    </AppProvider>
  );

  it('initial theme setup', async () => {
    const { getByTestId } = render(Component);
    const text = getByTestId('TEXT');
    expect(JSON.parse(text.children[0] as string)).toStrictEqual({
      theme: initialState.theme,
    });
  });

  it('test changeTheme()', async () => {
    const { getByTestId } = render(Component);
    const text = getByTestId('TEXT');
    act(() => {
      fireEvent.press(getByTestId('BUTTON'));
    });
    expect(JSON.parse(text.children[0] as string)).toStrictEqual({
      theme: ThemeType.DARK,
    });
  });

  it('set initial theme by props()', async () => {
    const type = ThemeType.DARK;
    const ComponentWithProps = (
      <AppProvider theme={type} doNotWaitFont>
        <FakeChild />
      </AppProvider>
    );

    const { getByTestId } = render(ComponentWithProps);
    const text = getByTestId('TEXT');
    expect(JSON.parse(text.children[0] as string)).toStrictEqual({
      theme: type,
    });
  });

  it('changeTheme() after setting initial theme by props()', async () => {
    const type = ThemeType.DARK;
    const ComponentWithProps = (
      <AppProvider theme={type} doNotWaitFont>
        <FakeChild />
      </AppProvider>
    );

    const { getByTestId } = render(ComponentWithProps);
    const text = getByTestId('TEXT');
    act(() => {
      fireEvent.press(getByTestId('BUTTON'));
    });
    expect(JSON.parse(text.children[0] as string)).toStrictEqual({
      theme: ThemeType.LIGHT,
    });
  });
});
