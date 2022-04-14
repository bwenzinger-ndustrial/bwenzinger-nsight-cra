import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DynamicModuleLoader } from 'redux-dynamic-modules';

import { getRequestStateModule } from '@ndustrial/nsight-common/reduxModules';
import { contxtSdk } from '@ndustrial/nsight-common/utils';

import getCoincidentPeakModule from './redux/module';
import Routes from './routes';
import CoincidentPeakModule from './services/CoincidentPeakModule';

class CoincidentPeak extends Component {
  static propTypes = {
    location: PropTypes.object
  };

  constructor(props) {
    super(props);
    contxtSdk.mountDynamicModule('orgCoincidentPeak', {
      clientId: contxtSdk.config.audiences.coincident_peak.clientId,
      host: contxtSdk.config.audiences.coincident_peak.host,
      module: CoincidentPeakModule
    });
  }

  componentWillUnmount() {
    contxtSdk.unmountDynamicModule('orgCoincidentPeak');
  }

  render() {
    return (
      <DynamicModuleLoader
        modules={[
          getCoincidentPeakModule(),
          getRequestStateModule('coincidentPeak')
        ]}
      >
        <Routes {...this.props} />
      </DynamicModuleLoader>
    );
  }
}

export default CoincidentPeak;
