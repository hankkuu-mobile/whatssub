import React, { useContext, useState } from 'react';

import { AppContext } from './AppProvider';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import { createTheme } from '../theme';

const StyledComponentThemeProvider = (props) => {
  const { state } = useContext(AppContext);
  const [debug, setDebug] = useState(false);
  return (
    <ThemeProvider theme={{ ...createTheme(state.theme), debug, setDebug }}>
      {props.children}
    </ThemeProvider>
  );
};

StyledComponentThemeProvider.propTypes = {
  children: PropTypes.node,
};

export default StyledComponentThemeProvider;
