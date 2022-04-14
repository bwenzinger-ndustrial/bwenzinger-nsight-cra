class RatesModule {
  constructor(sdk, request) {
    this._baseUrl = `${sdk.config.audiences.ems.host}/v1`;
    this._request = request;

    this.getPortfolioRates = this.getPortfolioRates.bind(this);
  }

  getPortfolioRates(organizationId, facilityIds) {
    return this._request
      .post(`${this._baseUrl}/organizations/rates`, {
        facilityIds: facilityIds,
        organizationId: organizationId
      })
      .then((response) => {
        return response;
      });
  }
}

export default RatesModule;
