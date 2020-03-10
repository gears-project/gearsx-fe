import React from 'react';

// import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from 'components/Title';

import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import { Link } from "react-router-dom";

import Loading from 'components/Loading';
import Error from 'components/Error';

import { format } from 'date-fns'

function formatDate(d) {
  return format(d * 1000, 'yyyy-MM-dd');
}

const PROJECTS_LIST = gql`
query getProjects {
  projects(paging:{limit:20}) {
    id
    name
    createdAt
    updatedAt
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
            <TableCell>Updated</TableCell>
            <TableCell>Created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.projects.map(({id, name, createdAt, updatedAt}) => (
            <TableRow key={id}>
              <TableCell>
                <Link to={{
                  pathname: `/project/${id}`
                }}>
                  {id}
                </Link>
              </TableCell>
              <TableCell>{name}</TableCell>
              <TableCell>{formatDate(createdAt)}</TableCell>
              <TableCell>{formatDate(updatedAt)}</TableCell>
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

