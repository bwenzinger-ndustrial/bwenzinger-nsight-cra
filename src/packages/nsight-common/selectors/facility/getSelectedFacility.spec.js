import { expect } from 'chai';
import faker from 'faker';

import { fixtures } from '@ndustrial/nsight-test-utils';

import getSelectedFacility from './getSelectedFacility';

describe('nsight-common/selectors/getSelectedFacility', function() {
  let expectedFacility;
  let facilitiesMap;

  beforeEach(function() {
    const facilities = fixtures.buildList(
      'facility',
      faker.random.number({ min: 1, max: 10 })
    );
    facilitiesMap = facilities.reduce((memo, facility) => {
      memo[facility.slug] = facility;
      return memo;
    }, {});
    expectedFacility = faker.random.arrayElement(facilities);
  });

  it('returns the selected facility', function() {
    const facility = getSelectedFacility.resultFunc(
      facilitiesMap,
      expectedFacility.slug
    );

    expect(facility).to.equal(expectedFacility);
  });
});
