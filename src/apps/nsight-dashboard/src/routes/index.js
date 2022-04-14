import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { NotFound } from '@ndustrial/nsight-common/components';

import Callback from '../components/Authentication/Callback';
import ProtectedRoute from '../components/Authentication/ProtectedRoute';
import Dashboard from '../containers/Dashboard';
import ModuleRoutes from './ModuleRoutes';

function Routes() {
  return (
    <Switch>
      <Route component={Callback} path="/callback" />

      <ProtectedRoute
        path="/"
        render={(props) => {
          return (
            <Dashboard {...props}>
              {({
                hasLoadedApplicationGroupings,
                modules,
                selectedOrganizationSlug
              }) => (
                <ModuleRoutes
                  hasLoadedApplicationGroupings={hasLoadedApplicationGroupings}
                  modules={modules}
                  selectedOrganizationSlug={selectedOrganizationSlug}
                />
              )}
            </Dashboard>
          );
        }}
      />

      <Route component={NotFound} />
    </Switch>
  );
}

export default Routes;
