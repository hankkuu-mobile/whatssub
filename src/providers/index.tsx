import { AppConsumer, AppContext, AppProvider } from './AppProvider';

import PropTypes from 'prop-types';
import React from 'react';
import StyledComponentThemeProvider from './StyledComponentThemeProvider';
import { ThemeType } from '../types';

interface Props {
  theme?: ThemeType;
  children?: any;
  doNotWaitFont?: boolean;
}

const InitialProviders = ({ children, ...rest }: Props) => (
  <AppProvider {...rest}>
    <StyledComponentThemeProvider>{children}</StyledComponentThemeProvider>
  </AppProvider>
);

InitialProviders.propTypes = {
  children: PropTypes.node,
};

export { AppProvider, AppConsumer, AppContext, InitialProviders };
