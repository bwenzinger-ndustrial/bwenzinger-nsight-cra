import React, { Component } from 'react';
import { DynamicModuleLoader } from 'redux-dynamic-modules';

import {
  getKpiCardModule,
  getRequestStateModule
} from '@ndustrial/nsight-common/reduxModules';
import EmsModule, {
  moduleConfig as emsModuleConfig
} from '@ndustrial/nsight-common/services/EmsModule';
import { contxtSdk } from '@ndustrial/nsight-common/utils';

import PortfolioDashboardRoot from './containers/PortfolioDashboardRoot';
import getPortfolioDetailModule from './redux/detail/module';
import getKPIModule from './redux/kpi/module';
import getPortfolioMetadataModule from './redux/portfolioMetadata/module';

class PortfolioDashboard extends Component {
  /**
   * If we start to run into issues with component did mount running too soon, and breaking
   * our fetch actions, we will likely need to move mounting modules to the constructor
   * see note in packages/nsight-common/services/EmsModule.js
   */
  componentDidMount() {
    contxtSdk.mountDynamicModule(emsModuleConfig.name, {
      clientId: emsModuleConfig.clientId,
      host: emsModuleConfig.host,
      module: EmsModule
    });
  }

  componentWillUnmount() {
    contxtSdk.unmountDynamicModule(emsModuleConfig.name);
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
        modules={[
          getKPIModule(),
          getKpiCardModule(),
          getPortfolioMetadataModule(),
          getPortfolioDetailModule(),
          getRequestStateModule('portfolioDashboard')
        ]}
      >
        <PortfolioDashboardRoot />
      </DynamicModuleLoader>
    );
  }
}
export default PortfolioDashboard;
