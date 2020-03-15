import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from "react-router-dom";

import routes from 'routes';

const NEW_PROJECT = gql`
  mutation NewProject($name: String!) {
    initNewProject(project:{
      name: $name,
    }) {
      id
      name
    }
  }
`;

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

export default function NewProject() {
  const history = useHistory();
  const classes = useStyles();

  let input;

  const [newProject, { data }] = useMutation(NEW_PROJECT, {
    update(cache, { data: { initNewProject } }) {
      console.log('Route', routes.project(initNewProject.id));
      history.push(routes.project(initNewProject.id));
    }
  });

  return (
    <div>
      <form
        className={classes.root} noValidate autoComplete="off"
        onSubmit={e => {
          e.preventDefault();
          newProject({ variables: { name: input.value } });
          input.value = '';
        }}
      >
        <TextField id="name" label="Name" variant="outlined" 
        />

        <input
          ref={node => {
            input = node;
          }}
        />
        <button type="submit">New Project</button>
      </form>
    </div>
  );
}

