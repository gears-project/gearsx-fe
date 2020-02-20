import React from 'react';

import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from 'components/Title';

import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

// import { Link } from "react-router-dom";

import Loading from 'components/Loading';
import Error from 'components/Error';

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


function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));
/*
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
*/

export default ()=> {

	const classes = useStyles();
  const { loading, error, data } = useQuery(PROJECTS_LIST);

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <React.Fragment>
      <Title>Projects</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.projects.map(({id, name}) => (
            <TableRow key={id}>
              <TableCell>{id}</TableCell>
              <TableCell>{name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more
        </Link>
      </div>
    </React.Fragment>
  );
}

