import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { kpiEnums } from '@ndustrial/nsight-common/kpi-config/constants';
import { getFacilitiesKeyedById } from '@ndustrial/nsight-common/selectors';
import {
  getEndOfDayISOString,
  getStartOfDayISOString
} from '@ndustrial/nsight-common/utils/dateUtils';

import { getPrimaryDetailData } from '../redux/detail/actions';
import {
  getPrimaryKPIDataForFacilities,
  resetComparisonKPIDetailData,
  resetPrimaryKPIDetailData
} from '../redux/kpi/actions';

function usePrimaryDataFetch(kpiConfig, selectedOrganization) {
  const dispatch = useDispatch();
  const primaryDates = useSelector(
    (state) => state.portfolioPrimaryDetail.primaryDates
  );
  const facilitiesById = useSelector(getFacilitiesKeyedById);

  useEffect(() => {
    if (!primaryDates || !primaryDates.from || !primaryDates.to || !kpiConfig) {
      return;
    }

    dispatch(
      getPrimaryDetailData(
        selectedOrganization.id,
        kpiConfig,
        primaryDates.from,
        primaryDates.to
      )
    );

    let breakdownLabels;

    if (kpiConfig.compareBy === kpiEnums.COMPARE_BY_TYPES.DATE) {
      breakdownLabels = kpiConfig.detail.breakdown.map((metric) => metric.key);
    } else {
      // TODO: due to a work-in-progress configuration object, this is currently required
      //  we can alternatively mark the metrics in the breakdown section under kpiConfig.detail.breakdown
      //  and use them instead, but it's 6 of one...
      breakdownLabels = [
        kpiConfig.primaryMetric.replace('organization', 'facility')
      ];
    }

    const facilityIds = Object.keys(facilitiesById);

    const dates = {
      from: getStartOfDayISOString(primaryDates.from),
      to: getEndOfDayISOString(primaryDates.to)
    };

    dispatch(
      getPrimaryKPIDataForFacilities(
        kpiConfig.monthly.key,
        breakdownLabels,
        facilityIds,
        dates
      )
    );

    return () => {
      if (kpiConfig.compareBy === kpiEnums.COMPARE_BY_TYPES.METRIC) {
        dispatch(resetComparisonKPIDetailData(kpiConfig.slug));
      }

      dispatch(resetPrimaryKPIDetailData(kpiConfig.slug));
    };
  }, [
    dispatch,
    selectedOrganization.id,
    primaryDates,
    kpiConfig,
    facilitiesById
  ]);
}

export default usePrimaryDataFetch;
