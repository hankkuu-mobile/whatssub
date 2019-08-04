import 'react-native';
import * as React from 'react';
import { RenderResult, render } from '@testing-library/react-native';
import TabBarIcon from '../TabBarIcon';
import renderer from 'react-test-renderer';
// Note: test renderer must be required after react-native.

let props: any;
let component: React.ReactElement;
let testingLib: RenderResult;

const createTestProps = (obj: object) => ({
  navigation: {
    navigate: jest.fn(),
  },
  ...obj,
});

describe('[TabBarIcon] UI Render Test', () => {
  beforeEach(() => {
    props = createTestProps({ });
    component = (
      <TabBarIcon {...props} testID="tabBarIcon" name="home" focused={false} type="MaterialIcons" />
    );
  });

  it('renders without crashing and snapshot matches', () => {
    const rendered: renderer.ReactTestRendererJSON | null = renderer.create(component).toJSON();
    expect(rendered).toMatchSnapshot(); // Guarantee UI Changed
    expect(rendered).toBeTruthy(); // Not (false, 0, '', null, undefined, and NaN)
  });
});

describe('[TabBarIcon] Interactions Test', () => {
  beforeEach(() => {
    testingLib = render(component);
  });

  it('should be changed the color when it is focused', () => {
    // testingLib.debug();
    /**
     * Unfortunately I have not found a test method.
     *
     * https://testing-library.com/docs/native-testing-library/example-intro
     * https://reactjs.org/docs/test-renderer.html#testrenderer
     * https://jestjs.io/docs/en/expect
     * https://github.com/testing-library/react-testing-library/issues/43
     *   ??expect(getByTestId('tabBarIcon')).toHaveAttribute('color', '#c6cbcf')
     * */
  });
});
