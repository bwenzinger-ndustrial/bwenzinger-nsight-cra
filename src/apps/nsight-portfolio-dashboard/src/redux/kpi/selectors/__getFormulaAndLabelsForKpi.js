import { createSelector } from 'reselect';

import { getFormulasAndUnitsKeyedByKpi } from '@ndustrial/nsight-common/selectors';
import { expressionParser } from '@ndustrial/nsight-common/utils';

const makeFormulasAndLabelsForKpiSelector = (kpiKey) => {
  return createSelector(
    getFormulasAndUnitsKeyedByKpi,
    (formulas) => {
      const formula = formulas[kpiKey] ? formulas[kpiKey].formula : null;
      const labels = formula
        ? expressionParser.parse(formula).variables()
        : null;

      return {
        kpiKey,
        formula,
        labels
      };
    }
  );
};

export default makeFormulasAndLabelsForKpiSelector;
