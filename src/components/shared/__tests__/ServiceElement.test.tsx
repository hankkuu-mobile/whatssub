import 'react-native';

import React from 'react';
import { SERVICE_ELEMENT_MOCK } from '../../../../storybook/stories/shared/ServiceElement';
import ServiceElement from '../ServiceElement';
import renderer from 'react-test-renderer';

describe('[ServiceElement]', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<ServiceElement {...SERVICE_ELEMENT_MOCK} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
