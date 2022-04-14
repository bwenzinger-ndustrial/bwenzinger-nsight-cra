import React from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import PropTypes from 'prop-types';

import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import DeviceStatusTableCheckboxCellRenderer from './CellRenderers/DeviceStatusTableCheckboxCellRenderer';
import DeviceStatusTableGroupRenderer from './CellRenderers/DeviceStatusTableGroupRenderer';

const propTypes = {
  className: PropTypes.string,
  currentUserId: PropTypes.string.isRequired,
  subscribeUserToEvent: PropTypes.func.isRequired,
  unsubscribeUserFromEvent: PropTypes.func.isRequired,
  feeds: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      fails: PropTypes.bool
    })
  )
};

const defaultColDef = {
  sortable: true,
  filter: 'agTextColumnFilter',
  resizable: true
};

const onGridReady = ({ api }) => {
  api.sizeColumnsToFit();
};

function DeviceStatusTable(props) {
  const {
    feeds,
    currentUserId,
    subscribeUserToEvent,
    unsubscribeUserFromEvent
  } = props;

  return (
    <div className="ag-theme-alpine" style={{ height: '100%' }}>
      <AgGridReact
        rowData={feeds}
        animateRows={true}
        treeData={true}
        getDataPath={(data) => {
          return data.hierarchy;
        }}
        frameworkComponents={{
          groupCellRenderer: DeviceStatusTableGroupRenderer,
          checkboxCellRenderer: DeviceStatusTableCheckboxCellRenderer
        }}
        defaultColDef={defaultColDef}
        onGridReady={onGridReady}
        autoGroupColumnDef={{
          headerName: 'Device Name -> Equipment Category',
          cellRenderer: 'agGroupCellRenderer',
          cellRendererParams: {
            innerRenderer: 'groupCellRenderer',
            suppressCount: true
          },
          width: 325
        }}
        groupDefaultExpanded={1}
      >
        <AgGridColumn field="name" hide={true} sort="asc" />
        <AgGridColumn headerName={'Device Location'} field="locationTagLabel" />
        <AgGridColumn headerName={'Device Label'} field="boxTagLabel" />
        <AgGridColumn
          headerName={'Equipment Location'}
          field="grouping.locationTagLabel"
        />
        <AgGridColumn
          headerName={'Equipment Label'}
          field="grouping.boxTagLabel"
        />
        <AgGridColumn
          headerName={'Alert me if this device fails'}
          field="isSubscribed"
          cellRenderer="checkboxCellRenderer"
          cellRendererParams={{
            subscribeUserToEvent: subscribeUserToEvent,
            unsubscribeUserFromEvent: unsubscribeUserFromEvent,
            currentUserId: currentUserId
          }}
        />
        <AgGridColumn
          headerName={'Troubleshooting'}
          field="troubleshootingUrl"
          cellRenderer={(params) => {
            if (params.value) {
              return `<a href="${params.value}">Help</a href>`;
            } else {
              return '';
            }
          }}
        />
      </AgGridReact>
    </div>
  );
}

DeviceStatusTable.propTypes = propTypes;
export default DeviceStatusTable;
