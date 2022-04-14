import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { DetailHeader } from '@ndustrial/nsight-common/components';
import { DetailSelectorContainer } from '@ndustrial/nsight-common/containers';
import { getPortfolioConfigs } from '@ndustrial/nsight-common/selectors';

const propTypes = {
  className: PropTypes.string
};

function DetailHeaderContainer({ className }) {
  const allKpiConfigs = useSelector(getPortfolioConfigs);

  return (
    <DetailHeader className={className} allKpiConfigs={allKpiConfigs}>
      {(config) => <DetailSelectorContainer kpiConfig={config} />}
    </DetailHeader>
  );
}

DetailHeaderContainer.propTypes = propTypes;

export default DetailHeaderContainer;
