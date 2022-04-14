import React, { useEffect, useState } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';

import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import '../assets/css/agGridnSight.css';

import tableHelpers from '../helpers/tableHelpers.js';

const gridOptions = {
  defaultColDef: {
    sortable: true,
    filter: true,
    resizable: true,
    suppressSizeToFit: true
  },
  suppressHorizontalScroll: false,
  sidebar: {
    toolPanels: [
      {
        id: 'columns',
        labelDefault: 'Columns',
        labelKey: 'columns',
        iconKey: 'columns',
        toolPanel: 'agColumnsToolPanel',
        toolPanelParams: {
          suppressRowGroups: true,
          suppressValues: true,
          suppressPivots: true,
          suppressPivotMode: true
        }
      }
    ]
  }
};

const propTypes = {
  quickFilterText: PropTypes.string.isRequired,
  utilityBillsdata: PropTypes.array,
  theme: PropTypes.shape({
    colors: PropTypes.shape({
      failure: PropTypes.string,
      success: PropTypes.string
    })
  })
};

const BillManagerTable = withTheme(function(props) {
  const { quickFilterText, theme, utilityBillsdata } = props;
  const dateFilterParams = tableHelpers.getDateFilterParams();
  const columnDefs = tableHelpers.getColumnDefs(dateFilterParams, theme);

  const [gridApi, setGridApi] = useState(null);

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  useEffect(() => {
    if (gridApi && !utilityBillsdata) {
      gridApi.showLoadingOverlay();
    } else if (gridApi && utilityBillsdata.length === 0) {
      gridApi.showNoRowsOverlay();
    } else if (gridApi) {
      gridApi.hideOverlay();
    }
  }, [utilityBillsdata, gridApi]);

  useEffect(() => {
    if (gridApi) {
      gridApi.setQuickFilter(quickFilterText);
    }
  }, [gridApi, quickFilterText]);

  return (
    <div className="ag-theme-alpine" style={{ height: '90%', width: '100%' }}>
      <AgGridReact
        onGridReady={onGridReady}
        rowData={utilityBillsdata}
        defaultColDef={gridOptions.defaultColDef}
        rowGroupPanelShow={'always'}
        animateRows={true}
        groupIncludeFooter={true}
        groupIncludeTotalFooter={true}
        cacheQuickFilter={true}
        sideBar={gridOptions.sidebar}
        columnTypes={{
          numberValue: {
            enableValue: true,
            aggFunc: 'sum'
          },
          dimension: {
            enableRowGroup: true,
            enablePivot: true
          }
        }}
      >
        {columnDefs.map((columnDef) => {
          return <AgGridColumn {...columnDef} key={columnDef.field} />;
        })}
      </AgGridReact>
    </div>
  );
});

BillManagerTable.propTypes = propTypes;

export default BillManagerTable;
