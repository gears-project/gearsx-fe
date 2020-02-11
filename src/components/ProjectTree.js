import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Button, Card, CardHeader, CardTitle, CardBody } from 'reactstrap';
import {
  Link
} from "react-router-dom";

class ProjectTree extends React.Component {
  state = { };

  render() {
    if (!this.props.project) {
      return <i>No project found</i>;
    }

    const project = this.props.project;
    return (
      <Card body>
        <CardHeader>
          Domains
        </CardHeader>
        <CardBody>
          <ListGroup>
            {project.model.domains.map(({id, name}) => (
              <ListGroupItem className="justify-content-between">
                <Link
                  to={location => {
                    // XXX : Use Route.match
                    const path = location.pathname.replace(/\/+domain\/.*/, '');
                    return `${path}/domain/${id}`
                  }}>
                  { name }
                </Link>
              </ListGroupItem>
            ))}
          </ListGroup>
        </CardBody>
      </Card>
    );
  }
}

export default ProjectTree;
