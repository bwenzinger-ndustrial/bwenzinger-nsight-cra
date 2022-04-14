import React from 'react';
import { useSelector } from 'react-redux';

import { NoSelectedKpi } from '../components';
import { getFacilityConfigs } from '../selectors';

const propTypes = {};

function NoSelectedKpiContainer({ ...props }) {
  const allKpiConfigs = useSelector(getFacilityConfigs);
  const exampleKpi = allKpiConfigs.length ? allKpiConfigs[0] : null;

  return <NoSelectedKpi {...props} exampleKpi={exampleKpi} />;
}

NoSelectedKpiContainer.propTypes = propTypes;

export default NoSelectedKpiContainer;
