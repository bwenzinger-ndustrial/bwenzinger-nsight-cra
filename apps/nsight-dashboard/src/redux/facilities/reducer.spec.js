import { expect } from 'chai';
import faker from 'faker';

import { fixtures } from '@ndustrial/nsight-test-utils';

import facilitiesReducer, { INITIAL_STATE } from './reducer';

describe('nsight-dashboard/redux/facilities/reducer', function() {
  it('returns the initial state', function() {
    expect(facilitiesReducer(undefined, {})).to.equal(INITIAL_STATE);
  });

  describe('LOAD_FACILITIES_SUCCESS', function() {
    let allFacilities;
    let facilityGroupings;
    let nextState;
    let organizationId;
    let disabledFacility;

    beforeEach(function() {
      organizationId = fixtures.build('organization').id;
      disabledFacility = fixtures.build('facility', {
        nSight2Active: false
      });
      allFacilities = [];
      allFacilities.push(
        fixtures.build('facility', {
          parentId: 1,
          nSight2Active: true
        })
      );
      allFacilities.push(
        fixtures.build('facility', {
          parentId: 2,
          nSight2Active: true
        })
      );
      allFacilities.push(
        fixtures.build('facility', {
          parentId: 100,
          nSight2Active: true
        })
      );
      allFacilities.push(disabledFacility);

      facilityGroupings = [
        {
          id: 1,
          name: 'a',
          parentId: null,
          facilities: {
            nodes: [allFacilities[0], allFacilities[3]]
          }
        },
        {
          id: 2,
          name: 'b',
          parentId: 1,
          facilities: {
            nodes: [allFacilities[1]]
          }
        },
        {
          id: 100,
          name: 'uncategorized',
          parentId: 99,
          facilities: {
            nodes: [allFacilities[2]]
          }
        }
      ];

      nextState = facilitiesReducer(INITIAL_STATE, {
        type: 'LOAD_FACILITIES_SUCCESS',
        payload: {
          organizationId,
          facilities: allFacilities,
          groupings: facilityGroupings
        }
      });
    });

    it('stores the facilities in alphabetical order by name via facility slug', function() {
      const sortedFacilities = nextState.orderedItemSlugs.map(
        (slug) => nextState.items[slug]
      );

      expect(sortedFacilities).to.be.ascendingBy('name');
    });

    it('filters facilities that are not active', function() {
      const sortedFacilities = nextState.orderedItemSlugs.map(
        (slug) => nextState.items[slug]
      );

      expect(sortedFacilities).to.not.contain(disabledFacility);
    });
  });

  describe('RESET_FACILITIES', function() {
    let nextState;

    beforeEach(function() {
      const facilities = fixtures.buildList(
        'facility',
        faker.random.number({ min: 1, max: 5 })
      );
      const previousState = {
        ...INITIAL_STATE,
        groupings: fixtures.buildList(
          'facilityGrouping',
          faker.random.number({ min: 1, max: 10 })
        ),
        items: facilities.reduce((memo, facility) => {
          memo[facility.slug] = facility;
          return memo;
        }, {}),
        orderedItemSlugs: facilities.map(({ slug }) => slug)
      };

      nextState = facilitiesReducer(previousState, {
        type: 'RESET_FACILITIES'
      });
    });

    it('sets the facility groupings to their initial state', function() {
      expect(nextState.groupings).to.equal(INITIAL_STATE.groupings);
    });

    it('sets the keyed collection of facilities to its initial state', function() {
      expect(nextState.items).to.equal(INITIAL_STATE.items);
    });

    it('sets the ordered list of facilities to its initial state', function() {
      expect(nextState.orderedItemSlugs).to.equal(
        INITIAL_STATE.orderedItemSlugs
      );
    });
  });

  describe('SET_SELECTED_FACILITY_SLUG', function() {
    let facilitySlug;
    let nextState;

    beforeEach(function() {
      facilitySlug = fixtures.build('facility').slug;

      nextState = facilitiesReducer(INITIAL_STATE, {
        type: 'SET_SELECTED_FACILITY_SLUG',
        payload: facilitySlug
      });
    });

    it('stores the facility slug', function() {
      expect(nextState.selectedSlug).to.equal(facilitySlug);
    });
  });
});
