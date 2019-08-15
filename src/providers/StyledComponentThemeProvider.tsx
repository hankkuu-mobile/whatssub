import React, { useContext } from 'react';

import { AppContext } from './AppProvider';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import { createTheme } from '../theme';

const StyledComponentThemeProvider = (props) => {
  const { state } = useContext(AppContext);
  return (
    <ThemeProvider theme={createTheme(state.theme)}>
      {props.children}
    </ThemeProvider>
  );
};

StyledComponentThemeProvider.propTypes = {
  children: PropTypes.node,
};

export default StyledComponentThemeProvider;
