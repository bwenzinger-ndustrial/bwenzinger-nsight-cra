import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  ErrorBanner,
  ErrorBoundary,
  ErrorText,
  MissingSelection
} from '@ndustrial/nsight-common/components';

import { getRoute } from '../services/routeService';
import types from '../types';

const propTypes = {
  hasLoadedApplicationGroupings: PropTypes.bool,
  modules: types.applicationModules,
  selectedOrganizationSlug: PropTypes.string
};

function ModuleRoutes(props) {
  const {
    hasLoadedApplicationGroupings,
    modules,
    selectedOrganizationSlug
  } = props;

  return (
    <Switch>
      {modules.map((module) => {
        const { Component, path } = getRoute(module.slug);
        return (
          <Route
            key={module.id}
            path={`/${path}`}
            render={(props) => {
              return (
                <Fragment>
                  <Helmet>
                    <title>{module.label}</title>
                  </Helmet>
                  <ErrorBoundary>
                    <Component {...props} />
                  </ErrorBoundary>
                </Fragment>
              );
            }}
          />
        );
      })}

      {selectedOrganizationSlug &&
      hasLoadedApplicationGroupings &&
      modules.length === 0 ? (
        <ErrorBanner>
          {() => (
            <ErrorText>
              Your account seems to be misconfigured. Contact ndustrial support
              at the link below and we&apos;ll work to correct the issue.
            </ErrorText>
          )}
        </ErrorBanner>
      ) : (
        <Route
          exact
          path="/"
          render={() => <MissingSelection requiredType="organization" />}
        />
      )}
    </Switch>
  );
}

ModuleRoutes.propTypes = propTypes;

export default ModuleRoutes;
