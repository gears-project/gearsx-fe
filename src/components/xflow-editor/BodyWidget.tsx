import * as React from 'react';
import { DiagramEngine } from '@projectstorm/react-diagrams';
import { CanvasWidget } from '@projectstorm/react-canvas-core';

import { withStyles } from '@material-ui/styles';

const styles = (theme => ({
  // diagram-container
  root: {
		padding: 0,
		background: "#333333",
		width: "100%",
		height: "100%",
		minHeight: "500px",
  },
}));

export interface BodyWidgetProps {
	engine: DiagramEngine;
  classes: any;
}

class BodyWidget extends React.Component<BodyWidgetProps> {

  constructor(props) {
    super(props);
  }

	render() {
    const { classes } = this.props;
		return <CanvasWidget className={classes.root} engine={this.props.engine} />;
	}
}

export default withStyles(styles)(BodyWidget);
