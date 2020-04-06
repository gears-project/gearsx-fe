import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import {
  Switch,
  Route,
  useParams,
  useRouteMatch,
} from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import ProjectTree from 'components/project/ProjectTree';
import AddDocument from 'components/document/AddDocument';
import Loading from 'components/Loading';
import Error from 'components/Error';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(1),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

const QUERY = gql`
  query getProject($id: Uuid!) {
    project(input: { projectId: $id }) {
      id
      name
      model {
        id
        name
        doctype
        domains {
          id
          name
        }
        xflows {
          id
          name
        }
      }
    }
  }
`;

function strlen(s, len=10) {
  if (s && s.length > len) {
    return `${s.slice(0, len)} [..]`;
  } else {
    return s;
  }
}

export default (props) => {
  let { projectId } = useParams();
  let match = useRouteMatch();
  const classes = useStyles();

  const { loading, error, data } = useQuery(QUERY, {
    variables: {
      id: projectId
    }
  });

  if (loading) return (
    <div>
      <Loading />
    </div>);

  if (error) return <Error />;

  const project = data.project;

  return (
    <Box width={1}  height="100%">
      <div>
        {strlen(project.name)}
      </div>
      <ProjectTree project={project} />
    </Box>
  )
}
