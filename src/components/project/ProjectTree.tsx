import React, { useState } from 'react';

import { Grid } from '@material-ui/core';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';

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

  function addDocument(e) {
    e.preventDefault();
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
      } else {
        setSelectedNode(value);
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
        <TreeView
          className={classes.tree}
          onNodeSelect={nodeSelected}
          defaultExpanded={[]}
          defaultCollapseIcon={<MinusSquare />}
          defaultExpandIcon={<PlusSquare />}
          defaultEndIcon={<CloseSquare />}
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

function MinusSquare(props: SvgIconProps) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
    </SvgIcon>
  );
}

function PlusSquare(props: SvgIconProps) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
    </SvgIcon>
  );
}

function CloseSquare(props: SvgIconProps) {
  return (
    <SvgIcon className="close" fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
    </SvgIcon>
  );
}

