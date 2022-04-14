class EmsModule {
  constructor(sdk, request) {
    this._baseUrl = `${sdk.config.audiences.facilityEms.host}/v1`;
    this._request = request;
    this._sdk = sdk;
    this.unitMap = {
      kw: 'kW',
      kva: 'kva',
      kvar: 'kvar'
    };
  }

  getCurrentDemand(facilityId, unit) {
    if (!this._sdk.coordinator._organizationId) {
      return Promise.reject(
        new Error('A selectored organization is required to get data')
      );
    }
    if (!facilityId) {
      return Promise.reject(
        new Error('A facility ID is required to get current demand data.')
      );
    }
    unit = this.unitMap[unit.toLowerCase()];

    return this._request.get(
      `${this._baseUrl}/${this._sdk.coordinator._organizationId}/facilities/${facilityId}/demand/current?type=electric&unit=${unit}`
    );
  }

  getDemandData(facilityId, startTime, endTime, unit) {
    if (!this._sdk.coordinator._organizationId) {
      return Promise.reject(
        new Error('A selectored organization is required to get data')
      );
    }
    if (!facilityId) {
      return Promise.reject(
        new Error('A facilityId is required get demand data.')
      );
    }
    unit = this.unitMap[unit.toLowerCase()];

    return this._request.get(
      `${this._baseUrl}/${this._sdk.coordinator._organizationId}/facilities/${facilityId}/demand?time_start=${startTime}&time_end=${endTime}&type=electric&unit=${unit}`
    );
  }

  getDemandMax(facilityId, month, year, unit) {
    if (!this._sdk.coordinator._organizationId) {
      return Promise.reject(
        new Error('A selectored organization is required to get data')
      );
    }
    if (!facilityId) {
      return Promise.reject(
        new Error('A facilityId is required to get demand data.')
      );
    }
    unit = this.unitMap[unit.toLowerCase()];

    return this._request.get(
      `${this._baseUrl}/${this._sdk.coordinator._organizationId}/facilities/${facilityId}/demand/monthly/max?month=${month}&type=electric&year=${year}&unit=${unit}`
    );
  }

  getAggregateDemandData(facilityId, units) {
    if (!this._sdk.coordinator._organizationId) {
      return Promise.reject(
        new Error('A selectored organization is required to get data')
      );
    }
    if (!facilityId) {
      return Promise.reject(
        new Error('A facility ID is required to get Real Time Demand data.')
      );
    }
    units = this.unitMap[units.toLowerCase()];

    return this._request.get(
      `${this._baseUrl}/${this._sdk.coordinator._organizationId}/facilities/${facilityId}/demand/aggregate?units=${units}`
    );
  }

  /**
   * Fetches metadata and main services for given facility
   * @param {Number} facilityId `number` facility id
   * @returns {Promise} `promise`
   */
  getFacilityMetadata(facilityId) {
    if (!this._sdk.coordinator._organizationId) {
      return Promise.reject(
        new Error('A selectored organization is required to get data')
      );
    }
    if (!facilityId) {
      return Promise.reject(
        new Error('A facility ID is required to get facility details.')
      );
    }

    return this._request.get(
      `${this._baseUrl}/${this._sdk.coordinator._organizationId}/facilities/${facilityId}`
    );
  }
}

export default EmsModule;
