import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Card, Button, CardHeader, CardBody } from 'reactstrap';
import EntityList from '../components/domain/EntityList';
import Loading from './Loading';
import {
  useParams
} from "react-router-dom";

function getDomainQuery(id) {

  return gql`{
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
  }`;
}

export default ()=> {
  const { domainId } = useParams();
  const { loading, error, data } = useQuery(getDomainQuery(domainId));

  if (loading) return <Loading />;
  if (error) return <p>Error :(</p>;

  const { domain } = data;

  return (
    <div>
      <Card body>
        <CardHeader>{domain.name}</CardHeader>
        <CardBody>
          <EntityList entities={domain.body.entities} />
        </CardBody>
        <Button>Go somewhere</Button>
      </Card>
    </div>
  );
}

