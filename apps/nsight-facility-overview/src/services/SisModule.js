class SisModule {
  constructor(sdk, request) {
    this._baseUrl = `${sdk.config.audiences.facilitySis.host}/v1`;
    this._request = request;
    this._sdk = sdk;
  }

  getAccountSummary(facilityId) {
    if (!facilityId) {
      return Promise.reject(
        new Error('A facility ID is required to get current demand data.')
      );
    }

    return this._request.get(
      `${this._baseUrl}/facilities/${facilityId}/utilities/accountsummary`
    );
  }
}

export default SisModule;
