import React, { Component } from 'react';
import { DynamicModuleLoader } from 'redux-dynamic-modules';

import { getRequestStateModule } from '@ndustrial/nsight-common/reduxModules';
import { contxtSdk } from '@ndustrial/nsight-common/utils';

import Routes from './routes';
import SisModule from './services/SisModule';

class UtilityBillManager extends Component {
  constructor(props) {
    super(props);

    contxtSdk.mountDynamicModule('sis', {
      clientId: contxtSdk.config.audiences.sis.clientId,
      host: contxtSdk.config.audiences.sis.host,
      module: SisModule
    });
  }

  componentWillUnmount() {
    contxtSdk.unmountDynamicModule('sis');
  }

  render() {
    return (
      <DynamicModuleLoader
        modules={[getRequestStateModule('utilityBillManager')]}
      >
        <Routes {...this.props} />
      </DynamicModuleLoader>
    );
  }
}

export default UtilityBillManager;
