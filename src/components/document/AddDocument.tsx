import React from 'react'

import { NewDocumentForm, NewDocumentFormData, NewDocumentFormProps } from 'components/document/NewDocumentForm';

import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import {
  useRouteMatch,
  useHistory
} from "react-router-dom";

import routes from 'routes';

const NEW_DOMAIN = gql`
  mutation NewDomain($name: String!, $description: String, $projectId: Uuid!) {
    addDomain(doc: {
      name: $name,
      description: $description,
      projectId: $projectId,
    }) {
      id
      name
    }
  }
`;

const NEW_XFLOW = gql`
  mutation NewXFlow($name: String!, $description: String, $projectId: Uuid!) {
    addXflow(doc: {
      name: $name,
      description: $description,
      projectId: $projectId,
    }) {
      id
      name
    }
  }
`;

export default function AddDocument() {
  const history = useHistory();
  const routeMatch = useRouteMatch();

  const [newXFlow, { /* data */ }] = useMutation(NEW_XFLOW, {
    update(cache, data) {
      const addXflow = data.data.addXflow;
      const projectId = routeMatch.params.projectId;
      const newRoute = routes.xflow(projectId, addXflow.id);
      // console.log('Route', newRoute);
      history.push(newRoute);
    }
  });

  const [newDomain, { /* data */ }] = useMutation(NEW_DOMAIN, {
    update(cache, data) {
      const addDomain = data.data.addDomain;
      const projectId = routeMatch.params.projectId;
      const newRoute = routes.domain(projectId, addDomain.id);
      // console.log('Route', newRoute);
      history.push(newRoute);
    }
  });

  const onSubmit = function(values: NewDocumentFormData) {
    const doctype = values.doctype;
    console.error('onSubmit :', values);
    const projectId = routeMatch.params.projectId;

    const data = {
      name: values.name,
      description: values.description,
      projectId: projectId,
    };

    console.error('onSubmit data', data);

    switch(doctype) {
      case "xflow":
        newXFlow({ variables: data });
        break;
      case "domain":
        newDomain({ variables: data });
        break;
      default:
        console.error('Nope!');
    }
  }

  const initialValues : NewDocumentFormData = {
      name: '',
      description: '',
  };

  return (
    <div>
      <h1>Add a new document</h1>
      <NewDocumentForm initialValues={initialValues} onSubmit={onSubmit} />
    </div>
  );
}

