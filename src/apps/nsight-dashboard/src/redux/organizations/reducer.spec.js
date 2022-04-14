import { expect } from 'chai';
import faker from 'faker';
import { uniqBy } from 'lodash';

import { fixtures } from '@ndustrial/nsight-test-utils';

import '@ndustrial/contxt-sdk/support/fixtures/factories/asset';

import organizationsReducer, { INITIAL_STATE } from './reducer';

describe('nsight-dashboard/redux/applications/reducer', function() {
  it('returns the initial state', function() {
    expect(organizationsReducer(undefined, {})).to.equal(INITIAL_STATE);
  });

  describe('LOAD_ORGANIZATIONS_SUCCESS', function() {
    context('when there are multiple organizations', function() {
      let expectedOrganizations;
      let nextState;
      let prevState;

      beforeEach(function() {
        const organizations = uniqBy(
          fixtures.buildList(
            'organization',
            faker.random.number({ min: 5, max: 20 })
          ),
          'slug'
        );
        expectedOrganizations = organizations.reduce(
          (memo, organization, index) => {
            memo[organization.slug] = {
              ...organization
            };
            return memo;
          },
          {}
        );

        prevState = {
          ...INITIAL_STATE,
          selectedSlug: faker.random.arrayElement([
            null,
            faker.random.arrayElement(organizations).slug
          ])
        };

        nextState = organizationsReducer(prevState, {
          type: 'LOAD_ORGANIZATIONS_SUCCESS',
          payload: { organizations }
        });
      });

      it('stores the organizations', function() {
        expect(nextState.items).to.deep.equal(expectedOrganizations);
      });

      it('stores the organizations in alphabetical order by name via organization slug', function() {
        const sortedOrganizations = nextState.orderedItemSlugs.map(
          (slug) => nextState.items[slug]
        );

        expect(sortedOrganizations).to.be.ascendingBy('name');
      });

      it('leaves any previous selectedSlug value', function() {
        expect(nextState.selectedSlug).to.equal(prevState.selectedSlug);
      });
    });

    context('when there is a single organization', function() {
      let organizations;
      let nextState;

      beforeEach(function() {
        organizations = [fixtures.build('organization')];

        nextState = organizationsReducer(INITIAL_STATE, {
          type: 'LOAD_ORGANIZATIONS_SUCCESS',
          payload: { organizations }
        });
      });

      it('sets the organization as the selected organization', function() {
        expect(nextState.selectedSlug).to.equal(organizations[0].slug);
      });
    });
  });

  describe('SET_SELECTED_ORGANIZATION_SLUG', function() {
    let expectedOrganizationSlug;
    let nextState;

    beforeEach(function() {
      expectedOrganizationSlug = fixtures.build('organization').slug;

      nextState = organizationsReducer(INITIAL_STATE, {
        type: 'SET_SELECTED_ORGANIZATION_SLUG',
        payload: expectedOrganizationSlug
      });
    });

    it('stores the organizations', function() {
      expect(nextState.selectedSlug).to.equal(expectedOrganizationSlug);
    });
  });
});
