import React from 'react';

import MaterialTable from "material-table";

import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

import Loading from 'components/Loading';
import Error from 'components/Error';

import {
  useHistory,
} from "react-router-dom";

import routes from 'routes';

import { format } from 'date-fns'

function formatDate(d) {
  return format(d * 1000, 'yyyy-MM-dd');
}

function capString(s) {
  if (s.length > 20) {
    return `${s.substring(0, 20)} ...`;
  } else {
    return s;
  }
}

const columns = [
  { title: "Name", field: "name" },
  { title: "Description", field: "description", render: rowData=> capString(rowData.description) },
  { title: "Created", field: "createdAt", render: rowData=> formatDate(rowData.createdAt) },
  { title: "Updated", field: "updatedAt", render: rowData=> formatDate(rowData.createdAt) },
];

const PROJECTS_LIST = gql`
query getProjects {
  projects(paging:{limit:20}) {
    id
    name
    description
    createdAt
    updatedAt
    model {
      id
      name
      doctype
      domains {
        id
        name
        body {
          events {
            all {
              id
            }
          }
          entities {
            id
            name
            attributes {
              id
              name
              vtype {
                __typename
                ... on string {
                  default
                }
              }
            }
          }
        }
      }
    }
  }
}
`;

const DELETE_PROJECT = gql`
  mutation ($projectId: Uuid!) {
    deleteProject(input: {
      projectId: $projectId,
    })
  }
`;

export default ()=> {

  const history = useHistory();
  const [deleteProject, { /* data */ }] = useMutation(DELETE_PROJECT, {
    update(cache, data) {
      const newRoute = routes.projects();
      history.push(newRoute);
    }
  });

  const { loading, error, data } = useQuery(PROJECTS_LIST);

  if (loading) return <Loading />;
  if (error) return <Error />;

  function onRowClick(event, rowData) {
    const projectId = rowData.id;
    history.push(routes.project(projectId));
  }

  function onAddClick(event) {
    history.push(routes.new_project());
  }

  function onDeleteClick(event, rowData) {
    const projectId = rowData.id;
    deleteProject({ variables : {projectId: projectId} });
  }

  return (
    <React.Fragment>
      <div style={{ maxWidth: "100%" }}>
        <MaterialTable
          columns={columns}
          data={data.projects}
          onClick={onRowClick}
          title="Projects"
          actions={[
            {
              icon: 'save',
              tooltip: 'Go to project',
              onClick: onRowClick,
            },
            {
              icon: 'delete',
              tooltip: 'Delete project',
              onClick: onDeleteClick,
            },
            {
              icon: 'add',
              tooltip: 'Add Project',
              isFreeAction: true,
              onClick: onAddClick,
            }
          ]}
        />
      </div>
    </React.Fragment>
  );
}

