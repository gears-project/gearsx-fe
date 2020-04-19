import React, { useState } from 'react';

import createEngine, { DefaultLinkModel, DiagramModel } from '@projectstorm/react-diagrams';
import { XFlowNodeFactory } from './XFlowNodeFactory';
import { XFlowNodeModel } from './XFlowNodeModel';
import BodyWidget from './BodyWidget';
import Box from '@material-ui/core/Box';

import IconButton from '@material-ui/core/IconButton';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
  }),
);

export default (props)=> {

  const classes = useStyles();
  const [isFullScreen, setFullScreen] = useState(false);

  const nodes = props.xflow.body.nodes;
  const edges = props.xflow.body.edges;

  const engine = createEngine();
  engine.getNodeFactories().registerFactory(new XFlowNodeFactory());

  const model = new DiagramModel();

  const nodeMap = {};

  nodes.forEach(el=> {
    const node = new XFlowNodeModel({ color: 'rgb(192,255,0)' });
    node.setPosition(el.position.x + 100, el.position.y + 100);
    nodeMap[el.id] = node;
    model.addNode(node);
  });

  edges.forEach(el=> {
    const link = new DefaultLinkModel();
    link.setSourcePort(nodeMap[el.source].getPort('out'));
    link.setTargetPort(nodeMap[el.target].getPort('in'));
    model.addLink(link);
  });

  engine.setModel(model);
  const containerId = `fullscreen-${+new Date()}`;

  function toggleFullscreen(e) {
    console.log('xxx', e);
    // setFullScreen(!isFullScreen);
    if (!document.fullscreen) {
      const containerDiv = document.querySelector(`div#${containerId}`) as HTMLDivElement;
      containerDiv.requestFullscreen();
    } else {
      if (document.fullscreen) {
        document.exitFullscreen();
      }
    }
  }

  return (
    <div>
			<IconButton aria-label="delete" className={classes.margin} onClick={toggleFullscreen}>
				<ArrowDownwardIcon fontSize="small" />
			</IconButton>
      <div id={containerId}>
        <Box width={1} height="100%" minHeight="500px">
          <BodyWidget engine={engine} />
        </Box>
      </div>
    </div>
  );
}
