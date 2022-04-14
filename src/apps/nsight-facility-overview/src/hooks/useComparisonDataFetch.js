import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useIsRealTimeEnabled } from '@ndustrial/nsight-common/hooks';
import { kpiEnums } from '@ndustrial/nsight-common/kpi-config/constants';
import { getSelectedFacility } from '@ndustrial/nsight-common/selectors';

import { getComparisonDetailData } from '../redux/detail/actions';

function useComparisonDataFetch(kpiConfig, kpiWindow) {
  const selectedFacility = useSelector(getSelectedFacility);
  const dispatch = useDispatch();
  const primaryDates = useSelector((state) => state.primaryDetail.primaryDates);
  const comparisonDates = useSelector(
    (state) => state.comparisonDetail.comparisonDates
  );

  const isRealTimeEnabled = useSelector(useIsRealTimeEnabled);

  const dates = useMemo(() => {
    return kpiConfig && kpiConfig.compareBy === kpiEnums.COMPARE_BY_TYPES.METRIC
      ? primaryDates
      : comparisonDates;
  }, [primaryDates, comparisonDates, kpiConfig]);

  useEffect(() => {
    if (!dates || !dates.from || !dates.to || !kpiConfig) {
      return;
    }

    dispatch(
      getComparisonDetailData(
        selectedFacility.id,
        kpiConfig,
        dates.from,
        dates.to,
        isRealTimeEnabled,
        kpiWindow
      )
    );
  }, [
    dispatch,
    selectedFacility.id,
    dates,
    kpiConfig,
    isRealTimeEnabled,
    kpiWindow
  ]);
}

export { useComparisonDataFetch };
