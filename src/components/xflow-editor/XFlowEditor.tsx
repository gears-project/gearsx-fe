import * as React from 'react';

import createEngine, { DefaultLinkModel, DiagramModel } from '@projectstorm/react-diagrams';
import { XFlowNodeFactory } from './XFlowNodeFactory';
import { XFlowNodeModel } from './XFlowNodeModel';
import BodyWidget from './BodyWidget';
import Box from '@material-ui/core/Box';


export default (props)=> {

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

  return (
    <Box width={1} height="100%" minHeight="500px">
      <BodyWidget engine={engine} />
    </Box>
  );
}
