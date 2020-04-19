import React from 'react';

import MaterialTable from "material-table";

import { useQuery } from '@apollo/react-hooks';
import { useMutation } from '@apollo/react-hooks';

import { useConfirm } from 'material-ui-confirm';

import Loading from 'components/Loading';
import Error from 'components/Error';

import { useHistory, } from "react-router-dom";

import routes from 'routes';
import { PROJECTS_LIST, DELETE_PROJECT, UPDATE_PROJECT } from 'gears-queries';

import { format } from 'date-fns'

function formatDate(d) {
  return format(d * 1000, 'yyyy-MM-dd HH:mm');
}

function capString(s) {
  if (s.length > 20) {
    return `${s.substring(0, 20)} ...`;
  } else {
    return s;
  }
}

const numericStyle = {
  textAlign: 'right',
}

const columns = [
  {
    title: "Name",
    field: "name",
    editable: 'onUpdate',
  },
  {
    title: "Description",
    field: "description",
    editable: 'onUpdate',
    render: rowData=> capString(rowData.description),
  },
  {
    title: "Created",
    field: "createdAt",
    editable: 'never',
    render: rowData=> formatDate(rowData.createdAt),
    headerStyle: numericStyle,
    cellStyle: numericStyle,
  },
  {
    title: "Updated",
    field: "updatedAt",
    editable: 'never',
    render: rowData=> formatDate(rowData.createdAt),
    headerStyle: numericStyle,
    cellStyle: numericStyle,
  },
];

export default ()=> {

  const confirmDialog = useConfirm();
  const history = useHistory();
  const [deleteProject, { /* data */ }] = useMutation(DELETE_PROJECT, {
    update(cache, data) {
      const newRoute = routes.projects();
      history.push(newRoute);
    }
  });

  const [updateProject, { /* data */ }] = useMutation(UPDATE_PROJECT, {
    update(cache, data) {
      console.log('xxx', data);
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
		confirmDialog({ description: "Are you sure?" })
			.then(()=> {
				deleteProject({ variables : {projectId: projectId} });
			});
  }

  function onRowUpdate(newData, oldData) {
    return new Promise((resolve, reject) => {
      updateProject({ variables : {
          id: newData.id,
          name: newData.name || oldData.name,
          description: newData.description || oldData.description,
        }
      }).then(()=> {
        const projects = data.projects
        const index = projects.indexOf(oldData);
        data[index] = newData;
        // this.setState({ data }, () => resolve()); */
        resolve();
      });
    });
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
              icon: 'arrow_upward',
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
          options={{
            headerStyle: {
              backgroundColor: '#3f51b5',
              color: '#fff'
            }
					}}
          editable={{
            onRowUpdate: onRowUpdate,
          }}
        />
      </div>
    </React.Fragment>
  );
}

