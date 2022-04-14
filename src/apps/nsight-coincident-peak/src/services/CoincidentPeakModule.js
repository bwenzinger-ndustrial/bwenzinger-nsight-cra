import { toCamelCase } from '@ndustrial/contxt-sdk';

class CoincidentPeakModule {
  constructor(sdk, request) {
    this._baseUrl = `${sdk.config.audiences.orgCoincidentPeak.host}`;
    this._request = request;
    this._sdk = sdk;
  }

  getDemandSeries(startTime, endTime, region) {
    return this._request
      .get(
        `${this._baseUrl}/demand?and=(time.gte.${startTime},time.lte.${endTime})&region=eq.${region}`
      )
      .then((response) => toCamelCase(response));
  }

  getForecastRuns(startTime, endTime, region) {
    return this._request
      .get(
        `${this._baseUrl}/runs?and=(time.gte.${startTime},time.lte.${endTime})&region=eq.${region}&order=time`
      )
      .then((response) => toCamelCase(response));
  }

  getHourlyWeather(startTime, endTime, locationId) {
    return this._request
      .get(
        `${this._baseUrl}/hourly_weather?and=(time.gte.${startTime},time.lte.${endTime})&location_id=eq.${locationId}`
      )
      .then((response) => toCamelCase(response));
  }

  getRegionLocations() {
    return this._request
      .get(`${this._baseUrl}/locations`)
      .then((response) => toCamelCase(response));
  }
}

export default CoincidentPeakModule;
