import React, { Component } from 'react';
import { DynamicModuleLoader } from 'redux-dynamic-modules';

import { getRequestStateModule } from '@ndustrial/nsight-common/reduxModules';
import { contxtSdk } from '@ndustrial/nsight-common/utils';

import getContractsModule from './redux/contracts/module';
import getSchedulesModule from './redux/schedules/module';
import Routes from './routes';
import EmsModule from './services/EmsModule';
import RatesModule from './services/RatesModule';

class RateTariffs extends Component {
  constructor(props) {
    super(props);

    contxtSdk.mountDynamicModule('rates', {
      clientId: contxtSdk.config.audiences.rates.clientId,
      host: contxtSdk.config.audiences.rates.host,
      module: RatesModule
    });

    contxtSdk.mountDynamicModule('ratesEms', {
      clientId: contxtSdk.config.audiences.ems.clientId,
      host: contxtSdk.config.audiences.ems.host,
      module: EmsModule
    });
  }

  componentWillUnmount() {
    contxtSdk.unmountDynamicModule('rates');
    contxtSdk.unmountDynamicModule('ratesEms');
  }

  render() {
    return (
      <DynamicModuleLoader
        modules={[
          getSchedulesModule(),
          getContractsModule(),
          getRequestStateModule('rateTariffs')
        ]}
      >
        <Routes {...this.props} />
      </DynamicModuleLoader>
    );
  }
}

export default RateTariffs;
