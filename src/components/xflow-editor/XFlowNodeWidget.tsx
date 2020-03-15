import * as React from 'react';
import { withStyles } from '@material-ui/styles';

import { DiagramEngine, PortWidget } from '@projectstorm/react-diagrams-core';
import { XFlowNodeModel } from './XFlowNodeModel';

export interface XFlowNodeWidgetProps {
	node: XFlowNodeModel;
	engine: DiagramEngine;
  classes: any;
}

export interface XFlowNodeWidgetState {}

const styles = (theme => ({
  xflowNode: {
    "border": "solid 2px gray",
    "borderRadius": "5px",
    "width": "50px",
    "height": "50px",
    "display": "flex",
    "alignItems": "flex-start",
    "justifyContent": "space-between",
    // "position": "relative",
  },
  xflowNodeColor: {
    // "position": "absolute",
    "top": "50%",
    "left": "50%",
    "width": "20px",
    "height": "20px",
    "transform": "translate(-50%, -50%)",
    "borderRadius": "10px"
  },

  "circlePort": {
    "width": "12px",
    "height": "12px",
    "margin": "2px",
    "borderRadius": "4px",
    "background": "darkgray",
    "cursor": "pointer"
  }
}));
/*


  // .circle-port:hover{
  //   background: mediumpurple;
  // }
*/
export class XFlowNodeWidget extends React.Component<XFlowNodeWidgetProps, XFlowNodeWidgetState> {
	constructor(props: XFlowNodeWidgetProps) {
		super(props);
		this.state = {};
	}

	render() {
    const { classes } = this.props;
		return (
			<div className={ classes.xflowNode}>
				<PortWidget engine={this.props.engine} port={this.props.node.getPort('in')}>
					<div className={ classes.circlePort } />
				</PortWidget>
				<PortWidget engine={this.props.engine} port={this.props.node.getPort('out')}>
					<div className={ classes.circlePort } />
				</PortWidget>
				<div className={ classes.xflowNodeColor } style={{ backgroundColor: this.props.node.color }} />
			</div>
		);
	}
}


export default withStyles(styles)(XFlowNodeWidget);
