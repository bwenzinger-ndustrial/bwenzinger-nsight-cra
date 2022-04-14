import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import { NotFound } from '@ndustrial/nsight-common/components';

import UtilityContractUpload from '../containers/FacilityContract';

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
        exact={true}
        render={(props) => (
          <UtilityContractUpload {...props} contractMode="view" />
        )}
      />
      <Route
        path={`${match.path}/contract/new`}
        exact={true}
        render={(props) => (
          <UtilityContractUpload {...props} contractMode="create" />
        )}
      />
      <Route
        path={`${match.path}/contract/:contractId/edit`}
        exact={true}
        render={(props) => (
          <UtilityContractUpload {...props} contractMode="edit" />
        )}
      />
      <Route
        path={`${match.path}/contract/:contractId`}
        exact={true}
        render={(props) => (
          <UtilityContractUpload {...props} contractMode="view" />
        )}
      />

      <Route component={NotFound} />
    </Switch>
  );
}

Routes.propTypes = propTypes;

export default Routes;
