import React from 'react';

import MaterialTable from "material-table";

import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

import { useConfirm } from 'material-ui-confirm';

import Loading from 'components/Loading';
import Error from 'components/Error';

import {
  useRouteMatch,
  useHistory,
} from "react-router-dom";

import routes from 'routes';

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
  },
  {
    title: "Language",
    field: "lang",
  },
];

const DELETE_FN = gql`
  mutation ($fnId: Uuid!) {
    deleteFn(input: {
      fnId: $fnId,
    })
  }
`;

const UPDATE_FN = gql`
  mutation ($id: Uuid!, $name: String!, $description: String) {
    updateFn(input: {
      id: $id,
      name: $name,
      description: $description
    }) {
      id,
      name,
      description
    }
  }
`;

const ADD_FN = gql`
  mutation ($projectId: Uuid!, $fngroupId: Uuid!) {
    fngroupAddFn(
    doc: {
      projectId: $projectId,
      documentId: $fngroupId,
    },
    input: {
      name: "New function yo!"
    }) {
      id
  }
}`;

export default (props)=> {

  const confirmDialog = useConfirm();
  const history = useHistory();
  const routeMatch = useRouteMatch();

  const [deleteFn, { /* data */ }] = useMutation(DELETE_FN, {
    update(cache, data) {
      const newRoute = routes.fns();
      history.push(newRoute);
    }
  });

  const [updateFn, { /* data */ }] = useMutation(UPDATE_FN, {
    update(cache, data) {
      console.log('xxx', data);
    }
  });

  const [addFn, { /* data */ }] = useMutation(ADD_FN, {
    update(cache, data) {
      console.log('xxx', data);
    }
  });

  const fns = props.fns;

  function onRowClick(event, rowData) {
    const fnId = rowData.id;
    history.push(routes.fn(fnId));
  }

  function onAddClick(event) {
    const projectId = routeMatch.params.projectId;
    const fngroupId = routeMatch.params.fngroupId;
    addFn({
      variables: {
        projectId: projectId,
        fnGroupId: fngroupId,
      }
    }).then((data)=> {
      console.log(data);
      history.push(routes.fngroup_new_fn(projectId, fngroupId, 1));
    });
  }

  function onDeleteClick(event, rowData) {
    const fnId = rowData.id;
		confirmDialog({ description: "Are you sure?" })
			.then(()=> {
				deleteFn({ variables : {fnId: fnId} });
			});
  }

  function onRowUpdate(newData, oldData) {
    return new Promise((resolve, reject) => {
      updateFn({ variables : {
          id: newData.id,
          name: newData.name || oldData.name,
          description: newData.description || oldData.description,
        }
      }).then(()=> {
        const index = fns.indexOf(oldData);
        fns[index] = newData;
        resolve();
      });
    });
  }

  return (
    <React.Fragment>
      <div style={{ maxWidth: "100%" }}>
        <MaterialTable
          columns={columns}
          data={fns}
          title="Functions in group"
          actions={[
            {
              icon: 'arrow_upward',
              tooltip: 'Go to fn',
              onClick: onRowClick,
            },
            {
              icon: 'delete',
              tooltip: 'Delete fn',
              onClick: onDeleteClick,
            },
            {
              icon: 'add',
              tooltip: 'Add Fn',
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


