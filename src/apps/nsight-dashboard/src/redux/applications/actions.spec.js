import { expect } from 'chai';
import faker from 'faker';
import sinon from 'sinon';

import { contxtSdk } from '@ndustrial/nsight-common/utils';
import { fixtures } from '@ndustrial/nsight-test-utils';

import { getRoute } from '../../services/routeService';
import * as applicationActions from './actions';

describe('nsight-dashboard/redux/applications/actions', function() {
  beforeEach(function() {
    this.sandbox = sinon.createSandbox();
  });

  afterEach(function() {
    this.sandbox.restore();
  });

  describe('loadGroupings', function() {
    let dispatch;

    beforeEach(function() {
      dispatch = this.sandbox.stub();
    });

    context("when successfully getting the user's info", function() {
      let expectedApplicationId;
      let expectedApplicationGroupings;
      let promise;

      beforeEach(function() {
        expectedApplicationId = faker.random.uuid();
        expectedApplicationGroupings = fixtures.buildList(
          'applicationGrouping',
          faker.random.number({ min: 1, max: 10 }),
          { applicationId: expectedApplicationId }
        );

        this.sandbox
          .stub(contxtSdk.coordinator.applications, 'getGroupings')
          .resolves(expectedApplicationGroupings);

        promise = applicationActions.loadGroupings(expectedApplicationId)(
          dispatch
        );
      });

      it('dispatches a LOAD_USER_INFO_START action', function() {
        return promise.then(() => {
          expect(dispatch).to.be.calledWith({
            type: 'LOAD_APPLICATION_GROUPINGS_START'
          });
        });
      });

      it('gets the application groupings', function() {
        return promise.then(() => {
          expect(
            contxtSdk.coordinator.applications.getGroupings
          ).to.be.calledWith(expectedApplicationId);
        });
      });

      it('returns a resolved promise', function() {
        return expect(promise).to.be.fulfilled();
      });
    });

    context("when there is a problem getting the user's info", function() {
      let expectedError;
      let promise;

      beforeEach(function() {
        expectedError = new Error(faker.hacker.phrase());

        this.sandbox
          .stub(contxtSdk.coordinator.applications, 'getGroupings')
          .rejects(expectedError);

        promise = applicationActions.loadGroupings()(dispatch);
      });

      it('dispatches a LOAD_APPLICATION_GROUPINGS_FAILURE action', function() {
        return promise.then(expect.fail).catch(() => {
          expect(dispatch).to.be.calledWith({
            type: 'LOAD_APPLICATION_GROUPINGS_FAILURE',
            error: true,
            payload: expectedError
          });
        });
      });

      it('returns a rejected promise', function() {
        return expect(promise).to.be.rejectedWith(expectedError);
      });
    });
  });

  describe('setDefaultApplicationRoute', function() {
    context('when the user is at a path other than root', function() {
      let dispatch;
      let expectedDefaultApplicationRoute;
      let getState;

      beforeEach(function() {
        expectedDefaultApplicationRoute = getRoute(
          fixtures.build('applicationModule').slug
        ).path;

        dispatch = sinon.stub();
        getState = sinon.stub().returns({
          router: {
            location: {
              pathname: getRoute(fixtures.build('applicationModule').slug)
            }
          }
        });

        applicationActions.setDefaultApplicationRoute(
          expectedDefaultApplicationRoute
        )(dispatch, getState);
      });

      it('dispatches a SET_DEFAULT_APPLICATION_ROUTE action', function() {
        expect(dispatch).to.be.calledOnceWith({
          type: 'SET_DEFAULT_APPLICATION_ROUTE',
          payload: expectedDefaultApplicationRoute
        });
      });
    });

    context('when the user is at the root path', function() {
      let dispatch;
      let expectedDefaultApplicationRoute;
      let expectedSearchString;
      let getState;

      beforeEach(function() {
        expectedDefaultApplicationRoute = getRoute(
          fixtures.build('applicationModule').slug
        ).path;
        expectedSearchString = '?test=true';

        dispatch = sinon.stub();
        getState = sinon.stub().returns({
          router: {
            location: {
              pathname: '/',
              search: expectedSearchString
            }
          }
        });

        applicationActions.setDefaultApplicationRoute(
          expectedDefaultApplicationRoute
        )(dispatch, getState);
      });

      it('dispatches a SET_DEFAULT_APPLICATION_ROUTE action', function() {
        expect(dispatch).to.be.calledWith({
          type: 'SET_DEFAULT_APPLICATION_ROUTE',
          payload: expectedDefaultApplicationRoute
        });
      });

      it('dispatches a connected-react-router replace action', function() {
        expect(dispatch).to.be.calledWith({
          type: '@@router/CALL_HISTORY_METHOD',
          payload: {
            method: 'replace',
            args: [
              {
                pathname: `/${expectedDefaultApplicationRoute}`,
                search: expectedSearchString
              }
            ]
          }
        });
      });
    });
  });
});
