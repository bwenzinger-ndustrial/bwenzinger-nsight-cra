import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import { NotFound } from '@ndustrial/nsight-common/components';

import AngularAdapter from '../containers/AngularAdapter';

const propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired
  }).isRequired
};

function Routes({ match }) {
  return (
    <Switch>
      <Route
        path={`${match.path}`}
        render={(props) => <AngularAdapter {...props} />}
      />

      <Route component={NotFound} />
    </Switch>
  );
}

Routes.propTypes = propTypes;

export default Routes;
