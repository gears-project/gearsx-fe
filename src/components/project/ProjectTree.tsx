import React, { useState } from 'react';

import { Grid } from '@material-ui/core';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

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
  const [nodeIsSelected, setNodeIsSelected] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);

	if (!props.project) {
		return <i>No project found</i>;
	}

	const project = props.project;
	const domains = project.model.domains;
	const xflows = project.model.xflows;
	// const pages = [];

	const pageLinkFn = (id) => { };
  const flowLinkFn = (id) => {
    const projectId = routeMatch.params.projectId;
    return ()=> {
      history.push(routes.xflow(projectId, id));
    }
  };

  const domainLinkFn = (id) => {
    const projectId = routeMatch.params.projectId;
    return ()=> {
      history.push(routes.domain(projectId, id));
    }
  };

  function addDocument() {
    const projectId = routeMatch.params.projectId;
    history.push(routes.add_document(projectId));
  }

  function isUuid(s) {
    const res = s.match(/-/g);
    return (res && res.length && res.length === 4);
  }

  function nodeSelected(e, value) {
    console.log('nodeSelected', value, selectedNode);
    e.preventDefault();
    if (isUuid(value)) {
      if (selectedNode === value) {
        console.log('nodeSelected 0');
        setSelectedNode(null);
        setNodeIsSelected(false);
      } else {
        setSelectedNode(value);
        setNodeIsSelected(true);
        console.log('nodeSelected 1');
      }
    } else {
        console.log('nodeSelected wtf');
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
  function deleteSelected() {
    console.error('xxx', selectedNode);
    if (selectedNode) {
      console.error('xxx', selectedNode);
      deleteDocument({ variables : {documentId: selectedNode} });
    }
  }

	return (
      <div>
        <div className={classes.buttons}>
          <IconButton aria-label="delete" disabled={!nodeIsSelected} onClick={deleteSelected} color="primary">
            <DeleteIcon />
          </IconButton>
          <IconButton color="secondary" aria-label="add a document" onClick={addDocument}>
            <AddIcon />
          </IconButton>
        </div>
        <TreeView
          className={classes.tree}
          onNodeSelect={nodeSelected}
          defaultExpanded={['1']}
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
        >
          <ProjectTreeDocumentList title="Domains" documents={domains} linkFn={domainLinkFn} />
          <ProjectTreeDocumentList title="Flows" documents={xflows} linkFn={flowLinkFn} />
        </TreeView>
      </div>
	);
}

function ProjectTreeDocumentList(props) {
  const title = props.title;
  const documents = props.documents;
  const linkFn = props.linkFn;

  return (
    <TreeItem nodeId={title} label={title}>
      {documents.map(({id, name}) => (
        <TreeItem id={id} nodeId={id} label={name} onClick={linkFn(id)} />
      ))}
    </TreeItem>
  );
}

