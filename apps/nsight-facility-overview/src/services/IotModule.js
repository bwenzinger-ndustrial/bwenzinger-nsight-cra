class IotModule {
  constructor(sdk, request) {
    this._baseUrl = `${sdk.config.audiences.facilityDashboardIot.host}`;
    this._request = request;
    this._sdk = sdk;
  }

  getWeatherData(facilityId, startTime, endTime) {
    if (!facilityId) {
      return Promise.reject(
        new Error('A facilityId is required get weather data.')
      );
    }

    return this._request
      .get(
        `${this._baseUrl}/daily_weather_${facilityId}/data?start=${startTime}&end=${endTime}&resolution=P1D`
      )
      .then((res) => res)
      .catch((err) => {
        throw err;
      });
  }
}
export default IotModule;
