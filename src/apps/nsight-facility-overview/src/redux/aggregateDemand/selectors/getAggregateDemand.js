import { round } from 'lodash';
import { createSelector, createStructuredSelector } from 'reselect';

import { chartConfigurations } from '../../../helpers';
import { getDemandUnits } from '../../facilityMetadata/selectors';
import getAggregateDemandLoadingStatus from './getAggregateDemandLoadingStatus';

const aggregateDataSelector = (state) =>
  state.aggregateDemand ? state.aggregateDemand.values : [];

const aggregateDemandMetadata = (state) =>
  state.aggregateDemand && state.aggregateDemand.currDemandTotal
    ? state.aggregateDemand.currDemandTotal._metadata
    : {};

const emptyObject = {};

const monthPeakSelector = (state) =>
  state.aggregateDemand && state.aggregateDemand.monthPeak
    ? state.aggregateDemand.monthPeak
    : emptyObject;

const historicPeakSelector = (state) =>
  state.aggregateDemand && state.aggregateDemand.historicPeak
    ? state.aggregateDemand.historicPeak
    : emptyObject;

const currentTotalDemand = (state) =>
  state.aggregateDemand ? state.aggregateDemand.currDemandTotal : {};

const getAggregateDemandData = createSelector(
  aggregateDataSelector,
  currentTotalDemand,
  getDemandUnits,
  (data, currentTotal, units) => {
    const aggregateData = data.reduce(
      (memo, category) => {
        const roundedValue = category.value ? round(category.value, 3) : 0;

        if (category.value === 0) {
          memo.categoriesNoDemand.push({
            ...category,
            name: `${
              category.name
            } ${roundedValue} ${category.units.toUpperCase()}`,
            data: [roundedValue]
          });
        } else if (category.value > 0) {
          memo.categoryTotal += roundedValue;
          memo.categories.push({
            ...category,
            name: `${
              category.name
            } ${roundedValue} ${category.units.toUpperCase()}`,
            data: [roundedValue]
          });
        }

        return memo;
      },
      {
        categories: [],
        categoriesNoDemand: [],
        categoryTotal: 0
      }
    );

    const otherTotal = round(
      currentTotal.value - aggregateData.categoryTotal,
      3
    );

    if (otherTotal > 0) {
      aggregateData.categories.push({
        name: `Other ${otherTotal} ${units.toUpperCase()}`,
        data: [otherTotal],
        value: otherTotal
      });
    }

    aggregateData.totalDemand = {
      name: 'total demand',
      value: currentTotal.value
    };

    aggregateData.units = units;

    return aggregateData;
  }
);

const getAggregateDemandChartConfig = createSelector(
  [getAggregateDemandData, monthPeakSelector, historicPeakSelector],
  (aggregateDemandData, monthPeak, historicPeak) => {
    const chartConfigObj = {
      series: aggregateDemandData.categories,
      totalDemand: aggregateDemandData.totalDemand,
      categoryTotal: aggregateDemandData.categoryTotal,
      monthPeak,
      historicPeak,
      units: aggregateDemandData.units
    };

    const aggregateDemandChartConfig = chartConfigurations.getAggregateDemandChartConfig(
      chartConfigObj
    );

    return aggregateDemandChartConfig;
  }
);

const getAggregateDemandHasData = createSelector(
  aggregateDataSelector,
  (aggregateDemandData) => {
    if (aggregateDemandData) {
      return (
        aggregateDemandData.length > 0 || !!aggregateDemandData.currMonthMax
      );
    }
    return false;
  }
);

const getError = createSelector(
  aggregateDataSelector,
  (aggregateDemandData) => aggregateDemandData && aggregateDemandData.error
);

const getWarning = createSelector(
  aggregateDemandMetadata,
  (aggregateMetadata) => aggregateMetadata && aggregateMetadata.error
);

const getAggregateDemand = createStructuredSelector({
  chartOptions: getAggregateDemandChartConfig,
  error: getError,
  hasData: getAggregateDemandHasData,
  isLoading: getAggregateDemandLoadingStatus,
  warning: getWarning
});

export { currentTotalDemand as getCurrentDemand };
export default getAggregateDemand;
