import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import EntityList from 'components/domain/EntityList';
import Loading from 'components/Loading';
import Error from 'components/Error';
import {
  useParams
} from "react-router-dom";


const QUERY = gql`
  query getDomain($id: Uuid!) {
    domain(input: { documentId: $id }) {
      id
      name
      body {
        events {
          all {
            id
          }
        }
        entities {
          id
          name
          attributes {
            id
            name
            vtype {
              __typename
              ... on string {
                default
              }
            }
          }
        }
      }
    }
  }
`;

export default ()=> {
  const { domainId } = useParams();
  const [activeTab, setActiveTab] = useState('1');

  const { loading, error, data } = useQuery(QUERY, {
    variables : {
      id : domainId,
    }
  });

  if (loading) return <Loading />;
  if (error) return <Error />;

  const { domain } = data;

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  return (
    <div>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}
          >
            Entities
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}
          >
            Relations
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              <EntityList entities={domain.body.entities} />
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col sm="12">
              <h4>Tab 2 Contents</h4>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
}

