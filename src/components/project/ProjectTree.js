import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import {
  useRouteMatch,
  useHistory,
} from "react-router-dom";
import routes from 'routes';

const useStyles = makeStyles({
  root: {
    height: 240,
    flexGrow: 1,
    maxWidth: 400,
  },
});

export default function(props) {
  const classes = useStyles();
  const history = useHistory();
  const routeMatch = useRouteMatch();

	if (!props.project) {
		return <i>No project found</i>;
	}

	const project = props.project;
	const domains = project.model.domains;
	const xflows = project.model.xflows;
	const pages = [];

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

	return (
    <TreeView
      className={classes.root}
      defaultExpanded={['1']}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      <TreeItem nodeId="0" label="Model">
				<ProjectTreeDocumentList title="Domains" documents={domains} linkFn={domainLinkFn} />
				<ProjectTreeDocumentList title="Pages" documents={pages} linkFn={pageLinkFn} />
				<ProjectTreeDocumentList title="Flows" documents={xflows} linkFn={flowLinkFn} />
      </TreeItem>
		</TreeView>
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

