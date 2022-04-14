import React, { Component } from 'react';
import { DynamicModuleLoader } from 'redux-dynamic-modules';

import EmsModule, {
  moduleConfig as emsModuleConfig
} from '@ndustrial/nsight-common/services/EmsModule';
import { contxtSdk } from '@ndustrial/nsight-common/utils';

import ImpactRoot from './containers/ImpactRoot';
import getEmissionsModule from './redux/module';

class Impact extends Component {
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
      <DynamicModuleLoader modules={[getEmissionsModule()]}>
        <ImpactRoot />
      </DynamicModuleLoader>
    );
  }
}

export default Impact;
