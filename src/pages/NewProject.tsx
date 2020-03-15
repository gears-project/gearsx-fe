import React from 'react'

import { NewProjectForm, NewProjectFormData, NewProjectFormProps } from 'components/project/NewProjectForm';

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

/*
const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));
*/

export default function NewProject() {
  const history = useHistory();

  const [newProject, { data }] = useMutation(NEW_PROJECT, {
    update(cache, { data: { initNewProject } }) {
      console.log('Route', routes.project(initNewProject.id));
      history.push(routes.project(initNewProject.id));
    }
  });

  const onSubmit = async function(values: NewProjectFormData) {
    newProject({ variables: values });
  }

  return (
    <div>
      <NewProjectForm initialValues={{ name: 'New Project', description: '' }} onSubmit={onSubmit} />
    </div>
  );
}

