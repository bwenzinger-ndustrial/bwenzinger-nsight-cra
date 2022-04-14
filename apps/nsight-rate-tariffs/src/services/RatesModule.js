import { toCamelCase } from '@ndustrial/contxt-sdk';

class RatesModule {
  constructor(sdk, request) {
    this._baseUrl = `${sdk.config.audiences.rates.host}/v2`;
    this._request = request;
    this._sdk = sdk;
  }

  getScheduleById(scheduleId) {
    if (!scheduleId) {
      return Promise.reject(
        new Error('A scheduleId is required get a rate schedule.')
      );
    }

    return this._request
      .get(`${this._baseUrl}/schedules/${scheduleId}`)
      .then((response) => toCamelCase(response));
  }

  getSchedulesByFacilityId(facilityId) {
    if (!facilityId) {
      return Promise.reject(
        new Error('A facilityId is required get rate schedules.')
      );
    }

    return this._request
      .get(`${this._baseUrl}/facilities/${facilityId}/schedules`)
      .then((response) => toCamelCase(response));
  }
}

export default RatesModule;
