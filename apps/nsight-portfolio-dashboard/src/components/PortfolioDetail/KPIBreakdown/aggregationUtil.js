import { isFinite } from 'lodash';

import { kpiEnums } from '@ndustrial/nsight-common/kpi-config/constants';
import { expressionParser } from '@ndustrial/nsight-common/utils';

/**
 * Generates the difference between two kpis, or returns null if it can't be calculated
 * @param calculatedPrimaryData
 * @param calculatedComparisonData
 * @returns {{value: number, percent: number}|null}
 * @private
 */
export function calculateKpiDelta(primaryDataValue, calculatedDataValue) {
  if (primaryDataValue && calculatedDataValue) {
    // prettier-ignore
    return {
      value:
        primaryDataValue - calculatedDataValue,
      percent:
        (1 - primaryDataValue / calculatedDataValue) * -1
    };
  }

  return {
    value: 0,
    percent: 0
  };
}

function _calculateCompareByDateValue(kpiFormula, kpiData) {
  const formula = kpiFormula.replace('max', 'sum');
  const expression = expressionParser.parse(formula);

  const variablesMap = expression
    .variables()
    .reduce((variableMap, value) => ({ ...variableMap, [value]: [] }), {});

  const expressionData = kpiData.reduce((values, data) => {
    Object.keys(data).forEach((variable) => {
      let variableValue = data[variable];
      if (!isFinite(variableValue)) {
        variableValue = 0;
      }

      values = {
        ...values,
        [variable]: [...values[variable], variableValue]
      };
    });

    return values;
  }, variablesMap);

  return expression.evaluate(expressionData);
}

function _calculateCompareByMetricValue(kpiData) {
  return kpiData.reduce((value, temp) => {
    return value + temp;
  }, 0);
}

export function calculateKpiValue(kpiData, kpiFormula, compareBy) {
  /**
   * At this point, all the individual facility variable data has been processed with the appropriate
   * aggregate function.  For instance, something like cubic footage, has already evaluated the
   * max asset attribute value or asset metric value when the table data was initially generated in
   * getFacilitiesWithKpiValues.js
   *
   * Example: the original Space Efficiency formula:
   *    sum(facility_monthly_electricity_usage) / max(facility_monthly_cubic_footage)
   * will turn into:
   *    sum(facility_monthly_electricity_usage) / sum(facility_monthly_cubic_footage)
   *
   * TODO: we could potentially add these to the kpi config as an additional formula, but it's probably
   *   not worth it yet
   */

  if (compareBy === kpiEnums.COMPARE_BY_TYPES.DATE) {
    return _calculateCompareByDateValue(kpiFormula, kpiData);
  } else {
    return _calculateCompareByMetricValue(kpiData);
  }
}

function _formatParamsAndCalculateValue(
  params,
  kpiFormula,
  isPrimaryColumn,
  compareBy
) {
  if (
    params.rowNode &&
    params.rowNode.allLeafChildren &&
    params.rowNode.allLeafChildren.length > 0
  ) {
    if (compareBy === kpiEnums.COMPARE_BY_TYPES.DATE) {
      return calculateKpiValue(
        params.rowNode.allLeafChildren.map((item) => {
          const data = isPrimaryColumn
            ? item.data.calculatedPrimaryData.kpi.kpiFormulaParts
            : item.data.calculatedComparisonData.kpi.kpiFormulaParts;
          return {
            ...data
          };
        }),
        kpiFormula,
        compareBy
      );
    } else {
      return calculateKpiValue(
        params.rowNode.allLeafChildren.map((item) => {
          const data = isPrimaryColumn
            ? item.data.calculatedPrimaryData.kpi.kpiValue
            : item.data.calculatedComparisonData.kpi.kpiValue;
          return data;
        }),
        kpiFormula,
        compareBy
      );
    }
  } else {
    return undefined;
  }
}

const aggregateFuncs = {
  nioSum: (params) => {
    return params.values.reduce((sum, value) => {
      if (!isFinite(value)) {
        return sum;
      }
      return sum + value;
    }, 0);
  },
  kpiAggregate: (compareBy, kpiFormula, isPrimaryColumn) => (params) => {
    return _formatParamsAndCalculateValue(
      params,
      kpiFormula,
      isPrimaryColumn,
      compareBy
    );
  },
  kpiPercentDiff: (compareBy, kpiFormula) => (params) => {
    const primary = _formatParamsAndCalculateValue(
      params,
      kpiFormula,
      true,
      compareBy
    );
    const comparison = _formatParamsAndCalculateValue(
      params,
      kpiFormula,
      false,
      compareBy
    );
    return (1 - primary / comparison) * -1;
  },
  kpiValueDiff: (compareBy, kpiFormula) => (params) => {
    const primary = _formatParamsAndCalculateValue(
      params,
      kpiFormula,
      true,
      compareBy
    );
    const comparison = _formatParamsAndCalculateValue(
      params,
      kpiFormula,
      false,
      compareBy
    );
    return primary - comparison;
  }
};

export default aggregateFuncs;
