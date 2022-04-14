import React, { useEffect, useMemo, useState } from 'react';
import _ from 'lodash';
import { rem } from 'polished';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import commonChartUtils from '@ndustrial/nsight-common/charts/commonChartUtils';
import SummaryBar from '@ndustrial/nsight-common/components/KPI/TopKpiSummary/SummaryBar';

const propTypes = {
  additionalMetrics: PropTypes.object,
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
  primaryDates: PropTypes.object.isRequired,
  primaryDetail: PropTypes.object
};

const SummaryWrapper = styled.div`
  margin: 0 auto;
  width: 100%;

  @media screen and (min-width: 1200px) and (orientation: landscape),
    screen and (min-width: 897px) and (orientation: portrait) {
    width: 50%;
  }
`;

const SummaryBarWrapper = styled.div`
  margin: 15px 0 5px 0;
  width: 100%;
`;

const SummaryText = styled.div`
  width: 100%;
  margin-bottom: 15px;

  @media screen and (min-width: 1200px) and (orientation: landscape),
    screen and (min-width: 897px) and (orientation: portrait) {
    width: 50%;
    margin: 0 auto;
    margin-bottom: 15px;
  }
`;

const Variance = styled.div`
  text-align: center;
  background: ${(props) =>
    commonChartUtils.getVarianceColor(
      props.kpi.isNegativeIndicator,
      props.theme,
      props.changeDirection
    )};
  width: 100%;
`;

const VarianceValue = styled.div`
  color: #fff;
  font-size: ${rem('20px')};
  font-weight: 100;
  line-height: ${rem('28px')};
`;

const SuggestedValue = styled.div`
  text-align: center;
  padding: 10px;
  width: 100%;
`;

function getValue(breakdown, key) {
  if (breakdown[key] && breakdown[key].records.length > 0) {
    return _.round(
      breakdown[key].records
        .map((item) => item.value)
        .reduce((prev, next) => prev + next)
    );
  } else {
    return 0;
  }
}

function getRemainingDays(endDate) {
  if (!endDate) {
    return 0;
  }

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const selectedYear = endDate.getFullYear();
  const selectedMonth = endDate.getMonth();

  const daysInSelectedMonth = new Date(currentYear, currentMonth, 0).getDate();

  // End date is current month and year
  // so calculate remaining days
  if (selectedMonth === currentMonth && selectedYear === currentYear) {
    return daysInSelectedMonth - currentDate.getDate();
  }
  // End date is historical, so show 0 remaining days
  else {
    return 0;
  }
}

function TopKpiSummary({ kpi, primaryDates, primaryDetail }) {
  const [changeDirection, setChangeDirection] = useState();
  const [difference, setDifference] = useState();
  const [percentChange, setPercentChange] = useState();

  const remainingDays = getRemainingDays(primaryDates.to);

  const totalBudget = useMemo(() => {
    if (primaryDetail && primaryDetail.breakdown) {
      return getValue(primaryDetail.breakdown, 'facility_daily_kwh_budget');
    } else {
      return undefined;
    }
  }, [primaryDetail.breakdown]); // eslint-disable-line react-hooks/exhaustive-deps

  const totalUsage = useMemo(() => {
    if (primaryDetail && primaryDetail.breakdown) {
      return getValue(
        primaryDetail.breakdown,
        'facility_daily_electricity_usage'
      );
    } else {
      return undefined;
    }
  }, [primaryDetail.breakdown]); // eslint-disable-line react-hooks/exhaustive-deps

  const remainingBudget = useMemo(() => {
    if (primaryDetail && primaryDetail.additionalMetrics) {
      return getValue(
        primaryDetail.additionalMetrics,
        'facility_daily_remaining_kwh_budget'
      );
    } else {
      return 0;
    }
  }, [primaryDetail.additionalMetrics]); // eslint-disable-line react-hooks/exhaustive-deps

  const suggestedDailyValue = useMemo(() => {
    if (primaryDetail && primaryDetail.additionalMetrics) {
      return getValue(
        primaryDetail.additionalMetrics,
        'facility_daily_rolling_month_avg_electricity_usage'
      );
    } else {
      return undefined;
    }
  }, [primaryDetail.additionalMetrics]); // eslint-disable-line react-hooks/exhaustive-deps

  const varianceText = commonChartUtils.getVarianceText(
    kpi.isNegativeIndicator,
    changeDirection,
    kpi.changeLanguage.positive,
    kpi.changeLanguage.negative
  );

  useEffect(() => {
    if (!_.isFinite(totalUsage) || !_.isFinite(totalBudget)) {
      setPercentChange(null);
      setChangeDirection(null);
      return;
    }

    let percentChange = null;
    const difference = totalUsage - totalBudget;
    setDifference(difference);

    percentChange = commonChartUtils.getPercentChange(totalBudget, totalUsage);
    setChangeDirection(
      commonChartUtils.getChangeDirection(
        totalBudget,
        totalUsage,
        kpi.compareBy
      )
    );
    if (_.isFinite(percentChange)) {
      setPercentChange(percentChange);
    }
  }, [totalUsage, totalBudget, difference, kpi]);

  return (
    <SummaryWrapper>
      <SummaryBarWrapper>
        <SummaryBar
          changeDirection={changeDirection}
          isNegativeIndicator={kpi.isNegativeIndicator}
          totalBudget={totalBudget}
          totalUsage={totalUsage}
          remainingBudget={remainingBudget}
          remainingDays={remainingDays}
        />
      </SummaryBarWrapper>
      <SummaryText>
        <Variance kpi={kpi} changeDirection={changeDirection}>
          <VarianceValue kpi={kpi} changeDirection={changeDirection}>
            {_.isFinite(percentChange)
              ? `${Math.abs(percentChange)}% ${varianceText}`
              : '---'}
          </VarianceValue>
        </Variance>
        <SuggestedValue>
          {suggestedDailyValue ? suggestedDailyValue.toLocaleString() : '---'}{' '}
          Daily Limit Suggested
        </SuggestedValue>
      </SummaryText>
    </SummaryWrapper>
  );
}

TopKpiSummary.propTypes = propTypes;

export default TopKpiSummary;
