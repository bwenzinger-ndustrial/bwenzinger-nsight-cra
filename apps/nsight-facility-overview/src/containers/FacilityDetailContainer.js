import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import {
  useIsRealTimeEnabled,
  useKpiWindow
} from '@ndustrial/nsight-common/hooks';
import { kpiEnums } from '@ndustrial/nsight-common/kpi-config/constants';
import {
  getKpiConfigWithRouter,
  getSelectedFacility
} from '@ndustrial/nsight-common/selectors';

import FacilityDetail from '../components/FacilityDetail';
import { useComparisonDataFetch } from '../hooks/useComparisonDataFetch';
import { usePrimaryDataFetch } from '../hooks/usePrimaryDataFetch';
import useQueryParamDates from '../hooks/useQueryParamDates';
import {
  resetComparisonDetailData,
  resetPrimaryDetailData,
  setComparisonDates,
  setPrimaryDates
} from '../redux/detail/actions';
import {
  getPrimaryWeatherData,
  getSecondaryWeatherData
} from '../redux/weather/actions';

const propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string.isRequired
  })
};

function FacilityDetailContainer(props) {
  // Determine if there are dates we can grab from query params
  useQueryParamDates(kpiEnums.DATE_INTERVALS.DAILY);

  // Grab the dates from redux, which may have been set by query params above, or a
  // date picker component in the children
  const comparisonDates = useSelector(
    (state) => state.comparisonDetail.comparisonDates
  );
  const dispatch = useDispatch();
  const selectedFacility = useSelector(getSelectedFacility);
  const primaryDates = useSelector((state) => state.primaryDetail.primaryDates);
  const isRealTimeEnabled = useSelector(useIsRealTimeEnabled);

  // TODO, for us to stop using workarounds to determine which kpi and window we're
  // using, we need to get away from using the window and asset type in they kpi key
  const kpiConfig = useSelector(getKpiConfigWithRouter);
  const kpiWindow = useKpiWindow(kpiConfig);

  // fetches the primary data
  usePrimaryDataFetch(kpiConfig, kpiWindow);
  // fetches the comparison data
  useComparisonDataFetch(kpiConfig, kpiWindow);

  useEffect(() => {
    if (comparisonDates.from && comparisonDates.to) {
      dispatch(
        getSecondaryWeatherData(
          selectedFacility.id,
          comparisonDates.from.format('YYYY-MM-DD[T]HH:mm:ss[Z]'),
          comparisonDates.to.format('YYYY-MM-DD[T]HH:mm:ss[Z]')
        )
      );
    }
  }, [dispatch, comparisonDates, selectedFacility.id]);

  useEffect(() => {
    if (primaryDates.from && primaryDates.to) {
      dispatch(
        getPrimaryWeatherData(
          selectedFacility.id,
          primaryDates.from.format('YYYY-MM-DD[T]HH:mm:ss[Z]'),
          primaryDates.to.format('YYYY-MM-DD[T]HH:mm:ss[Z]') // TODO: make format a constant.  Find inconsistencies
        )
      );
    }
  }, [dispatch, primaryDates, selectedFacility.id]);

  return (
    <FacilityDetail
      isRealTimeEnabled={isRealTimeEnabled}
      comparisonDates={comparisonDates}
      primaryDates={primaryDates}
      resetComparisonDetailData={(...args) =>
        dispatch(resetComparisonDetailData(...args))
      }
      resetPrimaryDetailData={(...args) =>
        dispatch(resetPrimaryDetailData(...args))
      }
      selectedFacility={selectedFacility}
      setComparisonDates={(...args) => dispatch(setComparisonDates(...args))}
      setPrimaryDates={(...args) => dispatch(setPrimaryDates(...args))}
      kpiConfig={kpiConfig}
    />
  );
}

FacilityDetailContainer.propTypes = propTypes;

export default FacilityDetailContainer;
