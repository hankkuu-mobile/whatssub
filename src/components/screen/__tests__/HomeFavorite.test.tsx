import 'react-native';
import * as React from 'react';
import { RenderResult, render } from '@testing-library/react-native';
import HomeFavorite from '../HomeFavorite';
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

describe('[HomeFavorite] screen', () => {
  beforeEach(() => {
    props = createTestProps({ });
    component = (
      <HomeFavorite {...props} />
    );
    testingLib = render(component);
  });

  it('renders without crashing', () => {
    const rendered = renderer.create(component).toJSON();
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });

  it('should render [Text] with value "myText"', () => {
    const textInstance = testingLib.getByTestId('myText');
    expect(textInstance.props.children).toEqual('FAVORITE SCREEN ROOT PAGE');
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
