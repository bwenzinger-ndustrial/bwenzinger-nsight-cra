import { expect } from 'chai';
import faker from 'faker';
import { uniqBy } from 'lodash';

import { fixtures } from '@ndustrial/nsight-test-utils';

import getSelectedOrganization from './getSelectedOrganization';

describe('nsight-common/selectors/organization/getSelectedOrganization', function() {
  let expectedOrganization;
  let organizationsMap;

  beforeEach(function() {
    const organizations = uniqBy(
      fixtures.buildList(
        'organization',
        faker.random.number({ min: 1, max: 10 })
      ),
      'slug'
    );
    organizationsMap = organizations.reduce((memo, organization) => {
      memo[organization.slug] = organization;
      return memo;
    }, {});
    expectedOrganization = faker.random.arrayElement(organizations);
  });

  it('returns the selected organization', function() {
    const organization = getSelectedOrganization.resultFunc(
      organizationsMap,
      expectedOrganization.slug
    );

    expect(organization).to.equal(expectedOrganization);
  });
});
