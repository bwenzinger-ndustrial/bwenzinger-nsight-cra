import { expect } from 'chai';
import faker from 'faker';
import sinon from 'sinon';

import weatherUtils from '@ndustrial/nsight-common/charts/weather/weatherUtils';
import { contxtSdk } from '@ndustrial/nsight-common/utils';

import fixture from '../../../test/fixtures/factories';
import IotModule from '../../services/IotModule';
import * as weatherActions from './actions';
import actionTypes from './actionTypes';

describe('nsight-facility-overview/redux/weather/actions', function() {
  let facilitiyId;
  const startDate = faker.date.past(7);
  const endDate = Date.now();

  before(function() {
    contxtSdk.mountDynamicModule('facilityDashboardIot', {
      clientId: contxtSdk.config.audiences.iot.clientId,
      host: contxtSdk.config.audiences.iot.host,
      module: IotModule
    });
  });

  beforeEach(function() {
    facilitiyId = faker.random.uuid();
  });

  afterEach(function() {
    sinon.restore();
  });

  after(function() {
    contxtSdk.unmountDynamicModule('facilityDashboardIot');
  });

  // TODO: fix this test. Ensure data structure is correct and don't stub getWeatherAverage
  describe('get weather data', function() {
    let dispatch;
    let expectedWeatherData;
    let weatherFixture;

    beforeEach(function() {
      dispatch = sinon.stub();
      weatherFixture = fixture.buildList(
        'weather',
        faker.random.number({ min: 1, max: 10 })
      );

      const getWeatherAverage = sinon.stub(weatherUtils, 'getWeatherAverage');

      expectedWeatherData = {
        data: weatherFixture,
        details: {
          avgHigh: getWeatherAverage(weatherFixture, 'temperatureHigh'),
          avgLow: getWeatherAverage(weatherFixture, 'temperatureLow')
        }
      };
    });

    context('when successfully getting the primary weather data', function() {
      let promise;

      beforeEach(function() {
        sinon
          .stub(contxtSdk.facilityDashboardIot, 'getWeatherData')
          .resolves(weatherFixture);

        promise = weatherActions.getPrimaryWeatherData(
          facilitiyId,
          startDate,
          endDate
        )(dispatch);
      });

      it(`dispatches a ${actionTypes.GET_WEATHER_PRIMARY_START} action`, function() {
        return promise.then(() => {
          expect(dispatch).to.be.calledWith({
            type: actionTypes.GET_WEATHER_PRIMARY_START
          });
        });
      });

      it('gets the primary weather data', function() {
        return promise.then(() => {
          expect(
            contxtSdk.facilityDashboardIot.getWeatherData
          ).to.be.calledWith(facilitiyId, startDate, endDate);
        });
      });

      it(`dispatches a ${actionTypes.GET_WEATHER_PRIMARY_SUCCESS} action`, function() {
        return promise.then(() => {
          expect(dispatch).to.be.calledWith({
            type: actionTypes.GET_WEATHER_PRIMARY_SUCCESS,
            payload: expectedWeatherData
          });
        });
      });

      it('returns a resolved promise', function() {
        return expect(promise).to.be.fulfilled();
      });
    });

    context(
      'when there is an issue getting the primary weather data',
      function() {
        let expectedErrorMessage;
        let expectedError;
        let promise;

        beforeEach(function() {
          expectedErrorMessage = faker.hacker.phrase();
          expectedError = new Error(expectedErrorMessage);
          sinon
            .stub(contxtSdk.facilityDashboardIot, 'getWeatherData')
            .rejects(expectedError);

          promise = weatherActions.getPrimaryWeatherData(
            facilitiyId,
            startDate,
            endDate
          )(dispatch);
        });

        it(`dispatches a ${actionTypes.GET_WEATHER_PRIMARY_FAILURE} action`, function() {
          return promise.then(expect.fail).catch(() => {
            expect(dispatch).to.be.calledWith({
              type: actionTypes.GET_WEATHER_PRIMARY_FAILURE,
              error: true,
              payload: expectedErrorMessage
            });
          });
        });
      }
    );

    context('when successfully getting secondary weather data', function() {
      let promise;

      beforeEach(function() {
        sinon
          .stub(contxtSdk.facilityDashboardIot, 'getWeatherData')
          .resolves(weatherFixture);

        promise = weatherActions.getSecondaryWeatherData(
          facilitiyId,
          startDate,
          endDate
        )(dispatch);
      });

      it(`dispatches a ${actionTypes.GET_WEATHER_SECONDARY_START} action`, function() {
        return promise.then(() => {
          expect(dispatch).to.be.calledWith({
            type: actionTypes.GET_WEATHER_SECONDARY_START
          });
        });
      });

      it('gets secondary weather data', function() {
        return promise.then(() => {
          expect(
            contxtSdk.facilityDashboardIot.getWeatherData
          ).to.be.calledWith(facilitiyId, startDate, endDate);
        });
      });

      it(`dispatches a ${actionTypes.GET_WEATHER_SECONDARY_SUCCESS} action`, function() {
        return promise.then(() => {
          expect(dispatch).to.be.calledWith({
            type: actionTypes.GET_WEATHER_SECONDARY_SUCCESS,
            payload: expectedWeatherData
          });
        });
      });

      it('returns a resolved promise', function() {
        return expect(promise).to.be.fulfilled();
      });
    });

    context(
      'when there is an issue getting secondary weather data',
      function() {
        let expectedErrorMessage;
        let expectedError;
        let promise;

        beforeEach(function() {
          expectedErrorMessage = faker.hacker.phrase();
          expectedError = new Error(expectedErrorMessage);
          sinon
            .stub(contxtSdk.facilityDashboardIot, 'getWeatherData')
            .rejects(expectedError);

          promise = weatherActions.getSecondaryWeatherData(
            facilitiyId,
            startDate,
            endDate
          )(dispatch);
        });

        it(`dispatches a ${actionTypes.GET_WEATHER_SECONDARY_FAILURE} action`, function() {
          return promise.then(expect.fail).catch(() => {
            expect(dispatch).to.be.calledWith({
              type: actionTypes.GET_WEATHER_SECONDARY_FAILURE,
              error: true,
              payload: expectedErrorMessage
            });
          });
        });
      }
    );
  });
});
