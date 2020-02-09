import React from 'react'
import ProjectTree from '../components/ProjectTree';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import {
  useParams
} from "react-router-dom";


function getProjectQuery(id) {
  return gql`
    query getProject {
      project(input: { projectId: "${id}" }) {
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
    }`;
}

export default (props) => {
  let { id } = useParams();
  console.error('useParams ', useParams());

  const { loading, error, data } = useQuery(getProjectQuery(id));

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

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

            <h2>Section title</h2>
            <div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
