import React from 'react';
import '../styles/App.css';
import { Nav, NavItem, NavLink} from 'reactstrap';
import Home from '../pages/Home';
import Projects from '../pages/Projects';
import ProjectView from '../pages/ProjectView';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
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
              <NavLink tag={Link} to="/home">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/projects">Projects</NavLink>
            </NavItem>
            <NavItem>
              <NavLink disabled href="#">Disabled Link</NavLink>
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
          <Route path="/project/:projectId">
            <ProjectView />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
