import { expect } from 'chai';
import faker from 'faker';
import sinon from 'sinon';

import { contxtSdk } from '@ndustrial/nsight-common/utils';
import { fixtures } from '@ndustrial/nsight-test-utils';

import * as themeService from '../../services/themeService';
import * as userActions from './actions';

describe('nsight-dashboard/redux/user/actions', function() {
  beforeEach(function() {
    this.sandbox = sinon.createSandbox();
  });

  afterEach(function() {
    this.sandbox.restore();
  });

  describe('loadUserInfo', function() {
    let dispatch;

    beforeEach(function() {
      dispatch = this.sandbox.stub();
    });

    context("when successfully getting the user's info", function() {
      let expectedProfile;
      let expectedTheme;
      let promise;

      beforeEach(function() {
        expectedProfile = fixtures.build('userProfile');
        expectedTheme = fixtures.build('theme');

        this.sandbox
          .stub(contxtSdk.auth, 'getProfile')
          .resolves(expectedProfile);
        this.sandbox.stub(themeService, 'getTheme').resolves(expectedTheme);

        promise = userActions.loadUserInfo()(dispatch);
      });

      it('dispatches a LOAD_USER_INFO_START action', function() {
        return promise.then(() => {
          expect(dispatch).to.be.calledWith({
            type: 'LOAD_USER_INFO_START'
          });
        });
      });

      it("gets the user's profile", function() {
        return promise.then(() => {
          expect(contxtSdk.auth.getProfile).to.be.calledOnce();
        });
      });

      it("gets the user's theme", function() {
        return promise.then(() => {
          expect(themeService.getTheme).to.be.calledOnce();
        });
      });

      it('dispatches a LOAD_USER_INFO_SUCCESS action', function() {
        return promise.then(() => {
          expect(dispatch).to.be.calledWith({
            type: 'LOAD_USER_INFO_SUCCESS',
            payload: {
              profile: expectedProfile,
              theme: expectedTheme
            }
          });
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

        this.sandbox.stub(contxtSdk.auth, 'getProfile').rejects(expectedError);
        this.sandbox.stub(contxtSdk.auth, 'logOut');

        promise = userActions.loadUserInfo()(dispatch);
      });

      it('dispatches a LOAD_USER_INFO_FAILURE action', function() {
        return promise.then(() => {
          expect(dispatch).to.be.calledWith({
            type: 'LOAD_USER_INFO_FAILURE',
            error: true,
            payload: expectedError
          });
        });
      });

      it('logs the user out', function() {
        return promise.then(() => {
          expect(contxtSdk.auth.logOut).to.be.calledOnce();
        });
      });
    });
  });

  describe('logOutUser', function() {
    let dispatch;

    beforeEach(function() {
      dispatch = this.sandbox.stub();
    });

    context('when successfully logging out the user', function() {
      let logOut;

      beforeEach(function() {
        logOut = this.sandbox.stub(contxtSdk.auth, 'logOut');

        userActions.logOutUser()(dispatch);
      });

      it('dispatches a LOG_OUT_USER_START action', function() {
        expect(dispatch).to.be.calledWith({
          type: 'LOG_OUT_USER_START'
        });
      });

      it('redirects to the Auth0 user log out URL', function() {
        expect(logOut).to.be.calledOnce();
      });
    });

    context('when failing to log out the user', function() {
      let expectedError;

      beforeEach(function() {
        expectedError = new Error(faker.hacker.phrase());

        this.sandbox.stub(contxtSdk.auth, 'logOut').throws(expectedError);
      });

      it('dispatches a LOAD_USER_INFO_FAILURE action', function() {
        try {
          userActions.logOutUser()(dispatch);
        } catch {
          expect(dispatch).to.be.calledWith({
            type: 'LOG_OUT_USER_FAILURE',
            error: true,
            payload: expectedError
          });
        }
      });

      it('throws with the error', function() {
        expect(() => userActions.logOutUser()(dispatch)).to.throw(
          expectedError
        );
      });
    });
  });
});
