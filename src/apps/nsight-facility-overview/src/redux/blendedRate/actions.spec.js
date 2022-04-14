import { expect } from 'chai';
import faker from 'faker';
import sinon from 'sinon';

import EmsModule, {
  moduleConfig
} from '@ndustrial/nsight-common/services/EmsModule';
import { contxtSdk } from '@ndustrial/nsight-common/utils';

import fixture from '../../../test/fixtures/factories';
import * as blendedRateActions from './actions';
import actionTypes from './actionTypes';

describe('nsight-facility-overview/redux/blendedRate/actions', function() {
  let facilityId;
  let prev;
  let curr;

  before(function() {
    contxtSdk.mountDynamicModule(moduleConfig.name, {
      clientId: moduleConfig.clientId,
      host: moduleConfig.host,
      module: EmsModule
    });
  });

  after(function() {
    contxtSdk.unmountDynamicModule(moduleConfig.name);
  });

  beforeEach(function() {
    facilityId = faker.random.number();
  });

  afterEach(function() {
    sinon.restore();
  });

  describe('get blended rate data', function() {
    let dispatch;

    beforeEach(function() {
      dispatch = sinon.stub();
      curr = fixture.buildList(
        'blendedRate',
        faker.random.number({ min: 1, max: 10 })
      );
      prev = fixture.buildList(
        'blendedRate',
        faker.random.number({ min: 1, max: 10 })
      );
    });

    context('when successfully getting blended rate data', function() {
      let promise;

      beforeEach(function() {
        sinon
          .stub(contxtSdk[moduleConfig.name], 'getProxiedAssetMetricValues')
          .onCall(0)
          .resolves({
            [facilityId]: {
              [blendedRateActions.ASSET_METRIC_LABEL]: prev
            }
          })
          .onCall(1)
          .resolves({
            [facilityId]: {
              [blendedRateActions.ASSET_METRIC_LABEL]: curr
            }
          });

        promise = blendedRateActions.getBlendedRateData(facilityId)(dispatch);
      });

      it(`dispatches a ${actionTypes.BLENDED_RATE_GET_START} action`, function() {
        return promise.then(() => {
          expect(dispatch).to.be.calledWith({
            type: actionTypes.BLENDED_RATE_GET_START
          });
        });
      });

      it(`dispatches a ${actionTypes.BLENDED_RATE_GET_SUCCESS} action`, function() {
        return promise.then(() => {
          expect(dispatch).to.be.calledWith({
            type: actionTypes.BLENDED_RATE_GET_SUCCESS,
            payload: { prev, curr }
          });
        });
      });

      it('returns a resolved promise', function() {
        return expect(promise).to.be.fulfilled();
      });
    });

    context('when there is an issue getting the blended rate', function() {
      let expectedErrorMessage;
      let expectedError;
      let promise;

      beforeEach(function() {
        expectedErrorMessage = faker.hacker.phrase();
        expectedError = new Error(expectedErrorMessage);
        sinon
          .stub(contxtSdk[moduleConfig.name], 'getProxiedAssetMetricValues')
          .rejects(expectedError);

        promise = blendedRateActions.getBlendedRateData(facilityId)(dispatch);
      });

      it(`dispatches a ${actionTypes.BLENDED_RATE_GET_FAILURE} action`, function() {
        return promise.then(expect.fail).catch(() => {
          expect(dispatch).to.be.calledWith({
            type: actionTypes.BLENDED_RATE_GET_FAILURE,
            error: true,
            payload: expectedErrorMessage
          });
        });
      });
    });
  });
});
