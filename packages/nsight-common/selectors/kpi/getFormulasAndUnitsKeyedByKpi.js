import { createSelector } from 'reselect';

import formulaAndUnitData from '../../kpi-config/formulasAndUnits.json';

// TODO: need to find a better home for formulas and units
const _getFormulasAndUnits = (state) => formulaAndUnitData;

export default createSelector(
  _getFormulasAndUnits,
  (formulasAndUnits) => {
    return formulasAndUnits.reduce((acc, next) => {
      return { [next.label]: next, ...acc };
    }, {});
  }
);
