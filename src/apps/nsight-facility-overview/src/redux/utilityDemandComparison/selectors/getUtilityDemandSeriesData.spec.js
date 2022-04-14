import { expect } from 'chai';
import _ from 'lodash';
import moment from 'moment';

import getUtilityDemandSeriesData from './getUtilityDemandSeriesData';

describe('nsight-facility-overview/src/redux/utilityDemandComparison/selectors/getUtilityDemandSeriesData', function() {
  it('fills in missing months', function() {
    const months = [
      ..._.times(12, (i) =>
        moment()
          .startOf('month')
          .subtract(i, 'months')
          .format('YYYY-MM')
      ),
      ..._.times(2, (i) =>
        moment()
          .startOf('month')
          .subtract(22 + i, 'months')
          .format('YYYY-MM')
      )
    ].reverse();
    const demandSeriesData = months.reduce((memo, month) => {
      memo[month] = 1;
      return memo;
    }, {});

    const result = getUtilityDemandSeriesData.resultFunc(demandSeriesData);

    expect(result.primary.length).to.equal(12);
    expect(result.comparison.length).to.equal(12);

    const expectedDate = moment(months[1], 'YYYY-MM').add(1, 'months');
    for (let i = 2; i < result.comparison.length; i += 1) {
      expect(result.comparison[i].x).to.equal(expectedDate.unix() * 1000);
      expect(result.comparison[i].y).to.equal(null);
      expectedDate.add(1, 'month');
    }
  });

  it('returns the last 24 months of data', function() {
    const outOfBoundsMonth = '2017-01';
    const outOfBoundsValue = 10;

    const demandSeriesData = _.times(24, (i) =>
      moment()
        .startOf('month')
        .subtract(i, 'months')
        .format('YYYY-MM')
    )
      .reverse()
      .reduce(
        (memo, month) => {
          memo[month] = 1;
          return memo;
        },
        { [outOfBoundsMonth]: outOfBoundsValue }
      );

    const result = getUtilityDemandSeriesData.resultFunc(demandSeriesData);

    expect(result.primary.length).to.equal(12);
    expect(result.comparison.length).to.equal(12);

    for (let i = 0; i < 12; i += 1) {
      expect(result.primary[i].x).to.not.equal(
        moment(outOfBoundsMonth, 'YYYY-MM').unix() * 1000
      );
      expect(result.comparison[i].x).to.not.equal(
        moment(outOfBoundsMonth, 'YYYY-MM').unix() * 1000
      );
      expect(result.primary[i].y).to.not.equal(outOfBoundsValue);
      expect(result.comparison[i].y).to.not.equal(outOfBoundsValue);
    }
  });
});
