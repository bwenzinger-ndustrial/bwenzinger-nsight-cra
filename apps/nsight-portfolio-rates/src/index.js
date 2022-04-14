import React, { Component } from 'react';
import { DynamicModuleLoader } from 'redux-dynamic-modules';

import { getRequestStateModule } from '@ndustrial/nsight-common/reduxModules';
import { contxtSdk } from '@ndustrial/nsight-common/utils';

import Routes from './routes';
import RatesModule from './services/RatesModule';

class PortfolioRates extends Component {
  constructor(props) {
    super(props);

    contxtSdk.mountDynamicModule('ems', {
      clientId: contxtSdk.config.audiences.ems.clientId,
      host: contxtSdk.config.audiences.ems.host,
      module: RatesModule
    });
  }

  componentWillUnmount() {
    contxtSdk.unmountDynamicModule('ems');
  }

  render() {
    return (
      <DynamicModuleLoader modules={[getRequestStateModule('portfolioRates')]}>
        <Routes {...this.props} />
      </DynamicModuleLoader>
    );
  }
}

export default PortfolioRates;
