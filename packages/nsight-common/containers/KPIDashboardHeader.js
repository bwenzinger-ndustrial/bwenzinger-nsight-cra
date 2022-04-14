import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import { KPIDashboardHeader } from '../components';
import makeHasEstimatedDataSelector from '../selectors/makeEstimatedDataSelector';

const propTypes = {
  sectionTitle: PropTypes.string.isRequired
};

function KPIDashboardHeaderContainer({ sectionTitle }) {
  const location = useLocation();
  const isDetailRoute = /\/detail/.test(location.pathname);
  const isPortfolioRoute = /\/portfolio-dashboard/.test(location.pathname);

  const isUsingEstimatedData = useSelector(
    makeHasEstimatedDataSelector(isDetailRoute, isPortfolioRoute)
  );

  return (
    <KPIDashboardHeader
      isUsingEstimatedData={isUsingEstimatedData}
      sectionTitle={sectionTitle}
    />
  );
}

KPIDashboardHeaderContainer.propTypes = propTypes;

export default KPIDashboardHeaderContainer;
