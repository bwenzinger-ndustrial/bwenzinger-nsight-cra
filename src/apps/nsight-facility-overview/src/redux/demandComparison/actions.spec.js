import { expect } from 'chai';
import faker from 'faker';
import sinon from 'sinon';

import { contxtSdk } from '@ndustrial/nsight-common/utils';

import fixture from '../../../test/fixtures/factories';
import EmsModule from '../../services/EmsModule';
import * as chartActions from './actions';
import actionTypes from './actionTypes';

describe('nsight-facility-overview/redux/demandComparison/actions', function() {
  let facilitiyId;
  const startTime = faker.date.past(7);
  const endTime = Date.now();
  const units = 'kW';

  before(function() {
    contxtSdk.mountDynamicModule('facilityEms', {
      clientId: contxtSdk.config.audiences.ems.clientId,
      host: contxtSdk.config.audiences.ems.host,
      module: EmsModule
    });
  });

  beforeEach(function() {
    facilitiyId = faker.random.uuid();
  });

  afterEach(function() {
    sinon.restore();
  });

  after(function() {
    contxtSdk.unmountDynamicModule('facilityEms');
  });

  describe('get demand data', function() {
    let dispatch;
    let expectedDemandData;

    beforeEach(function() {
      dispatch = sinon.stub();
      expectedDemandData = fixture.buildList(
        'demand',
        faker.random.number({ min: 1, max: 10 })
      );
    });

    context(
      'when successfully getting the current month/year demand data',
      function() {
        let promise;

        beforeEach(function() {
          sinon
            .stub(contxtSdk.facilityEms, 'getDemandData')
            .resolves(expectedDemandData);

          promise = chartActions.getCurrMonthDemand(
            facilitiyId,
            startTime,
            endTime,
            units
          )(dispatch);
        });

        it(`dispatches a ${actionTypes.DEMAND_GET_CURRENT_START} action`, function() {
          return promise.then(() => {
            expect(dispatch).to.be.calledWith({
              type: actionTypes.DEMAND_GET_CURRENT_START
            });
          });
        });

        it('gets the current demand', function() {
          return promise.then(() => {
            expect(contxtSdk.facilityEms.getDemandData).to.be.calledWith(
              facilitiyId,
              startTime,
              endTime,
              units
            );
          });
        });

        it(`dispatches a ${actionTypes.DEMAND_GET_CURRENT_SUCCESS} action`, function() {
          return promise.then(() => {
            expect(dispatch).to.be.calledWith({
              type: actionTypes.DEMAND_GET_CURRENT_SUCCESS,
              payload: expectedDemandData
            });
          });
        });

        it('returns a resolved promise', function() {
          return expect(promise).to.be.fulfilled();
        });
      }
    );

    context(
      'when there is an issue getting the current month/year demand data',
      function() {
        let expectedErrorMessage;
        let expectedError;
        let promise;

        beforeEach(function() {
          expectedErrorMessage = faker.hacker.phrase();
          expectedError = new Error(expectedErrorMessage);
          sinon
            .stub(contxtSdk.facilityEms, 'getDemandData')
            .rejects(expectedError);

          promise = chartActions.getCurrMonthDemand(
            facilitiyId,
            startTime,
            endTime,
            units
          )(dispatch);
        });

        it(`dispatches a ${actionTypes.DEMAND_GET_CURRENT_FAILURE} action`, function() {
          return promise.then(expect.fail).catch(() => {
            expect(dispatch).to.be.calledWith({
              type: actionTypes.DEMAND_GET_CURRENT_FAILURE,
              error: true,
              payload: expectedErrorMessage,
              meta: { name: 'currMonthDemand' }
            });
          });
        });
      }
    );

    context(
      'when successfully getting the last month/year demand data',
      function() {
        let promise;

        beforeEach(function() {
          sinon
            .stub(contxtSdk.facilityEms, 'getDemandData')
            .resolves(expectedDemandData);

          promise = chartActions.getLastMonthDemand(
            facilitiyId,
            startTime,
            endTime,
            units
          )(dispatch);
        });

        it(`dispatches a ${actionTypes.DEMAND_GET_LAST_START} action`, function() {
          return promise.then(() => {
            expect(dispatch).to.be.calledWith({
              type: actionTypes.DEMAND_GET_LAST_START
            });
          });
        });

        it('gets demand for last month/year', function() {
          return promise.then(() => {
            expect(contxtSdk.facilityEms.getDemandData).to.be.calledWith(
              facilitiyId,
              startTime,
              endTime,
              units
            );
          });
        });

        it(`dispatches a ${actionTypes.DEMAND_GET_LAST_SUCCESS} action`, function() {
          return promise.then(() => {
            expect(dispatch).to.be.calledWith({
              type: actionTypes.DEMAND_GET_LAST_SUCCESS,
              payload: expectedDemandData
            });
          });
        });

        it('returns a resolved promise', function() {
          return expect(promise).to.be.fulfilled();
        });
      }
    );

    context(
      'when there is an issue getting the demand data for the previous month/year',
      function() {
        let expectedErrorMessage;
        let expectedError;
        let promise;

        beforeEach(function() {
          expectedErrorMessage = faker.hacker.phrase();
          expectedError = new Error(expectedErrorMessage);
          sinon
            .stub(contxtSdk.facilityEms, 'getDemandData')
            .rejects(expectedError);

          promise = chartActions.getLastMonthDemand(
            facilitiyId,
            startTime,
            endTime,
            units
          )(dispatch);
        });

        it(`dispatches a ${actionTypes.DEMAND_GET_LAST_FAILURE} action`, function() {
          return promise.then(expect.fail).catch(() => {
            expect(dispatch).to.be.calledWith({
              type: actionTypes.DEMAND_GET_LAST_FAILURE,
              error: true,
              payload: expectedErrorMessage,
              meta: { name: 'lastYearDemand' }
            });
          });
        });
      }
    );
  });
});
