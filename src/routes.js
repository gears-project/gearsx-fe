export default {
  new_project() {
    return '/project/new';
  },
  project(id) {
    return `/project/${id}`;
  },
  xflow(projectId, id) {
    return `/project/${projectId}/xflow/${id}`;
  },
  domain(projectId, id) {
    return `/project/${projectId}/domain/${id}`;
  },
}
