import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const PROJECTS_LIST = gql`
query getProjects {
  projects(paging:{limit:3}) {
    id
    name
    model {
      id
      name
      doctype
      domains {
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
  }
}
`;

function ExchangeRates() {
  const { loading, error, data } = useQuery(PROJECTS_LIST);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.projects.map(({ id, name }) => (
    <div key={id}>
      <p>
        {id}: {name}
      </p>
    </div>
  ));
}

export default ExchangeRates;

