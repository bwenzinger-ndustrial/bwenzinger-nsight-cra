import { expect } from 'chai';
import faker from 'faker';
import sinon from 'sinon';

import { kpiEnums } from '@ndustrial/nsight-common/kpi-config/constants';
import EmsModule, {
  moduleConfig
} from '@ndustrial/nsight-common/services/EmsModule';
import { contxtSdk } from '@ndustrial/nsight-common/utils';
import { fixtures } from '@ndustrial/nsight-test-utils';

import * as kpiActions from './actions';

describe('nsight-portfolio-dashboard/redux/kpi/actions', function() {
  afterEach(function() {
    sinon.restore();
  });

  describe('getPortfolioKPIData', function() {
    let dispatch;

    before(function() {
      contxtSdk.mountDynamicModule(moduleConfig.name, {
        clientId: moduleConfig.clientId,
        host: moduleConfig.host,
        module: EmsModule
      });
    });

    after(function() {
      contxtSdk.unmountDynamicModule(moduleConfig.name);
    });

    beforeEach(function() {
      dispatch = sinon.stub();
    });

    context('when successfully retrieving the KPI data', function() {
      let expectedFacilityId;
      let expectedComparisonDates;
      let expectedKpiName;
      let expectedPrimaryKpiData;
      let expectedSecondaryKpiData;
      let kpiConfig;
      let promise;

      beforeEach(function() {
        expectedComparisonDates = {
          primaryRangeEnd: faker.date.recent().toISOString(),
          primaryRangeStart: faker.date.past().toISOString(),
          secondaryRangeEnd: faker.date.recent().toISOString(),
          secondaryRangeStart: faker.date.past().toISOString()
        };

        kpiConfig = fixtures.build('kpiConfig', {
          compareBy: kpiEnums.COMPARE_BY_TYPES.DATE
        });

        expectedKpiName = kpiConfig.monthly.key;
        expectedFacilityId = faker.random.number();
        expectedPrimaryKpiData = {
          [expectedFacilityId]: {
            [expectedKpiName]: [{ metricDataHere: true }]
          }
        };

        expectedSecondaryKpiData = {
          [expectedFacilityId]: {
            [expectedKpiName]: [{ metricDataHere: true }]
          }
        };

        sinon
          .stub(contxtSdk[moduleConfig.name], 'getProxiedAssetMetricValues')
          .onFirstCall()
          .resolves(expectedPrimaryKpiData)
          .onSecondCall()
          .resolves(expectedSecondaryKpiData);

        promise = kpiActions.getPortfolioKPIData(
          expectedFacilityId,
          kpiConfig,
          expectedComparisonDates
        )(dispatch);
      });

      it('dispatches a GET_PORTFOLIO_KPI_START action', function() {
        return promise.then(() => {
          expect(dispatch).to.be.calledWith({
            type: 'GET_PORTFOLIO_KPI_START',
            meta: {
              kpi: expectedKpiName
            }
          });
        });
      });

      it('gets the KPI data', function() {
        return promise.then(() => {
          expect(
            contxtSdk[moduleConfig.name].getProxiedAssetMetricValues
          ).to.be.calledWith(
            [expectedKpiName],
            [expectedFacilityId],
            expectedComparisonDates.primaryRangeStart,
            expectedComparisonDates.primaryRangeEnd
          );

          expect(
            contxtSdk[moduleConfig.name].getProxiedAssetMetricValues
          ).to.be.calledWith(
            [expectedKpiName],
            [expectedFacilityId],
            expectedComparisonDates.secondaryRangeStart,
            expectedComparisonDates.secondaryRangeEnd
          );
        });
      });

      it('dispatches a GET_PORTFOLIO_KPI_SUCCESS action', function() {
        return promise.then(() => {
          expect(dispatch).to.be.calledWith({
            type: 'GET_PORTFOLIO_KPI_SUCCESS',
            meta: {
              dateRanges: expectedComparisonDates,
              kpi: expectedKpiName
            },
            payload: {
              primaryData:
                expectedPrimaryKpiData[expectedFacilityId][expectedKpiName],
              secondaryData:
                expectedSecondaryKpiData[expectedFacilityId][expectedKpiName]
            }
          });
        });
      });

      it('returns a resolved promise', function() {
        return expect(promise).to.be.fulfilled();
      });
    });

    context('when there is an issue retrieving the KPI data', function() {
      let expectedError;
      let kpiConfig;
      let expectedKpiName;
      let expectedOrgId;
      let promise;

      beforeEach(function() {
        expectedError = new Error(faker.hacker.phrase());
        kpiConfig = fixtures.build('kpiConfig', {
          compareBy: kpiEnums.COMPARE_BY_TYPES.DATE
        });

        expectedKpiName = kpiConfig.monthly.key;
        expectedOrgId = fixtures.build('organization').id;

        sinon
          .stub(contxtSdk[moduleConfig.name], 'getProxiedAssetMetricValues')
          .rejects(expectedError);

        promise = kpiActions.getPortfolioKPIData(expectedOrgId, kpiConfig, {
          primaryRangeEnd: faker.date.recent(),
          primaryRangeStart: faker.date.past(),
          secondaryRangeEnd: faker.date.recent(),
          secondaryRangeStart: faker.date.past()
        })(dispatch);
      });

      it(`dispatches a GET_PORTFOLIO_KPI_FAILURE action`, function() {
        return promise.then(expect.fail).catch(() => {
          expect(dispatch).to.be.calledWith({
            type: 'GET_PORTFOLIO_KPI_FAILURE',
            meta: {
              kpi: expectedKpiName
            },
            error: true,
            payload: expectedError.message
          });
        });
      });

      it('returns a rejected promise', function() {
        return expect(promise).to.be.rejectedWith(expectedError);
      });
    });
  });
});
