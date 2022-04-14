import React, { Component } from 'react';
import { NotificationContainer } from 'react-notifications';
import { DynamicModuleLoader } from 'redux-dynamic-modules';

import { getRequestStateModule } from '@ndustrial/nsight-common/reduxModules';
import { contxtSdk } from '@ndustrial/nsight-common/utils';

import 'react-notifications/lib/notifications.css';

import Header from './components/common/Header';
import ProjectsContainer from './containers/ProjectsContainer';
import getProjectsModule from './redux/projects/module';
import ProjectsModule from './services/ProjectsModule';

class ProjectsIndex extends Component {
  componentDidMount() {
    contxtSdk.mountDynamicModule('nsightProjects', {
      clientId: contxtSdk.config.audiences.ems.clientId,
      host: contxtSdk.config.audiences.ems.host,
      module: ProjectsModule
    });
  }

  componentWillUnmount() {
    contxtSdk.unmountDynamicModule('nsightProjects');
  }

  shouldComponentUpdate() {
    // This view never needs to update after the first render.  It should only load
    // it's modules, boostrap redux within DynamicModuleLoader, and sit and
    // wait to be unmounted
    return false;
  }

  render() {
    return (
      <DynamicModuleLoader
        modules={[getRequestStateModule('projects'), getProjectsModule()]}
      >
        <NotificationContainer />
        <Header />
        <ProjectsContainer />
      </DynamicModuleLoader>
    );
  }
}

export default ProjectsIndex;
