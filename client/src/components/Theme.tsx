import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

interface ThemeWrapperProps {
  children: any;
}

const ThemeWrapper = ({ children }: ThemeWrapperProps) => (
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
);

export default ThemeWrapper;
