import { expect } from 'chai';

import getPrimaryDetail from './getPrimaryDetail';

describe('nsight-facility-overview/src/redux/detail/selectors/getPrimaryDetail', function() {
  it('selects based on the active metric', function() {
    const expectedObject = { test: 1 };
    const state = {
      router: { location: { query: { metric: 'activeMetric' } } },
      primaryDetail: {
        primaryDetailByMetric: {
          activeMetric: expectedObject,
          inactiveMetric: {}
        }
      }
    };

    const detail = getPrimaryDetail(state);

    expect(detail).to.equal(expectedObject);
  });

  it('does not return if a metric is not selected', function() {
    const state = {
      router: { location: { query: { metric: null } } },
      primaryDetail: {
        primaryDetailByMetric: {
          metricA: {},
          metricB: {}
        }
      }
    };

    const detail = getPrimaryDetail(state);

    expect(detail).to.equal(undefined);
  });
});
