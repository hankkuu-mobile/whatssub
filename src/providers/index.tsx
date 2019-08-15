import { AppConsumer, AppContext, AppProvider } from './AppProvider';

import PropTypes from 'prop-types';
import React from 'react';
import StyledComponentThemeProvider from './StyledComponentThemeProvider';

const InitialProviders = (props) => (
  <AppProvider>
    <StyledComponentThemeProvider>
      {props.children}
    </StyledComponentThemeProvider>
  </AppProvider>
);

InitialProviders.propTypes = {
  children: PropTypes.node,
};

export {
  AppProvider,
  AppConsumer,
  AppContext,
  InitialProviders,
};
