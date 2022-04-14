import { expect } from 'chai';
import faker from 'faker';
import { uniq } from 'lodash';

import { fixtures } from '@ndustrial/nsight-test-utils';

import getOrganizations from './getOrganizations';

describe('nsight-common/selectors/organization/getOrganizations', function() {
  let expectedOrganizationSlugs;
  let expectedOrganizations;

  beforeEach(function() {
    expectedOrganizationSlugs = uniq(
      fixtures
        .buildList('organization', faker.random.number({ min: 1, max: 10 }))
        .map(({ slug }) => slug)
    );
    expectedOrganizations = expectedOrganizationSlugs.reduce((memo, slug) => {
      memo[slug] = fixtures.build('organization', { slug });
      return memo;
    }, {});
  });

  it('returns an ordered list of organizations', function() {
    const organizations = getOrganizations.resultFunc(
      expectedOrganizations,
      expectedOrganizationSlugs
    );

    expectedOrganizationSlugs.forEach((slug, index) => {
      const organization = organizations[index];

      expect(organization).to.equal(expectedOrganizations[slug]);
    });
  });
});
