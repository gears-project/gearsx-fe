import React from 'react'
import ProjectTree from 'components/project/ProjectTree';
import DomainView from 'components/domain/DomainView';
import XFlowView from 'components/xflow/XFlowView';
import Loading from 'components/Loading';
import Error from 'components/Error';
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
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
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

export default (props) => {
  let { projectId } = useParams();
  let match = useRouteMatch();
  const classes = useStyles();

  const { loading, error, data } = useQuery(QUERY, {
    variables: {
      id: projectId
    }
  });

  if (loading) return <Loading />;
  if (error) return <Error />;

  const project = data.project;

  return (
    <Box width={1}>
      <Grid container spacing={3}>
        {/* Recent */}
        <Grid sm={3}>
          <Paper className={classes.paper}>
            <ProjectTree project={project} />
          </Paper>
        </Grid>
        <Grid item sm={9}>
          <Paper className={classes.paper}>
              <Switch>
                <Route path={`${match.path}/domain/:domainId`}>
                  <DomainView />
                </Route>
                <Route path={`${match.path}/xflow/:xflowId`}>
                  <XFlowView />
                </Route>
                <Route path={match.path}>
                  <h3>Please select a document</h3>
                </Route>
              </Switch>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
