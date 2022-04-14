class SisModule {
  constructor(sdk, request) {
    this._baseUrl = `${sdk.config.audiences.sis.host}/v1`;
    this._request = request;

    this.getUtilityBillSummaries = this.getUtilityBillSummaries.bind(this);
  }

  getUtilityBillSummaries(facilityIds) {
    return this._request
      .post(`${this._baseUrl}//utilities/bill/manager/`, {
        facilityIds: facilityIds
      })
      .then((response) => {
        return response;
      });
  }
}

export default SisModule;
