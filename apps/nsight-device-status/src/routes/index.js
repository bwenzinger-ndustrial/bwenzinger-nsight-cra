import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import { NotFound } from '@ndustrial/nsight-common/components';

import DeviceStatus from '../containers/DeviceStatus';

const propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired
  }).isRequired
};

function Routes({ match }) {
  return (
    <Switch>
      <Route component={DeviceStatus} exact path={match.path} />
      <Route component={NotFound} />
    </Switch>
  );
}

Routes.propTypes = propTypes;

export default Routes;
