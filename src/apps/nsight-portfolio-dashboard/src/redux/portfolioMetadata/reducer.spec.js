import { expect } from 'chai';

import metadataReducer, { INITIAL_STATE } from './reducer';

describe('nsight-portfolio-dashboard/redux/portfolioMetadata/reducer', function() {
  it('returns the initial state', function() {
    expect(metadataReducer(undefined, {})).to.equal(INITIAL_STATE);
  });

  describe('SET_RANGE_END', function() {
    let nextState;

    [
      {
        currentMonth: 1,
        currentYear: 2020,
        expectedPrimaryRangeStart: '2019-02-01T00:00:00.000Z',
        expectedPrimaryRangeEnd: '2020-01-31T23:59:59.999Z',
        expectedSecondaryRangeStart: '2018-02-01T00:00:00.000Z',
        expectedSecondaryRangeEnd: '2019-01-31T23:59:59.999Z'
      },
      {
        currentMonth: 2,
        currentYear: 2017,
        expectedPrimaryRangeStart: '2016-03-01T00:00:00.000Z',
        expectedPrimaryRangeEnd: '2017-02-28T23:59:59.999Z',
        expectedSecondaryRangeStart: '2015-03-01T00:00:00.000Z',
        expectedSecondaryRangeEnd: '2016-02-29T23:59:59.999Z'
      },
      {
        currentMonth: 2,
        currentYear: 2018,
        expectedPrimaryRangeStart: '2017-03-01T00:00:00.000Z',
        expectedPrimaryRangeEnd: '2018-02-28T23:59:59.999Z',
        expectedSecondaryRangeStart: '2016-03-01T00:00:00.000Z',
        expectedSecondaryRangeEnd: '2017-02-28T23:59:59.999Z'
      },
      {
        currentMonth: 2,
        currentYear: 2019,
        expectedPrimaryRangeStart: '2018-03-01T00:00:00.000Z',
        expectedPrimaryRangeEnd: '2019-02-28T23:59:59.999Z',
        expectedSecondaryRangeStart: '2017-03-01T00:00:00.000Z',
        expectedSecondaryRangeEnd: '2018-02-28T23:59:59.999Z'
      },
      {
        currentMonth: 2,
        currentYear: 2020,
        expectedPrimaryRangeStart: '2019-03-01T00:00:00.000Z',
        expectedPrimaryRangeEnd: '2020-02-29T23:59:59.999Z',
        expectedSecondaryRangeStart: '2018-03-01T00:00:00.000Z',
        expectedSecondaryRangeEnd: '2019-02-28T23:59:59.999Z'
      },
      {
        currentMonth: 11,
        currentYear: 2019,
        expectedPrimaryRangeStart: '2018-12-01T00:00:00.000Z',
        expectedPrimaryRangeEnd: '2019-11-30T23:59:59.999Z',
        expectedSecondaryRangeStart: '2017-12-01T00:00:00.000Z',
        expectedSecondaryRangeEnd: '2018-11-30T23:59:59.999Z'
      },
      {
        currentMonth: 12,
        currentYear: 2019,
        expectedPrimaryRangeStart: '2019-01-01T00:00:00.000Z',
        expectedPrimaryRangeEnd: '2019-12-31T23:59:59.999Z',
        expectedSecondaryRangeStart: '2018-01-01T00:00:00.000Z',
        expectedSecondaryRangeEnd: '2018-12-31T23:59:59.999Z'
      }
    ].forEach((date) => {
      context(
        `Current Date: ${date.currentMonth}-${date.currentYear}`,
        function() {
          beforeEach(function() {
            nextState = metadataReducer(INITIAL_STATE, {
              type: 'SET_RANGE_END',
              payload: {
                month: date.currentMonth,
                year: date.currentYear
              }
            });
          });

          it('sets the current date', function() {
            expect(nextState).to.include({
              currentMonth: date.currentMonth,
              currentYear: date.currentYear
            });
          });

          it('sets the primary range', function() {
            expect(nextState).to.include({
              primaryRangeStart: date.expectedPrimaryRangeStart,
              primaryRangeEnd: date.expectedPrimaryRangeEnd
            });
          });

          it('sets the secondary range', function() {
            expect(nextState).to.include({
              secondaryRangeStart: date.expectedSecondaryRangeStart,
              secondaryRangeEnd: date.expectedSecondaryRangeEnd
            });
          });
        }
      );
    });
  });
});
