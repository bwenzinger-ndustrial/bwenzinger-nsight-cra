import { expect } from 'chai';
import faker from 'faker';
import { uniq } from 'lodash';

import { fixtures } from '@ndustrial/nsight-test-utils';

import getFacilities from './getFacilities';

describe('nsight-common/selectors/getFacilities', function() {
  let expectedFacilitySlugs;
  let expectedFacilities;

  beforeEach(function() {
    expectedFacilitySlugs = uniq(
      fixtures
        .buildList('facility', faker.random.number({ min: 1, max: 10 }))
        .map(({ slug }) => slug)
    );
    expectedFacilities = expectedFacilitySlugs.reduce((memo, slug) => {
      memo[slug] = fixtures.build('facility', { slug });
      return memo;
    }, {});
  });

  it('returns an ordered list of facilities', function() {
    const facilities = getFacilities.resultFunc(
      expectedFacilities,
      expectedFacilitySlugs
    );

    expectedFacilitySlugs.forEach((slug, index) => {
      const facility = facilities[index];

      expect(facility).to.equal(expectedFacilities[slug]);
    });
  });
});
