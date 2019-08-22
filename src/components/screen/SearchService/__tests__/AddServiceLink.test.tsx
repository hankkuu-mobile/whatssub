import 'react-native';

import * as React from 'react';

import { fireEvent, render, wait } from '@testing-library/react-native';
import renderer, { act } from 'react-test-renderer';

import AddServiceLink from '../AddServiceLink';
import { InitialProviders } from '../../../../providers';

let component;
let props: any;

const createTestProps = (props: Object) => ({
  onClickAddServiceLink: jest.fn(),
});

const setup = () => {
  props = createTestProps({});
  component = (
    <InitialProviders doNotWaitFont>
      <AddServiceLink {...props} />
    </InitialProviders>
  );
};

describe('[AddServiceLink] render', () => {
  beforeAll(setup);
  it('component and snapshot matches', () => {
    const rendered: renderer.ReactTestRendererJSON = renderer
      .create(component)
      .toJSON();
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });
});

describe('[AddServiceLink] interaction', () => {
  beforeAll(setup);
  it('should call onClickAddServiceLink', () => {
    const { getByTestId } = render(component);
    const AddServiceLink = getByTestId('TOUCHABLE_ADD_SERVICE_LINK');
    act(() => {
      fireEvent.press(AddServiceLink);
    });
    expect(props.onClickAddServiceLink).toBeCalled();
  });
});
