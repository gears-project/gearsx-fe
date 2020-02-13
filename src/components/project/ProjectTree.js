import React from 'react';
import ProjectTreeDocumentList from 'components/project/ProjectTreeDocumentList';

class ProjectTree extends React.Component {
  state = { };

  render() {
    if (!this.props.project) {
      return <i>No project found</i>;
    }

    const project = this.props.project;
    const domains = project.model.domains;
    const pages = [];
    const flows = [];
    const domainLinkFn = (id) => {
      return (location) => {
        // XXX : Use Route.match
        const path = location.pathname.replace(/\/+domain\/.*/, '');
        return `${path}/domain/${id}`
      };
    };
    const pageLinkFn = (id) => { }
    const flowLinkFn = (id) => { }

    return (
      <div>

        <ProjectTreeDocumentList title="Domains" documents={domains} linkFn={domainLinkFn} />
        <ProjectTreeDocumentList title="Pages" documents={pages} linkFn={pageLinkFn} />
        <ProjectTreeDocumentList title="Flows" documents={flows} linkFn={flowLinkFn} />

      </div>
    );
  }
}

export default ProjectTree;
