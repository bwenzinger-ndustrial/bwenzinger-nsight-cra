import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import moment from 'moment';
import PropTypes from 'prop-types';
import queryString from 'qs';

import {
  getSelectedFacility,
  getSelectedOrganization
} from '@ndustrial/nsight-common/selectors';
import { getSearchString } from '@ndustrial/nsight-common/utils';

import Impact from '../components/Impact';
import { CO2_METRIC_KEY, METRIC_LABELS } from '../constants/equivalencies';
import { useComparisonEmissionsFetch } from '../hooks/useComparisonEmissionsFetch';
import { usePrimaryEmissionsFetch } from '../hooks/usePrimaryEmissionsFetch';
import useQueryParamDates from '../hooks/useQueryParamDates';
import {
  resetComparisonEmissionsData,
  resetPrimaryEmissionsData,
  setComparisonDates,
  setPrimaryDates
} from '../redux/actions';
import getEmissionsLoadingStatus from '../redux/selectors/getEmissionsLoadingStatus';

const propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string.isRequired
  }),
  isLoading: PropTypes.bool
};

function ImpactContainer() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const selectedFacility = useSelector(getSelectedFacility);
  const selectedOrganization = useSelector(getSelectedOrganization);

  const queryParams = useMemo(() => {
    return queryString.parse(location.search, {
      ignoreQueryPrefix: true
    });
  }, [location.search]);

  const selectedAssetType = queryParams.facility ? 'facility' : 'organization';
  const metricLabels = METRIC_LABELS[selectedAssetType];
  const selectedAsset = queryParams.facility
    ? selectedFacility
    : selectedOrganization;
  const co2MetricKey = CO2_METRIC_KEY[selectedAssetType];
  const isLoading = useSelector(getEmissionsLoadingStatus);

  // Determine if there are dates we can grab from query params
  useQueryParamDates('monthly');
  const defaultPrimaryStart = moment();

  const primaryDates = useSelector(
    (state) => state.primaryEmissions.primaryDates
  );

  const comparisonDates = useSelector(
    (state) => state.comparisonEmissions.comparisonDates
  );

  useEffect(() => {
    if (!queryParams.primaryStart) {
      const primaryDatesToSet = {
        from: defaultPrimaryStart.clone().startOf('year'),
        to: defaultPrimaryStart.clone()
      };

      const comparisonDatesToSet = {
        from: defaultPrimaryStart
          .clone()
          .subtract(1, 'year')
          .startOf('year'),
        to: defaultPrimaryStart.clone().subtract(1, 'year')
      };

      const searchOptions = {
        searchString: location.search
      };

      dispatch(
        setPrimaryDates({
          from: primaryDatesToSet.from,
          to: primaryDatesToSet.to
        })
      );

      dispatch(
        setComparisonDates({
          from: comparisonDatesToSet.from,
          to: comparisonDatesToSet.to
        })
      );

      searchOptions.addParams = {
        primaryStart: primaryDatesToSet.from.format('YYYY-MM-DD'),
        primaryEnd: primaryDatesToSet.to.format('YYYY-MM-DD'),
        comparisonStart: comparisonDatesToSet.from.format('YYYY-MM-DD'),
        comparisonEnd: comparisonDatesToSet.to.format('YYYY-MM-DD')
      };

      const search = getSearchString(searchOptions);
      history.replace({ search });
    }
  }, [
    queryParams,
    dispatch,
    history,
    defaultPrimaryStart,
    location,
    comparisonDates,
    primaryDates
  ]);

  // fetches the primary data
  usePrimaryEmissionsFetch(metricLabels, selectedAsset);
  // fetches the comparison data
  useComparisonEmissionsFetch(metricLabels, selectedAsset);

  return (
    <Impact
      co2MetricKey={co2MetricKey}
      comparisonDates={comparisonDates}
      primaryDates={primaryDates}
      resetComparisonEmissionsData={(...args) =>
        dispatch(resetComparisonEmissionsData(...args))
      }
      resetPrimaryEmissionsData={(...args) =>
        dispatch(resetPrimaryEmissionsData(...args))
      }
      isLoading={isLoading}
      setComparisonDates={(...args) => dispatch(setComparisonDates(...args))}
      setPrimaryDates={(...args) => dispatch(setPrimaryDates(...args))}
      metric={metricLabels}
    />
  );
}

ImpactContainer.propTypes = propTypes;

export default ImpactContainer;
