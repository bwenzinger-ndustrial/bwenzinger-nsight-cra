import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getPrimaryEmissionsData } from '../redux/actions';

function usePrimaryEmissionsFetch(metricLabels, selectedAsset) {
  const dispatch = useDispatch();
  const primaryDates = useSelector(
    (state) => state.primaryEmissions.primaryDates
  );

  useEffect(() => {
    if (
      !primaryDates ||
      !primaryDates.from ||
      !primaryDates.to ||
      !selectedAsset
    ) {
      return;
    }

    dispatch(
      getPrimaryEmissionsData(
        selectedAsset.id,
        [metricLabels],
        primaryDates.from,
        primaryDates.to
      )
    );
  }, [dispatch, selectedAsset, primaryDates, metricLabels]);
}

export { usePrimaryEmissionsFetch };
