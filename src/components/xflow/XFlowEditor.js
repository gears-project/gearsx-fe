import React, { Component } from 'react';
import styles from 'styles/digraph.scss';

import {
  GraphView, // required
  // Edge, // optional
  // Node, // optional
  // BwdlTransformer, // optional, Example JSON transformer
  // GraphUtils // optional, useful utility functions
} from 'react-digraph';

const GraphConfig =  {
  NodeTypes: {
    empty: { // required to show empty nodes
      typeText: "None",
      shapeId: "#empty", // relates to the type property of a node
      shape: (
        <symbol viewBox="0 0 100 100" id="empty" key="0">
          <circle cx="50" cy="50" r="45"></circle>
        </symbol>
      )
    },
    flowStart: { // required to show empty nodes
      typeText: "Start",
      shapeId: "#flowStart", // relates to the type property of a node
      shape: (
        <symbol viewBox="0 0 100 100" id="flowStart" key="0">
          <circle cx="50" cy="50" r="45" fill="lightgreen"></circle>
        </symbol>
      )
    },
    flowBranch: { // required to show empty nodes
      typeText: "Start",
      shapeId: "#flowStart", // relates to the type property of a node
      shape: (
        <symbol viewBox="0 0 100 100" id="flowStart" width="100" height="100">
          <rect transform="translate(50, 5) rotate(45)" width="65" height="65" />
        </symbol>
      )
    },
    flowEnd: { // required to show empty nodes
      typeText: "End",
      shapeId: "#flowEnd", // relates to the type property of a node
      shape: (
        <symbol viewBox="0 0 100 100" id="flowEnd" width="100" height="100">
          <rect
            fill="pink"
            width="80"
            height="80"
            rx="15"
            ry="15"
            transform="translate(10, 10)"
          />
        </symbol>
      )
    },
    custom: { // required to show empty nodes
      typeText: "Custom",
      shapeId: "#custom", // relates to the type property of a node
      shape: (
        <symbol viewBox="0 0 50 25" id="custom" key="0">
          <ellipse cx="50" cy="25" rx="50" ry="25"></ellipse>
        </symbol>
      )
    }
  },
  NodeSubtypes: {},
  EdgeTypes: {
    emptyEdge: {  // required to show empty edges
      shapeId: "#emptyEdge",
      shape: (
        <symbol viewBox="0 0 50 50" id="emptyEdge" key="0">
          <circle cx="25" cy="25" r="8" fill="currentColor"> </circle>
        </symbol>
      )
    }
  }
}

const NODE_KEY = "id"       // Allows D3 to correctly update DOM

const sample = {
  "nodes": [
    {
      "id": 1,
      "title": "Node A",
      "x": 258.3976135253906,
      "y": 331.9783248901367,
      "type": "empty"
    },
    {
      "id": 2,
      "title": "Node B",
      "x": 593.9393920898438,
      "y": 260.6060791015625,
      "type": "empty"
    },
    {
      "id": 3,
      "title": "Node C",
      "x": 237.5757598876953,
      "y": 61.81818389892578,
      "type": "custom"
    },
    {
      "id": 4,
      "title": "Node C",
      "x": 600.5757598876953,
      "y": 600.81818389892578,
      "type": "custom"
    }
  ],
  "edges": [
    {
      "source": 1,
      "target": 2,
      "type": "emptyEdge"
    },
    {
      "source": 2,
      "target": 4,
      "type": "emptyEdge"
    }
  ]
};

function nodeFlowType(s) {
  switch(s) {
    case "start":
      return "flowStart";
    case "end":
      return "flowEnd";
    default:
      return "empty";
  }
}

function toNode(node) {
  return {
    id: node.id,
    x: node.position.x * 5,
    y: node.position.y,
    title: node.label,
    type: nodeFlowType(node.action),
  }
}

function toEdge(edge) {
  return {
    source: edge.source,
    target: edge.target,
    type: "custom",
  }
}

class Graph extends Component {

  constructor(props) {
    super(props);

    console.error('xxxxxx', props);

    this.state = {
      xflow: props.xflow,
      selected: {}
    }
  }

  /* Define custom graph editing methods here */

  render() {
    // XXX Transform
    const nodes = this.state.xflow.body.nodes.map(toNode);
    const edges = this.state.xflow.body.edges.map(toEdge);

    const selected = this.state.selected;

    const NodeTypes = GraphConfig.NodeTypes;
    const NodeSubtypes = GraphConfig.NodeSubtypes;
    const EdgeTypes = GraphConfig.EdgeTypes;

    const st = {
      height: "100%",
      "min-height": "500px",
      width: "100%",
      margin: 0,
      display: "flex",
      "box-shadow": "none",
      transition: "opacity 0.167s",
      opacity: 1,
      outline: "none",
      "user-select": "none",
    };

    return (
      <div style={ st }>
        <div id='graph' style={styles.graph}>

          <GraphView  ref='GraphView'
            nodeKey={NODE_KEY}
            nodes={nodes}
            edges={edges}
            selected={selected}
            nodeTypes={NodeTypes}
            nodeSubtypes={NodeSubtypes}
            edgeTypes={EdgeTypes}
            onSelectNode={this.onSelectNode}
            onCreateNode={this.onCreateNode}
            onUpdateNode={this.onUpdateNode}
            onDeleteNode={this.onDeleteNode}
            onSelectEdge={this.onSelectEdge}
            onCreateEdge={this.onCreateEdge}
            onSwapEdge={this.onSwapEdge}
            onDeleteEdge={this.onDeleteEdge}
          />
        </div>
      </div>
    );
  }

  onSelectNode() {
    console.log('x');
  }

  onCreateNode() {
    console.log('x');
  }

  onUpdateNode() {
    console.log('x');
  }

  onDeleteNode() {
    console.log('x');
  }

  onSelectEdge() {
    console.log('x');
  }

  onCreateEdge() {
    console.log('x');
  }

  onSwapEdge() {
    console.log('x');
  }

  onDeleteEdge() {
    console.log('x');
  }





}

export default Graph;

