import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import { withFacility } from '@ndustrial/nsight-common/enhancers';
import { useIsRealTimeEnabled } from '@ndustrial/nsight-common/hooks';

import FacilityDetailContainer from '../../containers/FacilityDetailContainer';
import RealTimeFacilityDashboard from './Realtime/Dashboard';
import UtilityBillFacilityDashboard from './Utility/Dashboard';

const propTypes = {};

// withFacility is a loading/validity wrapper that requires for a facility to have been selected
const FacilityDetailWithFacility = withFacility(FacilityDetailContainer);

const RealTimeFacilityDashboardContainer = withFacility(
  RealTimeFacilityDashboard
);
const UtilityBillFacilityDashboardContainer = withFacility(
  UtilityBillFacilityDashboard
);

const Dashboard = () => {
  const match = useRouteMatch();
  const isRealTimeEnabled = useSelector(useIsRealTimeEnabled);

  const FacilityOverviewContainer = isRealTimeEnabled
    ? RealTimeFacilityDashboardContainer
    : UtilityBillFacilityDashboardContainer;

  return (
    <Switch>
      <Route
        exact
        path={match.path}
        render={(props) => <FacilityOverviewContainer />}
      />
      <Route
        path={`${match.path}/detail`}
        exact
        render={(props) => <FacilityDetailWithFacility {...props} />}
      />
    </Switch>
  );
};

Dashboard.propTypes = propTypes;

export default Dashboard;
