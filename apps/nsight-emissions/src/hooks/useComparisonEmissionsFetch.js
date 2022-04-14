import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getComparisonEmissionsData } from '../redux/actions';

function useComparisonEmissionsFetch(metricLabels, selectedAsset) {
  const dispatch = useDispatch();
  const comparisonDates = useSelector(
    (state) => state.comparisonEmissions.comparisonDates
  );

  useEffect(() => {
    if (
      !comparisonDates ||
      !comparisonDates.from ||
      !comparisonDates.to ||
      !selectedAsset
    ) {
      return;
    }
    dispatch(
      getComparisonEmissionsData(
        selectedAsset.id,
        [metricLabels],
        comparisonDates.from,
        comparisonDates.to
      )
    );
  }, [dispatch, selectedAsset, comparisonDates, metricLabels]);
}

export { useComparisonEmissionsFetch };
