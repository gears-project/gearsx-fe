import React from 'react';
import '../styles/App.css';
import { Nav, NavItem, NavLink as Link } from 'reactstrap';
import Home from '../pages/Home';
import Projects from '../pages/Projects';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      message: "Greetings, Yo!"
    }
  }
  render() {
    return (
      <Router>
        <div className="App">
          <Nav>
            <NavItem>
              <Link href="/home">Home</Link>
            </NavItem>
            <NavItem>
              <Link href="/projects">Projects</Link>
            </NavItem>
            <NavItem>
              <Link disabled href="#">Disabled Link</Link>
            </NavItem>
          </Nav>
        </div>
        <Switch>
          <Route path="/home">
            <Home message={ this.state.message } />
          </Route>
          <Route path="/projects">
            <Projects />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
