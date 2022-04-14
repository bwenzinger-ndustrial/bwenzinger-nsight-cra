import { expect } from 'chai';
import faker from 'faker';

import fixture from '../../../test/fixtures/factories';
import actionTypes from './actionTypes';
import weatherReducer, { INITIAL_STATE } from './reducer';

describe('nsight-facility-overview/redux/weather/reducer', function() {
  it('returns the initial state', function() {
    expect(weatherReducer(undefined, {})).to.equal(INITIAL_STATE);
  });

  describe(`${actionTypes.GET_WEATHER_PRIMARY_SUCCESS}`, function() {
    let nextState;
    let expectedWeatherData;
    let weatherFixture;

    beforeEach(function() {
      weatherFixture = fixture.buildList(
        'weather',
        faker.random.number({ min: 1, max: 10 })
      );

      expectedWeatherData = {
        primaryWeather: weatherFixture
      };
    });

    it('stores primary weather data', function() {
      nextState = weatherReducer(INITIAL_STATE, {
        type: actionTypes.GET_WEATHER_PRIMARY_SUCCESS,
        payload: expectedWeatherData
      });

      expect(nextState.primaryWeather).to.equal(expectedWeatherData);
    });
  });

  describe(`${actionTypes.GET_WEATHER_SECONDARY_SUCCESS}`, function() {
    let nextState;
    let expectedWeatherData;
    let weatherFixture;

    beforeEach(function() {
      weatherFixture = fixture.buildList(
        'weather',
        faker.random.number({ min: 1, max: 10 })
      );

      expectedWeatherData = {
        secondaryWeather: weatherFixture
      };
    });

    it('stores secondary weather data', function() {
      nextState = weatherReducer(INITIAL_STATE, {
        type: actionTypes.GET_WEATHER_SECONDARY_SUCCESS,
        payload: expectedWeatherData
      });

      expect(nextState.secondaryWeather).to.equal(expectedWeatherData);
    });
  });

  describe('failure states', function() {
    const failureStates = [
      {
        action: 'GET_WEATHER_SECONDARY_FAILURE',
        expectedValue: [],
        expectedWeatherData: null,
        prevSuccess: 'GET_WEATHER_SECONDARY_SUCCESS'
      },
      {
        action: 'GET_WEATHER_PRIMARY_FAILURE',
        expectedValue: [],
        expectedWeatherData: null,
        prevSuccess: 'GET_WEATHER_PRIMARY_SUCCESS'
      }
    ];

    failureStates.forEach((failure) => {
      let nextState;
      let expectedError;

      const weatherFixture = fixture.buildList(
        'weather',
        faker.random.number({ min: 2, max: 10 })
      );

      const expectedWeatherDataArray = {
        values: weatherFixture
      };

      const expectedWeatherDataString = {
        value: faker.random.number()
      };

      failure.expectedWeatherData = failure.expectedValue
        ? expectedWeatherDataArray
        : expectedWeatherDataString;

      beforeEach(function() {
        expectedError = faker.hacker.phrase();
        nextState = weatherReducer(INITIAL_STATE, {
          type: failure.action,
          payload: expectedError
        });
      });

      it('returns the correct value', function() {
        expect(nextState.error).to.deep.equal(expectedError);
      });
    });
  });
});
