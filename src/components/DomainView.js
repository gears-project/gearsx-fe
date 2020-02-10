import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Card, Button, CardHeader, CardText } from 'reactstrap';
import EntityList from '../components/domain/EntityList';
import {
  useParams
} from "react-router-dom";

function getDomainQuery(id) {

  return gql`
  {
    domain(input: { id: "${id}" }) {
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
  } `;
}

export default ()=> {
  const { id } = useParams();
  const { loading, error, data } = useQuery(getDomainQuery(id));

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { domain } = data;

  return (
    <div>
      <Card body>
        <CardHeader>{domain.name}</CardHeader>
        <CardText>
          <EntityList entities={domain.body.entities} />
        </CardText>
        <Button>Go somewhere</Button>
      </Card>
    </div>
  );
}

