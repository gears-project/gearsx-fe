import React from 'react'

import {
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import AddDocument from 'components/document/AddDocument';
import DomainView from 'components/domain/DomainView';
import XFlowView from 'components/xflow/XFlowView';
import FngroupView from 'components/fngroup/FngroupView';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(1),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

export default (props) => {
  let match = useRouteMatch();
  const classes = useStyles();

  return (
    <Box width={1}  height="100%">
      <Grid container spacing={2}>

        <Grid item sm={12}>
          <Paper className={classes.paper}>
              <Switch>
                <Route path={`${match.path}/add`}>
                  <AddDocument />
                </Route>
                <Route path={`${match.path}/domain/:domainId`}>
                  <DomainView />
                </Route>
                <Route path={`${match.path}/xflow/:xflowId`}>
                  <XFlowView />
                </Route>
                <Route path={`${match.path}/fngroup/:fngroupId`}>
                  <FngroupView />
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
