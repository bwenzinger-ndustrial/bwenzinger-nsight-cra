// TODO: readd useState when enabling grouping radio buttons

import React from 'react';
import { AgGridColumn } from 'ag-grid-react';

import { dateConstants } from '@ndustrial/nsight-common/constants';
import { kpiEnums } from '@ndustrial/nsight-common/kpi-config/constants';

import './ag-grid.scss';
import 'ag-grid-enterprise';

import aggregateFuncs from './aggregationUtil';
import {
  buildPercentCellStyle,
  getValue,
  nullNumComparator
} from './columnUtil';

const {
  forwardSlash: { MM_DD_YY }
} = dateConstants;

export function getKPIBreakdownTableCommonColDef(
  comparisonDates,
  kpiConfig,
  primaryDates
) {
  const {
    label,
    unit,
    detail,
    compareBy,
    primaryMetric,
    comparisonMetric,
    isNegativeIndicator
  } = kpiConfig;

  const getLabel = (dates) => {
    const hasDates = dates.from && dates.to;
    return hasDates
      ? `${dates.from.format(MM_DD_YY)} - ${dates.to &&
          dates.to.format(MM_DD_YY)}`
      : ' ';
  };
  const getPercentStyle = (params) => {
    return buildPercentCellStyle(params.value, isNegativeIndicator);
  };
  const isDateMetric = compareBy === kpiEnums.COMPARE_BY_TYPES.DATE;
  const kpiHeaderText = `${label} (${unit})`;

  const toReturn = [];

  if (isDateMetric) {
    detail.breakdown.forEach((kpiPart) => {
      toReturn.push(
        <AgGridColumn
          key={kpiPart.name + kpiPart.unit}
          headerName={`${kpiPart.name} (${kpiPart.unit})`}
        >
          <AgGridColumn
            headerName={getLabel(primaryDates)}
            headerClass="primary-header"
            valueFormatter={({ value }) => getValue(value, 2, kpiPart.unit)}
            valueGetter={({ data }) => {
              return data.calculatedPrimaryData &&
                data.calculatedPrimaryData.kpi.kpiFormulaParts
                ? data.calculatedPrimaryData.kpi.kpiFormulaParts[kpiPart.key]
                : null;
            }}
          />
          <AgGridColumn
            headerName={getLabel(comparisonDates)}
            headerClass="comparison-header"
            valueFormatter={({ value }) => getValue(value, 2, kpiPart.unit)}
            valueGetter={({ data }) => {
              return data.calculatedComparisonData &&
                data.calculatedComparisonData.kpi.kpiFormulaParts
                ? data.calculatedComparisonData.kpi.kpiFormulaParts[kpiPart.key]
                : null;
            }}
          />
        </AgGridColumn>
      );
    });
  }

  toReturn.push(
    <AgGridColumn headerName={kpiHeaderText} key={kpiHeaderText}>
      <AgGridColumn
        headerName={
          isDateMetric
            ? getLabel(primaryDates)
            : detail.breakdown.find((metric) => metric.key === primaryMetric)
                .name
        }
        headerClass="primary-header"
        valueFormatter={({ value }) => getValue(value, 2, unit)}
        valueGetter={({ data }) => data.calculatedPrimaryData.kpi.kpiValue}
        aggFunc={aggregateFuncs.kpiAggregate(
          kpiConfig.compareBy,
          kpiConfig.monthly.formula,
          true
        )}
      />
      <AgGridColumn
        headerName={
          isDateMetric
            ? getLabel(comparisonDates)
            : detail.breakdown.find((metric) => metric.key === comparisonMetric)
                .name
        }
        headerClass="comparison-header"
        valueFormatter={({ value }) => getValue(value, 2, unit)}
        valueGetter={({ data }) => data.calculatedComparisonData.kpi.kpiValue}
        aggFunc={aggregateFuncs.kpiAggregate(
          kpiConfig.compareBy,
          kpiConfig.monthly.formula
        )}
      />
      <AgGridColumn
        headerName={`${unit} Change`}
        valueFormatter={({ value }) => getValue(value, 2, unit)}
        valueGetter={({ data }) => data.kpiDifference?.value}
        aggFunc={aggregateFuncs.kpiValueDiff(
          kpiConfig.compareBy,
          kpiConfig.monthly.formula
        )}
      />
      <AgGridColumn
        headerName={`Percent Change`}
        valueFormatter={({ value }) => getValue(value, 2, '%')}
        valueGetter={({ data }) => data.kpiDifference?.percent}
        comparator={nullNumComparator}
        cellStyle={getPercentStyle}
        aggFunc={aggregateFuncs.kpiPercentDiff(
          kpiConfig.compareBy,
          kpiConfig.monthly.formula
        )}
      />
    </AgGridColumn>
  );

  return toReturn;
}
