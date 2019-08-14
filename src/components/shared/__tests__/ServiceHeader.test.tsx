import 'react-native';
import * as React from 'react';
import { RenderResult, act, fireEvent, render } from '@testing-library/react-native';
import ServiceHeader from '../ServiceHeader';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

let props: any;
let component: React.ReactElement;
let testingLib: RenderResult;

const createTestProps = (obj: object) => ({
  navigation: {
    navigate: jest.fn(),
  },
  ...obj,
});

describe('[ServiceHeader] render', () => {
  beforeEach(() => {
    props = createTestProps({ });
    component = (
      <ServiceHeader {...props} />
    );
  });

  it('renders without crashing', () => {
    const rendered: renderer.ReactTestRendererJSON = renderer.create(component).toJSON();
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });

  describe('interactions', () => {
    beforeEach(() => {
      testingLib = render(component);
    });

    it('should simulate onClick', () => {
      // const btn = testingLib.queryByTestId('btn');
      // act(() => {
      //   fireEvent.press(btn);
      // });
      // expect(cnt).toBe(3);
    });
  });
});
