import React from 'react'
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

export default function NewProject() {
  const history = useHistory();

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
        onSubmit={e => {
          e.preventDefault();
          newProject({ variables: { name: input.value } });
          input.value = '';
        }}
      >
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

