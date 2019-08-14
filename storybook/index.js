import './rn-addons';
import { addDecorator, configure, getStorybookUI } from '@storybook/react-native';
import { AppRegistry } from 'react-native';

import { setupGlobalDecorators } from './decorators';

// import stories
configure(() => {
  require('./stories');
}, module);

setupGlobalDecorators();

/* Refer to https://github.com/storybookjs/storybook/
tree/master/app/react-native#start-command-parameters */
// To find allowed options for getStorybookUI
const StorybookUIRoot = getStorybookUI({});

export default StorybookUIRoot;
