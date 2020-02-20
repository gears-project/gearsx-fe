import React from 'react'
import ProjectsList from 'components/project/ProjectsList';

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

const Projects = (props) => {
  const classes = useStyles();

  return (
    <div>
      <Grid container spacing={3}>
        {/* Recent */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <ProjectsList />
          </Paper>
        </Grid>
      </Grid>
      <Box pt={4}>
        Gears
      </Box>
    </div>
  );
}

export default Projects;
