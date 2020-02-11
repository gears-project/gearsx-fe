import React from 'react';
import { Table } from 'reactstrap';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import { Link } from "react-router-dom";

import Loading from './Loading';
import Error from './Error';

const PROJECTS_LIST = gql`
query getProjects {
  projects(paging:{limit:20}) {
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

export default ()=> {
  const { loading, error, data } = useQuery(PROJECTS_LIST);

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <div className="container-fluid">
      <div className="row">
        <main role="main">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
            <h1 className="h2">Projects</h1>
          </div>

          <Table>
            <thead>
              <tr>
                <th width="20%">#</th>
                <th>Name</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.projects.map(({id, name}) => (
                <tr>
                  <th scope="row">
                    <Link to={{
                      pathname: `/project/${id}`
                    }}>
                      <pre>{ id }</pre>
                    </Link>
                  </th>
                  <td>{ name }</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </main>
      </div>
    </div>
  );
}

