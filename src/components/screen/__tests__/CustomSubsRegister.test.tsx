import 'react-native';
import * as React from 'react';
import { RenderResult, act, fireEvent, render } from '@testing-library/react-native';
import CustomSubsRegister from '../CustomSubsRegister';

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

describe('[CustomSubsRegister] screen', () => {
  beforeEach(() => {
    props = createTestProps({
      navigation: {
        setParams: () => null,
      },
      serviceName: 'myService',
    });
    component = (
      <CustomSubsRegister {...props} standardDate={new Date(2019, 7, 8)} />
    );
  });

  it('renders without crashing', () => {
    const rendered = renderer.create(component).toJSON();
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
      //   fireEvent.press(btn);
      // });
      // expect(cnt).toBe(3);
    });
  });
});
