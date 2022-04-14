import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';

import { kpiEnums } from '../kpi-config/constants';
import useIsRealTimeEnabled from './useIsRealTimeEnabled';

const { DAILY, MONTHLY } = kpiEnums.DATE_INTERVALS;

export default (kpiConfig) => {
  const match = useRouteMatch();
  const isPortfolio = match.path.indexOf('/portfolio-dashboard') !== -1;

  const isRealTimeEnabled = useSelector(useIsRealTimeEnabled);

  return useMemo(() => {
    if (!kpiConfig) {
      return;
    }
    if (isPortfolio) {
      return MONTHLY;
    }

    return isRealTimeEnabled && kpiConfig.minimumDateInterval !== MONTHLY
      ? DAILY
      : MONTHLY;
  }, [isPortfolio, isRealTimeEnabled, kpiConfig]);
};
