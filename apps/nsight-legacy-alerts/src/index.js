import React, { Component } from 'react';

import Routes from './routes';

export default class NSightAlerts extends Component {
  render() {
    return <Routes {...this.props} />;
  }
}
