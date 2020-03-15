import * as React from 'react';
import { XFlowNodeModel } from './XFlowNodeModel';
import XFlowNodeWidget from './XFlowNodeWidget';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';

export class XFlowNodeFactory extends AbstractReactFactory<XFlowNodeModel, DiagramEngine> {
	constructor() {
		super('xflow-node');
	}

	generateModel(initialConfig) {
		return new XFlowNodeModel();
	}

	generateReactWidget(event): JSX.Element {
		return <XFlowNodeWidget engine={this.engine as DiagramEngine} node={event.model} />;
	}
}


