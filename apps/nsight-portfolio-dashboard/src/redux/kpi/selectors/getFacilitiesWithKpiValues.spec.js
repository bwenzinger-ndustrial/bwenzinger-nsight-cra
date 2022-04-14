import { expect } from 'chai';
import faker from 'faker';

import { expressionParser } from '@ndustrial/nsight-common/utils';
import { fixtures } from '@ndustrial/nsight-test-utils';

import { getFacilitiesWithKpiValues } from './getFacilitiesWithKpiValues';

const slugWithUnderscores = (slug) => slug.replace(/-/gi, () => '_');

const sum = (values) =>
  values.reduce((acc, next) => acc + parseFloat(next.value), 0);

const makeData = (labels) =>
  labels.reduce(
    (acc, label) => ({
      ...acc,
      [label]: [
        { value: `${faker.random.number()}` },
        { value: `${faker.random.number()}` }
      ]
    }),
    {}
  );

const makeExpectedValues = (label1, label2, metrics, formula) => {
  const { parse } = expressionParser;

  const sum1 = sum(metrics[label1]);
  const sum2 = sum(metrics[label2]);
  const expectedKpiValue = parse(formula).evaluate({
    [label1]: sum1,
    [label2]: sum2
  });

  return { sum1, sum2, expectedKpiValue };
};

const makeKpiValuesByMetricKeyId = (
  kpiValuesByAssetMetricId,
  activeMetric,
  facilities,
  metricLabels
) => {
  kpiValuesByAssetMetricId = {
    comparisonData: {
      [activeMetric]: facilities.reduce((memo, facility) => {
        memo[facility.id] = makeData(metricLabels);

        return memo;
      }, {})
    },
    primaryData: {
      [activeMetric]: facilities.reduce((memo, facility) => {
        memo[facility.id] = makeData(metricLabels);

        return memo;
      }, {})
    }
  };
  return kpiValuesByAssetMetricId;
};

describe('nsight-portfolio-dashboard/redux/kpi/selectors/getFacilitiesWithKpiValues', function() {
  let activeMetric;
  let metricLabels;
  let facilities;
  let formula;
  let kpiConfig;

  // Facility data goes here
  let kpiValuesByMetricKeyId;

  beforeEach(function() {
    activeMetric = slugWithUnderscores(faker.lorem.slug());
    metricLabels = [
      slugWithUnderscores(faker.lorem.slug()),
      slugWithUnderscores(faker.lorem.slug()),
      slugWithUnderscores(faker.lorem.slug())
    ];

    formula = `sum(${metricLabels[0]}) / sum(${metricLabels[1]})`;

    kpiConfig = {
      compareBy: 'date',
      monthly: {
        key: activeMetric,
        formula
      }
    };

    facilities = [fixtures.build('facility'), fixtures.build('facility')];
  });

  describe('getFacilitiesWithKpiValues', function() {
    let facilitiesMap;

    beforeEach(function() {
      kpiValuesByMetricKeyId = makeKpiValuesByMetricKeyId(
        kpiValuesByMetricKeyId,
        activeMetric,
        [facilities[0]],
        metricLabels
      );
    });

    context('when primary and comparison data are set', function() {
      let comparisonValues;
      let facility;
      let primaryValues;

      beforeEach(function() {
        facilitiesMap = facilities.reduce((memo, facility) => {
          memo[facility.slug] = facility;

          return memo;
        }, {});

        // prettier-ignore
        primaryValues = makeExpectedValues(
        metricLabels[0],
        metricLabels[1],
        kpiValuesByMetricKeyId.primaryData[activeMetric][facilities[0].id],
        kpiConfig.monthly.formula
      );

        // prettier-ignore
        comparisonValues = makeExpectedValues(
        metricLabels[0],
        metricLabels[1],
        kpiValuesByMetricKeyId.comparisonData[activeMetric][facilities[0].id],
        kpiConfig.monthly.formula
      );

        [facility] = getFacilitiesWithKpiValues.resultFunc(
          kpiConfig,
          facilitiesMap,
          kpiValuesByMetricKeyId
        );
      });

      it('correctly calculated KPI for primary range', function() {
        expect(facility.calculatedPrimaryData.kpi.kpiValue).to.equal(
          primaryValues.expectedKpiValue
        );

        expect(
          facility.calculatedPrimaryData.kpi.kpiFormulaParts[metricLabels[0]]
        ).to.equal(primaryValues.sum1);

        expect(
          facility.calculatedPrimaryData.kpi.kpiFormulaParts[metricLabels[1]]
        ).to.equal(primaryValues.sum2);
      });

      it('correctly calculates KPI for comparison range', function() {
        expect(facility.calculatedComparisonData.kpi.kpiValue).to.equal(
          comparisonValues.expectedKpiValue
        );
        expect(
          facility.calculatedComparisonData.kpi.kpiFormulaParts[metricLabels[0]]
        ).to.equal(comparisonValues.sum1);

        expect(
          facility.calculatedComparisonData.kpi.kpiFormulaParts[metricLabels[1]]
        ).to.equal(comparisonValues.sum2);
      });

      it('excludes extraneous metric keys', function() {
        expect(
          facility.calculatedPrimaryData.kpi.kpiFormulaParts[metricLabels[2]]
        ).to.be.undefined();

        expect(
          facility.calculatedComparisonData.kpi.kpiFormulaParts[metricLabels[2]]
        ).to.be.undefined();
      });

      it('correctly calculates the % and value difference between comparison and primary data', function() {
        expect(facility.kpiDifference.value).to.equal(
          primaryValues.expectedKpiValue - comparisonValues.expectedKpiValue
        );

        // prettier-ignore
        expect(facility.kpiDifference.percent).to.equal(
        (1 - primaryValues.expectedKpiValue / comparisonValues.expectedKpiValue) * -1
      );
      });
    });

    context('when primary data is not set for a facility', function() {
      let facility;

      beforeEach(function() {
        const sparseKpiValues = {
          ...kpiValuesByMetricKeyId,
          primaryData: {}
        };

        [facility] = getFacilitiesWithKpiValues.resultFunc(
          kpiConfig,
          facilitiesMap,
          sparseKpiValues
        );
      });

      it('returns null for the calculated primary data', function() {
        // TODO here
        expect(facility.calculatedPrimaryData).to.be.null();
      });

      it('returns null for the calculated kpi difference', function() {
        expect(facility.kpiDifference).to.be.null();
      });
    });

    context('when comparison data is not set for a facility', function() {
      let facility;

      beforeEach(function() {
        const sparseKpiValues = {
          ...kpiValuesByMetricKeyId,
          comparisonData: {}
        };

        [facility] = getFacilitiesWithKpiValues.resultFunc(
          kpiConfig,
          facilitiesMap,
          sparseKpiValues
        );
      });

      it('returns null for the calculated comparison data', function() {
        // TODO here
        expect(facility.calculatedComparisonData).to.be.null();
      });

      it('returns null for the calculated kpi difference', function() {
        expect(facility.kpiDifference).to.be.null();
      });
    });
  });
});
