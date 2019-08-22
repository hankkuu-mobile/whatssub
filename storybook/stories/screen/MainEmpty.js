import MainEmpty from '../../../src/components/screen/MainEmpty';
import React from 'react';
import { storiesOf } from '@storybook/react-native';

const Story = () => {
  return <MainEmpty />;
};

storiesOf('MainEmpty', module)
  .add('default', () => <Story />);
