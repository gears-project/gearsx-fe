import React from 'react'
import ProjectTree from '../components/ProjectTree';

export default (props) => {
  return (
    <div>
      <div class="container-fluid">
        <div class="row">
          <nav class="col-md-2 d-none d-md-block bg-light sidebar">
            <div class="sidebar-sticky">
              <ProjectTree />
            </div>
          </nav>

          <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
            <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 class="h2">Overview</h1>
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
