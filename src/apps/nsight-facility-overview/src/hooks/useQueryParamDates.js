import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'qs';

import { kpiEnums } from '@ndustrial/nsight-common/kpi-config/constants';
import { dateUtils, getSearchString } from '@ndustrial/nsight-common/utils';

import {
  resetComparisonDetailData,
  resetPrimaryDetailData,
  setComparisonDates,
  setPrimaryDates
} from '../redux/detail/actions';

const { DAILY, MONTHLY } = kpiEnums.DATE_INTERVALS;

/**
 * Will attempt to grab the url query params for primaryStart, and primaryEnd,
 * validate them, and set them in redux.  Then attempt to grab and validate comparisonStart
 * and then calculate comparisonEnd based on the difference between primaryStart and primaryEnd,
 * as well as the dateInterval passed in.
 *
 * TODO: This is currently almost completey duplicated in portfolio-dashboard,
 * though I'm not sure it should go to common, unless we rename it to something like
 * useQueryParamDateForKPIDetailView.js.  It's why I added the dateInterval branching
 *
 * @param {string} dateInterval
 */
function useQueryParamDates(dateInterval = DAILY) {
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
      const diffCount =
        dateInterval === MONTHLY
          ? primaryEnd.diff(primaryStart, 'months')
          : primaryEnd.diff(primaryStart, 'days');

      // create a string to calculate dates with specific date interval string
      const dateIntervalCalculationString =
        dateInterval === MONTHLY ? 'month' : 'day';

      const comparisonEnd = comparisonStart
        .clone()
        .utc()
        .add(diffCount, dateIntervalCalculationString)
        .endOf(dateIntervalCalculationString);

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
