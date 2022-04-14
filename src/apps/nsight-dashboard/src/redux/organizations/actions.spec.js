import { expect } from 'chai';
import faker from 'faker';
import sinon from 'sinon';

import { contxtSdk } from '@ndustrial/nsight-common/utils';
import { fixtures } from '@ndustrial/nsight-test-utils';

import '@ndustrial/contxt-sdk/support/fixtures/factories/asset';
import '@ndustrial/contxt-sdk/support/fixtures/factories/assetType';

import * as organizationsActions from './actions';

describe('nsight-dashboard/redux/organizations/actions', function() {
  afterEach(function() {
    sinon.restore();
  });

  describe('loadOrganizations', function() {
    let dispatch;

    beforeEach(function() {
      dispatch = sinon.stub();
    });

    context('when successfully getting a list of organizations', function() {
      let expectedOrganizations;
      let promise;

      beforeEach(function() {
        expectedOrganizations = fixtures.buildList(
          'organization',
          faker.random.number({ min: 1, max: 10 })
        );

        sinon
          .stub(contxtSdk.coordinator.organizations, 'getAll')
          .resolves(expectedOrganizations);

        promise = organizationsActions.loadOrganizations()(dispatch);
      });

      it('dispatches a LOAD_ORGANIZATIONS_START action', function() {
        return promise.then(() => {
          expect(dispatch).to.be.calledWith({
            type: 'LOAD_ORGANIZATIONS_START'
          });
        });
      });

      it('gets a list of organizations', function() {
        return promise.then(() => {
          expect(contxtSdk.coordinator.organizations.getAll).to.be.calledOnce();
        });
      });

      it('dispatches a LOAD_ORGANIZATIONS_SUCCESS action', function() {
        return promise.then(() => {
          expect(dispatch).to.be.calledWith({
            type: 'LOAD_ORGANIZATIONS_SUCCESS',
            payload: {
              organizations: expectedOrganizations
            }
          });
        });
      });

      it('returns a resolved promise', function() {
        return expect(promise).to.be.fulfilled();
      });
    });
  });
});
