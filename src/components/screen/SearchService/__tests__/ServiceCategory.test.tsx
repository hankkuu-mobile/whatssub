import 'react-native';

import * as React from 'react';

import { fireEvent, render, wait } from '@testing-library/react-native';
import renderer, { act } from 'react-test-renderer';

import { CATEGORY_LIST } from '../mock';
import { InitialProviders } from '../../../../providers';
import ServiceCategory from '../ServiceCategory';
import i18n from 'i18n-js';

i18n.locale = 'ko';
let component;
let props: any;

const createTestProps = (props: Object) => ({
  onSelect: jest.fn(),
  categoryList: CATEGORY_LIST,
  initialCategory: CATEGORY_LIST[0],
});

const setup = () => {
  props = createTestProps({});
  component = (
    <InitialProviders doNotWaitFont>
      <ServiceCategory {...props} />
    </InitialProviders>
  );
};

describe('[ServiceCategory] render', () => {
  beforeAll(setup);
  it('component and snapshot matches', () => {
    const rendered: renderer.ReactTestRendererJSON = renderer
      .create(component)
      .toJSON();
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });
});

it('should call onSelect(category name) when relevant category is touched', () => {
  const category = CATEGORY_LIST[0];
  const { getByTestId } = render(component);
  const ComponentsToTest = getByTestId(`CATEGORY_SELECT_${category}`);
  act(() => {
    fireEvent.press(ComponentsToTest);
  });
  expect(props.onSelect).toBeCalledWith(category);
});
