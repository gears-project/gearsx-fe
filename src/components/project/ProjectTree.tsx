import React, { useState } from 'react';

import { Grid } from '@material-ui/core';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

import Tree, { TreeNode } from 'rc-tree';
import 'styles/rc-tree.css';

import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import {
  useRouteMatch,
  useHistory,
} from "react-router-dom";
import routes from 'routes';

const DELETE_DOCUMENT = gql`
  mutation ($documentId: Uuid!) {
    deleteDocument(input: {
      documentId: $documentId,
    })
  }
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tree: {
      minHeight: 500,
      flexGrow: 1,
      maxWidth: 400,
    },
    buttons : {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }),
);

export default function(props) {
  const classes = useStyles();
  const history = useHistory();
  const routeMatch = useRouteMatch();
  const [selectedNode, setSelectedNode] = useState(null);

	if (!props.project) {
		return <i>No project found</i>;
	}

	const project = props.project;

	const domains = project.model.domains;
	const xflows = project.model.xflows;
  const lookup = {};
  domains.forEach(doc => {
			lookup[doc.id] = 'domain';
  });
  xflows.forEach(doc => {
			lookup[doc.id] = 'xflow';
  });

  function goToProject() {
    const projectId = routeMatch.params.projectId;
    history.push(routes.project(projectId));
  }

  function goToDoc(id) {
    const projectId = routeMatch.params.projectId;
    switch(lookup[id]) {
      case 'xflow':
        history.push(routes.xflow(projectId, id));
        break;
      case 'domain':
        history.push(routes.domain(projectId, id));
        break;
      default:
        console.error('ProjectTree : Unknown lookup type ', lookup[id]);
    }
  }

  function addDocument(e) {
    e.preventDefault();
    const projectId = routeMatch.params.projectId;
    history.push(routes.add_document(projectId));
  }

  function isUuid(s) {
    const res = s.match(/-/g);
    return (res && res.length && res.length === 4);
  }

  function onSelect(arr, e) {
    console.log('onSelect', arr, selectedNode);
    if (arr.length === 0) {
      setSelectedNode(null);
      goToProject();
    } else {
      const value = arr[0];
      if (isUuid(value)) {
        setSelectedNode(value);
        goToDoc(value);
      } else {
        console.error('ProjectTree : Invalid identifier received');
        setSelectedNode(null);
        goToProject();
      }
    }
  }

  const [deleteDocument, { /* data */ }] = useMutation(DELETE_DOCUMENT, {
    update(cache, data) {
      const deleteDocument = data.data.deleteDocument;
      const projectId = routeMatch.params.projectId;
      const newRoute = routes.project(projectId);
      // console.log('Route', newRoute);
      history.push(newRoute);
    }
  });

  function deleteSelected(e) {
    e.preventDefault();
    console.error('xxx', selectedNode);
    if (selectedNode) {
      console.error('xxx', selectedNode);
      deleteDocument({ variables : {documentId: selectedNode} });
    }
  }

	return (
      <div>
        <div className={classes.buttons}>
          <IconButton aria-label="delete" disabled={(selectedNode === null)} onClick={deleteSelected} color="primary">
            <DeleteIcon />
          </IconButton>
          <IconButton color="secondary" aria-label="add a document" onClick={addDocument}>
            <AddIcon />
          </IconButton>
        </div>

        <Tree
          className="myCls"
          showLine
          checkable={false}
          defaultExpandAll
          onSelect={onSelect}
          onActiveChange={key => console.log('Active:', key)}
        >
          { ProjectTreeDocumentList({title:"Domains", documents:domains}) }
          { ProjectTreeDocumentList({title:"Flows", documents:xflows}) }
        </Tree>
      </div>
	);
}
function ProjectTreeDocumentList(props) {
  const title = props.title;
  const documents = props.documents;
  const linkFn = props.linkFn;

  return (
    <TreeNode key={title} title={title}>
      {documents.map(({id, name}) => (
        <TreeNode key={id} title={name} />
      ))}
    </TreeNode>
  );
}

