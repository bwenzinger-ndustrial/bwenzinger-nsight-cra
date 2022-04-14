import React from 'react';
import { isFinite } from 'lodash';
import PropTypes from 'prop-types';

import { kpiEnums } from '@ndustrial/nsight-common/kpi-config/constants';
import { getDisplayUnit } from '@ndustrial/nsight-common/kpi-config/getDisplayValues';
import { roundNumberString } from '@ndustrial/nsight-common/utils/numberFormat';

const propTypes = {
  value: PropTypes.number,
  kpiKey: PropTypes.string,
  unit: PropTypes.string.isRequired,
  unitPosition: PropTypes.string,
  significantDigits: PropTypes.number,
  className: PropTypes.string
};

const DetailKpiSummaryDateRangeValue = ({
  className,
  kpiKey,
  value,
  unit,
  unitPosition,
  significantDigits
}) => {
  let display = '---';
  const displayUnit = getDisplayUnit(kpiKey, unit);

  if (isFinite(value)) {
    const roundedValue = roundNumberString({
      num: value,
      significantDigits
    }).toLocaleString();
    display =
      unitPosition === kpiEnums.UNIT_POSITION.PREFIX
        ? `${displayUnit} ${roundedValue}`
        : `${roundedValue} ${displayUnit}`;
  }

  return <span className={className}>{display}</span>;
};

DetailKpiSummaryDateRangeValue.propTypes = propTypes;
export default DetailKpiSummaryDateRangeValue;
