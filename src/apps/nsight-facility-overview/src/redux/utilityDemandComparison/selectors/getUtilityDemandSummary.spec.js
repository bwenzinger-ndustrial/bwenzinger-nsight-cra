import { expect } from 'chai';
import _ from 'lodash';
import moment from 'moment';

import getUtilityDemandSummary from './getUtilityDemandSummary';

describe('nsight-facility-overview/src/redux/utilityDemandComparison/selectors/getUtilityDemandSummary', function() {
  it('accumulates all the points', function() {
    const demandSeriesData = _.times(12).reduce(
      (memo, i) => {
        const primaryMonth = moment()
          .startOf('month')
          .subtract(i, 'months');

        memo.primary.unshift({ x: primaryMonth.unix() * 1000, y: 2 });
        memo.comparison.unshift({
          x:
            primaryMonth
              .clone()
              .subtract(1, 'years')
              .unix() * 1000,
          y: 1
        });

        return memo;
      },
      {
        comparison: [],
        primary: []
      }
    );

    const result = getUtilityDemandSummary.resultFunc(demandSeriesData);

    expect(result.primaryTotal).to.equal(24);
    expect(result.comparisonTotal).to.equal(12);
  });
});

export default getUtilityDemandSummary;
