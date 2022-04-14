import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { kpiEnums } from '@ndustrial/nsight-common/kpi-config/constants';
import { getFacilitiesKeyedById } from '@ndustrial/nsight-common/selectors';
import {
  getEndOfDayISOString,
  getStartOfDayISOString
} from '@ndustrial/nsight-common/utils/dateUtils';

import { getComparisonDetailData } from '../redux/detail/actions';
import {
  getComparisonKPIDataForFacilities,
  resetComparisonKPIDetailData
} from '../redux/kpi/actions';

function useComparisonDataFetch(kpiConfig, selectedOrganization) {
  const dispatch = useDispatch();
  const primaryDates = useSelector(
    (state) => state.portfolioPrimaryDetail.primaryDates
  );
  const comparisonDates = useSelector(
    (state) => state.portfolioComparisonDetail.comparisonDates
  );
  const facilitiesById = useSelector(getFacilitiesKeyedById);

  /*
    We require primary dates because the comparison data for kpiConfig.compareBy === "metric"
    does not use a secondary date, but rather, as is implied by the value of compareBy,
    it compares 2 metrics from the same date range.
   */
  const dates = useMemo(() => {
    if (!kpiConfig) {
      return null;
    }

    return kpiConfig.compareBy === kpiEnums.COMPARE_BY_TYPES.METRIC
      ? primaryDates
      : comparisonDates;
  }, [primaryDates, comparisonDates, kpiConfig]);

  useEffect(() => {
    if (!dates || !dates.from || !dates.to || !kpiConfig) {
      return;
    }

    dispatch(
      getComparisonDetailData(
        selectedOrganization.id,
        kpiConfig,
        dates.from,
        dates.to
      )
    );

    let breakdownLabels;

    if (kpiConfig.compareBy === kpiEnums.COMPARE_BY_TYPES.DATE) {
      breakdownLabels = kpiConfig.detail.breakdown.map((metric) => metric.key);
    } else {
      // See: apps/nsight-portfolio-dashboard/src/hooks/usePrimaryDataFetch.js
      breakdownLabels = [
        kpiConfig.comparisonMetric.replace('organization', 'facility')
      ];
    }

    const facilityIds = Object.keys(facilitiesById);

    const parsedDates = {
      from: getStartOfDayISOString(dates.from),
      to: getEndOfDayISOString(dates.to)
    };

    dispatch(
      getComparisonKPIDataForFacilities(
        kpiConfig.monthly.key,
        breakdownLabels,
        facilityIds,
        parsedDates
      )
    );

    return () => {
      if (kpiConfig.compareBy === kpiEnums.COMPARE_BY_TYPES.DATE) {
        dispatch(resetComparisonKPIDetailData(kpiConfig.slug));
      }
    };
  }, [dispatch, selectedOrganization.id, dates, kpiConfig, facilitiesById]);
}

export default useComparisonDataFetch;
