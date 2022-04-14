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
      headerName: 'Meter Id',
      headerTooltip: 'Meter Id',
      field: 'meter_id',
      tooltipField: 'meter_id',
      type: 'dimension'
    },
    {
      headerName: 'Meter Label',
      headerTooltip: 'Meter Label',
      field: 'meter_label',
      tooltipField: 'meter_label',
      type: 'dimension'
    },
    {
      headerName: 'Provider',
      headerTooltip: 'Provider',
      field: 'provider',
      tooltipField: 'provider',
      type: 'dimension',
      editable: true,
      keyCreator: ({ value }) => (!value ? 'No provider listed' : value)
    },
    {
      headerName: 'Account Label',
      headerTooltip: 'Accout Label',
      field: 'account_label',
      tooltipField: 'account_label',
      type: 'dimension'
    },
    {
      headerName: 'Facility Name/Link',
      headerTooltip: 'Facility Name/Link',
      field: 'facilityName',
      tooltipField: 'facilityName',
      type: 'dimension',
      cellRenderer: (params) => {
        // is grouped and params.value exists
        if (params.value && !params.data) {
          return params.value;
        }
        if (!params.data) {
          return '';
        }

        return `<a href='/utility-bills?organization=${params.data.orgSlug}&facility=${params.data.facilitySlug}' target='_blank'>${params.value}</a>`;
      }
    },
    {
      headerName: 'Usage (kWh)',
      headerTooltip: 'Usage (kWh)',
      field: 'bill_usage_kwh',
      tooltipField: 'bill_usage_kwh',
      valueFormatter: (params) => {
        return numberFormatter(params.value);
      },
      type: 'numberValue',
      editable: true
    },
    {
      headerName: 'Usage (kVArh)',
      headerTooltip: 'Usage (kVArh)',
      hide: true,
      field: 'bill_usage_kvarh',
      tooltipField: 'bill_usage_kvarh',
      valueFormatter: (params) => {
        return numberFormatter(params.value);
      },
      type: 'numberValue',
      editable: true
    },
    {
      headerName: 'Demand (kw)',
      headerTooltip: 'Demand (kw)',
      field: 'bill_demand_kw',
      tooltipField: 'bill_demand_kw',
      valueFormatter: (params) => {
        return numberFormatter(params.value);
      },
      type: 'numberValue',
      editable: true
    },
    {
      headerName: 'Demand (kVA)',
      hide: true,
      headerTooltip: 'Demand (kVA)',
      field: 'bill_demand_kva',
      tooltipField: 'bill_demand_kva',
      valueFormatter: (params) => {
        return numberFormatter(params.value);
      },
      type: 'numberValue',
      editable: true
    },
    {
      headerName: 'Demand (kVAr)',
      hide: true,
      headerTooltip: 'Demand (kVAr)',
      field: 'bill_demand_kvar',
      tooltipField: 'bill_demand_kvar',
      valueFormatter: (params) => {
        return numberFormatter(params.value);
      },
      type: 'numberValue',
      editable: true
    },
    {
      headerName: 'Bill Cost',
      headerTooltip: 'Bill Cost',
      field: 'bill_cost',
      tooltipField: 'bill_cost',
      valueFormatter: (params) => {
        return numberFormatter(params.value, { pre: '$' });
      },
      type: 'numberValue',
      editable: true
    },
    {
      headerName: 'Demand (Cost)',
      headerTooltip: 'Demand (Cost)',
      field: 'bill_demand_cost',
      tooltipField: 'bill_demand_cost',
      valueFormatter: (params) => {
        return numberFormatter(params.value, { pre: '$' });
      },
      type: 'numberValue',
      editable: true
    },
    {
      headerName: 'Usage (Cost)',
      headerTooltip: 'Usage (Cost)',
      field: 'bill_usage_cost',
      tooltipField: 'bill_usage_cost',
      valueFormatter: (params) => {
        return numberFormatter(params.value, { pre: '$' });
      },
      type: 'numberValue',
      editable: true
    },
    {
      headerName: 'Fees',
      headerTooltip: 'Fees',
      field: 'fees',
      tooltipField: 'fees',
      valueFormatter: (params) => {
        return numberFormatter(params.value, { pre: '$' });
      },
      type: 'numberValue',
      editable: true
    },
    {
      headerName: 'Taxes',
      headerTooltip: 'Taxes',
      field: 'taxes',
      tooltipField: 'taxes',
      valueFormatter: (params) => {
        return numberFormatter(params.value, { pre: '$' });
      },
      type: 'numberValue',
      editable: true
    },
    {
      headerName: 'Credits',
      headerTooltip: 'Credits',
      field: 'credits',
      tooltipField: 'credits',
      valueFormatter: (params) => {
        return numberFormatter(params.value, { pre: '$' });
      },
      type: 'numberValue',
      editable: true
    },
    {
      headerName: 'Arrival Date',
      headerTooltip: 'Arrival Date',
      field: 'bill_arrival_date',
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
      headerName: 'Start Date',
      headerTooltip: 'Start Date',
      field: 'start_date',
      tooltipField: 'start_date',
      tooltipValueGetter: function(params) {
        return params.valueFormatted ? params.valueFormatted : params.value;
      },
      valueFormatter: (params) => {
        return params.value
          ? moment(params.value).format('MMM DD, YYYY')
          : null;
      },
      filter: 'agDateColumnFilter',
      filterParams: dateFilterParams,
      editable: true
    },
    {
      headerName: 'End Date',
      headerTooltip: 'End Date',
      field: 'end_date',
      tooltipField: 'end_date',
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
      headerName: 'Statement Date',
      headerTooltip: 'Statement Date',
      field: 'statement_date',
      tooltipField: 'statement_date'
    },
    {
      headerName: 'Days in Bill',
      headerTooltip: 'Days in Bill',
      field: 'days_in_bill',
      tooltipField: 'days_in_bill'
    },
    {
      headerName: 'Blended Rate',
      headerTooltip: 'Blended Rate',
      field: 'blended_rate',
      tooltipField: 'blended_rate',
      valueFormatter: (params) => {
        return numberFormatter(params.value);
      },
      filter: 'agNumberColumnFilter'
    },
    {
      headerName: 'Load Factor',
      headerTooltip: 'Load Factor',
      field: 'load_factor',
      tooltipField: 'load_factor',
      valueFormatter: (params) => {
        return numberFormatter(params.value, { post: '%' });
      },
      filter: 'agNumberColumnFilter'
    },
    {
      headerName: '% Change',
      headerTooltip: '% Change',
      field: 'percent_change',
      tooltipField: 'percent_change',
      valueFormatter: (params) => {
        return numberFormatter(params.value, { post: '%' });
      },
      cellStyle: (params) => {
        if (params.value < 0) {
          return { color: theme.colors.failure };
        } else if (params.value > 0) {
          return { color: theme.colors.success };
        }
        return null;
      }
    }
  ];

  return columnDefs;
}

export default {
  getColumnDefs,
  getDateFilterParams,
  numberFormatter
};
