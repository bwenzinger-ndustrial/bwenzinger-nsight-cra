import { expect } from 'chai';
import faker from 'faker';

import makeHasEstimatedDataSelector from './makeEstimatedDataSelector';

describe('nsight-common/selectors/hasEstimatedData', function() {
  context('when on the dashboard page', function() {
    it('returns false when there is no kpi state', function() {
      const actual = makeHasEstimatedDataSelector(true, false).resultFunc({
        router: {
          location: { query: { metric: 'metricName' } }
        },
        comparisonDetail: { comparisonDetailByMetric: {} },
        primaryDetail: { primaryDetailByMetric: {} }
      });

      expect(actual).to.be.false();
    });

    it('returns false when there is kpi state but no prev and curr keys', function() {
      const kpiState = {
        [faker.random.word()]: {
          [faker.random.word]: faker.random.number()
        },
        [faker.random.word()]: {
          [faker.random.word]: faker.random.number()
        },
        [faker.random.word()]: {
          [faker.random.word]: faker.random.number()
        }
      };

      const actual = makeHasEstimatedDataSelector(false, false).resultFunc(
        {},
        kpiState,
        {},
        false
      );

      expect(actual).to.be.false();
    });
  });

  context('when on the detail page', function() {
    it('returns false when there is no primary or comparison detail state', function() {
      const actual = makeHasEstimatedDataSelector(true, false).resultFunc(
        {},
        {},
        {},
        true
      );

      expect(actual).to.be.false();
    });

    it('returns false when it has primary detail state and all isEstimated keys are set to false', function() {
      const primaryDetail = {
        isEstimated: false
      };
      const comparisonDetail = {
        isEstimated: false
      };

      const actual = makeHasEstimatedDataSelector(true, false).resultFunc(
        comparisonDetail,
        {},
        primaryDetail,
        true
      );

      expect(actual).to.be.false();
    });

    it('returns true when there is at least 1 isEstimated value set to true', function() {
      const primaryDetail = {
        isEstimated: true
      };
      const comparisonDetail = {
        isEstimated: false
      };

      const actual = makeHasEstimatedDataSelector(true, false).resultFunc(
        comparisonDetail,
        {},
        primaryDetail,
        true
      );

      expect(actual).to.be.true();
    });

    it('returns true when there is at least 1 isBreakdownEstimated value set to true', function() {
      const comparisonDetail = {
        breakdown: {
          [faker.random.word()]: {
            isBreakdownEstimated: false
          },
          [faker.random.word()]: {
            isBreakdownEstimated: false
          }
        }
      };
      const primaryDetail = {
        breakdown: {
          [faker.random.word()]: {
            isBreakdownEstimated: true
          },
          [faker.random.word()]: {
            isBreakdownEstimated: false
          }
        }
      };

      const actual = makeHasEstimatedDataSelector(true, false).resultFunc(
        comparisonDetail,
        {},
        primaryDetail,
        true
      );

      expect(actual).to.be.true();
    });
  });
});
