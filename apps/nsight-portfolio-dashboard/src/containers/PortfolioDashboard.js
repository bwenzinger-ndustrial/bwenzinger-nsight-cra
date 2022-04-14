import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';

import {
  getPortfolioConfigs,
  getSelectedOrganization
} from '@ndustrial/nsight-common/selectors';

import PortfolioDashboard from '../components/PortfolioDashboard';
import { setRangeEnd } from '../redux/portfolioMetadata/actions';

const propTypes = {
  selectedOrganization: PropTypes.shape({
    id: PropTypes.string.isRequired
  })
};

function PortfolioDashboardContainer() {
  const currentMonth = moment()
    .utc()
    .month();
  const currentYear = moment()
    .utc()
    .year();
  const selectedOrganization = useSelector(getSelectedOrganization);
  const datesSet = currentYear && currentMonth;

  const allKpiConfigs = useSelector(getPortfolioConfigs);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setRangeEnd());
  }, [dispatch, selectedOrganization]);

  // Let setRangeEnd set the dates into the state before attempting to load the dashboard.
  return datesSet ? (
    <PortfolioDashboard
      currentMonth={currentMonth}
      currentYear={currentYear}
      selectedOrganization={selectedOrganization}
      allKpiConfigs={allKpiConfigs}
    />
  ) : null;
}

PortfolioDashboardContainer.propTypes = propTypes;
export default PortfolioDashboardContainer;
