import { contxtSdk } from '@ndustrial/nsight-common/utils';

import { toCamelCase } from '../utils/caseConversion';

export const moduleConfig = {
  name: 'commonEms',
  clientId: contxtSdk.config.audiences.ems.clientId,
  host: contxtSdk.config.audiences.ems.host
};

/**
 * An alternative to this setup for common dynamic common modules might be using
 * some sort of dependency injection scheme usin React Context, or some other
 * mechanism.  As of 4/23/21, this is working perfectly, but if we start to see
 * issues, we may need to re-architect.
 *
 * Potentially useful article on injection and react context:
 * https://blog.testdouble.com/posts/2021-03-19-react-context-for-dependency-injection-not-state/
 */

class EmsModule {
  constructor(sdk, request) {
    this._baseUrl = `${sdk.config.audiences[moduleConfig.name].host}/v1`;
    this._request = request;
    this._sdk = sdk;
  }

  getProxiedAssetMetricValues(
    metricLabels,
    ids,
    effectiveStartDate,
    effectiveEndDate
  ) {
    if (!this._sdk.coordinator._organizationId) {
      return Promise.reject(
        new Error('A selectored organization is required to get data')
      );
    }
    if (!ids.length || !metricLabels.length) {
      return Promise.reject(
        new Error('An ID and metric labels are required to get data')
      );
    }

    return this._request
      .get(
        `${this._baseUrl}/${this._sdk.coordinator._organizationId}/assets/metrics/values?asset_ids=${ids}&metric_labels=${metricLabels}&effective_start_date=${effectiveStartDate}&effective_end_date=${effectiveEndDate}`
      )
      .then((response) => {
        return toCamelCase(response, {
          excludeTransform: [...metricLabels, ...ids]
        });
      });
  }

  getProxiedAssetMetricValuesNoRange(metricLabels, ids) {
    if (!this._sdk.coordinator._organizationId) {
      return Promise.reject(
        new Error('A selectored organization is required to get data')
      );
    }
    if (!ids.length || !metricLabels.length) {
      return Promise.reject(
        new Error('An ID and metric labels are required to get data')
      );
    }

    return this._request
      .get(
        `${this._baseUrl}/${this._sdk.coordinator._organizationId}/assets/metrics/values?asset_ids=${ids}&metric_labels=${metricLabels}`
      )
      .then((response) => {
        return toCamelCase(response, {
          excludeTransform: [...metricLabels, ...ids]
        });
      });
  }
}

export default EmsModule;
