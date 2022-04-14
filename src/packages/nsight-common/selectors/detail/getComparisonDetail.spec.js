import { expect } from 'chai';

import getComparisonDetail from './getComparisonDetail';

describe('nsight-facility-overview/src/redux/detail/selectors/getComparisonDetail', function() {
  it('selects based on the active metric', function() {
    const expectedObject = { test: 1 };
    const state = {
      router: { location: { query: { metric: 'activeMetric' } } },
      comparisonDetail: {
        comparisonDetailByMetric: {
          activeMetric: expectedObject,
          inactiveMetric: {}
        }
      }
    };

    const detail = getComparisonDetail(state);

    expect(detail).to.equal(expectedObject);
  });

  it('does not return if a metric is not selected', function() {
    const state = {
      router: { location: { query: { metric: null } } },
      comparisonDetail: {
        comparisonDetailByMetric: {
          metricA: {},
          metricB: {}
        }
      }
    };

    const detail = getComparisonDetail(state);

    expect(detail).to.equal(undefined);
  });
});
