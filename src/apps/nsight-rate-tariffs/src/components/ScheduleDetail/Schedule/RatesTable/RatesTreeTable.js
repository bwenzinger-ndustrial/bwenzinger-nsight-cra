import React from 'react';
import ReactTable from 'react-table';
import treeTableHOC from 'react-table/lib/hoc/treeTable';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import 'react-table/react-table.css';

import { Cell, CellContent } from './Cell';
import { ChargePeriodCell } from './ChargePeriodCell';
import { HeaderCell } from './HeaderCell';
import NoRates from './NoRates';
import { PeriodHeader } from './PeriodHeader';
import TableBody from './TableBody';

const propTypes = {
  className: PropTypes.string,
  data: PropTypes.array.isRequired,
  expandedPeriods: PropTypes.array,
  minWidth: PropTypes.number,
  onExpandedChange: PropTypes.func
};

const TreeTable = styled(treeTableHOC(ReactTable))`
  /* Overrides */
  && {
    border: 1px solid #eaeaea;

    .rt-thead {
      .rt-tr {
        text-align: left;
      }

      .rt-th {
        border: 0;
        box-shadow: none;
        padding: 0;
      }

      /* prettier-ignore */
      &.-header { /* stylelint-disable-line selector-class-pattern */
        box-shadow: none;
      }
    }

    .rt-tbody {
      .rt-tr-group,
      .rt-td {
        border: 0;
      }
    }

    .rt-expandable {
      border: 0 !important; /* stylelint-disable-line declaration-no-important */
    }

    .rt-td {
      padding: 0;
    }

    /* prettier-ignore */
    .hidden,
    .-hidden { /* stylelint-disable-line selector-class-pattern */
      display: none;
    }
  }

  .rt-resizable-header:not(:last-child) {
    ${HeaderCell} {
      border-right: 2px solid #fff;
    }
  }

  .rt-td {
    &:not(:last-child) {
      ${CellContent} {
        border-right-width: 2px;
      }
    }
  }
`;

function RatesTreeTable(props) {
  const {
    className,
    data,
    expandedPeriods,
    minWidth,
    onExpandedChange
  } = props;

  return (
    <TreeTable
      className={className}
      columns={[
        // Duplicating 'Charge Period' here cause since the items are grouped on 'Charge Period' that column gets hidden by default
        {
          accessor: 'period',
          Pivot: PeriodHeader
        },
        {
          accessor: 'chargePeriod',
          Cell: ChargePeriodCell,
          // eslint-disable-next-line react/display-name
          Header: () => <HeaderCell>Charge Period</HeaderCell>,
          minWidth: minWidth * 0.16
        },
        {
          accessor: 'tier',
          Cell: Cell,
          // eslint-disable-next-line react/display-name
          Header: () => <HeaderCell>Tier</HeaderCell>,
          minWidth: minWidth * 0.1
        },
        {
          accessor: 'units',
          Cell: Cell,
          // eslint-disable-next-line react/display-name
          Header: () => <HeaderCell>Units</HeaderCell>,
          minWidth: minWidth * 0.1
        },
        {
          accessor: 'min',
          Cell: Cell,
          // eslint-disable-next-line react/display-name
          Header: () => <HeaderCell>Min</HeaderCell>,
          minWidth: minWidth * 0.12
        },
        {
          accessor: 'max',
          Cell: Cell,
          // eslint-disable-next-line react/display-name
          Header: () => <HeaderCell>Max</HeaderCell>,
          minWidth: minWidth * 0.12
        },
        {
          accessor: 'rate',
          Cell: Cell,
          // eslint-disable-next-line react/display-name
          Header: () => <HeaderCell>Rate $ / kWh</HeaderCell>,
          minWidth: minWidth * 0.18
        },
        {
          accessor: 'adjustment',
          Cell: Cell,
          // eslint-disable-next-line react/display-name
          Header: () => <HeaderCell>Adjustments $ /kWh</HeaderCell>,
          minWidth: minWidth * 0.18
        }
      ]}
      data={data}
      expanded={expandedPeriods}
      minRows={0}
      NoDataComponent={NoRates}
      onExpandedChange={onExpandedChange}
      pivotBy={['period']}
      showPagination={false}
      sortable={false}
      TbodyComponent={TableBody}
    />
  );
}

RatesTreeTable.propTypes = propTypes;

export default RatesTreeTable;
