import { expect } from 'chai';
import faker from 'faker';
import sinon from 'sinon';

import { contxtSdk } from '@ndustrial/nsight-common/utils';

import EmsModule from '../../services/EmsModule';
import * as aggregateDemandActions from './actions';

describe('nsight-facility-overview/redux/aggregateDemand/actions', function() {
  before(function() {
    contxtSdk.mountDynamicModule('facilityEms', {
      clientId: contxtSdk.config.audiences.ems.clientId,
      host: contxtSdk.config.audiences.ems.host,
      module: EmsModule
    });
  });

  afterEach(function() {
    sinon.restore();
  });

  after(function() {
    contxtSdk.unmountDynamicModule('facilityEms');
  });

  describe('getCurrentTotalDemand', function() {
    let dispatch;
    let facilityId;
    let units;

    beforeEach(function() {
      dispatch = sinon.stub();
      facilityId = faker.random.number();
      units = 'kW';
    });

    context('when successfully getting current total demand', function() {
      let expectedResponse;
      let promise;

      beforeEach(function() {
        expectedResponse = {
          type: 'electric',
          value: faker.random.number()
        };

        sinon
          .stub(contxtSdk.facilityEms, 'getCurrentDemand')
          .resolves(expectedResponse);

        promise = aggregateDemandActions.getCurrentTotalDemand(
          facilityId,
          units
        )(dispatch);
      });

      it('dispatches a CURRENT_TOTAL_DEMAND_GET_START action', function() {
        return promise.then(() => {
          expect(dispatch).to.be.calledWith({
            type: 'CURRENT_TOTAL_DEMAND_GET_START'
          });
        });
      });

      it('dispatches a CURRENT_TOTAL_DEMAND_GET_SUCCESS action', function() {
        return promise.then(() => {
          expect(dispatch).to.be.calledWith({
            type: 'CURRENT_TOTAL_DEMAND_GET_SUCCESS',
            payload: expectedResponse
          });
        });
      });

      it('returns a resolved promise', function() {
        return expect(promise).to.be.fulfilled();
      });
    });

    context('when there is an issue getting the current demand', function() {
      let expectedErrorMessage;
      let expectedError;
      let promise;

      beforeEach(function() {
        expectedErrorMessage = faker.hacker.phrase();
        expectedError = new Error(expectedErrorMessage);
        sinon
          .stub(contxtSdk.facilityEms, 'getCurrentDemand')
          .rejects(expectedError);

        promise = aggregateDemandActions.getCurrentTotalDemand(
          facilityId,
          units
        )(dispatch);
      });

      it('dispatches a CURRENT_TOTAL_DEMAND_GET_FAILURE action', function() {
        return promise.then(expect.fail).catch(() => {
          expect(dispatch).to.be.calledWith({
            type: 'CURRENT_TOTAL_DEMAND_GET_FAILURE',
            error: true,
            meta: { name: 'currTotalDemand' },
            payload: expectedErrorMessage
          });
        });
      });
    });
  });
});
