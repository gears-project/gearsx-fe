import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import Typography from '@material-ui/core/Typography';

import {
  useParams,
  useRouteMatch,
} from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import ProjectTree from 'components/project/ProjectTree';
import Loading from 'components/Loading';
import Error from 'components/Error';

import { PROJECT_TREE } from 'gears-queries';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(1),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

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

  const { loading, error, data } = useQuery(PROJECT_TREE, {
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
        <Typography component="h1" variant="h6" color="inherit">
          {strlen(project.name)}
        </Typography>
      </div>
      <ProjectTree project={project} />
    </Box>
  )
}
