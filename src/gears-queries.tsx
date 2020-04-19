import { gql } from 'apollo-boost';

export const PROJECTS_LIST = gql`
  query getProjects {
    projects(paging:{limit:20}) {
      id
      name
      description
      createdAt
      updatedAt
      model {
        id
        name
        doctype
        domains {
          id
          name
          body {
            events {
              all {
                id
              }
            }
            entities {
              id
              name
              attributes {
                id
                name
                vtype {
                  __typename
                  ... on string {
                    default
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const DELETE_PROJECT = gql`
  mutation ($projectId: Uuid!) {
    deleteProject(input: {
      projectId: $projectId,
    })
  }
`;

export const UPDATE_PROJECT = gql`
  mutation ($id: Uuid!, $name: String!, $description: String) {
    updateProject(input: {
      id: $id,
      name: $name,
      description: $description
    }) {
      id,
      name,
      description
    }
  }
`;


export const GET_DOMAIN_QUERY = gql`
  query getDomain($id: Uuid!) {
    domain(input: { documentId: $id }) {
      id
      name
      body {
        events {
          all {
            id
          }
        }
        entities {
          id
          name
          attributes {
            id
            name
            vtype {
              __typename
              ... on string {
                default
              }
            }
          }
        }
      }
    }
  }
`;

export const PROJECT_TREE = gql`
  query getProject($id: Uuid!) {
    project(input: { projectId: $id }) {
      id
      name
      model {
        id
        name
        doctype
        domains {
          id
          name
        }
        xflows {
          id
          name
        }
        fngroups {
          id
          name
        }
      }
    }
  }
`;

export default {
  PROJECTS_LIST,
  DELETE_PROJECT,
  UPDATE_PROJECT,
  PROJECT_TREE,
  GET_DOMAIN_QUERY,
}
