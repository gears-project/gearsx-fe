import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Button, Card, CardHeader, CardBody, Row, Col } from 'reactstrap';

class EntityList extends React.Component {
  state = {};

  render() {
    if (!this.props.entities) {
      return <i>No entities found</i>;
    } else {
      const entities = this.props.entities;

      if (entities.length < 1) {
        return <b>No entities, create one!</b>;
      }

      return (
        <Row>
           {entities.map(({id, name, attributes}) => (
             <Col sm="4">
               <Card body>
                 <CardHeader>
                   { name }
                   <Button close />
                 </CardHeader>
                 <CardBody>
                   <ListGroup>
                     {attributes.map(({id, name, vtype}) => (
                       <ListGroupItem className="justify-content-between" key={id}>
                         { name } ({vtype.__typename})
                         <Button close />
                       </ListGroupItem>
                     ))}
                   </ListGroup>
                 </CardBody>
               </Card>
             </Col>
           ))}
        </Row>
      );
    }
  }
}

export default EntityList;
