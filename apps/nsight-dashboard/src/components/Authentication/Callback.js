import React, { Component } from 'react';

import { FullScreenLoadingIndicator } from '@ndustrial/nsight-common/components';
import { contxtSdk } from '@ndustrial/nsight-common/utils';

class AuthenticationCallback extends Component {
  componentDidMount() {
    contxtSdk.auth.handleAuthentication();
  }

  render() {
    return <FullScreenLoadingIndicator type="application" />;
  }
}

export default AuthenticationCallback;
