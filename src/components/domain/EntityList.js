import React from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function EntityList(props) {

  const classes = useStyles();

  if (!props.entities) {
    return <i>No entities found</i>;
  } else {
    const entities = props.entities;

    if (entities.length < 1) {
      return <b>No entities, create one!</b>;
    }

    return (
      <Grid container spacing={3}>
        {entities.map(({id, name, attributes}) => (
          <Grid item xs={3}>
            <Paper className={classes.paper}>
              <div className={classes.root}>

                <List component="nav" aria-label="main mailbox folders">
                  {attributes.map(({id, name, vtype}) => (
                    <ListItem button>
                      <ListItemText primary={ name }>
                        { name } ({vtype.__typename})
                      </ListItemText>
                    </ListItem>
                  ))}
                </List>
              </div>
            </Paper>
          </Grid>
        ))}
      </Grid>
    );
  }
}

