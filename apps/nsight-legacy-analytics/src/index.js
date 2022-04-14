import React, { Component } from 'react';

import Routes from './routes';

export default class NSightAnalytics extends Component {
  render() {
    return <Routes {...this.props} />;
  }
}
