import { toCamelCase } from '@ndustrial/contxt-sdk';

class EmsModule {
  constructor(sdk, request) {
    this._baseUrl = `${sdk.config.audiences.ratesEms.host}/v1`;
    this._request = request;
    this._sdk = sdk;
  }

  getContractById(facilityId, contractId) {
    if (!this._sdk.coordinator._organizationId) {
      return Promise.reject(
        new Error('A selectored organization is required to get data')
      );
    }

    if (!facilityId) {
      return Promise.reject(
        new Error('A facilityId is required get a contract.')
      );
    }

    if (!contractId) {
      return Promise.reject(
        new Error('A contractId is required get a contract.')
      );
    }

    return this._request
      .get(
        `${this._baseUrl}/${this._sdk.coordinator._organizationId}/facilities/${facilityId}/contracts/${contractId}`
      )
      .then((response) => toCamelCase(response));
  }
}

export default EmsModule;
