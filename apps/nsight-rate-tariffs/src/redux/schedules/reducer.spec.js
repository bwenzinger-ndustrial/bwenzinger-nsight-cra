import { expect } from 'chai';
import faker from 'faker';
import _ from 'lodash';

import { fixtures } from '@ndustrial/nsight-test-utils';

import schedulesReducer, { INITIAL_STATE } from './reducer';

describe('nsight-rate-tariffs/redux/schedules/reducer', function() {
  it('returns the initial state', function() {
    expect(schedulesReducer(undefined, {})).to.equal(INITIAL_STATE);
  });

  describe('LOAD_RATE_SCHEDULES_SUCCESS', function() {
    let orderedRateSchedules;
    let nextState;
    let rateSeasons;

    beforeEach(function() {
      orderedRateSchedules = fixtures.buildList(
        'rateSchedule',
        faker.random.number({ min: 1, max: 10 })
      );
      rateSeasons = orderedRateSchedules.map(() => {
        return _.times(3, (index) => {
          const seasonName = `Season ${index + 1}`;
          const slug = `season-${index + 1}`;

          return {
            seasonName,
            slug,
            demandSeason: fixtures.build(
              'rateSeason',
              { seasonName },
              { type: 'demand' }
            ),
            energySeason: fixtures.build(
              'rateSeason',
              { seasonName },
              { type: 'energy' }
            )
          };
        });
      });

      nextState = schedulesReducer(INITIAL_STATE, {
        type: 'LOAD_RATE_SCHEDULES_SUCCESS',
        payload: {
          schedules: orderedRateSchedules.map((schedule, index) => {
            return {
              ...schedule,
              demandSeasons: rateSeasons[index].map(
                (season) => season.demandSeason
              ),
              energySeasons: rateSeasons[index].map(
                (season) => season.energySeason
              )
            };
          })
        }
      });
    });

    it('stores the original order of the rate schedules', function() {
      expect(nextState.orderedItemIds).to.deep.equal(
        orderedRateSchedules.map((schedule) => schedule.id)
      );
    });
  });
});
