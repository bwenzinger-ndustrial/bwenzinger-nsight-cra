import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import { NotFound } from '@ndustrial/nsight-common/components';

import CoincidentPeak from '../containers/CoincidentPeak';

const propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired
  }).isRequired
};

function Routes({ match }) {
  return (
    <Switch>
      <Route
        exact
        path="/coincident-peak"
        render={(props) => (
          <Redirect
            to={{
              pathname: '/coincident-peak/graph',
              search: props.location.search // eslint-disable-line react/prop-types
            }}
            props={props}
          />
        )}
      />
      <Route
        path={`${match.path}`}
        render={(props) => <CoincidentPeak {...props} />}
      />

      <Route component={NotFound} />
    </Switch>
  );
}

Routes.propTypes = propTypes;

export default Routes;
