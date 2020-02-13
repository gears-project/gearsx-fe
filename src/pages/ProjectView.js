import React from 'react'
import ProjectTree from 'components/project/ProjectTree';
import DomainView from 'components/domain/DomainView';
import Loading from 'components/Loading';
import Error from 'components/Error';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import {
  Switch,
  Route,
  useParams,
  useRouteMatch,
} from "react-router-dom";

const QUERY = gql`
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
      }
    }
  }
`;

export default (props) => {
  let { projectId } = useParams();
  let match = useRouteMatch();

  const { loading, error, data } = useQuery(QUERY, {
    variables: {
      id: projectId
    }
  });

  if (loading) return <Loading />;
  if (error) return <Error />;

  const project = data.project;

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <nav className="col-md-2 d-none d-md-block bg-light sidebar">
            <div className="sidebar-sticky">
              <ProjectTree project={project} />
            </div>
          </nav>

          <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2">Overview {project.id}</h1>
            </div>
            <div>
              <Switch>
                <Route path={`${match.path}/domain/:domainId`}>
                  <DomainView />
                </Route>
                <Route path={match.path}>
                  <h3>Please select a document</h3>
                </Route>
              </Switch>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
