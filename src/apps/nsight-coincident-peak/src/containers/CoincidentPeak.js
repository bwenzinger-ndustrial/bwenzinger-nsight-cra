import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';

import { useQueryParams } from '@ndustrial/nsight-common/hooks';
import { getSearchString } from '@ndustrial/nsight-common/utils';

import CoincidentPeak from '../components/CoincidentPeak';
import {
  getCoincidentPeakActualDemand,
  getCoincidentPeakDemandForecast,
  getCoincidentPeakHourlyWeather,
  getRegionLocationData
} from '../redux/actions';
import {
  getBalancingAuthority,
  getCPDates,
  getCPLoadingState,
  getCurrentRun,
  getSelectedLocation
} from '../redux/selectors';

const propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      search: PropTypes.string
    }).isRequired,
    push: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired
  }).isRequired
};
function CoincidentPeakContainer({ history }) {
  const dispatch = useDispatch();
  const queryParams = useQueryParams();

  const cpDates = useSelector(getCPDates);
  const currentRun = useSelector(getCurrentRun);
  const isLoading = useSelector(getCPLoadingState);
  const selectedBalancingAuthority = useSelector(getBalancingAuthority);
  const selectedLocation = useSelector(getSelectedLocation);

  const defaultBalancingAuthority = 'CPLE';
  const defaultSelectedDate = useMemo(() => moment(), []);

  const setBalancingAuthority = useCallback(
    (value) => {
      const searchOptions = {
        addParams: {
          balancingAuthority: value
        },
        searchString: history.location.search
      };
      const search = getSearchString(searchOptions);
      history.push({ search });
    },
    [history]
  );

  const setCPDates = useCallback(
    (value) => {
      const searchOptions = {
        addParams: {
          selectedDate: value.format('YYYY-MM-DD')
        },
        searchString: history.location.search
      };

      const search = getSearchString(searchOptions);
      history.push({ search });
    },
    [history]
  );

  useEffect(() => {
    if (!queryParams.balancingAuthority) {
      setBalancingAuthority(defaultBalancingAuthority);
    }

    if (!queryParams.selectedDate) {
      setCPDates(defaultSelectedDate);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (cpDates && cpDates.from && cpDates.to && selectedBalancingAuthority) {
      dispatch(
        getCoincidentPeakActualDemand(
          cpDates.from.toISOString(),
          cpDates.to.toISOString(),
          selectedBalancingAuthority
        )
      );
    }
  }, [cpDates, dispatch, selectedBalancingAuthority]);

  useEffect(() => {
    if (cpDates && cpDates.from && cpDates.to && selectedBalancingAuthority) {
      dispatch(
        getCoincidentPeakDemandForecast(
          cpDates.from.toISOString(),
          cpDates.from
            .clone()
            .endOf('day')
            .toISOString(),
          selectedBalancingAuthority
        )
      );
    }
  }, [cpDates, dispatch, selectedBalancingAuthority]);

  useEffect(() => {
    if (cpDates && cpDates.from && cpDates.to && selectedLocation) {
      dispatch(
        getCoincidentPeakHourlyWeather(
          cpDates.from.toISOString(),
          cpDates.to.toISOString(),
          selectedLocation
        )
      );
    }
  }, [cpDates, dispatch, selectedLocation]);

  useEffect(() => {
    dispatch(getRegionLocationData());
  }, [dispatch]);

  return (
    <CoincidentPeak
      cpDates={cpDates}
      currentRunTime={currentRun.time}
      isLoading={isLoading}
      selectedBalancingAuthority={
        selectedBalancingAuthority || defaultBalancingAuthority
      }
      setBalancingAuthority={setBalancingAuthority}
      selectedLocation={selectedLocation}
      setCPDates={setCPDates}
    />
  );
}

CoincidentPeakContainer.propTypes = propTypes;

export default CoincidentPeakContainer;
