import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Button, Card, CardHeader, CardTitle, CardText, Row, Col } from 'reactstrap';

class EntityList extends React.Component {
  state = {};

  render() {
    if (!this.props.entities) {
      return <i>No entities found</i>;
    } else {
      const entities = this.props.entities;

      return (
        <Row>
           {entities.map(({id, name, attributes}) => (
             <Col sm="4">
               <Card body>
                 <CardHeader>
                   { name }
                   <Button close />
                 </CardHeader>
                 <CardText>
                   <ListGroup>
                     {attributes.map(({id, name, vtype}) => (
                       <ListGroupItem className="justify-content-between">
                         { name } ({vtype.__typename})
                         <Button close />
                       </ListGroupItem>
                     ))}
                   </ListGroup>
                 </CardText>
               </Card>
             </Col>
           ))}
        </Row>
      );
    }
  }
}

export default EntityList;
