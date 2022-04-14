import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import PropTypes from 'prop-types';

import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import { setActiveProject } from '../../redux/projects/actions';
import { projectsSelector } from '../../redux/projects/selectors/projectsSelector';

const dateTimeFormat = 'MM/DD/YYYY h:mmA';

const propTypes = {
  selectedFacility: PropTypes.object,
  onRowClicked: PropTypes.func
};

const defaultColDef = {
  sortable: true
};

function ProjectsTable({ selectedFacility, onRowClicked }) {
  const dispatch = useDispatch();
  const tableData = useSelector(projectsSelector);

  const filteredTableData = useMemo(() => {
    if (tableData && selectedFacility) {
      return tableData.filter(
        (item) => item.facility_id === selectedFacility.id
      );
    } else {
      return tableData;
    }
  }, [tableData, selectedFacility]);

  return (
    <div className="ag-theme-alpine" style={{ height: '90%' }}>
      <AgGridReact
        rowData={filteredTableData}
        animateRows={true}
        onCellClicked={(event) => {
          dispatch(setActiveProject(event.data));
          if (onRowClicked) {
            onRowClicked();
          }
        }}
        defaultColDef={defaultColDef}
      >
        <AgGridColumn field="projectName" headerName="Project Name" />
        <AgGridColumn field="projectType" headerName="Project Type" />
        <AgGridColumn field="facilityName" headerName="Facility" />
        <AgGridColumn
          field="isDraft"
          headerName="State"
          valueGetter={(params) => {
            return params.data.isDraft ? 'Draft' : 'Published';
          }}
        />
        <AgGridColumn
          sort="desc"
          field="updated_at"
          headerName="Last Updated"
          valueFormatter={(params) => {
            return params.data.updated_at.format(dateTimeFormat);
          }}
        />
        <AgGridColumn
          field="implementationDate"
          headerName="Implementation Date"
          valueFormatter={(params) => {
            return params.data.implementationDate?.format(dateTimeFormat);
          }}
        />
        <AgGridColumn
          field="trackingPeriodStart"
          headerName="Tracking Start"
          valueFormatter={(params) => {
            return params.data.trackingPeriodStart?.format(dateTimeFormat);
          }}
        />
        <AgGridColumn
          field="trackingPeriodEnd"
          headerName="Tracking End"
          valueFormatter={(params) => {
            return params.data.trackingPeriodEnd?.format(dateTimeFormat);
          }}
        />
        <AgGridColumn field="roi" headerName="ROI" />
      </AgGridReact>
    </div>
  );
}

ProjectsTable.propTypes = propTypes;
export default ProjectsTable;
