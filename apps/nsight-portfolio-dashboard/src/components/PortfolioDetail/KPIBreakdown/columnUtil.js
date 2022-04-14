import { isFinite } from 'lodash';

import { defaultTheme } from '@ndustrial/nd-theme-react';

import '@ndustrial/nd-table-react/lib/index.css';

import aggregateFuncs from './aggregationUtil';
import KPIBreakdownGridLinkCell from './KPIBreakdownGridLinkCell';
import KPIBreakdownGridPinnedLinkCell from './KPIBreakdownGridPinnedLinkCell';

const UNIT_TYPE_PERCENT = 'PERCENT';
const UNIT_TYPE_CURRENCY = 'CURRENCY';
const UNIT_TYPE_DEFAULT = 'DEFAULT';

const nullNumComparator = (valueA, valueB, nodeA, nodeB, isInverted) => {
  let val;
  if (!isFinite(valueA)) {
    val = 1;
  }

  if (!isFinite(valueB)) {
    val = -1;
  }

  if (val && isInverted) {
    return -val;
  } else if (val && !isInverted) {
    return val;
  }

  return valueA - valueB;
};

const getValue = (value, precision, unit) => {
  let unitType = UNIT_TYPE_DEFAULT;

  if (unit === '%') unitType = UNIT_TYPE_PERCENT;
  if (unit === '$' || unit.toLowerCase() === 'usd')
    unitType = UNIT_TYPE_CURRENCY;

  if (unitType === UNIT_TYPE_PERCENT) {
    if (!isFinite(value)) return '';

    const roundedPercentage = value.toLocaleString(undefined, {
      style: 'percent'
    });

    if (value > 0) {
      return `+${roundedPercentage}`;
    } else {
      return roundedPercentage;
    }
  }

  if (!value || !isFinite(value)) {
    value = 0;
  }

  if (unitType === UNIT_TYPE_CURRENCY) {
    return value.toLocaleString(undefined, {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: precision,
      maximumFractionDigits: precision
    });
  } else {
    return value.toLocaleString(undefined, {
      minimumFractionDigits: precision,
      maximumFractionDigits: precision
    });
  }
};

/**
 * Makes sure we don't get NaN, Infinity and -Infinity in our exports
 * @param {Object} Contains cell.value + access to the grid apis
 */
const processCellCallback = (cell) => {
  if (typeof cell.value === 'string') return cell.value;
  if (!isFinite(cell.value)) return null;
  return cell.value;
};

const buildPercentCellStyle = (value, isNegativeIndicator) => {
  if (
    (value > 0 && !isNegativeIndicator) ||
    (value < 0 && isNegativeIndicator)
  ) {
    return { color: defaultTheme.uiKitStates.success };
  }

  if (
    (value < 0 && !isNegativeIndicator) ||
    (value > 0 && isNegativeIndicator)
  ) {
    return { color: defaultTheme.uiKitStates.error };
  }
};

const getContextMenuItems = (params) => {
  return [
    'copy',
    'copyWithHeaders',
    'separator',
    {
      name: 'Export',
      subMenu: [
        {
          name: 'CSV Export',
          action: function() {
            params.api.exportDataAsCsv({
              processCellCallback: processCellCallback
            });
          }
        },
        {
          name: 'Excel Export (.xlsx)',
          action: () => {
            params.api.exportDataAsExcel({
              processCellCallback: processCellCallback
            });
          }
        }
      ]
    }
  ];
};

const gridOptions = {
  defaultColDef: {
    sortable: true,
    aggFunc: aggregateFuncs.nioSum,
    suppressMenu: true // UNCOMMENT IF THESE BECOME USEFUL
  },
  defaultColGroupDef: {
    sortable: true,
    marryChildren: true
  },
  getContextMenuItems
};

const frameworkComponents = {
  linkCell: KPIBreakdownGridLinkCell,
  pinnedLinkCell: KPIBreakdownGridPinnedLinkCell
};

export {
  buildPercentCellStyle,
  frameworkComponents,
  getValue,
  gridOptions,
  nullNumComparator
};
