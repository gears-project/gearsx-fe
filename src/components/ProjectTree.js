import React from 'react';
import CheckboxTree from 'react-checkbox-tree';

const nodes = [
  {
    value: 'data',
    label: 'Data',
    children: [
      { value: 'data-doc-1', label: 'Domain 1' },
    ],
  },
  {
    value: 'presentation',
    label: 'Presentation',
    children: [
      { value: 'presentation-doc-1', label: 'Form 1' },
    ],
  }
];

class ProjectTree extends React.Component {
  state = {
    checked: [],
    expanded: [],
    disabled: false,
  };

  render() {
    return (
      <CheckboxTree
        showExpandAll={true}
        disabled={this.state.disabled}
        nodes={nodes}
        checked={this.state.checked}
        expanded={this.state.expanded}
        onCheck={checked => this.setState({ checked })}
        onExpand={expanded => this.setState({ expanded })}
      />
    );
  }
}

export default ProjectTree;
