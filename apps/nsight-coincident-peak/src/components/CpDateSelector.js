import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { SingleDatePicker } from '@ndustrial/nd-date-picker-react';

const DatePickerContainer = styled.div``;

const propTypes = {
  selectedDate: PropTypes.object,
  setCPDates: PropTypes.func.isRequired
};

export function CpDateSelector({ selectedDate, setCPDates }) {
  return (
    <DatePickerContainer>
      <SingleDatePicker
        id="cpSelectedDate"
        maxDate={moment().endOf('day')}
        value={selectedDate}
        onDateChange={setCPDates}
      />
    </DatePickerContainer>
  );
}

CpDateSelector.propTypes = propTypes;
