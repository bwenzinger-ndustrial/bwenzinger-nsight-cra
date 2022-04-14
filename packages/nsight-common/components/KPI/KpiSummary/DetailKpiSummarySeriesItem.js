import React from 'react';
import _ from 'lodash';
import { rem } from 'polished';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { kpiEnums } from '@ndustrial/nsight-common/kpi-config/constants';

import { kpiRangeTypes } from '../../../constants';
import DetailKpiSummaryDateRangeValue from './DetailKpiSummaryDateRangeValue';

const propTypes = {
  activeMetricKey: PropTypes.string.isRequired,
  kpi: PropTypes.shape({
    detail: PropTypes.shape({
      breakdown: PropTypes.arrayOf(
        PropTypes.shape({
          key: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired
        })
      ).isRequired
    }),
    compareBy: PropTypes.oneOf(Object.values(kpiEnums.COMPARE_BY_TYPES))
      .isRequired,
    primaryMetric: PropTypes.string,
    comparisonMetric: PropTypes.string,
    unit: PropTypes.string.isRequired,
    daily: PropTypes.shape({
      key: PropTypes.string.isRequired
    }),
    monthly: PropTypes.shape({
      key: PropTypes.string.isRequired
    }),
    unitPosition: PropTypes.string.isRequired,
    significantDigits: PropTypes.number.isRequired
  }),
  isPrimary: PropTypes.bool,
  rangeFrom: PropTypes.string,
  rangeTo: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

const SeriesCircle = styled.span`
  border-radius: 50%;
  display: inline-block;
  height: 8px;
  width: 8px;
  margin-right: 8px;
`;

const SeriesLabel = styled.span`
  align-items: center;
  display: flex;
  font-size: ${rem('14px')};
`;

const DateRangeValue = styled(DetailKpiSummaryDateRangeValue)`
  color: ${({ theme }) => theme.uiKitText.text};
  font-size: ${rem('14px')};
`;

const SeriesDetails = styled.span.attrs(({ theme, isPrimary }) => ({
  seriesColor: isPrimary ? theme.colors.primary : theme.colors.secondary
}))`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: ${rem('12px')};
  line-height: ${rem('24px')};

  ${SeriesLabel} {
    ${({ seriesColor }) => ({
      color: seriesColor
    })}
  }

  ${SeriesCircle} {
    ${({ seriesColor }) => ({
      backgroundColor: seriesColor
    })}
  }
`;

const DetailKpiSummarySeriesItem = ({
  rangeFrom,
  rangeTo,
  value,
  kpi,
  isPrimary,
  activeMetricKey
}) => {
  const { unit, unitPosition, significantDigits } = kpi;

  let label;

  if (kpi.compareBy === kpiEnums.COMPARE_BY_TYPES.METRIC) {
    label = isPrimary
      ? kpi.detail.breakdown.find((item) => item.key === kpi.primaryMetric).name
      : kpi.detail.breakdown.find((item) => item.key === kpi.comparisonMetric)
          .name;
  } else {
    // prettier-ignore
    label = rangeFrom && rangeTo
      ? `${rangeFrom} - ${rangeTo}:`
      : `Set ${isPrimary ? _.capitalize(kpiRangeTypes.PRIMARY) : _.capitalize(kpiRangeTypes.COMPARISON) } Date Range:`
  }

  return (
    <SeriesDetails isPrimary={isPrimary}>
      <SeriesLabel>
        <SeriesCircle />
        {label}
      </SeriesLabel>
      <DateRangeValue
        kpiKey={activeMetricKey}
        unit={unit}
        value={value}
        unitPosition={unitPosition}
        significantDigits={significantDigits}
      />
    </SeriesDetails>
  );
};

DetailKpiSummarySeriesItem.propTypes = propTypes;

export default DetailKpiSummarySeriesItem;
