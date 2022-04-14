import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import { NotFound } from '@ndustrial/nsight-common/components';

import ScheduleDetail from '../containers/ScheduleDetail';
import Schedules from '../containers/Schedules';

const propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired
  }).isRequired
};

function Routes({ match }) {
  return (
    <Switch>
      <Route component={Schedules} exact path={match.path} />
      <Route
        component={ScheduleDetail}
        exact
        path={`${match.path}/schedule/:scheduleId/:seasonPeriod/:rateType`}
      />
      <Route component={NotFound} />
    </Switch>
  );
}

Routes.propTypes = propTypes;

export default Routes;
