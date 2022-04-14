import React, { Component } from 'react';

import { contxtSdk } from '@ndustrial/nsight-common/utils';

import Routes from './routes';
import EmsModule from './services/EmsModule';

export default class ContractUpload extends Component {
  constructor(props) {
    super(props);

    contxtSdk.mountDynamicModule('ems', {
      clientId: contxtSdk.config.audiences.ems.clientId,
      host: contxtSdk.config.audiences.ems.host,
      module: EmsModule
    });
  }

  componentWillUnmount() {
    contxtSdk.unmountDynamicModule('ems');
  }

  render() {
    return <Routes {...this.props} />;
  }
}
