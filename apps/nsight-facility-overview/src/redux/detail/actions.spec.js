import { expect } from 'chai';
import faker from 'faker';
import _ from 'lodash';
import moment from 'moment';
import sinon from 'sinon';

import { kpiEnums } from '@ndustrial/nsight-common/kpi-config/constants';
import EmsModule, {
  moduleConfig as emsModuleConfig
} from '@ndustrial/nsight-common/services/EmsModule';
import { contxtSdk } from '@ndustrial/nsight-common/utils';
import { fixtures } from '@ndustrial/nsight-test-utils';

import * as detailActions from './actions';
import actionTypes from './actionTypes';

const makeRecord = (isEstimated) => ({
  effectiveStartDate: moment(),
  value: faker.random.number(),
  isEstimated: isEstimated
});

describe('nsight-facility-overview/redux/detail/actions', function() {
  let facilityId;

  beforeEach(function() {
    facilityId = faker.random.number();
    contxtSdk.mountDynamicModule(emsModuleConfig.name, {
      clientId: emsModuleConfig.clientId,
      host: emsModuleConfig.host,
      module: EmsModule
    });
  });

  afterEach(function() {
    sinon.restore();
    contxtSdk.unmountDynamicModule(emsModuleConfig.name);
  });

  describe('getDetailData', function() {
    let kpiConfig;
    let dispatch;
    let expectedDispatchPayload;
    let getProxiedAssetMetricValues;
    let getState;
    let window;

    beforeEach(function() {
      const isEstimated = faker.random.boolean();
      window = kpiEnums.DATE_INTERVALS.MONTHLY;

      kpiConfig = fixtures.build('kpiConfig', {
        compareBy: kpiEnums.COMPARE_BY_TYPES.DATE
      });

      dispatch = sinon.stub();

      const kpiResponseRecords = _.times(5, () => makeRecord(isEstimated));
      const expectedKpiResponse = {
        [facilityId]: {
          [kpiConfig[window].key]: kpiResponseRecords
        }
      };

      const breakdownRecords = kpiConfig.detail.breakdown.reduce(
        (acc, item) => {
          // flipping isEstimated to see if it stays true after processing based
          // on kpiResponseRecords
          return { ...acc, [item.key]: [makeRecord(!isEstimated)] };
        },
        {}
      );

      const expectedBreakdownResponse = {
        [facilityId]: breakdownRecords
      };

      const expectedKpiTotal = kpiResponseRecords.reduce((acc, data) => {
        acc += data.value;
        return acc;
      }, 0);

      getProxiedAssetMetricValues = sinon.stub(
        contxtSdk[emsModuleConfig.name],
        'getProxiedAssetMetricValues'
      );

      getProxiedAssetMetricValues.onCall(0).resolves(expectedKpiResponse);
      getProxiedAssetMetricValues.onCall(1).resolves(expectedBreakdownResponse);

      expectedDispatchPayload = {
        avg: expectedKpiTotal / 5,
        additionalMetrics: null,
        values: kpiResponseRecords,
        breakdown: Object.keys(breakdownRecords).reduce((acc, key) => {
          return {
            ...acc,
            [key]: {
              records: breakdownRecords[key],
              isBreakdownEstimated: !isEstimated
            }
          };
        }, {}),
        isEstimated: isEstimated,
        isLoading: false
      };
    });

    context('when successfully fetching comparison data', function() {
      let promise;

      beforeEach(function() {
        promise = detailActions.getComparisonDetailData(
          facilityId,
          kpiConfig,
          moment(),
          moment(),
          true,
          window
        )(dispatch);
      });

      it(`dispatches a ${actionTypes.FACILITY_DETAIL_COMPARISON_GET_START} action`, function() {
        return promise.then(() => {
          expect(dispatch).to.be.calledWith({
            type: actionTypes.FACILITY_DETAIL_COMPARISON_GET_START,
            isLoading: true
          });
        });
      });

      it(`dispatches a ${actionTypes.FACILITY_DETAIL_COMPARISON_GET_SUCCESS} action`, function() {
        return promise.then(() => {
          expect(dispatch).to.be.calledWith({
            type: actionTypes.FACILITY_DETAIL_COMPARISON_GET_SUCCESS,
            payload: expectedDispatchPayload,
            metricName: kpiConfig.slug
          });
        });
      });

      it('returns a resolved promise', function() {
        return expect(promise).to.be.fulfilled();
      });
    });

    context('when there is an error fetching comparison data', function() {
      let expectedErrorMessage;
      let expectedError;
      let promise;

      beforeEach(function() {
        expectedErrorMessage = faker.hacker.phrase();
        expectedError = new Error(expectedErrorMessage);

        getProxiedAssetMetricValues.onCall(0).rejects(expectedError);

        promise = detailActions.getComparisonDetailData(
          facilityId,
          kpiConfig,
          moment(),
          moment(),
          true,
          window
        )(dispatch, getState);
      });

      it(`dispatches a ${actionTypes.FACILITY_DETAIL_COMPARISON_GET_FAILURE} action`, function() {
        return promise.then(expect.fail).catch(() => {
          expect(dispatch).to.be.calledWith({
            type: actionTypes.FACILITY_DETAIL_COMPARISON_GET_FAILURE,
            error: true,
            payload: expectedErrorMessage,
            isLoading: false
          });
        });
      });
    });

    context('when successfully fetching primary data', function() {
      let promise;

      beforeEach(function() {
        promise = detailActions.getPrimaryDetailData(
          facilityId,
          kpiConfig,
          moment(),
          moment(),
          true,
          window
        )(dispatch, getState);
      });

      it(`dispatches a ${actionTypes.FACILITY_DETAIL_PRIMARY_GET_START} action`, function() {
        return promise.then(() => {
          expect(dispatch).to.be.calledWith({
            type: actionTypes.FACILITY_DETAIL_PRIMARY_GET_START,
            isLoading: true
          });
        });
      });

      it(`dispatches a ${actionTypes.FACILITY_DETAIL_PRIMARY_GET_SUCCESS} action`, function() {
        return promise.then(() => {
          expect(dispatch).to.be.calledWith({
            type: actionTypes.FACILITY_DETAIL_PRIMARY_GET_SUCCESS,
            payload: expectedDispatchPayload,
            metricName: kpiConfig.slug
          });
        });
      });

      it('returns a resolved promise', function() {
        return expect(promise).to.be.fulfilled();
      });
    });

    context('when there is an error fetching primary data', function() {
      let expectedErrorMessage;
      let expectedError;
      let promise;

      beforeEach(function() {
        expectedErrorMessage = faker.hacker.phrase();
        expectedError = new Error(expectedErrorMessage);

        getProxiedAssetMetricValues.onCall(0).rejects(expectedError);

        promise = detailActions.getPrimaryDetailData(
          facilityId,
          kpiConfig,
          moment(),
          moment(),
          true,
          window
        )(dispatch, getState);
      });

      it(`dispatches a ${actionTypes.FACILITY_DETAIL_PRIMARY_GET_FAILURE} action`, function() {
        return promise.then(expect.fail).catch(() => {
          expect(dispatch).to.be.calledWith({
            type: actionTypes.FACILITY_DETAIL_PRIMARY_GET_FAILURE,
            error: true,
            payload: expectedErrorMessage,
            isLoading: false
          });
        });
      });
    });
  });

  describe('resetComparisonDetailData', function() {
    let dispatch;

    beforeEach(function() {
      dispatch = sinon.stub();
      detailActions.resetComparisonDetailData()(dispatch);
    });

    it(`dispatches a ${actionTypes.FACILITY_DETAIL_COMPARISON_DATA_RESET} action`, function() {
      expect(dispatch).to.be.calledWith({
        type: actionTypes.FACILITY_DETAIL_COMPARISON_DATA_RESET
      });
    });

    it(`dispatches a ${actionTypes.COMPARISON_DATE_SET} action`, function() {
      expect(dispatch).to.be.calledWith({
        type: actionTypes.COMPARISON_DATE_SET,
        payload: {
          from: undefined,
          to: undefined
        }
      });
    });
  });

  describe('resetPrimaryDetailData', function() {
    let dispatch;

    beforeEach(function() {
      dispatch = sinon.stub();
      detailActions.resetComparisonDetailData()(dispatch);
    });

    it(`dispatches a ${actionTypes.FACILITY_DETAIL_COMPARISON_DATA_RESET} action`, function() {
      expect(dispatch).to.be.calledWith({
        type: actionTypes.FACILITY_DETAIL_COMPARISON_DATA_RESET
      });
    });

    it(`dispatches a ${actionTypes.COMPARISON_DATE_SET} action`, function() {
      expect(dispatch).to.be.calledWith({
        type: actionTypes.COMPARISON_DATE_SET,
        payload: {
          from: undefined,
          to: undefined
        }
      });
    });
  });

  describe('setComparisonDates', function() {
    const expectedPayload = {
      [faker.random.word()]: faker.random.number()
    };

    it(`returns a ${actionTypes.COMPARISON_DATE_SET} action`, function() {
      expect(detailActions.setComparisonDates(expectedPayload)).to.deep.equal({
        type: actionTypes.COMPARISON_DATE_SET,
        payload: expectedPayload
      });
    });
  });

  describe('setPrimaryDates', function() {
    const expectedPayload = {
      [faker.random.word()]: faker.random.number()
    };

    it(`returns a ${actionTypes.PRIMARY_DATE_SET} action`, function() {
      expect(detailActions.setPrimaryDates(expectedPayload)).to.deep.equal({
        type: actionTypes.PRIMARY_DATE_SET,
        payload: expectedPayload
      });
    });
  });
});
