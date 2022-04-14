import { round } from 'lodash';
import { createSelector } from 'reselect';

import { CO2_METRIC_KEY, SUMMARY_CONFIG } from '../../constants/equivalencies';
import getSelectedAssetType from './getSelectedAssetType';

const getComparisonEmissions = (state) => state.comparisonEmissions.data;
const getPrimaryEmissions = (state) => state.primaryEmissions.data;

const getSummaryValues = createSelector(
  getComparisonEmissions,
  getPrimaryEmissions,
  getSelectedAssetType,
  (comparisonEmissions, primaryEmissions, selectedAssetType) => {
    const summaryValues = [];
    const co2MetricKey = CO2_METRIC_KEY[selectedAssetType];

    const getEmissionsDif = () => {
      if (
        !primaryEmissions ||
        !comparisonEmissions ||
        !primaryEmissions[co2MetricKey] ||
        !comparisonEmissions[co2MetricKey]
      ) {
        return 0;
      } else {
        const primaryValue = primaryEmissions[co2MetricKey].reduce(function(
          acc,
          val
        ) {
          return acc + val.value;
        },
        0);
        const comparisonValue = comparisonEmissions[co2MetricKey].reduce(
          function(acc, val) {
            return acc + val.value;
          },
          0
        );

        return primaryValue - comparisonValue;
      }
    };

    const emissionsDiff = getEmissionsDif();

    const getValue = (emissionsDiff, config) => {
      if (!config.summaryConfigKey) {
        return emissionsDiff * config.factor;
      } else if (config.summaryConfigKey) {
        return 0;
      } else {
        return emissionsDiff;
      }
    };

    const getCalculatedValue = (item, summary) => {
      const summaryConfigKey = SUMMARY_CONFIG.find(
        (x) => x.summaryConfigKey === item.summaryConfigKey
      );

      const summaryItem = summary.find(
        (x) => x.config.key === summaryConfigKey.summaryConfigKey
      );

      item.value = summaryItem.value * summaryConfigKey.factor;

      return item.value;
    };

    const percentChange = round(
      ((comparisonEmissions - primaryEmissions) / Math.abs(primaryEmissions)) *
        100
    );

    SUMMARY_CONFIG.forEach((config) => {
      summaryValues.push({
        value: comparisonEmissions ? getValue(emissionsDiff, config) : '--',
        percentChange:
          comparisonEmissions && config.showPercent ? percentChange : null,
        config: config
      });
    });

    // If value is based on another calculated summary item,
    // find that value and multiply by factor
    SUMMARY_CONFIG.forEach((item) => {
      if (item.summaryConfigKey) {
        const summaryItem = summaryValues.find(
          (x) => x.config.summaryConfigKey === item.summaryConfigKey
        );
        summaryItem.value = getCalculatedValue(item, summaryValues);
      }
    });

    return summaryValues;
  }
);

export default getSummaryValues;
