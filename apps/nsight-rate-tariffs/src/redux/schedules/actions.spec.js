import { expect } from 'chai';
import faker from 'faker';
import sinon from 'sinon';

import { contxtSdk } from '@ndustrial/nsight-common/utils';
import { fixtures } from '@ndustrial/nsight-test-utils';

import EmsModule from '../../services/EmsModule';
import RatesModule from '../../services/RatesModule';
import * as schedulesActions from './actions';

describe('nsight-rate-tariffs/redux/schedules/actions', function() {
  before(function() {
    contxtSdk.mountDynamicModule('ratesEms', {
      clientId: contxtSdk.config.audiences.ems.clientId,
      host: contxtSdk.config.audiences.ems.host,
      module: EmsModule
    });

    contxtSdk.mountDynamicModule('rates', {
      clientId: contxtSdk.config.audiences.rates.clientId,
      host: contxtSdk.config.audiences.rates.host,
      module: RatesModule
    });
  });

  afterEach(function() {
    sinon.restore();
  });

  after(function() {
    contxtSdk.unmountDynamicModule('rates');
    contxtSdk.unmountDynamicModule('ratesEms');
  });

  describe('loadScheduleById', function() {
    let dispatch;

    beforeEach(function() {
      dispatch = sinon.stub();
    });

    context('when successfully retriving the rate schedule', function() {
      let expectedSchedule;
      let promise;

      beforeEach(function() {
        expectedSchedule = fixtures.build('rateSchedule');

        sinon
          .stub(contxtSdk.rates, 'getScheduleById')
          .resolves(expectedSchedule);

        promise = schedulesActions.loadScheduleById(expectedSchedule.id)(
          dispatch
        );
      });

      it('dispatches a LOAD_RATE_SCHEDULE_START action', function() {
        return promise.then(() => {
          expect(dispatch).to.be.calledWith({
            type: 'LOAD_RATE_SCHEDULE_START'
          });
        });
      });

      it('gets the rate schedule from the API', function() {
        return promise.then(() => {
          expect(contxtSdk.rates.getScheduleById).to.be.calledWith(
            expectedSchedule.id
          );
        });
      });

      it('dispatches a LOAD_RATE_SCHEDULE_SUCCESS action', function() {
        return promise.then(() => {
          expect(dispatch).to.be.calledWith({
            type: 'LOAD_RATE_SCHEDULE_SUCCESS',
            payload: expectedSchedule
          });
        });
      });

      it('returns a resolved promise', function() {
        return expect(promise).to.be.fulfilled();
      });
    });

    context('when there is a problem getting the rate schedule', function() {
      let expectedError;
      let promise;

      beforeEach(function() {
        expectedError = new Error(faker.hacker.phrase());

        sinon.stub(contxtSdk.rates, 'getScheduleById').rejects(expectedError);

        promise = schedulesActions.loadScheduleById(
          fixtures.build('rateSchedule').id
        )(dispatch);
      });

      it('dispatches a LOAD_RATE_SCHEDULE_FAILURE action', function() {
        return promise.then(expect.fail).catch(() => {
          expect(dispatch).to.be.calledWith({
            type: 'LOAD_RATE_SCHEDULE_FAILURE',
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

  describe('loadSchedulesByFacilityId', function() {
    let dispatch;

    beforeEach(function() {
      dispatch = sinon.stub();
    });

    context('when successfully retrieving rate schedules', function() {
      let expectedFacilityId;
      let expectedContracts;
      let expectedSchedules;
      let expectedSchedulesWithContracts;
      let promise;

      beforeEach(function() {
        expectedFacilityId = fixtures.build('facility').id;

        expectedContracts = fixtures.buildList(
          'contract',
          faker.random.number({ min: 1, max: 5 })
        );
        expectedSchedules = [
          ...expectedContracts.map((contract) => {
            return fixtures.build('rateSchedule', {
              utilityContractId: contract.id
            });
          }),
          ...fixtures.buildList(
            'rateSchedule',
            faker.random.number({ min: 1, max: 5 }),
            { utilityContractId: null }
          )
        ];

        expectedSchedulesWithContracts = expectedSchedules.filter(
          (schedule) => schedule.utilityContractId
        );

        sinon
          .stub(contxtSdk.rates, 'getSchedulesByFacilityId')
          .resolves({ records: expectedSchedules });

        sinon
          .stub(contxtSdk.ratesEms, 'getContractById')
          .callsFake(function getContractById(facilityId, utilityContractId) {
            if (!utilityContractId) {
              throw new Error('Rate Schedule Not Found');
            }
            return expectedContracts.find(
              (contract) => contract.id === utilityContractId
            );
          });

        promise = schedulesActions.loadSchedulesByFacilityId(
          expectedFacilityId
        )(dispatch);
      });

      it('dispatches a LOAD_RATE_SCHEDULES_START action', function() {
        return promise.then(() => {
          expect(dispatch).to.be.calledWith({
            type: 'LOAD_RATE_SCHEDULES_START'
          });
        });
      });

      it('gets the rate schedules from the API', function() {
        return promise.then(() => {
          expect(contxtSdk.rates.getSchedulesByFacilityId).to.be.calledWith(
            expectedFacilityId
          );
        });
      });

      it('gets the contracts from the API', function() {
        return promise.then(() => {
          expectedSchedulesWithContracts.forEach((schedule) => {
            expect(contxtSdk.ratesEms.getContractById).to.be.calledWith(
              expectedFacilityId,
              schedule.utilityContractId
            );
          });
        });
      });

      it('dispatches a LOAD_RATE_SCHEDULES_SUCCESS action', function() {
        return promise.then(() => {
          expect(dispatch).to.be.calledWith({
            type: 'LOAD_RATE_SCHEDULES_SUCCESS',
            payload: {
              schedules: expectedSchedules,
              contracts: expectedContracts
            }
          });
        });
      });

      it('returns a resolved promise', function() {
        return expect(promise).to.be.fulfilled();
      });
    });

    context('when there is a problem getting rate schedules', function() {
      let expectedError;
      let promise;

      beforeEach(function() {
        expectedError = new Error(faker.hacker.phrase());

        sinon
          .stub(contxtSdk.rates, 'getSchedulesByFacilityId')
          .rejects(expectedError);

        promise = schedulesActions.loadSchedulesByFacilityId(
          fixtures.build('facility').id
        )(dispatch);
      });

      it('dispatches a LOAD_RATE_SCHEDULES_FAILURE action', function() {
        return promise.then(expect.fail).catch(() => {
          expect(dispatch).to.be.calledWith({
            type: 'LOAD_RATE_SCHEDULES_FAILURE',
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
});
