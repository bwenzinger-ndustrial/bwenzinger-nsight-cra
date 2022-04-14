import React, { Component } from 'react';
import { DynamicModuleLoader } from 'redux-dynamic-modules';

import { getFeedTypesModule } from '@ndustrial/nsight-common/reduxModules';

import getEventsModule from './redux/events/module';
import Routes from './routes';

class DeviceStatus extends Component {
  render() {
    return (
      <DynamicModuleLoader modules={[getEventsModule(), getFeedTypesModule()]}>
        <Routes {...this.props} />
      </DynamicModuleLoader>
    );
  }
}

export default DeviceStatus;
