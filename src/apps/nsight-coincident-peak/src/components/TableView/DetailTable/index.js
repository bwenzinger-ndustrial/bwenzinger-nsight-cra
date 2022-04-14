import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import UnstyledTable from './Table';

const propTypes = {
  detailInfo: PropTypes.object,
  exportData: PropTypes.func,
  visibleDate: PropTypes.string
};

const Table = styled(UnstyledTable)``;

// TODO: fix card so that this margin comes from the card -- it current collapses/doesn't fit the content
const Container = styled.div`
  margin-bottom: 14px;

  ${Table}:not(:last-child) {
    margin-bottom: 16px;
  }
`;

function DetailTable(props) {
  const { detailInfo, exportData, visibleDate } = props;

  return (
    <Container>
      <Table
        availableDates={Object.keys(detailInfo.dates)}
        data={detailInfo.dates[visibleDate]}
        exportData={exportData}
        title={`Forecast for ${
          visibleDate
            ? moment(visibleDate, 'YYYY-MM-DD').format('dddd, MMMM D, YYYY')
            : ''
        }`}
        visibleDate={visibleDate}
      />
    </Container>
  );
}

DetailTable.propTypes = propTypes;

export default DetailTable;
