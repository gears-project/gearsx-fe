import React from 'react';
import CheckboxTree from 'react-checkbox-tree';

class ProjectTree extends React.Component {
  state = {
    checked: [],
    expanded: [],
    disabled: false,
  };

  render() {
    if (!this.props.project) {
      return <i>No project found</i>;
    }

    const project = this.props.project;
    const nodes = [
      {
        value: 'data',
        label: 'Data',
        children : project.model.domains.map(({id, name})=> {
          return {
            value: `${project.id}/${id}`,
            label: name,
          };
        }),
      },
      {
        value: 'presentation',
        label: 'Presentation',
        children: [
          { value: 'presentation-doc-1', label: 'Form 1' },
        ],
      }
    ];

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
