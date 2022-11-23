import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const theme = createMuiTheme({
  palette: {
    type: 'light',
  },
  typography: {
    fontFamily: 'Courier, sans-serif',
    h1: {
      fontSize: '4rem',
    },
  },
});

interface ThemeWrapperProps {
  children: any;
}

const ThemeWrapper = ({ children }: ThemeWrapperProps) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    {children}
  </ThemeProvider>
);

export default ThemeWrapper;
