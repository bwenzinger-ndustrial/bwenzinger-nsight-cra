import { expect } from 'chai';
import { push } from 'connected-react-router';
import faker from 'faker';
import sinon from 'sinon';

import { contxtSdk } from '@ndustrial/nsight-common/utils';
import { fixtures } from '@ndustrial/nsight-test-utils';

import { MODULE_PATHS_WITHOUT_FACILITY } from '../../constants';
import * as facilitiesActions from './actions';

describe('nsight-dashboard/redux/facilities/actions', function() {
  afterEach(function() {
    sinon.restore();
  });

  describe('loadFacilities', function() {
    let dispatch;

    beforeEach(function() {
      dispatch = sinon.stub();
    });

    context('when successfully getting facilities', function() {
      let expectedFacilities;
      let expectedFacilityGroupings;
      let organization;
      let promise;

      beforeEach(function() {
        organization = fixtures.build('organization');
        expectedFacilities = fixtures.buildList(
          'facility',
          faker.random.number({ min: 1, max: 10 }),
          { organizationId: organization.id }
        );
        expectedFacilityGroupings = fixtures.buildList(
          'facilityGrouping',
          faker.random.number({ min: 1, max: 10 })
        );

        sinon
          .stub(contxtSdk.nionic, 'executeQuery')
          .onFirstCall()
          .resolves({
            facilities: {
              nodes: expectedFacilities
            }
          })
          .onSecondCall()
          .resolves({
            facilityGroups: {
              nodes: expectedFacilityGroupings
            }
          });

        promise = facilitiesActions.loadFacilities(organization.id)(dispatch);
      });

      it('dispatches a LOAD_FACILITIES_START action', function() {
        return promise.then(() => {
          expect(dispatch).to.be.calledWith({
            type: 'LOAD_FACILITIES_START'
          });
        });
      });

      it('dispatches a LOAD_FACILITIES_SUCCESS action', function() {
        return promise.then(() => {
          expect(dispatch).to.be.calledWith({
            type: 'LOAD_FACILITIES_SUCCESS',
            payload: {
              facilities: expectedFacilities,
              groupings: expectedFacilityGroupings
            }
          });
        });
      });
    });
  });

  describe('setSelectedFacilitySlug', function() {
    context(
      'when state.facilities.selectedSlug is null and path is a module that does not need a facility',
      function() {
        let dispatch;
        let facilitySlug;
        let getState;
        let locationObj;
        let org;

        beforeEach(function() {
          dispatch = sinon.stub();
          facilitySlug = fixtures.build('facility').slug;
          org = fixtures.build('organization').slug;
          locationObj = {
            pathname: faker.random.arrayElement(MODULE_PATHS_WITHOUT_FACILITY),
            search: `organization=${encodeURIComponent(
              org
            )}&facility=${facilitySlug}`
          };

          getState = sinon.stub().returns({
            facilities: {
              selectedSlug: null
            },
            router: {
              location: {
                pathname: locationObj.pathname,
                search: locationObj.search
              }
            }
          });

          facilitiesActions.setSelectedFacilitySlug(
            facilitySlug
          )(dispatch, getState);
        });

        it('removes facility from the route', function() {
          expect(dispatch).to.be.calledWith(
            push({
              pathname: locationObj.pathname,
              search: `organization=${encodeURIComponent(org)}`
            })
          );
        });

        it('does not dispatch SET_SELECTED_FACILITY_SLUG', function() {
          expect(dispatch).to.not.be.calledWith({
            type: 'SET_SELECTED_FACILITY_SLUG',
            payload: facilitySlug
          });
        });
      }
    );

    context('when a facility is already selected', function() {
      let dispatch;
      let facilitySlug;
      let getState;

      beforeEach(function() {
        dispatch = sinon.stub();
        facilitySlug = fixtures.build('facility').slug;
        getState = sinon.stub().returns({
          facilities: {
            selectedSlug: fixtures.build('facility').slug
          },
          router: {
            location: {
              pathname: `/${faker.random.word()}`
            }
          }
        });

        facilitiesActions.setSelectedFacilitySlug(
          facilitySlug
        )(dispatch, getState);
      });

      it('dispatches SET_SELECTED_FACILITY_SLUG', function() {
        expect(dispatch).to.be.calledWith({
          type: 'SET_SELECTED_FACILITY_SLUG',
          payload: facilitySlug
        });
      });
    });
  });
});
