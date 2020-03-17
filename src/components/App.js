import React from 'react';
import '../styles/App.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Dashboard from 'components/Dashboard';

const darkTheme = createMuiTheme({
  palette: {
    type: 'light',
  },
});

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      message: "Greetings, Yo!"
    }
  }
  render() {
    return (
        <ThemeProvider theme={darkTheme}>
					<Dashboard />
        </ThemeProvider>
    );
  }
}

export default App;
