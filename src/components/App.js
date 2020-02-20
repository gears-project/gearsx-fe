import React from 'react';
import '../styles/App.css';
import Dashboard from 'components/Dashboard';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      message: "Greetings, Yo!"
    }
  }
  render() {
    return (
        <Dashboard />
    );
  }
}

export default App;
