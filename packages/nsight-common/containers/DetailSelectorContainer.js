import React from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import { DetailSelector } from '../components';
import { useKpiWindow } from '../hooks';

const propTypes = {
  kpiWindow: PropTypes.string,
  kpiConfig: PropTypes.shape({
    monthly: PropTypes.shape({
      key: PropTypes.string.isRequired,
      formula: PropTypes.string.isRequired
    }),
    daily: PropTypes.shape({
      key: PropTypes.string.isRequired,
      formula: PropTypes.string.isRequired
    }),
    label: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    interval: PropTypes.number.isRequired,
    compareBy: PropTypes.string.isRequired
  }).isRequired
};

function DetailSelectorContainer({ kpiConfig }) {
  const location = useLocation();
  const kpiWindow = useKpiWindow(kpiConfig);

  return (
    <DetailSelector
      kpiConfig={kpiConfig}
      location={location}
      kpiWindow={kpiWindow}
    />
  );
}

DetailSelectorContainer.propTypes = propTypes;

export default DetailSelectorContainer;
