import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import { NotFound } from '@ndustrial/nsight-common/components';

import PortfolioDashboard from '../containers/PortfolioDashboard';
import PortfolioDetail from '../containers/PortfolioDetail';

function Routes() {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route component={PortfolioDashboard} exact path={match.path} />
      <Route component={PortfolioDetail} exact path={`${match.path}/detail`} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default Routes;
