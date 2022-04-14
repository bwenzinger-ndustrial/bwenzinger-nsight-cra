import React, { useCallback, useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';

import { ReactTable } from '@ndustrial/nd-table-react';
import { themeHelper } from '@ndustrial/nd-theme-react';
import ChartPieColored from '@ndustrial/nsight-common/assets/chartPieColored.svg';
import { kpiRangeTypes } from '@ndustrial/nsight-common/constants';
import {
  KPI_ICON_HASH,
  kpiEnums
} from '@ndustrial/nsight-common/kpi-config/constants';
import { getDisplayLabel } from '@ndustrial/nsight-common/kpi-config/getDisplayValues';

import '@ndustrial/nd-table-react/lib/index.css';

import useFilteredBreakdown from '../../hooks/useFilteredBreakdown';
import TreeItem from '../TreeItem';

const OverflowX = styled.div`
  overflow-x: auto;
`;

const IconContainer = styled.div`
  margin-right: 12px;
`;

const EstimatedIcon = styled.img`
  margin-right: 3px;
`;

const BreakdownName = styled.div`
  color: ${({ theme }) => theme.colors.text};
  padding-right: 12px;
  align-items: center;
  flex: 1;
  height: 40px;
  display: none;

  @media screen and (min-width: 897px) and (orientation: landscape),
    screen and (min-width: 768px) and (orientation: portrait) {
    display: flex;
    border-bottom: 1px dashed #d8d8d8;
  }
`;

const BoldBreakdownName = styled(BreakdownName)`
  font-weight: 700;
`;

const FixedHeightTable = styled(ReactTable)`
  && {
    /* stylelint-disable-next-line selector-class-pattern */
    .rt-thead.-header {
      border-bottom: 2px solid #fff;

      .rt-th {
        border-right: 2px solid #fff;
      }
    }

    .rt-tbody {
      /* stylelint-disable-next-line selector-class-pattern */
      .-odd .rt-td {
        background-color: ${({ theme }) =>
          themeHelper.whiten(theme.colors.text, 0.98)};
      }

      .rt-td {
        border-right: 2px solid #fff;
      }

      .rt-tr {
        border-bottom: 0;
      }
    }

    .rt-tr {
      height: 40px;
    }
  }
`;

const FlexContainer = styled.div`
  display: flex;

  > ${TreeItem} {
    flex-basis: 100px;

    @media screen and (min-width: 897px) and (orientation: landscape),
      screen and (min-width: 768px) and (orientation: portrait) {
      flex-basis: 325px;
    }
  }
`;

function createDateRangeString(dateRange, isRealTimeEnabled) {
  const start = isRealTimeEnabled
    ? moment(dateRange.from).format('MMM DD, YYYY')
    : moment(dateRange.from).format('MMM YYYY');
  const end = isRealTimeEnabled
    ? moment(dateRange.to).format('MMM DD, YYYY')
    : moment(dateRange.to).format('MMM YYYY');
  return `${start} - ${end}`;
}

const renderCell = ({ row }, rangeType) => {
  const { value, isEstimated } = row[rangeType];
  return (
    <div>
      {isEstimated && <EstimatedIcon src={ChartPieColored} />} {value}
    </div>
  );
};

function createTable(
  kpi,
  filteredBreakdown,
  comparisonDateRange,
  primaryDateRange,
  isRealTimeEnabled,
  theme,
  tableWidth,
  widthOffset
) {
  const isMetricKpi = kpi.compareBy === kpiEnums.COMPARE_BY_TYPES.METRIC;
  const columnWidth = isMetricKpi
    ? Math.round((tableWidth - widthOffset) * 0.9)
    : Math.round((tableWidth - widthOffset) * 0.3);

  const primaryColumn = {
    Header: primaryDateRange
      ? createDateRangeString(primaryDateRange, isRealTimeEnabled)
      : 'Set Primary Date Range',
    accessor: kpiRangeTypes.PRIMARY,
    width: columnWidth,
    headerStyle: {
      color: theme.colors.primary,
      backgroundColor: themeHelper.whiten(theme.colors.primary, 0.95),
      fontWeight: 'normal'
    },
    style: {
      textAlign: 'left'
    },
    Cell: (row) => renderCell(row, kpiRangeTypes.PRIMARY)
  };

  // metric kpi only gets the primary column
  if (kpi.compareBy === kpiEnums.COMPARE_BY_TYPES.METRIC) {
    return [primaryColumn];
  }

  const comparisonColumn = {
    Header: comparisonDateRange
      ? createDateRangeString(comparisonDateRange, isRealTimeEnabled)
      : 'Set Comparison Date Range',
    accessor: kpiRangeTypes.COMPARISON,
    width: columnWidth,
    headerStyle: {
      color: theme.colors.secondary,
      backgroundColor: themeHelper.whiten(theme.colors.secondary, 0.95),
      fontWeight: 'normal'
    },
    style: {
      textAlign: 'left'
    },
    Cell: (row) => renderCell(row, kpiRangeTypes.COMPARISON)
  };

  const changeColumn = {
    Header: '% Change',
    accessor: 'variance',
    width: columnWidth,
    headerStyle: {
      color: theme.colors.text,
      backgroundColor: themeHelper.whiten(theme.colors.text, 0.95),
      fontWeight: 'normal'
    },
    style: {
      textAlign: 'left'
    }
  };

  return [primaryColumn, comparisonColumn, changeColumn];
}

const DetailKpiBreakdownTable = withTheme(function({
  className,
  isRealTimeEnabled,
  kpi,
  tableData,
  theme,
  primaryDateRange,
  comparisonDateRange
}) {
  const isLandscape = window.innerWidth >= 768;
  const widthOffset = isLandscape ? 325 : 100;
  const [tableWidth, setWidth] = useState(window.innerWidth);

  const windowWidth = window.innerWidth;

  const updateWidth = useCallback(() => {
    setWidth(windowWidth);
  }, [windowWidth]);

  useEffect(() => {
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [updateWidth]);

  const filteredBreakdown = useFilteredBreakdown(kpi.detail?.breakdown);

  const columns = useMemo(() => {
    return createTable(
      kpi,
      filteredBreakdown,
      comparisonDateRange,
      primaryDateRange,
      isRealTimeEnabled,
      theme,
      tableWidth,
      widthOffset
    );
  }, [
    kpi,
    filteredBreakdown,
    comparisonDateRange,
    isRealTimeEnabled,
    primaryDateRange,
    theme,
    tableWidth,
    widthOffset
  ]);

  const childNodes = useMemo(() => {
    return filteredBreakdown.map((breakdown) => {
      const BreakdownIcon = KPI_ICON_HASH[breakdown.icon];
      const displayLabel = getDisplayLabel(breakdown.key, breakdown.name);

      return (
        <TreeItem
          itemHeight={41}
          key={breakdown.key}
          component={
            <React.Fragment>
              {!!BreakdownIcon && (
                <IconContainer>
                  <BreakdownIcon width="24px" height="24px" />
                </IconContainer>
              )}
              <BreakdownName>{displayLabel}</BreakdownName>
            </React.Fragment>
          }
        />
      );
    });
  }, [filteredBreakdown]);

  const KPIIcon = KPI_ICON_HASH[kpi.icon];
  const WeatherIcon = KPI_ICON_HASH.WeatherLightning;

  return (
    <FlexContainer
      className={className}
      data-testid="detail-kpi-breakdown-table"
    >
      <TreeItem
        itemHeight={41}
        component={
          <React.Fragment>
            {!!KPIIcon && (
              <IconContainer>
                <KPIIcon width="40px" height="40px" />
              </IconContainer>
            )}
            <BoldBreakdownName height="40px">
              {kpi.label.toLocaleUpperCase()}
            </BoldBreakdownName>
          </React.Fragment>
        }
      >
        {childNodes.length > 0 && childNodes}
        <TreeItem
          itemHeight={41}
          key="daily_weather"
          component={
            <React.Fragment>
              <IconContainer>
                <WeatherIcon width="24px" height="24px" />
              </IconContainer>
              <BreakdownName>Weather</BreakdownName>
            </React.Fragment>
          }
        />
      </TreeItem>
      <OverflowX>
        <FixedHeightTable
          sortable={false}
          resizable={false}
          pageSize={filteredBreakdown ? filteredBreakdown.length + 1 : 0}
          showPagination={false}
          columns={columns}
          data={tableData}
        />
      </OverflowX>
    </FlexContainer>
  );
});

DetailKpiBreakdownTable.propTypes = {
  className: PropTypes.string,
  tableData: PropTypes.array,
  primaryDateRange: PropTypes.shape({
    from: PropTypes.instanceOf(Date),
    to: PropTypes.instanceOf(Date)
  }),
  comparisonDateRange: PropTypes.shape({
    from: PropTypes.instanceOf(Date),
    to: PropTypes.instanceOf(Date)
  }),
  theme: PropTypes.shape({
    colors: PropTypes.shape({
      primary: PropTypes.string.isRequired,
      secondary: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      textLight: PropTypes.string.isRequired
    })
  }),
  isRealTimeEnabled: PropTypes.bool.isRequired,
  kpi: PropTypes.shape({
    label: PropTypes.string.isRequired,
    monthly: PropTypes.shape({
      key: PropTypes.string.isRequired,
      formula: PropTypes.string.isRequired
    }),
    detail: PropTypes.shape({
      breakdown: PropTypes.arrayOf(
        PropTypes.shape({
          key: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          icon: PropTypes.string.isRequired
        })
      )
    })
  }).isRequired
};

export default styled(DetailKpiBreakdownTable)``;
