import { moduleConfig } from '../services/EmsModule';
import { contxtSdk } from '../utils';
import actionTypes from './kpiCardActionTypes';

const getKpiCardData = (id, kpiConfig, comparisonRange) => {
  const [comparisonKey, primaryKey] = (() => {
    if (kpiConfig.compareBy === 'metric') {
      return [kpiConfig.comparisonMetric, kpiConfig.primaryMetric];
    }

    return [kpiConfig.monthly.key, kpiConfig.monthly.key];
  })();

  return (dispatch) => {
    dispatch({
      type: actionTypes.GET_KPI_CARD_START,
      meta: { name: kpiConfig.monthly.key }
    });

    const compareByStartDate =
      kpiConfig.compareBy === 'metric'
        ? comparisonRange.primaryRangeStart.toISOString()
        : comparisonRange.secondaryRangeStart.toISOString();
    const compareByEndDate =
      kpiConfig.compareBy === 'metric'
        ? comparisonRange.primaryRangeEnd.toISOString()
        : comparisonRange.secondaryRangeEnd.toISOString();

    return Promise.all([
      contxtSdk[moduleConfig.name].getProxiedAssetMetricValues(
        [comparisonKey],
        [id],
        compareByStartDate,
        compareByEndDate
      ),
      contxtSdk[moduleConfig.name].getProxiedAssetMetricValues(
        [primaryKey],
        [id],
        comparisonRange.primaryRangeStart.toISOString(),
        comparisonRange.primaryRangeEnd.toISOString()
      )
    ])
      .then(([prev, curr]) => {
        prev = prev[id][comparisonKey][0] || {};
        curr = curr[id][primaryKey][0] || {};
        dispatch({
          type: actionTypes.GET_KPI_CARD_SUCCESS,
          meta: { name: kpiConfig.monthly.key },
          payload: { prev, curr, comparisonRange }
        });
      })
      .catch((err) => {
        const error = err.isAxiosError
          ? err.response.data.message
          : err.message;
        dispatch({
          type: actionTypes.GET_KPI_CARD_FAILURE,
          error: true,
          meta: { name: kpiConfig.monthly.key },
          payload: error
        });
      });
  };
};

export { getKpiCardData };
