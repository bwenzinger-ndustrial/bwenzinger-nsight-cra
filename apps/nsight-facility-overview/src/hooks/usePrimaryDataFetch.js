import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useIsRealTimeEnabled } from '@ndustrial/nsight-common/hooks';
import { getSelectedFacility } from '@ndustrial/nsight-common/selectors';

import { getPrimaryDetailData } from '../redux/detail/actions';

function usePrimaryDataFetch(kpiConfig, kpiWindow) {
  const selectedFacility = useSelector(getSelectedFacility);
  const dispatch = useDispatch();
  const primaryDates = useSelector((state) => state.primaryDetail.primaryDates);
  const isRealTimeEnabled = useSelector(useIsRealTimeEnabled);

  useEffect(() => {
    if (!primaryDates || !primaryDates.from || !primaryDates.to || !kpiConfig) {
      return;
    }

    dispatch(
      getPrimaryDetailData(
        selectedFacility.id,
        kpiConfig,
        primaryDates.from,
        primaryDates.to,
        isRealTimeEnabled,
        kpiWindow
      )
    );
  }, [
    dispatch,
    selectedFacility.id,
    primaryDates,
    kpiConfig,
    isRealTimeEnabled,
    kpiWindow
  ]);
}

export { usePrimaryDataFetch };
