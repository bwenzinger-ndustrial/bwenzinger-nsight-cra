import _ from 'lodash';
import { createSelector } from 'reselect';

import commonChartUtils from '@ndustrial/nsight-common/charts/commonChartUtils';

const getKpiCardState = (state) => (state.kpiCard ? state.kpiCard : null);

const getKpiCardFactory = (config) => {
  return createSelector(
    getKpiCardState,
    (kpiCard) => {
      const {
        monthly: { key },
        compareBy,
        significantDigits
      } = config;
      if (
        !(kpiCard && kpiCard[key] && kpiCard[key].curr && kpiCard[key].prev)
      ) {
        return {};
      }

      const { curr, prev, comparisonRange } = kpiCard[key];

      const currFloat = parseFloat(curr.value);
      const prevFloat = parseFloat(prev.value);

      const percentChange = commonChartUtils.getPercentChange(
        prevFloat,
        currFloat
      );

      const changeDateFormat = {
        format: "MMM 'YY",
        current: comparisonRange.primaryRangeEnd.format("MMM 'YY"),
        previous: comparisonRange.secondaryRangeEnd.format("MMM 'YY")
      };

      let value;
      let comparisonValue;

      if (curr && currFloat) {
        value = _.round(currFloat, significantDigits);
      }

      if (prev && prevFloat) {
        comparisonValue = _.round(prevFloat, significantDigits);
      }

      return {
        changeDirection: commonChartUtils.getChangeDirection(
          prevFloat,
          currFloat,
          compareBy
        ),
        changeDate: changeDateFormat,
        isEstimated: curr.isEstimated || prev.isEstimated,
        percentChange,
        value,
        comparisonValue
      };
    }
  );
};

export default getKpiCardFactory;
