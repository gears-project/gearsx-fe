import React, { useState } from 'react';
import { Collapse, Button, CardHeader, CardBody, Card } from 'reactstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';
// import { Link } from "react-router-dom";

export default (props) => {

  const title = props.title;
  const documents = props.documents;
  const linkFn = props.linkFn;

  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <div>
        <b>
          { title }
          <Button close onClick={toggle} />
        </b>
        <Collapse isOpen={isOpen}>
          <ListGroup>
            {documents.map(({id, name}) => (
              <ListGroupItem className="justify-content-between">
                <Link to={ linkFn(id) } >
                  { name }
                </Link>
                <Button close />
              </ListGroupItem>
            ))}
          </ListGroup>
        </Collapse>
      </div>
    </div>
  );
}

