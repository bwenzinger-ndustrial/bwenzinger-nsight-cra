import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import { rem } from 'polished';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import commonChartUtils from '@ndustrial/nsight-common/charts/commonChartUtils';
import { useIsRealTimeEnabled } from '@ndustrial/nsight-common/hooks';
import { whiten } from '@ndustrial/nsight-common/utils/colors';

import DetailKpiSummaryDateRangeValue from './DetailKpiSummaryDateRangeValue';
import DetailKpiSummarySeriesItem from './DetailKpiSummarySeriesItem';

const Variance = styled.div`
  align-items: center;
  background: ${({ theme, kpi, changeDirection }) =>
    whiten(
      commonChartUtils.getVarianceColor(
        kpi.isNegativeIndicator,
        theme,
        changeDirection
      ),
      0.9
    )};
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Summary = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;

  ${Variance} {
    margin-bottom: 20px;
    padding: 20px 0;
  }
`;

const VarianceValue = styled.span`
  color: ${({ theme, kpi, changeDirection }) =>
    commonChartUtils.getVarianceColor(
      kpi.isNegativeIndicator,
      theme,
      changeDirection
    )};
  font-size: ${rem('26px')};
  font-weight: 100;
  line-height: ${rem('57px')};
`;

const VarianceDate = styled.span`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${rem('14px')};
  font-weight: 700;
  line-height: ${rem('20px')};
`;

const DateDetailsTitle = styled.h3`
  /* stylelint-disable-next-line sh-waqar/declaration-use-variable */
  background: #fff;
  color: ${({ theme }) => theme.colors.textLight};
  display: inline-block;
  font-size: ${rem('16px')};
  font-style: italic;
  font-weight: 300;
`;

const DateDetailDivider = styled.div`
  height: 2px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.disabled};
`;

const DateDetailVariance = styled.span`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: ${rem('12px')};
`;

const Title = styled.span`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${rem('14px')};
  font-weight: 400;
`;

const Value = styled.span`
  color: ${({ theme, kpi, changeDirection }) =>
    commonChartUtils.getVarianceColor(
      kpi.isNegativeIndicator,
      theme,
      changeDirection
    )};
  font-size: ${rem('14px')};
`;

const ValueDifference = styled(DetailKpiSummaryDateRangeValue)`
  margin-right: 0.25rem;
`;

const ValuePercentage = styled.span`
  color: ${({ theme, kpi, changeDirection }) =>
    commonChartUtils.getVarianceColor(
      kpi.isNegativeIndicator,
      theme,
      changeDirection
    )};
`;

const DateDetails = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 2px dashed #ddd;
  padding: 0 12px 20px;

  ${DateDetailsTitle} {
    margin: -10px auto 12px;
    padding: 0 8px 4px;
  }

  ${DateDetailVariance} {
    margin-bottom: 0;
  }

  ${DateDetailDivider} {
    margin: 12px 0;
  }
`;

const propTypes = {
  kpiWindow: PropTypes.string.isRequired,
  assetMetricFormula: PropTypes.string,
  className: PropTypes.string,
  comparisonDates: PropTypes.any,
  kpi: PropTypes.shape({
    isNegativeIndicator: PropTypes.bool,
    unit: PropTypes.string,
    compareBy: PropTypes.string.isRequired,
    unitPosition: PropTypes.string.isRequired,
    significantDigits: PropTypes.number.isRequired,
    daily: PropTypes.shape({
      key: PropTypes.string.isRequired,
      formula: PropTypes.string.isRequired
    }),
    monthly: PropTypes.shape({
      key: PropTypes.string.isRequired,
      formula: PropTypes.string.isRequired
    }),
    changeLanguage: PropTypes.shape({
      positive: PropTypes.string.isRequired,
      negative: PropTypes.string.isRequired
    })
  }),
  primaryDates: PropTypes.any,
  primaryValue: PropTypes.number,
  comparisonValue: PropTypes.number
};

function formatDate(date, isRealTimeEnabled) {
  if (date && isRealTimeEnabled) {
    return moment(date).format('MMM DD, YYYY');
  } else if (date && !isRealTimeEnabled) {
    return moment(date).format('MMM YYYY');
  } else {
    return null;
  }
}

function KpiSummary({
  kpiWindow,
  className,
  comparisonDates,
  primaryDates,
  primaryValue,
  comparisonValue,
  kpi
}) {
  const activeMetricKey = kpi[kpiWindow].key;

  const isRealTimeEnabled = useSelector(useIsRealTimeEnabled);

  const primaryRangeFrom = formatDate(
    primaryDates && primaryDates.from,
    isRealTimeEnabled
  );
  const primaryRangeTo = formatDate(
    primaryDates && primaryDates.to,
    isRealTimeEnabled
  );
  const comparisonRangeFrom = formatDate(
    comparisonDates && comparisonDates.from,
    isRealTimeEnabled
  );
  const comparisonRangeTo = formatDate(
    comparisonDates && comparisonDates.to,
    isRealTimeEnabled
  );

  const [changeDirection, setChangeDirection] = useState();
  const [difference, setDifference] = useState();
  const [percentChange, setPercentChange] = useState();

  const { unit = '', unitPosition } = kpi;

  useEffect(() => {
    if (!_.isFinite(primaryValue) || !_.isFinite(comparisonValue)) {
      setPercentChange(null);
      setChangeDirection(null);
      return;
    }

    let percentChange = null;
    const difference = primaryValue - comparisonValue;
    setDifference(difference);

    percentChange = commonChartUtils.getPercentChange(
      comparisonValue,
      primaryValue
    );
    setChangeDirection(
      commonChartUtils.getChangeDirection(
        comparisonValue,
        primaryValue,
        kpi.compareBy
      )
    );
    if (_.isFinite(percentChange)) {
      setPercentChange(percentChange);
    }
  }, [comparisonValue, primaryValue, difference, kpi]);

  const varianceText = commonChartUtils.getVarianceText(
    kpi.isNegativeIndicator,
    changeDirection,
    kpi.changeLanguage.positive,
    kpi.changeLanguage.negative
  );

  const varianceSign = commonChartUtils.getVarianceSign(
    kpi.isNegativeIndicator,
    changeDirection
  );

  return (
    <Summary className={className}>
      <Variance kpi={kpi} changeDirection={changeDirection}>
        <VarianceValue kpi={kpi} changeDirection={changeDirection}>
          {_.isFinite(percentChange)
            ? `${Math.abs(percentChange)}% ${varianceText}`
            : '---'}
        </VarianceValue>
        {(!primaryRangeFrom ||
          !primaryRangeTo ||
          !comparisonRangeFrom ||
          !comparisonRangeTo) && (
          <VarianceDate>No Date Range Selected</VarianceDate>
        )}
      </Variance>
      <DateDetails>
        <DateDetailsTitle>Summary</DateDetailsTitle>
        <DetailKpiSummarySeriesItem
          activeMetricKey={activeMetricKey}
          isPrimary={true}
          kpi={kpi}
          rangeFrom={primaryRangeFrom}
          rangeTo={primaryRangeTo}
          value={primaryValue}
        />
        <DetailKpiSummarySeriesItem
          activeMetricKey={activeMetricKey}
          kpi={kpi}
          rangeFrom={comparisonRangeFrom}
          rangeTo={comparisonRangeTo}
          value={comparisonValue}
        />
        <DateDetailDivider />
        <DateDetailVariance>
          <Title>Change:</Title>
          <Value kpi={kpi} changeDirection={changeDirection}>
            {(percentChange || difference) && (
              <ValueDifference
                kpiKey={kpi[activeMetricKey]}
                unit={unit}
                value={difference}
                unitPosition={unitPosition}
                significantDigits={kpi.significantDigits}
              />
            )}
            <ValuePercentage kpi={kpi} changeDirection={changeDirection}>
              {_.isFinite(percentChange)
                ? `(${varianceSign}${Math.abs(percentChange)}%)`
                : '---'}
            </ValuePercentage>
          </Value>
        </DateDetailVariance>
      </DateDetails>
    </Summary>
  );
}

KpiSummary.propTypes = propTypes;

export default KpiSummary;
