import isNumber from 'lodash.isnumber';
import moment from 'moment';

const numberFormatter = (value, options = {}) => {
  const pre = options.pre !== undefined ? options.pre : '';
  const post = options.post !== undefined ? options.post : '';

  return isNumber(value)
    ? pre +
        value.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }) +
        post
    : null;
};

function getDateFilterParams() {
  const dateFilterParams = {
    // provide comparator function
    comparator: (filterLocalDateAtMidnight, cellValue) => {
      const dateAsString = cellValue;

      if (dateAsString == null) {
        return 0;
      }
      const cellDate = moment(cellValue, 'YYYY-MM-DD').toDate();

      // Now that both parameters are Date objects, we can compare
      if (cellDate < filterLocalDateAtMidnight) {
        return -1;
      } else if (cellDate > filterLocalDateAtMidnight) {
        return 1;
      }
      return 0;
    }
  };

  return dateFilterParams;
}

function getColumnDefs(dateFilterParams, theme) {
  const columnDefs = [
    {
      headerName: 'Cost Center',
      headerTooltip: 'Cost Center',
      field: 'cost_center',
      tooltipField: 'cost_center',
      type: 'dimension'
    },
    {
      headerName: 'Supplier',
      headerTooltip: 'Supplier',
      field: 'supplier',
      tooltipField: 'supplier',
      type: 'dimension'
    },
    {
      headerName: 'Contract Name',
      headerTooltip: 'Contract Name',
      field: 'name',
      tooltipField: 'name',
      type: 'dimension'
    },
    {
      headerName: 'Status',
      headerTooltip: 'Status',
      field: 'status',
      tooltipField: 'status',
      type: 'dimension'
    },
    {
      headerName: 'Start Date',
      headerTooltip: 'Start Date',
      field: 'start_date',
      tooltipValueGetter: function(params) {
        return params.valueFormatted ? params.valueFormatted : params.value;
      },
      sort: 'desc',
      valueFormatter: (params) => {
        return params.value
          ? moment(params.value).format('MMM DD, YYYY')
          : null;
      },
      filter: 'agDateColumnFilter',
      filterParams: dateFilterParams
    },
    {
      headerName: 'End Date',
      headerTooltip: 'End Date',
      field: 'end_date',
      tooltipValueGetter: function(params) {
        return params.valueFormatted ? params.valueFormatted : params.value;
      },
      valueFormatter: (params) => {
        return params.value
          ? moment(params.value).format('MMM DD, YYYY')
          : null;
      },
      filter: 'agDateColumnFilter',
      filterParams: dateFilterParams
    },
    {
      headerName: 'Rate Type',
      headerTooltip: 'Rate Type',
      field: 'rate_type',
      tooltipField: 'rate_type',
      type: 'dimension'
    },
    {
      headerName: 'Subscribers',
      headerTooltip: 'Subscribers',
      field: 'subscribers',
      tooltipField: 'subscribers',
      type: 'dimension'
    }
  ];

  return columnDefs;
}

export default {
  getColumnDefs,
  getDateFilterParams,
  numberFormatter
};
