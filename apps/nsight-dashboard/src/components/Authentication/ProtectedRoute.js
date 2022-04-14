import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { contxtSdk } from '@ndustrial/nsight-common/utils';

const propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string
  }).isRequired
};

function ProtectedRoute(props) {
  if (!contxtSdk.auth.isAuthenticated()) {
    localStorage.setItem(
      'redirect_pathname',
      `${props.location.pathname}${props.location.search}`
    );

    contxtSdk.auth.logIn();

    return null;
  }

  return <Route {...props} />;
}

ProtectedRoute.propTypes = propTypes;

export { ProtectedRoute };
export default withRouter(ProtectedRoute);
