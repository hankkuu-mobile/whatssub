import 'react-native';

import * as React from 'react';

import { INITIAL_GROUP_ORDER_TABLE, SERVICE_LIST } from '../mock';
import { fireEvent, render, wait } from '@testing-library/react-native';
import renderer, { act } from 'react-test-renderer';

import { InitialProviders } from '../../../../providers';
import ServiceList from '../ServiceList';
import { dataTransform } from '../dataTransform';
import i18n from 'i18n-js';

i18n.locale = 'ko';
let component;
let props: any;

const MOCK = dataTransform(SERVICE_LIST, INITIAL_GROUP_ORDER_TABLE);

const createTestProps = (props: Object) => ({
  serviceList: MOCK,
});

const setup = () => {
  props = createTestProps({});
  // eslint-disable-next-line no-console
  console.log('props', props);
  component = (
    <InitialProviders doNotWaitFont>
      <ServiceList {...props} />
    </InitialProviders>
  );
};

describe('[ServiceList] render', () => {
  // beforeAll(setup);
  it('component and snapshot matches', () => {
    const rendered: renderer.ReactTestRendererJSON = renderer
      .create(
        <InitialProviders doNotWaitFont>
          <ServiceList {...createTestProps({})} />
        </InitialProviders>,
      )
      .toJSON();
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });
});
