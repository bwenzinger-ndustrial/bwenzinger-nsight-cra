import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'qs';

import { dateUtils, getSearchString } from '@ndustrial/nsight-common/utils';

import {
  resetComparisonDetailData,
  resetPrimaryDetailData,
  setComparisonDates,
  setPrimaryDates
} from '../redux/detail/actions';

function useQueryParamDates() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const queryParams = useMemo(() => {
    return queryString.parse(location.search, {
      ignoreQueryPrefix: true
    });
  }, [location.search]);

  useEffect(() => {
    const primaryStart = dateUtils.validatePastDate(queryParams.primaryStart);
    const primaryEnd = dateUtils.validatePastDate(queryParams.primaryEnd);
    const comparisonStart = dateUtils.validatePastDate(
      queryParams.comparisonStart
    );

    if (!primaryEnd || !primaryStart) {
      dispatch(resetPrimaryDetailData());
    } else {
      // Primary date are good, set them in redux
      dispatch(
        setPrimaryDates({
          from: primaryStart,
          to: primaryEnd
        })
      );
    }

    if (!comparisonStart) {
      dispatch(resetComparisonDetailData());
    } else {
      // Check if comparison dates are valid
      const monthCount = primaryEnd.diff(primaryStart, 'months');
      const comparisonEnd = comparisonStart
        .clone()
        .utc()
        .add(monthCount, 'month')
        .endOf('month');

      if (comparisonEnd.isSameOrAfter(primaryStart)) {
        const search = getSearchString({
          searchString: location.search,
          removeParams: ['comparisonStart']
        });
        history.replace({ search });
      } else {
        // Comparison dates are good, set them in redux
        dispatch(
          setComparisonDates({
            from: comparisonStart,
            to: comparisonEnd
          })
        );
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}

export default useQueryParamDates;
