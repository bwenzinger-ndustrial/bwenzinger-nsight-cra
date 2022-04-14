import { createSelector } from 'reselect';

import { kpiEnums } from '@ndustrial/nsight-common/kpi-config/constants';
import { getPortfolioKpiConfigWithRouter } from '@ndustrial/nsight-common/selectors';
import { expressionParser } from '@ndustrial/nsight-common/utils';

import { calculateKpiDelta } from '../../../components/PortfolioDetail/KPIBreakdown/aggregationUtil';

const _sum = (values) =>
  values.reduce((acc, next) => {
    if (next === null) {
      return acc;
    }

    return acc + parseFloat(next);
  }, 0);

/**
 * Calculates a kpi given data and a formula
 * @param kpiFormulaVariableValues
 * @param activeMetric - a kpi config object
 * @returns {{kpiValue: any, kpiFormulaParts: any}}
 * @private
 */
const _calculateFormulaParts = (kpiFormulaVariableValues, activeMetric) => {
  return Object.keys(kpiFormulaVariableValues).reduce((acc, key) => {
    const { breakdown } = activeMetric.monthly;

    // If we have a defined formula for the breakdown value, use that,
    // otherwise we'll just sum up the values.
    const breakdownFormula =
      breakdown && breakdown[key]
        ? expressionParser.parse(breakdown[key])
        : null;
    return {
      ...acc,
      [key]: breakdownFormula
        ? breakdownFormula.evaluate(kpiFormulaVariableValues)
        : _sum(kpiFormulaVariableValues[key])
    };
  }, {});
};

const _calculateKpiValueForCompareByDate = (
  comparisonData,
  primaryData,
  expression,
  kpiKey
) => {
  let calculatedComparisonData = null;
  let calculatedPrimaryData = null;

  if (comparisonData) {
    const {
      kpiFormulaParts: comparsionFormulaParts,
      kpiFormulaVariableValues: comparisonVariableValues
    } = comparisonData;

    calculatedComparisonData = {
      kpi: {
        kpiKey,
        kpiValue: expression.evaluate(comparisonVariableValues),
        kpiFormulaParts: comparsionFormulaParts
      }
    };
  }

  if (primaryData) {
    const {
      kpiFormulaParts: primaryFormulaParts,
      kpiFormulaVariableValues: primaryVariableValues
    } = primaryData;

    // This will work for a 'date' kpi
    calculatedPrimaryData = {
      kpi: {
        kpiKey,
        kpiValue: expression.evaluate(primaryVariableValues),
        kpiFormulaParts: primaryFormulaParts
      }
    };
  }

  // let hasMissingData = false;
  // if (primaryData && comparisonData) {
  //   hasMissingData = isMissingDateData(primaryData);

  //   if (!hasMissingData) {
  //     hasMissingData = isMissingDateData(comparisonData);
  //   }
  // }

  const kpiDifference =
    calculatedPrimaryData && calculatedComparisonData
      ? calculateKpiDelta(
          calculatedPrimaryData.kpi.kpiValue,
          calculatedComparisonData.kpi.kpiValue
        )
      : null;

  return {
    calculatedPrimaryData,
    calculatedComparisonData,
    kpiDifference
    // hasMissingData
  };
};

const _calculateKpiValueForCompareByMetric = (
  comparisonData,
  primaryData,
  activeMetric
) => {
  let calculatedComparisonData = null;
  let calculatedPrimaryData = null;

  let kpiDifference;

  if (comparisonData) {
    const comparisonPartKey = activeMetric.comparisonMetric.replace(
      'organization',
      'facility'
    );
    calculatedComparisonData = {
      kpi: {
        kpiKey: activeMetric.monthly.key,
        kpiValue: comparisonData.kpiFormulaParts[comparisonPartKey],
        kpiFormulaParts: null
      }
    };
  }

  if (primaryData) {
    const primaryPartKey = activeMetric.primaryMetric.replace(
      'organization',
      'facility'
    );
    calculatedPrimaryData = {
      kpi: {
        kpiKey: activeMetric.monthly.key,
        kpiValue: primaryData.kpiFormulaParts[primaryPartKey],
        kpiFormulaParts: null
      }
    };
  }

  // let hasMissingData = false;
  if (comparisonData && primaryData) {
    kpiDifference = calculateKpiDelta(
      calculatedPrimaryData.kpi.kpiValue,
      calculatedComparisonData.kpi.kpiValue
    );
    // hasMissingData = isMissingMetricData(calculatedPrimaryData.kpi);

    // if (!hasMissingData) {
    //   hasMissingData = isMissingMetricData(calculatedComparisonData.kpi);
    // }
  }

  return {
    calculatedPrimaryData,
    calculatedComparisonData,
    kpiDifference
    // hasMissingData
  };
};

// function isMissingDateData(data) {
//   let missingData = false;
//   Object.keys(data.kpiFormulaParts).forEach((key) => {
//     const value = data.kpiFormulaParts[key];
//     if (value === -Infinity || value === 0) {
//       missingData = true;
//     }
//   });

//   return missingData;
// }

// function isMissingMetricData(data) {
//   let missingData = false;
//   if (
//     data.kpiValue === undefined ||
//     data.kpiValue === 0 ||
//     data.kpiValue === -Infinity
//   ) {
//     missingData = true;
//   }

//   return missingData;
// }

/**
 * Calculates the primary and comparison range kpis, and returns kpiValue, kpiKey, and kpiFormulaParts
 * for each one.  Additionally, calculates the value and percent difference between
 * the two ranges.
 *
 * @param {object} kpiData - all data stored in state.kpiData
 * @param {object} facility - facility
 * @param {string} activeMetric - the metric label/key
 * @param {object} formulaInfo - formula, label, and breakdown information about the activeMetric
 * @returns {{calculatedComparisonData: (null|{kpi: {kpiValue: *, kpiKey: *, kpiFormulaParts: *}}), calculatedPrimaryData: (null|{kpi: {kpiValue: *, kpiKey: *, kpiFormulaParts: *}}), kpiDifference: {value: number, percent: number}}}
 * @private
 */
const _getPrimaryComparisonAndKpiDiff = (kpiData, facility, activeMetric) => {
  const expression = expressionParser.parse(activeMetric.monthly.formula);

  const primaryData = _calculateFacilityKpiFormulaParts(
    kpiData.primaryData,
    facility.id,
    activeMetric
  );

  const comparisonData = _calculateFacilityKpiFormulaParts(
    kpiData.comparisonData,
    facility.id,
    activeMetric
  );

  if (activeMetric.compareBy === kpiEnums.COMPARE_BY_TYPES.DATE) {
    const {
      calculatedPrimaryData,
      calculatedComparisonData,
      kpiDifference
      // hasMissingData
    } = _calculateKpiValueForCompareByDate(
      comparisonData,
      primaryData,
      expression,
      activeMetric.monthly.key
    );

    return {
      ...facility,
      calculatedPrimaryData,
      calculatedComparisonData,
      kpiDifference
      // hasMissingData
    };
  }

  if (activeMetric.compareBy === kpiEnums.COMPARE_BY_TYPES.METRIC) {
    const {
      calculatedPrimaryData,
      calculatedComparisonData,
      kpiDifference
      // hasMissingData
    } = _calculateKpiValueForCompareByMetric(
      comparisonData,
      primaryData,
      activeMetric
    );

    return {
      ...facility,
      calculatedPrimaryData,
      calculatedComparisonData,
      kpiDifference
      // hasMissingData
    };
  }
};

/**
 *
 * @param kpiData
 * @param id
 * @param activeMetric
 * @param formulaInfo
 * @param isPrimaryData
 * @private
 */
const _calculateFacilityKpiFormulaParts = (kpiData, id, activeMetric) => {
  const kpiKey = activeMetric.monthly.key;
  if (!kpiData[kpiKey] || !kpiData[kpiKey][id]) return null;

  const expression = expressionParser.parse(activeMetric.monthly.formula);
  const variables = expression.variables();

  // Converts
  // { metricKey: [ { value: 'some-value' }, ... ] }
  // to
  // { metricKey: [ 'some-value', ... ] }
  const kpiFormulaVariableValues = Object.keys(kpiData[kpiKey][id]).reduce(
    (memo, metricKey) => {
      const metricBreakdownData = kpiData[kpiKey][id];

      if (variables.indexOf(metricKey) < 0) return { ...memo };

      return {
        ...memo,
        [metricKey]: metricBreakdownData[metricKey].map((obj) => obj.value)
      };
    },
    {}
  );

  const kpiFormulaParts = _calculateFormulaParts(
    kpiFormulaVariableValues,
    activeMetric
  );

  return {
    kpiFormulaParts,
    kpiFormulaVariableValues
  };
};

const _getFacilityIdsMap = (state) => {
  const facilitySlugMap = state.facilities.items;
  return Object.keys(facilitySlugMap).reduce((acc, facilitySlug) => {
    const f = facilitySlugMap[facilitySlug];
    acc[f.id] = f;
    return acc;
  }, {});
};
const _getFacilityGroupings = (state) => state.facilities.groupings;
const _getKpiData = (state) => state.kpiData;

const getFacilitiesWithKpiValues = createSelector(
  getPortfolioKpiConfigWithRouter,
  _getFacilityIdsMap,
  _getKpiData,
  (activeKpiConfig, facilityIdsMap, kpiData) => {
    if (!(facilityIdsMap && activeKpiConfig)) {
      return [];
    }

    return Object.keys(facilityIdsMap).map((key) => {
      const facility = facilityIdsMap[key];
      return _getPrimaryComparisonAndKpiDiff(
        kpiData,
        facility,
        activeKpiConfig
      );
    });
  }
);

const getFacilitiesWithHierarchyAndKpiValues = createSelector(
  _getFacilityGroupings,
  getFacilitiesWithKpiValues,
  (groups, facilities) => {
    const facilityMap = {};

    facilities.forEach((facility) => {
      facilityMap[facility.id] = facility;
    });

    const groupFacilityHierarchy = [];

    const traverseGroupTree = (group, hierarchy = []) => {
      hierarchy = [...hierarchy, group.name];

      if (group.children) {
        group.children.forEach((childGroup) => {
          traverseGroupTree(childGroup, hierarchy);
        });
      }

      if (group.facilities) {
        group.facilities.forEach((facility) => {
          const facilityId = facility.id;
          // New object so that when we have duplicate facilities we don't
          // also update the duplicates when we set the group keys.
          const facilityWithKpiValues = {
            ...facilityMap[facilityId],
            hierarchy: [...hierarchy, facility.name]
          };

          groupFacilityHierarchy.push(facilityWithKpiValues);
        });
      }
    };

    groups.forEach((group) => {
      traverseGroupTree(group);
    });

    return groupFacilityHierarchy;
  }
);

export { getFacilitiesWithHierarchyAndKpiValues, getFacilitiesWithKpiValues };
