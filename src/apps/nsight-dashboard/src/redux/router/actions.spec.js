import { expect } from 'chai';
import { push } from 'connected-react-router';
import faker from 'faker';
import sinon from 'sinon';

import { fixtures } from '@ndustrial/nsight-test-utils';

import { MODULE_PATHS_WITHOUT_FACILITY } from '../../constants';
import * as facilityActions from '../facilities/actions';
import * as routerActions from './actions';

describe('nsight-dashboard/redux/router/actions', function() {
  afterEach(function() {
    sinon.restore();
  });

  describe('changeRoute', function() {
    context(
      'when the path is is to a module that does not need a facility',
      function() {
        let dispatch;
        let locationObj;
        let org;
        let setSelectedFacility;

        beforeEach(function() {
          const facility = fixtures.build('facility').slug;

          org = fixtures.build('organization').slug;
          dispatch = sinon.stub();
          locationObj = {
            pathname: faker.random.arrayElement(MODULE_PATHS_WITHOUT_FACILITY),
            search: `organization=${encodeURIComponent(
              org
            )}&facility=${facility}`
          };
          setSelectedFacility = sinon.stub(
            facilityActions,
            'setSelectedFacilitySlug'
          );

          routerActions.changeRoute(locationObj)(dispatch);
        });

        it('resets the facility slug', function() {
          expect(setSelectedFacility).to.be.calledWith(null);
        });

        it('removes the facility from the query params', function() {
          expect(dispatch).to.be.calledWith(
            push({
              pathname: locationObj.pathname,
              search: `organization=${encodeURIComponent(org)}`
            })
          );
        });
      }
    );

    context(
      'when the path is anything other than /portfolio-overview',
      function() {
        let dispatch;
        let locationObj;
        let org;
        let path;
        let setSelectedFacility;

        beforeEach(function() {
          const facility = fixtures.build('facility').slug;

          org = fixtures.build('organization').slug;
          path = faker.random.word;
          dispatch = sinon.stub();
          locationObj = {
            pathname: `/${path}`,
            search: `organization=${org}&facility=${facility}`
          };
          setSelectedFacility = sinon.stub(
            facilityActions,
            'setSelectedFacilitySlug'
          );

          routerActions.changeRoute(locationObj)(dispatch);
        });

        it('does not reset the facility slug', function() {
          expect(setSelectedFacility).to.not.be.called();
        });

        it('changes the route', function() {
          expect(dispatch).to.be.calledWith(
            push({
              pathname: locationObj.pathname,
              search: locationObj.search
            })
          );
        });
      }
    );
  });
});
