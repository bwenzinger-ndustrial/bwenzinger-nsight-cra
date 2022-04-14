import { expect } from 'chai';
import faker from 'faker';
import sinon from 'sinon';

import * as objectUtils from '@ndustrial/contxt-sdk';
import { fixtures } from '@ndustrial/nsight-test-utils';

import Rates from './RatesModule';

describe('nsight-rate-tariffs/services/RatesModule', function() {
  let baseRequest;
  let baseSdk;
  let expectedHost;

  beforeEach(function() {
    baseRequest = {
      delete: sinon.stub().resolves(),
      get: sinon.stub().resolves(),
      post: sinon.stub().resolves(),
      put: sinon.stub().resolves()
    };

    baseSdk = {
      config: {
        audiences: {
          rates: fixtures.build('audience')
        }
      }
    };
    expectedHost = faker.internet.url();
  });

  afterEach(function() {
    sinon.restore();
  });

  describe('constructor', function() {
    let rates;

    beforeEach(function() {
      rates = new Rates(baseSdk, baseRequest);
    });

    it('sets a base url for the class instance', function() {
      expect(rates._baseUrl).to.equal(
        `${baseSdk.config.audiences.rates.host}/v2`
      );
    });

    it('appends the supplied request module to the class instance', function() {
      expect(rates._request).to.deep.equal(baseRequest);
    });

    it('appends the supplied sdk to the class instance', function() {
      expect(rates._sdk).to.deep.equal(baseSdk);
    });
  });

  describe('getScheduleById', function() {
    context('the schedule ID is provided', function() {
      let expectedSchedule;
      let request;
      let promise;
      let unformattedSchedule;

      beforeEach(function() {
        expectedSchedule = fixtures.build('rateSchedule');
        unformattedSchedule = fixtures.build('rateSchedule', expectedSchedule);

        request = {
          ...baseRequest,
          get: sinon.stub().resolves(unformattedSchedule)
        };
        sinon.stub(objectUtils, 'toCamelCase').returns(expectedSchedule);

        const rates = new Rates(baseSdk, request);
        rates._baseUrl = expectedHost;

        promise = rates.getScheduleById(expectedSchedule.id);
      });
      it('gets the schedule from the Rates API', function() {
        return promise.then(() => {
          expect(request.get).to.be.calledWith(
            `${expectedHost}/schedules/${expectedSchedule.id}`
          );
        });
      });

      it('formats the response', function() {
        return promise.then(() => {
          expect(objectUtils.toCamelCase).to.be.calledWith(unformattedSchedule);
        });
      });

      it('returns the schedule', function() {
        return expect(promise).to.be.fulfilled.and.to.eventually.equal(
          expectedSchedule
        );
      });
    });

    context('the schedule ID is not provided', function() {
      let promise;

      beforeEach(function() {
        const rates = new Rates(baseSdk, baseRequest);
        rates._baseUrl = expectedHost;

        promise = rates.getScheduleById();
      });

      it('throws an error', function() {
        return expect(promise).to.be.rejectedWith(
          'A scheduleId is required get a rate schedule.'
        );
      });

      it('does not attempt to get the schedule from the rates API', function() {
        return promise.then(expect.fail).catch(() => {
          expect(baseRequest.get).to.not.be.called();
        });
      });
    });
  });

  describe('getSchedulesByFacilityId', function() {
    context('the facility ID is provided', function() {
      let expectedSchedules;
      let facilityId;
      let promise;
      let request;
      let unformattedSchedules;

      beforeEach(function() {
        facilityId = fixtures.build('facility').id;
        expectedSchedules = fixtures.buildList(
          'rateSchedule',
          faker.random.number({ min: 1, max: 10 })
        );
        unformattedSchedules = expectedSchedules.map((schedule) =>
          fixtures.build('rateSchedule', schedule, { fromServer: true })
        );

        request = {
          ...baseRequest,
          get: sinon.stub().resolves(unformattedSchedules)
        };
        sinon.stub(objectUtils, 'toCamelCase').returns(expectedSchedules);

        const rates = new Rates(baseSdk, request);
        rates._baseUrl = expectedHost;

        promise = rates.getSchedulesByFacilityId(facilityId);
      });

      it('gets the schedules from the Rates API', function() {
        return promise.then(() => {
          expect(request.get).to.be.calledWith(
            `${expectedHost}/facilities/${facilityId}/schedules`
          );
        });
      });

      it('formats the response', function() {
        return promise.then(() => {
          expect(objectUtils.toCamelCase).to.be.calledWith(
            unformattedSchedules
          );
        });
      });

      it('returns the schedules', function() {
        return expect(promise).to.be.fulfilled.and.to.eventually.equal(
          expectedSchedules
        );
      });
    });

    context('the facility ID is not provided', function() {
      let promise;

      beforeEach(function() {
        const rates = new Rates(baseSdk, baseRequest);
        rates._baseUrl = expectedHost;

        promise = rates.getSchedulesByFacilityId();
      });

      it('throws an error', function() {
        return expect(promise).to.be.rejectedWith(
          'A facilityId is required get rate schedules.'
        );
      });

      it('does not attempt to get a list of schedules from the rates API', function() {
        return promise.then(expect.fail).catch(() => {
          expect(baseRequest.get).to.not.be.called();
        });
      });
    });
  });
});
