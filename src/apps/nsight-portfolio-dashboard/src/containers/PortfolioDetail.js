import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  getPortfolioKpiConfigWithRouter,
  getSelectedOrganization
} from '@ndustrial/nsight-common/selectors';

import PortfolioDetail from '../components/PortfolioDetail/index';
import useComparisonDataFetch from '../hooks/useComparisonDataFetch';
import usePrimaryDataFetch from '../hooks/usePrimaryDataFetch';
import useQueryParamDates from '../hooks/useQueryParamDates';
import {
  resetComparisonDetailData,
  resetPrimaryDetailData,
  setComparisonDates,
  setPrimaryDates
} from '../redux/detail/actions';
import { getFacilitiesWithKpiValues } from '../redux/kpi/selectors';

function PortfolioDetailContainer() {
  const comparisonDates = useSelector(
    (state) => state.portfolioComparisonDetail.comparisonDates
  );
  const dispatch = useDispatch();
  const selectedOrganization = useSelector(getSelectedOrganization);
  const primaryDates = useSelector(
    (state) => state.portfolioPrimaryDetail.primaryDates
  );
  const facilityKpiValues = useSelector(getFacilitiesWithKpiValues);

  const kpiConfig = useSelector(getPortfolioKpiConfigWithRouter);

  useQueryParamDates();
  usePrimaryDataFetch(kpiConfig, selectedOrganization);
  useComparisonDataFetch(kpiConfig, selectedOrganization);

  return (
    <PortfolioDetail
      comparisonDates={comparisonDates}
      primaryDates={primaryDates}
      facilityKpiValues={facilityKpiValues}
      kpiConfig={kpiConfig}
      resetComparisonDetailData={(...args) =>
        dispatch(resetComparisonDetailData(...args))
      }
      resetPrimaryDetailData={(...args) =>
        dispatch(resetPrimaryDetailData(...args))
      }
      selectedOrganization={selectedOrganization}
      setComparisonDates={(...args) => dispatch(setComparisonDates(...args))}
      setPrimaryDates={(...args) => dispatch(setPrimaryDates(...args))}
    />
  );
}

export default PortfolioDetailContainer;
