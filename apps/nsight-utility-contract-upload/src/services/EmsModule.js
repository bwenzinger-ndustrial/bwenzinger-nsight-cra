import { toCamelCase } from '@ndustrial/contxt-sdk';
import { utils as nsightUtils } from '@ndustrial/nsight-common';

class EmsModule {
  constructor(sdk, request) {
    this._baseUrl = `${sdk.config.audiences.ems.host}/v1`;
    this._request = request;
    this._sdk = sdk;
  }

  formatContractBody(body) {
    return {
      name: body.name,
      status: body.status,
      start_date: body.startDate,
      end_date: body.endDate,
      file_id: body.fileId,
      rate_narrative: body.rateNarrative,
      users: body.utilityContractReminders
    };
  }

  createContract(body) {
    if (!this._sdk.coordinator._organizationId) {
      return Promise.reject(
        new Error('A selectored organization is required to get data')
      );
    }
    if (!body.facilityId) {
      return Promise.reject(
        new Error('A facilityId is required to create a contract.')
      );
    }
    const formattedContractBody = this.formatContractBody(body);

    return this._request
      .post(
        `${this._baseUrl}/${this._sdk.coordinator._organizationId}/facilities/${body.facilityId}/contracts`,
        formattedContractBody
      )
      .then(toCamelCase);
  }

  deleteContract(facilityId, contractId) {
    if (!this._sdk.coordinator._organizationId) {
      return Promise.reject(
        new Error('A selectored organization is required to get data')
      );
    }
    if (!facilityId) {
      return Promise.reject(
        new Error('A facilityId is required to delete a contract.')
      );
    }

    if (!contractId) {
      return Promise.reject(
        new Error('A contractId is required to delete a contract.')
      );
    }

    return this._request.delete(
      `${this._baseUrl}/${this._sdk.coordinator._organizationId}/facilities/${facilityId}/contracts/${contractId}`
    );
  }

  getContractsByFacility(facilityId) {
    if (!this._sdk.coordinator._organizationId) {
      return Promise.reject(
        new Error('A selectored organization is required to get data')
      );
    }
    if (!facilityId) {
      return Promise.reject(
        new Error('A facilityId is required get contracts.')
      );
    }

    return nsightUtils
      .getAllPaginatedResults((paginationOpts) => {
        return this._request.get(
          `${this._baseUrl}/${this._sdk.coordinator._organizationId}/facilities/${facilityId}/contracts`
        );
      })
      .then(toCamelCase);
  }

  updateContract(facilityId, contractId, body) {
    if (!this._sdk.coordinator._organizationId) {
      return Promise.reject(
        new Error('A selectored organization is required to get data')
      );
    }
    if (!facilityId) {
      return Promise.reject(
        new Error('A facilityId is required to update a contract.')
      );
    }

    if (!contractId) {
      return Promise.reject(
        new Error('A contractId is required to update a contract.')
      );
    }

    const formattedContractBody = this.formatContractBody(body);

    return this._request.put(
      `${this._baseUrl}/${this._sdk.coordinator._organizationId}/facilities/${facilityId}/contracts/${contractId}`,
      formattedContractBody
    );
  }
}

export default EmsModule;
