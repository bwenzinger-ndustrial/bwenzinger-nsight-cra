import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import { NotFound, QueryRedirect } from '@ndustrial/nsight-common/components';

import ImpactContainer from '../containers/ImpactContainer';

function Routes() {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={`${match.path}`} component={ImpactContainer} />
      <QueryRedirect from={`${match.path}`} to={`${match.path}`} exact />
      <Route component={NotFound} />
    </Switch>
  );
}

export default Routes;
