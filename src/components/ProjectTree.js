import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Button, Card, CardHeader, CardTitle, CardText } from 'reactstrap';
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
        <CardText>
          <ListGroup>
            {project.model.domains.map(({id, name}) => (
              <ListGroupItem className="justify-content-between">
                <Link
                  to={location => `${location.pathname}/domain/${id}`}>
                  { name }
                </Link>
              </ListGroupItem>
            ))}
          </ListGroup>
        </CardText>
      </Card>
    );
  }
}

export default ProjectTree;
