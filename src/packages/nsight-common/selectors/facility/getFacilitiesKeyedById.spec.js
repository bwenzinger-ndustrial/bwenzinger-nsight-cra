import { expect } from 'chai';
import faker from 'faker';

import { fixtures } from '@ndustrial/nsight-test-utils';

import getFacilitiesKeyedById from './getFacilitiesKeyedById';

describe('nsight-common/selectors/getFacilitiesKeyedById', function() {
  it('provides a object of facilities, keyed by their ID', function() {
    const facilities = fixtures.buildList(
      'facility',
      faker.random.number({ min: 1, max: 10 })
    );

    const facilitiesMap = getFacilitiesKeyedById.resultFunc(
      facilities.reduce((memo, facility) => {
        memo[facility.slug] = facility;
        return memo;
      }, {})
    );

    expect(facilitiesMap).to.be.an('object');
    expect(Object.keys(facilitiesMap)).to.have.length(facilities.length);

    facilities.forEach((facility) => {
      expect(facilitiesMap[facility.id]).to.equal(facility);
    });
  });
});
