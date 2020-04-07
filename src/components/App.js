import React from 'react';
import '../styles/App.css';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Dashboard from 'components/Dashboard';
import { ConfirmProvider } from 'material-ui-confirm';

export default function() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(() =>
    createMuiTheme({
      palette: {
        type: prefersDarkMode ? 'dark' : 'light',
      },
    }),
    [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <ConfirmProvider>
        <Dashboard />
      </ConfirmProvider>
    </ThemeProvider>
  );
}
