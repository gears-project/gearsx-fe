export default {
  new_project() {
    return '/project/new';
  },
  projects() {
    return `/projects/`;
  },
  project(id) {
    return `/project/${id}`;
  },
  add_document(projectId) {
    return `/project/${projectId}/add`;
  },
  xflow(projectId, id) {
    return `/project/${projectId}/xflow/${id}`;
  },
  domain(projectId, id) {
    return `/project/${projectId}/domain/${id}`;
  },
  fngroup(projectId, id) {
    return `/project/${projectId}/fngroup/${id}`;
  },
}
