import { expect } from 'chai';
import _ from 'lodash';

import { fixtures } from '@ndustrial/nsight-test-utils';

import mergeSeasons from './mergeSeasons';

describe('nsight-rate-tariffs/helpers/mergeSeasons', function() {
  let expectedSeasons;
  let initialSeasons;

  beforeEach(function() {
    expectedSeasons = _.times(3, (index) => {
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
    initialSeasons = expectedSeasons.reduce(
      (memo, season) => {
        memo.energy.push(season.energySeason);
        memo.demand.push(season.demandSeason);

        return memo;
      },
      { energy: [], demand: [] }
    );
  });

  it('merges like-named energy and demand seasons', function() {
    expect(
      mergeSeasons(initialSeasons.energy, initialSeasons.demand)
    ).to.deep.equal(expectedSeasons);
  });

  it('ignores flat rate demand seasons', function() {
    const flatRateSeason = fixtures.build(
      'rateSeason',
      {
        ...initialSeasons.demand[0],
        seasonType: 'flat'
      },
      { type: 'demand' }
    );
    initialSeasons.demand.push(flatRateSeason);

    const mergedSeasons = mergeSeasons(
      initialSeasons.energy,
      initialSeasons.demand
    );

    expect(mergedSeasons[0].demandSeason).to.not.equal(flatRateSeason);
  });
});
