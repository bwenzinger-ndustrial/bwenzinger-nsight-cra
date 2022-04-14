import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Menu from '../common/Menu';
import { ReactTable, TableCell, TableHeader } from '../common/Table';
import UnstyledHeader from './Header';

const propTypes = {
  availableDates: PropTypes.array,
  className: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      actualLoad: PropTypes.string,
      actualTemp: PropTypes.string,
      forecastedLoad: PropTypes.string,
      forecastedTemp: PropTypes.string,
      hour: PropTypes.string,
      loadVariance: PropTypes.string,
      riskProbability: PropTypes.string,
      tempVariance: PropTypes.string
    }).isRequired
  ),
  exportData: PropTypes.func,
  title: PropTypes.string,
  visibleDate: PropTypes.string
};

const defaultProps = {
  data: []
};

const Header = styled(UnstyledHeader)``;

const Container = styled.div`
  ${Header} {
    margin-bottom: 24px;
  }
`;

function Table(props) {
  const {
    availableDates,
    className,
    data,
    exportData,
    title,
    visibleDate
  } = props;

  /* eslint-disable react/display-name, react/prop-types */
  const columns = [
    {
      accessor: 'hour',
      sortMethod: (a, b) => {
        const momentA = moment(a, 'hh:mm a');
        const momentB = moment(b, 'hh:mm a');

        if (momentA.isBefore(momentB)) {
          return -1;
        } else if (momentA.isAfter(momentB)) {
          return 1;
        } else {
          return 0;
        }
      },
      width: 96,
      Cell: ({ value }) => <TableCell hasBorder>{value}</TableCell>,
      Header: <TableHeader hasBorder>Hour</TableHeader>
    },

    {
      accessor: 'riskProbability',
      Cell: ({ value }) => <TableCell hasBorder>{value}</TableCell>,
      Header: <TableHeader hasBorder>Risk Probability (%)</TableHeader>
    },

    {
      accessor: 'forecastedLoad',
      Cell: ({ value }) => <TableCell>{value}</TableCell>,
      Header: <TableHeader>Forecasted Load (MW)</TableHeader>
    },

    {
      accessor: 'actualLoad',
      Cell: ({ value }) => <TableCell>{value}</TableCell>,
      Header: <TableHeader>Actual Load (MW)</TableHeader>
    },

    {
      accessor: 'loadVariance',
      Cell: ({ value }) => <TableCell hasBorder>{value}</TableCell>,
      Header: <TableHeader hasBorder>Load Variance (MW)</TableHeader>
    },

    {
      accessor: 'forecastedTemp',
      Cell: ({ value }) => <TableCell>{value}</TableCell>,
      Header: <TableHeader>Forecasted Temp (&deg;F)</TableHeader>
    },

    {
      accessor: 'actualTemp',
      Cell: ({ value }) => <TableCell>{value}</TableCell>,
      Header: <TableHeader>Actual Temp (&deg;F)</TableHeader>
    },

    {
      accessor: 'tempVariance',
      Cell: ({ value }) => <TableCell>{value}</TableCell>,
      Header: <TableHeader>Temp Variance (&deg;F)</TableHeader>
    },

    {
      accessor: 'export',
      sortable: false,
      width: 48,
      Header: (
        <TableHeader>
          <Menu exportData={exportData} />
        </TableHeader>
      )
    }
  ];
  /* eslint-enable react/display-name, react/prop-types */

  return (
    <Container className={className}>
      <Header
        availableDates={availableDates}
        title={title}
        visibleDate={visibleDate}
      />

      <ReactTable
        columns={columns}
        data={data}
        minRows={1}
        pageSize={data.length}
        resizable={false}
        showPagination={false}
      />
    </Container>
  );
}

Table.propTypes = propTypes;
Table.defaultProps = defaultProps;

export default Table;
