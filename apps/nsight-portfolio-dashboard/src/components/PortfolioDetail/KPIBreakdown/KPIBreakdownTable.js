import React, { useRef } from 'react';
import momentPropTypes from 'react-moment-proptypes';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import PropTypes from 'prop-types';

import { dateConstants } from '@ndustrial/nsight-common/constants';

import './ag-grid.scss';
import 'ag-grid-enterprise';

import aggregateFuncs from './aggregationUtil';
import { frameworkComponents, gridOptions } from './columnUtil';
import { getKPIBreakdownTableCommonColDef } from './getKPIBreakdownTableCommonColDef';

const {
  dash: { YYYY_MM_DD }
} = dateConstants;

const propTypes = {
  comparisonDates: PropTypes.shape({
    from: momentPropTypes.momentObj,
    to: momentPropTypes.momentObj
  }).isRequired,
  tableData: PropTypes.arrayOf(
    PropTypes.shape({
      calculatedComparisonData: PropTypes.shape({
        kpi: PropTypes.shape({
          kpiFormulaParts: PropTypes.object,
          kpiValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        })
      }),
      calculatedPrimaryData: PropTypes.shape({
        kpi: PropTypes.shape({
          kpiFormulaParts: PropTypes.object,
          kpiValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        })
      }),
      kpiDifference: PropTypes.shape({
        percent: PropTypes.number,
        value: PropTypes.number
      }),
      name: PropTypes.string.isRequired,
      isMissingData: PropTypes.bool
    })
  ),
  kpiConfig: PropTypes.shape({
    detail: PropTypes.shape({
      breakdown: PropTypes.arrayOf(
        PropTypes.shape({
          key: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired
        })
      ).isRequired
    }),
    monthly: PropTypes.shape({
      key: PropTypes.string.isRequired,
      formula: PropTypes.string.isRequired
    }).isRequired,
    label: PropTypes.string.isRequired,
    unit: PropTypes.string.isRequired,
    compareBy: PropTypes.string.isRequired,
    primaryMetric: PropTypes.string,
    comparisonMetric: PropTypes.string,
    isNegativeIndicator: PropTypes.bool
  }),
  primaryDates: PropTypes.shape({
    from: momentPropTypes.momentObj,
    to: momentPropTypes.momentObj
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
  isGrouped: PropTypes.bool.isRequired
};

function KPIBreakdownTable(props) {
  const {
    comparisonDates,
    tableData,
    kpiConfig,
    primaryDates,
    isLoading,
    isGrouped
  } = props;

  const gridRef = useRef(null);

  const onGridReady = ({ api }) => {
    // api.setPinnedTopRowData(createHeaderData(api));
    api.sizeColumnsToFit();
  };

  const onRowDataChanged = (e) => {
    // e.api.setPinnedTopRowData(createHeaderData(e.api));
    e.api.sizeColumnsToFit();

    if (isLoading) {
      e.api.showLoadingOverlay();
    } else {
      e.api.hideOverlay();
    }
  };

  // function createHeaderData(gridApi) {
  //   const result = [];
  //   const primaryData = [];
  //   const comparisonData = [];
  //   let primaryKpiFormulaPartSum = {};
  //   let comparisonKpiFormulaPartSum = {};
  //   let primaryKey = '';
  //   let comparisonKey = '';
  //   if (gridApi) {
  //     if (kpiConfig.compareBy === kpiEnums.COMPARE_BY_TYPES.DATE) {
  //       gridApi.forEachLeafNode((node, index) => {
  //         primaryData.push(node.data.calculatedPrimaryData.kpi.kpiFormulaParts);
  //         comparisonData.push(
  //           node.data.calculatedComparisonData.kpi.kpiFormulaParts
  //         );

  //         if (index === 0) {
  //           primaryKpiFormulaPartSum = {
  //             ...node.data.calculatedPrimaryData.kpi.kpiFormulaParts
  //           };
  //           comparisonKpiFormulaPartSum = {
  //             ...node.data.calculatedComparisonData.kpi.kpiFormulaParts
  //           };
  //         } else {
  //           Object.keys(
  //             node.data.calculatedPrimaryData.kpi.kpiFormulaParts
  //           ).forEach((key) => {
  //             const tempPrimary = Number.parseFloat(
  //               node.data.calculatedPrimaryData.kpi.kpiFormulaParts[key]
  //             );
  //             const tempComparison = Number.parseFloat(
  //               node.data.calculatedComparisonData.kpi.kpiFormulaParts[key]
  //             );
  //             primaryKey = node.data.calculatedPrimaryData.kpi.kpiKey;
  //             comparisonKey = node.data.calculatedComparisonData.kpi.kpiKey;
  //             primaryKpiFormulaPartSum[key] += !_.isFinite(tempPrimary)
  //               ? 0
  //               : tempPrimary;
  //             comparisonKpiFormulaPartSum[key] += !_.isFinite(tempComparison)
  //               ? 0
  //               : tempComparison;
  //           });
  //         }
  //       });

  //       if (primaryData.length > 0) {
  //         const primaryDataValue = calculateKpiValue(
  //           primaryData,
  //           kpiConfig.monthly.formula,
  //           kpiConfig.compareBy
  //         );
  //         const comparisonDataValue = calculateKpiValue(
  //           comparisonData,
  //           kpiConfig.monthly.formula,
  //           kpiConfig.compareBy
  //         );
  //         result.push({
  //           calculatedPrimaryData: {
  //             kpi: {
  //               kpiFormulaParts: primaryKpiFormulaPartSum,
  //               kpiValue: primaryDataValue,
  //               kpiKey: primaryKey
  //             }
  //           },
  //           calculatedComparisonData: {
  //             kpi: {
  //               kpiFormulaParts: comparisonKpiFormulaPartSum,
  //               kpiValue: comparisonDataValue,
  //               kpiKey: comparisonKey
  //             }
  //           },
  //           kpiDifference: calculateKpiDelta(
  //             primaryDataValue,
  //             comparisonDataValue
  //           )
  //         });
  //       }
  //     } else {
  //       const primaryValues = [];
  //       const comparisonValues = [];
  //       let primaryKey = '';
  //       let comparisonKey = '';
  //       gridApi.forEachLeafNode((node) => {
  //         primaryValues.push(node.data.calculatedPrimaryData.kpi.kpiValue);
  //         comparisonValues.push(
  //           node.data.calculatedComparisonData.kpi.kpiValue
  //         );
  //         primaryKey = node.data.calculatedPrimaryData.kpi.kpiKey;
  //         comparisonKey = node.data.calculatedComparisonData.kpi.kpiKey;
  //       });

  //       const primaryDataValue = calculateKpiValue(
  //         primaryValues,
  //         kpiConfig.monthly.formula,
  //         kpiConfig.compareBy
  //       );
  //       const comparisonDataValue = calculateKpiValue(
  //         comparisonValues,
  //         kpiConfig.monthly.formula,
  //         kpiConfig.compareBy
  //       );

  //       result.push({
  //         calculatedPrimaryData: {
  //           kpi: {
  //             kpiFormulaParts: undefined,
  //             kpiValue: primaryDataValue,
  //             kpiKey: primaryKey
  //           }
  //         },
  //         calculatedComparisonData: {
  //           kpi: {
  //             kpiFormulaParts: undefined,
  //             kpiValue: comparisonDataValue,
  //             kpiKey: comparisonKey
  //           }
  //         },
  //         kpiDifference: calculateKpiDelta(
  //           primaryDataValue,
  //           comparisonDataValue
  //         )
  //       });
  //       // return _calculateCompareByMetricValue(kpiData);
  //     }
  //   }
  //   return result;
  // }

  return (
    <div className="ag-theme-alpine" style={{ height: '100%' }}>
      {isGrouped && (
        <AgGridReact
          rowData={!isLoading && tableData}
          aggFuncs={aggregateFuncs}
          animateRows={true}
          frameworkComponents={frameworkComponents}
          onGridReady={onGridReady}
          onRowDataChanged={onRowDataChanged}
          suppressNoRowsOverlay={true}
          treeData={true}
          getDataPath={(data) => {
            return data.hierarchy;
          }}
          autoGroupColumnDef={{
            headerName: 'Grouped Facilities',
            sort: 'asc',
            minWidth: 375,
            maxWidth: 375,
            cellRendererParams: {
              suppressCount: true,
              primaryStart: primaryDates
                ? primaryDates.from.format(YYYY_MM_DD)
                : '',
              primaryEnd: primaryDates
                ? primaryDates.to.format(YYYY_MM_DD)
                : '',
              comparisonStart: comparisonDates.from
                ? comparisonDates.from.format(YYYY_MM_DD)
                : '',
              kpiConfig: kpiConfig,
              innerRenderer: 'linkCell'
            }
          }}
          {...gridOptions}
        >
          {getKPIBreakdownTableCommonColDef(
            comparisonDates,
            kpiConfig,
            primaryDates
          )}
        </AgGridReact>
      )}
      {!isGrouped && (
        <AgGridReact
          rowData={!isLoading && tableData}
          aggFuncs={aggregateFuncs}
          animateRows={true}
          frameworkComponents={frameworkComponents}
          onGridReady={onGridReady}
          onRowDataChanged={onRowDataChanged}
          suppressNoRowsOverlay={true}
          groupDisplayType={'custom'}
          ref={gridRef}
          {...gridOptions}
        >
          <AgGridColumn
            field="name"
            sort="asc"
            headerName="Facility"
            showRowGroup={true}
            cellRendererSelector={(params) => {
              if (params.node.rowPinned) {
                return {
                  component: 'pinnedLinkCell'
                };
              } else {
                return {
                  component: 'linkCell',
                  params: {
                    suppressCount: true,
                    primaryStart: primaryDates
                      ? primaryDates.from.format(YYYY_MM_DD)
                      : '',
                    primaryEnd: primaryDates
                      ? primaryDates.to.format(YYYY_MM_DD)
                      : '',
                    comparisonStart: comparisonDates.from
                      ? comparisonDates.from.format(YYYY_MM_DD)
                      : '',
                    kpiConfig: kpiConfig
                  }
                };
              }
            }}
          />
          {getKPIBreakdownTableCommonColDef(
            comparisonDates,
            kpiConfig,
            primaryDates
          )}
        </AgGridReact>
      )}
    </div>
  );
}

KPIBreakdownTable.propTypes = propTypes;
export default KPIBreakdownTable;
